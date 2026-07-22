// --- DATA CONFIGURATION ---
const categories = [
    { id: 1, name: "Categoría Nº 1", base: 845 },
    { id: 2, name: "Categoría Nº 2", base: 716 },
    { id: 3, name: "Categoría Nº 3", base: 606 },
    { id: 4, name: "Categoría Nº 4", base: 529 },
    { id: 5, name: "Categoría Nº 5", base: 461 },
    { id: 6, name: "Categoría Nº 6", base: 402 },
    { id: 7, name: "Categoría Nº 7", base: 350 },
    { id: 8, name: "Categoría Nº 8", base: 306 },
    { id: 9, name: "Categoría Nº 9", base: 254 },
    { id: 10, name: "Categoría Nº 10", base: 224 },
    { id: 11, name: "Categoría Nº 11", base: 199 },
    { id: 12, name: "Categoría Nº 12", base: 176 },
    { id: 13, name: "Categoría Nº 13", base: 155 },
    { id: 14, name: "Categoría Nº 14", base: 138 }
];

// --- MESES DATA FOR ESCALAS ---
const mesesData = [
    { mes: "Diciembre 2025", porcentaje: "2%", valorModulo: 2605.9469319 },
    { mes: "Enero 2026", porcentaje: "2.5%", valorModulo: 2671.0956052 },
    { mes: "Febrero 2026", porcentaje: "2.2%", valorModulo: 2729.8597085 },
    { mes: "Marzo 2026", porcentaje: "2%", valorModulo: 2784.4569027 },
    { mes: "Abril 2026", porcentaje: "1.7%", valorModulo: 2831.7926700 },
    { mes: "Mayo 2026", porcentaje: "1.5%", valorModulo: 2874.2695601 },
    { mes: "Junio 2026", porcentaje: "2.4%", valorModulo: 2943.2520295 },
    { mes: "Julio 2026", porcentaje: "2.2%", valorModulo: 3008.0035742 },
    { mes: "Agosto 2026", porcentaje: "1.9%", valorModulo: 3065.1556421 }
];

// Placeholder config percentages
const config = {
    valorModulo: 3065.1556421, // Default base module value
    antiguedadModulosPorAno: 6.6, // 6.6 module units per year
    presentismoModulos: {
        si: 100, // 100 modules
        si60: 60, // 60 modules
        no: 0
    },
    sindicatos: {
        apl: 0.02,   // APL 2%
        ate: 0.025,  // ATE 2.5%
        upcn: 0.03   // UPCN 3%
    },
    rc022023Modulos: 85.141, // 85.141 modules
    descuentos: [
        { name: "D.A.S. OS TITULAR DIG", rate: 0.03 }, // 3%
        { name: "D.A.S. OS FDO TRASP. DIG", rate: 0.005 }, // 0.50%
        { name: "APORTE JUBILATORIO DIG", rate: 0.11 }, // 11%
        { name: "APORTE LEY 19.032 DIG", rate: 0.03 }, // 3%
        { name: "D.A.S. SEGURO DE SEPELIO", rate: 0.003 }, // 0.30%
        { name: "BCO. C.A.S.A. SEG DE VIDA O.", rate: 0.00036 } // 0.00036 multiplier
    ]
};

// --- DOM ELEMENTS ---
const selectCategoria = document.getElementById('categoria');
const inputValorModulo = document.getElementById('valor-modulo');
const inputAntiguedad = document.getElementById('antiguedad');
const selectTitulo = document.getElementById('titulo');
const selectPresentismo = document.getElementById('presentismo');
const selectPermanencia = document.getElementById('permanencia');
const inputAdicionalFuncion = document.getElementById('adicional-funcion');
const inputDasFamiliar = document.getElementById('das-familiar');
const inputComidaDias = document.getElementById('comida-dias');
const checkboxesSindicato = document.querySelectorAll('#sindicato-group input[type="checkbox"]');
const listRemuneracion = document.getElementById('list-remuneracion');
const listDescuentos = document.getElementById('list-descuentos');
const textSubtotalRemunerativo = document.getElementById('subtotal-remunerativo');
const textSubtotalDescuentos = document.getElementById('subtotal-descuentos');
const textTotalNeto = document.getElementById('total-neto');
const btnLimpiar = document.getElementById('btn-limpiar');

// Nav Buttons
const btnGeneral = document.getElementById('nav-general');
const btnEscalas = document.getElementById('nav-escalas');
const btnAdmin = document.getElementById('nav-admin');
const viewGeneral = document.getElementById('view-general');
const viewEscalas = document.getElementById('view-escalas');
const viewAdmin = document.getElementById('view-admin');

// Escalas elements
const selectMesEscala = document.getElementById('select-mes-escala');
const escalaTbody = document.getElementById('escala-tbody');
const escalaValorModuloText = document.getElementById('escala-valor-modulo');

// Admin Elements
const adminValorModulo = document.getElementById('admin-valor-modulo');
const adminAntiguedad = document.getElementById('admin-antiguedad');
const adminPresSi = document.getElementById('admin-pres-si');
const adminPresSi60 = document.getElementById('admin-pres-si60');
const adminRc022023 = document.getElementById('admin-rc022023');
const btnSaveAdmin = document.getElementById('btn-save-admin');
const adminSaveMsg = document.getElementById('admin-save-msg');

// --- INITIALIZATION ---
function init() {
    // Populate Categories
    selectCategoria.innerHTML = '<option value="">Seleccione Categoría...</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.base;
        option.textContent = `${cat.name} (${cat.base})`;
        selectCategoria.appendChild(option);
    });

    // Event Listeners for inputs
    const inputs = [selectCategoria, inputAntiguedad, selectTitulo, selectPresentismo, selectPermanencia, inputAdicionalFuncion, inputDasFamiliar, inputComidaDias];
    inputs.forEach(input => {
        input.addEventListener('input', calculateSalary);
    });

    checkboxesSindicato.forEach(cb => {
        cb.addEventListener('change', calculateSalary);
    });

    btnLimpiar.addEventListener('click', () => {
        selectCategoria.value = '';
        inputAntiguedad.value = '';
        selectTitulo.value = 'ninguno';
        selectPresentismo.value = 'no';
        selectPermanencia.value = '0';
        inputAdicionalFuncion.value = 'no';
        inputDasFamiliar.value = '';
        inputComidaDias.value = '';
        checkboxesSindicato.forEach(cb => cb.checked = false);
        
        calculateSalary();
    });

    // Setup Admin Panel and defaults
    inputValorModulo.value = config.valorModulo;
    adminValorModulo.value = config.valorModulo;
    adminAntiguedad.value = config.antiguedadModulosPorAno;
    adminPresSi.value = config.presentismoModulos.si;
    adminPresSi60.value = config.presentismoModulos.si60;
    adminRc022023.value = config.rc022023Modulos;

    btnSaveAdmin.addEventListener('click', saveAdminConfig);

    mesesData.forEach((data, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${data.mes} (+${data.porcentaje})`;
        // Default to Agosto 2026 (index 8) which matches our main module value
        if (index === 8) option.selected = true;
        selectMesEscala.appendChild(option);
    });
    selectMesEscala.addEventListener('change', renderEscala);

    // Nav Switcher
    function switchView(targetView, targetBtn) {
        // Hide all views
        viewGeneral.classList.remove('active');
        viewEscalas.classList.remove('active');
        viewAdmin.classList.remove('active');
        // Deactivate all buttons
        btnGeneral.classList.remove('active');
        btnEscalas.classList.remove('active');
        btnAdmin.classList.remove('active');

        // Show target view and activate target button
        targetView.classList.add('active');
        targetBtn.classList.add('active');
    }

    btnGeneral.addEventListener('click', () => {
        switchView(viewGeneral, btnGeneral);
    });

    btnAdmin.addEventListener('click', () => {
        switchView(viewAdmin, btnAdmin);
    });

    btnEscalas.addEventListener('click', () => {
        switchView(viewEscalas, btnEscalas);
        renderEscala();
    });

    renderEmptyStates();
    renderEscala();
}

// --- LOGIC ---
function calculateSalary() {
    // Parse values
    const catBase = parseFloat(selectCategoria.value) || 0;
    const valorModulo = parseFloat(inputValorModulo.value) || 0;
    const antiguedad = parseInt(inputAntiguedad.value) || 0;
    const tituloKey = selectTitulo.value;
    const presentismoKey = selectPresentismo.value;
    const permanenciaAnos = parseInt(selectPermanencia.value) || 0;
    const dasFamiliares = parseInt(inputDasFamiliar.value) || 0;
    const comidaDias = parseInt(inputComidaDias.value) || 0;

    const selectedCat = categories.find(c => c.base === catBase);
    const catId = selectedCat ? selectedCat.id : 0;
    const cat14Base = 138; // Categoría 14 base

    // Check if we have the minimum required to calculate
    if (catBase === 0 || valorModulo === 0) {
        renderEmptyStates();
        return;
    }

    // --- REMUNERATION CALCULATIONS ---
    const sumaResultante = catBase * valorModulo;
    const sueldoBasico = sumaResultante * 0.30;
    const dedicacionFuncional = sumaResultante * 0.70;

    const extraAntiguedad = config.antiguedadModulosPorAno * valorModulo * antiguedad;

    // Titulo logic
    let extraTitulo = 0;
    if (tituloKey === 'uni_5') extraTitulo = sumaResultante * 0.20;
    else if (tituloKey === 'uni_4') extraTitulo = sumaResultante * 0.14;
    else if (tituloKey === 'uni_3') extraTitulo = sumaResultante * 0.08;
    else if (tituloKey === 'sec_5') {
        if (catId >= 1 && catId <= 7) extraTitulo = sumaResultante * 0.036;
        else if (catId >= 8 && catId <= 14) extraTitulo = (cat14Base * valorModulo) * 0.075;
    }
    else if (tituloKey === 'sec_3') {
        if (catId >= 1 && catId <= 7) extraTitulo = sumaResultante * 0.02;
        else if (catId >= 8 && catId <= 14) extraTitulo = (cat14Base * valorModulo) * 0.042;
    }
    else if (tituloKey === 'cert_3') {
        if (catId >= 1 && catId <= 7) extraTitulo = sumaResultante * 0.014;
        else if (catId >= 8 && catId <= 14) extraTitulo = (cat14Base * valorModulo) * 0.03;
    }

    // Presentismo logic: modules * module value
    const extraPresentismo = (config.presentismoModulos[presentismoKey] || 0) * valorModulo;

    // Adicional por Capacitación logic
    const capacitacionValor = 38 + catId; // Maps cat 1 to 39, cat 14 to 52
    const extraCapacitacion = capacitacionValor * valorModulo;

    const extraRc022023 = config.rc022023Modulos * valorModulo;

    // Adic. Readec. Escal. logic
    const adicEscalMap = { 1: 326, 2: 245, 3: 175, 4: 126, 5: 83, 6: 45, 7: 12 };
    const adicEscalValor = adicEscalMap[catId] || 0;
    const extraAdicEscalf = adicEscalValor * valorModulo;

    // Adic. Cert. Norma ISO 9001 logic
    let extraIso9001 = 0;
    if (catId >= 1 && catId <= 3) extraIso9001 = sumaResultante * 0.09;
    else if (catId >= 4 && catId <= 8) extraIso9001 = sumaResultante * 0.11;
    else if (catId >= 9 && catId <= 14) extraIso9001 = sumaResultante * 0.13;

    // Adicional por Función (Cat 1 a 3)
    let extraFuncion = 0;
    if (inputAdicionalFuncion.value === 'si' && catId >= 1 && catId <= 3) {
        extraFuncion = sumaResultante * 0.10;
    }

    // Permanencia en Categoría
    let extraPermanencia = 0;
    if (permanenciaAnos >= 2) {
        if (catId >= 1 && catId <= 3) {
            if (permanenciaAnos === 2) extraPermanencia = sumaResultante * (3.011 / 100);
            else if (permanenciaAnos === 4) extraPermanencia = sumaResultante * (6.113 / 100);
            else if (permanenciaAnos === 6) extraPermanencia = sumaResultante * (9.308 / 100);
            else if (permanenciaAnos >= 8) extraPermanencia = sumaResultante * (12.600 / 100);
        } else if (catId >= 4 && catId <= 8) {
            if (permanenciaAnos === 2) extraPermanencia = sumaResultante * (2.482 / 100);
            else if (permanenciaAnos === 4) extraPermanencia = sumaResultante * (5.026 / 100);
            else if (permanenciaAnos === 6) extraPermanencia = sumaResultante * (7.632 / 100);
            else if (permanenciaAnos >= 8) extraPermanencia = sumaResultante * (10.305 / 100);
        }
    }

    // Comida logic
    const cat9Base = categories.find(c => c.id === 9)?.base || 254;
    const extraComida = (cat9Base * valorModulo) * 0.01 * comidaDias;

    const totalRemunerativo = sueldoBasico + dedicacionFuncional + extraAntiguedad + extraTitulo + extraPresentismo + extraCapacitacion + extraRc022023 + extraAdicEscalf + extraIso9001 + extraFuncion + extraPermanencia + extraComida;

    // Render Remuneration (Nombres exactos de la imagen)
    const remItems = [
        { name: "R-PREMIO ASISTENCIA", amount: extraPresentismo, expl: `Módulos por asistencia × Valor Módulo. Ej: ${(config.presentismoModulos[presentismoKey] || 0)} × $${valorModulo.toFixed(2)}` },
        { name: "SUELDO BASICO", amount: sueldoBasico, expl: `30% de (Categoría Base × Valor Módulo). Ej: 30% de (${catBase} × $${valorModulo.toFixed(2)})` },
        { name: "DEDICACION FUNCIONAL", amount: dedicacionFuncional, expl: `70% de (Categoría Base × Valor Módulo). Ej: 70% de (${catBase} × $${valorModulo.toFixed(2)})` },
        { name: "ANTIGUEDAD", amount: extraAntiguedad, expl: `Años × 6.6 módulos × Valor Módulo. Ej: ${antiguedad} × 6.6 × $${valorModulo.toFixed(2)}` },
        { name: "ADICIONAL POR CAPACITACION", amount: extraCapacitacion, expl: `Módulos de Capacitación Cat. ${catId} × Valor Módulo. Ej: ${capacitacionValor} × $${valorModulo.toFixed(2)}` },
        { name: "RC 02/2023", amount: extraRc022023, expl: `85.141 módulos × Valor Módulo. Ej: 85.141 × $${valorModulo.toFixed(2)}` },
        { name: "ADIC. READEC. ESCAL.", amount: extraAdicEscalf, expl: `Módulos Readecuación Cat. ${catId} × Valor Módulo. Ej: ${adicEscalValor} × $${valorModulo.toFixed(2)}` },
        { name: "TITULO", amount: extraTitulo, expl: `Porcentaje escalonado según el título elegido. Ej: Resultado para título '${selectTitulo.options[selectTitulo.selectedIndex]?.text || ''}'` },
        { name: "ADIC. CERT. NORMA ISO 9001", amount: extraIso9001, expl: `Porcentaje de (Cat. Base × Valor Módulo). Ej: Porcentaje correspondiente × $${sumaResultante.toFixed(2)}` },
        { name: "ADICIONAL POR FUNCION", amount: extraFuncion, expl: `10% de (Cat. Base × Valor Módulo). Ej: 10% de $${sumaResultante.toFixed(2)}` },
        { name: "PERMANENCIA EN CATEGORIA", amount: extraPermanencia, expl: `Porcentaje de (Cat. Base × Valor Módulo) según años. Ej: Escala por ${permanenciaAnos} años × $${sumaResultante.toFixed(2)}` },
        { name: "COMIDA", amount: extraComida, expl: `Días × 1% de (Módulos Cat. 9 × Valor Módulo). Ej: ${comidaDias} × 0.01 × (${cat9Base} × $${valorModulo.toFixed(2)})` }
    ];
    renderList(listRemuneracion, remItems.filter(item => item.amount > 0));
    textSubtotalRemunerativo.textContent = formatCurrency(totalRemunerativo);


    // Calculate Discounts over Total Remunerativo
    let totalDescuentos = 0;
    const descItems = config.descuentos.map(desc => {
        const amount = totalRemunerativo * desc.rate;
        totalDescuentos += amount;
        const rateStr = (desc.rate * 100).toFixed(2).replace(/\.00$/, '');
        return { name: desc.name, amount, expl: `${rateStr}% sobre Subtotal Remunerativo. Ej: ${rateStr}% de $${totalRemunerativo.toFixed(2)}` };
    });

    // D.A.S. Familiar a Cargo
    if (dasFamiliares > 0) {
        const rateFam = 0.03 * dasFamiliares;
        const amountFam = totalRemunerativo * rateFam;
        totalDescuentos += amountFam;
        descItems.push({ name: `D.A.S. FAM. A CARGO (${dasFamiliares})`, amount: amountFam, expl: `3% sobre Subtotal Remun. por cada familiar. Ej: ${dasFamiliares} × 3% de $${totalRemunerativo.toFixed(2)}` });
    }

    // Sindicatos discounts
    checkboxesSindicato.forEach(cb => {
        if (cb.checked) {
            const name = "SINDICATO " + cb.value.toUpperCase();
            const rate = config.sindicatos[cb.value];
            const amount = totalRemunerativo * rate;
            totalDescuentos += amount;
            const rateStr = (rate * 100).toFixed(1).replace(/\.0$/, '');
            descItems.push({ name, amount, expl: `${rateStr}% sobre Subtotal Remunerativo. Ej: ${rateStr}% de $${totalRemunerativo.toFixed(2)}` });
        }
    });

    // Render Discounts
    renderList(listDescuentos, descItems);
    textSubtotalDescuentos.textContent = formatCurrency(totalDescuentos);

    // --- TOTAL ---
    const totalNeto = totalRemunerativo - totalDescuentos;
    textTotalNeto.textContent = formatCurrency(totalNeto);
}

function saveAdminConfig() {
    config.valorModulo = parseFloat(adminValorModulo.value) || 0;
    config.antiguedadModulosPorAno = parseFloat(adminAntiguedad.value) || 0;
    config.presentismoModulos.si = parseFloat(adminPresSi.value) || 0;
    config.presentismoModulos.si60 = parseFloat(adminPresSi60.value) || 0;
    config.rc022023Modulos = parseFloat(adminRc022023.value) || 0;

    inputValorModulo.value = config.valorModulo;
    calculateSalary();

    adminSaveMsg.style.opacity = 1;
    setTimeout(() => {
        adminSaveMsg.style.opacity = 0;
    }, 3000);
}

// --- UTILS ---
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(amount);
}

function renderList(listElement, items) {
    listElement.innerHTML = '';
    if (items.length === 0) {
        listElement.innerHTML = '<li class="empty-state">Sin conceptos</li>';
        return;
    }

    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'concept-item';

        const nameWrapper = document.createElement('div');
        nameWrapper.style.display = 'flex';
        nameWrapper.style.alignItems = 'center';
        nameWrapper.style.gap = '0.5rem';

        const spanName = document.createElement('span');
        spanName.textContent = item.name;

        if (item.expl) {
            const spanInfo = document.createElement('span');
            spanInfo.className = 'info-tooltip';
            spanInfo.innerHTML = 'i';
            spanInfo.setAttribute('data-tooltip', item.expl);
            nameWrapper.appendChild(spanName);
            nameWrapper.appendChild(spanInfo);
        } else {
            nameWrapper.appendChild(spanName);
        }

        const spanAmount = document.createElement('span');
        spanAmount.textContent = formatCurrency(item.amount);

        li.appendChild(nameWrapper);
        li.appendChild(spanAmount);
        listElement.appendChild(li);
    });
}

function renderEmptyStates() {
    listRemuneracion.innerHTML = '<li class="empty-state">Ingrese los datos para iniciar el cálculo.</li>';
    listDescuentos.innerHTML = '<li class="empty-state">Ingrese los datos para iniciar el cálculo.</li>';
    textSubtotalRemunerativo.textContent = '$ 0.00';
    textSubtotalDescuentos.textContent = '$ 0.00';
    textTotalNeto.textContent = '$ 0.00';
}

// --- ESCALAS LOGIC ---
function renderEscala() {
    const dataIndex = selectMesEscala.value;
    const data = mesesData[dataIndex];
    if (!data) return;

    escalaValorModuloText.textContent = formatCurrency(data.valorModulo);
    escalaTbody.innerHTML = '';

    const adicEscalMap = { 1: 326, 2: 245, 3: 175, 4: 126, 5: 83, 6: 45, 7: 12 };

    categories.forEach(cat => {
        const catId = cat.id;
        const sueldoBasico = cat.base * data.valorModulo * 0.30;
        const dedicacionFuncional = cat.base * data.valorModulo * 0.70;
        const capacitacionValor = 38 + catId;
        const extraCapacitacion = capacitacionValor * data.valorModulo;
        const extraRc022023 = config.rc022023Modulos * data.valorModulo;
        const adicEscalValor = adicEscalMap[catId] || 0;
        const extraAdicEscalf = adicEscalValor * data.valorModulo;

        const totalBruto = sueldoBasico + dedicacionFuncional + extraCapacitacion + extraRc022023 + extraAdicEscalf;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${catId}</td>
            <td>${formatCurrency(sueldoBasico)}</td>
            <td>${formatCurrency(dedicacionFuncional)}</td>
            <td style="color: var(--text-secondary); text-align: center; font-size: 0.85rem;">${capacitacionValor}</td>
            <td>${formatCurrency(extraCapacitacion)}</td>
            <td style="color: var(--text-secondary); text-align: center; font-size: 0.85rem;">${config.rc022023Modulos}</td>
            <td>${formatCurrency(extraRc022023)}</td>
            <td style="color: var(--text-secondary); text-align: center; font-size: 0.85rem;">${adicEscalValor}</td>
            <td>${formatCurrency(extraAdicEscalf)}</td>
            <td>${formatCurrency(totalBruto)}</td>
        `;
        escalaTbody.appendChild(tr);
    });
}

// Start app
document.addEventListener('DOMContentLoaded', init);
