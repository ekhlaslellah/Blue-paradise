import React, { useState } from 'react';
import { useEnterprise } from '../context/EnterpriseContext';
import { BrandLogo } from './BrandLogo';
import { CareersPortal } from './CareersPortal';
import { RoleId, ServiceItem, Vacancy } from '../types/enterprise';
import {
  Compass,
  Calendar,
  Briefcase,
  ShieldCheck,
  Leaf,
  Users,
  Search,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  HelpCircle,
  Lock,
  Image as ImageIcon,
  Building2,
} from 'lucide-react';

export type PublicPageId =
  | 'home'
  | 'about'
  | 'stays'
  | 'experiences'
  | 'booking'
  | 'careers'
  | 'gallery'
  | 'sustainability'
  | 'faq_contact'
  | 'privacy'
  | 'login';

interface PublicWebsiteProps {
  activePage: PublicPageId;
  setActivePage: (page: PublicPageId) => void;
  onNavigatePortal: (portal: 'admin' | 'hr' | 'ats' | 'employee' | 'manager' | 'od' | 'ops' | 'lab' | 'recruitment') => void;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({
  activePage,
  setActivePage,
  onNavigatePortal,
}) => {
  const {
    lang,
    cms,
    services,
    departments,
    positions,
    seats,
    employees,
    vacancies,
    applications,
    bookings,
    strategicGoals,
    roles,
    currentUser,
    switchUserByRole,
    createBooking,
    submitApplication,
    careerJobs,
    notify,
  } = useEnterprise();
  const [showLegacySeatVacancies, setShowLegacySeatVacancies] = useState(false);

  // Filters for Experiences
  const [expCategory, setExpCategory] = useState<string>('ALL');
  const [expAudience, setExpAudience] = useState<string>('ALL');
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  // Booking Form State
  const [bookingServiceId, setBookingServiceId] = useState<string>(services[0]?.service_id || 'SRV01');
  const [bookingGuestName, setBookingGuestName] = useState<string>('');
  const [bookingGuestEmail, setBookingGuestEmail] = useState<string>('');
  const [bookingVisitors, setBookingVisitors] = useState<number>(2);
  const [bookingStartDate, setBookingStartDate] = useState<string>('2026-11-22');
  const [bookingEndDate, setBookingEndDate] = useState<string>('2026-11-24');
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  // Careers Filter & Application Form State
  const [careerSearch, setCareerSearch] = useState<string>('');
  const [careerDept, setCareerDept] = useState<string>('ALL');
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [candidateAlias, setCandidateAlias] = useState<string>('');
  const [candidateContact, setCandidateContact] = useState<string>('');
  const [candidateQual, setCandidateQual] = useState<string>('بكالوريوس إدارة سياحة وفندقة');
  const [candidateExp, setCandidateExp] = useState<number>(2);
  const [candidateSkillsInput, setCandidateSkillsInput] = useState<string>('خدمة العملاء, التواصل الفعال, اللغة الإنجليزية');
  const [candidateAnswers, setCandidateAnswers] = useState<Record<string, string>>({});
  const [candidateConsent, setCandidateConsent] = useState<boolean>(false);
  const [submittedAppRef, setSubmittedAppRef] = useState<string | null>(null);

  // Contact Form State
  const [contactName, setContactName] = useState<string>('');
  const [contactMsg, setContactMsg] = useState<string>('');

  const publishedVacancies = vacancies.filter((v) => v.status === 'Published');
  const selectedBookingService = services.find((s) => s.service_id === bookingServiceId) || services[0];
  const calculatedBookingDays = Math.max(
    1,
    Math.round((new Date(bookingEndDate).getTime() - new Date(bookingStartDate).getTime()) / (1000 * 60 * 60 * 24)) || 1
  );
  const calculatedBookingPrice =
    (selectedBookingService?.base_price_jod || 100) *
    (selectedBookingService?.category === 'إقامة ومنتجعات' ? calculatedBookingDays : bookingVisitors);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createBooking({
      service_id: bookingServiceId,
      guest_alias: bookingGuestName,
      guest_email_test: bookingGuestEmail || 'guest@blueparadise.sim.jo',
      visitors_count: bookingVisitors,
      start_date: bookingStartDate,
      end_date: bookingEndDate,
      amount_jod: calculatedBookingPrice,
    });
    if (created) {
      setConfirmedBookingId(created.booking_id);
      setBookingGuestName('');
      setBookingGuestEmail('');
    }
  };

  const handleJobApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVacancy) return;
    const formattedAnswers = selectedVacancy.job_questions.map((q) => ({
      question: q,
      answer: candidateAnswers[q] || 'إجابة تدريبية موثقة ضمن المحاكاة.',
    }));
    const skillsArr = candidateSkillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const createdApp = submitApplication({
      vacancy_id: selectedVacancy.vacancy_id,
      candidate_alias: candidateAlias,
      contact_test: candidateContact,
      qualification: candidateQual,
      years_experience: candidateExp,
      skills: skillsArr.length ? skillsArr : ['خدمة العملاء'],
      answers: formattedAnswers,
      consent_flag: candidateConsent,
    });
    if (createdApp) {
      setSubmittedAppRef(createdApp.application_id);
      setCandidateAlias('');
      setCandidateContact('');
      setCandidateAnswers({});
    }
  };

  const CORE_VALUES = [
    { title: '١. الضيافة الإنسانية', desc: 'الإصغاء والتعاطف واحترام التنوع الثقافي والإنساني لكل ضيف وزميل.' },
    { title: '٢. السلامة والثقة', desc: 'أولوية أمن الضيف والعامل في المرافق والأنشطة البحرية والبرية دون مساومة.' },
    { title: '٣. التميز التشغيلي', desc: 'جودة خدمة قابلة للقياس ومرتبطة بمؤشرات أداء واضحة وتحسين مستمر.' },
    { title: '٤. الاستدامة', desc: 'ترشيد استهلاك المياه (15%) والطاقة (12%) وتقليل النفايات وحماية بيئة العقبة.' },
    { title: '٥. النزاهة', desc: 'شفافية الأسعار والمعلومات والمعاملة العادلة في التوظيف والخدمة.' },
    { title: '٦. التطوير المهني', desc: 'ثقافة التعلّم المستمر وتحليل فجوات المهارات والتقدم الوظيفي المنهجي.' },
    { title: '٧. الأصالة المحلية', desc: 'إشراك الموردين والحرفيين والمرشدين المحليين في العقبة والجنوب.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] dark:bg-[#0B1D30] text-[#102B46] dark:text-[#F7F5F0]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="flex items-center justify-between gap-8 px-6 py-4 bg-white dark:bg-[#102B46] border-b border-[#E9D8BD] dark:border-[#1E8F91]/30 sticky top-0 z-30">
        {/* Zone 1: Single Brand Wordmark / Logo */}
        <button
          onClick={() => setActivePage('home')}
          className="text-right focus:outline-none whitespace-nowrap shrink-0"
        >
          <BrandLogo />
        </button>

        {/* Zone 2: 5 Concise Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-[#354554] dark:text-[#E9D8BD]">
          <button
            onClick={() => setActivePage('home')}
            className={`hover:text-[#1E8F91] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activePage === 'home' ? 'text-[#102B46] dark:text-white border-b-2 border-[#1E8F91]' : ''
            }`}
          >
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </button>
          <button
            onClick={() => setActivePage('about')}
            className={`hover:text-[#1E8F91] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activePage === 'about' ? 'text-[#102B46] dark:text-white border-b-2 border-[#1E8F91]' : ''
            }`}
          >
            {lang === 'ar' ? 'من نحن' : 'About Us'}
          </button>
          <button
            onClick={() => setActivePage('stays')}
            className={`hover:text-[#1E8F91] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activePage === 'stays' ? 'text-[#102B46] dark:text-white border-b-2 border-[#1E8F91]' : ''
            }`}
          >
            {lang === 'ar' ? 'الإقامات' : 'Stays'}
          </button>
          <button
            onClick={() => setActivePage('experiences')}
            className={`hover:text-[#1E8F91] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activePage === 'experiences' ? 'text-[#102B46] dark:text-white border-b-2 border-[#1E8F91]' : ''
            }`}
          >
            {lang === 'ar' ? 'التجارب السياحية' : 'Experiences'}
          </button>
          <button
            onClick={() => setActivePage('careers')}
            className={`hover:text-[#1E8F91] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
              activePage === 'careers' ? 'text-[#102B46] dark:text-white border-b-2 border-[#1E8F91]' : ''
            }`}
          >
            {lang === 'ar'
              ? `الوظائف الشاغرة (${careerJobs.filter((j) => j.is_published).length})`
              : `Careers (${careerJobs.filter((j) => j.is_published).length})`}
          </button>
        </nav>

        {/* Zone 3: 1 Primary CTA Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActivePage('booking')}
            className="px-4 py-2 text-xs font-bold text-white bg-[#1E8F91] hover:bg-[#236A9F] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            {lang === 'ar' ? 'الحجز التجريبي' : 'Simulated Booking'}
          </button>
        </div>
      </header>

      {/* Secondary Sub-navigation Bar for Additional Public Pages & Quick Mobile Access */}
      <div className="bg-[#E9D8BD]/40 dark:bg-[#183B5E]/50 border-b border-[#E9D8BD] dark:border-[#1E8F91]/20 px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-[#354554] dark:text-[#E9D8BD]">
            <button onClick={() => setActivePage('home')} className="lg:hidden font-bold hover:text-[#1E8F91]">الرئيسية</button>
            <button onClick={() => setActivePage('stays')} className="lg:hidden font-bold hover:text-[#1E8F91]">الإقامات</button>
            <button onClick={() => setActivePage('experiences')} className="lg:hidden font-bold hover:text-[#1E8F91]">التجارب</button>
            <button onClick={() => setActivePage('careers')} className="lg:hidden font-bold hover:text-[#1E8F91]">الوظائف الشاغرة</button>
            <button
              onClick={() => setActivePage('sustainability')}
              className={`hover:text-[#1E8F91] whitespace-nowrap ${activePage === 'sustainability' ? 'font-bold text-[#102B46] dark:text-white underline' : ''}`}
            >
              الاستدامة والمبادرات
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActivePage('gallery')}
              className={`hover:text-[#1E8F91] whitespace-nowrap ${activePage === 'gallery' ? 'font-bold text-[#102B46] dark:text-white underline' : ''}`}
            >
              معرض الصور
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActivePage('faq_contact')}
              className={`hover:text-[#1E8F91] whitespace-nowrap ${activePage === 'faq_contact' ? 'font-bold text-[#102B46] dark:text-white underline' : ''}`}
            >
              الأسئلة الشائعة والتواصل
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActivePage('privacy')}
              className={`hover:text-[#1E8F91] whitespace-nowrap ${activePage === 'privacy' ? 'font-bold text-[#102B46] dark:text-white underline' : ''}`}
            >
              الخصوصية وتنويه المحاكاة
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('login')}
              className="text-[#102B46] dark:text-[#E9D8BD] hover:text-[#1E8F91] font-bold whitespace-nowrap"
            >
              بوابة الدخول الموحدة (11 دوراً)
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onNavigatePortal('admin')}
              className="text-[#1E8F91] hover:underline font-bold whitespace-nowrap"
            >
              لوحة الإدارة وHRIS ←
            </button>
          </div>
        </div>
      </div>

      {/* Main Page Router */}
      <main className="flex-1">
        {/* ==================== A. HOME PAGE ==================== */}
        {activePage === 'home' && (
          <div>
            {/* Hero Section with Aqaba Resort Image & Measured Contrast Scrim */}
            <section className="relative min-h-[540px] flex items-center bg-[#102B46] text-white overflow-hidden">
              <img
                src="/assets/aistudio/image_c38102f6.jpeg"
                alt="منتجع بلو برادايس الافتراضي في العقبة"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102B46] via-[#102B46]/70 to-[#102B46]/35" />

              <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 w-full">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 text-xs text-[#E9D8BD] mb-3">
                    <span>المقر الافتراضي: العقبة، المملكة الأردنية الهاشمية</span>
                    <span aria-hidden="true">·</span>
                    <span>{lang === 'ar' ? cms.slogan_ar : cms.slogan_en}</span>
                  </div>

                  <h1
                    className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    {lang === 'ar' ? cms.hero_title_ar : cms.hero_title_en}
                  </h1>

                  <p className="text-base md:text-lg text-[#F7F5F0]/90 mb-8 leading-relaxed max-w-2xl">
                    {lang === 'ar' ? cms.hero_subtitle_ar : cms.hero_subtitle_en}
                  </p>

                  {/* Required 3 Action Buttons in Hero */}
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => setActivePage('experiences')}
                      className="px-6 py-3 bg-[#1E8F91] hover:bg-[#236A9F] text-white font-bold rounded-lg text-sm transition-colors whitespace-nowrap shrink-0"
                    >
                      {lang === 'ar' ? 'اكتشف تجاربنا' : 'Explore Experiences'}
                    </button>
                    <button
                      onClick={() => setActivePage('stays')}
                      className="px-6 py-3 bg-white text-[#102B46] hover:bg-[#E9D8BD] font-bold rounded-lg text-sm transition-colors whitespace-nowrap shrink-0"
                    >
                      {lang === 'ar' ? 'استعرض الإقامات' : 'Browse Stays'}
                    </button>
                    <button
                      onClick={() => setActivePage('careers')}
                      className="px-6 py-3 bg-transparent border border-[#E9D8BD] text-[#F7F5F0] hover:bg-white/10 font-bold rounded-lg text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {lang === 'ar'
                        ? `الوظائف الشاغرة (${careerJobs.filter((j) => j.is_published && j.availability_status === 'متاحة').length})`
                        : `Open Careers (${careerJobs.filter((j) => j.is_published && j.availability_status === 'متاحة').length})`}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Full-Width Key Institutional Figures Row below Hero */}
            <section className="bg-white dark:bg-[#102B46] border-b border-[#E9D8BD] dark:border-[#1E8F91]/30 py-6 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
                <div>
                  <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">الإدارات التنظيمية المعتمدة</div>
                  <div className="text-2xl font-bold text-[#102B46] dark:text-white tabular-nums mt-1">10 وحدات (D01–D10)</div>
                </div>
                <div>
                  <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">المسميات الوظيفية الفعلية</div>
                  <div className="text-2xl font-bold text-[#102B46] dark:text-white tabular-nums mt-1">{positions.length} مسمى (P001–P039)</div>
                </div>
                <div>
                  <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">المقاعد الوظيفية المخططة</div>
                  <div className="text-2xl font-bold text-[#1E8F91] tabular-nums mt-1">{seats.length} مقعداً (S001–S096)</div>
                </div>
                <div>
                  <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">الكادر المسند / الشواغر</div>
                  <div className="text-2xl font-bold text-[#236A9F] dark:text-[#E9D8BD] tabular-nums mt-1">
                    {employees.filter((e) => e.employment_status !== 'Inactive').length} موظفاً · {seats.filter((s) => s.seat_status === 'Vacant').length} شاغراً
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">مستهدف رضا الضيوف 2028</div>
                  <div className="text-2xl font-bold text-[#102B46] dark:text-white tabular-nums mt-1">≥ 90% رضا الزوار</div>
                </div>
              </div>
            </section>

            {/* Featured Stays & Tourism Experiences Section */}
            <section className="max-w-7xl mx-auto px-6 py-14">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <div className="text-xs text-[#1E8F91] font-bold mb-1">01. باقة الضيافة والتجارب المتكاملة</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#102B46] dark:text-white">
                    إقامات راقية وتجارب استكشاف مسؤولة في العقبة
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActivePage('stays')}
                    className="text-xs font-bold text-[#236A9F] dark:text-[#E9D8BD] hover:underline"
                  >
                    عرض جميع الإقامات ←
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    onClick={() => setActivePage('experiences')}
                    className="text-xs font-bold text-[#1E8F91] hover:underline"
                  >
                    استعراض التجارب السياحية ←
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.slice(0, 3).map((srv) => (
                  <div
                    key={srv.service_id}
                    className="bg-white dark:bg-[#102B46] rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-48 overflow-hidden relative bg-[#102B46]">
                        <img
                          src={srv.image_url}
                          alt={srv.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-xs text-[#354554] dark:text-[#E9D8BD] mb-2">
                          <span>{srv.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>الفئة: {srv.target_audience}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#102B46] dark:text-white mb-2">{srv.name}</h3>
                        <p className="text-sm text-[#354554] dark:text-[#F7F5F0]/80 leading-relaxed mb-4">
                          {srv.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-5 py-4 border-t border-[#E9D8BD] dark:border-[#1E8F91]/20 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#354554] dark:text-[#E9D8BD] block">السعر التجريبي</span>
                        <span className="text-base font-bold text-[#102B46] dark:text-white tabular-nums">
                          {srv.base_price_jod} JOD
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setBookingServiceId(srv.service_id);
                          setActivePage('booking');
                        }}
                        className="px-4 py-2 bg-[#102B46] dark:bg-[#1E8F91] text-white text-xs font-bold rounded-lg hover:bg-[#1E8F91] transition-colors"
                      >
                        احجز تجريبياً
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Brief Corporate Identity & Sustainability Callout */}
            <section className="bg-white dark:bg-[#102B46]/90 border-y border-[#E9D8BD] dark:border-[#1E8F91]/30 py-14 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-[#1E8F91] font-bold mb-2">02. الهوية المؤسسية والاستدامة</div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#102B46] dark:text-white">
                      حيث تتحول كل إقامة إلى ذكرى استثنائية وتُدار المواهب بمنهج احترافي
                    </h2>
                    <p className="text-sm text-[#354554] dark:text-[#F7F5F0]/85 leading-relaxed mb-6">
                      {cms.vision_ar} {cms.mission_ar}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/30">
                        <div className="text-sm font-bold text-[#102B46] dark:text-white mb-1">ترشيد الموارد البيئية</div>
                        <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
                          التزام بخفض استهلاك المياه بنسبة 15% والطاقة بنسبة 12% لكل ليلة نزيل مقارنة بخط الأساس.
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/30">
                        <div className="text-sm font-bold text-[#102B46] dark:text-white mb-1">إدارة مواهب رقمية 100%</div>
                        <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
                          ربط كامل بين العمليات السياحية والهيكل التنظيمي (96 مقعداً) وبوابات الخدمة الذاتية والأداء.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setActivePage('about')}
                      className="px-5 py-2.5 bg-[#102B46] dark:bg-[#1E8F91] text-white text-xs font-bold rounded-lg hover:bg-[#236A9F] transition-colors"
                    >
                      استعرض الرؤية والقيم والأهداف الاستراتيجية
                    </button>
                    <button
                      onClick={() => setActivePage('booking')}
                      className="px-5 py-2.5 border border-[#102B46] dark:border-[#E9D8BD] text-[#102B46] dark:text-[#E9D8BD] text-xs font-bold rounded-lg hover:bg-[#E9D8BD]/30 transition-colors"
                    >
                      تجربة نظام الحجز المباشر
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-5 rounded-xl overflow-hidden border border-[#E9D8BD] dark:border-[#1E8F91]/30">
                  <img
                    src="/assets/aistudio/image_6f39f1f3.jpeg"
                    alt="شاطئ وخليج العقبة — بيئة عمل بلو برادايس الافتراضية"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover min-h-[280px]"
                  />
                </div>
              </div>
            </section>

            {/* Latest News & Initiatives from CMS */}
            <section className="max-w-7xl mx-auto px-6 py-12">
              <div className="text-xs text-[#1E8F91] font-bold mb-1">03. أخبار ومبادرات بلو برادايس (تُدار عبر CMS)</div>
              <h2 className="text-2xl font-bold mb-6">آخر المستجدات والمبادرات التدريبية</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cms.announcements.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-[#102B46] p-5 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30"
                  >
                    <div className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-2">
                      <span>{item.category}</span>
                      <span aria-hidden="true"> · </span>
                      <span className="tabular-nums">{item.date}</span>
                    </div>
                    <h3 className="text-base font-bold mb-2 text-[#102B46] dark:text-white">{item.title}</h3>
                    <p className="text-xs text-[#354554] dark:text-[#F7F5F0]/80 leading-relaxed">{item.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================== B. ABOUT US (من نحن) ==================== */}
        {activePage === 'about' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
            <div className="bg-white dark:bg-[#102B46] rounded-2xl p-8 border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#1E8F91] font-bold mb-2">ملف التأسيس والاستراتيجية — الإصدار 1.0</div>
              <h1 className="text-3xl font-bold mb-4">من نحن — بلو برادايس للمنتجعات والتجارب السياحية</h1>
              <p className="text-sm text-[#354554] dark:text-[#F7F5F0]/85 leading-relaxed mb-6">
                بلو برادايس للمنتجعات والتجارب السياحية (Blue Paradise Resorts & Experiences) هي علامة ضيافة افتراضية مقرها المفترض مدينة العقبة في المملكة الأردنية الهاشمية. صُممت الشركة لتكون بيئة محاكاة مؤسسية متكاملة تجمع بين الإقامة الراقية والتجارب السياحية المسؤولة واستكشاف البيئة المحلية، مع إدارة المواهب البشرية بمنهج رقمي احترافي (HR Technology & Digital Talent Management).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/30">
                  <h2 className="text-lg font-bold text-[#102B46] dark:text-white mb-2">الرؤية المعتمدة</h2>
                  <p className="text-sm text-[#354554] dark:text-[#E9D8BD] leading-relaxed">{cms.vision_ar}</p>
                </div>
                <div className="p-6 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/30">
                  <h2 className="text-lg font-bold text-[#102B46] dark:text-white mb-2">الرسالة المؤسسية</h2>
                  <p className="text-sm text-[#354554] dark:text-[#E9D8BD] leading-relaxed">{cms.mission_ar}</p>
                </div>
              </div>
            </div>

            {/* 7 Institutional Values */}
            <div>
              <h2 className="text-2xl font-bold mb-4">القيم المؤسسية السبعة</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {CORE_VALUES.map((val, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-[#102B46] p-5 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30"
                  >
                    <h3 className="text-base font-bold text-[#102B46] dark:text-white mb-2">{val.title}</h3>
                    <p className="text-xs text-[#354554] dark:text-[#E9D8BD] leading-relaxed">{val.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Goals 2027-2029 */}
            <div>
              <h2 className="text-2xl font-bold mb-2">الأهداف الاستراتيجية المعتمدة (2027–2029)</h2>
              <p className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-5">
                جميع الأهداف والمؤشرات أدناه مستخرجة من وثيقة التأسيس والاستراتيجية ومربوطة بوحدة التطوير المؤسسي في لوحة الإدارة:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {strategicGoals.map((goal) => (
                  <div
                    key={goal.goal_id}
                    className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30"
                  >
                    <div className="text-xs text-[#1E8F91] font-bold mb-1">
                      {goal.pillar_name} · الإدارة المالكة: {goal.owner_department_id}
                    </div>
                    <h3 className="text-base font-bold mb-2">{goal.title}</h3>
                    <div className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-3">
                      معادلة المؤشر: {goal.kpi_formula} | المستهدف: {goal.target_2028_2029}
                    </div>
                    <div className="w-full bg-[#F7F5F0] dark:bg-[#0B1D30] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#1E8F91] h-full" style={{ width: `${goal.current_simulated_progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SWOT & Service Philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
                <h2 className="text-lg font-bold mb-3">تحليل SWOT المؤسسي</h2>
                <ul className="space-y-2 text-xs text-[#354554] dark:text-[#E9D8BD] leading-relaxed">
                  <li><strong className="text-[#102B46] dark:text-white">نقاط القوة:</strong> باقة خدمة متكاملة، هوية محلية أصيلة، ونموذج إدارة موظفين رقمي مترابط.</li>
                  <li><strong className="text-[#102B46] dark:text-white">نقاط الضعف:</strong> علامة افتراضية بلا سمعة سوقية أو رأس مال فعلي؛ بيانات تدريبية غير حقيقية.</li>
                  <li><strong className="text-[#102B46] dark:text-white">الفرص:</strong> نمو الطلب على التجارب الأصيلة في العقبة، شراكات المجتمع المحلي، وتحسين قنوات الحجز.</li>
                  <li><strong className="text-[#102B46] dark:text-white">التهديدات:</strong> الموسمية السياحية، متطلبات التراخيص، المنافسة الإقليمية، وتقلب تكاليف التشغيل.</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
                <h2 className="text-lg font-bold mb-3">فلسفة الخدمة والموقع التشغيلي الافتراضي</h2>
                <p className="text-xs text-[#354554] dark:text-[#E9D8BD] leading-relaxed mb-3">
                  المقر الإداري والتشغيلي الافتراضي يقع في مدينة العقبة (موقع تجريبي واحد يضم منتجعاً ونقطة انطلاق للتجارب البحرية والبيئية). أما التوسع نحو البترا ووادي رم فهو موضح كتصور مستقبلي للدراسة وليس فروعاً قائمة.
                </p>
                <p className="text-xs text-[#354554] dark:text-[#E9D8BD] leading-relaxed">
                  ترتكز فلسفة الخدمة على مرافقة الزائر من لحظة الحجز إلى المغادرة عبر فرق متعددة المهارات ومدربة وفق معايير السلامة والاستدامة.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== C. STAYS & RESORTS (الإقامات والمنتجعات) ==================== */}
        {activePage === 'stays' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-8">
              <div className="text-xs text-[#1E8F91] font-bold mb-1">وحدات الإقامة الموثقة في قاعدة البيانات</div>
              <h1 className="text-3xl font-bold mb-2">الإقامات والمنتجعات الافتراضية — العقبة</h1>
              <p className="text-sm text-[#354554] dark:text-[#E9D8BD]">
                تعرض هذه الصفحة وحدات الإقامة الموثقة في جدول الخدمات (`services`). أي تصور توسع مستقبلي مُميز بوضوح التزاماً بقواعد الشفافية.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services
                .filter((s) => s.category === 'إقامة ومنتجعات')
                .map((stay) => (
                  <div
                    key={stay.service_id}
                    className="bg-white dark:bg-[#102B46] rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-52 bg-[#102B46] relative">
                        <img
                          src={stay.image_url}
                          alt={stay.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="text-xs text-[#1E8F91] font-bold mb-1">
                          {stay.service_id} · {stay.is_future_proposal ? 'تصور توسع مستقبلي (غير قائم)' : 'موقع العقبة الافتراضي المعتمد'}
                        </div>
                        <h2 className="text-lg font-bold mb-2">{stay.name}</h2>
                        <p className="text-xs text-[#354554] dark:text-[#E9D8BD] leading-relaxed mb-4">
                          {stay.description}
                        </p>
                        <div className="space-y-1 mb-4">
                          {stay.features.map((f, i) => (
                            <div key={i} className="text-xs text-[#102B46] dark:text-[#F7F5F0] flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#1E8F91] shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t border-[#E9D8BD] dark:border-[#1E8F91]/20 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#354554] dark:text-[#E9D8BD] block">السعر التجريبي / ليلة</span>
                        <span className="text-lg font-bold tabular-nums">{stay.base_price_jod} JOD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedServiceModal(stay)}
                          className="px-3 py-2 border border-[#102B46] dark:border-[#E9D8BD] text-xs font-bold rounded-lg"
                        >
                          التفاصيل
                        </button>
                        <button
                          onClick={() => {
                            setBookingServiceId(stay.service_id);
                            setActivePage('booking');
                          }}
                          className="px-4 py-2 bg-[#1E8F91] text-white text-xs font-bold rounded-lg hover:bg-[#236A9F]"
                        >
                          حجز تجريبي
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ==================== D. TOURISM EXPERIENCES (التجارب السياحية) ==================== */}
        {activePage === 'experiences' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-8">
              <div className="text-xs text-[#1E8F91] font-bold mb-1">رحلات استكشاف بحرية وبيئية وثقافية</div>
              <h1 className="text-3xl font-bold mb-2">التجارب والأنشطة السياحية</h1>
              <p className="text-sm text-[#354554] dark:text-[#E9D8BD]">
                استكشف التجارب الموثقة في قاعدة البيانات مع إمكانية التصفية حسب نوع التجربة، الفئة المستهدفة، والسعر التجريبي بالدينار الأردني.
              </p>
            </div>

            {/* Interactive Filters */}
            <div className="bg-white dark:bg-[#102B46] p-5 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold mb-1.5">نوع التجربة / الخدمة</label>
                <select
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value)}
                  className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3 py-2 text-xs"
                >
                  <option value="ALL">جميع الفئات ({services.length})</option>
                  <option value="تجارب بحرية وبيئية">تجارب بحرية وبيئية</option>
                  <option value="تجارب ثقافية وتراثية">تجارب ثقافية وتراثية</option>
                  <option value="الضيافة والمطاعم">الضيافة والمطاعم (تجربة الغروب)</option>
                  <option value="فعاليات مؤسسية">فعاليات وشركات</option>
                  <option value="إقامة ومنتجعات">إقامة ومنتجعات</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5">الفئة المستهدفة</label>
                <select
                  value={expAudience}
                  onChange={(e) => setExpAudience(e.target.value)}
                  className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3 py-2 text-xs"
                >
                  <option value="ALL">الجميع</option>
                  <option value="عائلات">عائلات</option>
                  <option value="أفراد ومغامرون">أفراد ومغامرون</option>
                  <option value="شركات وفرق عمل">شركات وفرق عمل</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1.5 tabular-nums">
                  السعر الأقصى: {maxPrice} دينار أردني (JOD)
                </label>
                <input
                  type="range"
                  min={40}
                  max={350}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#1E8F91]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services
                .filter((s) => (expCategory === 'ALL' ? true : s.category === expCategory))
                .filter((s) => (expAudience === 'ALL' ? true : s.target_audience === expAudience || s.target_audience === 'الجميع'))
                .filter((s) => s.base_price_jod <= maxPrice)
                .map((exp) => (
                  <div
                    key={exp.service_id}
                    className="bg-white dark:bg-[#102B46] rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-48 bg-[#102B46]">
                        <img
                          src={exp.image_url}
                          alt={exp.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <div className="text-xs text-[#1E8F91] font-bold mb-1">
                          {exp.category} · الفئة: {exp.target_audience}
                        </div>
                        <h3 className="text-base font-bold mb-2">{exp.name}</h3>
                        <p className="text-xs text-[#354554] dark:text-[#E9D8BD] leading-relaxed mb-4">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-5 py-4 border-t border-[#E9D8BD] dark:border-[#1E8F91]/20 flex items-center justify-between">
                      <span className="text-base font-bold tabular-nums">{exp.base_price_jod} JOD</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedServiceModal(exp)}
                          className="px-3 py-1.5 border border-[#102B46] dark:border-[#E9D8BD] rounded-lg text-xs font-bold"
                        >
                          التفاصيل
                        </button>
                        <button
                          onClick={() => {
                            setBookingServiceId(exp.service_id);
                            setActivePage('booking');
                          }}
                          className="px-3.5 py-1.5 bg-[#1E8F91] text-white rounded-lg text-xs font-bold"
                        >
                          احجز الآن
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ==================== E. SIMULATED BOOKING (الحجوزات التجريبية) ==================== */}
        {activePage === 'booking' && (
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white dark:bg-[#102B46] p-8 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#1E8F91] font-bold mb-1">محاكاة الحجز المباشر وربطه بالعمليات التشغيلية</div>
              <h1 className="text-2xl font-bold mb-2">واجهة الحجز التجريبي</h1>
              <p className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-6">
                ينتقل الحجز فور تأكيده إلى جدول `bookings` في قاعدة البيانات ويظهر في لوحة الإدارة الرئيسية. (تنويه: محاكاة تدريبية بدون بوابة دفع حقيقية).
              </p>

              {confirmedBookingId && (
                <div className="mb-6 p-4 rounded-xl bg-[#1E8F91]/15 border border-[#1E8F91] text-xs space-y-1">
                  <div className="font-bold text-sm text-[#102B46] dark:text-white">
                    تم تأكيد الطلب التجريبي بنجاح — رقم الحجز: <span className="tabular-nums">{confirmedBookingId}</span>
                  </div>
                  <div>الحالة: مؤكد (Confirmed) | انتقل السجل إلى لوحة الإدارة قسم خدمة الضيوف والحجوزات (D02).</div>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5">١. اختر الخدمة أو الإقامة</label>
                  <select
                    value={bookingServiceId}
                    onChange={(e) => setBookingServiceId(e.target.value)}
                    className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3.5 py-2.5 text-sm"
                  >
                    {services.map((s) => (
                      <option key={s.service_id} value={s.service_id}>
                        {s.service_id} — {s.name} ({s.base_price_jod} JOD)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5">٢. تاريخ البدء / الوصول</label>
                    <input
                      type="date"
                      value={bookingStartDate}
                      onChange={(e) => setBookingStartDate(e.target.value)}
                      className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3 py-2 text-xs tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5">٣. تاريخ الانتهاء / المغادرة</label>
                    <input
                      type="date"
                      value={bookingEndDate}
                      onChange={(e) => setBookingEndDate(e.target.value)}
                      className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3 py-2 text-xs tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5">٤. عدد الزوار</label>
                    <input
                      type="number"
                      min={1}
                      max={25}
                      value={bookingVisitors}
                      onChange={(e) => setBookingVisitors(Number(e.target.value))}
                      className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3 py-2 text-xs tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5">٥. اسم الضيف الافتراضي (Alias)</label>
                    <input
                      type="text"
                      required
                      value={bookingGuestName}
                      onChange={(e) => setBookingGuestName(e.target.value)}
                      placeholder="مثال: عائلة النسور (ضيف تجريبي)"
                      className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3.5 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5">٦. بريد التواصل الاختباري</label>
                    <input
                      type="email"
                      value={bookingGuestEmail}
                      onChange={(e) => setBookingGuestEmail(e.target.value)}
                      placeholder="guest.test@sim.jo"
                      className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3.5 py-2 text-xs"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#354554] dark:text-[#E9D8BD] block">إجمالي التكلفة التقديرية (للمحاكاة فقط)</span>
                    <span className="text-xl font-bold text-[#102B46] dark:text-white tabular-nums">
                      {calculatedBookingPrice} دينار أردني (JOD)
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#1E8F91] hover:bg-[#236A9F] text-white font-bold rounded-lg text-xs"
                  >
                    تأكيد الطلب وإرساله للوحة الإدارة
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-[#102B46] p-6 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <h2 className="text-lg font-bold mb-4">سجل الحجوزات التجريبية النشطة ({bookings.length})</h2>
              <div className="space-y-3">
                {bookings.map((b) => {
                  const srv = services.find((s) => s.service_id === b.service_id);
                  return (
                    <div
                      key={b.booking_id}
                      className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/20 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span className="tabular-nums text-[#1E8F91]">{b.booking_id}</span>
                        <span>الحالة: {b.booking_status}</span>
                      </div>
                      <div className="font-bold text-sm mb-1">{srv?.name || b.service_id}</div>
                      <div className="text-[#354554] dark:text-[#E9D8BD]">
                        الضيف: {b.guest_alias} · الزوار: {b.visitors_count} · المبلغ: <b className="tabular-nums">{b.amount_jod} JOD</b>
                      </div>
                      <div className="text-[#354554] dark:text-[#E9D8BD] tabular-nums mt-1">
                        الفترة: {b.start_date} إلى {b.end_date}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== F. CAREERS & RECRUITMENT PORTAL (الوظائف الشاغرة) ==================== */}
        {activePage === 'careers' && (
          <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
            {/* Primary Interactive Careers Portal */}
            <CareersPortal onOpenAdminRecruitment={() => onNavigatePortal('recruitment')} />

            {/* Optional Collapsible Relational Seat-Vacancy Explorer (Preserves Turn 1 ATS Seat Binding) */}
            <div className="pt-6 border-t border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#102B46] p-5 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
                <div>
                  <div className="text-xs text-[#1E8F91] font-bold">ربط المقاعد الوظيفية المخططة (S001–S096) بنظام تتبع المتقدمين (ATS)</div>
                  <h2 className="text-base font-bold mt-0.5">
                    جدول الشواغر المقعدية الداخلي ({publishedVacancies.length} مقعداً شاغراً مفتوحاً في HRIS)
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLegacySeatVacancies((prev) => !prev)}
                  className="px-4 py-2 rounded-xl bg-[#102B46] dark:bg-[#1E8F91] text-white text-xs font-bold cursor-pointer"
                >
                  {showLegacySeatVacancies ? 'إخفاء جدول الشواغر المقعدية' : 'عرض الشواغر المرتبطة بالمقاعد (ATS)'}
                </button>
              </div>
            </div>

            {showLegacySeatVacancies && (
              <div>
                {/* Search & Filter */}
            <div className="bg-white dark:bg-[#102B46] p-5 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold mb-1">بحث في المسميات الوظيفية أو رمز المقعد</label>
                <input
                  type="text"
                  value={careerSearch}
                  onChange={(e) => setCareerSearch(e.target.value)}
                  placeholder="ابحث عن: موظف استقبال، مرشد سياحي، طاهٍ، P007، S008..."
                  className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3.5 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">تصفية حسب الإدارة</label>
                <select
                  value={careerDept}
                  onChange={(e) => setCareerDept(e.target.value)}
                  className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3.5 py-2 text-xs"
                >
                  <option value="ALL">جميع الإدارات (D01–D10)</option>
                  {departments.map((d) => (
                    <option key={d.department_id} value={d.department_id}>
                      {d.department_id} — {d.name_ar}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Published Vacancies List */}
              <div className="lg:col-span-7 space-y-4">
                {publishedVacancies
                  .filter((v) => (careerDept === 'ALL' ? true : v.department_id === careerDept))
                  .filter((v) => {
                    if (!careerSearch.trim()) return true;
                    const pos = positions.find((p) => p.position_id === v.position_id);
                    const q = careerSearch.toLowerCase();
                    return (
                      v.vacancy_id.toLowerCase().includes(q) ||
                      v.seat_id.toLowerCase().includes(q) ||
                      v.position_id.toLowerCase().includes(q) ||
                      (pos && pos.title_ar.toLowerCase().includes(q))
                    );
                  })
                  .map((vac) => {
                    const pos = positions.find((p) => p.position_id === vac.position_id);
                    const dept = departments.find((d) => d.department_id === vac.department_id);
                    const isSelected = selectedVacancy?.vacancy_id === vac.vacancy_id;

                    return (
                      <div
                        key={vac.vacancy_id}
                        className={`bg-white dark:bg-[#102B46] p-6 rounded-xl border transition-colors ${
                          isSelected
                            ? 'border-[#1E8F91] ring-2 ring-[#1E8F91]/30'
                            : 'border-[#E9D8BD] dark:border-[#1E8F91]/30'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#1E8F91] font-bold mb-2">
                          <span>
                            الشاغر {vac.vacancy_id} · المسمى {vac.position_id} · المقعد الشاغر {vac.seat_id}
                          </span>
                          <span>{dept?.name_ar} ({vac.department_id})</span>
                        </div>
                        <h2 className="text-lg font-bold mb-2">{pos?.title_ar || vac.position_id}</h2>
                        <p className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-3 leading-relaxed">
                          {pos?.description}
                        </p>
                        <div className="mb-4">
                          <div className="text-xs font-bold mb-1">المتطلبات الوظيفية:</div>
                          <ul className="list-disc list-inside text-xs text-[#354554] dark:text-[#E9D8BD] space-y-1">
                            {vac.requirements_ar.map((req, idx) => (
                              <li key={idx}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-3 border-t border-[#E9D8BD] dark:border-[#1E8F91]/20 flex flex-wrap items-center justify-between gap-3">
                          <div className="text-xs tabular-nums">
                            نوع العقد: <b>{vac.employment_type}</b> · النطاق الافتراضي:{' '}
                            <b>
                              {pos?.salary_min_jod}–{pos?.salary_max_jod} JOD
                            </b>{' '}
                            · الإغلاق: <b>{vac.closing_date}</b>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedVacancy(vac);
                              setSubmittedAppRef(null);
                            }}
                            className="px-4 py-2 bg-[#102B46] dark:bg-[#1E8F91] hover:bg-[#1E8F91] text-white text-xs font-bold rounded-lg"
                          >
                            التقديم على هذا الشاغر
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Dynamic Job Application Form */}
              <div className="lg:col-span-5">
                <div className="bg-white dark:bg-[#102B46] p-6 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 sticky top-24">
                  <h2 className="text-lg font-bold mb-2">نموذج التقديم الإلكتروني (مرتبط بـ ATS)</h2>
                  {!selectedVacancy ? (
                    <div className="p-6 text-center rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] text-xs text-[#354554] dark:text-[#E9D8BD]">
                      اختر أحد الشواغر المنشورة من القائمة لعرض أسئلة الوظيفة المخصصة وتقديم طلبك التجريبي.
                    </div>
                  ) : (
                    <form onSubmit={handleJobApplySubmit} className="space-y-3.5 text-xs">
                      <div className="p-3 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#1E8F91]/40">
                        <div className="font-bold text-[#1E8F91]">
                          التقديم على: {positions.find((p) => p.position_id === selectedVacancy.position_id)?.title_ar}
                        </div>
                        <div className="text-[#354554] dark:text-[#E9D8BD] mt-0.5 tabular-nums">
                          الشاغر: {selectedVacancy.vacancy_id} · المقعد: {selectedVacancy.seat_id} · القسم: {selectedVacancy.department_id}
                        </div>
                      </div>

                      {submittedAppRef && (
                        <div className="p-3.5 rounded-lg bg-[#1E8F91]/15 border border-[#1E8F91]">
                          <div className="font-bold">تم إرسال الطلب بنجاح — رقم المرجع: {submittedAppRef}</div>
                          <div className="mt-1">يمكنك الآن فتح بوابة التوظيف (ATS) في لوحة الإدارة لمراجعة الطلب وتقييمه.</div>
                        </div>
                      )}

                      <div>
                        <label className="block font-bold mb-1">الاسم المستعار للمتقدم (لا تستخدم اسماً حقيقياً)</label>
                        <input
                          type="text"
                          required
                          value={candidateAlias}
                          onChange={(e) => setCandidateAlias(e.target.value)}
                          placeholder="مثال: ليث العقباوي (مرشح تجريبي)"
                          className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3 py-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold mb-1">بيانات تواصل اختبارية</label>
                          <input
                            type="text"
                            required
                            value={candidateContact}
                            onChange={(e) => setCandidateContact(e.target.value)}
                            placeholder="candidate@sim.jo"
                            className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">سنوات الخبرة الافتراضية</label>
                          <input
                            type="number"
                            min={0}
                            max={30}
                            value={candidateExp}
                            onChange={(e) => setCandidateExp(Number(e.target.value))}
                            className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3 py-2 tabular-nums"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-1">المؤهل العلمي والتخصص</label>
                        <input
                          type="text"
                          required
                          value={candidateQual}
                          onChange={(e) => setCandidateQual(e.target.value)}
                          className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">المهارات (مفصولة بفاصلة)</label>
                        <input
                          type="text"
                          value={candidateSkillsInput}
                          onChange={(e) => setCandidateSkillsInput(e.target.value)}
                          className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3 py-2"
                        />
                      </div>

                      {/* Job-Specific Dynamic Questions */}
                      {selectedVacancy.job_questions.map((q, idx) => (
                        <div key={idx}>
                          <label className="block font-bold mb-1 text-[#102B46] dark:text-[#E9D8BD]">
                            سؤال تخصصي ({idx + 1}): {q}
                          </label>
                          <textarea
                            rows={2}
                            required
                            value={candidateAnswers[q] || ''}
                            onChange={(e) => setCandidateAnswers((prev) => ({ ...prev, [q]: e.target.value }))}
                            placeholder="اكتب إجابتك التخصصية هنا..."
                            className="w-full border border-[#E9D8BD] dark:border-[#1E8F91]/40 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-lg px-3 py-2"
                          />
                        </div>
                      ))}

                      <label className="flex items-start gap-2 pt-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={candidateConsent}
                          onChange={(e) => setCandidateConsent(e.target.checked)}
                          className="mt-0.5 accent-[#1E8F91]"
                        />
                        <span className="text-[#354554] dark:text-[#E9D8BD] leading-relaxed">
                          أوافق على معالجة هذه البيانات الافتراضية لأغراض المحاكاة التدريبية فقط، وأقر بعدم إدخال رقم وطني أو وثائق شخصية حقيقية.
                        </span>
                      </label>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#1E8F91] hover:bg-[#236A9F] text-white font-bold rounded-lg transition-colors"
                      >
                        إرسال طلب التوظيف إلى نظام ATS
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== G1. PHOTO GALLERY (معرض الصور) ==================== */}
        {activePage === 'gallery' && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-2">معرض الصور البصرية المعتمدة</h1>
            <p className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-8">
              صور تمثيلية لبيئة الضيافة الساحلية في العقبة والجنوب الأردني ضمن محاكاة شركة بلو برادايس (مع تنويه صريح بعدم ادعاء ملكية منشآت حقيقية).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { src: '/assets/aistudio/image_c38102f6.jpeg', title: 'إطلالة المسبح اللانهائي والبحر — منتجع العقبة الافتراضي', tag: 'إقامة وضيافة راقية' },
                { src: '/assets/aistudio/image_6f39f1f3.jpeg', title: 'ساحل مدينة العقبة وقوارب التجارب البحرية', tag: 'المقر التشغيلي الافتراضي — العقبة' },
                { src: '/assets/aistudio/______25a2be5d.jpeg', title: 'التجربة التراثية والثقافية في البترا والجنوب', tag: 'مسارات سياحية ثقافية' },
                { src: '/assets/aistudio/______f5e37cb7.jpeg', title: 'مرافق الإقامة الهادئة وحدائق النخيل', tag: 'الاستجمام العائلي' },
              ].map((img, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#102B46] rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 overflow-hidden"
                >
                  <div className="h-64 bg-[#102B46]">
                    <img src={img.src} alt={img.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="font-bold text-sm">{img.title}</span>
                    <span className="text-xs text-[#1E8F91]">{img.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== G2. SUSTAINABILITY (الاستدامة والمبادرات) ==================== */}
        {activePage === 'sustainability' && (
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
            <div className="bg-white dark:bg-[#102B46] p-8 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#1E8F91] font-bold mb-1">المحور الاستراتيجي الرابع — المسؤولية البيئية والمجتمعية</div>
              <h1 className="text-3xl font-bold mb-3">الاستدامة والمبادرات المجتمعية في العقبة</h1>
              <p className="text-sm text-[#354554] dark:text-[#E9D8BD] leading-relaxed">
                ترتبط إدارة الصيانة والاستدامة (`D09`) وإدارة التجارب السياحية (`D04`) بمؤشرات بيئية ومجتمعية قابلة للقياس ضمن خطة 2027–2029.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="p-5 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD]">
                  <div className="text-2xl font-bold text-[#1E8F91] tabular-nums mb-1">-15%</div>
                  <div className="font-bold text-sm mb-1">خفض استهلاك المياه لكل ليلة نزيل</div>
                  <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">عبر أنظمة الترشيد الذكية في وحدات الإقامة وإعادة تدوير المياه الرمادية لري الحدائق.</p>
                </div>
                <div className="p-5 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD]">
                  <div className="text-2xl font-bold text-[#236A9F] tabular-nums mb-1">-12%</div>
                  <div className="font-bold text-sm mb-1">خفض استهلاك الطاقة الكهربائية</div>
                  <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">اعتماد حساسات التبريد والإضاءة الموفرة للطاقة في المرافق والغرف.</p>
                </div>
                <div className="p-5 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD]">
                  <div className="text-2xl font-bold text-[#102B46] dark:text-white tabular-nums mb-1">100%</div>
                  <div className="font-bold text-sm mb-1">شراكات محلية مسؤولة</div>
                  <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">إشراك المرشدين المحليين والحرفيين والموردين في العقبة لتعزيز الأصالة المحلية.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== G3. FAQ & CONTACT (الأسئلة الشائعة والتواصل) ==================== */}
        {activePage === 'faq_contact' && (
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-2xl font-bold mb-4">الأسئلة الشائعة (FAQ)</h1>
              {[
                {
                  q: 'هل شركة بلو برادايس منشأة سياحية مسجلة فعلياً؟',
                  a: 'لا؛ بلو برادايس شركة افتراضية بالكامل صُممت لأغراض محاكاة تكنولوجيا الموارد البشرية (HR Technology) وإدارة المؤسسات السياحية، وجميع سجلاتها وحجوزاتها تجريبية.',
                },
                {
                  q: 'كيف ترتبط الوظائف المنشورة بالهيكل التنظيمي؟',
                  a: 'يتكون الهيكل المعتمد من 10 إدارات (D01–D10) و39 مسمى وظيفياً (P001–P039) و96 مقعداً مخططاً (S001–S096). كل شاغر يُفتح على مقعد شاغر محدد.',
                },
                {
                  q: 'هل يُصدر النظام قرارات رفض توظيف بالذكاء الاصطناعي وحده؟',
                  a: 'مطلقاً؛ تنص سياسة بلو برادايس على أن الفرز الآلي أداة مساعدة فقط، وتبقى مراجعة المرشح وتبرير القرار بيد مسؤول بشري مخول.',
                },
                {
                  q: 'هل تتطلب تجربة التقديم على الوظائف رفع هوية أو رقم وطني؟',
                  a: 'يُمنع جمع أي أرقام وطنية أو صور هوية أو وثائق شخصية حقيقية في بيئة المحاكاة التدريبية.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-[#102B46] p-5 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30"
                >
                  <h3 className="text-sm font-bold mb-2">{item.q}</h3>
                  <p className="text-xs text-[#354554] dark:text-[#E9D8BD] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
            <div className="lg:col-span-5 bg-white dark:bg-[#102B46] p-6 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <h2 className="text-lg font-bold mb-2">نموذج التواصل التجريبي</h2>
              <p className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-4">
                المقر المفترض للمحاكاة: العقبة، المملكة الأردنية الهاشمية (خريطة وعنوان رمزي للمحاكاة).
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  notify('success', 'تم استلام رسالتك التجريبية', 'تم توجيه الرسالة إلى قسم خدمة الضيوف والحجوزات D02.');
                  setContactName('');
                  setContactMsg('');
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block font-bold mb-1">الاسم المستعار</label>
                  <input
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="زائر تجريبي"
                    className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">الرسالة أو الاستفسار</label>
                  <textarea
                    required
                    rows={4}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="اكتب رسالتك التجريبية هنا..."
                    className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                  />
                </div>
                <button type="submit" className="w-full py-2.5 bg-[#102B46] dark:bg-[#1E8F91] text-white font-bold rounded-lg">
                  إرسال رسالة تجريبية
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================== G4. PRIVACY & DISCLOSURE (الخصوصية) ==================== */}
        {activePage === 'privacy' && (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="bg-white dark:bg-[#102B46] p-8 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
              <h1 className="text-2xl font-bold">سياسة الخصوصية والإفصاح عن طبيعة المحاكاة</h1>
              <p className="text-xs text-[#354554] dark:text-[#E9D8BD] leading-relaxed">
                ١. <strong>طبيعة المشروع:</strong> هذا النظام بيئة محاكاة تدريبية لتكنولوجيا الموارد البشرية (HR Technology) لشركة «بلو برادايس» الافتراضية، ولا يمثل كياناً قانونياً مسجلاً أو منشأة سياحية قائمة.
              </p>
              <p className="text-xs text-[#354554] dark:text-[#E9D8BD] leading-relaxed">
                ٢. <strong>حظر البيانات الشخصية الحقيقية:</strong> جميع الأسماء (72 موظفاً) والرواتب والطلبات والحجوزات وهمية وموسومة بـ «تجريبي». يُحظر إدخال أسماء حقيقية أو أرقام وطنية أو صور هوية أو وثائق رسمية.
              </p>
              <p className="text-xs text-[#354554] dark:text-[#E9D8BD] leading-relaxed">
                ٣. <strong>حوكمة الوصول والصلاحيات (RBAC):</strong> تُحمى بيانات الرواتب والملفات الوظيفية بضوابط الحد الأدنى من الصلاحيات (Minimum-Privilege Access) مع توثيق كل عملية في سجل التدقيق (`audit_events`).
              </p>
            </div>
          </div>
        )}

        {/* ==================== G5. UNIFIED LOGIN & ROLE SWITCHER (صفحة تسجيل الدخول الموحدة) ==================== */}
        {activePage === 'login' && (
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="bg-white dark:bg-[#102B46] p-8 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#1E8F91] font-bold mb-1">نظام المصادقة والصلاحيات المؤسسية (11 دوراً معتمداً)</div>
              <h1 className="text-2xl font-bold mb-2">بوابة تسجيل الدخول الموحدة وتبديل الأدوار التدريبية</h1>
              <p className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-6">
                اختر الدور الوظيفي لتفعيل صلاحياته (RBAC) والانتقال المباشر إلى البوابة المخصصة له، دون كلمات مرور نصية مكشوفة:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.map((r) => {
                  const isCurrent = currentUser.role_id === r.role_id;
                  return (
                    <div
                      key={r.role_id}
                      className={`p-4 rounded-xl border flex flex-col justify-between ${
                        isCurrent
                          ? 'border-[#1E8F91] bg-[#1E8F91]/10'
                          : 'border-[#E9D8BD] dark:border-[#1E8F91]/30 bg-[#F7F5F0] dark:bg-[#0B1D30]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#1E8F91] mb-1">{r.role_name_en}</div>
                        <h3 className="text-sm font-bold mb-1">{r.role_name_ar}</h3>
                        <p className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-3">{r.scope}</p>
                      </div>
                      <button
                        onClick={() => {
                          switchUserByRole(r.role_id);
                          if (r.role_id === 'employee') onNavigatePortal('employee');
                          else if (r.role_id === 'line_manager') onNavigatePortal('manager');
                          else if (r.role_id === 'recruiter') onNavigatePortal('ats');
                          else if (r.role_id === 'hr_admin') onNavigatePortal('hr');
                          else if (r.role_id === 'visitor' || r.role_id === 'applicant') setActivePage('home');
                          else onNavigatePortal('admin');
                        }}
                        className="w-full py-2 bg-[#102B46] dark:bg-[#1E8F91] hover:bg-[#1E8F91] text-white text-xs font-bold rounded-lg"
                      >
                        {isCurrent ? 'الدور النشط حالياً — فتح البوابة' : 'دخول بهذا الدور'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Service Detail Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#102B46] rounded-2xl max-w-lg w-full p-6 border border-[#E9D8BD]">
            <div className="text-xs text-[#1E8F91] font-bold mb-1">
              {selectedServiceModal.service_id} · {selectedServiceModal.category}
            </div>
            <h3 className="text-xl font-bold mb-2">{selectedServiceModal.name}</h3>
            <p className="text-xs text-[#354554] dark:text-[#E9D8BD] leading-relaxed mb-4">
              {selectedServiceModal.description}
            </p>
            <div className="space-y-1.5 mb-5">
              {selectedServiceModal.features.map((f, idx) => (
                <div key={idx} className="text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E8F91]" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-[#E9D8BD]">
              <span className="font-bold text-base tabular-nums">{selectedServiceModal.base_price_jod} JOD</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedServiceModal(null)}
                  className="px-4 py-2 border border-[#354554] rounded-lg text-xs font-bold"
                >
                  إغلاق
                </button>
                <button
                  onClick={() => {
                    setBookingServiceId(selectedServiceModal.service_id);
                    setSelectedServiceModal(null);
                    setActivePage('booking');
                  }}
                  className="px-4 py-2 bg-[#1E8F91] text-white rounded-lg text-xs font-bold"
                >
                  انتقل للحجز التجريبي
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiet Institutional Footer */}
      <footer className="bg-[#102B46] text-[#F7F5F0] py-10 px-6 border-t border-[#1E8F91]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          <div className="md:col-span-2 space-y-2">
            <BrandLogo variant="light" />
            <p className="text-[#E9D8BD] leading-relaxed max-w-md mt-2">
              بلو برادايس للمنتجعات والتجارب السياحية (Blue Paradise Resorts & Experiences) — العقبة، المملكة الأردنية الهاشمية. بيئة محاكاة مؤسسية متكاملة لتكنولوجيا الموارد البشرية (HR Technology).
            </p>
          </div>
          <div className="space-y-2">
            <div className="font-bold text-[#E9D8BD]">روابط الموقع العام</div>
            <div className="flex flex-col gap-1.5 items-start text-[#F7F5F0]/80">
              <button onClick={() => setActivePage('about')} className="hover:text-white">من نحن والرؤية</button>
              <button onClick={() => setActivePage('stays')} className="hover:text-white">الإقامات والمنتجعات</button>
              <button onClick={() => setActivePage('experiences')} className="hover:text-white">التجارب السياحية</button>
              <button onClick={() => setActivePage('careers')} className="hover:text-white">الوظائف والتقديم</button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="font-bold text-[#E9D8BD]">البوابات المؤسسية</div>
            <div className="flex flex-col gap-1.5 items-start text-[#F7F5F0]/80">
              <button onClick={() => onNavigatePortal('admin')} className="hover:text-white">لوحة القيادة التنفيذية (/admin)</button>
              <button onClick={() => onNavigatePortal('hr')} className="hover:text-white">نظام الموارد البشرية (/hr)</button>
              <button onClick={() => onNavigatePortal('employee')} className="hover:text-white">بوابة الموظف (/employee)</button>
              <button onClick={() => onNavigatePortal('manager')} className="hover:text-white">بوابة مدير القسم (/manager)</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
