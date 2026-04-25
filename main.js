// main.js

const translations = {
    en: {
        app_title: "Tax Invoice Auto-Gen",
        app_desc: "Smart PDF generator to strictly match target sales sums.",
        company_details: "Company Details",
        your_info: "(Your Info)",
        comp_name: "Company Name",
        comp_tax: "Tax ID",
        comp_addr: "Address",
        comp_branch: "Branch (optional)",
        comp_phone: "Phone Number (optional)",
        customer_details: "Customer Details",
        buyer_info: "(Buyer Info)",
        cust_name: "Customer Name",
        cust_tax: "Tax ID (optional)",
        cust_addr: "Address (optional)",
        gen_settings: "Generation Settings",
        start_date: "Start Date",
        end_date: "End Date",
        target_money: "Target Money (Baht)",
        amount_type: "Amount Type",
        type_inc: "Includes VAT (ราคารวมภาษีแล้ว)",
        type_exc: "Excludes VAT (ราคายังไม่รวมภาษี)",
        vat_rate: "VAT Rate (%)",
        max_qty: "Max Items Per Day",
        paper_size: "Paper Size",
        use_date_inv: "Use Date for Inv No. (TX-YYYYMMDD)",
        start_inv_num: "Starting Invoice No. (Override)",
        req_daily: "Require daily invoice",
        hide_vat: "Hide VAT (ไม่แสดงภาษี)",
        fixed_item_list: "Fixed Item List",
        btn_add_item: "+ Add Item",
        th_item_desc: "Item Description",
        th_unit_price: "Unit Price (Baht)",
        helper_price: 'Prices should align with your "Amount Type" (if Inclusive VAT, these prices are assumed to include VAT).',
        btn_generate: "Generate Invoices",
        status_processing: "Processing...",
        lang_btn: "🇺🇸 EN"
    },
    th: {
        app_title: "โปรแกรมสร้างใบกำกับภาษีอัตโนมัติ",
        app_desc: "สร้าง PDF อัจฉริยะที่คำนวณยอดขายให้ตรงกับเป้าหมาย",
        company_details: "ข้อมูลบริษัท",
        your_info: "(ข้อมูลของคุณ)",
        comp_name: "ชื่อบริษัท",
        comp_tax: "เลขประจำตัวผู้เสียภาษี",
        comp_addr: "ที่อยู่",
        comp_branch: "สาขา (ไม่บังคับ)",
        comp_phone: "เบอร์โทรศัพท์ (ไม่บังคับ)",
        customer_details: "ข้อมูลลูกค้า",
        buyer_info: "(ข้อมูลผู้ซื้อ)",
        cust_name: "ชื่อลูกค้า",
        cust_tax: "เลขประจำตัวผู้เสียภาษี (ไม่บังคับ)",
        cust_addr: "ที่อยู่ (ไม่บังคับ)",
        gen_settings: "ตั้งค่าการสร้างเอกสาร",
        start_date: "วันที่เริ่มต้น",
        end_date: "วันที่สิ้นสุด",
        target_money: "ยอดเงินเป้าหมาย (บาท)",
        amount_type: "ประเภทจำนวนเงิน",
        type_inc: "ราคารวมภาษีแล้ว (Includes VAT)",
        type_exc: "ราคายังไม่รวมภาษี (Excludes VAT)",
        vat_rate: "อัตราภาษีมูลค่าเพิ่ม (%)",
        max_qty: "จำนวนรายการสูงสุดต่อวัน",
        paper_size: "ขนาดกระดาษ",
        use_date_inv: "ใช้วันที่เป็นเลขที่ใบกำกับ (TX-YYYYMMDD)",
        start_inv_num: "เลขที่ใบกำกับเริ่มต้น (กำหนดเอง)",
        req_daily: "ต้องมีใบกำกับทุกวัน",
        hide_vat: "ซ่อนภาษี (ไม่แสดงภาษี)",
        fixed_item_list: "รายการสินค้า",
        btn_add_item: "+ เพิ่มรายการ",
        th_item_desc: "รายละเอียดสินค้า",
        th_unit_price: "ราคาต่อหน่วย (บาท)",
        helper_price: 'ราคาควรสอดคล้องกับ "ประเภทจำนวนเงิน" (หากรวมภาษีแล้ว ราคาที่ระบุต้องรวมภาษีด้วย)',
        btn_generate: "สร้างใบกำกับภาษี",
        status_processing: "กำลังประมวลผล...",
        lang_btn: "🇹🇭 TH"
    }
};

let currentLang = navigator.language.toLowerCase().startsWith('th') ? 'th' : 'en';

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
    const btnToggle = document.getElementById('btn-lang-toggle');
    if (btnToggle) {
        btnToggle.innerText = translations[currentLang].lang_btn;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();

    const btnLangToggle = document.getElementById('btn-lang-toggle');
    if (btnLangToggle) {
        btnLangToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'th' : 'en';
            applyTranslations();
        });
    }

    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    flatpickr("#date-start", { 
        dateFormat: "d/m/Y",
        defaultDate: firstDay 
    });
    flatpickr("#date-end", { 
        dateFormat: "d/m/Y",
        defaultDate: lastDay 
    });

    const form = document.getElementById('generator-form');
    const itemsTbody = document.getElementById('items-tbody');
    const btnAddItem = document.getElementById('btn-add-item');

    const useDateInv = document.getElementById('use-date-inv');
    const invStartNum = document.getElementById('inv-start-num');

    useDateInv.addEventListener('change', (e) => {
        invStartNum.disabled = e.target.checked;
        if (!e.target.checked) {
            invStartNum.required = true;
        } else {
            invStartNum.required = false;
        }
    });

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
        const parseDateString = (dateStr) => {
            const [dd, mm, yyyy] = dateStr.split('/');
            return new Date(yyyy, mm - 1, dd);
        };

        const config = {
            compName: document.getElementById('comp-name').value,
            compTax: document.getElementById('comp-tax').value,
            compAddr: document.getElementById('comp-addr').value,
            compBranch: document.getElementById('comp-branch').value,
            compPhone: document.getElementById('comp-phone') ? document.getElementById('comp-phone').value : '',
            custName: document.getElementById('cust-name').value,
            custTax: document.getElementById('cust-tax').value,
            custAddr: document.getElementById('cust-addr').value,
            startDate: parseDateString(document.getElementById('date-start').value),
            endDate: parseDateString(document.getElementById('date-end').value),
            targetMoney: parseFloat(document.getElementById('target-money').value),
            targetType: document.getElementById('target-type').value, // 'inclusive' or 'exclusive'
            vatRate: parseFloat(document.getElementById('vat-rate').value),
            maxQty: parseInt(document.getElementById('max-qty').value),
            requireDaily: document.getElementById('require-daily').checked,
            hideVat: document.getElementById('hide-vat').checked,
            paperSize: document.getElementById('paper-size').value, // 'a3' or 'a4'
            useDateInv: document.getElementById('use-date-inv').checked,
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

                let invNumber;
                if (config.useDateInv) {
                    const dateObj = new Date(config.startDate.getTime() + (i * 24 * 60 * 60 * 1000));
                    const yyyy = dateObj.getFullYear();
                    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const dd = String(dateObj.getDate()).padStart(2, '0');
                    invNumber = `TX-${yyyy}${mm}${dd}`;
                } else {
                    invNumber = `TX-${invCounter}`;
                    invCounter++;
                }

                const pdfBlob = await generateInvoicePDF(dayLog, config, config.startDate, i, invNumber);
                zip.file(`${invNumber}.pdf`, pdfBlob);
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
        const fs = config.paperSize === 'a3' ? 16 : config.paperSize === 'a5' ? 13 : 13;

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
                <div style="font-size:${fs * 1.6}px;font-weight:700;letter-spacing:0.5px;">ใบกำกับภาษีอย่างย่อ / ใบเสร็จรับเงิน</div>
                <div style="font-size:${fs * 1.2}px;font-weight:600;letter-spacing:2px;">TAX INVOICE / RECEIPT</div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;gap:16px;">
                <div style="flex:1;">
                    <div style="font-weight:700;font-size:${fs * 1.3}px;margin-bottom:4px;">${config.compName}</div>
                    <div>${config.compAddr.replace(/\n/g, '<br>')}</div>
                    <div>เลขประจำตัวผู้เสียภาษี: ${config.compTax}</div>
                    ${config.compBranch ? `<div>สาขา: ${config.compBranch}</div>` : ''}
                    ${config.compPhone ? `<div>โทร: ${config.compPhone}</div>` : ''}
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
                    ${!config.hideVat ? `
                    <tr>
                        <td style="padding:5px 16px;text-align:right;border-bottom:1px solid #e0e0e0;">รวมเงิน (Sub Total):</td>
                        <td style="padding:5px 16px;text-align:right;border-bottom:1px solid #e0e0e0;min-width:150px;">${fmt(subtotal)} บาท</td>
                    </tr>
                    ` : ''}
                    ${!config.hideVat ? `
                    <tr>
                        <td style="padding:5px 16px;text-align:right;border-bottom:1px solid #e0e0e0;">ภาษีมูลค่าเพิ่ม (VAT ${config.vatRate}%):</td>
                        <td style="padding:5px 16px;text-align:right;border-bottom:1px solid #e0e0e0;">${fmt(vatAmt)} บาท</td>
                    </tr>
                    ` : ''}
                    <tr style="background:#f0f0f0;">
                        <td style="padding:8px 16px;text-align:right;font-weight:700;border-top:2px solid #222;">จำนวนเงินรวมภาษีมูลค่าเพิ่มทั้งสื้น (Grand Total):</td>
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
