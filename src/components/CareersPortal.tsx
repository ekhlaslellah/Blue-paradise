import React, { useState, useMemo, useEffect } from 'react';
import { useEnterprise } from '../context/EnterpriseContext';
import { CareerJob, JobAvailabilityStatus } from '../types/enterprise';
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  FileText,
  ExternalLink,
  AlertCircle,
  Filter,
  RotateCcw,
  Award,
  GraduationCap,
  Layers,
  ShieldCheck,
  X,
  Copy,
  Check,
  Send,
  SlidersHorizontal,
} from 'lucide-react';

export interface CareersPortalProps {
  onOpenAdminRecruitment?: () => void;
}

export const CareersPortal: React.FC<CareersPortalProps> = ({ onOpenAdminRecruitment }) => {
  const {
    careerJobs,
    departments,
    resolveApplicationUrl,
    vacancies,
    submitApplication,
    notify,
    currentUser,
  } = useEnterprise();

  // Only show published jobs to visitors
  const publishedJobs = useMemo(
    () => [...careerJobs].filter((j) => j.is_published).sort((a, b) => a.sort_order - b.sort_order),
    [careerJobs]
  );

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [selectedLocation, setSelectedLocation] = useState<string>('ALL');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isFiltering, setIsFiltering] = useState(false);

  // Selected job for Job Description modal
  const [detailJob, setDetailJob] = useState<CareerJob | null>(null);

  // Selected job for Apply Now modal
  const [applyJob, setApplyJob] = useState<CareerJob | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Optional internal simulation quick-apply state inside the Apply modal
  const [showInternalSimForm, setShowInternalSimForm] = useState(false);
  const [candAlias, setCandAlias] = useState('');
  const [candContact, setCandContact] = useState('');
  const [candQual, setCandQual] = useState('بكالوريوس إدارة سياحة وضيافة');
  const [candExp, setCandExp] = useState(2);
  const [candConsent, setCandConsent] = useState(false);

  // Extract unique locations & employment types from published jobs
  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(publishedJobs.map((j) => j.location_ar)));
  }, [publishedJobs]);

  const uniqueEmploymentTypes = useMemo(() => {
    return Array.from(new Set(publishedJobs.map((j) => j.employment_type)));
  }, [publishedJobs]);

  // Departments that have published jobs (plus ability to filter by all departments)
  const departmentJobCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    publishedJobs.forEach((j) => {
      counts[j.department_id] = (counts[j.department_id] || 0) + 1;
    });
    return counts;
  }, [publishedJobs]);

  // Brief skeleton transition when filter parameters change
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 160);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedDepartment, selectedLocation, selectedEmploymentType, selectedStatus]);

  const filteredJobs = useMemo(() => {
    return publishedJobs.filter((job) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesKeyword =
        !q ||
        job.title_ar.toLowerCase().includes(q) ||
        job.title_en.toLowerCase().includes(q) ||
        job.summary.toLowerCase().includes(q) ||
        job.department_name_ar.toLowerCase().includes(q) ||
        job.job_id.toLowerCase().includes(q) ||
        job.technical_skills.some((s) => s.toLowerCase().includes(q));

      const matchesDept = selectedDepartment === 'ALL' || job.department_id === selectedDepartment;
      const matchesLoc = selectedLocation === 'ALL' || job.location_ar === selectedLocation;
      const matchesType = selectedEmploymentType === 'ALL' || job.employment_type === selectedEmploymentType;
      const matchesStatus = selectedStatus === 'ALL' || job.availability_status === selectedStatus;

      return matchesKeyword && matchesDept && matchesLoc && matchesType && matchesStatus;
    });
  }, [publishedJobs, searchQuery, selectedDepartment, selectedLocation, selectedEmploymentType, selectedStatus]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('ALL');
    setSelectedLocation('ALL');
    setSelectedEmploymentType('ALL');
    setSelectedStatus('ALL');
  };

  const getStatusStyle = (status: JobAvailabilityStatus) => {
    switch (status) {
      case 'متاحة':
        return {
          bg: 'bg-[#1E8F91]/12 dark:bg-[#1E8F91]/25',
          text: 'text-[#1E8F91] dark:text-[#5eead4]',
          border: 'border-[#1E8F91]/30',
          dot: 'bg-[#1E8F91]',
          label: 'متاحة للتقديم',
        };
      case 'قريباً':
        return {
          bg: 'bg-[#236A9F]/12 dark:bg-[#236A9F]/25',
          text: 'text-[#236A9F] dark:text-[#7dd3fc]',
          border: 'border-[#236A9F]/30',
          dot: 'bg-[#236A9F]',
          label: 'قريباً',
        };
      case 'مغلقة':
      default:
        return {
          bg: 'bg-[#D97965]/12 dark:bg-[#D97965]/25',
          text: 'text-[#D97965] dark:text-[#fca5a5]',
          border: 'border-[#D97965]/30',
          dot: 'bg-[#D97965]',
          label: 'مغلقة',
        };
    }
  };

  const isClosingSoon = (closingDate: string, status: JobAvailabilityStatus) => {
    if (!closingDate || status !== 'متاحة') return false;
    const today = new Date('2026-11-15');
    const close = new Date(closingDate);
    const diffDays = Math.ceil((close.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 12;
  };

  const handleApplyClick = (job: CareerJob) => {
    setApplyJob(job);
    setCopiedUrl(false);
    setShowInternalSimForm(false);
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard?.writeText(url);
    setCopiedUrl(true);
    notify('info', 'تم نسخ رابط التقديم', 'تم نسخ رابط نموذج التقديم المعبأ مسبقاً (Pre-filled URL) إلى الحافظة.');
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleInternalSimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyJob) return;
    const matchedVacancy =
      vacancies.find((v) => v.position_id === applyJob.position_id || v.department_id === applyJob.department_id) ||
      vacancies[0];

    const res = submitApplication({
      vacancy_id: matchedVacancy ? matchedVacancy.vacancy_id : 'V001',
      candidate_alias: candAlias,
      contact_test: candContact,
      qualification: candQual,
      years_experience: candExp,
      skills: applyJob.technical_skills.slice(0, 3),
      answers: [
        {
          question: `التقديم على وظيفة ${applyJob.title_ar} (${applyJob.job_id})`,
          answer: 'تم الإرسال عبر بوابة التوظيف التفاعلية (CareersPortal).',
        },
      ],
      consent_flag: candConsent,
    });
    if (res) {
      setCandAlias('');
      setCandContact('');
      setCandConsent(false);
      setShowInternalSimForm(false);
      setApplyJob(null);
    }
  };

  const canManageRecruitment = ['super_admin', 'hr_admin', 'recruiter', 'executive'].includes(currentUser.role_id);

  return (
    <div className="space-y-8">
      {/* Hero Banner for CareersPortal */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-[#102B46] via-[#163b5e] to-[#1E8F91] text-white p-8 md:p-10 shadow-xl border border-[#E9D8BD]/20">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/15 text-[#E9D8BD] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#E9D8BD]" />
              <span>بوابة التوظيف واستقطاب المواهب — Blue Paradise Careers Portal</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              الوظائف الشاغرة والفرص المهنية في بلو برادايس
            </h1>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              انضم إلى فريق الضيافة والتجارب السياحية في العقبة. نؤمن بأن كل إقامة استثنائية تبدأ من فريق عمل شغوف، مؤهل، ومدعوم ببيئة عمل عادلة ومسار تطوير وظيفي واضح.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-[#E9D8BD]">
              <span className="inline-flex items-center gap-1.5 bg-[#102B46]/60 px-3 py-1.5 rounded-md border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#1E8F91]" />
                مقابلات منظمة وعادلة (Structured Rubric 1–4)
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#102B46]/60 px-3 py-1.5 rounded-md border border-white/10">
                <Award className="w-4 h-4 text-[#E9D8BD]" />
                برنامج تهيئة منظم (30 / 60 / 90 يوماً)
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#D97965]/25 px-3 py-1.5 rounded-md border border-[#D97965]/40 text-white">
                <AlertCircle className="w-4 h-4 text-[#E9D8BD]" />
                تنويه: هذه الوظائف بيانات تجريبية قابلة للتعديل ولا تمثل شواغر فعلية مؤكدة ما لم تعتمدها الإدارة
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 text-center min-w-[210px]">
              <div className="text-3xl font-bold text-[#E9D8BD]">
                {publishedJobs.filter((j) => j.availability_status === 'متاحة').length}
              </div>
              <div className="text-xs text-slate-200 mt-1">فرصة وظيفية متاحة للتقديم الآن</div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                إجمالي الوظائف المعروضة: {publishedJobs.length} وظيفة
              </div>
            </div>
            {canManageRecruitment && onOpenAdminRecruitment && (
              <button
                onClick={onOpenAdminRecruitment}
                className="px-4 py-2.5 rounded-xl bg-[#E9D8BD] hover:bg-[#dfcba9] text-[#102B46] font-bold text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>إدارة التوظيف (Admin Panel)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search & Department / Multi-Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 md:p-6 shadow-md border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#102B46] text-[#E9D8BD] flex items-center justify-center">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#102B46] dark:text-white">
                البحث والترشيح حسب القسم وموقع العمل ونوع الدوام
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ابحث بالكلمات المفتاحية أو رشّح الفرص الوظيفية حسب القسم الإداري، موقع العمل، نوع الوظيفة، وحالة التوفر
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-[#F7F5F0] dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              النتائج المطابقة: {filteredJobs.length} من {publishedJobs.length}
            </span>
            {(searchQuery ||
              selectedDepartment !== 'ALL' ||
              selectedLocation !== 'ALL' ||
              selectedEmploymentType !== 'ALL' ||
              selectedStatus !== 'ALL') && (
              <button
                onClick={resetFilters}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#D97965] hover:bg-[#D97965]/10 border border-[#D97965]/30 flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط الفلاتر</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Department Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pb-1">
          <span className="text-xs font-bold text-[#102B46] dark:text-[#E9D8BD] ml-1 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-[#1E8F91]" />
            <span>الترشيح السريع حسب القسم:</span>
          </span>
          <button
            type="button"
            onClick={() => setSelectedDepartment('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
              selectedDepartment === 'ALL'
                ? 'bg-[#1E8F91] text-white border-[#1E8F91] shadow-sm'
                : 'bg-[#F7F5F0] dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#1E8F91]'
            }`}
          >
            جميع الأقسام ({publishedJobs.length})
          </button>
          {departments
            .filter((d) => departmentJobCounts[d.department_id] > 0)
            .map((dept) => {
              const isSelected = selectedDepartment === dept.department_id;
              return (
                <button
                  key={dept.department_id}
                  type="button"
                  onClick={() => setSelectedDepartment(dept.department_id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                    isSelected
                      ? 'bg-[#1E8F91] text-white border-[#1E8F91] shadow-sm'
                      : 'bg-[#F7F5F0] dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#1E8F91]'
                  }`}
                >
                  {dept.name_ar} ({departmentJobCounts[dept.department_id]})
                </button>
              );
            })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Keyword Search */}
          <div className="lg:col-span-2 relative">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              البحث بالكلمات المفتاحية
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="مسمى الوظيفة، المهارة، أو القسم (مثال: حجوزات، تسويق، محاسب)..."
                className="w-full pr-10 pl-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F7F5F0]/60 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E8F91]"
              />
            </div>
          </div>

          {/* Department Dropdown Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              القسم الإداري
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F7F5F0]/60 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E8F91]"
            >
              <option value="ALL">جميع الأقسام الإدارية</option>
              {departments.map((d) => (
                <option key={d.department_id} value={d.department_id}>
                  {d.name_ar}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              موقع العمل
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F7F5F0]/60 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E8F91]"
            >
              <option value="ALL">جميع مواقع العمل</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Employment Type Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              نوع الوظيفة / الدوام
            </label>
            <select
              value={selectedEmploymentType}
              onChange={(e) => setSelectedEmploymentType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F7F5F0]/60 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E8F91]"
            >
              <option value="ALL">جميع أنواع الدوام</option>
              {uniqueEmploymentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Quick Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-2">حالة الوظيفة:</span>
          {(['ALL', 'متاحة', 'قريباً', 'مغلقة'] as const).map((status) => {
            const active = selectedStatus === status;
            const count =
              status === 'ALL'
                ? publishedJobs.length
                : publishedJobs.filter((j) => j.availability_status === status).length;
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer border ${
                  active
                    ? 'bg-[#102B46] text-white border-[#102B46] shadow-sm'
                    : 'bg-[#F7F5F0] dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#1E8F91]'
                }`}
              >
                <span>{status === 'ALL' ? 'الكل' : status}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[11px] ${
                    active ? 'bg-[#1E8F91] text-white' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading Skeletons or Interactive Job Cards Grid */}
      {isFiltering ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse space-y-4"
            >
              <div className="flex justify-between">
                <div className="h-5 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="flex gap-3 pt-2">
                <div className="h-10 flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                <div className="h-10 flex-1 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        /* Empty State */
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-700 shadow-sm max-w-2xl mx-auto my-4">
          <div className="w-16 h-16 rounded-2xl bg-[#102B46]/10 dark:bg-slate-800 text-[#1E8F91] flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#102B46] dark:text-white mb-2">
            لا توجد وظائف مطابقة لمعايير البحث الحالية
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            لم نعثر على شواغر تطابق الكلمات المفتاحية أو الفلاتر المحددة. جرّب البحث بكلمات أعم أو إعادة ضبط الفلاتر لعرض كافة الفرص الوظيفية المتاحة في بلو برادايس.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-xl bg-[#1E8F91] hover:bg-[#177476] text-white font-bold text-sm inline-flex items-center gap-2 shadow-md transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>عرض جميع الوظائف المتاحة</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => {
            const st = getStatusStyle(job.availability_status);
            const closingSoon = isClosingSoon(job.closing_date, job.availability_status);
            const resolved = resolveApplicationUrl(job);

            return (
              <div
                key={job.job_id}
                onClick={() => setDetailJob(job)}
                className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#1E8F91]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                {/* Subtle Top Accent Bar & Hover Glow */}
                <div
                  className={`absolute top-0 right-0 left-0 h-1.5 transition-all duration-300 ${
                    job.availability_status === 'متاحة'
                      ? 'bg-gradient-to-l from-[#102B46] via-[#1E8F91] to-[#236A9F] group-hover:h-2'
                      : job.availability_status === 'قريباً'
                      ? 'bg-[#236A9F]'
                      : 'bg-[#D97965]'
                  }`}
                />

                <div>
                  {/* Header Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#F7F5F0] dark:bg-slate-800 text-[#102B46] dark:text-[#E9D8BD] border border-slate-200 dark:border-slate-700">
                      {job.job_id}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {closingSoon && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#D97965]/15 text-[#D97965] border border-[#D97965]/30">
                          ينتهي التقديم قريباً
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md border ${st.bg} ${st.text} ${st.border}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                        {st.label}
                      </span>
                    </div>
                  </div>

                  {/* Job Title & Bilingual Subtitle */}
                  <h3 className="text-lg font-bold text-[#102B46] dark:text-white group-hover:text-[#1E8F91] transition-colors">
                    {job.title_ar}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-3" dir="ltr">
                    {job.title_en}
                  </p>

                  {/* Meta Attributes: Department, Location, Employment Type, Publish Date */}
                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 mb-4 bg-[#F7F5F0]/70 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[#1E8F91] shrink-0" />
                      <span className="font-bold text-[#102B46] dark:text-slate-200">{job.department_name_ar}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#236A9F] shrink-0" />
                      <span className="truncate">{job.location_ar}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/70 dark:border-slate-700/60">
                      <span className="inline-flex items-center gap-1 text-[#102B46] dark:text-[#E9D8BD] font-bold">
                        <Clock className="w-3.5 h-3.5 text-[#1E8F91]" />
                        {job.employment_type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 text-[11px]">
                        <Calendar className="w-3.5 h-3.5" />
                        نُشرت: {job.published_at}
                      </span>
                    </div>
                  </div>

                  {/* Brief Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {job.summary}
                  </p>

                  {/* Skills Preview Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {job.technical_skills.slice(0, 2).map((sk, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700 truncate max-w-[220px]"
                      >
                        {sk}
                      </span>
                    ))}
                    {job.technical_skills.length > 2 && (
                      <span className="text-[11px] bg-[#E9D8BD]/30 text-[#102B46] dark:text-[#E9D8BD] px-2 py-0.5 rounded-md font-bold">
                        +{job.technical_skills.length - 2} مهارات
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Closing Date & Action Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>آخر موعد للتقديم: {job.closing_date || 'مفتوح حتى الاكتفاء'}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {resolved.url ? 'نموذج إلكتروني مفعل' : 'بانتظار ربط الرابط'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setDetailJob(job)}
                      className="flex-1 py-2.5 px-3 rounded-xl border border-[#102B46]/25 dark:border-slate-700 text-[#102B46] dark:text-white hover:bg-[#102B46] hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>عرض التفاصيل</span>
                    </button>

                    <button
                      type="button"
                      disabled={job.availability_status !== 'متاحة'}
                      onClick={() => handleApplyClick(job)}
                      className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                        job.availability_status === 'متاحة'
                          ? 'bg-[#1E8F91] hover:bg-[#167274] text-white shadow-sm hover:shadow cursor-pointer'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {job.availability_status === 'متاحة'
                          ? 'تقدّم الآن'
                          : job.availability_status === 'قريباً'
                          ? 'يُفتح قريباً'
                          : 'مغلقة'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rich Job Description Modal (تفاصيل الوظائف) */}
      {detailJob && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setDetailJob(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-gradient-to-l from-[#102B46] to-[#1a436b] text-white p-6 flex items-start justify-between gap-4 border-b border-white/10">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#E9D8BD] text-[#102B46] text-xs font-bold">
                    {detailJob.job_id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-white/15 text-white text-xs font-bold">
                    {detailJob.department_name_ar}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                      detailJob.availability_status === 'متاحة'
                        ? 'bg-[#1E8F91] text-white'
                        : detailJob.availability_status === 'قريباً'
                        ? 'bg-[#236A9F] text-white'
                        : 'bg-[#D97965] text-white'
                    }`}
                  >
                    الحالة: {detailJob.availability_status}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold">{detailJob.title_ar}</h2>
                <p className="text-xs text-[#E9D8BD]" dir="ltr">
                  {detailJob.title_en}
                </p>
              </div>

              <button
                onClick={() => setDetailJob(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Trial Data Disclaimer */}
              {detailJob.is_trial_data && (
                <div className="p-3.5 rounded-xl bg-[#E9D8BD]/35 dark:bg-amber-950/30 border border-[#E9D8BD] dark:border-amber-800/50 flex items-center gap-3 text-xs text-[#102B46] dark:text-amber-200">
                  <AlertCircle className="w-4 h-4 text-[#D97965] shrink-0" />
                  <span>
                    <strong>بطاقة وصف وظيفي تجريبية قابلة للتعديل:</strong> تم إعداد هذا الوصف الوظيفي لأغراض محاكاة التوظيف في شركة بلو برادايس السياحية، ويمكن للمسؤول تعديله بالكامل من لوحة التحكم.
                  </span>
                </div>
              )}

              {/* Quick Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 bg-[#F7F5F0] dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">القسم الإداري</div>
                  <div className="text-xs font-bold text-[#102B46] dark:text-white mt-1">
                    {detailJob.department_name_ar}
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">موقع العمل</div>
                  <div className="text-xs font-bold text-[#102B46] dark:text-white mt-1">
                    {detailJob.location_ar}
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">نوع العقد وساعات العمل</div>
                  <div className="text-xs font-bold text-[#1E8F91] mt-1">{detailJob.employment_type}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{detailJob.work_hours}</div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">تاريخ النشر وآخر موعد للتقديم</div>
                  <div className="text-xs font-bold text-[#102B46] dark:text-white mt-1">
                    الإغلاق: {detailJob.closing_date || 'مفتوح'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">تاريخ النشر: {detailJob.published_at}</div>
                </div>
              </div>

              {/* Job Purpose (الهدف من الوظيفة) */}
              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#102B46] dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#1E8F91]" />
                  <span>الهدف العام من الوظيفة (Job Purpose)</span>
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
                  {detailJob.job_purpose}
                </p>
              </div>

              {/* Key Responsibilities (المهام والمسؤوليات الأساسية) */}
              <div className="space-y-2.5">
                <h3 className="text-base font-bold text-[#102B46] dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1E8F91]" />
                  <span>المهام والمسؤوليات الأساسية (Key Responsibilities)</span>
                </h3>
                <ul className="space-y-2 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800">
                  {detailJob.key_responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-5 h-5 rounded-md bg-[#102B46] text-[#E9D8BD] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qualifications & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-2">
                  <h4 className="text-sm font-bold text-[#102B46] dark:text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-[#236A9F]" />
                    <span>المؤهلات العلمية المطلوبة</span>
                  </h4>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {detailJob.academic_qualifications}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-2">
                  <h4 className="text-sm font-bold text-[#102B46] dark:text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#1E8F91]" />
                    <span>الخبرات العملية المطلوبة</span>
                  </h4>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {detailJob.experience_required}
                  </p>
                </div>
              </div>

              {/* Technical & Behavioral Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-[#102B46] dark:text-white">
                    المهارات الفنية والتقنية (Technical Skills)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {detailJob.technical_skills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 rounded-lg bg-[#1E8F91]/10 text-[#102B46] dark:text-[#5eead4] border border-[#1E8F91]/25 font-medium"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-[#102B46] dark:text-white">
                    المهارات السلوكية والشخصية (Behavioral Skills)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {detailJob.behavioral_skills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 rounded-lg bg-[#E9D8BD]/40 text-[#102B46] dark:text-[#E9D8BD] border border-[#E9D8BD] font-medium"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer with Apply CTA */}
            <div className="sticky bottom-0 z-20 bg-[#F7F5F0] dark:bg-slate-900 p-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-xs text-slate-600 dark:text-slate-400">
                رقم المرجع الوظيفي: <strong className="text-[#102B46] dark:text-white">{detailJob.job_id}</strong>
                {detailJob.seat_id ? ` | المقعد المرتبط: ${detailJob.seat_id}` : ''}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDetailJob(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 transition cursor-pointer"
                >
                  إغلاق النافذة
                </button>
                <button
                  type="button"
                  disabled={detailJob.availability_status !== 'متاحة'}
                  onClick={() => {
                    const target = detailJob;
                    setDetailJob(null);
                    handleApplyClick(target);
                  }}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
                    detailJob.availability_status === 'متاحة'
                      ? 'bg-[#1E8F91] hover:bg-[#167274] text-white shadow-md cursor-pointer'
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {detailJob.availability_status === 'متاحة'
                      ? 'تقدّم الآن على هذه الوظيفة'
                      : `التقديم غير متاح (${detailJob.availability_status})`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Application Modal (بوابة التقديم الإلكتروني والربط مع Google Forms) */}
      {applyJob && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setApplyJob(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const resolved = resolveApplicationUrl(applyJob);
              const finalUrl = resolved.prefilledUrl || resolved.url;

              return (
                <>
                  <div className="bg-[#102B46] text-white p-6 flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-[#E9D8BD] block mb-1">
                        بوابة التقديم الإلكتروني — {applyJob.job_id}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold">{applyJob.title_ar}</h3>
                      <p className="text-xs text-slate-300 mt-0.5">{applyJob.department_name_ar}</p>
                    </div>
                    <button
                      onClick={() => setApplyJob(null)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-5">
                    {!finalUrl ? (
                      /* Safe Fallback when applicationUrl is empty and unified fallback is disabled */
                      <div className="p-6 rounded-2xl bg-[#D97965]/10 border border-[#D97965]/30 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-[#D97965]/20 text-[#D97965] flex items-center justify-center mx-auto">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-bold text-[#102B46] dark:text-white">
                          التقديم الإلكتروني غير متاح حاليًا لهذه الوظيفة
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
                          لم يتم ربط رابط نموذج التقديم الخارجي (<code className="font-mono">applicationUrl</code>) لهذه الوظيفة حتى الآن. يمكن لمسؤول التوظيف إضافة رابط Google Forms الخاص بالوظيفة أو تفعيل النموذج الموحد من قسم <strong>إدارة التوظيف (Recruitment Management)</strong>.
                        </p>
                        {canManageRecruitment && onOpenAdminRecruitment && (
                          <button
                            onClick={() => {
                              setApplyJob(null);
                              onOpenAdminRecruitment();
                            }}
                            className="mt-2 px-4 py-2 rounded-xl bg-[#102B46] text-[#E9D8BD] text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                            <span>إضافة رابط التقديم من لوحة المسؤول</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      /* Active Google Forms / External Application Link Ready */
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-[#1E8F91]/10 border border-[#1E8F91]/30 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1E8F91] flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" />
                              نموذج التقديم الإلكتروني جاهز (Google Forms / Apps Script Integration)
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-[#102B46] dark:text-[#E9D8BD] font-bold border border-slate-200 dark:border-slate-700">
                              {resolved.isUnified ? 'رابط موحد بمعاملات معبأة مسبقاً' : 'رابط نموذج مخصص للوظيفة'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            عند النقر على زر الانتقال إلى نموذج التقديم، سيُفتح نموذج التقديم في تبويب جديد مع تمرير بيانات الوظيفة تلقائياً (<code className="font-mono">{applyJob.job_id}</code> — {applyJob.title_ar}).
                          </p>
                        </div>

                        {/* Pre-filled URL Preview & Copy Box */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">
                            رابط التقديم الفعلي (Application URL):
                          </label>
                          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                            <input
                              type="text"
                              readOnly
                              value={finalUrl}
                              dir="ltr"
                              className="w-full bg-transparent text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleCopyLink(finalUrl)}
                              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 text-xs font-bold text-[#102B46] dark:text-white border border-slate-200 dark:border-slate-600 flex items-center gap-1 shrink-0 cursor-pointer hover:border-[#1E8F91]"
                            >
                              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedUrl ? 'تم النسخ' : 'نسخ'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Primary External Link CTA (opens in new tab) */}
                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                          <a
                            href={finalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              notify(
                                'info',
                                'فتح نموذج التقديم الخارجي',
                                `جاري فتح نموذج التقديم لوظيفة "${applyJob.title_ar}" في تبويب جديد.`
                              );
                            }}
                            className="flex-1 py-3 px-5 rounded-xl bg-[#1E8F91] hover:bg-[#167274] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition"
                          >
                            <span>الانتقال إلى نموذج التقديم (تبويب جديد)</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <button
                            type="button"
                            onClick={() => setShowInternalSimForm((prev) => !prev)}
                            className="py-3 px-4 rounded-xl border border-[#102B46]/30 dark:border-slate-700 text-xs font-bold text-[#102B46] dark:text-[#E9D8BD] hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                          >
                            {showInternalSimForm ? 'إخفاء محاكاة ATS الداخلي' : 'تجربة إرسال مباشر لنظام ATS'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Optional Internal ATS Simulation Form for end-to-end testing */}
                    {showInternalSimForm && (
                      <form
                        onSubmit={handleInternalSimSubmit}
                        className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3"
                      >
                        <div className="text-xs font-bold text-[#102B46] dark:text-white">
                          محاكاة سريعة: إرسال طلب تجريبي مباشرة إلى جدول المتقدمين (ATS) الداخلي
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold mb-1">الاسم المستعار للمرشح *</label>
                            <input
                              type="text"
                              required
                              value={candAlias}
                              onChange={(e) => setCandAlias(e.target.value)}
                              placeholder="مثال: ريم العقبة (مرشح تجريبي)"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold mb-1">البريد الاختباري *</label>
                            <input
                              type="text"
                              required
                              value={candContact}
                              onChange={(e) => setCandContact(e.target.value)}
                              placeholder="candidate@sim.jo"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold mb-1">المؤهل العلمي</label>
                            <input
                              type="text"
                              value={candQual}
                              onChange={(e) => setCandQual(e.target.value)}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold mb-1">سنوات الخبرة</label>
                            <input
                              type="number"
                              min={0}
                              max={25}
                              value={candExp}
                              onChange={(e) => setCandExp(Number(e.target.value))}
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                        </div>
                        <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={candConsent}
                            onChange={(e) => setCandConsent(e.target.checked)}
                            className="rounded text-[#1E8F91]"
                          />
                          <span>أقر بأن جميع البيانات المدخلة وهمية لأغراض التدريب والمحاكاة فقط.</span>
                        </label>
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-lg bg-[#102B46] hover:bg-[#1a436b] text-white text-xs font-bold cursor-pointer"
                        >
                          إرسال الطلب التجريبي إلى نظام ATS الداخلي
                        </button>
                      </form>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareersPortal;
