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
        invoice_type: "Tax Invoice Type",
        inv_type_full: "Full Form (ใบกำกับภาษีเต็มรูปแบบ)",
        inv_type_abbr: "Abbreviated (ใบกำกับภาษีอย่างย่อ)",
        inv_type_hint: "Abbreviated: for retail/consumer. Full Form: for business VAT credit.",
        cust_tax_req: "Tax ID (required)",
        fixed_item_list: "Fixed Item List",
        btn_add_item: "+ Add Item",
        btn_import_excel: "Import Excel",
        btn_download_template: "Download Template",
        th_item_desc: "Item Description",
        th_qty: "Qty",
        th_unit_price: "Unit Price (Baht)",
        helper_price: 'Prices should align with your "Amount Type" (if Inclusive VAT, these prices are assumed to include VAT).',
        btn_generate: "Generate Invoices",
        status_processing: "Processing...",
        lang_btn: "🇺🇸 EN",
        adhoc_title: "Ad-hoc Invoices",
        adhoc_desc: "One-off invoices for specific dates — excluded from the monthly target.",
        btn_add_adhoc: "+ Add Ad-hoc Invoice",
        adhoc_inv_title: "Ad-hoc Invoice",
        btn_remove: "✕ Remove",
        inv_date: "Invoice Date",
        cust_tax_opt: "Customer Tax ID <small style=\"opacity:0.6\">(optional)</small>",
        cust_addr_opt: "Customer Address <small style=\"opacity:0.6\">(optional)</small>",
        items_label: "Items",
        btn_add_row: "+ Add Row",
        th_qty: "Qty",
        branch_type: "Branch Type",
        branch_none: "— None —",
        branch_head: "Head Office (สำนักงานใหญ่)",
        branch_br: "Branch (สาขา)",
        branch_no: "Branch No. (5-digit)",
        adhoc_same_cust: "Same customer as main form",
        use_delivery_note: "Generate as Delivery Note / Invoice / Tax Invoice (ใบส่งของ / ใบแจ้งหนี้ / ใบกำกับภาษี)",
        receipt_mode: "Receipt Only (ใบเสร็จรับเงิน)",
        source_inv_num: "Source Tax Invoice No. (อ้างอิงใบกำกับภาษีต้นทาง)",
        receipt_date: "Receipt Date (วันที่รับเงิน)"
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
        invoice_type: "ประเภทใบกำกับภาษี",
        inv_type_full: "แบบเต็มรูปแบบ (Full Form)",
        inv_type_abbr: "แบบอย่างย่อ (Abbreviated)",
        inv_type_hint: "แบบอย่างย่อ: สำหรับขายปลีก/ผู้บริโภค. แบบเต็มรูปแบบ: สำหรับธุรกิจขอคืน VAT.",
        cust_tax_req: "เลขประจำตัวผู้เสียภาษี (จำเป็น)",
        fixed_item_list: "รายการสินค้า",
        btn_add_item: "+ เพิ่มรายการ",
        btn_import_excel: "นำเข้าจาก Excel",
        btn_download_template: "ดาวน์โหลดเทมเพลต",
        th_item_desc: "รายละเอียดสินค้า",
        th_qty: "จำนวน",
        th_unit_price: "ราคาต่อหน่วย (บาท)",
        helper_price: 'ราคาควรสอดคล้องกับ "ประเภทจำนวนเงิน" (หากรวมภาษีแล้ว ราคาที่ระบุต้องรวมภาษีด้วย)',
        btn_generate: "สร้างใบกำกับภาษี",
        status_processing: "กำลังประมวลผล...",
        lang_btn: "🇹🇭 TH",
        adhoc_title: "ใบกำกับภาษีเพิ่มเติม",
        adhoc_desc: "ใบกำกับภาษีสำหรับวันที่เฉพาะเจาะจง — ไม่รวมในยอดเป้าหมายรายเดือน",
        btn_add_adhoc: "+ เพิ่มใบกำกับเพิ่มเติม",
        adhoc_inv_title: "ใบกำกับภาษีเพิ่มเติม",
        btn_remove: "✕ ลบ",
        inv_date: "วันที่เอกสาร",
        cust_tax_opt: "เลขประจำตัวผู้เสียภาษี <small style=\"opacity:0.6\">(ไม่บังคับ)</small>",
        cust_addr_opt: "ที่อยู่ลูกค้า <small style=\"opacity:0.6\">(ไม่บังคับ)</small>",
        items_label: "รายการสินค้า",
        btn_add_row: "+ เพิ่มรายการ",
        th_qty: "จำนวน",
        branch_type: "สถานะสาขา",
        branch_none: "— ไม่ระบุ —",
        branch_head: "สำนักงานใหญ่",
        branch_br: "สาขา",
        branch_no: "เลขที่สาขา (5 หลัก)",
        adhoc_same_cust: "ข้อมูลลูกค้าเหมือนกับฟอร์มหลัก",
        use_delivery_note: "ใช้เป็นใบส่งของ / ใบแจ้งหนี้ / ใบกำกับภาษี",
        receipt_mode: "ใบเสร็จรับเงินเท่านั้น",
        source_inv_num: "อ้างอิงใบกำกับภาษีต้นทางเลขที่",
        receipt_date: "วันที่รับเงิน"
    }
};

let currentLang = (navigator.language || navigator.userLanguage || '').toLowerCase().startsWith('th') ? 'th' : 'en';

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

function normalizeTaxId(val) {
    return (val || '').replace(/\D/g, '');
}

function formatTaxId(raw) {
    const digits = normalizeTaxId(raw);
    if (digits.length !== 13) return raw;
    return `${digits[0]}-${digits.slice(1, 5)}-${digits.slice(5, 10)}-${digits.slice(10, 12)}-${digits[12]}`;
}

function setupBranchToggle(typeSelectId, noGroupId) {
    const sel = document.getElementById(typeSelectId);
    const grp = document.getElementById(noGroupId);
    if (sel && grp) {
        const toggle = () => { grp.style.display = sel.value === 'branch' ? '' : 'none'; };
        sel.addEventListener('change', toggle);
        toggle();
    }
}

function updateCustTaxLabel() {
    const custTaxLabel = document.querySelector('label[for="cust-tax"]');
    const invoiceType = document.getElementById('invoice-type');
    if (custTaxLabel && invoiceType) {
        const isFull = invoiceType.value === 'full';
        custTaxLabel.setAttribute('data-i18n', isFull ? 'cust_tax_req' : 'cust_tax');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Disable scroll wheel from changing number input values
    document.addEventListener('wheel', function(e) {
        if (document.activeElement.type === 'number') {
            document.activeElement.blur();
        }
    });

    applyTranslations();

    const FORM_KEY = 'tax-autogen-form';
    function saveFormState() {
        const data = {};
        document.querySelectorAll('#generator-form input[type="text"], #generator-form input[type="number"], #generator-form input[type="tel"], #generator-form textarea, #generator-form select').forEach(el => {
            if (el.id) data[el.id] = el.type === 'checkbox' ? el.checked : el.value;
        });
        data._mode = currentMode;
        data._lang = currentLang;
        try { localStorage.setItem(FORM_KEY, JSON.stringify(data)); } catch(e) {}
    }
    function restoreFormState() {
        try {
            const raw = localStorage.getItem(FORM_KEY);
            if (!raw) return;
            const data = JSON.parse(raw);
            Object.keys(data).forEach(key => {
                if (key.startsWith('_')) return;
                const el = document.getElementById(key);
                if (!el) return;
                if (el.type === 'checkbox') el.checked = data[key];
                else el.value = data[key];
            });
            if (data._mode && data._mode !== currentMode) setMode(data._mode);
            if (data._lang && data._lang !== currentLang) {
                currentLang = data._lang;
                updateCustTaxLabel();
                applyTranslations();
            }
        } catch(e) {}
    }
    document.getElementById('generator-form').addEventListener('change', saveFormState);
    document.getElementById('generator-form').addEventListener('input', saveFormState);

    const btnLangToggle = document.getElementById('btn-lang-toggle');
    if (btnLangToggle) {
        btnLangToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'th' : 'en';
            updateCustTaxLabel();
            applyTranslations();
        });
    }

    let currentMode = 'invoice';
    const dateStartLabel = document.querySelector('label[for="date-start"]');
    const modeBtnInvoice = document.getElementById('mode-invoice');
    const modeBtnReceipt = document.getElementById('mode-receipt');
    const requireDailyCheckbox = document.getElementById('require-daily');

    function refreshRequireDailyFields() {
        if (!requireDailyCheckbox) return;
        const enabled = requireDailyCheckbox.checked && currentMode === 'invoice';
        document.querySelectorAll('.require-daily-field').forEach(el => {
            el.style.opacity = enabled ? '' : '0.5';
            el.style.pointerEvents = enabled ? '' : 'none';
            el.querySelectorAll('input, select, textarea').forEach(input => {
                input.disabled = !enabled;
                if (!enabled) input.value = '';
            });
        });
    }

    function setMode(mode) {
        currentMode = mode;
        document.querySelectorAll('.inv-only').forEach(el => { el.style.display = mode === 'invoice' ? '' : 'none'; });
        document.querySelectorAll('.rec-only').forEach(el => { el.style.display = mode === 'receipt' ? '' : 'none'; });
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        if (mode === 'invoice') {
            modeBtnInvoice.classList.add('active');
            if (dateStartLabel) dateStartLabel.setAttribute('data-i18n', 'start_date');
        } else {
            modeBtnReceipt.classList.add('active');
            if (dateStartLabel) dateStartLabel.setAttribute('data-i18n', 'receipt_date');
        }
        applyTranslations();
        refreshRequireDailyFields();
    }

    if (modeBtnInvoice && modeBtnReceipt) {
        modeBtnInvoice.addEventListener('click', () => setMode('invoice'));
        modeBtnReceipt.addEventListener('click', () => setMode('receipt'));
        setMode('invoice');
    }

    if (requireDailyCheckbox) {
        requireDailyCheckbox.addEventListener('change', refreshRequireDailyFields);
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

    setupBranchToggle('comp-branch-type', 'comp-branch-no-group');
    setupBranchToggle('cust-branch-type', 'cust-branch-no-group');

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

    const invoiceTypeSelect = document.getElementById('invoice-type');
    const hideVatCheckbox = document.getElementById('hide-vat');
    const custTaxInput = document.getElementById('cust-tax');
    invoiceTypeSelect.addEventListener('change', () => {
        const isFull = invoiceTypeSelect.value === 'full';
        custTaxInput.required = isFull;
        hideVatCheckbox.disabled = isFull;
        if (isFull) hideVatCheckbox.checked = false;
        updateCustTaxLabel();
        applyTranslations();
    });

    restoreFormState();

    const statusContainer = document.getElementById('status-container');
    const statusText = document.getElementById('status-text');
    const statusPct = document.getElementById('status-pct');
    const progressFill = document.getElementById('progress-fill');

    // Add initial item row
    addItemRow('WIWU Case', 1000);
    addItemRow('Screen Protector', 500);

    btnAddItem.addEventListener('click', () => addItemRow('', 0));

    // --- Ad-hoc Invoice Management ---
    let adhocCount = 0;
    const adhocContainer = document.getElementById('adhoc-cards-container');
    document.getElementById('btn-add-adhoc').addEventListener('click', () => addAdhocCard());

    function addAdhocCard() {
        adhocCount++;
        const card = document.createElement('div');
        card.className = 'adhoc-card';
        card.style.cssText = 'border:1px solid rgba(245,158,11,0.4);border-left:4px solid #f59e0b;border-radius:12px;padding:1.4rem;margin-bottom:1.2rem;background:rgba(245,158,11,0.07);';
        card.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
                <strong style="color:#f59e0b;font-size:1rem;"><span data-i18n="adhoc_inv_title">Ad-hoc Invoice</span> #${adhocCount}</strong>
                <button type="button" class="btn btn-danger btn-sm adhoc-remove-btn" data-i18n="btn_remove">✕ Remove</button>
            </div>
            <div style="margin-bottom:0.8rem;">
                <label style="cursor:pointer;font-size:0.9rem;color:#fbbf24;">
                    <input type="checkbox" class="adhoc-use-main-cust" checked>
                    <span data-i18n="adhoc_same_cust">Same customer as main form</span>
                </label>
            </div>
            <div class="grid-3">
                <div class="form-group">
                    <label data-i18n="inv_date">Invoice Date</label>
                    <input type="text" class="adhoc-date" placeholder="DD/MM/YYYY">
                </div>
                <div class="form-group">
                    <label data-i18n="cust_name">Customer Name</label>
                    <input type="text" class="adhoc-cust-name" placeholder="Customer name">
                </div>
                <div class="form-group">
                    <label data-i18n="cust_tax_opt">Customer Tax ID <small style="opacity:0.6">(optional)</small></label>
                    <input type="text" class="adhoc-cust-tax" pattern="\\d{13}" maxlength="13" placeholder="13-digit Tax ID">
                </div>
            </div>
            <div class="form-group">
                <label data-i18n="cust_addr_opt">Customer Address <small style="opacity:0.6">(optional)</small></label>
                <textarea class="adhoc-cust-addr" rows="2" placeholder="Address..."></textarea>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div class="form-group">
                    <label data-i18n="branch_type">Branch Type</label>
                    <select class="adhoc-branch-type">
                        <option value="" data-i18n="branch_none">— None —</option>
                        <option value="head" data-i18n="branch_head">Head Office (สำนักงานใหญ่)</option>
                        <option value="branch" data-i18n="branch_br">Branch (สาขา)</option>
                    </select>
                </div>
                <div class="form-group adhoc-branch-no-group" style="display:none;">
                    <label data-i18n="branch_no">Branch No. (5-digit)</label>
                    <input type="text" class="adhoc-branch-no" pattern="\\d{5}" maxlength="5" placeholder="e.g. 00001">
                </div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
                <div class="form-group">
                    <label data-i18n="vat_rate">VAT Rate (%)</label>
                    <input type="number" class="adhoc-vat-rate" value="7" step="1" min="0">
                </div>
                <div class="form-group">
                    <label data-i18n="amount_type">Amount Type</label>
                    <select class="adhoc-target-type">
                        <option value="exclusive" data-i18n="type_exc">Excludes VAT (ราคายังไม่รวมภาษี)</option>
                        <option value="inclusive" data-i18n="type_inc">Includes VAT (ราคารวมภาษีแล้ว)</option>
                    </select>
                </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin:1rem 0 0.5rem;">
                <label style="margin:0;font-weight:600;" data-i18n="items_label">Items</label>
                <div class="btn-row">
                    <button type="button" class="btn btn-secondary btn-sm adhoc-download-template-btn" data-i18n="btn_download_template">Download Template</button>
                    <button type="button" class="btn btn-secondary btn-sm adhoc-import-excel-btn" data-i18n="btn_import_excel">Import Excel</button>
                    <button type="button" class="btn btn-secondary btn-sm adhoc-add-row-btn" data-i18n="btn_add_row">+ Add Row</button>
                </div>
                <input type="file" class="adhoc-file-excel-input" accept=".xlsx,.xls" style="display:none;">
            </div>
            <div class="table-container">
                <table class="items-table">
                    <thead><tr>
                        <th data-i18n="th_item_desc">Description</th>
                        <th width="80" data-i18n="th_qty">Qty</th>
                        <th width="150" data-i18n="th_unit_price">Unit Price (Baht)</th>
                        <th width="60"></th>
                    </tr></thead>
                    <tbody class="adhoc-items-tbody"></tbody>
                </table>
            </div>`;
        card.querySelector('.adhoc-remove-btn').addEventListener('click', () => card.remove());
        const tbody = card.querySelector('.adhoc-items-tbody');
        card.querySelector('.adhoc-add-row-btn').addEventListener('click', () => addAdhocRow(tbody));
        addAdhocRow(tbody);
        flatpickr(card.querySelector('.adhoc-date'), { dateFormat: 'd/m/Y' });

        // Ad-hoc branch type toggle
        const adhocBranchType = card.querySelector('.adhoc-branch-type');
        const adhocBranchNoGroup = card.querySelector('.adhoc-branch-no-group');
        if (adhocBranchType && adhocBranchNoGroup) {
            const toggle = () => { adhocBranchNoGroup.style.display = adhocBranchType.value === 'branch' ? '' : 'none'; };
            adhocBranchType.addEventListener('change', toggle);
            toggle();
        }

        // Use main customer toggle
        const useMainCust = card.querySelector('.adhoc-use-main-cust');
        const custFields = [
            card.querySelector('.adhoc-cust-name'),
            card.querySelector('.adhoc-cust-tax'),
            card.querySelector('.adhoc-cust-addr'),
            card.querySelector('.adhoc-branch-type'),
            card.querySelector('.adhoc-branch-no')
        ];
        function toggleCustFields() {
            const disabled = useMainCust.checked;
            custFields.forEach(el => { if (el) el.disabled = disabled; });
            if (disabled && adhocBranchNoGroup) adhocBranchNoGroup.style.display = 'none';
        }
        useMainCust.addEventListener('change', toggleCustFields);
        toggleCustFields();

        // Ad-hoc Excel import
        const fileInput = card.querySelector('.adhoc-file-excel-input');
        card.querySelector('.adhoc-import-excel-btn').addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function (evt) {
                try {
                    const data = new Uint8Array(evt.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
                    tbody.innerHTML = '';
                    let imported = 0;
                    for (let i = 1; i < rows.length; i++) {
                        const row = rows[i];
                        if (!row || row.length === 0) continue;
                        const name = String(row[0] || '').trim();
                        if (!name) continue;
                        const qty = parseInt(row[1]) || 1;
                        const price = parseFloat(row[2]) || 0;
                        if (price <= 0) continue;
                        addAdhocRow(tbody, name, qty, price);
                        imported++;
                    }
                    if (imported > 0) {
                        statusText.innerText = `Imported ${imported} items from Excel.`;
                        statusContainer.classList.remove('hidden');
                        setTimeout(() => statusContainer.classList.add('hidden'), 2000);
                    } else {
                        addAdhocRow(tbody);
                        alert('No valid items found. Expected columns: Description (A), Qty (B), Unit Price (C).');
                    }
                } catch (err) {
                    alert('Failed to parse Excel file: ' + err.message);
                }
            };
            reader.readAsArrayBuffer(file);
            fileInput.value = '';
        });

        // Ad-hoc Download Template
        card.querySelector('.adhoc-download-template-btn').addEventListener('click', () => {
            const headers = ['Description', 'Qty', 'Unit Price'];
            const sampleData = [
                ['Product A', 1, 100.00],
                ['Product B', 2, 200.00]
            ];
            const ws = XLSX.utils.aoa_to_sheet([headers, ...sampleData]);
            ws['!cols'] = [{ wch: 25 }, { wch: 8 }, { wch: 14 }];
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Products');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], { type: 'application/octet-stream' });
            saveAs(blob, 'invoice_template.xlsx');
        });

        adhocContainer.appendChild(card);
        applyTranslations();
    }

    function addAdhocRow(tbody, name = '', qty = 1, price = 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" class="adhoc-item-name" value="${name}" placeholder="Item description"></td>
            <td><input type="number" class="adhoc-item-qty" value="${qty}" min="1"></td>
            <td><input type="number" class="adhoc-item-price" step="0.01" min="0" value="${price}"></td>
            <td><button type="button" class="btn btn-danger btn-remove-item">✕</button></td>`;
        tr.querySelector('.btn-remove-item').addEventListener('click', () => {
            if (tbody.children.length > 1) tr.remove();
            else alert('Must have at least one item.');
        });
        tbody.appendChild(tr);
    }

    function addItemRow(name = '', price = 0, qty = 1) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" class="item-name" value="${name}" required placeholder="Item name"></td>
            <td><input type="number" class="item-qty" value="${qty}" min="1" style="width:80px;"></td>
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

    const fileExcelInput = document.getElementById('file-excel-input');
    document.getElementById('btn-import-excel').addEventListener('click', () => fileExcelInput.click());
    fileExcelInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) {
            try {
                const data = new Uint8Array(evt.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const rows = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
                itemsTbody.innerHTML = '';
                let imported = 0;
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    if (!row || row.length === 0) continue;
                    const name = String(row[0] || '').trim();
                    if (!name) continue;
                    const qty = parseInt(row[1]) || 1;
                    const price = parseFloat(row[2]) || 0;
                    if (price <= 0) continue;
                    addItemRow(name, price, qty);
                    imported++;
                }
                if (imported > 0) {
                    statusText.innerText = `Imported ${imported} items from Excel.`;
                    statusContainer.classList.remove('hidden');
                    setTimeout(() => statusContainer.classList.add('hidden'), 2000);
                } else {
                    addItemRow();
                    alert('No valid items found. Expected columns: Description (A), Qty (B), Unit Price (C).');
                }
            } catch (err) {
                alert('Failed to parse Excel file: ' + err.message);
            }
        };
        reader.readAsArrayBuffer(file);
        fileExcelInput.value = '';
    });

    document.getElementById('btn-download-template').addEventListener('click', () => {
        const headers = ['Description', 'Qty', 'Unit Price'];
        const sampleData = [
            ['Product A', 1, 100.00],
            ['Product B', 2, 200.00]
        ];
        const ws = XLSX.utils.aoa_to_sheet([headers, ...sampleData]);
        ws['!cols'] = [{ wch: 25 }, { wch: 8 }, { wch: 14 }];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Products');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'invoice_template.xlsx');
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Harvest inputs
        const parseDateString = (dateStr) => {
            const [dd, mm, yyyy] = dateStr.split('/');
            return new Date(yyyy, mm - 1, dd);
        };

        const config = {
            compName: document.getElementById('comp-name').value,
            compTax: normalizeTaxId(document.getElementById('comp-tax').value),
            compAddr: document.getElementById('comp-addr').value,
            compBranchType: document.getElementById('comp-branch-type').value,
            compBranchNo: document.getElementById('comp-branch-no').value,
            compPhone: document.getElementById('comp-phone') ? document.getElementById('comp-phone').value : '',
            custName: document.getElementById('cust-name').value,
            custTax: normalizeTaxId(document.getElementById('cust-tax').value),
            custAddr: document.getElementById('cust-addr').value,
            custBranchType: document.getElementById('cust-branch-type').value,
            custBranchNo: document.getElementById('cust-branch-no').value,
            startDate: parseDateString(document.getElementById('date-start').value),
            endDate: parseDateString(document.getElementById('date-end').value),
            targetMoney: parseFloat(document.getElementById('target-money').value),
            targetType: document.getElementById('target-type').value, // 'inclusive' or 'exclusive'
            vatRate: parseFloat(document.getElementById('vat-rate').value),
            invoiceType: document.getElementById('invoice-type').value,
            maxQty: parseInt(document.getElementById('max-qty').value),
            requireDaily: document.getElementById('require-daily').checked,
            hideVat: document.getElementById('hide-vat').checked,
            useDeliveryNote: document.getElementById('use-delivery-note').checked,
            receiptMode: currentMode === 'receipt',
            sourceInvNum: document.getElementById('source-inv-num').value,
            paperSize: document.getElementById('paper-size').value, // 'a3' or 'a4'
            useDateInv: document.getElementById('use-date-inv').checked,
            invStartNum: parseInt(document.getElementById('inv-start-num').value),
            items: Array.from(document.querySelectorAll('#items-tbody tr')).map(tr => ({
                name: tr.querySelector('.item-name').value,
                qty: parseInt(tr.querySelector('.item-qty').value) || 1,
                price: parseFloat(tr.querySelector('.item-price').value)
            }))
        };

        if (config.requireDaily && config.startDate > config.endDate) {
            alert('Start date must be before or equal to End date.');
            return;
        }

        if (config.compTax.length !== 13) {
            alert('Company Tax ID must be exactly 13 digits.');
            return;
        }
        const isFullForm = config.invoiceType === 'full';
        if (config.requireDaily && isFullForm && config.custTax.length !== 13) {
            alert('Customer Tax ID is required and must be exactly 13 digits for Full Form tax invoices.');
            return;
        }

        // Disable UI and show progression
        const btnGen = document.getElementById('btn-generate');
        btnGen.disabled = true;
        btnGen.innerText = "Please wait...";
        progressFill.style.width = '0%';
        statusPct.innerText = '0%';
        statusText.innerText = config.receiptMode ? 'Generating receipt...' : (config.requireDaily ? 'Distributing exact items...' : 'Generating invoices...');
        statusContainer.classList.remove('hidden');

        // Allow UI to update
        await new Promise(r => setTimeout(r, 100));

        try {
            const isReceipt = config.receiptMode;
            if (isReceipt) {
                config.endDate = config.startDate;
            }

            // 1. Math Distribution (only if fixed items exist)
            const hasFixedItems = config.items.some(it => it.name && it.price > 0);
            const adhocCards = document.querySelectorAll('.adhoc-card');

            if (!isReceipt && !hasFixedItems && adhocCards.length === 0) {
                throw new Error('No items to generate. Please add items to the Fixed Item List or create an ad-hoc invoice.');
            }

            // 2. Prepare all invoice jobs
            let invoiceJobs = [];

            if (isReceipt) {
                const daysCount = Math.floor((config.endDate - config.startDate) / (1000 * 60 * 60 * 24)) + 1;
                const perDayAmount = config.targetMoney / daysCount;
                for (let d = 0; d < daysCount; d++) {
                    const jobDate = new Date(config.startDate.getTime() + (d * 24 * 60 * 60 * 1000));
                    invoiceJobs.push({
                        date: jobDate,
                        dayLog: { items: [{ name: 'รับชำระ', qty: 1, price: perDayAmount }] },
                        overrides: {}
                    });
                }
            } else if (hasFixedItems) {
                statusText.innerText = 'Distributing exact items...';
                await new Promise(r => setTimeout(r, 10));

                const daysCount = Math.floor((config.endDate - config.startDate) / (1000 * 60 * 60 * 24)) + 1;
                const distributedLog = distributeMath(config, daysCount);

                if (!distributedLog) {
                    throw new Error("Could not find an exact combination to meet the target money using only the provided item prices and max quantity limits. Tip: Ensure your Target Money is reachable by combining your exact item prices (e.g. they share a common divisor).");
                }

                for (let i = 0; i < distributedLog.length; i++) {
                    const dayLog = distributedLog[i];
                    if (dayLog.items.length === 0) continue;
                    const jobDate = new Date(config.startDate.getTime() + (i * 24 * 60 * 60 * 1000));
                    invoiceJobs.push({
                        date: jobDate,
                        dayLog: dayLog,
                        overrides: {}
                    });
                }
            }

            if (!isReceipt) {
                // Collect ad-hoc invoices (excluded from monthly target)
                for (let ai = 0; ai < adhocCards.length; ai++) {
                const card = adhocCards[ai];
                const dateVal = card.querySelector('.adhoc-date').value;
                if (!dateVal) throw new Error(`Ad-hoc invoice #${ai + 1} is missing a date.`);
                const adhocItems = Array.from(card.querySelectorAll('.adhoc-items-tbody tr')).map(row => ({
                    name: row.querySelector('.adhoc-item-name').value,
                    qty: parseInt(row.querySelector('.adhoc-item-qty').value) || 0,
                    price: parseFloat(row.querySelector('.adhoc-item-price').value) || 0
                })).filter(it => it.name && it.qty > 0 && it.price > 0);
                if (adhocItems.length === 0) throw new Error(`Ad-hoc invoice #${ai + 1} has no valid items.`);
                
                invoiceJobs.push({
                    date: parseDateString(dateVal),
                    dayLog: { items: adhocItems },
                    isAdhoc: true,
                    overrides: (() => {
                        const o = {
                            vatRate: parseFloat(card.querySelector('.adhoc-vat-rate').value) || 0,
                            targetType: card.querySelector('.adhoc-target-type').value
                        };
                        if (!card.querySelector('.adhoc-use-main-cust').checked) {
                            o.custName = card.querySelector('.adhoc-cust-name').value;
                            o.custTax = normalizeTaxId(card.querySelector('.adhoc-cust-tax').value);
                            o.custAddr = card.querySelector('.adhoc-cust-addr').value;
                            o.custBranchType = card.querySelector('.adhoc-branch-type').value;
                            o.custBranchNo = card.querySelector('.adhoc-branch-no').value;
                        }
                        return o;
                    })()
                });
            }
            }

            // Sort all jobs chronologically by date
            invoiceJobs.sort((a, b) => a.date.getTime() - b.date.getTime());

            // 3. Generate PDFs
            const zip = new JSZip();
            let invCounter = config.invStartNum;
            let adhocCounter = 1;
            let runningDateInvNum = null;
            const adhocDateSeq = {};

            for (let i = 0; i < invoiceJobs.length; i++) {
                const job = invoiceJobs[i];

                const pct = Math.round(((i + 1) / invoiceJobs.length) * 100);
                statusPct.innerText = pct + '%';
                progressFill.style.width = pct + '%';
                statusText.innerText = `Generating PDF ${i + 1} of ${invoiceJobs.length}...`;
                await new Promise(r => setTimeout(r, 10)); // Yield for UI

                let prefix = config.receiptMode ? 'RC-' : '';
                let invNumber;
                if (job.isAdhoc) {
                    const yyyy = job.date.getFullYear();
                    const mm = String(job.date.getMonth() + 1).padStart(2, '0');
                    const dd = String(job.date.getDate()).padStart(2, '0');
                    const dateKey = `${yyyy}${mm}${dd}`;
                    const adhocPrefix = config.receiptMode ? 'RC-' : 'WH-';
                    if (config.useDateInv) {
                        if (adhocDateSeq[dateKey] === undefined) adhocDateSeq[dateKey] = 1;
                        invNumber = `${adhocPrefix}${dateKey}-${String(adhocDateSeq[dateKey]).padStart(4, '0')}`;
                        adhocDateSeq[dateKey]++;
                    } else {
                        invNumber = `${adhocPrefix}${adhocCounter}`;
                        adhocCounter++;
                    }
                } else {
                    const mainPrefix = config.receiptMode ? 'RC-' : 'TX-';
                    if (config.useDateInv) {
                        const yyyy = job.date.getFullYear();
                        const mm = String(job.date.getMonth() + 1).padStart(2, '0');
                        const dd = String(job.date.getDate()).padStart(2, '0');
                        const dateAsNum = parseInt(`${yyyy}${mm}${dd}`, 10);
                        
                        if (runningDateInvNum === null || runningDateInvNum < dateAsNum) {
                            runningDateInvNum = dateAsNum;
                        }
                        
                        invNumber = `${mainPrefix}${runningDateInvNum}`;
                        runningDateInvNum++;
                    } else {
                        invNumber = `${mainPrefix}${invCounter}`;
                        invCounter++;
                    }
                }

                const pdfBlob = await generateInvoicePDF(job.dayLog, config, job.date, 0, invNumber, job.overrides);
                zip.file(`${invNumber}.pdf`, pdfBlob);
            }

            statusText.innerText = 'Zipping files...';
            const zipBlob = await zip.generateAsync({ type: "blob" });
            const d1 = isNaN(config.startDate.getTime()) ? 'unknown' : config.startDate.toISOString().split('T')[0];
            const d2 = isNaN(config.endDate.getTime()) ? 'unknown' : config.endDate.toISOString().split('T')[0];
            saveAs(zipBlob, `Tax_Invoices_${d1}_to_${d2}.zip`);

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

    function getItemsPerPage(paperSize) {
        switch (paperSize) {
            case 'a5': return 8;
            case 'a4': return 16;
            case 'a3': return 22;
            default: return 10;
        }
    }

    function buildReceiptHTML(p) {
        const titleThai = 'ใบเสร็จรับเงิน';
        const titleEng = 'RECEIPT';

        const pageIndicator = p.totalPages > 1
            ? ` (หน้า ${p.pageNum}/${p.totalPages})`
            : '';

        return `
            <div style="text-align:center;margin-bottom:14px;">
                <div style="font-size:${p.fs * 2.0}px;font-weight:700;letter-spacing:0.5px;">${titleThai}</div>
                <div style="font-size:${p.fs * 1.4}px;font-weight:600;letter-spacing:2px;">${titleEng}</div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;gap:16px;">
                <div style="flex:1;">
                    <div style="font-weight:700;font-size:${p.fs * 1.2}px;margin-bottom:4px;border-bottom:1px solid #555;padding-bottom:4px;">ผู้รับเงิน (Supplier)</div>
                    <div style="margin-top:4px;">${p.effectiveConfig.custName}</div>
                    ${p.effectiveConfig.custAddr ? `<div>${p.effectiveConfig.custAddr.replace(/\n/g, '<br>')}</div>` : ''}
                    ${p.effectiveConfig.custTax ? `<div>เลขประจำตัวผู้เสียภาษี: ${formatTaxId(p.effectiveConfig.custTax)}</div>` : ''}
                    ${p.effectiveConfig.custBranchType === 'head' ? '<div>สำนักงานใหญ่</div>' : ''}
                    ${p.effectiveConfig.custBranchType === 'branch' ? `<div>สาขาที่ ${p.effectiveConfig.custBranchNo || '00000'}</div>` : ''}
                </div>
                <div style="border:1px solid #bbb;padding:10px 14px;border-radius:8px;text-align:right;min-width:210px;">
                    <div style="margin-bottom:4px;"><strong>เลขที่ (No.):</strong>&nbsp;${p.invNum}${pageIndicator}</div>
                    <div><strong>วันที่รับเงิน (Date):</strong>&nbsp;${p.dtStr}</div>
                </div>
            </div>

            <div style="background:#f7f7f7;padding:8px 14px;border-radius:6px;margin-bottom:12px;">
                <div style="font-weight:700;font-size:${p.fs * 1.15}px;margin-bottom:4px;border-bottom:1px solid #555;padding-bottom:4px;">ผู้จ่ายเงิน (Payer)</div>
                <div style="margin-top:4px;"><strong>ชื่อบริษัท:</strong>&nbsp;${p.config.compName}</div>
                <div><strong>ที่อยู่:</strong>&nbsp;${p.config.compAddr.replace(/\n/g, '<br>')}</div>
            </div>

            <hr style="border:none;border-top:2px solid #222;margin-bottom:12px;">

            <div style="text-align:center;margin-bottom:8px;">
                <div style="font-size:${p.fs * 1.3}px;font-weight:700;">รายละเอียดการรับเงิน</div>
            </div>

            <table style="width:100%;border-collapse:collapse;border:1px solid #bbb;margin-bottom:16px;">
                <tr>
                    <td style="padding:10px 14px;width:50%;border-bottom:1px solid #e0e0e0;background:#f9f9f9;"><strong>อ้างอิงใบกำกับภาษีเลขที่:</strong></td>
                    <td style="padding:10px 14px;width:50%;border-bottom:1px solid #e0e0e0;">${p.config.sourceInvNum || '—'}</td>
                </tr>
                <tr>
                    <td style="padding:12px 14px;background:#f9f9f9;"><strong>จำนวนเงินที่รับชำระ:</strong></td>
                    <td style="padding:12px 14px;font-size:${p.fs * 1.2}px;font-weight:700;">${p.fmt(p.grandTotal)} บาท</td>
                </tr>
            </table>

            <div style="text-align:center;margin-top:60px;">
                <div style="display:inline-block;border-top:1px solid #555;padding-top:10px;min-width:260px;">
                    <div>ผู้มีอำนาจลงนาม / Authorized Signature</div>
                    <div style="margin-top:4px;">วันที่ (Date): ____________</div>
                </div>
            </div>`;
    }

    function buildPageHTML(p) {
        let titleThai, titleEng;
        if (p.config.useDeliveryNote) {
            titleThai = 'ใบส่งของ / ใบแจ้งหนี้ / ใบกำกับภาษี';
            titleEng = 'DELIVERY ORDER / INVOICE / TAX INVOICE';
        } else {
            titleThai = p.isFullForm
                ? 'ใบกำกับภาษีเต็มรูปแบบ / ใบเสร็จรับเงิน'
                : 'ใบกำกับภาษีอย่างย่อ / ใบเสร็จรับเงิน';
            titleEng = 'TAX INVOICE / RECEIPT';
        }

        const pageIndicator = p.totalPages > 1 
            ? ` (หน้า ${p.pageNum}/${p.totalPages})`
            : '';

        const rowsHTML = p.pageItems.map((item, j) => {
            const seq = p.startSeqNum + j;
            const lineTotal = item.qty * item.price;
            return `<tr>
                <td style="text-align:center;padding:4px 10px;border-bottom:1px solid #e0e0e0;">${seq}</td>
                <td style="padding:4px 10px;border-bottom:1px solid #e0e0e0;">${item.name}</td>
                <td style="text-align:center;padding:4px 10px;border-bottom:1px solid #e0e0e0;">${item.qty}</td>
                <td style="text-align:right;padding:4px 10px;border-bottom:1px solid #e0e0e0;">${p.fmt(item.price)}</td>
                <td style="text-align:right;padding:4px 10px;border-bottom:1px solid #e0e0e0;">${p.fmt(lineTotal)}</td>
            </tr>`;
        }).join('');

        let footerHTML;
        if (p.totalPages > 1 && !p.isLastPage) {
            footerHTML = `<div style="text-align:center;margin-top:18px;color:#555;font-size:${p.fs * 0.95}px;">
                มีใบกำกับภาษีแผ่นต่อไป (Continue on next page)
            </div>`;
        } else {
            footerHTML = `
                <div style="display:flex;justify-content:flex-end;margin-top:18px;">
                    <table style="border-collapse:collapse;">
                        ${p.showVat ? `
                        <tr>
                            <td style="padding:5px 16px;text-align:right;border-bottom:1px solid #e0e0e0;">รวมเงิน (Sub Total):</td>
                            <td style="padding:5px 16px;text-align:right;border-bottom:1px solid #e0e0e0;min-width:150px;">${p.fmt(p.subtotal)} บาท</td>
                        </tr>` : ''}
                        ${p.showVat ? `
                        <tr>
                            <td style="padding:5px 16px;text-align:right;border-bottom:1px solid #e0e0e0;">ภาษีมูลค่าเพิ่ม (VAT ${p.effectiveConfig.vatRate}%):</td>
                            <td style="padding:5px 16px;text-align:right;border-bottom:1px solid #e0e0e0;">${p.fmt(p.vatAmt)} บาท</td>
                        </tr>` : ''}
                        <tr style="background:#f0f0f0;">
                            <td style="padding:8px 16px;text-align:right;font-weight:700;border-top:2px solid #222;">จำนวนเงินรวมภาษีมูลค่าเพิ่มทั้งสิ้น (Grand Total):</td>
                            <td style="padding:8px 16px;text-align:right;font-weight:700;border-top:2px solid #222;">${p.fmt(p.grandTotal)} บาท</td>
                        </tr>
                    </table>
                </div>
                <div style="text-align:center;margin-top:60px;">
                    <div style="display:inline-block;border-top:1px solid #555;padding-top:10px;min-width:260px;">
                        <div>ผู้มีอำนาจลงนาม / Authorized Signature</div>
                        <div style="margin-top:4px;">วันที่ (Date): ____________</div>
                    </div>
                </div>`;
        }

        return `
            <div style="text-align:center;margin-bottom:14px;">
                <div style="font-size:${p.fs * 1.6}px;font-weight:700;letter-spacing:0.5px;">${titleThai}</div>
                <div style="font-size:${p.fs * 1.2}px;font-weight:600;letter-spacing:2px;">${titleEng}</div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;gap:16px;">
                <div style="flex:1;">
                    <div style="font-weight:700;font-size:${p.fs * 1.3}px;margin-bottom:4px;">${p.config.compName}</div>
                    <div>${p.config.compAddr.replace(/\n/g, '<br>')}</div>
                    <div>เลขประจำตัวผู้เสียภาษี: ${formatTaxId(p.config.compTax)}</div>
                    ${p.config.compBranchType === 'head' ? '<div>สำนักงานใหญ่</div>' : ''}
                    ${p.config.compBranchType === 'branch' ? `<div>สาขาที่ ${p.config.compBranchNo || '00000'}</div>` : ''}
                    ${p.config.compPhone ? `<div>โทร: ${p.config.compPhone}</div>` : ''}
                </div>
                <div style="border:1px solid #bbb;padding:10px 14px;border-radius:8px;text-align:right;min-width:210px;">
                    <div style="margin-bottom:4px;"><strong>เลขที่ (No.):</strong>&nbsp;${p.invNum}${pageIndicator}</div>
                    <div><strong>วันที่ (Date):</strong>&nbsp;${p.dtStr}</div>
                </div>
            </div>

            <hr style="border:none;border-top:2px solid #222;margin-bottom:10px;">

            <div style="background:#f7f7f7;padding:8px 14px;border-radius:6px;margin-bottom:12px;">
                <div><strong>ชื่อลูกค้า (Customer):</strong>&nbsp;${p.effectiveConfig.custName}</div>
                ${p.effectiveConfig.custTax ? `<div><strong>เลขประจำตัวผู้เสียภาษี:</strong>&nbsp;${formatTaxId(p.effectiveConfig.custTax)}</div>` : ''}
                ${p.effectiveConfig.custBranchType === 'head' ? '<div><strong>สถานะสาขา:</strong>&nbsp;สำนักงานใหญ่</div>' : ''}
                ${p.effectiveConfig.custBranchType === 'branch' ? `<div><strong>สถานะสาขา:</strong>&nbsp;สาขาที่ ${p.effectiveConfig.custBranchNo || '00000'}</div>` : ''}
                ${p.effectiveConfig.custAddr ? `<div><strong>ที่อยู่ (Address):</strong>&nbsp;${p.effectiveConfig.custAddr.replace(/\n/g, '<br>')}</div>` : ''}
            </div>

            <table style="width:100%;border-collapse:collapse;border:1px solid #bbb;">
                <thead>
                    <tr>
                        <th style="padding:6px 10px;text-align:center;width:7%;font-size:${p.fs * 0.9}px;background:#f0f0f0;color:#111;">ลำดับ</th>
                        <th style="padding:6px 10px;text-align:left;font-size:${p.fs * 0.9}px;background:#f0f0f0;color:#111;">รายการ (Description)</th>
                        <th style="padding:6px 10px;text-align:center;width:10%;font-size:${p.fs * 0.9}px;background:#f0f0f0;color:#111;">จำนวน</th>
                        <th style="padding:6px 10px;text-align:right;width:18%;font-size:${p.fs * 0.9}px;background:#f0f0f0;color:#111;">ราคา/หน่วย (บาท)</th>
                        <th style="padding:6px 10px;text-align:right;width:18%;font-size:${p.fs * 0.9}px;background:#f0f0f0;color:#111;">จำนวนเงิน (บาท)</th>
                    </tr>
                </thead>
                <tbody>${rowsHTML}</tbody>
            </table>
            ${footerHTML}
        `;
    }

    async function generateInvoicePDF(dayLog, config, startDate, dayOffset, invNum, overrides = {}) {
        const effectiveConfig = { ...config, ...overrides };
        const dateObj = new Date(startDate.getTime() + (dayOffset * 24 * 60 * 60 * 1000));
        const dtStr = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;

        const grandTotalItemsValue = dayLog.items.reduce((sum, item) => sum + item.qty * item.price, 0);
        let subtotal, vatAmt, grandTotal;
        if (effectiveConfig.targetType === 'inclusive') {
            grandTotal = grandTotalItemsValue;
            subtotal = grandTotal / (1 + (effectiveConfig.vatRate / 100));
            vatAmt = grandTotal - subtotal;
        } else {
            subtotal = grandTotalItemsValue;
            vatAmt = subtotal * (effectiveConfig.vatRate / 100);
            grandTotal = subtotal + vatAmt;
        }
        const fmt = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        const paperPx = { a3: [1122, 1587], a4: [794, 1123], a5: [559, 794] };
        const paperMm = { a3: [297, 420], a4: [210, 297], a5: [148, 210] };
        const [pxW, pxH] = paperPx[config.paperSize];
        const [mmW, mmH] = paperMm[config.paperSize];
        const pad = Math.round(pxW * 0.05);
        const fs = config.paperSize === 'a3' ? 16 : config.paperSize === 'a5' ? 13 : 13;

        const isFullForm = config.invoiceType === 'full';
        const showVat = isFullForm ? true : !config.hideVat;
        const isReceipt = config.receiptMode;

        const itemsPerPage = getItemsPerPage(config.paperSize);
        const totalPages = isReceipt ? 1 : (Math.ceil(dayLog.items.length / itemsPerPage) || 1);

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: config.paperSize
        });

        if (isReceipt) {
            const el = document.createElement('div');
            el.style.cssText = `
                position:fixed; left:-9999px; top:0;
                width:${pxW}px; height:${pxH}px;
                background:#fff; color:#111;
                font-family:'Sarabun','Noto Sans Thai',sans-serif;
                font-size:${fs}px; line-height:1.7;
                padding:${pad}px; box-sizing:border-box;
                overflow:hidden;
            `;
            el.innerHTML = buildReceiptHTML({
                config, effectiveConfig, dtStr, invNum,
                grandTotal, fmt, fs, pad, pxW, pxH,
                totalPages: 1, pageNum: 1, isLastPage: true
            });

            document.body.appendChild(el);
            try {
                await document.fonts.ready;
                const canvas = await html2canvas(el, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff',
                    width: pxW,
                    windowWidth: pxW
                });
                const imgData = canvas.toDataURL('image/jpeg', 0.93);
                doc.addImage(imgData, 'JPEG', 0, 0, mmW, mmH);
            } finally {
                document.body.removeChild(el);
            }
        } else {
            for (let page = 0; page < totalPages; page++) {
            const pageNum = page + 1;
            const isLastPage = pageNum === totalPages;
            const pageItems = dayLog.items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
            const startSeqNum = page * itemsPerPage + 1;

            const el = document.createElement('div');
            el.style.cssText = `
                position:fixed; left:-9999px; top:0;
                width:${pxW}px; height:${pxH}px;
                background:#fff; color:#111;
                font-family:'Sarabun','Noto Sans Thai',sans-serif;
                font-size:${fs}px; line-height:1.7;
                padding:${pad}px; box-sizing:border-box;
                overflow:hidden;
            `;
            el.innerHTML = buildPageHTML({
                pageNum, totalPages, pageItems, startSeqNum, isLastPage,
                config, effectiveConfig, dtStr, invNum,
                subtotal, vatAmt, grandTotal, showVat, isFullForm,
                fs, pad, pxW, pxH, fmt
            });

            document.body.appendChild(el);
            try {
                await document.fonts.ready;
                const canvas = await html2canvas(el, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff',
                    width: pxW,
                    windowWidth: pxW
                });
                const imgData = canvas.toDataURL('image/jpeg', 0.93);
                if (page > 0) doc.addPage();
                doc.addImage(imgData, 'JPEG', 0, 0, mmW, mmH);
            } finally {
                document.body.removeChild(el);
            }
        }

        }

        return doc.output('blob');
    }
});
