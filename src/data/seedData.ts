import {
  Department,
  Position,
  Seat,
  Employee,
  Location,
  RoleDefinition,
  UserAccount,
  Vacancy,
  Application,
  Interview,
  InterviewScore,
  AttendanceRecord,
  LeaveRequest,
  TrainingProgram,
  TrainingEnrollment,
  PerformanceCycle,
  PerformanceReview,
  PayrollRecord,
  ServiceItem,
  BookingRecord,
  OperationalTicket,
  StrategicGoal,
  SuccessionPlan,
  SurveyResponse,
  AuditEvent,
  CMSContent,
  CareerJob,
  GoogleFormsIntegrationConfig,
} from '../types/enterprise';

export const INITIAL_CMS: CMSContent = {
  hero_title_ar: 'بلو برادايس للمنتجعات والتجارب السياحية',
  hero_title_en: 'Blue Paradise Resorts & Experiences',
  hero_subtitle_ar:
    'علامة ضيافة أردنية افتراضية في العقبة تجمع الإقامة الراقية والتجارب السياحية المسؤولة واستكشاف البيئة المحلية مع إدارة مواهب رقمية احترافية.',
  hero_subtitle_en:
    'A virtual Jordanian hospitality brand in Aqaba combining refined stays, responsible tourism experiences, and digital talent management.',
  slogan_ar: 'وجهتك إلى تجربة تستحق الذكرى',
  slogan_en: 'Where Every Stay Becomes a Story',
  vision_ar:
    'أن تكون بلو برادايس نموذجًا رائدًا للتجارب السياحية الأردنية الأصيلة والمستدامة، حيث تتحول كل إقامة إلى ذكرى استثنائية وتُدار المواهب بمنهج احترافي.',
  mission_ar:
    'نصمم ونقدم إقامات وتجارب سياحية آمنة وأصيلة وشاملة، عبر فرق ضيافة مؤهلة وشراكات مجتمعية وممارسات بيئية مسؤولة وخدمة تتمحور حول الزائر.',
  logo_mode: 'geometric_bp',
  simulation_banner_text:
    'بيئة محاكاة تدريبية (الإصدار 1.0): شركة بلو برادايس افتراضية بالكامل لأغراض محاكاة HR Technology — جميع الأسماء والسجلات والمبالغ والحجوزات تجريبية ولا تمثل منشأة مسجلة أو أشخاصاً حقيقيين.',
  announcements: [
    {
      id: 'NEWS-01',
      title: 'إطلاق مبادرة ترشيد المياه والطاقة في مرافق المنتجع الافتراضي بالعقبة',
      date: '2026-11-10',
      category: 'الاستدامة البيئية',
      summary: 'تستهدف المبادرة خفض استهلاك المياه بنسبة 15% والطاقة بنسبة 12% لكل ليلة نزيل ضمن مستهدفات 2027–2029.',
    },
    {
      id: 'NEWS-02',
      title: 'فتح باب التقديم لـ 24 شاغراً وظيفياً تدريبياً في 10 إدارات تشغيلية ومساندة',
      date: '2026-11-12',
      category: 'الموارد البشرية والاستقطاب',
      summary: 'تدعو إدارة الموارد البشرية المرشحين في بيئة المحاكاة للتقديم عبر نظام ATS المربوط بالهيكل التنظيمي المعتمد (96 مقعداً).',
    },
    {
      id: 'NEWS-03',
      title: 'اعتماد برنامج تأهيل المرشدين المحليين لتجارب خليج العقبة والتراث الساحلي',
      date: '2026-11-14',
      category: 'التجارب السياحية والمجتمع',
      summary: 'شراكة تدريبية لتمكين فرق التجارب والأنشطة السياحية على معايير السلامة البحرية والضيافة الأصيلة.',
    },
  ],
};

export const INITIAL_LOCATIONS: Location[] = [
  {
    location_id: 'LOC-AQB-01',
    name: 'المقر الإداري ومنتجع بلو برادايس الافتراضي — الشاطئ الجنوبي',
    city: 'العقبة',
    state: 'محافظة العقبة — الأردن',
    capacity: 180,
    type: 'HQ & Resort',
    is_simulated: true,
  },
  {
    location_id: 'LOC-AQB-02',
    name: 'نقطة انطلاق التجارب البحرية والبيئية — مرسى العقبة الافتراضي',
    city: 'العقبة',
    state: 'محافظة العقبة — الأردن',
    capacity: 65,
    type: 'Experience Hub',
    is_simulated: true,
  },
  {
    location_id: 'LOC-WDR-03',
    name: 'مخيم أفق الصحراء البيئي (تصور توسع مستقبلي — غير قائم)',
    city: 'وادي رم / البترا',
    state: 'جنوب الأردن',
    capacity: 45,
    type: 'Future Concept',
    is_simulated: true,
  },
];

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    department_id: 'D01',
    name_ar: 'الإدارة التنفيذية',
    name_en: 'Executive Management',
    manager_position_id: 'P001',
    planned_seats: 4,
    parent_department_id: null,
    category: 'executive',
    description_ar: 'قيادة الاستراتيجية المؤسسية، الحوكمة، إدارة العمليات الكلية، ومتابعة مؤشرات الأداء والمخاطر.',
  },
  {
    department_id: 'D02',
    name_ar: 'خدمة الضيوف والحجوزات',
    name_en: 'Guest Services & Reservations',
    manager_position_id: 'P005',
    planned_seats: 17,
    parent_department_id: 'D01',
    category: 'operations',
    description_ar: 'إدارة الاستقبال، الحجوزات المباشرة، علاقات الضيوف، والاستجابة الفورية لطلبات الزوار.',
  },
  {
    department_id: 'D03',
    name_ar: 'الإقامة والتدبير المنزلي',
    name_en: 'Accommodations & Housekeeping',
    manager_position_id: 'P010',
    planned_seats: 20,
    parent_department_id: 'D01',
    category: 'operations',
    description_ar: 'ضمان جاهزية الغرف والأجنحة والفلل الشاطئية، معايير النظافة الفندقية، وجودة مرافق الإقامة.',
  },
  {
    department_id: 'D04',
    name_ar: 'التجارب والأنشطة السياحية',
    name_en: 'Tourism Experiences & Activities',
    manager_position_id: 'P014',
    planned_seats: 14,
    parent_department_id: 'D01',
    category: 'operations',
    description_ar: 'تصميم وتنفيذ الرحلات البحرية والبيئية والثقافية، الإرشاد السياحي، ومراقبة سلامة الأنشطة.',
  },
  {
    department_id: 'D05',
    name_ar: 'الأغذية والمشروبات',
    name_en: 'Food & Beverage',
    manager_position_id: 'P018',
    planned_seats: 14,
    parent_department_id: 'D01',
    category: 'operations',
    description_ar: 'إدارة المطاعم، الطهي المستوحى من المطبخ المحلي والعالمي، خدمة الضيافة، وسلامة الغذاء.',
  },
  {
    department_id: 'D06',
    name_ar: 'الموارد البشرية',
    name_en: 'Human Resources',
    manager_position_id: 'P022',
    planned_seats: 6,
    parent_department_id: 'D01',
    category: 'support',
    description_ar: 'تخطيط القوى العاملة، الاستقطاب والتعيين، شؤون الموظفين، التعلم والتطوير، وإعداد الرواتب.',
  },
  {
    department_id: 'D07',
    name_ar: 'المالية والمشتريات',
    name_en: 'Finance & Procurement',
    manager_position_id: 'P027',
    planned_seats: 6,
    parent_department_id: 'D01',
    category: 'support',
    description_ar: 'الإدارة المالية، المحاسبة، المشتريات المستدامة من الموردين المحليين، والتدقيق الداخلي.',
  },
  {
    department_id: 'D08',
    name_ar: 'التسويق والمبيعات',
    name_en: 'Marketing & Sales',
    manager_position_id: 'P032',
    planned_seats: 6,
    parent_department_id: 'D01',
    category: 'support',
    description_ar: 'إدارة الهوية المؤسسية، التسويق الرقمي، مبيعات المجموعات والشركات، والعلاقات العامة.',
  },
  {
    department_id: 'D09',
    name_ar: 'الصيانة والاستدامة',
    name_en: 'Maintenance & Sustainability',
    manager_position_id: 'P036',
    planned_seats: 6,
    parent_department_id: 'D01',
    category: 'operations',
    description_ar: 'صيانة المرافق الهندسية، تطبيق مبادرات ترشيد المياه والطاقة، والسلامة والصحة المهنية.',
  },
  {
    department_id: 'D10',
    name_ar: 'تقنية المعلومات والخدمات الرقمية',
    name_en: 'IT & Digital Services',
    manager_position_id: 'P038',
    planned_seats: 3,
    parent_department_id: 'D01',
    category: 'support',
    description_ar: 'إدارة الأنظمة الرقمية، أمن المعلومات والصلاحيات، والدعم التقني للبوابات والموظفين.',
  },
];

// 39 Positions (P001 - P039) summing to exactly 96 planned seats across D01-D10:
// D01: 1+1+1+1 = 4
// D02: 1+2+8+2+4 = 17
// D03: 1+3+12+4 = 20
// D04: 1+7+2+2+2 = 14
// D05: 1+3+1+8+1 = 14
// D06: 1+1+2+1+1 = 6
// D07: 1+2+1+1+1 = 6
// D08: 1+2+2+1 = 6
// D09: 1+3+1+1 = 6
// D10: 1+2 = 3
// Total = 39 Positions, 96 Planned Seats!
export const INITIAL_POSITIONS: Position[] = [
  // D01 (4 seats, 4 positions: P001-P004)
  {
    position_id: 'P001',
    department_id: 'D01',
    title_ar: 'المدير التنفيذي (الرئيس التنفيذي)',
    title_en: 'Chief Executive Officer (CEO)',
    grade: 'E',
    planned_count: 1,
    salary_min_jod: 2800,
    salary_max_jod: 3600,
    reports_to_position_id: null,
    description: 'توجيه الأداء الاستراتيجي والمخاطر والميزانية والحوكمة وقرارات التوظيف القيادي.',
    required_skills: ['القيادة الاستراتيجية', 'الحوكمة المؤسسية', 'إدارة الضيافة', 'التحليل المالي'],
    is_critical: true,
  },
  {
    position_id: 'P002',
    department_id: 'D01',
    title_ar: 'مدير التشغيل',
    title_en: 'Director of Operations',
    grade: 'E',
    planned_count: 1,
    salary_min_jod: 2100,
    salary_max_jod: 2700,
    reports_to_position_id: 'P001',
    description: 'الإشراف على سلامة وجودة الخدمة اليومية وجداول العمل والتصعيد التشغيلي عبر الإدارات.',
    required_skills: ['إدارة العمليات الفندقية', 'إدارة الجودة', 'السلامة التشغيلية', 'قيادة الفرق'],
    is_critical: true,
  },
  {
    position_id: 'P003',
    department_id: 'D01',
    title_ar: 'مدير إداري',
    title_en: 'Administrative Manager',
    grade: 'M',
    planned_count: 1,
    salary_min_jod: 1300,
    salary_max_jod: 1700,
    reports_to_position_id: 'P001',
    description: 'تنظيم الشؤون الإدارية التنفيذية والتنسيق بين الوحدات ومتابعة القرارات.',
    required_skills: ['التنسيق الإداري', 'إدارة الوثائق', 'التواصل المؤسسي'],
  },
  {
    position_id: 'P004',
    department_id: 'D01',
    title_ar: 'اختصاصي استراتيجية وتحسين',
    title_en: 'Strategy & Continuous Improvement Specialist',
    grade: 'P',
    planned_count: 1,
    salary_min_jod: 1100,
    salary_max_jod: 1450,
    reports_to_position_id: 'P001',
    description: 'متابعة مؤشرات الأداء الاستراتيجية (KPIs) ومبادرات التحول الرقمي والجودة.',
    required_skills: ['تحليل مؤشرات الأداء', 'التخطيط الاستراتيجي', 'إدارة المشاريع'],
  },

  // D02 (17 seats, 5 positions: P005-P009)
  {
    position_id: 'P005',
    department_id: 'D02',
    title_ar: 'مدير خدمة الضيوف والحجوزات',
    title_en: 'Guest Services & Reservations Manager',
    grade: 'M',
    planned_count: 1,
    salary_min_jod: 1400,
    salary_max_jod: 1850,
    reports_to_position_id: 'P002',
    description: 'تنظيم الاستقبال والحجوزات وتجربة الضيف ومعالجة الشكاوى وضمان رضا الزوار.',
    required_skills: ['إدارة تجربة الضيف', 'أنظمة الحجوزات', 'حل النزاعات', 'قيادة فرق الاستقبال'],
    is_critical: true,
  },
  {
    position_id: 'P006',
    department_id: 'D02',
    title_ar: 'مشرف استقبال',
    title_en: 'Front Desk Supervisor',
    grade: 'S',
    planned_count: 2,
    salary_min_jod: 800,
    salary_max_jod: 1050,
    reports_to_position_id: 'P005',
    description: 'الإشراف المباشر على مناوبات الاستقبال وضمان دقة إجراءات الدخول والخروج.',
    required_skills: ['إشراف المناوبات', 'خدمة العملاء', 'اللغة الإنجليزية', 'إدارة الشكاوى'],
  },
  {
    position_id: 'P007',
    department_id: 'D02',
    title_ar: 'موظف استقبال',
    title_en: 'Front Desk Agent',
    grade: 'O',
    planned_count: 8,
    salary_min_jod: 500,
    salary_max_jod: 680,
    reports_to_position_id: 'P006',
    description: 'تسجيل دخول الضيوف وخروجهم وخدمتهم بدقة وترحيب يعكس الضيافة الأردنية.',
    required_skills: ['خدمة العملاء', 'التواصل الفعال', 'إدارة الشكاوى', 'أنظمة الاستقبال'],
  },
  {
    position_id: 'P008',
    department_id: 'D02',
    title_ar: 'موظف استقبال وعلاقات ضيوف (مناوبة مسائية)',
    title_en: 'Guest Relations & Night Desk Agent',
    grade: 'O',
    planned_count: 2,
    salary_min_jod: 540,
    salary_max_jod: 720,
    reports_to_position_id: 'P006',
    description: 'متابعة طلبات الضيوف المسائية وتدقيق سجلات الإشغال الليلي والاستجابة للطوارئ.',
    required_skills: ['خدمة العملاء', 'إدارة الشكاوى', 'التدقيق الليلي', 'مرونة العمل'],
  },
  {
    position_id: 'P009',
    department_id: 'D02',
    title_ar: 'موظف حجوزات',
    title_en: 'Reservations Specialist',
    grade: 'O',
    planned_count: 4,
    salary_min_jod: 520,
    salary_max_jod: 700,
    reports_to_position_id: 'P005',
    description: 'إدارة طلبات الحجز المباشر للغرف والتجارب وتنسيق التوافر والأسعار التجريبية.',
    required_skills: ['إدارة الحجوزات', 'التواصل الهاتفي والرقمي', 'البيع التفاعلي'],
  },

  // D03 (20 seats, 4 positions: P010-P013)
  {
    position_id: 'P010',
    department_id: 'D03',
    title_ar: 'مدير الإقامة والتدبير المنزلي',
    title_en: 'Accommodations & Housekeeping Manager',
    grade: 'M',
    planned_count: 1,
    salary_min_jod: 1350,
    salary_max_jod: 1750,
    reports_to_position_id: 'P002',
    description: 'إدارة جاهزية الوحدات الفندقية وجودتها ومعايير النظافة والسلامة البيئية.',
    required_skills: ['إدارة التدبير الفندقي', 'معايير الجودة', 'ترشيد الموارد', 'إدارة الفرق'],
  },
  {
    position_id: 'P011',
    department_id: 'D03',
    title_ar: 'مشرف تدبير منزلي',
    title_en: 'Housekeeping Supervisor',
    grade: 'S',
    planned_count: 3,
    salary_min_jod: 720,
    salary_max_jod: 920,
    reports_to_position_id: 'P010',
    description: 'فحص الغرف والأجنحة قبل تسليمها للضيوف وتوزيع مهام الفرق اليومية.',
    required_skills: ['فحص الجودة', 'تنظيم الورديات', 'السلامة المهنية'],
  },
  {
    position_id: 'P012',
    department_id: 'D03',
    title_ar: 'عامل تدبير ونظافة غرف',
    title_en: 'Room Attendant',
    grade: 'O',
    planned_count: 12,
    salary_min_jod: 420,
    salary_max_jod: 550,
    reports_to_position_id: 'P011',
    description: 'تجهيز وتنظيف وحدات الإقامة وفق بروتوكولات الجودة والاستدامة.',
    required_skills: ['النظافة الفندقية', 'الانتباه للتفاصيل', 'السلامة المهنية'],
  },
  {
    position_id: 'P013',
    department_id: 'D03',
    title_ar: 'عامل تدبير مرافق عامة وشاطئية',
    title_en: 'Public Area & Beach Attendant',
    grade: 'O',
    planned_count: 4,
    salary_min_jod: 420,
    salary_max_jod: 540,
    reports_to_position_id: 'P011',
    description: 'العناية بنظافة وجاهزية المسابح، الشاطئ، والردهات العامة في المنتجع.',
    required_skills: ['العناية بالمرافق', 'السلامة العامة', 'العمل الجماعي'],
  },

  // D04 (14 seats, 5 positions: P014-P017 + P039)
  {
    position_id: 'P014',
    department_id: 'D04',
    title_ar: 'مدير التجارب والأنشطة السياحية',
    title_en: 'Experiences & Activities Manager',
    grade: 'M',
    planned_count: 1,
    salary_min_jod: 1400,
    salary_max_jod: 1800,
    reports_to_position_id: 'P002',
    description: 'تصميم وإدارة البرامج السياحية البحرية والبيئية والثقافية وضمان سلامتها.',
    required_skills: ['تصميم التجارب السياحية', 'إدارة المخاطر', 'الشراكات المحلية'],
    is_critical: true,
  },
  {
    position_id: 'P015',
    department_id: 'D04',
    title_ar: 'مرشد سياحي (مسارات ثقافية وبيئية)',
    title_en: 'Eco & Cultural Tour Guide',
    grade: 'P',
    planned_count: 7,
    salary_min_jod: 650,
    salary_max_jod: 900,
    reports_to_position_id: 'P014',
    description: 'تقديم تجارب سياحية أصيلة وآمنة تعريفاً بالتراث والطبيعة في العقبة والجنوب.',
    required_skills: ['الإرشاد السياحي', 'السرد القصصي', 'تقييم المخاطر', 'الإسعافات الأولية'],
  },
  {
    position_id: 'P016',
    department_id: 'D04',
    title_ar: 'منسق تجارب وبرامج ضيوف',
    title_en: 'Experiences Coordinator',
    grade: 'O',
    planned_count: 2,
    salary_min_jod: 580,
    salary_max_jod: 750,
    reports_to_position_id: 'P014',
    description: 'جدولة الرحلات وتنسيق المجموعات والمعدات والتواصل مع المرشدين والضيوف.',
    required_skills: ['تنسيق الجداول', 'خدمة الضيوف', 'التنظيم اللوجستي'],
  },
  {
    position_id: 'P017',
    department_id: 'D04',
    title_ar: 'مراقب سلامة أنشطة بحرية وميدانية',
    title_en: 'Activities Safety Officer',
    grade: 'T',
    planned_count: 2,
    salary_min_jod: 680,
    salary_max_jod: 880,
    reports_to_position_id: 'P014',
    description: 'فحص معدات الأنشطة ومراقبة معايير السلامة البحرية والبرية قبل وخلال كل جولة.',
    required_skills: ['السلامة البحرية والبرية', 'الإسعافات الأولية', 'إدارة الطوارئ'],
  },

  // D05 (14 seats, 5 positions: P018-P021 + P036_sub)
  {
    position_id: 'P018',
    department_id: 'D05',
    title_ar: 'مدير الأغذية والمشروبات',
    title_en: 'Food & Beverage Manager',
    grade: 'M',
    planned_count: 1,
    salary_min_jod: 1400,
    salary_max_jod: 1800,
    reports_to_position_id: 'P002',
    description: 'إدارة جودة المطاعم والخدمة وقوائم الطعام المحلية والسلامة الغذائية.',
    required_skills: ['إدارة المطاعم والضيافة', 'سلامة الغذاء HACCP', 'إدارة التكاليف'],
  },
  {
    position_id: 'P019',
    department_id: 'D05',
    title_ar: 'طاهٍ رئيسي / طاهٍ أول',
    title_en: 'Senior Chef',
    grade: 'S',
    planned_count: 1,
    salary_min_jod: 950,
    salary_max_jod: 1250,
    reports_to_position_id: 'P018',
    description: 'قيادة المطبخ وتطوير الأطباق الأردنية الساحلية والعالمية وضبط الجودة.',
    required_skills: ['فنون الطهي', 'إدارة المطبخ', 'سلامة الغذاء'],
  },
  {
    position_id: 'P020',
    department_id: 'D05',
    title_ar: 'طاهٍ (مطبخ شرقي وبحري)',
    title_en: 'Culinary Chef',
    grade: 'O',
    planned_count: 3,
    salary_min_jod: 600,
    salary_max_jod: 820,
    reports_to_position_id: 'P019',
    description: 'تحضير الوجبات الطازجة وفق المعايير المعتمدة وتقليل الهدر الغذائي.',
    required_skills: ['الطهي الاحترافي', 'سلامة الغذاء', 'تقليل الهدر'],
  },
  {
    position_id: 'P021',
    department_id: 'D05',
    title_ar: 'موظف خدمة مطعم وضيافة',
    title_en: 'Restaurant Service Attendant',
    grade: 'O',
    planned_count: 8,
    salary_min_jod: 450,
    salary_max_jod: 600,
    reports_to_position_id: 'P018',
    description: 'استقبال رواد المطعم وتقديم الأغذية والمشروبات بلباقة واحترافية.',
    required_skills: ['آداب الضيافة والمائدة', 'خدمة العملاء', 'العمل الجماعي'],
  },
  {
    position_id: 'P022',
    department_id: 'D05',
    title_ar: 'مسؤول سلامة غذاء وجودة',
    title_en: 'Food Safety & Hygiene Specialist',
    grade: 'P',
    planned_count: 1,
    salary_min_jod: 780,
    salary_max_jod: 1000,
    reports_to_position_id: 'P018',
    description: 'الرقابة اليومية على تخزين الأغذية ونظافة المطابخ والامتثال لمعايير الصحة.',
    required_skills: ['سلامة الغذاء HACCP', 'التدقيق الصحي', 'إدارة الجودة'],
  },

  // D06 Human Resources (6 seats, 5 positions: P023-P027)
  {
    position_id: 'P023',
    department_id: 'D06',
    title_ar: 'مدير الموارد البشرية',
    title_en: 'Human Resources Manager',
    grade: 'M',
    planned_count: 1,
    salary_min_jod: 1550,
    salary_max_jod: 2050,
    reports_to_position_id: 'P001',
    description: 'تخطيط القوى العاملة والسياسات والاستقطاب وتطوير المواهب وإدارة الأداء.',
    required_skills: ['تخطيط القوى العاملة', 'سياسات HR', 'إدارة الأداء والمواهب', 'حوكمة البيانات'],
    is_critical: true,
  },
  {
    position_id: 'P024',
    department_id: 'D06',
    title_ar: 'اختصاصي استقطاب وتوظيف',
    title_en: 'Talent Acquisition Specialist',
    grade: 'P',
    planned_count: 1,
    salary_min_jod: 850,
    salary_max_jod: 1150,
    reports_to_position_id: 'P023',
    description: 'إدارة عملية التوظيف ونظام ATS والفرز والمقابلات المنظمة والعروض.',
    required_skills: ['إدارة نظام ATS', 'المقابلات المبنية على الكفايات', 'تقييم المرشحين'],
  },
  {
    position_id: 'P025',
    department_id: 'D06',
    title_ar: 'مسؤول شؤون موظفين',
    title_en: 'HR Operations & Personnel Officer',
    grade: 'P',
    planned_count: 2,
    salary_min_jod: 700,
    salary_max_jod: 920,
    reports_to_position_id: 'P023',
    description: 'تحديث سجلات الموظفين والمقاعد والإجازات والحضور وبرنامج التهيئة.',
    required_skills: ['شؤون الموظفين', 'إدارة الحضور والإجازات', 'تهيئة الموظفين الجدد'],
  },
  {
    position_id: 'P026',
    department_id: 'D06',
    title_ar: 'اختصاصي تعلم وتطوير مؤسسي',
    title_en: 'Learning & Organizational Development Specialist',
    grade: 'P',
    planned_count: 1,
    salary_min_jod: 850,
    salary_max_jod: 1150,
    reports_to_position_id: 'P023',
    description: 'تحليل فجوات المهارات (TNA) وإدارة خطط التدريب وقياس أثر التعلم.',
    required_skills: ['تحليل فجوات المهارات', 'تصميم التدريب', 'تقييم الأداء'],
  },
  {
    position_id: 'P027',
    department_id: 'D06',
    title_ar: 'مسؤول رواتب وتعويضات',
    title_en: 'Payroll & Compensation Officer',
    grade: 'P',
    planned_count: 1,
    salary_min_jod: 780,
    salary_max_jod: 1020,
    reports_to_position_id: 'P023',
    description: 'تجهيز كشوف الرواتب الافتراضية ومراجعة المتغيرات وحفظ سرية بيانات الأجور.',
    required_skills: ['إدارة الرواتب', 'التدقيق الحسابي', 'سرية البيانات'],
  },

  // D07 Finance & Procurement (6 seats, 5 positions: P028-P032)
  {
    position_id: 'P028',
    department_id: 'D07',
    title_ar: 'المدير المالي',
    title_en: 'Finance Manager',
    grade: 'M',
    planned_count: 1,
    salary_min_jod: 1550,
    salary_max_jod: 2050,
    reports_to_position_id: 'P001',
    description: 'الرقابة المالية والتقارير والميزانية ومراجعة كشوف الرواتب والتسويات.',
    required_skills: ['الإدارة المالية', 'الموازنات التقديرية', 'الرقابة الداخلية'],
    is_critical: true,
  },
  {
    position_id: 'P029',
    department_id: 'D07',
    title_ar: 'محاسب عام',
    title_en: 'General Accountant',
    grade: 'P',
    planned_count: 2,
    salary_min_jod: 720,
    salary_max_jod: 950,
    reports_to_position_id: 'P028',
    description: 'تسجيل القيود المالية، مطابقة إيرادات الحجوزات التجريبية، وإعداد التقارير.',
    required_skills: ['المحاسبة المالية', 'التسويات البنكية', 'التقارير المالية'],
  },
  {
    position_id: 'P030',
    department_id: 'D07',
    title_ar: 'موظف مشتريات وعقود محلية',
    title_en: 'Procurement Officer',
    grade: 'P',
    planned_count: 1,
    salary_min_jod: 680,
    salary_max_jod: 900,
    reports_to_position_id: 'P028',
    description: 'إدارة المشتريات المسؤولة والتعاقد مع الموردين والحرفيين المحليين في العقبة.',
    required_skills: ['إدارة المشتريات', 'التفاوض', 'سلاسل الإمداد المستدامة'],
  },
  {
    position_id: 'P031',
    department_id: 'D07',
    title_ar: 'أمين صندوق',
    title_en: 'Cashier & Treasury Officer',
    grade: 'O',
    planned_count: 1,
    salary_min_jod: 550,
    salary_max_jod: 720,
    reports_to_position_id: 'P028',
    description: 'متابعة المقبوضات والمدفوعات التشغيلية اليومية وإغلاق الصناديق.',
    required_skills: ['إدارة النقدية', 'الدقة الحسابية', 'النزاهة المالية'],
  },
  {
    position_id: 'P032',
    department_id: 'D07',
    title_ar: 'مدقق داخلي',
    title_en: 'Internal Auditor',
    grade: 'P',
    planned_count: 1,
    salary_min_jod: 950,
    salary_max_jod: 1250,
    reports_to_position_id: 'P001',
    description: 'مراجعة الامتثال للسياسات المالية والإدارية وسجل التدقيق (Audit Log).',
    required_skills: ['التدقيق الداخلي', 'تقييم المخاطر', 'حوكمة الصلاحيات'],
  },

  // D08 Marketing & Sales (6 seats, 4 positions: P033-P036)
  {
    position_id: 'P033',
    department_id: 'D08',
    title_ar: 'مدير التسويق والمبيعات',
    title_en: 'Marketing & Sales Manager',
    grade: 'M',
    planned_count: 1,
    salary_min_jod: 1450,
    salary_max_jod: 1900,
    reports_to_position_id: 'P001',
    description: 'قيادة استراتيجية التسويق السياحي، نمو الحجوزات المباشرة، وإدارة الهوية.',
    required_skills: ['التسويق السياحي', 'إدارة العلامة التجارية', 'تطوير المبيعات'],
  },
  {
    position_id: 'P034',
    department_id: 'D08',
    title_ar: 'مندوب مبيعات وشراكات شركات',
    title_en: 'Corporate & B2B Sales Executive',
    grade: 'P',
    planned_count: 2,
    salary_min_jod: 680,
    salary_max_jod: 920,
    reports_to_position_id: 'P033',
    description: 'استقطاب حجوزات الشركات والمجموعات السياحية وبناء شراكات مع وكلاء السفر.',
    required_skills: ['مبيعات الشركات B2B', 'التفاوض', 'إدارة علاقات العملاء'],
  },
  {
    position_id: 'P035',
    department_id: 'D08',
    title_ar: 'اختصاصي تسويق رقمي ومحتوى',
    title_en: 'Digital Marketing & Content Specialist',
    grade: 'P',
    planned_count: 2,
    salary_min_jod: 700,
    salary_max_jod: 950,
    reports_to_position_id: 'P033',
    description: 'إدارة المحتوى الرقمي للموقع والمنصات والحملات الترويجية للتجارب السياحية.',
    required_skills: ['التسويق الرقمي', 'صناعة المحتوى', 'تحليلات الويب'],
  },
  {
    position_id: 'P036',
    department_id: 'D08',
    title_ar: 'مسؤول هوية وعلاقات عامة',
    title_en: 'Brand Identity & PR Officer',
    grade: 'P',
    planned_count: 1,
    salary_min_jod: 750,
    salary_max_jod: 980,
    reports_to_position_id: 'P033',
    description: 'ضمان اتساق دليل الهوية البصرية والتواصل المؤسسي والشراكات المجتمعية.',
    required_skills: ['إدارة الهوية البصرية', 'العلاقات العامة', 'التواصل المؤسسي'],
  },

  // D09 Maintenance & Sustainability (6 seats, 4 positions: P037, P038_a, etc. wait let's keep exact P001-P039!)
  // Let's check: we are at P036. We have P037, P038, P039 left! Wait: if we have 39 positions total (P001 to P039), let's make sure D09 and D10 fit in P034-P039!
  // Let's check how many positions we defined so far:
  // D01: P001, P002, P003, P004 (4)
  // D02: P005, P006, P007, P008, P009 (5) -> 9
  // D03: P010, P011, P012, P013 (4) -> 13
  // D04: P014, P015, P016, P017 (4) -> 17 (if we set P015 planned_count=9, then 1+9+2+2=14!)
  // Let's adjust P015 planned_count to 9 so D04 has 4 positions (1+9+2+2 = 14) and we have plenty of position IDs up to P039!
  {
    position_id: 'P037',
    department_id: 'D09',
    title_ar: 'مدير الصيانة والمرافق والاستدامة',
    title_en: 'Maintenance & Sustainability Manager',
    grade: 'M',
    planned_count: 1,
    salary_min_jod: 1400,
    salary_max_jod: 1800,
    reports_to_position_id: 'P002',
    description: 'قيادة صيانة المرافق الهندسية وبرامج كفاءة الطاقة والمياه والسلامة المهنية.',
    required_skills: ['إدارة المرافق الهندسية', 'الاستدامة البيئية', 'السلامة المهنية'],
  },
  {
    position_id: 'P038',
    department_id: 'D09',
    title_ar: 'فني صيانة ومرافق / اختصاصي استدامة وسلامة',
    title_en: 'Facilities Technician & HSE/Sustainability Specialist',
    grade: 'T',
    planned_count: 5,
    salary_min_jod: 550,
    salary_max_jod: 850,
    reports_to_position_id: 'P037',
    description: 'تنفيذ الصيانة الوقائية والعلاجية ومتابعة مؤشرات ترشيد المياه والطاقة والسلامة.',
    required_skills: ['الصيانة الكهروميكانيكية', 'ترشيد الطاقة والمياه', 'السلامة والصحة المهنية'],
  },
  {
    position_id: 'P039',
    department_id: 'D10',
    title_ar: 'مسؤول أنظمة ودعم تقني ورقمي',
    title_en: 'IT Systems & Digital Support Specialist',
    grade: 'T',
    planned_count: 3,
    salary_min_jod: 750,
    salary_max_jod: 1350,
    reports_to_position_id: 'P001',
    description: 'إدارة الأنظمة الرقمية والصلاحيات والأمان السيبراني والدعم التقني للمستخدمين.',
    required_skills: ['إدارة الأنظمة والشبكات', 'الأمن السيبراني والصلاحيات', 'الدعم التقني'],
    is_critical: true,
  },
];

// Wait: let's make sure the sum of planned_count in INITIAL_POSITIONS is 96!
// Let's check:
// D01: P001(1) + P002(1) + P003(1) + P004(1) = 4
// D02: P005(1) + P006(2) + P007(8) + P008(2) + P009(4) = 17
// D03: P010(1) + P011(3) + P012(12) + P013(4) = 20
// D04: P014(1) + P015(7 -> let's make it 9!) + P016(2) + P017(2) = 14
// Let's fix P015 to 9 below or right here!
INITIAL_POSITIONS.find((p) => p.position_id === 'P015')!.planned_count = 9;
// Let's check remaining:
// D05: P018(1) + P019(1) + P020(3) + P021(8) + P022(1) = 14
// D06: P023(1) + P024(1) + P025(2) + P026(1) + P027(1) = 6
// D07: P028(1) + P029(2) + P030(1) + P031(1) + P032(1) = 6
// D08: P033(1) + P034(2) + P035(2) + P036(1) = 6
// D09: P037(1) + P038(5) = 6
// D10: P039(3) = 3
// Total = 4 + 17 + 20 + 14 + 14 + 6 + 6 + 6 + 6 + 3 = 96 seats across 39 positions!

const ARABIC_FIRST_NAMES = [
  'طارق', 'ليلى', 'مازن', 'رنا', 'فارس', 'سلمى', 'زيد', 'نادين', 'عمر', 'هلا',
  'كريم', 'دانا', 'باسل', 'ريم', 'أنس', 'يارا', 'حمزة', 'ميس', 'سامي', 'لينا',
  'وليد', 'تالا', 'رامي', 'نور', 'مهند', 'سارة', 'عادل', 'ديما', 'غسان', 'روان',
  'نبيل', 'فرح', 'وسام', 'جنى', 'قيس', 'عبير', 'كنان', 'مرح', 'هادي', 'أمل',
  'مروان', 'تسنيم', 'لؤي', 'لبنى', 'إياد', 'شذى', 'معن', 'هبة', 'سيف', 'بيان',
  'تامر', 'غيداء', 'رائد', 'سمر', 'نديم', 'آية', 'بشار', 'رغد', 'خلدون', 'سندس',
  'منذر', 'وعد', 'يزن', 'بلقيس', 'صهيب', 'علا', 'مراد', 'نهى', 'عماد', 'سجى',
  'حسام', 'مريم'
];

const ARABIC_LAST_NAMES = [
  'العبادي', 'المجالي', 'الخصاونة', 'النسور', 'الزعبي', 'التل', 'الحياري', 'الرواشدة',
  'العقباوي', 'المعايطة', 'الفايز', 'العدوان', 'الكركي', 'البطاينة', 'المومني', 'الشوابكة',
  'الحداد', 'الخطيب', 'النابلسي', 'العساف', 'الدباس', 'القضاة', 'الفاعوري', 'الحجاوي'
];

function generateSeatsAndEmployees(): { seats: Seat[]; employees: Employee[] } {
  const seats: Seat[] = [];
  const employees: Employee[] = [];

  // Which seat indices (1..96) are vacant? Exactly 24 vacant seats distributed realistically across departments
  const vacantSeatNumbers = new Set<number>([
    8, 12, 15, 19, 21, // D02 (5 vacant)
    28, 33, 37, 40, 41, // D03 (5 vacant)
    47, 51, 53, 55, // D04 (4 vacant)
    61, 64, 67, 69, // D05 (4 vacant)
    74, // D06 (1 vacant)
    79, // D07 (1 vacant)
    85, 87, // D08 (2 vacant)
    91, // D09 (1 vacant)
    96, // D10 (1 vacant)
  ]);

  let seatCounter = 1;
  let empCounter = 1;

  for (const pos of INITIAL_POSITIONS) {
    for (let i = 0; i < pos.planned_count; i++) {
      const seatId = `S${String(seatCounter).padStart(3, '0')}`;
      const isVacant = vacantSeatNumbers.has(seatCounter);
      const locationId =
        pos.department_id === 'D04' ? 'LOC-AQB-02' : 'LOC-AQB-01';

      if (isVacant) {
        seats.push({
          seat_id: seatId,
          position_id: pos.position_id,
          department_id: pos.department_id,
          seat_status: 'Vacant',
          location_id: locationId,
          assigned_employee_id: null,
        });
      } else {
        const empId = `E${String(empCounter).padStart(3, '0')}`;
        const firstName = ARABIC_FIRST_NAMES[(empCounter - 1) % ARABIC_FIRST_NAMES.length];
        const lastName = ARABIC_LAST_NAMES[(empCounter - 1) % ARABIC_LAST_NAMES.length];
        const displayName = `${firstName} ${lastName} (تجريبي)`;
        const baseSalary = Math.round(
          pos.salary_min_jod + ((pos.salary_max_jod - pos.salary_min_jod) * ((empCounter % 5) + 1)) / 6
        );

        // Manager mapping: CEO E001 has null manager; others report to department head or E001/E002
        let managerEmpId: string | null = 'E001';
        if (empCounter === 1) {
          managerEmpId = null;
        } else if (pos.grade === 'M') {
          managerEmpId = ['D02', 'D03', 'D04', 'D05', 'D09'].includes(pos.department_id) ? 'E002' : 'E001';
        } else {
          // Find first employee in same department
          const deptHead = employees.find((e) => e.department_id === pos.department_id);
          managerEmpId = deptHead ? deptHead.employee_id : 'E001';
        }

        const hireMonth = String(((empCounter - 1) % 9) + 1).padStart(2, '0');
        const hireDay = String(((empCounter * 3) % 25) + 1).padStart(2, '0');

        seats.push({
          seat_id: seatId,
          position_id: pos.position_id,
          department_id: pos.department_id,
          seat_status: 'Occupied',
          location_id: locationId,
          assigned_employee_id: empId,
        });

        employees.push({
          employee_id: empId,
          seat_id: seatId,
          display_name_alias: displayName,
          display_name_en: `Simulated Employee ${empId}`,
          department_id: pos.department_id,
          position_id: pos.position_id,
          hire_date: `2026-${hireMonth}-${hireDay}`,
          employment_status: empCounter > 68 ? 'Probation' : 'Active',
          work_email_test: `${empId.toLowerCase()}@blueparadise.sim.jo`,
          manager_employee_id: managerEmpId,
          base_salary_jod: baseSalary,
          leave_balance_days: 14 + (empCounter % 10),
          skills: pos.required_skills.map((sk, idx) => ({
            name: sk,
            level: ((empCounter + idx) % 3) + 2, // 2 to 4
          })),
          onboarding_tasks: [
            { id: `${empId}-OB1`, phase: 'قبل اليوم الأول', title: 'إصدار الرقم الوظيفي وإسناد المقعد والصلاحيات الأولية', completed: true },
            { id: `${empId}-OB2`, phase: 'اليوم الأول', title: 'التعريف بالمنشأة وسياسات السلامة والمدير المباشر', completed: true },
            { id: `${empId}-OB3`, phase: 'الأسبوع الأول', title: 'إتمام تدريب معايير الضيافة وخصوصية البيانات التدريبية', completed: empCounter <= 68 },
            { id: `${empId}-OB4`, phase: 'الشهر الأول (30 يوماً)', title: 'مراجعة خطة الـ 30 يوماً وتقييم بدء التشغيل', completed: empCounter <= 64 },
            { id: `${empId}-OB5`, phase: 'الأيام 60 / 90', title: 'مراجعة التعلم والأداء وتثبيت المسار الوظيفي', completed: empCounter <= 55 },
          ],
          career_notes: 'سجل وظيفي تدريبي منتظم ضمن بيئة محاكاة بلو برادايس.',
        });

        empCounter++;
      }
      seatCounter++;
    }
  }

  return { seats, employees };
}

const generated = generateSeatsAndEmployees();
export const INITIAL_SEATS: Seat[] = generated.seats;
export const INITIAL_EMPLOYEES: Employee[] = generated.employees;

export const INITIAL_ROLES: RoleDefinition[] = [
  {
    role_id: 'super_admin',
    role_name_ar: 'مدير النظام الأعلى (Super Admin)',
    role_name_en: 'Super Admin',
    scope: 'كامل المنصة والحوكمة وجميع البوابات',
    permissions: ['all', 'view_payroll', 'manage_hr', 'manage_cms', 'manage_ats', 'view_audit', 'approve_leaves'],
  },
  {
    role_id: 'system_admin',
    role_name_ar: 'مسؤول النظام التقني (System Admin)',
    role_name_en: 'System Administrator',
    scope: 'المستخدمون والإعدادات وسجلات التدقيق (دون كشف الرواتب والملفات الحساسة)',
    permissions: ['manage_users', 'manage_cms', 'view_audit'],
  },
  {
    role_id: 'executive',
    role_name_ar: 'الإدارة التنفيذية (Executive Management)',
    role_name_en: 'Executive Management',
    scope: 'لوحة القيادة التنفيذية، الاستراتيجية، ومؤشرات الأداء المجمعة',
    permissions: ['view_executive', 'view_od', 'approve_vacancies', 'view_operations'],
  },
  {
    role_id: 'hr_admin',
    role_name_ar: 'مدير الموارد البشرية (HR Administrator)',
    role_name_en: 'HR Administrator',
    scope: 'إدارة سجلات HR، الهياكل، الشواغر، الأداء، التدريب، والرواتب',
    permissions: ['manage_hr', 'manage_ats', 'view_payroll', 'view_od', 'approve_leaves', 'approve_vacancies'],
  },
  {
    role_id: 'recruiter',
    role_name_ar: 'اختصاصي الاستقطاب (Recruiter)',
    role_name_en: 'Recruiter',
    scope: 'بوابة التوظيف ATS، فرز المرشحين، وجدولة المقابلات',
    permissions: ['manage_ats'],
  },
  {
    role_id: 'finance',
    role_name_ar: 'المسؤول المالي (Finance Officer)',
    role_name_en: 'Finance Officer',
    scope: 'وحدات الرواتب المعتمدة والتقارير المالية والحجوزات',
    permissions: ['view_payroll', 'view_operations'],
  },
  {
    role_id: 'line_manager',
    role_name_ar: 'مدير قسم (Department Manager)',
    role_name_en: 'Department Manager',
    scope: 'فريق القسم التابع له فقط، اعتماد الإجازات، تقييم الأداء، وطلب الشواغر (دون الرواتب)',
    permissions: ['view_manager_portal', 'approve_leaves', 'request_vacancy'],
  },
  {
    role_id: 'employee',
    role_name_ar: 'موظف (Employee)',
    role_name_en: 'Employee',
    scope: 'بوابة الخدمة الذاتية لبياناته وطلباته وأهدافه وتدريباته فقط',
    permissions: ['view_employee_portal'],
  },
  {
    role_id: 'applicant',
    role_name_ar: 'متقدم للوظيفة (Applicant)',
    role_name_en: 'Applicant',
    scope: 'تصفح الوظائف، تقديم طلب توظيف، ومتابعة حالة طلبه فقط',
    permissions: ['view_public', 'apply_jobs'],
  },
  {
    role_id: 'visitor',
    role_name_ar: 'زائر الموقع (Visitor)',
    role_name_en: 'Visitor',
    scope: 'الموقع العام، الإقامات، التجارب السياحية، والحجز التجريبي',
    permissions: ['view_public'],
  },
  {
    role_id: 'auditor',
    role_name_ar: 'مدقق داخلي (Auditor)',
    role_name_en: 'Auditor',
    scope: 'وصول رقابي مقيد لسجلات التدقيق والامتثال دون تعديل',
    permissions: ['view_audit', 'view_executive'],
  },
];

export const INITIAL_USERS: UserAccount[] = [
  { user_id: 'USR-01', employee_id: 'E001', role_id: 'super_admin', display_name: 'طارق العبادي — المدير التنفيذي / Super Admin', identity_provider_uid: 'sim-auth-001', is_active: true },
  { user_id: 'USR-02', employee_id: 'E050', role_id: 'hr_admin', display_name: 'مدير الموارد البشرية (D06)', identity_provider_uid: 'sim-auth-002', is_active: true },
  { user_id: 'USR-03', employee_id: 'E051', role_id: 'recruiter', display_name: 'اختصاصي الاستقطاب والتوظيف (D06)', identity_provider_uid: 'sim-auth-003', is_active: true },
  { user_id: 'USR-04', employee_id: 'E005', role_id: 'line_manager', display_name: 'مدير خدمة الضيوف والحجوزات (D02)', identity_provider_uid: 'sim-auth-004', is_active: true },
  { user_id: 'USR-05', employee_id: 'E008', role_id: 'employee', display_name: 'موظف استقبال (D02 — بوابة الموظف)', identity_provider_uid: 'sim-auth-005', is_active: true },
  { user_id: 'USR-06', employee_id: 'E055', role_id: 'finance', display_name: 'المدير المالي (D07)', identity_provider_uid: 'sim-auth-006', is_active: true },
  { user_id: 'USR-07', employee_id: 'E070', role_id: 'system_admin', display_name: 'مسؤول الأنظمة الرقمية (D10)', identity_provider_uid: 'sim-auth-007', is_active: true },
  { user_id: 'USR-08', employee_id: 'E059', role_id: 'auditor', display_name: 'المدقق الداخلي (D07)', identity_provider_uid: 'sim-auth-008', is_active: true },
  { user_id: 'USR-09', employee_id: null, role_id: 'applicant', display_name: 'مرشح تجريبي — بوابة التوظيف', identity_provider_uid: 'sim-auth-009', is_active: true },
  { user_id: 'USR-10', employee_id: null, role_id: 'visitor', display_name: 'زائر الموقع السياحي العام', identity_provider_uid: 'sim-auth-010', is_active: true },
];

export const INITIAL_VACANCIES: Vacancy[] = [
  {
    vacancy_id: 'V001',
    position_id: 'P007',
    seat_id: 'S008',
    department_id: 'D02',
    opening_date: '2026-11-01',
    status: 'Published',
    employment_type: 'دوام كامل',
    publish_date: '2026-11-02',
    closing_date: '2026-12-15',
    requirements_ar: [
      'خبرة تدريبية أو عملية في خدمة الضيوف والاستقبال الفندقي.',
      'إجادة التواصل باللغتين العربية والإنجليزية.',
      'مهارة عالية في التعامل مع الضيوف وحل المشكلات بهدوء.',
    ],
    job_questions: [
      'كيف تتعامل مع ضيف وصل متأخراً ووجد ملاحظة على تجهيز غرفته؟',
      'ما مدى جاهزيتك للعمل بنظام المناوبات الصباحية والمسائية؟',
    ],
  },
  {
    vacancy_id: 'V002',
    position_id: 'P015',
    seat_id: 'S047',
    department_id: 'D04',
    opening_date: '2026-11-03',
    status: 'Published',
    employment_type: 'دوام كامل',
    publish_date: '2026-11-04',
    closing_date: '2026-12-20',
    requirements_ar: [
      'معرفة موثقة بالمسارات البيئية والتراثية في منطقة العقبة والجنوب.',
      'اجتياز دورة السلامة الميدانية والإسعافات الأولية.',
      'القدرة على قيادة المجموعات السياحية وتطبيق معايير السياحة المسؤولة.',
    ],
    job_questions: [
      'اذكر موقفاً قمت فيه بتطبيق إجراءات السلامة الوقائية خلال جولة ميدانية.',
      'كيف تدمج القصص التراثية المحلية في تجربة الزائر؟',
    ],
  },
  {
    vacancy_id: 'V003',
    position_id: 'P020',
    seat_id: 'S061',
    department_id: 'D05',
    opening_date: '2026-11-05',
    status: 'Published',
    employment_type: 'دوام كامل',
    publish_date: '2026-11-06',
    closing_date: '2026-12-10',
    requirements_ar: [
      'خبرة في تحضير الأطباق البحرية والشرقية الطازجة.',
      'التزام تام بمعايير سلامة الغذاء HACCP وتقليل الهدر.',
    ],
    job_questions: [
      'ما هي خطواتك لضمان سلامة حفظ المأكولات البحرية في المطبخ؟',
    ],
  },
  {
    vacancy_id: 'V004',
    position_id: 'P025',
    seat_id: 'S074',
    department_id: 'D06',
    opening_date: '2026-11-06',
    status: 'Published',
    employment_type: 'دوام كامل',
    publish_date: '2026-11-07',
    closing_date: '2026-12-18',
    requirements_ar: [
      'إلمام بإجراءات شؤون الموظفين، الحضور والإجازات، وتوثيق ملفات التهيئة.',
      'الالتزام بسرية البيانات وقواعد التكامل المرجعي.',
    ],
    job_questions: [
      'كيف تتحقق من عدم ازدواج إسناد المقعد الوظيفي عند تهيئة موظف جديد؟',
    ],
  },
  {
    vacancy_id: 'V005',
    position_id: 'P038',
    seat_id: 'S091',
    department_id: 'D09',
    opening_date: '2026-11-08',
    status: 'Published',
    employment_type: 'دوام كامل',
    publish_date: '2026-11-09',
    closing_date: '2026-12-25',
    requirements_ar: [
      'دبلوم فني في الصيانة الكهروميكانيكية أو كفاءة الطاقة والمياه.',
      'خبرة في الصيانة الوقائية للمرافق الفندقية.',
    ],
    job_questions: [
      'كيف تتعامل مع بلاغ عطل طارئ في نظام التكييف في جناح مشغول؟',
    ],
  },
  {
    vacancy_id: 'V006',
    position_id: 'P039',
    seat_id: 'S096',
    department_id: 'D10',
    opening_date: '2026-11-10',
    status: 'Published',
    employment_type: 'دوام كامل',
    publish_date: '2026-11-11',
    closing_date: '2026-12-30',
    requirements_ar: [
      'خبرة في إدارة الصلاحيات (RBAC) والدعم التقني لأنظمة المؤسسات.',
      'فهم ضوابط أمن المعلومات وحماية الخصوصية.',
    ],
    job_questions: [
      'ما الإجراء الصحيح عند اكتشاف محاولة وصول غير مصرح بها (403) في سجل التدقيق؟',
    ],
  },
  {
    vacancy_id: 'V007',
    position_id: 'P009',
    seat_id: 'S019',
    department_id: 'D02',
    opening_date: '2026-11-12',
    status: 'PendingApproval',
    employment_type: 'دوام كامل',
    publish_date: '2026-11-16',
    closing_date: '2026-12-30',
    requirements_ar: ['خبرة في أنظمة الحجوزات الفندقية والتواصل مع الضيوف.'],
    job_questions: ['كيف تدير تعارض التوافر في المواسم المزدحمة؟'],
  },
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    application_id: 'A001',
    vacancy_id: 'V001',
    candidate_alias: 'أحمد السالم (مرشح تجريبي)',
    contact_test: 'ahmad.salem@candidate.sim.jo',
    qualification: 'بكالوريوس إدارة فندقية وسياحة',
    years_experience: 3,
    skills: ['خدمة العملاء', 'اللغة الإنجليزية', 'أنظمة الاستقبال', 'إدارة الشكاوى'],
    answers: [
      { question: 'كيف تتعامل مع ضيف وصل متأخراً ووجد ملاحظة على تجهيز غرفته؟', answer: 'أعتذر فوراً بلباقة، وأوفر له استراحة ترحيبية مع ترقية فورية للغرفة أو تجهيز بديل خلال 10 دقائق مع متابعة شخصية.' },
    ],
    applied_at: '2026-11-05',
    stage: 'Offer',
    consent_flag: true,
    score_reference: 92,
    source_channel: 'بوابة وظائف بلو برادايس',
    human_reviewer_notes: 'اجتاز المقابلة المنظمة بتقدير ممتاز في معايير التعامل مع الضيف وحل المشكلات. موصى بالتعيين على المقعد S008.',
    stage_history: [
      { stage: 'Applied', date: '2026-11-05', actor: 'المرشح', reason: 'تقديم إلكتروني عبر البوابة' },
      { stage: 'Screening', date: '2026-11-06', actor: 'اختصاصي الاستقطاب', reason: 'استيفاء شروط المؤهل واللغة' },
      { stage: 'Shortlisted', date: '2026-11-07', actor: 'اختصاصي الاستقطاب', reason: 'إدراج في القائمة القصيرة' },
      { stage: 'Interview', date: '2026-11-09', actor: 'لجنة المقابلات', reason: 'إجراء مقابلة منظمة (درجة 18/20)' },
      { stage: 'Offer', date: '2026-11-12', actor: 'مدير الموارد البشرية', reason: 'إصدار عرض وظيفي تجريبي بانتظار التثبيت' },
    ],
  },
  {
    application_id: 'A002',
    vacancy_id: 'V001',
    candidate_alias: 'رؤى الحسن (مرشحة تجريبية)',
    contact_test: 'roaa.hasan@candidate.sim.jo',
    qualification: 'بكالوريوس لغات وترجمة',
    years_experience: 2,
    skills: ['التواصل الفعال', 'اللغة الإنجليزية', 'خدمة العملاء'],
    answers: [
      { question: 'كيف تتعامل مع ضيف وصل متأخراً ووجد ملاحظة على تجهيز غرفته؟', answer: 'أنسق فوراً مع مشرف التدبير المنزلي لتجهيز غرفة بديلة وتقديم اعتذار رسمي.' },
    ],
    applied_at: '2026-11-06',
    stage: 'Interview',
    consent_flag: true,
    score_reference: 84,
    source_channel: 'بوابة وظائف بلو برادايس',
    human_reviewer_notes: 'مهارات تواصل ولغات قوية، بانتظار استكمال تقييم لجنة المقابلات.',
    stage_history: [
      { stage: 'Applied', date: '2026-11-06', actor: 'المرشحة', reason: 'تقديم إلكتروني' },
      { stage: 'Screening', date: '2026-11-07', actor: 'اختصاصي الاستقطاب', reason: 'فرز أولي إيجابي' },
      { stage: 'Interview', date: '2026-11-11', actor: 'اختصاصي الاستقطاب', reason: 'جدولة مقابلة لجنة' },
    ],
  },
  {
    application_id: 'A003',
    vacancy_id: 'V002',
    candidate_alias: 'زيدان العقباوي (مرشح تجريبي)',
    contact_test: 'zaidan.aqaba@candidate.sim.jo',
    qualification: 'دبلوم إرشاد سياحي وبيئي',
    years_experience: 4,
    skills: ['الإرشاد السياحي', 'السلامة البحرية والبرية', 'الإسعافات الأولية', 'السرد القصصي'],
    answers: [
      { question: 'اذكر موقفاً قمت فيه بتطبيق إجراءات السلامة الوقائية خلال جولة ميدانية.', answer: 'قمت بتعديل مسار قارب الجولة عند تغير سرعة الرياح والتأكد من ارتداء سترات النجاة لجميع المشاركين.' },
    ],
    applied_at: '2026-11-08',
    stage: 'Shortlisted',
    consent_flag: true,
    score_reference: 89,
    source_channel: 'مبادرة الشراكة المجتمعية بالعقبة',
    human_reviewer_notes: 'مرشح محلي متميز بخبرة ميدانية في العقبة؛ تمت مراجعته بشرياً وتأهيله للقائمة القصيرة.',
    stage_history: [
      { stage: 'Applied', date: '2026-11-08', actor: 'المرشح', reason: 'تقديم إلكتروني' },
      { stage: 'Shortlisted', date: '2026-11-10', actor: 'اختصاصي الاستقطاب', reason: 'مطابقة ممتازة لمعايير السلامة والأصالة المحلية' },
    ],
  },
  {
    application_id: 'A004',
    vacancy_id: 'V003',
    candidate_alias: 'سمير الشامي (مرشح تجريبي)',
    contact_test: 'samir.shami@candidate.sim.jo',
    qualification: 'دبلوم فنون طهي وفندقة',
    years_experience: 5,
    skills: ['الطهي الاحترافي', 'سلامة الغذاء', 'تقليل الهدر'],
    answers: [
      { question: 'ما هي خطواتك لضمان سلامة حفظ المأكولات البحرية في المطبخ؟', answer: 'فحص درجة حرارة الاستلام (أقل من 4 درجات مئوية)، الفصل التام لمنع التلوث التقاطعي، وتوثيق ملصقات الصلاحية.' },
    ],
    applied_at: '2026-11-09',
    stage: 'Screening',
    consent_flag: true,
    score_reference: 81,
    source_channel: 'بوابة وظائف بلو برادايس',
    human_reviewer_notes: 'قيد المراجعة البشرية من اختصاصي الاستقطاب ومدير الأغذية والمشروبات.',
    stage_history: [
      { stage: 'Applied', date: '2026-11-09', actor: 'المرشح', reason: 'تقديم إلكتروني' },
      { stage: 'Screening', date: '2026-11-11', actor: 'اختصاصي الاستقطاب', reason: 'بدء الفرز البشري' },
    ],
  },
  {
    application_id: 'A005',
    vacancy_id: 'V004',
    candidate_alias: 'تالا المنصور (مرشحة تجريبية)',
    contact_test: 'tala.mansour@candidate.sim.jo',
    qualification: 'بكالوريوس إدارة أعمال وموارد بشرية',
    years_experience: 2,
    skills: ['شؤون الموظفين', 'إدارة الحضور والإجازات', 'تهيئة الموظفين الجدد'],
    answers: [
      { question: 'كيف تتحقق من عدم ازدواج إسناد المقعد الوظيفي عند تهيئة موظف جديد؟', answer: 'أتحقق من حالة المقعد (Vacant) في جدول المقاعد وعدم ارتباطه بأي موظف نشط قبل إنشاء سجل التعيين.' },
    ],
    applied_at: '2026-11-12',
    stage: 'Applied',
    consent_flag: true,
    score_reference: 86,
    source_channel: 'بوابة وظائف بلو برادايس',
    human_reviewer_notes: 'طلب جديد بانتظار الفرز البشري.',
    stage_history: [
      { stage: 'Applied', date: '2026-11-12', actor: 'المرشحة', reason: 'تقديم إلكتروني' },
    ],
  },
];

export const INITIAL_INTERVIEWS: Interview[] = [
  {
    interview_id: 'INT-001',
    application_id: 'A001',
    scheduled_at: '2026-11-09 11:00',
    panel_alias: 'لجنة الاستقطاب وخدمة الضيوف (مدير D02 + اختصاصي استقطاب D06)',
    status: 'Completed',
    rubric_version: 'v1.0-5Criteria',
    recommendation: 'Strong Hire',
  },
  {
    interview_id: 'INT-002',
    application_id: 'A002',
    scheduled_at: '2026-11-16 14:00',
    panel_alias: 'لجنة الاستقطاب وخدمة الضيوف (مدير D02 + اختصاصي استقطاب D06)',
    status: 'Scheduled',
    rubric_version: 'v1.0-5Criteria',
    recommendation: 'Pending',
  },
];

export const INITIAL_INTERVIEW_SCORES: InterviewScore[] = [
  { score_id: 'SCR-01', interview_id: 'INT-001', criterion_id: 'C1', criterion_name: 'التواصل', score: 4, evaluator_alias: 'مدير خدمة الضيوف', rationale: 'فصاحة ووضوح عالٍ باللغتين العربية والإنجليزية.' },
  { score_id: 'SCR-02', interview_id: 'INT-001', criterion_id: 'C2', criterion_name: 'التعامل مع ضيف', score: 4, evaluator_alias: 'مدير خدمة الضيوف', rationale: 'تعاطف واحترافية عالية في محاكاة مواقف الضيوف.' },
  { score_id: 'SCR-03', interview_id: 'INT-001', criterion_id: 'C3', criterion_name: 'حل مشكلة', score: 3, evaluator_alias: 'اختصاصي الاستقطاب', rationale: 'قدم بدائل عملية سريعة لمعالجة تأخر تجهيز الغرف.' },
  { score_id: 'SCR-04', interview_id: 'INT-001', criterion_id: 'C4', criterion_name: 'سلامة', score: 3, evaluator_alias: 'اختصاصي الاستقطاب', rationale: 'إلمام جيد بإجراءات الإخلاء والطوارئ في الاستقبال.' },
  { score_id: 'SCR-05', interview_id: 'INT-001', criterion_id: 'C5', criterion_name: 'مرونة العمل', score: 4, evaluator_alias: 'مدير خدمة الضيوف', rationale: 'استعداد كامل للعمل في المناوبات الصباحية والمسائية.' },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { attendance_id: 'ATT-001', employee_id: 'E005', work_date: '2026-11-15', shift_name: 'الإدارية (08:30 - 16:30)', scheduled_hours: 8, actual_hours: 8, status: 'Present', approved_by: 'E002' },
  { attendance_id: 'ATT-002', employee_id: 'E008', work_date: '2026-11-15', shift_name: 'الصباحية (07:00 - 15:00)', scheduled_hours: 8, actual_hours: 7.25, status: 'CorrectionPending', correction_reason: 'تأخر 45 دقيقة بسبب ازدحام طريق الميناء؛ تم تعويض الوقت بعد نهاية الوردية.', approved_by: null },
  { attendance_id: 'ATT-003', employee_id: 'E009', work_date: '2026-11-15', shift_name: 'الصباحية (07:00 - 15:00)', scheduled_hours: 8, actual_hours: 8, status: 'Present', approved_by: 'E005' },
  { attendance_id: 'ATT-004', employee_id: 'E010', work_date: '2026-11-15', shift_name: 'المسائية (15:00 - 23:00)', scheduled_hours: 8, actual_hours: 7.5, status: 'Late', approved_by: 'E005' },
  { attendance_id: 'ATT-005', employee_id: 'E018', work_date: '2026-11-15', shift_name: 'الصباحية (07:00 - 15:00)', scheduled_hours: 8, actual_hours: 8, status: 'Present', approved_by: 'E017' },
  { attendance_id: 'ATT-006', employee_id: 'E033', work_date: '2026-11-15', shift_name: 'الصباحية (07:00 - 15:00)', scheduled_hours: 8, actual_hours: 8, status: 'Present', approved_by: 'E032' },
  { attendance_id: 'ATT-007', employee_id: 'E050', work_date: '2026-11-15', shift_name: 'الإدارية (08:30 - 16:30)', scheduled_hours: 8, actual_hours: 8, status: 'Present', approved_by: 'E001' },
];

export const INITIAL_LEAVES: LeaveRequest[] = [
  {
    leave_id: 'L001',
    employee_id: 'E008',
    leave_type: 'سنوية',
    start_date: '2026-11-22',
    end_date: '2026-11-24',
    requested_days: 3,
    reason: 'إجازة عائلية مجدولة مسبقاً لا تتعارض مع ذروة إشغال نهاية الأسبوع.',
    status: 'PendingManager',
    manager_approval: null,
  },
  {
    leave_id: 'L002',
    employee_id: 'E009',
    leave_type: 'تدريبية',
    start_date: '2026-11-26',
    end_date: '2026-11-27',
    requested_days: 2,
    reason: 'حضور ورشة مهارات الضيافة المتقدمة وإدارة تجربة الضيف.',
    status: 'PendingHR',
    manager_approval: 'تمت موافقة مدير القسم E005 — تغطية الوردية متوفرة.',
  },
  {
    leave_id: 'L003',
    employee_id: 'E033',
    leave_type: 'سنوية',
    start_date: '2026-11-02',
    end_date: '2026-11-04',
    requested_days: 3,
    reason: 'إجازة اعتيادية.',
    status: 'Approved',
    manager_approval: 'معتمدة من المدير والموارد البشرية.',
  },
];

export const INITIAL_TRAINING_CATALOG: TrainingProgram[] = [
  {
    training_id: 'T001',
    title: 'إدارة شكاوى الضيوف والتميز في خدمة الاستقبال',
    skill_category: 'إدارة الشكاوى',
    duration_hours: 12,
    delivery_mode: 'حضوري في المنتجع',
    target_departments: ['D02', 'D03', 'D05'],
    cost_jod_simulated: 450,
  },
  {
    training_id: 'T002',
    title: 'بروتوكولات السلامة البحرية والميدانية والإسعافات الأولية',
    skill_category: 'تقييم المخاطر',
    duration_hours: 16,
    delivery_mode: 'تدريب ميداني عملي',
    target_departments: ['D04', 'D09'],
    cost_jod_simulated: 680,
  },
  {
    training_id: 'T003',
    title: 'معايير سلامة الغذاء HACCP والاستدامة وتقليل الهدر',
    skill_category: 'سلامة الغذاء',
    duration_hours: 10,
    delivery_mode: 'حضوري في المنتجع',
    target_departments: ['D05'],
    cost_jod_simulated: 390,
  },
  {
    training_id: 'T004',
    title: 'المقابلات المنظمة المبنية على الكفايات وحوكمة بيانات الموارد البشرية',
    skill_category: 'تقييم المرشحين',
    duration_hours: 8,
    delivery_mode: 'تفاعلي عن بُعد',
    target_departments: ['D06', 'D01'],
    cost_jod_simulated: 320,
  },
  {
    training_id: 'T005',
    title: 'ترشيد استهلاك المياه والطاقة في المنتجعات الساحلية',
    skill_category: 'ترشيد الطاقة والمياه',
    duration_hours: 8,
    delivery_mode: 'تدريب ميداني عملي',
    target_departments: ['D03', 'D09'],
    cost_jod_simulated: 350,
  },
];

export const INITIAL_ENROLLMENTS: TrainingEnrollment[] = [
  { enrollment_id: 'ENR-01', employee_id: 'E008', training_id: 'T001', enrollment_date: '2026-10-15', completion_status: 'Completed', score_before: 62, score_after: 91, impact_30d_notes: 'انخفاض زمن معالجة ملاحظات الضيوف في الاستقبال بنسبة 35%.' },
  { enrollment_id: 'ENR-02', employee_id: 'E009', training_id: 'T001', enrollment_date: '2026-11-01', completion_status: 'InProgress', score_before: 65, score_after: 78 },
  { enrollment_id: 'ENR-03', employee_id: 'E033', training_id: 'T002', enrollment_date: '2026-10-10', completion_status: 'Completed', score_before: 70, score_after: 95, impact_30d_notes: 'تطبيق كامل لقوائم فحص السلامة قبل انطلاق الجولات البحرية.' },
  { enrollment_id: 'ENR-04', employee_id: 'E041', training_id: 'T003', enrollment_date: '2026-10-20', completion_status: 'Completed', score_before: 68, score_after: 89, impact_30d_notes: 'تحسن نتائج التدقيق الصحي الداخلي للمطبخ الرئيسي.' },
  { enrollment_id: 'ENR-05', employee_id: 'E051', training_id: 'T004', enrollment_date: '2026-10-05', completion_status: 'Completed', score_before: 74, score_after: 94, impact_30d_notes: 'توحيد نماذج تقييم المقابلات الـ 5 عبر كافة اللجان.' },
];

export const INITIAL_CYCLES: PerformanceCycle[] = [
  { cycle_id: 'CYC-2026-Q4', label: 'دورة تقييم الأداء للربع الرابع 2026 (أوزان: 50% نتائج | 30% كفايات | 20% تعلم)', start_date: '2026-10-01', end_date: '2026-12-31', status: 'Active' },
  { cycle_id: 'CYC-2026-Q3', label: 'دورة تقييم الأداء للربع الثالث 2026', start_date: '2026-07-01', end_date: '2026-09-30', status: 'Completed' },
];

export const INITIAL_REVIEWS: PerformanceReview[] = [
  {
    review_id: 'R001',
    employee_id: 'E008',
    cycle_id: 'CYC-2026-Q4',
    smart_goals: [
      { title: 'خفض معدل انتظار تسجيل دخول الضيوف إلى أقل من 4 دقائق', weight: 40, achievement_pct: 92 },
      { title: 'تحقيق تقييم رضا ضيوف الاستقبال 90% فأعلى', weight: 40, achievement_pct: 88 },
      { title: 'إتمام برنامج إدارة الشكاوى وتطبيق بروتوكول المتابعة', weight: 20, achievement_pct: 95 },
    ],
    goals_score: 91,
    competencies_score: 86,
    learning_score: 92,
    overall_score: Math.round(91 * 0.5 + 86 * 0.3 + 92 * 0.2), // 90
    manager_feedback: 'أداء متميز والتزام واضح بمعايير الضيافة الإنسانية؛ يوصى بتأهيله لدور مشرف استقبال ضمن خطة التطوير.',
    idp_plan: 'إلحاق الموظف بتدريب إشراف المناوبات الفندقية خلال الربع الأول 2027.',
    review_status: 'Approved',
  },
  {
    review_id: 'R002',
    employee_id: 'E033',
    cycle_id: 'CYC-2026-Q4',
    smart_goals: [
      { title: 'تحقيق 0 حوادث سلامة في الجولات البحرية والبيئية', weight: 50, achievement_pct: 100 },
      { title: 'الحصول على تقييم رضا مشاركين لا يقل عن 92%', weight: 30, achievement_pct: 94 },
      { title: 'توثيق 3 مسارات ثقافية محلية بالتعاون مع المجتمع', weight: 20, achievement_pct: 85 },
    ],
    goals_score: 95,
    competencies_score: 90,
    learning_score: 94,
    overall_score: Math.round(95 * 0.5 + 90 * 0.3 + 94 * 0.2), // 93
    manager_feedback: 'نموذج يحتذى به في الأصالة المحلية والسلامة الميدانية.',
    idp_plan: 'المشاركة في تدريب المرشدين الجدد في قسم التجارب D04.',
    review_status: 'Approved',
  },
];

export const INITIAL_PAYROLL: PayrollRecord[] = INITIAL_EMPLOYEES.slice(0, 25).map((emp, idx) => {
  const additions = idx % 3 === 0 ? 65 : 35;
  const deductions = idx % 5 === 0 ? 20 : 0;
  return {
    payroll_id: `PAY-202611-${emp.employee_id}`,
    employee_id: emp.employee_id,
    period: '2026-11',
    base_pay_jod: emp.base_salary_jod,
    additions_jod: additions,
    deductions_jod: deductions,
    net_pay_jod: emp.base_salary_jod + additions - deductions,
    payment_status: idx < 18 ? 'ApprovedLocked' : 'FinanceReviewed',
  };
});

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    service_id: 'SRV01',
    name: 'جناح الأفق البحري الفاخر — منتجع العقبة الافتراضي',
    name_en: 'Ocean Horizon Luxury Suite — Simulated Aqaba Resort',
    category: 'إقامة ومنتجعات',
    target_audience: 'عائلات',
    base_price_jod: 185,
    description: 'إقامة افتراضية راقية بإطلالة بانورامية على خليج العقبة، مصممة بمعايير ترشيد الطاقة والمياه وضيافة أردنية أصيلة.',
    features: ['إطلالة بحرية مباشرة', 'شرفة خاصة ومسبح لا متناهي', 'إفطار محلي طازج', 'نظام ذكي لترشيد الطاقة'],
    image_url: '/assets/aistudio/image_c38102f6.jpeg',
    is_published: true,
    responsible_department_id: 'D03',
  },
  {
    service_id: 'SRV02',
    name: 'فيلا النخيل الشاطئية العائلية — العقبة',
    name_en: 'Palm Lagoon Family Villa — Simulated Resort',
    category: 'إقامة ومنتجعات',
    target_audience: 'عائلات',
    base_price_jod: 260,
    description: 'فيلا عائلية محاطة بحدائق النخيل والمسطحات المائية الهادئة، مثالية للاستجمام العائلي مع برنامج أنشطة مخصص.',
    features: ['غرفتا نوم وجناح معيشة', 'وصول مباشر للمسبح الهادئ', 'خدمة مضيف شخصي افتراضي', 'منتجات ضيافة صديقة للبيئة'],
    image_url: '/assets/aistudio/______f5e37cb7.jpeg',
    is_published: true,
    responsible_department_id: 'D03',
  },
  {
    service_id: 'SRV03',
    name: 'جولة العقبة البحرية واستكشاف الشعاب المرجانية',
    name_en: 'Aqaba Marine & Coral Reef Eco-Tour',
    category: 'تجارب بحرية وبيئية',
    target_audience: 'الجميع',
    base_price_jod: 45,
    description: 'رحلة بحرية مسؤولة بيئياً بإشراف مرشدين محليين ومراقبي سلامة معتمدين لاستكشاف التنوع البحري في خليج العقبة.',
    features: ['مرشد سياحي بيئي معتمد', 'معدات سلامة ومراقبة كاملة', 'وجبة خفيفة من المطبخ الساحلي', 'مجموعات صغيرة لحماية البيئة'],
    image_url: '/assets/aistudio/image_6f39f1f3.jpeg',
    is_published: true,
    responsible_department_id: 'D04',
  },
  {
    service_id: 'SRV04',
    name: 'التجربة التراثية ورحلة البترا والجنوب الثقافية',
    name_en: 'Heritage Trail & Petra Cultural Experience',
    category: 'تجارب ثقافية وتراثية',
    target_audience: 'أفراد ومغامرون',
    base_price_jod: 75,
    description: 'تجربة ثقافية متكاملة تربط ساحل العقبة بإرث البترا العريق، مع سرد قصصي تاريخي وشراكة مع المجتمع المحلي.',
    features: ['نقل سياحي مريح ومؤمّن', 'مرشد ثقافي متخصص', 'لقاء مع حرفيين محليين', 'غداء تراثي أردني أصيل'],
    image_url: '/assets/aistudio/______25a2be5d.jpeg',
    is_published: true,
    responsible_department_id: 'D04',
  },
  {
    service_id: 'SRV05',
    name: 'تجربة الغروب الساحلي والعشاء البحري المستدام',
    name_en: 'Sunset Cruise & Sustainable Seafood Dining',
    category: 'الضيافة والمطاعم',
    target_audience: 'الجميع',
    base_price_jod: 55,
    description: 'أمسية هادئة عند الغروب مع قائمة طعام بحرية موسمية بإشراف طهاة قسم الأغذية والمشروبات (D05).',
    features: ['مكونات محلية طازجة يومياً', 'جلسة شاطئية هادئة', 'خيارات مخصصة للعائلات والأفراد'],
    image_url: '/assets/aistudio/image_c38102f6.jpeg',
    is_published: true,
    responsible_department_id: 'D05',
  },
  {
    service_id: 'SRV06',
    name: 'باقة ملتقيات فرق العمل والقيادة المؤسسية',
    name_en: 'Corporate Retreat & Team Building Package',
    category: 'فعاليات مؤسسية',
    target_audience: 'شركات وفرق عمل',
    base_price_jod: 320,
    description: 'تنظيم لقاءات عمل وورش تطوير قيادي وأنشطة بناء فرق للشركات في بيئة المنتجع الافتراضي.',
    features: ['قاعة اجتماعات مجهزة رقمياً', 'أنشطة جماعية ميدانية', 'ضيافة متكاملة', 'تنسيق خاص من قسم المبيعات D08'],
    image_url: '/assets/aistudio/______f5e37cb7.jpeg',
    is_published: true,
    responsible_department_id: 'D08',
  },
  {
    service_id: 'SRV07',
    name: 'مخيم أفق وادي رم البيئي (مقترح توسع مستقبلي — غير قائم فعلياً)',
    name_en: 'Wadi Rum Eco-Camp (Future Expansion Proposal)',
    category: 'إقامة ومنتجعات',
    target_audience: 'أفراد ومغامرون',
    base_price_jod: 140,
    description: 'تصور مستقبلي مقترح في وثيقة الاستراتيجية للتوسع نحو وادي رم؛ مميز بوضوح كمقترح تدريبي وليس فرعاً قائماً.',
    features: ['تصور مستقبلي قيد الدراسة', 'طاقة شمسية 100%', 'رصد فلكي صحراوي'],
    image_url: '/assets/aistudio/______25a2be5d.jpeg',
    is_published: true,
    is_future_proposal: true,
    responsible_department_id: 'D01',
  },
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    booking_id: 'BKG001',
    service_id: 'SRV01',
    guest_alias: 'عائلة الكيلاني (ضيف افتراضي)',
    guest_email_test: 'kilani.family@guest.sim.jo',
    visitors_count: 4,
    start_date: '2026-11-20',
    end_date: '2026-11-23',
    amount_jod: 555,
    booking_status: 'Confirmed',
    created_at: '2026-11-12',
  },
  {
    booking_id: 'BKG002',
    service_id: 'SRV03',
    guest_alias: 'فريق شركة الأفق الرقمي (ضيف افتراضي)',
    guest_email_test: 'horizon.team@guest.sim.jo',
    visitors_count: 8,
    start_date: '2026-11-18',
    end_date: '2026-11-18',
    amount_jod: 360,
    booking_status: 'Confirmed',
    created_at: '2026-11-13',
  },
  {
    booking_id: 'BKG003',
    service_id: 'SRV04',
    guest_alias: 'سلوى النجار (ضيف افتراضي)',
    guest_email_test: 'salwa.n@guest.sim.jo',
    visitors_count: 2,
    start_date: '2026-11-25',
    end_date: '2026-11-25',
    amount_jod: 150,
    booking_status: 'Pending',
    created_at: '2026-11-14',
  },
];

export const INITIAL_TICKETS: OperationalTicket[] = [
  {
    ticket_id: 'TKT001',
    title: 'طلب تجهيز خاص لجناح عائلي قبل وصول الضيف BKG001',
    category: 'طلب خدمة ضيف',
    department_id: 'D03',
    related_employee_id: 'E017',
    opened_at: '2026-11-14',
    owner_role: 'مدير الإقامة والتدبير (D03)',
    priority: 'متوسطة',
    status: 'قيد المعالجة',
  },
  {
    ticket_id: 'TKT002',
    title: 'ملاحظة ضيف حول وقت الانتظار في مكتب الاستقبال المسائي',
    category: 'شكوى عميل',
    department_id: 'D02',
    related_employee_id: 'E005',
    opened_at: '2026-11-13',
    owner_role: 'مدير خدمة الضيوف (D02)',
    priority: 'عالية',
    status: 'مغلقة',
    resolution_notes: 'تمت معالجة الملاحظة، وتوجيه موظفي الاستقبال لبرنامج تدريب إدارة الشكاوى T001، وفتح الشاغر V001 لدعم الكادر.',
  },
  {
    ticket_id: 'TKT003',
    title: 'صيانة وقائية لمنظومة ترشيد المياه في الجناح الغربي',
    category: 'صيانة ومرافق',
    department_id: 'D09',
    related_employee_id: 'E067',
    opened_at: '2026-11-15',
    owner_role: 'مدير الصيانة والاستدامة (D09)',
    priority: 'متوسطة',
    status: 'مفتوحة',
  },
  {
    ticket_id: 'TKT004',
    title: 'مراجعة صلاحيات الوصول الدنيا للموظفين الجدد قيد التهيئة',
    category: 'دعم موارد بشرية وتقنية',
    department_id: 'D10',
    related_employee_id: 'E070',
    opened_at: '2026-11-15',
    owner_role: 'مسؤول الأنظمة (D10)',
    priority: 'منخفضة',
    status: 'قيد المعالجة',
  },
];

export const INITIAL_STRATEGIC_GOALS: StrategicGoal[] = [
  {
    goal_id: 'STR-01',
    pillar_number: 1,
    pillar_name: 'المحور 1 — تجربة الضيف',
    title: 'الوصول إلى رضا ضيوف لا يقل عن 90% بنهاية 2028، ورفع معدل العودة إلى 25% بنهاية 2029',
    owner_department_id: 'D02',
    owner_position_id: 'P005',
    kpi_name: 'مؤشر رضا الضيف ومعدل العودة',
    kpi_formula: 'التقييمات الإيجابية / إجمالي التقييمات × 100',
    baseline_value: '84% (خط أساس المحاكاة)',
    target_2028_2029: '90% رضا الضيف | 25% معدل العودة',
    current_simulated_progress: 88,
    initiatives: [
      'تأهيل فريق الاستقبال على الاستجابة الفورية لطلبات الضيوف',
      'ربط التجارب البحرية والثقافية بباقات الإقامة المخصصة',
    ],
  },
  {
    goal_id: 'STR-02',
    pillar_number: 2,
    pillar_name: 'المحور 2 — الكفاءة التشغيلية',
    title: 'بلوغ معدل إشغال سنوي مستهدف 65% في 2028، وخفض شكاوى الخدمة المتكررة 30%',
    owner_department_id: 'D01',
    owner_position_id: 'P002',
    kpi_name: 'معدل الإشغال وانخفاض الشكاوى المتكررة',
    kpi_formula: 'الليالي المباعة / الليالي المتاحة × 100',
    baseline_value: '54% إشغال أولي',
    target_2028_2029: '65% إشغال | -30% شكاوى متكررة',
    current_simulated_progress: 61,
    initiatives: [
      'أتمتة تذاكر الصيانة الوقائية وتجهيز الغرف بين الإدارات D02 وD03 وD09',
      'تحليل أسباب الشكاوى وربطها بخطط التدريب الميداني',
    ],
  },
  {
    goal_id: 'STR-03',
    pillar_number: 3,
    pillar_name: 'المحور 3 — رأس المال البشري',
    title: 'إكمال 90% من خطط التدريب السنوية، وخفض دوران الموظفين الافتراضي إلى أقل من 15% بنهاية 2029',
    owner_department_id: 'D06',
    owner_position_id: 'P023',
    kpi_name: 'نسبة إتمام التدريب ومعدل الدوران الوظيفي',
    kpi_formula: 'مكتملو التدريب / المكلفون به × 100',
    baseline_value: '78% إتمام تدريب | 18% دوران افتراضي',
    target_2028_2029: '90% إتمام تدريب | < 15% دوران',
    current_simulated_progress: 85,
    initiatives: [
      'تفعيل خطط التهيئة 30/60/90 يوماً لجميع المعينين الجدد',
      'ربط تحليل فجوات المهارات بالمسارات المهنية والتعاقب الوظيفي',
    ],
  },
  {
    goal_id: 'STR-04',
    pillar_number: 4,
    pillar_name: 'المحور 4 — الاستدامة البيئية',
    title: 'خفض استهلاك المياه لكل ليلة نزيل 15% والطاقة 12% مقارنة بخط الأساس',
    owner_department_id: 'D09',
    owner_position_id: 'P037',
    kpi_name: 'نسبة الوفر في المياه والطاقة لكل ليلة نزيل',
    kpi_formula: '(استهلاك خط الأساس - الاستهلاك الحالي) / خط الأساس × 100',
    baseline_value: 'خط أساس التشغيل التجريبي 2026',
    target_2028_2029: '-15% استهلاك مياه | -12% استهلاك طاقة',
    current_simulated_progress: 72,
    initiatives: [
      'تركيب حساسات ترشيد المياه في كافة وحدات الإقامة (D03/D09)',
      'تقليل الهدر الغذائي في مطاعم المنتجع والاعتماد على الموردين المحليين',
    ],
  },
  {
    goal_id: 'STR-05',
    pillar_number: 5,
    pillar_name: 'المحور 5 — الحوكمة والتحول الرقمي',
    title: 'رقمنة 100% من طلبات الإجازة وإجراءات التوظيف في نموذج النظام بنهاية 2028',
    owner_department_id: 'D10',
    owner_position_id: 'P039',
    kpi_name: 'نسبة العمليات المرقمنة والملتزمة بضوابط RBAC',
    kpi_formula: 'العمليات المرقمنة الموثقة / إجمالي العمليات × 100',
    baseline_value: '90% في البيئة التجريبية',
    target_2028_2029: '100% رقمنة وحوكمة صلاحيات',
    current_simulated_progress: 96,
    initiatives: [
      'توحيد بوابة الموظف والمدير ونظام ATS مع سجل تدقيق فوري',
      'فصل الصلاحيات ومنع الوصول غير المخول لبيانات الرواتب والملفات الحساسة',
    ],
  },
];

export const INITIAL_SUCCESSION_PLANS: SuccessionPlan[] = [
  {
    plan_id: 'SUC-01',
    critical_position_id: 'P005', // مدير خدمة الضيوف والحجوزات
    incumbent_employee_id: 'E005',
    candidate_employee_id: 'E006', // مشرف استقبال
    readiness_level: 'جاهز خلال 6 أشهر',
    development_actions: [
      'إتمام تدريب القيادة التشغيلية وإدارة الموازنات القسمية',
      'الإنابة الدورية عن مدير خدمة الضيوف في الاجتماعات التنفيذية',
    ],
    committee_review_note: 'توصية مبدئية غير قطعية؛ تخضع لمراجعة لجنة الموارد البشرية ومدير التشغيل قبل أي قرار ترقية.',
  },
  {
    plan_id: 'SUC-02',
    critical_position_id: 'P014', // مدير التجارب والأنشطة السياحية
    incumbent_employee_id: 'E032',
    candidate_employee_id: 'E033', // مرشد سياحي أول
    readiness_level: 'جاهز خلال 12 شهراً',
    development_actions: [
      'التدرب على تصميم العقود مع الشركاء المحليين وإدارة مخاطر البرامج',
    ],
    committee_review_note: 'يتمتع بكفاءة ميدانية عالية؛ يحتاج استكمال تأهيل إداري ومالي.',
  },
  {
    plan_id: 'SUC-03',
    critical_position_id: 'P023', // مدير الموارد البشرية
    incumbent_employee_id: 'E050',
    candidate_employee_id: 'E051', // اختصاصي استقطاب
    readiness_level: 'قيد التأهيل القيادي',
    development_actions: [
      'التناوب الوظيفي على وحدات تخطيط القوى العاملة والرواتب والتطوير المؤسسي',
    ],
    committee_review_note: 'خطة تطوير مهني طويلة المدى بمراجعة بشرية دورية.',
  },
];

export const INITIAL_SURVEYS: SurveyResponse[] = [
  { response_id: 'SRV-R1', department_id: 'D02', enps_score: 9, satisfaction_pct: 88, comment: 'بيئة عمل متعاونة ووضوح في جداول المناوبات بعد التحديث الأخير.', submitted_at: '2026-11-10' },
  { response_id: 'SRV-R2', department_id: 'D04', enps_score: 10, satisfaction_pct: 94, comment: 'فخورون ببرامج السياحة المسؤولة وتدريبات السلامة البحرية.', submitted_at: '2026-11-11' },
  { response_id: 'SRV-R3', department_id: 'D03', enps_score: 8, satisfaction_pct: 82, comment: 'نحتاج تسريع تعيين الشواغر المفتوحة لتخفيف ضغط الذروة.', submitted_at: '2026-11-12' },
  { response_id: 'SRV-R4', department_id: 'D05', enps_score: 9, satisfaction_pct: 90, comment: 'برامج التدريب على سلامة الغذاء واضحة ومفيدة عملياً.', submitted_at: '2026-11-13' },
  { response_id: 'SRV-R5', department_id: 'D06', enps_score: 10, satisfaction_pct: 92, comment: 'تكامل البيانات بين المقاعد والشواغر سهل متابعة الاحتياج.', submitted_at: '2026-11-14' },
];

export const INITIAL_AUDIT_EVENTS: AuditEvent[] = [
  {
    event_id: 'AUD-001',
    actor_id: 'USR-01',
    actor_role: 'super_admin',
    entity_type: 'system_seed',
    entity_id: 'DB-V1.0',
    action: 'تهيئة قاعدة البيانات التدريبية (10 إدارات، 39 مسمى، 96 مقعداً، 72 موظفاً، 24 شاغراً)',
    occurred_at: '2026-11-15 08:00:00',
    metadata_redacted: 'status=VERIFIED, integrity_checks=PASSED',
    status: 'ALLOWED',
  },
  {
    event_id: 'AUD-002',
    actor_id: 'USR-02',
    actor_role: 'hr_admin',
    entity_type: 'vacancies',
    entity_id: 'V001',
    action: 'نشر الشاغر V001 (موظف استقبال P007) المرتبط بالمقعد الشاغر S008',
    occurred_at: '2026-11-15 08:15:00',
    metadata_redacted: 'seat_id=S008, position_id=P007',
    status: 'ALLOWED',
  },
  {
    event_id: 'AUD-003',
    actor_id: 'USR-04',
    actor_role: 'line_manager',
    entity_type: 'payroll',
    entity_id: 'PAY-ALL',
    action: 'محاولة اطلاع مدير قسم على جدول الرواتب التفصيلي خارج صلاحياته',
    occurred_at: '2026-11-15 08:30:00',
    metadata_redacted: 'reason=RBAC_MINIMUM_PRIVILEGE_BLOCK',
    status: 'DENIED_403',
  },
];

export const INITIAL_FORMS_CONFIG: GoogleFormsIntegrationConfig = {
  unified_form_base_url: 'https://docs.google.com/forms/d/e/1FAIpQLSdBlueParadiseCareerUnifiedSim2026/viewform',
  enable_unified_fallback: true,
  job_id_param: 'entry.101001',
  job_title_param: 'entry.101002',
  department_param: 'entry.101003',
  apps_script_webhook_url: 'https://script.google.com/macros/s/AKfycbxBlueParadiseHRRecruitmentWebhookSim/exec',
};

export const INITIAL_CAREER_JOBS: CareerJob[] = [
  {
    job_id: 'JOB-001',
    title_ar: 'موظف حجوزات سفر وإقامة',
    title_en: 'Travel & Resort Reservations Specialist',
    department_id: 'D02',
    department_name_ar: 'إدارة تجربة الضيف والاستقبال',
    position_id: 'P007',
    seat_id: 'S008',
    location_ar: 'العقبة — المقر الرئيسي والمنتجع الساحلي',
    employment_type: 'دوام كامل',
    work_hours: '48 ساعة أسبوعياً (نظام مناوبات مرن — 8 ساعات يومياً)',
    published_at: '2026-11-01',
    closing_date: '2026-11-24',
    is_published: true,
    availability_status: 'متاحة',
    summary:
      'إدارة حجوزات الإقامة الفندقية والباقات السياحية البحرية والصحراوية لضيوف بلو برادايس، وضمان تجربة حجز سلسة ودقيقة منذ اللحظة الأولى.',
    job_purpose:
      'تولي مسؤولية استقبال ومعالجة طلبات الحجز الفردية والعائلية والمؤسسية عبر القنوات الرقمية والهاتفية، وتنسيق توفر الغرف والرحلات مع فرق الاستقبال والعمليات السياحية لتحقيق أعلى معدلات إشغال ورضا للضيوف.',
    key_responsibilities: [
      'استقبال طلبات الحجز والاستفسارات عبر الموقع الإلكتروني والهاتف والبريد وتأكيدها بدقة عالية.',
      'تخصيص الغرف والأجنحة والباقات السياحية وفق تفضيلات الضيف وحالة الإشغال اللحظية.',
      'التنسيق المباشر مع قسم الرحلات والتجارب السياحية لتأكيد برامج الغوص، الجولات البحرية، ورحلات وادي رم.',
      'تطبيق سياسات التسعير، العروض الموسمية، وإجراءات التعديل أو الإلغاء المعتمدة في بلو برادايس.',
      'تحديث سجلات الحجوزات في النظام المركزي وإعداد تقارير الإشغال اليومية لإدارة تجربة الضيف.',
    ],
    academic_qualifications: 'درجة البكالوريوس أو الدبلوم في إدارة الفنادق والسياحة، إدارة الأعمال، أو أي تخصص ذي صلة.',
    technical_skills: [
      'إجادة العمل على أنظمة الحجوزات الفندقية والسياحية (PMS / CRS)',
      'إتقان اللغتين العربية والإنجليزية تحدثاً وكتابة',
      'مهارة عالية في إعداد عروض الأسعار وتنسيق الباقات السياحية',
      'إجادة استخدام تطبيقات Google Workspace وجداول البيانات',
    ],
    behavioral_skills: [
      'اللبافة العالية ومهارات التواصل الإنساني والترحيب بالضيوف',
      'الدقة والانتباه للتفاصيل في إدخال التواريخ والبيانات المالية',
      'القدرة على العمل تحت الضغط في مواسم الذروة السياحية',
      'المرونة والعمل بروح الفريق الواحد',
    ],
    experience_required: 'خبرة عملية من سنة إلى 3 سنوات في مجال حجوزات الفنادق أو وكالات السفر والسياحة.',
    applicationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdBlueParadiseReservationsJob001/viewform',
    use_unified_form: true,
    sort_order: 1,
    is_trial_data: true,
  },
  {
    job_id: 'JOB-002',
    title_ar: 'منسق رحلات وتجارب سياحية',
    title_en: 'Tours & Authentic Experiences Coordinator',
    department_id: 'D04',
    department_name_ar: 'إدارة الرحلات والتجارب السياحية',
    position_id: 'P016',
    seat_id: 'S042',
    location_ar: 'العقبة — مركز العمليات البحرية والرحلات الميدانية',
    employment_type: 'دوام كامل',
    work_hours: '48 ساعة أسبوعياً (عمل مكتبي وميداني حسب جدول الرحلات)',
    published_at: '2026-11-03',
    closing_date: '2026-12-10',
    is_published: true,
    availability_status: 'متاحة',
    summary:
      'تصميم وتنسيق البرامج السياحية البحرية في خليج العقبة والرحلات الثقافية والبيئية إلى وادي رم والبتراء بالتعاون مع المجتمع المحلي.',
    job_purpose:
      'ضمان تنفيذ جميع التجارب والرحلات السياحية بأعلى معايير السلامة والأصالة والجودة، عبر التنسيق المتكامل بين المرشدين السياحيين، القوارب البحرية، وسائل النقل، والشركاء المحليين.',
    key_responsibilities: [
      'جدولة وتنسيق الرحلات البحرية اليومية، جولات الغوص والسنوركلينج، ورحلات المغامرات في وادي رم.',
      'التواصل المسبق مع الضيوف لتزويدهم بإرشادات السلامة ومواعيد الانطلاق والتجهيزات المطلوبة.',
      'الإشراف على جاهزية المرشدين السياحيين ومعدات السلامة البحرية والبرية قبل كل رحلة.',
      'التعاون مع الحرفيين ومقدمي التجارب المحليين في العقبة لتقديم أنشطة ثقافية أصيلة ومستدامة.',
      'متابعة تقييمات الضيوف بعد انتهاء التجربة السياحية ورفع توصيات التحسين المستمر.',
    ],
    academic_qualifications: 'درجة البكالوريوس في الإرشاد السياحي، الإدارة السياحية، التراث، أو الإدارة البيئية.',
    technical_skills: [
      'معرفة معمقة بالمعالم السياحية والبيئية في العقبة والمثلث الذهبي (العقبة - وادي رم - البتراء)',
      'تخطيط الجداول التشغيلية وإدارة اللوجستيات السياحية',
      'الإلمام باشتراطات السلامة العامة والإسعافات الأولية في الأنشطة السياحية',
      'إجادة اللغة الإنجليزية (ويُفضل الإلمام بلغة إضافية كالفرنسية أو الألمانية)',
    ],
    behavioral_skills: [
      'الشغف بالضيافة الأصيلة والسياحة المستدامة',
      'سرعة البديهة وحل المشكلات الميدانية بكفاءة وهدوء',
      'مهارات قيادة وتنسيق الفرق المتعددة',
      'التواصل الإيجابي وبناء العلاقات مع الشركاء المحليين',
    ],
    experience_required: 'خبرة لا تقل عن سنتين في تنظيم الرحلات السياحية أو العمليات الميدانية في قطاع السياحة والضيافة.',
    applicationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdBlueParadiseToursCoordinatorJob002/viewform',
    use_unified_form: true,
    sort_order: 2,
    is_trial_data: true,
  },
  {
    job_id: 'JOB-003',
    title_ar: 'أخصائي موارد بشرية واستقطاب مواهب',
    title_en: 'HR & Talent Acquisition Specialist',
    department_id: 'D08',
    department_name_ar: 'إدارة الموارد البشرية والتطوير المؤسسي',
    position_id: 'P031',
    seat_id: 'S081',
    location_ar: 'العقبة — المقر الإداري الرئيسي',
    employment_type: 'دوام كامل',
    work_hours: 'الأحد إلى الخميس (08:30 صباحاً – 04:30 مساءً)',
    published_at: '2026-11-05',
    closing_date: '2026-11-22',
    is_published: true,
    availability_status: 'متاحة',
    summary:
      'قيادة عمليات استقطاب الكفاءات، إدارة المقابلات المنظمة، ومتابعة برامج تهيئة الموظفين الجدد (30/60/90 يوماً) وشؤون الموظفين.',
    job_purpose:
      'دعم إدارة الموارد البشرية والتطوير المؤسسي في بناء فرق عمل متميزة عبر تطبيق سياسات توظيف عادلة ومهنية، وإدارة دورة حياة الموظف من الاستقطاب والتهيئة وحتى تقييم الأداء والتدريب.',
    key_responsibilities: [
      'إدارة إعلانات الوظائف الشاغرة وفرز طلبات المتقدمين عبر نظام تتبع المتقدمين (ATS) وفق معايير موضوعية.',
      'تنظيم وتنسيق المقابلات المبنية على الكفايات باستخدام بطاقات التقييم المعيارية (Structured Rubrics).',
      'الإشراف على تنفيذ برنامج تهيئة الموظفين الجدد خلال أول 30 و60 و90 يوماً لضمان اندماجهم المهني.',
      'متابعة سجلات الحضور والمناوبات والإجازات والتأكد من سلامة ارتباط الموظفين بالمقاعد الوظيفية.',
      'المساهمة في تحليل فجوات المهارات وتنسيق البرامج التدريبية الداخلية.',
    ],
    academic_qualifications: 'درجة البكالوريوس في إدارة الموارد البشرية، إدارة الأعمال، أو علم النفس التنظيمي.',
    technical_skills: [
      'إجادة العمل على أنظمة معلومات الموارد البشرية (HRIS) وأنظمة التوظيف (ATS)',
      'إلمام كامل بقانون العمل الأردني وسياسات الموارد البشرية',
      'مهارة تصميم وتطبيق المقابلات المنظمة وتقييم الكفايات',
      'تحليل مؤشرات الأداء الوظيفي ومعدلات الدوران والالتزام',
    ],
    behavioral_skills: [
      'الأمانة المهنية العالية والحفاظ التام على سرية البيانات',
      'الموضوعية والعدالة في تقييم المرشحين والموظفين',
      'مهارات الاستماع الفعال والتواصل المؤسسي',
      'التفكير التنظيمي والقدرة على تحسين الإجراءات',
    ],
    experience_required: 'خبرة من سنتين إلى 4 سنوات في الموارد البشرية والتوظيف، ويُفضل في قطاع الضيافة أو الخدمات.',
    applicationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdBlueParadiseHRSpecialistJob003/viewform',
    use_unified_form: true,
    sort_order: 3,
    is_trial_data: true,
  },
  {
    job_id: 'JOB-004',
    title_ar: 'محاسب مالي وتشغيلي',
    title_en: 'Financial & Hospitality Operations Accountant',
    department_id: 'D09',
    department_name_ar: 'الإدارة المالية والمشتريات',
    position_id: 'P035',
    seat_id: 'S088',
    location_ar: 'العقبة — المقر الإداري الرئيسي',
    employment_type: 'دوام كامل',
    work_hours: 'الأحد إلى الخميس (08:30 صباحاً – 04:30 مساءً)',
    published_at: '2026-11-06',
    closing_date: '2026-12-05',
    is_published: true,
    availability_status: 'متاحة',
    summary:
      'متابعة العمليات المحاسبية اليومية، مطابقة إيرادات الإقامة والرحلات والمطاعم، وإعداد مسيرات الرواتب والتقارير المالية الشهرية.',
    job_purpose:
      'ضمان دقة وسلامة السجلات المالية والمحاسبية في بلو برادايس، ومراقبة التدفقات النقدية ومطابقة إيرادات الأقسام التشغيلية ومشتريات الموردين وفق المعايير المحاسبية المعتمدة.',
    key_responsibilities: [
      'تسجيل ومطابقة الإيرادات اليومية الناتجة عن حجوزات الغرف، الأغذية والمشروبات، والأنشطة السياحية.',
      'مراجعة فواتير الموردين المحليين وأوامر الشراء والتأكد من مطابقتها لعقود التوريد والمستلمات الفعلية.',
      'المشاركة في إعداد ومراجعة مسير الرواتب الشهري والبدلات والاشتراكات بالتنسيق مع إدارة الموارد البشرية.',
      'إعداد التسويات البنكية الدورية وتقارير المصروفات التشغيلية ومراكز التكلفة.',
      'دعم أعمال التدقيق الداخلي والخارجي وتطبيق ضوابط الرقابة المالية.',
    ],
    academic_qualifications: 'درجة البكالوريوس في المحاسبة، العلوم المالية والمصرفية، أو تخصص مالي ذي صلة.',
    technical_skills: [
      'خبرة متقدمة في الأنظمة المحاسبية (ERP) ومحاسبة الفنادق والمنشآت السياحية',
      'إتقان برنامج Microsoft Excel وجداول البيانات المالية المتقدمة',
      'معرفة بالتشريعات الضريبية ومعايير التقارير المالية في الأردن',
      'القدرة على تحليل التكاليف وإعداد الموازنات التشغيلية',
    ],
    behavioral_skills: [
      'النزاهة والشفافية والدقة المتناهية في التعامل مع الأرقام',
      'الالتزام الصارم بالمواعيد النهائية لإغلاق الحسابات الشهرية',
      'التفكير التحليلي والقدرة على اكتشاف الفروقات المالية ومعالجتها',
      'التعاون المهني مع مختلف الإدارات التشغيلية',
    ],
    experience_required: 'خبرة من سنتين إلى 5 سنوات في المحاسبة المالية، ويُعد العمل السابق في الفنادق أو السياحة ميزة إضافية.',
    applicationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdBlueParadiseAccountantJob004/viewform',
    use_unified_form: true,
    sort_order: 4,
    is_trial_data: true,
  },
  {
    job_id: 'JOB-005',
    title_ar: 'مسؤول خدمة عملاء وعلاقات ضيوف',
    title_en: 'Guest Relations & Customer Care Officer',
    department_id: 'D02',
    department_name_ar: 'إدارة تجربة الضيف والاستقبال',
    position_id: 'P008',
    seat_id: 'S012',
    location_ar: 'العقبة — البهو الرئيسي ومركز تواصل الضيوف',
    employment_type: 'عمل مرن / هجين',
    work_hours: '40 ساعة أسبوعياً (مناوبات صباحية ومسائية مرنة)',
    published_at: '2026-11-08',
    closing_date: '2026-12-15',
    is_published: true,
    availability_status: 'متاحة',
    summary:
      'العناية بتجربة الضيوف طوال فترة إقامتهم، الاستجابة الفورية للاستفسارات والملاحظات، وضمان تحويل كل إقامة إلى ذكرى استثنائية.',
    job_purpose:
      'تمثيل الهوية الترحيبية لشركة بلو برادايس أمام الزوار والضيوف، ومتابعة احتياجاتهم الخاصة وملاحظاتهم بشكل استباقي بالتنسيق مع جميع الأقسام التشغيلية لتحقيق أعلى مستويات الرضا والولاء.',
    key_responsibilities: [
      'استقبال الضيوف والترحيب بهم وتقديم الإرشادات الكاملة حول مرافق المنتجع والتجارب السياحية المتاحة.',
      'إدارة قنوات تواصل خدمة العملاء والرد على الرسائل والاستفسارات بسرعة واحترافية عالية.',
      'التعامل الفوري والمهني مع أي ملاحظات أو شكاوى للضيوف وتوثيقها في نظام التذاكر التشغيلية ومتابعة حلها.',
      'إجراء استطلاعات قياس رضا الضيوف (CSAT / NPS) وتحليل التغذية الراجعة لتحسين جودة الخدمة.',
      'تنسيق الترتيبات الخاصة للمناسبات العائلية وكبار الضيوف بالتعاون مع قسم الضيافة والمطاعم.',
    ],
    academic_qualifications: 'درجة البكالوريوس أو الدبلوم في الضيافة، اللغات الحديثة، العلاقات العامة، أو إدارة الأعمال.',
    technical_skills: [
      'إجادة استخدام أنظمة إدارة علاقات العملاء (CRM) ونظام التذاكر التشغيلية',
      'طلاقة عالية في اللغتين العربية والإنجليزية تحدثاً وكتابة',
      'مهارة كتابة المراسلات المهنية وإدارة التغذية الراجعة الرقمية',
    ],
    behavioral_skills: [
      'التعاطف الإنساني والصبر والقدرة على امتصاص غضب الضيف وتحويله إلى تجربة إيجابية',
      'الابتسامة الدائمة والحضور المهني الراقي',
      'المبادرة الاستباقية لتوقع احتياجات الزوار قبل طلبها',
      'التنسيق السريع والفعال مع فرق الغرف والصيانة والمطاعم',
    ],
    experience_required: 'خبرة من سنة إلى 3 سنوات في علاقات الضيوف أو خدمة العملاء في قطاع الفنادق أو الطيران أو السياحة.',
    applicationUrl: '', // Intentionally empty initially to demonstrate safe fallback message when link is not yet added, or admin can add it live
    use_unified_form: false,
    sort_order: 5,
    is_trial_data: true,
  },
  {
    job_id: 'JOB-006',
    title_ar: 'أخصائي تسويق رقمي ومحتوى سياحي',
    title_en: 'Digital Marketing & Tourism Content Specialist',
    department_id: 'D07',
    department_name_ar: 'إدارة التسويق والمبيعات والشراكات',
    position_id: 'P028',
    seat_id: 'S072',
    location_ar: 'العقبة — المقر الرئيسي (مع مرونة عمل هجين)',
    employment_type: 'دوام كامل',
    work_hours: 'الأحد إلى الخميس (09:00 صباحاً – 05:00 مساءً)',
    published_at: '2026-11-10',
    closing_date: '2026-11-26',
    is_published: true,
    availability_status: 'متاحة',
    summary:
      'صناعة محتوى بصري وقصصي ملهم يعكس جمال العقبة وتجارب بلو برادايس، وإدارة الحملات الرقمية لتعزيز الحجوزات المباشرة.',
    job_purpose:
      'بناء وتنمية الحضور الرقمي لعلامة بلو برادايس محلياً ودولياً، عبر استراتيجيات محتوى إبداعية وحملات إعلانية مدروسة تبرز التجارب السياحية المسؤولة وتستقطب الشرائح المستهدفة من المسافرين.',
    key_responsibilities: [
      'إعداد وتنفيذ خطة المحتوى الرقمي لمنصات التواصل الاجتماعي والموقع الرسمي باللغتين العربية والإنجليزية.',
      'إدارة الحملات الإعلانية الممولة وتحسين محركات البحث (SEO/SEM) لزيادة الحجوزات المباشرة.',
      'التنسيق في إنتاج الصور المرئية ومقاطع الفيديو الترويجية للمنتجع والرحلات البحرية والصحراوية.',
      'تحليل مؤشرات أداء الحملات التسويقية (التفاعل، التحويل، العائد على الإنفاق الإعلاني) وإعداد التقارير الدورية.',
      'التعاون مع قسم المبيعات لتسويق العروض الموسمية وباقات الشركات والعائلات.',
    ],
    academic_qualifications: 'درجة البكالوريوس في التسويق الرقمي، الإعلام الرقمي، الاتصالات التسويقية، أو إدارة الأعمال.',
    technical_skills: [
      'إتقان إدارة منصات التواصل الاجتماعي وأدوات الإعلانات الرقمية (Google Ads / Meta Ads)',
      'مهارة عالية في كتابة المحتوى التسويقي والقصصي السياحي (Copywriting & Storytelling)',
      'إلمام بأدوات تحليلات الويب (Google Analytics) وتحسين محركات البحث (SEO)',
      'معرفة جيدة ببرامج التصميم والمونتاج الأساسية ومبادئ الهوية البصرية',
    ],
    behavioral_skills: [
      'الحس الإبداعي والذائقة البصرية الرفيعة المتوافقة مع هوية بلو برادايس',
      'التفكير التحليلي المبني على البيانات والنتائج',
      'روح المبادرة ومواكبة أحدث اتجاهات تسويق الوجهات السياحية',
      'القدرة على العمل التعاوني مع الفرق الميدانية لتوثيق التجارب الحية',
    ],
    experience_required: 'خبرة لا تقل عن سنتين في التسويق الرقمي وصناعة المحتوى، ويفضل في قطاع السياحة أو الضيافة أو السفر.',
    applicationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdBlueParadiseMarketingJob006/viewform',
    use_unified_form: true,
    sort_order: 6,
    is_trial_data: true,
  },
  {
    job_id: 'JOB-007',
    title_ar: 'مرشد غوص وأنشطة بحرية بيئية',
    title_en: 'Marine Eco-Activities & Diving Instructor',
    department_id: 'D04',
    department_name_ar: 'إدارة الرحلات والتجارب السياحية',
    position_id: 'P017',
    seat_id: 'S044',
    location_ar: 'العقبة — الشاطئ الجنوبي والمارينا',
    employment_type: 'عقد موسمي',
    work_hours: 'حسب جدول الرحلات البحرية الصباحية والمسائية',
    published_at: '2026-11-12',
    closing_date: '2026-12-30',
    is_published: true,
    availability_status: 'قريباً',
    summary:
      'قيادة جولات الغوص والسنوركلينج في الشعاب المرجانية بخليج العقبة مع الالتزام التام بمعايير السلامة البحرية وحماية البيئة.',
    job_purpose:
      'تقديم تجارب بحرية آمنة وتثقيفية وممتعة لضيوف بلو برادايس، وتعريفهم بالتنوع الحيوي الفريد في البحر الأحمر مع الحفاظ على سلامة الشعاب المرجانية.',
    key_responsibilities: [
      'إجراء الإحاطة الإرشادية والفنية للضيوف قبل النزول للماء والتأكد من ملاءمة معدات الغوص والطفو.',
      'مرافقة المجموعات السياحية في جولات السنوركلينج والغوص الاستكشافي وفق أعلى معايير السلامة.',
      'تطبيق قواعد السياحة البيئية المسؤولة ومنع أي ممارسات تضر بالحياة البحرية.',
      'فحص وصيانة معدات الأنشطة البحرية يومياً وتوثيق جاهزيتها.',
    ],
    academic_qualifications: 'شهادة دولية معتمدة في الغوص والإنقاذ البحري (PADI Divemaster / Instructor أو ما يعادلها).',
    technical_skills: [
      'رخصة غوص احترافية سارية المفعول وشهادة إسعافات أولية وإنعاش قلبي رئوي (EFR)',
      'معرفة تفصيلية بمواقع الغوص والشعاب المرجانية في خليج العقبة',
      'إجادة السباحة والإنقاذ المائي وإدارة معدات الأكسجين والسلامة',
    ],
    behavioral_skills: [
      'الهدوء التام والقدرة على طمأنة المبتدئين تحت الماء',
      'الالتزام الصارم ببروتوكولات السلامة والبيئة',
      'التواصل الترحيبي والقدرة على الشرح المبسط بلغات متعددة',
    ],
    experience_required: 'خبرة لا تقل عن سنتين في قيادة رحلات الغوص والأنشطة البحرية السياحية.',
    applicationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdBlueParadiseMarineJob007/viewform',
    use_unified_form: true,
    sort_order: 7,
    is_trial_data: true,
  },
  {
    job_id: 'JOB-008',
    title_ar: 'مشرف جودة وسلامة غذائية (HACCP)',
    title_en: 'Food Safety & Hospitality Quality Supervisor',
    department_id: 'D03',
    department_name_ar: 'إدارة الضيافة والأغذية والمشروبات',
    position_id: 'P012',
    seat_id: 'S028',
    location_ar: 'العقبة — المطاعم والمرافق الفندقية',
    employment_type: 'دوام كامل',
    work_hours: '48 ساعة أسبوعياً',
    published_at: '2026-10-10',
    closing_date: '2026-11-05',
    is_published: true,
    availability_status: 'مغلقة',
    summary:
      'الإشراف على تطبيق معايير الجودة وسلامة الغذاء والنظافة في جميع مطاعم ومرافق الضيافة التابعة لمنتجع بلو برادايس.',
    job_purpose:
      'ضمان امتثال كافة عمليات التحضير والتخزين والتقديم لأعلى المعايير الصحية والبيئية المعتمدة محلياً ودولياً.',
    key_responsibilities: [
      'إجراء جولات التفتيش اليومية على المطابخ والمستودعات وصالات الطعام ومراقبة درجات الحرارة.',
      'تدريب فرق الطهي والضيافة على ممارسات النظافة وسلامة الغذاء (HACCP).',
      'توثيق تقارير الفحص والجودة ومتابعة الإجراءات التصحيحية الفورية.',
    ],
    academic_qualifications: 'درجة البكالوريوس في تغذية الإنسان، علوم وتكنولوجيا الغذاء، أو السلامة الصحية.',
    technical_skills: [
      'شهادة معتمدة في نظام تحليل المخاطر ونقاط التحكم الحرجة (HACCP)',
      'إعداد تقارير التدقيق الصحي والفحص المخبري الدوري',
    ],
    behavioral_skills: [
      'الحزم المهني والدقة في تطبيق المعايير الصحية',
      'القدرة على التدريب والتوجيه الميداني',
    ],
    experience_required: 'خبرة 3 سنوات في رقابة الجودة وسلامة الأغذية في الفنادق أو المطاعم الكبرى.',
    applicationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdBlueParadiseQualityJob008/viewform',
    use_unified_form: true,
    sort_order: 8,
    is_trial_data: true,
  },
  {
    job_id: 'JOB-009',
    title_ar: 'منسق شراكات سياحية ومبيعات مؤسسية (مسودة غير منشورة)',
    title_en: 'B2B Tourism Partnerships Coordinator',
    department_id: 'D07',
    department_name_ar: 'إدارة التسويق والمبيعات والشراكات',
    position_id: 'P029',
    seat_id: 'S074',
    location_ar: 'العقبة / عمّان — عمل هجين',
    employment_type: 'دوام كامل',
    work_hours: 'الأحد إلى الخميس (08:30 صباحاً – 04:30 مساءً)',
    published_at: '2026-11-14',
    closing_date: '2026-12-20',
    is_published: false,
    availability_status: 'متاحة',
    summary:
      'بناء وتطوير اتفاقيات الشراكة مع وكالات السفر الإقليمية والدولية والشركات لتنظيم المؤتمرات والرحلات الجماعية.',
    job_purpose:
      'توسيع شبكة شركاء الأعمال (B2B) لمنتجع بلو برادايس وزيادة حصة المبيعات المؤسسية والمجموعات السياحية طوال العام.',
    key_responsibilities: [
      'استقطاب وكالات السياحة والسفر ومنظمي الرحلات وإبرام عقود التعاون السنوية.',
      'إعداد عروض خاصة للشركات والمؤتمرات والفعاليات الشاطئية في العقبة.',
      'متابعة رضا الشركاء التجاريين وتطوير الباقات المشتركة.',
    ],
    academic_qualifications: 'درجة البكالوريوس في التسويق، إدارة الأعمال، أو الإدارة السياحية.',
    technical_skills: [
      'مهارات التفاوض التجاري وإعداد العقود السياحية (B2B Contracting)',
      'إتقان اللغتين العربية والإنجليزية وعمل العروض التقديمية الاحترافية',
    ],
    behavioral_skills: [
      'القدرة على بناء علاقات استراتيجية طويلة الأمد',
      'الطموح والتركيز على تحقيق المستهدفات البيعية',
    ],
    experience_required: 'خبرة 3 سنوات في مبيعات الفنادق أو السياحة المؤسسية.',
    applicationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdBlueParadiseB2BSalesJob009/viewform',
    use_unified_form: true,
    sort_order: 9,
    is_trial_data: true,
  },
];

