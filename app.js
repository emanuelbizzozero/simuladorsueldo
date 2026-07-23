
// --- MESES DATA NOW IN CONFIG ---
// Default config parameters
const defaultConfig = {
    escalasHistoricas: [
        { id: 'esc_1', mes: "Diciembre 2025", porcentaje: "2%", valorModulo: 2605.9469319, presentismo: 100, antiguedad: 6.6 },
        { id: 'esc_2', mes: "Enero 2026", porcentaje: "2.5%", valorModulo: 2671.0956052, presentismo: 100, antiguedad: 6.6 },
        { id: 'esc_3', mes: "Febrero 2026", porcentaje: "2.2%", valorModulo: 2729.8597085, presentismo: 100, antiguedad: 6.6 },
        { id: 'esc_4', mes: "Marzo 2026", porcentaje: "2%", valorModulo: 2784.4569027, presentismo: 100, antiguedad: 6.6 },
        { id: 'esc_5', mes: "Abril 2026", porcentaje: "1.7%", valorModulo: 2831.7926700, presentismo: 100, antiguedad: 6.6 },
        { id: 'esc_6', mes: "Mayo 2026", porcentaje: "1.5%", valorModulo: 2874.2695601, presentismo: 100, antiguedad: 6.6 },
        { id: 'esc_7', mes: "Junio 2026", porcentaje: "2.4%", valorModulo: 2943.2520295, presentismo: 100, antiguedad: 6.6 },
        { id: 'esc_8', mes: "Julio 2026", porcentaje: "2.2%", valorModulo: 3008.0035742, presentismo: 100, antiguedad: 6.6 },
        { id: 'esc_9', mes: "Agosto 2026", porcentaje: "1.9%", valorModulo: 3065.1556421, presentismo: 100, antiguedad: 6.6 }
    ],
    categories: [
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
    ],
    valorModulo: 3065.1556421,
    sueldoBasicoPct: 0.30,
    dedicacionFuncionalPct: 0.70,
    antiguedadModulosPorAno: 6.6,
    presentismoModulos: { si: 100, si60: 60, no: 0 },
    sindicatos: { apl: 0.02, ate: 0.025, upcn: 0.03 },
    rc022023Modulos: 85.141,
    adicFuncionPct: 0.10,
    comidaPct: 0.01,
    descuentos: {
        jubilacion: 0.11,
        ley19032: 0.03,
        osTitular: 0.03,
        osFdo: 0.005,
        sepelio: 0.003,
        bcoCasa: 0.00036
    },
    dynamicColumns: [
        {
            id: 'adic_capacitacion',
            name: 'Adic. Capacitación',
            modules: { 1: 39, 2: 40, 3: 41, 4: 42, 5: 43, 6: 44, 7: 45, 8: 46, 9: 47, 10: 48, 11: 49, 12: 50, 13: 51, 14: 52 }
        },
        {
            id: 'rc_022023',
            name: 'RC 02/2023',
            modules: { 1: 85.141, 2: 85.141, 3: 85.141, 4: 85.141, 5: 85.141, 6: 85.141, 7: 85.141, 8: 85.141, 9: 85.141, 10: 85.141, 11: 85.141, 12: 85.141, 13: 85.141, 14: 85.141 }
        },
        {
            id: 'adic_readec',
            name: 'Adic. Readec. Escal.',
            modules: { 1: 326, 2: 245, 3: 175, 4: 126, 5: 83, 6: 45, 7: 12, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0 }
        }
    ]
};

// Load config from localStorage or use default
let config = { ...defaultConfig };
try {
    const saved = localStorage.getItem('simulador_sueldo_config');
    if (saved) {
        config = { ...defaultConfig, ...JSON.parse(saved) };
    }
} catch (e) {
    console.error("Error loading config", e);
}

let categories = config.categories;

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
const btnAdmin = document.getElementById('nav-admin');
const btnEscalas = document.getElementById('nav-escalas');
const viewGeneral = document.getElementById('view-general');
const viewEscalas = document.getElementById('view-escalas');
const viewAdmin = document.getElementById('view-admin');

// Escalas elements
const selectMesEscala = document.getElementById('select-mes-escala');
const escalaTbody = document.getElementById('escala-tbody');
const escalaValorModuloText = document.getElementById('escala-valor-modulo');

// Admin Elements
const btnSaveAdmin = document.getElementById('btn-save-admin');
const adminSaveMsg = document.getElementById('admin-save-msg');

// --- INITIALIZATION ---
function init() {
    // Populate Categories
    renderCategoriesDropdown();

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
    document.getElementById('admin-valor-modulo').value = config.valorModulo;
    document.getElementById('admin-sueldo-basico-pct').value = config.sueldoBasicoPct * 100;
    document.getElementById('admin-dedicacion-func-pct').value = config.dedicacionFuncionalPct * 100;
    document.getElementById('admin-antiguedad').value = config.antiguedadModulosPorAno;
    
    document.getElementById('admin-desc-jubilacion').value = config.descuentos.jubilacion * 100;
    document.getElementById('admin-desc-ley19032').value = config.descuentos.ley19032 * 100;
    document.getElementById('admin-desc-os-titular').value = config.descuentos.osTitular * 100;
    document.getElementById('admin-desc-os-fdo').value = config.descuentos.osFdo * 100;
    document.getElementById('admin-desc-sepelio').value = config.descuentos.sepelio * 100;
    
    document.getElementById('admin-sind-apl').value = config.sindicatos.apl * 100;
    document.getElementById('admin-sind-ate').value = config.sindicatos.ate * 100;
    document.getElementById('admin-sind-upcn').value = config.sindicatos.upcn * 100;
    
    document.getElementById('admin-pres-si').value = config.presentismoModulos.si;
    document.getElementById('admin-pres-si60').value = config.presentismoModulos.si60;
    document.getElementById('admin-adic-funcion-pct').value = config.adicFuncionPct * 100;
    document.getElementById('admin-comida-pct').value = config.comidaPct * 100;
    
    config.categories.forEach((cat, index) => {
        const el = document.getElementById(`admin-cat-${index + 1}`);
        if (el) el.value = cat.base;
    });

    btnSaveAdmin.addEventListener('click', saveAdminConfig);

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

    // Add Column Logic
    document.getElementById('btn-add-column')?.addEventListener('click', () => {
        const colName = prompt("Ingrese el nombre de la nueva columna (Ej: Bono Especial)");
        if (colName) {
            config.dynamicColumns.push({
                id: 'col_' + Date.now(),
                name: colName,
                modules: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0 }
            });
            renderAdminDynamicTable();
            renderEscala();
            calculateSalary();
        }
    });

    // Add Scale Logic
    document.getElementById('btn-add-scale')?.addEventListener('click', () => {
        const mesName = prompt("Ingrese el mes y año (Ej: Septiembre 2026)");
        if (mesName) {
            // Get values from the last scale or defaults
            const lastScale = config.escalasHistoricas.length > 0 ? config.escalasHistoricas[config.escalasHistoricas.length - 1] : null;
            config.escalasHistoricas.push({
                id: 'esc_' + Date.now(),
                mes: mesName,
                porcentaje: "0%",
                valorModulo: lastScale ? lastScale.valorModulo : config.valorModulo,
                presentismo: lastScale ? lastScale.presentismo : 100,
                antiguedad: lastScale ? lastScale.antiguedad : 6.6
            });
            renderAdminScalesTable();
            updateEscalasDropdown();
            renderEscala();
        }
    });

    // Sidebar Toggle Logic
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggleBtn && sidebar) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    renderEmptyStates();
    updateEscalasDropdown();
    renderEscala();
    renderAdminDynamicTable();
    renderAdminScalesTable();
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
    const sueldoBasico = sumaResultante * config.sueldoBasicoPct;
    const dedicacionFuncional = sumaResultante * config.dedicacionFuncionalPct;

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

    // Adic. Cert. Norma ISO 9001 logic
    let extraIso9001 = 0;
    if (catId >= 1 && catId <= 3) extraIso9001 = sumaResultante * 0.09;
    else if (catId >= 4 && catId <= 8) extraIso9001 = sumaResultante * 0.11;
    else if (catId >= 9 && catId <= 14) extraIso9001 = sumaResultante * 0.13;

    // Adicional por Función (Cat 1 a 3)
    let extraFuncion = 0;
    if (inputAdicionalFuncion.value === 'si' && catId >= 1 && catId <= 3) {
        extraFuncion = sumaResultante * config.adicFuncionPct;
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
    const extraComida = (cat9Base * valorModulo) * config.comidaPct * comidaDias;

    // Dynamic Columns (from Escala)
    let totalDynamicColumns = 0;
    const dynamicItems = [];
    config.dynamicColumns.forEach(col => {
        const modules = col.modules[catId] || 0;
        const amount = modules * valorModulo;
        totalDynamicColumns += amount;
        dynamicItems.push({
            name: col.name.toUpperCase(),
            amount: amount,
            expl: `${modules} módulos × Valor Módulo\nEj: ${modules} × $${valorModulo.toFixed(2)}`
        });
    });

    const totalRemunerativo = sueldoBasico + dedicacionFuncional + extraAntiguedad + extraTitulo + extraPresentismo + totalDynamicColumns + extraIso9001 + extraFuncion + extraPermanencia + extraComida;

    // Render Remuneration (Nombres exactos de la imagen)
    const remItems = [
        { name: "R-PREMIO ASISTENCIA", amount: extraPresentismo, expl: `Módulos por asistencia × Valor Módulo\nEj: ${(config.presentismoModulos[presentismoKey] || 0)} × $${valorModulo.toFixed(2)}` },
        { name: "SUELDO BASICO", amount: sueldoBasico, expl: `${config.sueldoBasicoPct * 100}% de (Categoría Base × Valor Módulo)\nEj: ${config.sueldoBasicoPct * 100}% de (${catBase} × $${valorModulo.toFixed(2)})` },
        { name: "DEDICACION FUNCIONAL", amount: dedicacionFuncional, expl: `${config.dedicacionFuncionalPct * 100}% de (Categoría Base × Valor Módulo)\nEj: ${config.dedicacionFuncionalPct * 100}% de (${catBase} × $${valorModulo.toFixed(2)})` },
        { name: "ANTIGUEDAD", amount: extraAntiguedad, expl: `Años × 6.6 módulos × Valor Módulo\nEj: ${antiguedad} × 6.6 × $${valorModulo.toFixed(2)}` },
        ...dynamicItems,
        { name: "TITULO", amount: extraTitulo, expl: `Porcentaje escalonado según el título elegido\nEj: Resultado para título '${selectTitulo.options[selectTitulo.selectedIndex]?.text || ''}'` },
        { name: "ADIC. CERT. NORMA ISO 9001", amount: extraIso9001, expl: `Porcentaje de (Cat. Base × Valor Módulo)\nEj: Porcentaje correspondiente × $${sumaResultante.toFixed(2)}` },
        { name: "ADICIONAL POR FUNCION", amount: extraFuncion, expl: `${config.adicFuncionPct * 100}% de (Cat. Base × Valor Módulo)\nEj: ${config.adicFuncionPct * 100}% de $${sumaResultante.toFixed(2)}` },
        { name: "PERMANENCIA EN CATEGORIA", amount: extraPermanencia, expl: `Porcentaje de (Cat. Base × Valor Módulo) según años\nEj: Escala por ${permanenciaAnos} años × $${sumaResultante.toFixed(2)}` },
        { name: "COMIDA", amount: extraComida, expl: `Días × ${config.comidaPct * 100}% de (Módulos Cat. 9 × Valor Módulo)\nEj: ${comidaDias} × ${config.comidaPct} × (${cat9Base} × $${valorModulo.toFixed(2)})` }
    ];
    renderList(listRemuneracion, remItems.filter(item => item.amount > 0));
    textSubtotalRemunerativo.textContent = formatCurrency(totalRemunerativo);


    // Calculate Discounts over Total Remunerativo
    let totalDescuentos = 0;
    const descList = [
        { name: "D.A.S. OS TITULAR DIG", rate: config.descuentos.osTitular },
        { name: "D.A.S. OS FDO TRASP. DIG", rate: config.descuentos.osFdo },
        { name: "APORTE JUBILATORIO DIG", rate: config.descuentos.jubilacion },
        { name: "APORTE LEY 19.032 DIG", rate: config.descuentos.ley19032 },
        { name: "D.A.S. SEGURO DE SEPELIO", rate: config.descuentos.sepelio },
        { name: "BCO. C.A.S.A. SEG DE VIDA O.", rate: config.descuentos.bcoCasa }
    ];
    const descItems = descList.map(desc => {
        const amount = totalRemunerativo * desc.rate;
        totalDescuentos += amount;
        const rateStr = (desc.rate * 100).toFixed(4).replace(/\.?0+$/, '');
        return { name: desc.name, amount, expl: `${rateStr}% sobre Subtotal Remunerativo\nEj: ${rateStr}% de $${totalRemunerativo.toFixed(2)}` };
    });

    // D.A.S. Familiar a Cargo
    if (dasFamiliares > 0) {
        const rateFam = 0.03 * dasFamiliares;
        const amountFam = totalRemunerativo * rateFam;
        totalDescuentos += amountFam;
        descItems.push({ name: `D.A.S. FAM. A CARGO (${dasFamiliares})`, amount: amountFam, expl: `3% sobre Subtotal Remun. por cada familiar\nEj: ${dasFamiliares} × 3% de $${totalRemunerativo.toFixed(2)}` });
    }

    // Sindicatos discounts
    checkboxesSindicato.forEach(cb => {
        if (cb.checked) {
            const name = "SINDICATO " + cb.value.toUpperCase();
            const rate = config.sindicatos[cb.value];
            const amount = totalRemunerativo * rate;
            totalDescuentos += amount;
            const rateStr = (rate * 100).toFixed(1).replace(/\.0$/, '');
            descItems.push({ name, amount, expl: `${rateStr}% sobre Subtotal Remunerativo\nEj: ${rateStr}% de $${totalRemunerativo.toFixed(2)}` });
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
    config.valorModulo = parseFloat(document.getElementById('admin-valor-modulo').value) || 0;
    config.sueldoBasicoPct = (parseFloat(document.getElementById('admin-sueldo-basico-pct').value) || 0) / 100;
    config.dedicacionFuncionalPct = (parseFloat(document.getElementById('admin-dedicacion-func-pct').value) || 0) / 100;
    config.antiguedadModulosPorAno = parseFloat(document.getElementById('admin-antiguedad').value) || 0;
    
    config.descuentos.jubilacion = (parseFloat(document.getElementById('admin-desc-jubilacion').value) || 0) / 100;
    config.descuentos.ley19032 = (parseFloat(document.getElementById('admin-desc-ley19032').value) || 0) / 100;
    config.descuentos.osTitular = (parseFloat(document.getElementById('admin-desc-os-titular').value) || 0) / 100;
    config.descuentos.osFdo = (parseFloat(document.getElementById('admin-desc-os-fdo').value) || 0) / 100;
    config.descuentos.sepelio = (parseFloat(document.getElementById('admin-desc-sepelio').value) || 0) / 100;
    
    config.sindicatos.apl = (parseFloat(document.getElementById('admin-sind-apl').value) || 0) / 100;
    config.sindicatos.ate = (parseFloat(document.getElementById('admin-sind-ate').value) || 0) / 100;
    config.sindicatos.upcn = (parseFloat(document.getElementById('admin-sind-upcn').value) || 0) / 100;
    

    config.presentismoModulos.si = parseFloat(document.getElementById('admin-pres-si').value) || 0;
    config.presentismoModulos.si60 = parseFloat(document.getElementById('admin-pres-si60').value) || 0;
    config.adicFuncionPct = (parseFloat(document.getElementById('admin-adic-funcion-pct').value) || 0) / 100;
    config.comidaPct = (parseFloat(document.getElementById('admin-comida-pct').value) || 0) / 100;

    config.categories.forEach((cat, index) => {
        const el = document.getElementById(`admin-cat-${index + 1}`);
        if (el && el.value) {
            cat.base = parseFloat(el.value);
        }
    });

    // Save to localStorage
    try {
        localStorage.setItem('simulador_sueldo_config', JSON.stringify(config));
    } catch(e) {
        console.error("Failed to save config to local storage", e);
    }

    inputValorModulo.value = config.valorModulo;
    renderCategoriesDropdown();
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

// --- ADMIN DYNAMIC TABLE ---
function renderAdminDynamicTable() {
    const table = document.getElementById('admin-dynamic-table');
    if (!table) return;
    
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    
    // Build Headers
    let theadHTML = `
        <tr>
            <th style="vertical-align: middle;">Cat.</th>
            <th style="vertical-align: middle; text-align: center;">S. Bas. (%)</th>
            <th style="vertical-align: middle; text-align: center;">D. Func. (%)</th>
    `;
    
    config.dynamicColumns.forEach((col, index) => {
        theadHTML += `
            <th style="text-align: center;">
                <input type="text" class="admin-col-name" data-index="${index}" value="${col.name}" style="background: transparent; border: none; color: inherit; font-weight: bold; font-family: inherit; font-size: inherit; width: 120px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.2);"><br>
                <button class="btn-delete-col" data-index="${index}" style="background: rgba(255,0,0,0.2); border: 1px solid red; color: red; border-radius: 4px; padding: 2px 5px; font-size: 0.7rem; cursor: pointer; margin-top: 5px;" title="Eliminar Columna">Eliminar</button>
            </th>
        `;
    });
    
    theadHTML += `</tr>`;
    thead.innerHTML = theadHTML;
    
    // Build Body
    tbody.innerHTML = '';
    categories.forEach(cat => {
        const catId = cat.id;
        const tr = document.createElement('tr');
        
        let trHTML = `
            <td>${catId}</td>
            <td style="text-align: center; color: var(--text-secondary);">30%</td>
            <td style="text-align: center; color: var(--text-secondary);">70%</td>
        `;
        
        config.dynamicColumns.forEach((col, index) => {
            const val = col.modules[catId] || 0;
            trHTML += `
                <td style="text-align: center;">
                    <input type="number" step="any" class="admin-col-val" data-col-index="${index}" data-cat-id="${catId}" value="${val}" style="width: 80px; background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); color: var(--text-primary); text-align: center; border-radius: 4px; padding: 4px;">
                </td>
            `;
        });
        
        tr.innerHTML = trHTML;
        tbody.appendChild(tr);
    });
    
    // Add event listeners for dynamic inputs
    thead.querySelectorAll('.admin-col-name').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = e.target.getAttribute('data-index');
            config.dynamicColumns[index].name = e.target.value;
        });
    });
    
    tbody.querySelectorAll('.admin-col-val').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = e.target.getAttribute('data-col-index');
            const catId = e.target.getAttribute('data-cat-id');
            config.dynamicColumns[index].modules[catId] = parseFloat(e.target.value) || 0;
        });
    });
    
    thead.querySelectorAll('.btn-delete-col').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            if (confirm(`¿Eliminar la columna "${config.dynamicColumns[index].name}"?`)) {
                config.dynamicColumns.splice(index, 1);
                renderAdminDynamicTable();
                renderEscala();
                calculateSalary();
            }
        });
    });
}

// --- ADMIN SCALES (AUMENTOS) ---
function renderAdminScalesTable() {
    const table = document.getElementById('admin-scales-table');
    if (!table) return;

    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    config.escalasHistoricas.forEach((escala, index) => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>
                <input type="text" class="admin-escala-val" data-field="mes" data-index="${index}" value="${escala.mes}" style="width: 140px;">
            </td>
            <td>
                <input type="text" class="admin-escala-val" data-field="porcentaje" data-index="${index}" value="${escala.porcentaje}" style="width: 80px;">
            </td>
            <td>
                <input type="number" step="any" class="admin-escala-val" data-field="valorModulo" data-index="${index}" value="${escala.valorModulo}" style="width: 110px;">
            </td>
            <td>
                <input type="number" step="any" class="admin-escala-val" data-field="presentismo" data-index="${index}" value="${escala.presentismo}" style="width: 80px;">
            </td>
            <td>
                <input type="number" step="any" class="admin-escala-val" data-field="antiguedad" data-index="${index}" value="${escala.antiguedad}" style="width: 80px;">
            </td>
            <td>
                <button class="btn-delete-escala" data-index="${index}" title="Eliminar Escala" style="background: var(--error-color); color: white; border: none; border-radius: 4px; padding: 4px 8px; cursor: pointer;">&times;</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Attach events
    table.querySelectorAll('.admin-escala-val').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = e.target.getAttribute('data-index');
            const field = e.target.getAttribute('data-field');
            let val = e.target.value;
            
            if (['valorModulo', 'presentismo', 'antiguedad'].includes(field)) {
                val = parseFloat(val) || 0;
            }
            
            config.escalasHistoricas[index][field] = val;
            updateEscalasDropdown();
            renderEscala();
        });
    });

    table.querySelectorAll('.btn-delete-escala').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            if (confirm(`¿Seguro que deseas eliminar la escala de "${config.escalasHistoricas[index].mes}"?`)) {
                config.escalasHistoricas.splice(index, 1);
                renderAdminScalesTable();
                updateEscalasDropdown();
                renderEscala();
            }
        });
    });
}


// --- ESCALAS LOGIC ---
function updateEscalasDropdown() {
    const currentValue = selectMesEscala.value;
    selectMesEscala.innerHTML = '';
    config.escalasHistoricas.forEach((data, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${data.mes} (+${data.porcentaje})`;
        selectMesEscala.appendChild(option);
    });
    
    // Restore previous selection if still valid, otherwise select the last one
    if (currentValue && config.escalasHistoricas[currentValue]) {
        selectMesEscala.value = currentValue;
    } else if (config.escalasHistoricas.length > 0) {
        selectMesEscala.value = config.escalasHistoricas.length - 1;
    }
}

function renderEscala() {
    const dataIndex = selectMesEscala.value;
    const data = config.escalasHistoricas[dataIndex];
    if (!data) return;

    escalaValorModuloText.textContent = formatCurrency(data.valorModulo);
    
    // Calculate and display reference values for Presentismo and Antigüedad based on the selected scale
    const valorPresentismo = (data.presentismo || 100) * data.valorModulo;
    const valorAntiguedad = 1 * (data.antiguedad || 6.6) * data.valorModulo;
    
    const presentismoEl = document.getElementById('escala-valor-presentismo');
    const antiguedadEl = document.getElementById('escala-valor-antiguedad');
    if (presentismoEl) presentismoEl.textContent = formatCurrency(valorPresentismo);
    if (antiguedadEl) antiguedadEl.textContent = formatCurrency(valorAntiguedad);

    const thead = document.getElementById('main-escala-thead');
    const tbody = document.getElementById('escala-tbody');
    
    if (!thead || !tbody) return;

    // Build Headers Dynamically
    let theadHTML = `
        <tr>
            <th rowspan="2" style="vertical-align: middle;">Cat.</th>
            <th rowspan="2" style="vertical-align: middle;">Sdo. Básico</th>
            <th rowspan="2" style="vertical-align: middle;">D. Funcional</th>
    `;
    config.dynamicColumns.forEach(col => {
        theadHTML += `<th colspan="2" style="text-align: center; border-bottom: none;">${col.name}</th>`;
    });
    theadHTML += `<th rowspan="2" style="vertical-align: middle;">TOTAL BRUTO</th></tr><tr>`;
    
    config.dynamicColumns.forEach(() => {
        theadHTML += `
            <th style="text-align: center; font-size: 0.75rem;">Mód.</th>
            <th style="text-align: right; font-size: 0.75rem;">$</th>
        `;
    });
    theadHTML += `</tr>`;
    thead.innerHTML = theadHTML;

    // Build Rows Dynamically
    tbody.innerHTML = '';
    categories.forEach(cat => {
        const catId = cat.id;
        const sueldoBasico = cat.base * data.valorModulo * config.sueldoBasicoPct;
        const dedicacionFuncional = cat.base * data.valorModulo * config.dedicacionFuncionalPct;
        
        let totalBruto = sueldoBasico + dedicacionFuncional;
        let trHTML = `
            <td>${catId}</td>
            <td>${formatCurrency(sueldoBasico)}</td>
            <td>${formatCurrency(dedicacionFuncional)}</td>
        `;
        
        config.dynamicColumns.forEach(col => {
            const modules = col.modules[catId] || 0;
            const amount = modules * data.valorModulo;
            totalBruto += amount;
            
            trHTML += `
                <td style="color: var(--text-secondary); text-align: center; font-size: 0.85rem;">${modules}</td>
                <td>${formatCurrency(amount)}</td>
            `;
        });
        
        trHTML += `<td>${formatCurrency(totalBruto)}</td>`;
        
        const tr = document.createElement('tr');
        tr.innerHTML = trHTML;
        tbody.appendChild(tr);
    });
}

function renderCategoriesDropdown() {
    const currentCatId = selectCategoria.options[selectCategoria.selectedIndex]?.text.match(/Categoría Nº (\d+)/)?.[1];
    
    selectCategoria.innerHTML = '<option value="">Seleccione Categoría...</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.base;
        option.textContent = `${cat.name} (${cat.base})`;
        selectCategoria.appendChild(option);
    });

    if (currentCatId) {
        const updatedCat = categories.find(c => c.id == currentCatId);
        if (updatedCat) {
            selectCategoria.value = updatedCat.base;
        }
    }
}

// Start app
document.addEventListener('DOMContentLoaded', init);
