// نظام منطق المحاسبة التكليفية الذكي (Cost Accounting App Engine)
// النسخة المحسنة - تم إصلاح جميع الأخطاء

// الحالة العامة للتطبيق (Application State)
let state = {
  currency: 'DZD',
  products: [],
  fixedCosts: [],
  overheadCostPools: [],
  activeTab: 'dashboard',
  selectedProductId: null,
  cvpSelectedProductId: null,
  charts: {},
  language: 'fr'
};

// قاموس الترجمة للواجهات الثابتة
const TRANSLATIONS = {
  ar: {
    lang_btn: "Français",
    print_btn: "تصدير PDF / طباعة",
    excel_tpl_btn: "تحميل نموذج Excel",
    excel_imp_btn: "استيراد من Excel",
    factory_selector_lbl: "القالب النشط:",
    add_product_btn: "إضافة منتج جديد",
    logo_title: "محاسبة التكاليف",
    logo_subtitle: "المصنع المتكامل للنسيج والإسفنج",
    nav_dashboard: "لوحة التحكم الرئيسية",
    nav_costing: "بطاقة تكلفة المنتج",
    nav_cvp: "تحليل التعادل (CVP)",
    nav_abc: "تخصيص التكاليف (ABC)",
    nav_variance: "تحليل الانحرافات",
    current_user: "المستخدم الحالي: مدير المصنع",
    version: "v1.0.0 (النسخة الذكية)",
    kpi_fixed: "إجمالي التكاليف الثابتة",
    kpi_sales: "إجمالي مبيعات المصنع (المخطط)",
    kpi_profit: "صافي الربح الإجمالي المقدر",
    kpi_safety: "نسبة هامش الأمان الإجمالي",
    chart_comp_title: "مقارنة الإيرادات والتكاليف الإجمالية للمنتجات",
    chart_fixed_title: "توزيع التكاليف الثابتة",
    table_summary_title: "ملخص قائمة المنتجات وحجم الإنتاج",
    th_product: "المنتج",
    th_unit: "وحدة القياس",
    th_price: "سعر البيع المقدر",
    th_unit_cost: "تكلفة الوحدة",
    th_cm_unit: "هامش المساهمة",
    th_volume: "حجم المبيعات",
    th_revenue: "الإيرادات الإجمالية",
    choose_product: "اختر المنتج لتعديله",
    cost_sheet_title: "تفاصيل تكلفة المنتج",
    prod_name: "اسم المنتج",
    prod_selling_price: "سعر بيع الوحدة",
    prod_planned_vol: "حجم المبيعات المخطط",
    direct_materials: "المواد المباشرة",
    add_material: "إضافة خامة",
    th_mat_name: "اسم الخامة",
    th_mat_qty: "الكمية للوحدة",
    th_mat_unit: "الوحدة",
    th_mat_price: "سعر الشراء",
    th_mat_total: "التكلفة الإجمالية",
    th_delete: "حذف",
    direct_labor: "الأجور المباشرة",
    add_labor: "إضافة وظيفة",
    th_lab_name: "اسم الوظيفة",
    th_lab_hours: "ساعات العمل",
    th_lab_rate: "معدل الأجر",
    th_lab_total: "التكلفة الإجمالية",
    moh_title: "التكاليف الصناعية غير المباشرة",
    moh_basis_label: "أساس التخصيص",
    moh_unit_allocated: "قيمة التخصيص للوحدة",
    prime_cost: "التكلفة الأولية",
    conversion_cost: "تكلفة التحويل",
    total_unit_cost: "تكلفة الوحدة الإجمالية",
    suggested_pricing: "حاسبة تسعير المنتج",
    required_markup: "هامش الربح المطلوب (%)",
    suggested_price: "سعر البيع المقترح",
    current_cm_unit: "هامش المساهمة الحالي",
    basis_labor: "ساعات العمل المباشر",
    basis_material: "تكلفة المواد المباشرة",
    basis_units: "بالتساوي على الوحدات المنتجة",
    cvp_simulation: "محاكاة حجم المبيعات والأرباح",
    choose_product_cvp: "اختر المنتج للتحليل",
    bep_units: "نقطة التعادل بالوحدات",
    bep_value: "نقطة التعادل بالقيمة",
    target_volume_slider: "حجم المبيعات المستهدف:",
    sim_revenue: "الإيرادات الإجمالية",
    sim_total_costs: "التكاليف الإجمالية",
    sim_net_profit: "صافي الربح",
    target_profit_calc: "الوحدات المطلوبة لتحقيق ربح:",
    chart_cvp_title: "رسم بياني CVP",
    abc_comparison: "المقارنة بين التقليدي و ABC",
    abc_desc: "توضح هذه الصفحة تأثير التوزيع الدقيق للتكاليف غير المباشرة",
    abc_pools_title: "مجمعات التكلفة غير المباشرة",
    th_pool_name: "مجمع التكلفة",
    th_pool_cost: "قيمة التكلفة",
    th_pool_driver: "مسبب التكلفة",
    th_pool_total_driver: "المحرك الإجمالي",
    th_pool_rate: "معدل التكلفة",
    abc_traditional_title: "التوزيع التقليدي",
    abc_traditional_desc: "حسب ساعات العمل المباشر",
    th_trad_hours: "ساعات العمل",
    th_trad_moh: "نصيب MOH",
    th_trad_total_cost: "التكلفة الإجمالية",
    abc_advanced_title: "التوزيع على أساس النشاط",
    abc_advanced_desc: "حسب الاستهلاك الفعلي للأنشطة",
    th_abc_driver_usage: "المسبب المستهلك",
    th_abc_moh: "نصيب MOH",
    th_abc_total_cost: "التكلفة الإجمالية",
    abc_executive_title: "النتيجة الاستشارية",
    variance_desc: "تحليل الفروقات بين المعياري والفعلي",
    variance_mat_title: "انحراف المواد المباشرة",
    variance_lab_title: "انحراف الأجور المباشرة",
    th_var_mat_name: "الخامة",
    th_var_price_std_act: "سعر معياري/فعلي",
    th_var_qty_std_act: "كمية معيارية/فعلية",
    th_var_price_var: "انحراف السعر",
    th_var_qty_var: "انحراف الكمية",
    th_var_total_mat: "الإجمالي",
    th_var_lab_name: "العملية",
    th_var_rate_std_act: "معدل معياري/فعلي",
    th_var_hours_std_act: "ساعات معيارية/فعلية",
    th_var_rate_var: "انحراف المعدل",
    th_var_eff_var: "انحراف الكفاءة",
    th_var_total_lab: "الإجمالي",
    variance_rules_title: "قواعد التحليل",
    footer: "© 2026 جميع الحقوق محفوظة",
    footer_sub: "نظام محاسبة تكاليف ذكي مع رسوم بيانية تفاعلية"
  },
  fr: {
    lang_btn: "العربية",
    print_btn: "Exporter PDF",
    excel_tpl_btn: "Télécharger Excel",
    excel_imp_btn: "Importer Excel",
    factory_selector_lbl: "Gabarit actif:",
    add_product_btn: "Ajouter produit",
    logo_title: "Gestion des Coûts",
    logo_subtitle: "Usine Textile & Mousse",
    nav_dashboard: "Tableau de Bord",
    nav_costing: "Fiche de Coût",
    nav_cvp: "Analyse CVP",
    nav_abc: "Méthode ABC",
    nav_variance: "Analyse Écarts",
    current_user: "Utilisateur: Directeur",
    version: "v1.0.0",
    kpi_fixed: "Coûts Fixes Totaux",
    kpi_sales: "Ventes Totales",
    kpi_profit: "Bénéfice Net",
    kpi_safety: "Marge Sécurité",
    chart_comp_title: "Comparaison CA vs Coûts",
    chart_fixed_title: "Répartition Coûts Fixes",
    table_summary_title: "Résumé Produits",
    th_product: "Produit",
    th_unit: "Unité",
    th_price: "Prix Vente",
    th_unit_cost: "Coût Unitaire",
    th_cm_unit: "Marge/Coût Var",
    th_volume: "Volume",
    th_revenue: "Chiffre d'Affaires",
    choose_product: "Choisir produit",
    cost_sheet_title: "Détails Coût Produit",
    prod_name: "Nom produit",
    prod_selling_price: "Prix vente unitaire",
    prod_planned_vol: "Volume prévu",
    direct_materials: "Matières Directes",
    add_material: "Ajouter matière",
    th_mat_name: "Matière",
    th_mat_qty: "Qté/Unité",
    th_mat_unit: "Unité",
    th_mat_price: "Prix unitaire",
    th_mat_total: "Coût Total",
    th_delete: "Suppr",
    direct_labor: "Main d'Œuvre Directe",
    add_labor: "Ajouter poste",
    th_lab_name: "Poste",
    th_lab_hours: "Heures/Unité",
    th_lab_rate: "Taux horaire",
    th_lab_total: "Coût Total",
    moh_title: "Frais Généraux",
    moh_basis_label: "Base répartition",
    moh_unit_allocated: "Part MOH unitaire",
    prime_cost: "Coût Premier",
    conversion_cost: "Coût Transformation",
    total_unit_cost: "Coût Revient Unitaire",
    suggested_pricing: "Calculateur Prix",
    required_markup: "Marge cible (%)",
    suggested_price: "Prix suggéré",
    current_cm_unit: "Marge sur Coût Var",
    basis_labor: "Heures MOD",
    basis_material: "Coût Matières",
    basis_units: "Répartition égale",
    cvp_simulation: "Simulation Volume",
    choose_product_cvp: "Choisir produit",
    bep_units: "Seuil Rentabilité (unités)",
    bep_value: "Seuil Rentabilité (valeur)",
    target_volume_slider: "Volume cible:",
    sim_revenue: "Chiffre d'Affaires",
    sim_total_costs: "Coûts Totaux",
    sim_net_profit: "Bénéfice Net",
    target_profit_calc: "Unités pour bénéfice cible:",
    chart_cvp_title: "Graphique CVP",
    abc_comparison: "Comparaison Traditionnel vs ABC",
    abc_desc: "Impact de la répartition précise des frais indirects",
    abc_pools_title: "Pools de coûts",
    th_pool_name: "Pool d'Activité",
    th_pool_cost: "Coût Total",
    th_pool_driver: "Inducteur",
    th_pool_total_driver: "Volume Total",
    th_pool_rate: "Taux",
    abc_traditional_title: "Méthode Traditionnelle",
    abc_traditional_desc: "Basée sur heures MOD",
    th_trad_hours: "Heures MOD",
    th_trad_moh: "Part MOH",
    th_trad_total_cost: "Coût Unitaire",
    abc_advanced_title: "Méthode ABC",
    abc_advanced_desc: "Basée sur consommation réelle",
    th_abc_driver_usage: "Inducteur consommé",
    th_abc_moh: "Part MOH ABC",
    th_abc_total_cost: "Coût Unitaire ABC",
    abc_executive_title: "Note stratégique",
    variance_desc: "Analyse écarts standard vs réel",
    variance_mat_title: "Écart Matières",
    variance_lab_title: "Écart Main d'Œuvre",
    th_var_mat_name: "Matière",
    th_var_price_std_act: "Prix Std/Réel",
    th_var_qty_std_act: "Qté Std/Réelle",
    th_var_price_var: "Écart Prix",
    th_var_qty_var: "Écart Qté",
    th_var_total_mat: "Total",
    th_var_lab_name: "Opération",
    th_var_rate_std_act: "Taux Std/Réel",
    th_var_hours_std_act: "Heures Std/Réelles",
    th_var_rate_var: "Écart Taux",
    th_var_eff_var: "Écart Efficacité",
    th_var_total_lab: "Total",
    variance_rules_title: "Règles d'analyse",
    footer: "© 2026 Tous droits réservés",
    footer_sub: "Système de comptabilité analytique intelligent"
  }
};

const DATA_TRANSLATIONS = {
  ar: {
    'prod-fabric': 'قماش صناعي (بالمتر)',
    'prod-plastic': 'فيلم بلاستيك تغليف (بالكجم)',
    'prod-foam': 'إسفنج مرن (بلوك)',
    'prod-mattress': 'مرتبة إسفنجية',
    'خيوط بوليستر': 'خيوط بوليستر',
    'حبيبات بولي إيثيلين': 'حبيبات بولي إيثيلين',
    'مادة البوليول': 'مادة البوليول',
    'pool-setup': 'إعداد الآلات',
    'pool-power': 'الطاقة والآلات',
    'pool-qc': 'مراقبة الجودة',
    'pool-handling': 'مناولة المواد'
  },
  fr: {
    'prod-fabric': 'Tissu industriel',
    'prod-plastic': 'Film plastique',
    'prod-foam': 'Mousse flexible',
    'prod-mattress': 'Matelas mousse',
    'خيوط بوليستر': 'Fils polyester',
    'حبيبات بولي إيثيلين': 'Granulés polyéthylène',
    'مادة البوليول': 'Polyol',
    'pool-setup': 'Configuration machines',
    'pool-power': 'Énergie machines',
    'pool-qc': 'Contrôle qualité',
    'pool-handling': 'Manutention'
  }
};

function translateVal(val) {
  const lang = state.language || 'ar';
  if (DATA_TRANSLATIONS[lang] && DATA_TRANSLATIONS[lang][val]) {
    return DATA_TRANSLATIONS[lang][val];
  }
  return val;
}

function toggleLanguage() {
  const newLang = state.language === 'ar' ? 'fr' : 'ar';
  setLanguage(newLang);
}

function setLanguage(lang) {
  state.language = lang;
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', lang);
  
  const langBtnText = document.getElementById('lang-btn-text');
  if (langBtnText) langBtnText.innerText = TRANSLATIONS[lang].lang_btn;
  
  translateStaticUI(lang);
  refreshAllCalculations();
}

function translateStaticUI(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;
  
  const logoText = document.querySelector('.logo-text');
  if (logoText) {
    const h1 = logoText.querySelector('h1');
    const p = logoText.querySelector('p');
    if (h1) h1.innerText = t.logo_title;
    if (p) p.innerText = t.logo_subtitle;
  }
  
  const navItems = document.querySelectorAll('.nav-item');
  const navTexts = [t.nav_dashboard, t.nav_costing, t.nav_cvp, t.nav_abc, t.nav_variance];
  navItems.forEach((item, idx) => {
    const span = item.querySelector('span');
    if (span && navTexts[idx]) span.innerText = navTexts[idx];
  });
  
  const currentUserText = document.getElementById('current-user-text');
  if (currentUserText) currentUserText.innerText = t.current_user;
  const versionText = document.getElementById('version-text');
  if (versionText) versionText.innerText = t.version;
  
  const factoryLabel = document.querySelector('.factory-selector-label');
  if (factoryLabel) factoryLabel.innerHTML = `<i class="fa-solid fa-industry"></i> ${t.factory_selector_lbl}`;
  
  const btns = document.querySelectorAll('.btn-print');
  btns.forEach(btn => {
    const span = btn.querySelector('span');
    if (span) {
      if (btn.querySelector('.fa-file-excel')) span.innerText = t.excel_tpl_btn;
      else if (btn.querySelector('.fa-file-import')) span.innerText = t.excel_imp_btn;
      else if (btn.querySelector('.fa-print')) span.innerText = t.print_btn;
    }
  });
  
  const selector = document.getElementById('factory-template-selector');
  if (selector) {
    selector.options[0].text = lang === 'ar' ? "مصنع القماش والإسفنج" : "Usine Textile & Mousse";
    if (selector.options[1]) selector.options[1].text = lang === 'ar' ? "مصنع أثاث خشبي" : "Usine Meubles";
    if (selector.options[2]) selector.options[2].text = lang === 'ar' ? "مخبز وحلويات" : "Boulangerie";
  }
  
  const kpiTitles = document.querySelectorAll('.kpi-card .kpi-info h3');
  const kpiTexts = [t.kpi_fixed, t.kpi_sales, t.kpi_profit, t.kpi_safety];
  kpiTitles.forEach((title, idx) => { if (title && kpiTexts[idx]) title.innerText = kpiTexts[idx]; });
  
  const cardTitles = document.querySelectorAll('.card-title');
  if (cardTitles[0]) cardTitles[0].innerHTML = `<i class="fa-solid fa-chart-column"></i> ${t.chart_comp_title}`;
  if (cardTitles[1]) cardTitles[1].innerHTML = `<i class="fa-solid fa-chart-pie"></i> ${t.chart_fixed_title}`;
  if (cardTitles[2]) cardTitles[2].innerHTML = `<i class="fa-solid fa-table-list"></i> ${t.table_summary_title}`;
  
  const tableHeaders = document.querySelectorAll('#dashboard-products-table th');
  const headerTexts = [t.th_product, t.th_unit, t.th_price, t.th_unit_cost, t.th_cm_unit, t.th_volume, t.th_revenue];
  tableHeaders.forEach((th, idx) => { if (th && headerTexts[idx]) th.innerText = headerTexts[idx]; });
  
  const addProductBtn = document.querySelector('#page-costing .btn-primary');
  if (addProductBtn) addProductBtn.innerHTML = `<i class="fa-solid fa-plus"></i> ${t.add_product_btn}`;
  
  const sectionSubtitles = document.querySelectorAll('.section-subtitle');
  if (sectionSubtitles[0]) {
    const span = sectionSubtitles[0].querySelector('span');
    const btn = sectionSubtitles[0].querySelector('button');
    if (span) span.innerText = t.direct_materials;
    if (btn) btn.innerHTML = `<i class="fa-solid fa-plus"></i> ${t.add_material}`;
  }
  if (sectionSubtitles[1]) {
    const span = sectionSubtitles[1].querySelector('span');
    const btn = sectionSubtitles[1].querySelector('button');
    if (span) span.innerText = t.direct_labor;
    if (btn) btn.innerHTML = `<i class="fa-solid fa-plus"></i> ${t.add_labor}`;
  }
}

function loadData(data) {
  state.currency = data.currency || 'د.ج';
  state.products = JSON.parse(JSON.stringify(data.products));
  state.fixedCosts = JSON.parse(JSON.stringify(data.fixedCosts));
  state.overheadCostPools = JSON.parse(JSON.stringify(data.overheadCostPools));
  
  if (state.products.length > 0) {
    state.selectedProductId = state.products[0].id;
    state.cvpSelectedProductId = state.products[0].id;
  }
  
  setLanguage(state.language);
}

function changeFactoryTemplate(templateKey) {
  if (templateKey === 'default') {
    loadData(COST_MOCK_DATA);
  } else if (templateKey === 'furniture') {
    const furnitureData = {
      currency: 'د.ج',
      products: [
        { id: 'prod-chair', name: 'كرسي خشبي كلاسيكي', unit: 'قطعة', sellingPrice: 4200, expectedVolume: 2500, actualVolume: 2400,
          standardCosts: { materials: [{ name: 'خشب زان', quantity: 0.05, unit: 'م3', unitPrice: 45000 }], labor: [{ name: 'نجار', hours: 1.5, hourlyRate: 350 }] },
          actualCosts: { materialTotalQtyUsed: 130, materialUnitPricePaid: 46000, laborTotalHoursUsed: 3800, laborRatePaid: 360 } },
        { id: 'prod-table', name: 'طاولة طعام', unit: 'قطعة', sellingPrice: 18500, expectedVolume: 800, actualVolume: 820,
          standardCosts: { materials: [{ name: 'خشب زان', quantity: 0.20, unit: 'م3', unitPrice: 45000 }], labor: [{ name: 'نجار', hours: 4.0, hourlyRate: 350 }] },
          actualCosts: { materialTotalQtyUsed: 170, materialUnitPricePaid: 44000, laborTotalHoursUsed: 3300, laborRatePaid: 350 } }
      ],
      fixedCosts: [{ category: 'إيجار الورشة', amount: 200000 }, { category: 'رواتب الإدارة', amount: 450000 }],
      overheadCostPools: [{ id: 'pool-setup', name: 'إعداد الآلات', cost: 80000, driverName: 'عدد مرات الضبط', driversPerProduct: { 'prod-chair': 30, 'prod-table': 20 } }]
    };
    loadData(furnitureData);
  } else if (templateKey === 'bakery') {
    const bakeryData = {
      currency: 'د.ج',
      products: [
        { id: 'prod-baguette', name: 'باجيت فرنسي', unit: 'قطعة', sellingPrice: 15, expectedVolume: 120000, actualVolume: 125000,
          standardCosts: { materials: [{ name: 'دقيق', quantity: 0.25, unit: 'كجم', unitPrice: 32 }], labor: [{ name: 'خباز', hours: 0.005, hourlyRate: 300 }] },
          actualCosts: { materialTotalQtyUsed: 31500, materialUnitPricePaid: 31, laborTotalHoursUsed: 610, laborRatePaid: 310 } }
      ],
      fixedCosts: [{ category: 'إيجار المخبز', amount: 120000 }],
      overheadCostPools: [{ id: 'pool-power', name: 'الطاقة', cost: 280000, driverName: 'ساعات التشغيل', driversPerProduct: { 'prod-baguette': 2400 } }]
    };
    loadData(bakeryData);
  }
}

function switchTab(tabId) {
  state.activeTab = tabId;
  
  document.querySelectorAll('.tab-page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
  
  const activePage = document.getElementById(`page-${tabId}`);
  const activeBtn = document.getElementById(`nav-${tabId}`);
  if (activePage) activePage.classList.add('active');
  if (activeBtn) activeBtn.classList.add('active');
  
  const titleEl = document.getElementById('page-title');
  const subtitleEl = document.getElementById('page-subtitle');
  
  if (titleEl && subtitleEl) {
    switch(tabId) {
      case 'dashboard':
        titleEl.innerText = state.language === 'ar' ? 'لوحة التحكم الرئيسية' : 'Tableau de Bord';
        subtitleEl.innerText = state.language === 'ar' ? 'نظرة عامة على أداء المصنع' : 'Aperçu des performances';
        renderDashboardCharts();
        break;
      case 'costing':
        titleEl.innerText = state.language === 'ar' ? 'بطاقة تكلفة المنتج' : 'Fiche de Coût Produit';
        subtitleEl.innerText = state.language === 'ar' ? 'تعديل وحساب التكاليف' : 'Calcul et modification des coûts';
        renderCostingTab();
        break;
      case 'cvp':
        titleEl.innerText = state.language === 'ar' ? 'تحليل التعادل CVP' : 'Analyse CVP';
        subtitleEl.innerText = state.language === 'ar' ? 'محاكاة حجم الإنتاج والأرباح' : 'Simulation volume et profit';
        initCVPTab();
        break;
      case 'abc':
        titleEl.innerText = state.language === 'ar' ? 'تخصيص التكاليف ABC' : 'Coût par Activité ABC';
        subtitleEl.innerText = state.language === 'ar' ? 'مقارنة التقليدي与现代' : 'Comparaison méthodes';
        renderABCTab();
        break;
      case 'variance':
        titleEl.innerText = state.language === 'ar' ? 'تحليل الانحرافات' : 'Analyse des Écarts';
        subtitleEl.innerText = state.language === 'ar' ? 'مقارنة المعياري بالفعل' : 'Comparaison standard/réel';
        renderVarianceTab();
        break;
    }
  }
}

function formatMoney(amount) {
  const currencySymbol = state.language === 'ar' ? 'د.ج' : 'DZD';
  return Number(amount).toLocaleString() + ' ' + currencySymbol;
}

function refreshAllCalculations() {
  state.products.forEach(product => {
    product.unitMaterialCost = product.standardCosts.materials.reduce((sum, mat) => sum + (mat.quantity * mat.unitPrice), 0);
    product.unitLaborCost = product.standardCosts.labor.reduce((sum, lab) => sum + (lab.hours * lab.hourlyRate), 0);
    product.unitVariableCost = product.unitMaterialCost + product.unitLaborCost;
    product.unitContributionMargin = product.sellingPrice - product.unitVariableCost;
  });
  
  const totalLaborHours = state.products.reduce((sum, prod) => {
    const prodLaborHours = prod.standardCosts.labor.reduce((lSum, l) => lSum + l.hours, 0);
    return sum + (prodLaborHours * prod.expectedVolume);
  }, 0);
  
  const totalOverhead = state.overheadCostPools.reduce((sum, pool) => sum + pool.cost, 0);
  const traditionalOverheadRate = totalLaborHours > 0 ? (totalOverhead / totalLaborHours) : 0;
  
  state.products.forEach(product => {
    const prodLaborHours = product.standardCosts.labor.reduce((lSum, l) => lSum + l.hours, 0);
    product.unitOverheadCost = prodLaborHours * traditionalOverheadRate;
    product.unitTotalCost = product.unitVariableCost + product.unitOverheadCost;
  });
  
  if (state.activeTab === 'dashboard') {
    updateDashboardUI();
    renderDashboardCharts();
  } else if (state.activeTab === 'costing') {
    renderCostingTab();
  } else if (state.activeTab === 'cvp') {
    initCVPTab();
  } else if (state.activeTab === 'abc') {
    renderABCTab();
  } else if (state.activeTab === 'variance') {
    renderVarianceTab();
  }
}

function updateDashboardUI() {
  const totalFixed = state.fixedCosts.reduce((sum, item) => sum + item.amount, 0);
  const fixedEl = document.getElementById('dashboard-fixed-costs');
  if (fixedEl) fixedEl.innerText = formatMoney(totalFixed);
  
  let totalRevenue = 0, totalVariableCost = 0;
  state.products.forEach(prod => {
    totalRevenue += prod.sellingPrice * prod.expectedVolume;
    totalVariableCost += prod.unitVariableCost * prod.expectedVolume;
  });
  
  const totalContributionMargin = totalRevenue - totalVariableCost;
  const netProfit = totalContributionMargin - totalFixed;
  
  const salesEl = document.getElementById('dashboard-total-sales');
  if (salesEl) salesEl.innerText = formatMoney(totalRevenue);
  
  const profitEl = document.getElementById('dashboard-net-profit');
  if (profitEl) {
    profitEl.innerText = formatMoney(netProfit);
    profitEl.style.color = netProfit >= 0 ? '#10b981' : '#f43f5e';
  }
  
  const totalCMRatio = totalRevenue > 0 ? (totalContributionMargin / totalRevenue) : 0;
  const overallBEPValue = totalCMRatio > 0 ? (totalFixed / totalCMRatio) : 0;
  const safetyMarginRatio = totalRevenue > 0 ? ((totalRevenue - overallBEPValue) / totalRevenue) : 0;
  
  const safetyEl = document.getElementById('dashboard-safety-margin');
  if (safetyEl) {
    safetyEl.innerText = (safetyMarginRatio * 100).toFixed(1) + '%';
    safetyEl.style.color = safetyMarginRatio > 0.15 ? '#10b981' : '#f59e0b';
  }
  
  const tbody = document.querySelector('#dashboard-products-table tbody');
  if (tbody) {
    tbody.innerHTML = '';
    state.products.forEach(prod => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td style="font-weight:600;">${translateVal(prod.id)}</td>
        <td>${translateVal(prod.unit)}</td>
        <td>${formatMoney(prod.sellingPrice)}</td>
        <td>${formatMoney(prod.unitTotalCost)}</td>
        <td>${formatMoney(prod.unitContributionMargin)}</td>
        <td>${prod.expectedVolume.toLocaleString()}</td>
        <td style="font-weight:700;">${formatMoney(prod.sellingPrice * prod.expectedVolume)}</td>
      `;
      tbody.appendChild(row);
    });
  }
}

function renderDashboardCharts() {
  if (state.charts.productCompare) state.charts.productCompare.destroy();
  if (state.charts.fixedBreakdown) state.charts.fixedBreakdown.destroy();
  
  const ctxCompare = document.getElementById('chart-product-comparison');
  if (!ctxCompare) return;
  
  const labels = state.products.map(p => translateVal(p.id));
  const revenues = state.products.map(p => p.sellingPrice * p.expectedVolume);
  const totalCosts = state.products.map(p => p.unitTotalCost * p.expectedVolume);
  const profits = state.products.map(p => (p.sellingPrice - p.unitTotalCost) * p.expectedVolume);
  
  const chartFontFamily = state.language === 'ar' ? 'Cairo' : 'Outfit';
  const labelRevenue = state.language === 'ar' ? 'الإيرادات' : 'CA';
  const labelCost = state.language === 'ar' ? 'التكاليف' : 'Coûts';
  const labelProfit = state.language === 'ar' ? 'الأرباح' : 'Bénéfices';
  
  state.charts.productCompare = new Chart(ctxCompare, {
    type: 'bar',
    data: { labels, datasets: [
      { label: labelRevenue, data: revenues, backgroundColor: 'rgba(14, 165, 233, 0.7)', borderColor: '#0ea5e9', borderWidth: 1 },
      { label: labelCost, data: totalCosts, backgroundColor: 'rgba(244, 63, 94, 0.7)', borderColor: '#f43f5e', borderWidth: 1 },
      { label: labelProfit, data: profits, backgroundColor: 'rgba(16, 185, 129, 0.7)', borderColor: '#10b981', borderWidth: 1 }
    ] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#9ca3af', font: { family: chartFontFamily } } } } }
  });
  
  const ctxFixed = document.getElementById('chart-fixed-breakdown');
  if (ctxFixed) {
    const fixedLabels = state.fixedCosts.map(item => translateVal(item.category));
    const fixedAmounts = state.fixedCosts.map(item => item.amount);
    state.charts.fixedBreakdown = new Chart(ctxFixed, {
      type: 'doughnut',
      data: { labels: fixedLabels, datasets: [{ data: fixedAmounts, backgroundColor: ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#06b6d4', '#ec4899'], borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af', font: { size: 9 } } } } }
    });
  }
}

function renderCostingTab() {
  const btnContainer = document.getElementById('costing-products-buttons');
  if (!btnContainer) return;
  
  btnContainer.innerHTML = '';
  state.products.forEach(prod => {
    const btn = document.createElement('button');
    btn.className = `product-select-btn ${prod.id === state.selectedProductId ? 'active' : ''}`;
    btn.onclick = () => { state.selectedProductId = prod.id; renderCostingTab(); };
    btn.innerHTML = `<span>${translateVal(prod.id)}</span><span class="badge">${prod.expectedVolume.toLocaleString()}</span>`;
    btnContainer.appendChild(btn);
  });
  
  const currentProd = state.products.find(p => p.id === state.selectedProductId);
  if (!currentProd) return;
  
  const nameInput = document.getElementById('prod-input-name');
  const priceInput = document.getElementById('prod-input-price');
  const volumeInput = document.getElementById('prod-input-volume');
  if (nameInput) nameInput.value = translateVal(currentProd.id);
  if (priceInput) priceInput.value = currentProd.sellingPrice;
  if (volumeInput) volumeInput.value = currentProd.expectedVolume;
  
  const matBody = document.querySelector('#materials-table tbody');
  if (matBody) {
    matBody.innerHTML = '';
    currentProd.standardCosts.materials.forEach((mat, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="text" class="form-control" value="${translateVal(mat.name)}" oninput="updateMaterialItem(${idx}, 'name', this.value)"></td>
        <td><input type="number" step="any" class="form-control" value="${mat.quantity}" oninput="updateMaterialItem(${idx}, 'quantity', this.value)"></td>
        <td><input type="text" class="form-control" value="${translateVal(mat.unit)}" oninput="updateMaterialItem(${idx}, 'unit', this.value)"></td>
        <td><input type="number" class="form-control" value="${mat.unitPrice}" oninput="updateMaterialItem(${idx}, 'unitPrice', this.value)"></td>
        <td>${formatMoney(mat.quantity * mat.unitPrice)}</td>
        <td><button class="btn-danger-icon" onclick="deleteMaterialItem(${idx})"><i class="fa-solid fa-trash-can"></i></button></td>
      `;
      matBody.appendChild(row);
    });
  }
  
  const laborBody = document.querySelector('#labor-table tbody');
  if (laborBody) {
    laborBody.innerHTML = '';
    currentProd.standardCosts.labor.forEach((lab, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="text" class="form-control" value="${translateVal(lab.name)}" oninput="updateLaborItem(${idx}, 'name', this.value)"></td>
        <td><input type="number" step="any" class="form-control" value="${lab.hours}" oninput="updateLaborItem(${idx}, 'hours', this.value)"></td>
        <td><input type="number" class="form-control" value="${lab.hourlyRate}" oninput="updateLaborItem(${idx}, 'hourlyRate', this.value)"></td>
        <td>${formatMoney(lab.hours * lab.hourlyRate)}</td>
        <td><button class="btn-danger-icon" onclick="deleteLaborItem(${idx})"><i class="fa-solid fa-trash-can"></i></button></td>
      `;
      laborBody.appendChild(row);
    });
  }
  
  recalcProductCosts();
}

function updateMaterialItem(index, field, value) {
  const currentProd = state.products.find(p => p.id === state.selectedProductId);
  if (!currentProd) return;
  const val = (field === 'quantity' || field === 'unitPrice') ? parseFloat(value) || 0 : value;
  currentProd.standardCosts.materials[index][field] = val;
  recalcProductCosts();
}

function deleteMaterialItem(index) {
  const currentProd = state.products.find(p => p.id === state.selectedProductId);
  if (!currentProd) return;
  currentProd.standardCosts.materials.splice(index, 1);
  renderCostingTab();
}

function addMaterialRow() {
  const currentProd = state.products.find(p => p.id === state.selectedProductId);
  if (!currentProd) return;
  currentProd.standardCosts.materials.push({ name: 'خامة جديدة', quantity: 1, unit: 'كجم', unitPrice: 100 });
  renderCostingTab();
}

function updateLaborItem(index, field, value) {
  const currentProd = state.products.find(p => p.id === state.selectedProductId);
  if (!currentProd) return;
  const val = (field === 'hours' || field === 'hourlyRate') ? parseFloat(value) || 0 : value;
  currentProd.standardCosts.labor[index][field] = val;
  recalcProductCosts();
}

function deleteLaborItem(index) {
  const currentProd = state.products.find(p => p.id === state.selectedProductId);
  if (!currentProd) return;
  currentProd.standardCosts.labor.splice(index, 1);
  renderCostingTab();
}

function addLaborRow() {
  const currentProd = state.products.find(p => p.id === state.selectedProductId);
  if (!currentProd) return;
  currentProd.standardCosts.labor.push({ name: 'وظيفة جديدة', hours: 1, hourlyRate: 300 });
  renderCostingTab();
}

function updateCurrentProductBasicInfo() {
  const currentProd = state.products.find(p => p.id === state.selectedProductId);
  if (!currentProd) return;
  const nameInput = document.getElementById('prod-input-name');
  const priceInput = document.getElementById('prod-input-price');
  const volumeInput = document.getElementById('prod-input-volume');
  if (nameInput) currentProd.name = nameInput.value;
  if (priceInput) currentProd.sellingPrice = parseFloat(priceInput.value) || 0;
  if (volumeInput) currentProd.expectedVolume = parseInt(volumeInput.value) || 0;
  recalcProductCostsOnlyState();
}

function recalcProductCostsOnlyState() {
  state.products.forEach(product => {
    product.unitMaterialCost = product.standardCosts.materials.reduce((sum, mat) => sum + (mat.quantity * mat.unitPrice), 0);
    product.unitLaborCost = product.standardCosts.labor.reduce((sum, lab) => sum + (lab.hours * lab.hourlyRate), 0);
    product.unitVariableCost = product.unitMaterialCost + product.unitLaborCost;
    product.unitContributionMargin = product.sellingPrice - product.unitVariableCost;
  });
  
  const totalOverhead = state.overheadCostPools.reduce((sum, pool) => sum + pool.cost, 0);
  const basisSelect = document.getElementById('moh-rate-select');
  const basis = basisSelect ? basisSelect.value : 'labor';
  
  if (basis === 'labor') {
    const totalLaborHours = state.products.reduce((sum, prod) => {
      const hours = prod.standardCosts.labor.reduce((hSum, h) => hSum + h.hours, 0);
      return sum + (hours * prod.expectedVolume);
    }, 0);
    const rate = totalLaborHours > 0 ? (totalOverhead / totalLaborHours) : 0;
    state.products.forEach(prod => {
      const hours = prod.standardCosts.labor.reduce((hSum, h) => hSum + h.hours, 0);
      prod.unitOverheadCost = hours * rate;
      prod.unitTotalCost = prod.unitVariableCost + prod.unitOverheadCost;
    });
  } else if (basis === 'material') {
    const totalMaterialCost = state.products.reduce((sum, prod) => sum + (prod.unitMaterialCost * prod.expectedVolume), 0);
    const rate = totalMaterialCost > 0 ? (totalOverhead / totalMaterialCost) : 0;
    state.products.forEach(prod => {
      prod.unitOverheadCost = prod.unitMaterialCost * rate;
      prod.unitTotalCost = prod.unitVariableCost + prod.unitOverheadCost;
    });
  } else {
    const totalUnits = state.products.reduce((sum, prod) => sum + prod.expectedVolume, 0);
    const rate = totalUnits > 0 ? (totalOverhead / totalUnits) : 0;
    state.products.forEach(prod => {
      prod.unitOverheadCost = rate;
      prod.unitTotalCost = prod.unitVariableCost + prod.unitOverheadCost;
    });
  }
}

function recalcProductCosts() {
  recalcProductCostsOnlyState();
  const currentProd = state.products.find(p => p.id === state.selectedProductId);
  if (!currentProd) return;
  
  const mohInput = document.getElementById('prod-input-moh');
  if (mohInput) mohInput.value = formatMoney(currentProd.unitOverheadCost);
  
  const primeEl = document.getElementById('summary-prime-cost');
  if (primeEl) primeEl.innerText = formatMoney(currentProd.unitMaterialCost + currentProd.unitLaborCost);
  
  const convEl = document.getElementById('summary-conversion-cost');
  if (convEl) convEl.innerText = formatMoney(currentProd.unitLaborCost + currentProd.unitOverheadCost);
  
  const totalEl = document.getElementById('summary-total-cost');
  if (totalEl) totalEl.innerText = formatMoney(currentProd.unitTotalCost);
  
  calculateSuggestedPrice();
}

function calculateSuggestedPrice() {
  const currentProd = state.products.find(p => p.id === state.selectedProductId);
  if (!currentProd) return;
  
  const markupInput = document.getElementById('pricing-markup');
  const markupPercent = markupInput ? parseFloat(markupInput.value) || 0 : 0;
  const suggestedPrice = currentProd.unitTotalCost * (1 + (markupPercent / 100));
  
  const suggestedEl = document.getElementById('pricing-suggested-price');
  if (suggestedEl) suggestedEl.value = formatMoney(suggestedPrice);
  
  const cmEl = document.getElementById('pricing-contribution-margin');
  if (cmEl) cmEl.value = formatMoney(currentProd.unitContributionMargin);
}

function addNewProductPrompt() {
  const name = prompt('أدخل اسم المنتج الجديد:');
  if (!name) return;
  const newId = 'prod-' + Date.now();
  state.products.push({
    id: newId, name: name, unit: 'قطعة', sellingPrice: 1000, expectedVolume: 500, actualVolume: 480,
    standardCosts: { materials: [{ name: 'خامة أولية', quantity: 1, unit: 'وحدة', unitPrice: 300 }], labor: [{ name: 'أجور تشغيل', hours: 1, hourlyRate: 200 }] },
    actualCosts: { materialTotalQtyUsed: 500, materialUnitPricePaid: 320, laborTotalHoursUsed: 490, laborRatePaid: 210 }
  });
  state.overheadCostPools.forEach(pool => { pool.driversPerProduct[newId] = 10; });
  state.selectedProductId = newId;
  refreshAllCalculations();
}

function initCVPTab() {
  const selector = document.getElementById('cvp-product-selector');
  if (!selector) return;
  selector.innerHTML = '';
  state.products.forEach(prod => {
    const opt = document.createElement('option');
    opt.value = prod.id;
    opt.innerText = translateVal(prod.id);
    opt.selected = (prod.id === state.cvpSelectedProductId);
    selector.appendChild(opt);
  });
  onCVPProductChange();
}

function onCVPProductChange() {
  const selector = document.getElementById('cvp-product-selector');
  if (selector) state.cvpSelectedProductId = selector.value;
  const currentProd = state.products.find(p => p.id === state.cvpSelectedProductId);
  if (!currentProd) return;
  
  const totalFixed = state.fixedCosts.reduce((sum, item) => sum + item.amount, 0);
  let totalRevenue = 0;
  state.products.forEach(p => totalRevenue += p.sellingPrice * p.expectedVolume);
  const productRevenueShare = (currentProd.sellingPrice * currentProd.expectedVolume) / (totalRevenue || 1);
  currentProd.allocatedFixedCost = totalFixed * productRevenueShare;
  
  const unitContribution = currentProd.sellingPrice - currentProd.unitVariableCost;
  const bepUnits = unitContribution > 0 ? (currentProd.allocatedFixedCost / unitContribution) : 0;
  const bepValue = bepUnits * currentProd.sellingPrice;
  
  const bepUnitsEl = document.getElementById('cvp-bep-units');
  if (bepUnitsEl) bepUnitsEl.innerText = Math.ceil(bepUnits).toLocaleString();
  const bepValueEl = document.getElementById('cvp-bep-value');
  if (bepValueEl) bepValueEl.innerText = formatMoney(bepValue);
  
  const slider = document.getElementById('cvp-qty-slider');
  if (slider) {
    slider.max = Math.ceil(bepUnits * 2.5) || 10000;
    slider.step = Math.ceil(slider.max / 100) || 100;
    slider.value = currentProd.expectedVolume;
    const maxValSpan = document.getElementById('slider-max-val');
    if (maxValSpan) maxValSpan.innerText = slider.max.toLocaleString();
  }
  simulateCVP();
  calcTargetProfitUnits();
}

function simulateCVP() {
  const currentProd = state.products.find(p => p.id === state.cvpSelectedProductId);
  if (!currentProd) return;
  
  const slider = document.getElementById('cvp-qty-slider');
  const qty = slider ? parseInt(slider.value) : 0;
  
  const currentValSpan = document.getElementById('slider-current-val');
  if (currentValSpan) currentValSpan.innerText = qty.toLocaleString();
  
  const revenue = qty * currentProd.sellingPrice;
  const variableCosts = qty * currentProd.unitVariableCost;
  const totalCosts = variableCosts + currentProd.allocatedFixedCost;
  const netProfit = revenue - totalCosts;
  
  const revenueEl = document.getElementById('sim-revenue');
  if (revenueEl) revenueEl.innerText = formatMoney(revenue);
  const costsEl = document.getElementById('sim-total-costs');
  if (costsEl) costsEl.innerText = formatMoney(totalCosts);
  const profitEl = document.getElementById('sim-net-profit');
  if (profitEl) {
    profitEl.innerText = formatMoney(netProfit);
    profitEl.style.color = netProfit > 0 ? '#10b981' : (netProfit < 0 ? '#f43f5e' : '#f3f4f6');
  }
  
  renderCVPChart(currentProd, qty);
}

function calcTargetProfitUnits() {
  const currentProd = state.products.find(p => p.id === state.cvpSelectedProductId);
  if (!currentProd) return;
  
  const targetInput = document.getElementById('cvp-target-profit');
  const targetProfit = targetInput ? parseFloat(targetInput.value) || 0 : 0;
  const unitContribution = currentProd.sellingPrice - currentProd.unitVariableCost;
  const targetUnits = unitContribution > 0 ? ((currentProd.allocatedFixedCost + targetProfit) / unitContribution) : 0;
  
  const targetUnitsEl = document.getElementById('cvp-target-profit-units');
  if (targetUnitsEl) targetUnitsEl.value = Math.ceil(targetUnits).toLocaleString();
}

function renderCVPChart(product, currentQty) {
  if (state.charts.cvpChart) state.charts.cvpChart.destroy();
  
  const ctx = document.getElementById('chart-cvp');
  if (!ctx) return;
  
  const slider = document.getElementById('cvp-qty-slider');
  const maxVal = slider ? parseInt(slider.max) : 10000;
  const steps = 6;
  let xData = [];
  for(let i = 0; i <= steps; i++) xData.push(Math.round((maxVal / steps) * i));
  if (!xData.includes(currentQty)) { xData.push(currentQty); xData.sort((a,b) => a - b); }
  
  const revenueLines = xData.map(x => x * product.sellingPrice);
  const totalCostLines = xData.map(x => (x * product.unitVariableCost) + product.allocatedFixedCost);
  
  const chartFontFamily = state.language === 'ar' ? 'Cairo' : 'Outfit';
  const labelRevenue = state.language === 'ar' ? 'الإيرادات' : 'CA';
  const labelCost = state.language === 'ar' ? 'التكاليف' : 'Coûts';
  
  state.charts.cvpChart = new Chart(ctx, {
    type: 'line',
    data: { labels: xData, datasets: [
      { label: labelRevenue, data: revenueLines, borderColor: '#10b981', borderWidth: 2.5, fill: false, tension: 0.1 },
      { label: labelCost, data: totalCostLines, borderColor: '#f43f5e', borderWidth: 2.5, fill: false, tension: 0.1 }
    ] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#9ca3af', font: { family: chartFontFamily } } } } }
  });
}

function renderABCTab() {
  const poolsBody = document.querySelector('#abc-pools-table tbody');
  if (poolsBody) {
    poolsBody.innerHTML = '';
    state.overheadCostPools.forEach(pool => {
      const totalDriverUsage = Object.values(pool.driversPerProduct).reduce((sum, val) => sum + val, 0);
      const poolRate = totalDriverUsage > 0 ? (pool.cost / totalDriverUsage) : 0;
      pool.rate = poolRate;
      pool.totalDriverUsage = totalDriverUsage;
      const row = document.createElement('tr');
      row.innerHTML = `<td style="font-weight:600;">${translateVal(pool.id)}</td><td>${formatMoney(pool.cost)}</td><td>${translateVal(pool.driverName)}</td><td>${totalDriverUsage.toLocaleString()}</td><td>${formatMoney(poolRate)}</td>`;
      poolsBody.appendChild(row);
    });
  }
  
  const totalLaborHours = state.products.reduce((sum, prod) => {
    const hours = prod.standardCosts.labor.reduce((hSum, h) => hSum + h.hours, 0);
    return sum + (hours * prod.expectedVolume);
  }, 0);
  const totalOverhead = state.overheadCostPools.reduce((sum, pool) => sum + pool.cost, 0);
  const tradOverheadRate = totalLaborHours > 0 ? (totalOverhead / totalLaborHours) : 0;
  
  const tradBody = document.querySelector('#abc-traditional-table tbody');
  if (tradBody) {
    tradBody.innerHTML = '';
    state.products.forEach(prod => {
      const hours = prod.standardCosts.labor.reduce((hSum, h) => hSum + h.hours, 0);
      const mohPerUnit = hours * tradOverheadRate;
      const totalUnitCost = prod.unitVariableCost + mohPerUnit;
      prod.traditionalMOH = mohPerUnit;
      prod.traditionalUnitCost = totalUnitCost;
      const row = document.createElement('tr');
      row.innerHTML = `<td>${translateVal(prod.id)}</td><td>${hours}</td><td>${formatMoney(mohPerUnit)}</td><td>${formatMoney(totalUnitCost)}</td>`;
      tradBody.appendChild(row);
    });
  }
  
  const advBody = document.querySelector('#abc-advanced-table tbody');
  if (advBody) {
    advBody.innerHTML = '';
    state.products.forEach(prod => {
      let allocatedMOH = 0;
      state.overheadCostPools.forEach(pool => {
        const productUsage = pool.driversPerProduct[prod.id] || 0;
        allocatedMOH += productUsage * pool.rate;
      });
      const mohPerUnitABC = prod.expectedVolume > 0 ? (allocatedMOH / prod.expectedVolume) : 0;
      const totalUnitCostABC = prod.unitVariableCost + mohPerUnitABC;
      prod.abcMOH = mohPerUnitABC;
      prod.abcUnitCost = totalUnitCostABC;
      const row = document.createElement('tr');
      row.innerHTML = `<td>${translateVal(prod.id)}</td><td style="font-size:0.8rem;">حسب الأنشطة</td><td>${formatMoney(mohPerUnitABC)}</td><td>${formatMoney(totalUnitCostABC)}</td>`;
      advBody.appendChild(row);
    });
  }
  
  generateABCExecutiveSummary();
}

function generateABCExecutiveSummary() {
  const noteEl = document.getElementById('abc-executive-note');
  if (!noteEl) return;
  let summaryHTML = state.language === 'ar' ? '<strong>الاستنتاج التحليلي:</strong><br>' : '<strong>Analyse stratégique:</strong><br>';
  state.products.forEach(prod => {
    if (prod.abcUnitCost && prod.traditionalUnitCost) {
      const diff = prod.abcUnitCost - prod.traditionalUnitCost;
      const percentDiff = (diff / prod.traditionalUnitCost) * 100;
      if (diff > 5) {
        summaryHTML += state.language === 'ar' ? `• ${translateVal(prod.id)}: كان أقل من تكلفته الحقيقية بمقدار ${formatMoney(diff)}<br>` : `• ${translateVal(prod.id)}: Sous-évalué de ${formatMoney(diff)}<br>`;
      } else if (diff < -5) {
        summaryHTML += state.language === 'ar' ? `• ${translateVal(prod.id)}: كان أعلى من تكلفته الحقيقية بمقدار ${formatMoney(Math.abs(diff))}<br>` : `• ${translateVal(prod.id)}: Surévalué de ${formatMoney(Math.abs(diff))}<br>`;
      }
    }
  });
  noteEl.innerHTML = summaryHTML;
}

function renderVarianceTab() {
  const matTable = document.querySelector('#variance-materials-table tbody');
  if (matTable) {
    matTable.innerHTML = '';
    state.products.forEach(prod => {
      const mainMat = prod.standardCosts.materials[0];
      if (!mainMat) return;
      const standardPrice = mainMat.unitPrice;
      const standardQtyForActualOutput = mainMat.quantity * prod.actualVolume;
      const actualPrice = prod.actualCosts.materialUnitPricePaid;
      const actualQty = prod.actualCosts.materialTotalQtyUsed;
      const priceVariance = (standardPrice - actualPrice) * actualQty;
      const qtyVariance = (standardQtyForActualOutput - actualQty) * standardPrice;
      const totalMatVariance = priceVariance + qtyVariance;
      const row = document.createElement('tr');
      row.innerHTML = `<td>${translateVal(prod.id)}</td><td>${translateVal(mainMat.name)}</td><td>${formatMoney(standardPrice)} / ${formatMoney(actualPrice)}</td><td>${standardQtyForActualOutput.toLocaleString()} / ${actualQty.toLocaleString()}</td><td style="color:${priceVariance>=0?'#10b981':'#f43f5e'}">${formatMoney(Math.abs(priceVariance))}</td><td style="color:${qtyVariance>=0?'#10b981':'#f43f5e'}">${formatMoney(Math.abs(qtyVariance))}</td><td style="color:${totalMatVariance>=0?'#10b981':'#f43f5e'}">${formatMoney(Math.abs(totalMatVariance))}</td>`;
      matTable.appendChild(row);
    });
  }
  
  const laborTable = document.querySelector('#variance-labor-table tbody');
  if (laborTable) {
    laborTable.innerHTML = '';
    state.products.forEach(prod => {
      const mainLabor = prod.standardCosts.labor[0];
      if (!mainLabor) return;
      const standardRate = mainLabor.hourlyRate;
      const standardHoursForActualOutput = mainLabor.hours * prod.actualVolume;
      const actualRate = prod.actualCosts.laborRatePaid;
      const actualHours = prod.actualCosts.laborTotalHoursUsed;
      const rateVariance = (standardRate - actualRate) * actualHours;
      const efficiencyVariance = (standardHoursForActualOutput - actualHours) * standardRate;
      const totalLaborVariance = rateVariance + efficiencyVariance;
      const row = document.createElement('tr');
      row.innerHTML = `<td>${translateVal(prod.id)}</td><td>${translateVal(mainLabor.name)}</td><td>${formatMoney(standardRate)} / ${formatMoney(actualRate)}</td><td>${standardHoursForActualOutput.toLocaleString()} / ${actualHours.toLocaleString()}</td><td style="color:${rateVariance>=0?'#10b981':'#f43f5e'}">${formatMoney(Math.abs(rateVariance))}</td><td style="color:${efficiencyVariance>=0?'#10b981':'#f43f5e'}">${formatMoney(Math.abs(efficiencyVariance))}</td><td style="color:${totalLaborVariance>=0?'#10b981':'#f43f5e'}">${formatMoney(Math.abs(totalLaborVariance))}</td>`;
      laborTable.appendChild(row);
    });
  }
}

function exportExcelTemplate() {
  try {
    const wb = XLSX.utils.book_new();

    // ---- فيل 1: المنتجات ----
    const wsProducts = XLSX.utils.json_to_sheet(state.products.map(p => ({
      'المعرف': p.id,
      'المنتج': p.name,
      'الوحدة': p.unit,
      'سعر البيع': p.sellingPrice,
      'حجم المبيعات المخطط': p.expectedVolume,
      'حجم المبيعات الفعلي': p.actualVolume
    })));
    XLSX.utils.book_append_sheet(wb, wsProducts, "المنتجات");

    // ---- فيل 2: خامات المنتجات ----
    const materialsRows = [];
    state.products.forEach(p => {
      p.standardCosts.materials.forEach(mat => {
        materialsRows.push({
          'معرف المنتج': p.id,
          'اسم المنتج': p.name,
          'اسم الخامة': mat.name,
          'الكمية للوحدة': mat.quantity,
          'الوحدة': mat.unit,
          'سعر الشراء': mat.unitPrice,
          'التكلفة الإجمالية للوحدة': mat.quantity * mat.unitPrice
        });
      });
    });
    const wsMaterials = XLSX.utils.json_to_sheet(materialsRows);
    XLSX.utils.book_append_sheet(wb, wsMaterials, "خامات المنتجات");

    // ---- فيل 3: أجور المنتجات ----
    const laborRows = [];
    state.products.forEach(p => {
      p.standardCosts.labor.forEach(lab => {
        laborRows.push({
          'معرف المنتج': p.id,
          'اسم المنتج': p.name,
          'الوظيفة': lab.name,
          'ساعات العمل': lab.hours,
          'معدل الأجر (د.ج/ساعة)': lab.hourlyRate,
          'تكلفة الأجور للوحدة': lab.hours * lab.hourlyRate
        });
      });
    });
    const wsLabor = XLSX.utils.json_to_sheet(laborRows);
    XLSX.utils.book_append_sheet(wb, wsLabor, "أجور العمال");

    // ---- فيل 4: التكاليف الثابتة ----
    const wsFixed = XLSX.utils.json_to_sheet(state.fixedCosts.map(item => ({
      'البند': item.category,
      'المبلغ (د.ج)': item.amount
    })));
    XLSX.utils.book_append_sheet(wb, wsFixed, "التكاليف الثابتة");

    XLSX.writeFile(wb, "نموذج_تكاليف_المصنع.xlsx");
    alert(state.language === 'ar' ? 'تم تصدير الملف بنجاح (4 فيل)' : 'Fichier exporté avec succès (4 feuilles)');

  } catch (err) {
    alert("خطأ في التصدير: " + err.message);
  }
}

function triggerExcelImport() {
  document.getElementById('excel-file-input').click();
}

function importExcel(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const wsProducts = workbook.Sheets["المنتجات"];
      if (!wsProducts) throw new Error("لم يتم العثور على ورقة 'المنتجات'");
      const rawProducts = XLSX.utils.sheet_to_json(wsProducts);
      const newProducts = rawProducts.map(p => ({
        id: p['المعرف'] || 'prod-' + Date.now(),
        name: p['المنتج'] || 'منتج جديد',
        unit: p['الوحدة'] || 'قطعة',
        sellingPrice: parseFloat(p['سعر البيع']) || 0,
        expectedVolume: parseInt(p['حجم المبيعات']) || 0,
        actualVolume: parseInt(p['حجم فعلي']) || 0,
        standardCosts: { materials: [{ name: 'خامة', quantity: 1, unit: 'كجم', unitPrice: 100 }], labor: [{ name: 'عمل', hours: 1, hourlyRate: 200 }] },
        actualCosts: { materialTotalQtyUsed: 0, materialUnitPricePaid: 0, laborTotalHoursUsed: 0, laborRatePaid: 0 }
      }));
      if (newProducts.length > 0) {
        state.products = newProducts;
        state.selectedProductId = newProducts[0].id;
        state.cvpSelectedProductId = newProducts[0].id;
      }
      alert(state.language === 'ar' ? 'تم الاستيراد بنجاح' : 'Import réussi');
      refreshAllCalculations();
    } catch (err) {
      alert('خطأ في الاستيراد: ' + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
  event.target.value = '';
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  if (typeof COST_MOCK_DATA !== 'undefined') {
    loadData(COST_MOCK_DATA);
  } else {
    console.error('COST_MOCK_DATA not found');
  }
});