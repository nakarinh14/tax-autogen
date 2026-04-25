// main.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('generator-form');
    const itemsTbody = document.getElementById('items-tbody');
    const btnAddItem = document.getElementById('btn-add-item');

    const statusContainer = document.getElementById('status-container');
    const statusText = document.getElementById('status-text');
    const statusPct = document.getElementById('status-pct');
    const progressFill = document.getElementById('progress-fill');

    // Add initial item row
    addItemRow('WIWU Case', 1000);
    addItemRow('Screen Protector', 500);

    btnAddItem.addEventListener('click', () => addItemRow('', 0));

    function addItemRow(name = '', price = 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" class="item-name" value="${name}" required placeholder="Item name"></td>
            <td><input type="number" step="0.01" min="0.01" class="item-price" value="${price}" required></td>
            <td><button type="button" class="btn btn-danger btn-remove-item">✕</button></td>
        `;
        tr.querySelector('.btn-remove-item').addEventListener('click', () => {
            if (itemsTbody.children.length > 1) {
                tr.remove();
            } else {
                alert('You must have at least one item.');
            }
        });
        itemsTbody.appendChild(tr);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Harvest inputs
        const config = {
            compName: document.getElementById('comp-name').value,
            compTax: document.getElementById('comp-tax').value,
            compAddr: document.getElementById('comp-addr').value,
            compBranch: document.getElementById('comp-branch').value || 'สำนักงานใหญ่',
            custName: document.getElementById('cust-name').value,
            custTax: document.getElementById('cust-tax').value,
            custAddr: document.getElementById('cust-addr').value,
            startDate: new Date(document.getElementById('date-start').value),
            endDate: new Date(document.getElementById('date-end').value),
            targetMoney: parseFloat(document.getElementById('target-money').value),
            targetType: document.getElementById('target-type').value, // 'inclusive' or 'exclusive'
            vatRate: parseFloat(document.getElementById('vat-rate').value),
            maxQty: parseInt(document.getElementById('max-qty').value),
            requireDaily: document.getElementById('require-daily').checked,
            paperSize: document.getElementById('paper-size').value, // 'a3' or 'a4'
            invStartNum: parseInt(document.getElementById('inv-start-num').value),
            items: Array.from(document.querySelectorAll('#items-tbody tr')).map(tr => ({
                name: tr.querySelector('.item-name').value,
                price: parseFloat(tr.querySelector('.item-price').value)
            }))
        };

        if (config.startDate > config.endDate) {
            alert('Start date must be before or equal to End date.');
            return;
        }

        // Disable UI and show progression
        const btnGen = document.getElementById('btn-generate');
        btnGen.disabled = true;
        btnGen.innerText = "Please wait...";
        progressFill.style.width = '0%';
        statusPct.innerText = '0%';
        statusText.innerText = 'Distributing exact items...';
        statusContainer.classList.remove('hidden');

        // Allow UI to update
        await new Promise(r => setTimeout(r, 100));

        try {
            // 1. Math Distribution
            const daysCount = Math.floor((config.endDate - config.startDate) / (1000 * 60 * 60 * 24)) + 1;
            const distributedLog = distributeMath(config, daysCount);

            if (!distributedLog) {
                throw new Error("Could not find an exact combination to meet the target money using only the provided item prices and max quantity limits. Tip: Ensure your Target Money is reachable by combining your exact item prices (e.g. they share a common divisor).");
            }

            // 2. Generate PDFs
            const zip = new JSZip();
            let invCounter = config.invStartNum;

            for (let i = 0; i < distributedLog.length; i++) {
                const dayLog = distributedLog[i];
                if (dayLog.items.length === 0) continue; // Skip empty days

                const pct = Math.round(((i + 1) / distributedLog.length) * 100);
                statusPct.innerText = pct + '%';
                progressFill.style.width = pct + '%';
                statusText.innerText = `Generating PDF ${i + 1} of ${distributedLog.length}...`;
                await new Promise(r => setTimeout(r, 10)); // Yield for UI

                const invNumber = `TX-${invCounter}`;
                const pdfBlob = await generateInvoicePDF(dayLog, config, config.startDate, i, invNumber);
                zip.file(`${invNumber}.pdf`, pdfBlob);
                invCounter++;
            }

            statusText.innerText = 'Zipping files...';
            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, `Tax_Invoices_${config.startDate.toISOString().split('T')[0]}_to_${config.endDate.toISOString().split('T')[0]}.zip`);

            statusText.innerText = 'Done!';
        } catch (err) {
            alert('Error: ' + err.message);
            statusText.innerText = 'Failed.';
            progressFill.style.backgroundColor = 'var(--danger)';
        } finally {
            btnGen.disabled = false;
            btnGen.innerText = "Generate Invoices";
        }
    });

    function distributeMath(config, daysCount) {
        // Multi-start randomized greedy solver for Subset Sum / Unbounded Knapsack
        const MAX_RETRIES = 500;

        // Pre-check: if requireDaily and even the cheapest item × days exceeds target, it's genuinely impossible
        if (config.requireDaily) {
            const minPrice = Math.min(...config.items.map(i => i.price));
            if (daysCount * minPrice > config.targetMoney + 0.001) {
                return null;
            }
        }

        for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
            let currentSum = 0;
            // State initialization
            let days = Array.from({ length: daysCount }, () => ({
                items: [],
                totalQty: 0
            }));

            // Force 1 item per day if required
            if (config.requireDaily) {
                for (let d = 0; d < daysCount; d++) {
                    const randomItem = config.items[Math.floor(Math.random() * config.items.length)];
                    days[d].items.push({ ...randomItem, qty: 1 });
                    days[d].totalQty += 1;
                    currentSum += randomItem.price;
                }
            }

            if (currentSum > config.targetMoney) {
                // This attempt's random picks exceeded target — try again with a new draw
                continue;
            }

            let stuck = false;
            while (Math.abs(currentSum - config.targetMoney) > 0.001) {
                let rem = config.targetMoney - currentSum;
                let validItems = config.items.filter(i => i.price <= rem + 0.001); // Handle float precision

                if (validItems.length === 0) {
                    stuck = true;
                    break;
                }

                // Pick a day that hasn't reached maxQty yet
                let validDaysIndices = days.map((v, i) => v.totalQty < config.maxQty ? i : -1).filter(v => v !== -1);
                if (validDaysIndices.length === 0) {
                    stuck = true;
                    break;
                }

                let dIdx = validDaysIndices[Math.floor(Math.random() * validDaysIndices.length)];
                let item = validItems[Math.floor(Math.random() * validItems.length)];

                // Add to day
                let extItem = days[dIdx].items.find(i => i.name === item.name);
                if (extItem) {
                    extItem.qty += 1;
                } else {
                    days[dIdx].items.push({ ...item, qty: 1 });
                }
                days[dIdx].totalQty += 1;
                currentSum += item.price;
            }

            if (!stuck && Math.abs(currentSum - config.targetMoney) <= 0.001) {
                return days; // Success!
            }
        }
        return null; // All retries stuck
    }

    async function generateInvoicePDF(dayLog, config, startDate, dayOffset, invNum) {
        // Compute invoice date
        const dateObj = new Date(startDate.getTime() + (dayOffset * 24 * 60 * 60 * 1000));
        const dtStr = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;

        // Financials
        const grandTotalItemsValue = dayLog.items.reduce((sum, item) => sum + item.qty * item.price, 0);
        let subtotal, vatAmt, grandTotal;
        if (config.targetType === 'inclusive') {
            grandTotal = grandTotalItemsValue;
            subtotal = grandTotal / (1 + (config.vatRate / 100));
            vatAmt = grandTotal - subtotal;
        } else {
            subtotal = grandTotalItemsValue;
            vatAmt = subtotal * (config.vatRate / 100);
            grandTotal = subtotal + vatAmt;
        }
        const fmt = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Paper dimensions
        const paperPx = { a3: [1122, 1587], a4: [794, 1123], a5: [559, 794] };
        const paperMm = { a3: [297, 420], a4: [210, 297], a5: [148, 210] };
        const [pxW, pxH] = paperPx[config.paperSize];
        const [mmW, mmH] = paperMm[config.paperSize];
        const pad = Math.round(pxW * 0.05);
        const fs = config.paperSize === 'a3' ? 16 : config.paperSize === 'a5' ? 10 : 13;

        // Build item rows HTML
        const rowsHTML = dayLog.items.map((item, j) => {
            const lineTotal = item.qty * item.price;
            return `<tr>
                <td style="text-align:center;padding:6px 10px;border-bottom:1px solid #e0e0e0;">${j + 1}</td>
                <td style="padding:6px 10px;border-bottom:1px solid #e0e0e0;">${item.name}</td>
                <td style="text-align:center;padding:6px 10px;border-bottom:1px solid #e0e0e0;">${item.qty}</td>
                <td style="text-align:right;padding:6px 10px;border-bottom:1px solid #e0e0e0;">${fmt(item.price)}</td>
                <td style="text-align:right;padding:6px 10px;border-bottom:1px solid #e0e0e0;">${fmt(lineTotal)}</td>
            </tr>`;
        }).join('');

        // Create off-screen container
        const el = document.createElement('div');
        el.style.cssText = `
            position:fixed; left:-9999px; top:0;
            width:${pxW}px; min-height:${pxH}px;
            background:#fff; color:#111;
            font-family:'Sarabun','Noto Sans Thai',sans-serif;
            font-size:${fs}px; line-height:1.7;
            padding:${pad}px; box-sizing:border-box;
        `;

        el.innerHTML = `
            <div style="text-align:center;margin-bottom:22px;">
                <div style="font-size:${fs * 1.6}px;font-weight:700;letter-spacing:0.5px;">ใบกำกับภาษี / ใบเสร็จรับเงิน</div>
                <div style="font-size:${fs * 1.2}px;font-weight:600;letter-spacing:2px;">TAX INVOICE / RECEIPT</div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;gap:16px;">
                <div style="flex:1;">
                    <div style="font-weight:700;font-size:${fs * 1.1}px;margin-bottom:4px;">${config.compName}</div>
                    <div>${config.compAddr.replace(/\n/g, '<br>')}</div>
                    <div>เลขประจำตัวผู้เสียภาษี: ${config.compTax}</div>
                    <div>สาขา: ${config.compBranch}</div>
                </div>
                <div style="border:1px solid #bbb;padding:12px 16px;border-radius:8px;text-align:right;min-width:210px;">
                    <div style="margin-bottom:4px;"><strong>เลขที่ (No.):</strong>&nbsp;${invNum}</div>
                    <div><strong>วันที่ (Date):</strong>&nbsp;${dtStr}</div>
                </div>
            </div>

            <hr style="border:none;border-top:2px solid #222;margin-bottom:14px;">

            <div style="background:#f7f7f7;padding:10px 14px;border-radius:6px;margin-bottom:18px;">
                <div><strong>ชื่อลูกค้า (Customer):</strong>&nbsp;${config.custName}</div>
                ${config.custTax ? `<div><strong>เลขประจำตัวผู้เสียภาษี:</strong>&nbsp;${config.custTax}</div>` : ''}
                ${config.custAddr ? `<div><strong>ที่อยู่ (Address):</strong>&nbsp;${config.custAddr.replace(/\n/g, '<br>')}</div>` : ''}
            </div>

            <table style="width:100%;border-collapse:collapse;border:1px solid #bbb;">
                <thead>
                    <tr>
                        <th style="padding:9px 10px;text-align:center;width:7%;font-size:${fs * 0.9}px;background:#f0f0f0;color:#111;">ลำดับ</th>
                        <th style="padding:9px 10px;text-align:left;font-size:${fs * 0.9}px;background:#f0f0f0;color:#111;">รายการ (Description)</th>
                        <th style="padding:9px 10px;text-align:center;width:10%;font-size:${fs * 0.9}px;background:#f0f0f0;color:#111;">จำนวน</th>
                        <th style="padding:9px 10px;text-align:right;width:18%;font-size:${fs * 0.9}px;background:#f0f0f0;color:#111;">ราคา/หน่วย (บาท)</th>
                        <th style="padding:9px 10px;text-align:right;width:18%;font-size:${fs * 0.9}px;background:#f0f0f0;color:#111;">จำนวนเงิน (บาท)</th>
                    </tr>
                </thead>
                <tbody>${rowsHTML}</tbody>
            </table>

            <div style="display:flex;justify-content:flex-end;margin-top:18px;">
                <table style="border-collapse:collapse;">
                    <tr>
                        <td style="padding:5px 16px;text-align:right;border-bottom:1px solid #e0e0e0;">รวมเงิน (Sub Total):</td>
                        <td style="padding:5px 16px;text-align:right;border-bottom:1px solid #e0e0e0;min-width:150px;">${fmt(subtotal)} บาท</td>
                    </tr>
                    <tr>
                        <td style="padding:5px 16px;text-align:right;border-bottom:1px solid #e0e0e0;">ภาษีมูลค่าเพิ่ม (VAT ${config.vatRate}%):</td>
                        <td style="padding:5px 16px;text-align:right;border-bottom:1px solid #e0e0e0;">${fmt(vatAmt)} บาท</td>
                    </tr>
                    <tr style="background:#f0f0f0;">
                        <td style="padding:8px 16px;text-align:right;font-weight:700;border-top:2px solid #222;">จำนวนเงินรวมทั้งสิ้น (Grand Total):</td>
                        <td style="padding:8px 16px;text-align:right;font-weight:700;border-top:2px solid #222;">${fmt(grandTotal)} บาท</td>
                    </tr>
                </table>
            </div>

            <div style="text-align:center;margin-top:70px;">
                <div style="display:inline-block;border-top:1px solid #555;padding-top:10px;min-width:260px;">
                    <div>ผู้มีอำนาจลงนาม / Authorized Signature</div>
                    <div style="margin-top:4px;">วันที่ (Date): ____________</div>
                </div>
            </div>
        `;

        document.body.appendChild(el);
        try {
            await document.fonts.ready; // Ensure Sarabun is loaded before capture
            const canvas = await html2canvas(el, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                width: pxW,
                windowWidth: pxW
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.93);

            const doc = new window.jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: config.paperSize
            });
            doc.addImage(imgData, 'JPEG', 0, 0, mmW, mmH);
            return doc.output('blob');
        } finally {
            document.body.removeChild(el);
        }
    }
});
