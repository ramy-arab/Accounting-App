// البيانات التجريبية لمصنع النسيج والبلاستيك والمراتب والإسفنج
// العملة المستخدمة: د.ج (دينار جزائري) كمثال افتراضي، ويمكن تهيئتها

const COST_MOCK_DATA = {
  currency: 'د.ج',
  
  // 1. المنتجات الرئيسية
  products: [
    {
      id: 'prod-fabric',
      name: 'قماش صناعي (بالمتر)',
      unit: 'متر',
      sellingPrice: 450, // سعر البيع للوحدة
      expectedVolume: 12000, // حجم المبيعات المتوقع (متر)
      actualVolume: 11500, // حجم المبيعات الفعلي
      
      // التكاليف المتغيرة المعيارية للوحدة
      standardCosts: {
        materials: [
          { name: 'خيوط بوليستر', quantity: 0.25, unit: 'كجم', unitPrice: 600 }, // 150 د.ج
          { name: 'صبغات ومواد كيميائية', quantity: 1, unit: 'جرعة', unitPrice: 30 } // 30 د.ج
        ],
        labor: [
          { name: 'مشغل آلة النسيج', hours: 0.1, hourlyRate: 400 } // 40 د.ج
        ]
      },
      
      // البيانات الفعلية للتحليل الانحرافات
      actualCosts: {
        materialTotalQtyUsed: 2900, // كجم خيوط بوليستر فعلي
        materialUnitPricePaid: 620, // السعر الفعلي للكجم
        laborTotalHoursUsed: 1200, // الساعات الفعلية المستهلكة
        laborRatePaid: 410 // معدل الأجر الفعلي للساعة
      }
    },
    {
      id: 'prod-plastic',
      name: 'فيلم بلاستيك تغليف (بالكجم)',
      unit: 'كجم',
      sellingPrice: 350,
      expectedVolume: 18000,
      actualVolume: 19000,
      
      standardCosts: {
        materials: [
          { name: 'حبيبات بولي إيثيلين', quantity: 1.02, unit: 'كجم', unitPrice: 180 }, // 183.6 د.ج
          { name: 'إضافات ومواد ملونة', quantity: 0.05, unit: 'كجم', unitPrice: 400 } // 20 د.ج
        ],
        labor: [
          { name: 'فني ماكينة السحب (الضغط)', hours: 0.05, hourlyRate: 500 } // 25 د.ج
        ]
      },
      
      actualCosts: {
        materialTotalQtyUsed: 19800, 
        materialUnitPricePaid: 175,
        laborTotalHoursUsed: 920,
        laborRatePaid: 520
      }
    },
    {
      id: 'prod-foam',
      name: 'إسفنج مرن (بلوك ضغط 28)',
      unit: 'بلوك',
      sellingPrice: 8500,
      expectedVolume: 800,
      actualVolume: 780,
      
      standardCosts: {
        materials: [
          { name: 'مادة البوليول (Polyol)', quantity: 25, unit: 'كجم', unitPrice: 160 }, // 4000 د.ج
          { name: 'مادة T.D.I ورغوة', quantity: 10, unit: 'كجم', unitPrice: 220 }, // 2200 د.ج
          { name: 'عوامل تفاعل ومثبتات', quantity: 1, unit: 'لتر', unitPrice: 400 } // 400 د.ج
        ],
        labor: [
          { name: 'عامل خط الرغوة والتثقيب', hours: 0.8, hourlyRate: 500 } // 400 د.ج
        ]
      },
      
      actualCosts: {
        materialTotalQtyUsed: 19800, // إجمالي البوليول الفعلي المستخدم
        materialUnitPricePaid: 165,
        laborTotalHoursUsed: 640,
        laborRatePaid: 490
      }
    },
    {
      id: 'prod-mattress',
      name: 'مرتبة إسفنجية (ماطلة 190x90)',
      unit: 'قطعة',
      sellingPrice: 15000,
      expectedVolume: 1500,
      actualVolume: 1600,
      
      standardCosts: {
        materials: [
          { name: 'بلوك إسفنج داخلي (من إنتاجنا)', quantity: 1, unit: 'بلوك', unitPrice: 7000 }, // 7000 د.ج (سعر تكلفة منقول داخلياً)
          { name: 'قماش تغليف خارجي معالج', quantity: 3.5, unit: 'متر', unitPrice: 300 }, // 1050 د.ج
          { name: 'سحابات وخيوط ومستلزمات خياطة', quantity: 1, unit: 'مجموعة', unitPrice: 450 } // 450 د.ج
        ],
        labor: [
          { name: 'خياط ومجمع مراتب', hours: 2.0, hourlyRate: 400 } // 800 د.ج
        ]
      },
      
      actualCosts: {
        materialTotalQtyUsed: 5700, // إجمالي القماش الفعلي
        materialUnitPricePaid: 290,
        laborTotalHoursUsed: 3100,
        laborRatePaid: 420
      }
    }
  ],

  // 2. التكاليف الثابتة الإجمالية شهرياً (Fixed Costs)
  fixedCosts: [
    { category: 'إيجار المصنع والمستودعات', amount: 350000 },
    { category: 'رواتب الإدارة والموظفين الإداريين', amount: 650000 },
    { category: 'إهلاك الآلات والمعدات الثقيلة', amount: 280000 },
    { category: 'أقساط التأمين السنوية (حصة الشهر)', amount: 60000 },
    { category: 'صيانة الآلات الدورية الثابتة', amount: 110000 },
    { category: 'مصاريف تسويقية وإدارية أخرى', amount: 150000 }
  ],

  // 3. التكاليف الصناعية غير المباشرة (Manufacturing Overhead - MOH) للتخصيص
  // الإجمالي: 900,000 د.ج
  overheadCostPools: [
    {
      id: 'pool-setup',
      name: 'إعداد الآلات وتشغيلها (Setups)',
      cost: 180000,
      driverName: 'عدد مرات إعداد الآلات',
      driversPerProduct: {
        'prod-fabric': 40,
        'prod-plastic': 30,
        'prod-foam': 15,
        'prod-mattress': 15
      }
    },
    {
      id: 'pool-power',
      name: 'طاقة وتشغيل الآلات (Power & Machinery)',
      cost: 420000,
      driverName: 'ساعات تشغيل الآلات',
      driversPerProduct: {
        'prod-fabric': 1800, // ساعات آلات النسيج
        'prod-plastic': 2200, // ساعات آلة السحب البلاستيكية
        'prod-foam': 800,    // آلات الرغوة والتبريد
        'prod-mattress': 200  // آلات الخياطة والقص والتعبئة
      }
    },
    {
      id: 'pool-qc',
      name: 'مراقبة الجودة وفحص العينات (Quality Control)',
      cost: 160000,
      driverName: 'عدد عينات الفحص المستهدفة',
      driversPerProduct: {
        'prod-fabric': 80,
        'prod-plastic': 100,
        'prod-foam': 60,
        'prod-mattress': 60
      }
    },
    {
      id: 'pool-handling',
      name: 'مناولة ونقل المواد الخام (Material Handling)',
      cost: 140000,
      driverName: 'عدد مرات طلب ونقل المواد',
      driversPerProduct: {
        'prod-fabric': 50,
        'prod-plastic': 60,
        'prod-foam': 40,
        'prod-mattress': 50
      }
    }
  ]
};

// تصدير البيانات للاستخدام في الملفات الأخرى في المتصفح أو بيئة الإشغال
if (typeof module !== 'undefined' && module.exports) {
  module.exports = COST_MOCK_DATA;
}
