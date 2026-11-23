import React, { useState, useMemo } from 'react';
import { useEnterprise } from '../context/EnterpriseContext';
import {
  CareerJob,
  JobAvailabilityStatus,
  JobEmploymentType,
} from '../types/enterprise';
import {
  Briefcase,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Link2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Settings,
  ExternalLink,
  Search,
  X,
  Save,
  Sparkles,
  Building2,
  MapPin,
  Calendar,
  Layers,
  GraduationCap,
} from 'lucide-react';

export const RecruitmentManagementAdmin: React.FC<{ onPreviewVisitorPortal?: () => void }> = ({
  onPreviewVisitorPortal,
}) => {
  const {
    careerJobs,
    departments,
    positions,
    seats,
    formsConfig,
    saveCareerJob,
    deleteCareerJob,
    toggleCareerJobPublish,
    setCareerJobAvailability,
    reorderCareerJob,
    updateCareerJobApplicationUrl,
    updateFormsConfig,
    resolveApplicationUrl,
  } = useEnterprise();

  const sortedJobs = useMemo(
    () => [...careerJobs].sort((a, b) => a.sort_order - b.sort_order),
    [careerJobs]
  );

  // Admin Table Search & Filter
  const [adminSearch, setAdminSearch] = useState('');
  const [adminFilterStatus, setAdminFilterStatus] = useState<'ALL' | 'PUBLISHED' | 'UNPUBLISHED' | 'CLOSED' | 'CLOSING_SOON'>('ALL');

  // Active sub-tab in Recruitment Management
  const [activeSubTab, setActiveSubTab] = useState<'jobs_list' | 'forms_integration'>('jobs_list');

  // Add / Edit Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isNewJob, setIsNewJob] = useState(true);
  const [editorTab, setEditorTab] = useState<'form' | 'preview'>('form');
  const [formError, setFormError] = useState<string | null>(null);

  // Job Draft State for Add / Edit + Live Preview
  const [draftJob, setDraftJob] = useState<CareerJob>({
    job_id: 'JOB-010',
    title_ar: '',
    title_en: '',
    department_id: 'D02',
    department_name_ar: 'إدارة تجربة الضيف والاستقبال',
    position_id: 'P007',
    seat_id: '',
    location_ar: 'العقبة — المقر الرئيسي والمنتجع الساحلي',
    employment_type: 'دوام كامل',
    work_hours: '48 ساعة أسبوعياً (نظام مناوبات مرن)',
    published_at: '2026-11-15',
    closing_date: '2026-12-15',
    is_published: true,
    availability_status: 'متاحة',
    summary: '',
    job_purpose: '',
    key_responsibilities: [''],
    academic_qualifications: '',
    technical_skills: [''],
    behavioral_skills: [''],
    experience_required: '',
    applicationUrl: '',
    use_unified_form: true,
    sort_order: 10,
    is_trial_data: true,
  });

  // multiline text helpers for responsibilities & skills in the form
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [techSkillsText, setTechSkillsText] = useState('');
  const [behavSkillsText, setBehavSkillsText] = useState('');

  // Delete Confirmation Modal State
  const [jobToDelete, setJobToDelete] = useState<CareerJob | null>(null);

  // Quick Link Edit Modal State
  const [linkEditJob, setLinkEditJob] = useState<CareerJob | null>(null);
  const [tempAppUrl, setTempAppUrl] = useState('');
  const [tempUseUnified, setTempUseUnified] = useState(true);

  // Republish / Closing Date Modal State
  const [republishJob, setRepublishJob] = useState<CareerJob | null>(null);
  const [newClosingDateInput, setNewClosingDateInput] = useState('2026-12-25');

  // Helper to check if a job is closing soon (within 14 days from reference date 2026-11-15)
  const checkClosingSoon = (job: CareerJob) => {
    if (!job.closing_date || job.availability_status === 'مغلقة') return false;
    const refDate = new Date('2026-11-15');
    const closeDate = new Date(job.closing_date);
    const diffDays = Math.ceil((closeDate.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 14;
  };

  // 5 Required Recruitment Overview KPIs (Computed purely from actual job records)
  const kpis = useMemo(() => {
    const totalCreated = careerJobs.length;
    const publishedCount = careerJobs.filter((j) => j.is_published).length;
    const closedCount = careerJobs.filter((j) => j.availability_status === 'مغلقة').length;
    const unpublishedCount = careerJobs.filter((j) => !j.is_published).length;
    const closingSoonCount = careerJobs.filter((j) => checkClosingSoon(j)).length;

    return {
      totalCreated,
      publishedCount,
      closedCount,
      unpublishedCount,
      closingSoonCount,
    };
  }, [careerJobs]);

  const filteredAdminJobs = useMemo(() => {
    return sortedJobs.filter((job) => {
      const q = adminSearch.trim().toLowerCase();
      const matchesQ =
        !q ||
        job.title_ar.toLowerCase().includes(q) ||
        job.title_en.toLowerCase().includes(q) ||
        job.job_id.toLowerCase().includes(q) ||
        job.department_name_ar.toLowerCase().includes(q);

      if (!matchesQ) return false;

      if (adminFilterStatus === 'PUBLISHED') return job.is_published;
      if (adminFilterStatus === 'UNPUBLISHED') return !job.is_published;
      if (adminFilterStatus === 'CLOSED') return job.availability_status === 'مغلقة';
      if (adminFilterStatus === 'CLOSING_SOON') return checkClosingSoon(job);
      return true;
    });
  }, [sortedJobs, adminSearch, adminFilterStatus]);

  // Open Modal to Add New Job
  const handleOpenAddJob = () => {
    const nextNum = careerJobs.length + 1;
    const nextId = `JOB-${String(nextNum).padStart(3, '0')}`;
    const defaultDept = departments[1] || departments[0];
    const freshJob: CareerJob = {
      job_id: nextId,
      title_ar: '',
      title_en: '',
      department_id: defaultDept.department_id,
      department_name_ar: defaultDept.name_ar,
      position_id: '',
      seat_id: '',
      location_ar: 'العقبة — المقر الرئيسي والمنتجع الساحلي',
      employment_type: 'دوام كامل',
      work_hours: '48 ساعة أسبوعياً (8 ساعات يومياً)',
      published_at: new Date().toISOString().slice(0, 10),
      closing_date: '2026-12-20',
      is_published: true,
      availability_status: 'متاحة',
      summary: '',
      job_purpose: '',
      key_responsibilities: [
        'تنفيذ المهام التشغيلية اليومية وفق معايير الجودة والضيافة المعتمدة في بلو برادايس.',
        'التنسيق الفعال مع فرق العمل ذات العلاقة لضمان سرعة ودقة الإنجاز.',
      ],
      academic_qualifications: 'درجة البكالوريوس أو الدبلوم في التخصص ذي الصلة.',
      technical_skills: ['إجادة استخدام الأنظمة الرقمية الحديثة', 'اللغة العربية والإنجليزية'],
      behavioral_skills: ['العمل بروح الفريق', 'مهارات التواصل الفعال واللباقة'],
      experience_required: 'خبرة عملية من سنة إلى 3 سنوات في مجال مشابه.',
      applicationUrl: '',
      use_unified_form: true,
      sort_order: nextNum,
      is_trial_data: true,
    };
    setDraftJob(freshJob);
    setResponsibilitiesText(freshJob.key_responsibilities.join('\n'));
    setTechSkillsText(freshJob.technical_skills.join('\n'));
    setBehavSkillsText(freshJob.behavioral_skills.join('\n'));
    setIsNewJob(true);
    setEditorTab('form');
    setFormError(null);
    setIsEditorOpen(true);
  };

  // Open Modal to Edit Existing Job
  const handleOpenEditJob = (job: CareerJob) => {
    setDraftJob({ ...job });
    setResponsibilitiesText(job.key_responsibilities.join('\n'));
    setTechSkillsText(job.technical_skills.join('\n'));
    setBehavSkillsText(job.behavioral_skills.join('\n'));
    setIsNewJob(false);
    setEditorTab('form');
    setFormError(null);
    setIsEditorOpen(true);
  };

  // Keep draftJob arrays synced when switching to Preview tab or saving
  const syncTextListsToDraft = (): CareerJob => {
    const respList = responsibilitiesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const techList = techSkillsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const behavList = behavSkillsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const deptObj = departments.find((d) => d.department_id === draftJob.department_id);

    const updated: CareerJob = {
      ...draftJob,
      department_name_ar: deptObj ? deptObj.name_ar : draftJob.department_name_ar,
      key_responsibilities: respList.length ? respList : ['تنفيذ المهام الوظيفية المعتمدة في القسم.'],
      technical_skills: techList.length ? techList : ['مهارات تخصصية مرتبطة بالوظيفة'],
      behavioral_skills: behavList.length ? behavList : ['التواصل الفعال والعمل الجماعي'],
    };
    setDraftJob(updated);
    return updated;
  };

  const handleSaveJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prepared = syncTextListsToDraft();
    if (!prepared.title_ar.trim()) {
      setFormError('يرجى إدخال المسمى الوظيفي باللغة العربية.');
      return;
    }
    if (!prepared.summary.trim() || !prepared.job_purpose.trim()) {
      setFormError('يرجى إدخال النبذة المختصرة والهدف العام من الوظيفة.');
      return;
    }
    if (prepared.closing_date && prepared.published_at && prepared.closing_date < prepared.published_at) {
      setFormError('تاريخ إغلاق التقديم لا يمكن أن يكون قبل تاريخ النشر.');
      return;
    }
    const ok = saveCareerJob(prepared, isNewJob);
    if (ok) {
      setIsEditorOpen(false);
      setFormError(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-l from-[#102B46] via-[#173b5e] to-[#236A9F] text-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#E9D8BD]/20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[#E9D8BD] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recruitment Management – إدارة التوظيف وبوابة الوظائف</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            إدارة الوظائف الشاغرة والربط مع نماذج التقديم
          </h2>
          <p className="text-xs md:text-sm text-slate-200 max-w-3xl leading-relaxed">
            تحكم كامل بجميع الوظائف المعروضة في تبويب «الوظائف الشاغرة» دون الحاجة لتعديل الكود البرمجي: إضافة وتعديل وحذف الوظائف، معاينة البطاقة قبل النشر، التحكم بحالة التوفر وتاريخ الإغلاق، وإدارة روابط Google Forms.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onPreviewVisitorPortal && (
            <button
              type="button"
              onClick={onPreviewVisitorPortal}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-[#E9D8BD]" />
              <span>معاينة تبويب الوظائف للزوار</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleOpenAddJob}
            className="px-5 py-2.5 rounded-xl bg-[#1E8F91] hover:bg-[#177577] text-white font-bold text-xs md:text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة وظيفة جديدة</span>
          </button>
        </div>
      </div>

      {/* Section 5: Recruitment Overview (لوحة مؤشرات التوظيف) — 5 Live KPI Cards */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base font-bold text-[#102B46] dark:text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#1E8F91]" />
            <span>لوحة مؤشرات التوظيف (Recruitment Overview)</span>
          </h3>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            تُحتسب هذه المؤشرات آلياً ومباشرة من سجلات الوظائف الفعلية (دون أي أعداد متقدمين افتراضية غير مربوطة)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Total Created Jobs */}
          <button
            type="button"
            onClick={() => setAdminFilterStatus('ALL')}
            className={`text-right p-4 rounded-2xl border transition cursor-pointer ${
              adminFilterStatus === 'ALL'
                ? 'bg-[#102B46] text-white border-[#102B46] shadow-md'
                : 'bg-white dark:bg-slate-900 text-[#102B46] dark:text-white border-slate-200 dark:border-slate-800 hover:border-[#1E8F91]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold ${adminFilterStatus === 'ALL' ? 'text-[#E9D8BD]' : 'text-slate-500'}`}>
                إجمالي الوظائف المنشأة
              </span>
              <Briefcase className="w-4 h-4 text-[#1E8F91]" />
            </div>
            <div className="text-2xl font-bold">{kpis.totalCreated}</div>
            <div className={`text-[11px] mt-1 ${adminFilterStatus === 'ALL' ? 'text-slate-300' : 'text-slate-400'}`}>
              جميع السجلات في النظام
            </div>
          </button>

          {/* Card 2: Published Jobs */}
          <button
            type="button"
            onClick={() => setAdminFilterStatus('PUBLISHED')}
            className={`text-right p-4 rounded-2xl border transition cursor-pointer ${
              adminFilterStatus === 'PUBLISHED'
                ? 'bg-[#1E8F91] text-white border-[#1E8F91] shadow-md'
                : 'bg-white dark:bg-slate-900 text-[#102B46] dark:text-white border-slate-200 dark:border-slate-800 hover:border-[#1E8F91]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold ${adminFilterStatus === 'PUBLISHED' ? 'text-white' : 'text-slate-500'}`}>
                عدد الوظائف المنشورة
              </span>
              <CheckCircle2 className={`w-4 h-4 ${adminFilterStatus === 'PUBLISHED' ? 'text-white' : 'text-[#1E8F91]'}`} />
            </div>
            <div className="text-2xl font-bold">{kpis.publishedCount}</div>
            <div className={`text-[11px] mt-1 ${adminFilterStatus === 'PUBLISHED' ? 'text-white/90' : 'text-slate-400'}`}>
              مرئية للزوار في بوابة التوظيف
            </div>
          </button>

          {/* Card 3: Closed Jobs */}
          <button
            type="button"
            onClick={() => setAdminFilterStatus('CLOSED')}
            className={`text-right p-4 rounded-2xl border transition cursor-pointer ${
              adminFilterStatus === 'CLOSED'
                ? 'bg-[#D97965] text-white border-[#D97965] shadow-md'
                : 'bg-white dark:bg-slate-900 text-[#102B46] dark:text-white border-slate-200 dark:border-slate-800 hover:border-[#D97965]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold ${adminFilterStatus === 'CLOSED' ? 'text-white' : 'text-slate-500'}`}>
                عدد الوظائف المغلقة
              </span>
              <Lock className={`w-4 h-4 ${adminFilterStatus === 'CLOSED' ? 'text-white' : 'text-[#D97965]'}`} />
            </div>
            <div className="text-2xl font-bold">{kpis.closedCount}</div>
            <div className={`text-[11px] mt-1 ${adminFilterStatus === 'CLOSED' ? 'text-white/90' : 'text-slate-400'}`}>
              انتهى التقديم عليها وقابلة لإعادة النشر
            </div>
          </button>

          {/* Card 4: Unpublished Jobs */}
          <button
            type="button"
            onClick={() => setAdminFilterStatus('UNPUBLISHED')}
            className={`text-right p-4 rounded-2xl border transition cursor-pointer ${
              adminFilterStatus === 'UNPUBLISHED'
                ? 'bg-[#236A9F] text-white border-[#236A9F] shadow-md'
                : 'bg-white dark:bg-slate-900 text-[#102B46] dark:text-white border-slate-200 dark:border-slate-800 hover:border-[#236A9F]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold ${adminFilterStatus === 'UNPUBLISHED' ? 'text-white' : 'text-slate-500'}`}>
                الوظائف غير المنشورة
              </span>
              <EyeOff className={`w-4 h-4 ${adminFilterStatus === 'UNPUBLISHED' ? 'text-white' : 'text-[#236A9F]'}`} />
            </div>
            <div className="text-2xl font-bold">{kpis.unpublishedCount}</div>
            <div className={`text-[11px] mt-1 ${adminFilterStatus === 'UNPUBLISHED' ? 'text-white/90' : 'text-slate-400'}`}>
              مسودات أو مخفية عن الزوار
            </div>
          </button>

          {/* Card 5: Closing Soon Jobs */}
          <button
            type="button"
            onClick={() => setAdminFilterStatus('CLOSING_SOON')}
            className={`text-right p-4 rounded-2xl border transition cursor-pointer ${
              adminFilterStatus === 'CLOSING_SOON'
                ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                : 'bg-white dark:bg-slate-900 text-[#102B46] dark:text-white border-slate-200 dark:border-slate-800 hover:border-amber-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold ${adminFilterStatus === 'CLOSING_SOON' ? 'text-white' : 'text-slate-500'}`}>
                يقترب موعد إغلاقها
              </span>
              <Clock className={`w-4 h-4 ${adminFilterStatus === 'CLOSING_SOON' ? 'text-white' : 'text-amber-500'}`} />
            </div>
            <div className="text-2xl font-bold">{kpis.closingSoonCount}</div>
            <div className={`text-[11px] mt-1 ${adminFilterStatus === 'CLOSING_SOON' ? 'text-white/90' : 'text-slate-400'}`}>
              خلال 14 يوماً القادمة
            </div>
          </button>
        </div>
      </div>

      {/* Sub-Navigation: Jobs Management vs Google Forms Integration Settings */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab('jobs_list')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
              activeSubTab === 'jobs_list'
                ? 'bg-[#102B46] text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-[#E9D8BD]" />
            <span>جدول إدارة الوظائف والتحكم بالنشر ({careerJobs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('forms_integration')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
              activeSubTab === 'forms_integration'
                ? 'bg-[#102B46] text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <Settings className="w-4 h-4 text-[#1E8F91]" />
            <span>إعدادات الربط مع Google Forms & Apps Script</span>
          </button>
        </div>

        {activeSubTab === 'jobs_list' && (
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              placeholder="بحث في الوظائف بالرمز أو المسمى أو القسم..."
              className="w-full pr-9 pl-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E8F91]"
            />
          </div>
        )}
      </div>

      {activeSubTab === 'jobs_list' ? (
        /* Jobs Management Table */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#F7F5F0] dark:bg-slate-800/90 text-[#102B46] dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3.5 px-4 font-bold">الترتيب</th>
                  <th className="py-3.5 px-4 font-bold">الرمز والمسمى الوظيفي</th>
                  <th className="py-3.5 px-4 font-bold">القسم وموقع العمل</th>
                  <th className="py-3.5 px-4 font-bold">الظهور للزوار</th>
                  <th className="py-3.5 px-4 font-bold">حالة الوظيفة</th>
                  <th className="py-3.5 px-4 font-bold">تاريخ النشر / الإغلاق</th>
                  <th className="py-3.5 px-4 font-bold">رابط Google Forms</th>
                  <th className="py-3.5 px-4 font-bold text-center">إجراءات المسؤول</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredAdminJobs.map((job, index) => {
                  const closingSoon = checkClosingSoon(job);
                  const resolved = resolveApplicationUrl(job);

                  return (
                    <tr
                      key={job.job_id}
                      className="hover:bg-[#F7F5F0]/50 dark:hover:bg-slate-800/40 transition"
                    >
                      {/* Sort Order Controls */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1">
                          <span className="w-6 text-center font-bold text-slate-500">
                            {job.sort_order}
                          </span>
                          <div className="flex flex-col gap-0.5">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => reorderCareerJob(job.job_id, 'up')}
                              title="تحريك لأعلى"
                              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={index === filteredAdminJobs.length - 1}
                              onClick={() => reorderCareerJob(job.job_id, 'down')}
                              title="تحريك لأسفل"
                              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Job ID & Title */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#102B46] text-[#E9D8BD] font-bold text-[11px]">
                            {job.job_id}
                          </span>
                          <span className="font-bold text-sm text-[#102B46] dark:text-white">
                            {job.title_ar}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5" dir="ltr">
                          {job.title_en}
                        </div>
                      </td>

                      {/* Department & Location */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-700 dark:text-slate-200">
                          {job.department_name_ar}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {job.location_ar} ({job.employment_type})
                        </div>
                      </td>

                      {/* Published vs Unpublished Toggle */}
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => toggleCareerJobPublish(job.job_id)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-[11px] inline-flex items-center gap-1.5 transition cursor-pointer border ${
                            job.is_published
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                          }`}
                        >
                          {job.is_published ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-emerald-600" />
                              <span>منشورة للزوار</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                              <span>غير منشورة (مخفية)</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Availability Status Selector */}
                      <td className="py-3.5 px-4">
                        <select
                          value={job.availability_status}
                          onChange={(e) =>
                            setCareerJobAvailability(
                              job.job_id,
                              e.target.value as JobAvailabilityStatus
                            )
                          }
                          className={`px-2.5 py-1.5 rounded-lg font-bold text-xs border focus:outline-none cursor-pointer ${
                            job.availability_status === 'متاحة'
                              ? 'bg-[#1E8F91]/10 text-[#1E8F91] border-[#1E8F91]/30'
                              : job.availability_status === 'قريباً'
                              ? 'bg-[#236A9F]/10 text-[#236A9F] border-[#236A9F]/30'
                              : 'bg-[#D97965]/10 text-[#D97965] border-[#D97965]/30'
                          }`}
                        >
                          <option value="متاحة">متاحة</option>
                          <option value="قريباً">قريباً</option>
                          <option value="مغلقة">مغلقة</option>
                        </select>
                      </td>

                      {/* Dates */}
                      <td className="py-3.5 px-4">
                        <div className="text-slate-700 dark:text-slate-300">
                          الإغلاق: <strong>{job.closing_date || '—'}</strong>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          النشر: {job.published_at}
                        </div>
                        {closingSoon && (
                          <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                            يقترب موعد الإغلاق
                          </span>
                        )}
                      </td>

                      {/* Google Forms Link Status */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              resolved.url ? 'bg-[#1E8F91]' : 'bg-[#D97965]'
                            }`}
                          />
                          <span className="text-[11px] text-slate-600 dark:text-slate-300 truncate max-w-[130px]">
                            {job.applicationUrl
                              ? 'رابط مخصص مفعل'
                              : job.use_unified_form
                              ? 'النموذج الموحد (Pre-filled)'
                              : 'غير مضاف'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setLinkEditJob(job);
                              setTempAppUrl(job.applicationUrl);
                              setTempUseUnified(job.use_unified_form);
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-[#1E8F91] hover:text-white text-slate-600 dark:text-slate-300 transition cursor-pointer"
                            title="إضافة أو تعديل رابط التقديم"
                          >
                            <Link2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Actions: Edit, Close / Republish, Delete */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditJob(job)}
                            className="px-2.5 py-1.5 rounded-lg bg-[#102B46] hover:bg-[#1b436b] text-white font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
                            title="تعديل ومعاينة البطاقة"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>تعديل</span>
                          </button>

                          {job.availability_status !== 'مغلقة' ? (
                            <button
                              type="button"
                              onClick={() => setCareerJobAvailability(job.job_id, 'مغلقة')}
                              className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
                              title="إغلاق الوظيفة"
                            >
                              <Lock className="w-3.5 h-3.5" />
                              <span>إغلاق</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setRepublishJob(job);
                                setNewClosingDateInput('2026-12-30');
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-[#1E8F91]/15 hover:bg-[#1E8F91]/25 text-[#1E8F91] border border-[#1E8F91]/30 font-bold text-[11px] flex items-center gap-1 transition cursor-pointer"
                              title="إعادة نشر الوظيفة المغلقة"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>إعادة نشر</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setJobToDelete(job)}
                            className="p-1.5 rounded-lg bg-[#D97965]/15 hover:bg-[#D97965] text-[#D97965] hover:text-white transition cursor-pointer"
                            title="حذف الوظيفة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Section 4: Google Forms & Google Apps Script Future Integration Settings */
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-[#102B46] dark:text-white flex items-center gap-2">
              <Link2 className="w-5 h-5 text-[#1E8F91]" />
              <span>إعدادات الربط مع نماذج التقديم (Google Forms & Google Apps Script)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              تتيح هذه البنية ربط كل وظيفة برابط نموذج مستقل (<code className="font-mono">applicationUrl</code>)، أو استخدام نموذج Google Form موحد يمرر اسم الوظيفة (<code className="font-mono">job_title</code>) ورقمها (<code className="font-mono">job_id</code>) والقسم (<code className="font-mono">department</code>) تلقائياً عبر رابط معبأ مسبقاً (Pre-filled URL).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-[#102B46] dark:text-white mb-1.5">
                رابط نموذج Google Forms الموحد (Unified Form Base URL)
              </label>
              <input
                type="url"
                dir="ltr"
                value={formsConfig.unified_form_base_url}
                onChange={(e) => updateFormsConfig({ unified_form_base_url: e.target.value })}
                placeholder="https://docs.google.com/forms/d/e/.../viewform"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F7F5F0]/60 dark:bg-slate-800 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102B46] dark:text-white mb-1.5">
                معامل رقم الوظيفة (Job ID Entry Parameter)
              </label>
              <input
                type="text"
                dir="ltr"
                value={formsConfig.job_id_param}
                onChange={(e) => updateFormsConfig({ job_id_param: e.target.value })}
                placeholder="entry.101001"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F7F5F0]/60 dark:bg-slate-800 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102B46] dark:text-white mb-1.5">
                معامل المسمى الوظيفي (Job Title Entry Parameter)
              </label>
              <input
                type="text"
                dir="ltr"
                value={formsConfig.job_title_param}
                onChange={(e) => updateFormsConfig({ job_title_param: e.target.value })}
                placeholder="entry.101002"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F7F5F0]/60 dark:bg-slate-800 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102B46] dark:text-white mb-1.5">
                معامل القسم الإداري (Department Entry Parameter)
              </label>
              <input
                type="text"
                dir="ltr"
                value={formsConfig.department_param}
                onChange={(e) => updateFormsConfig({ department_param: e.target.value })}
                placeholder="entry.101003"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F7F5F0]/60 dark:bg-slate-800 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102B46] dark:text-white mb-1.5">
                رابط Google Apps Script Web App (اختياري للأتمتة المستقبلية)
              </label>
              <input
                type="url"
                dir="ltr"
                value={formsConfig.apps_script_webhook_url}
                onChange={(e) => updateFormsConfig({ apps_script_webhook_url: e.target.value })}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F7F5F0]/60 dark:bg-slate-800 text-xs font-mono"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="text-xs font-bold text-[#102B46] dark:text-[#E9D8BD]">
              مثال حي للرابط المعبأ مسبقاً (Pre-filled URL Preview) لأول وظيفة:
            </div>
            {careerJobs[0] && (
              <div className="text-xs font-mono text-[#1E8F91] break-all bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700" dir="ltr">
                {resolveApplicationUrl(careerJobs[0]).prefilledUrl}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Job Modal with Live Card & Detail Preview before publishing */}
      {isEditorOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsEditorOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 my-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-[#102B46] text-white p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-[#E9D8BD] block">
                  {isNewJob ? 'إنشاء شاغر وظيفي جديد' : `تعديل بيانات الوظيفة (${draftJob.job_id})`}
                </span>
                <h3 className="text-lg md:text-xl font-bold">
                  {draftJob.title_ar || 'وظيفة جديدة في بوابة التوظيف'}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Switch between Form Editor and Live Card Preview */}
                <div className="bg-white/10 p-1 rounded-xl flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setEditorTab('form')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      editorTab === 'form' ? 'bg-[#1E8F91] text-white' : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    1. تحرير البيانات
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      syncTextListsToDraft();
                      setEditorTab('preview');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      editorTab === 'preview' ? 'bg-[#E9D8BD] text-[#102B46]' : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    2. معاينة البطاقة قبل النشر
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {editorTab === 'form' ? (
              <form onSubmit={handleSaveJobSubmit} className="p-6 space-y-5">
                {formError && (
                  <div className="p-3.5 rounded-xl bg-[#D97965]/15 border border-[#D97965] text-xs font-bold text-[#D97965] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">رمز الوظيفة (Job ID)</label>
                    <input
                      type="text"
                      readOnly={!isNewJob}
                      value={draftJob.job_id}
                      onChange={(e) => setDraftJob({ ...draftJob, job_id: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">المسمى الوظيفي (بالعربية) *</label>
                    <input
                      type="text"
                      required
                      value={draftJob.title_ar}
                      onChange={(e) => setDraftJob({ ...draftJob, title_ar: e.target.value })}
                      placeholder="مثال: موظف حجوزات سفر"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">المسمى الوظيفي (بالإنجليزية)</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={draftJob.title_en}
                      onChange={(e) => setDraftJob({ ...draftJob, title_en: e.target.value })}
                      placeholder="Travel Reservations Officer"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">القسم الإداري *</label>
                    <select
                      value={draftJob.department_id}
                      onChange={(e) => {
                        const d = departments.find((dep) => dep.department_id === e.target.value);
                        setDraftJob({
                          ...draftJob,
                          department_id: e.target.value,
                          department_name_ar: d ? d.name_ar : draftJob.department_name_ar,
                        });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    >
                      {departments.map((d) => (
                        <option key={d.department_id} value={d.department_id}>
                          {d.name_ar} ({d.department_id})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">موقع العمل *</label>
                    <input
                      type="text"
                      value={draftJob.location_ar}
                      onChange={(e) => setDraftJob({ ...draftJob, location_ar: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">نوع العقد / الدوام *</label>
                    <select
                      value={draftJob.employment_type}
                      onChange={(e) =>
                        setDraftJob({ ...draftJob, employment_type: e.target.value as JobEmploymentType })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    >
                      <option value="دوام كامل">دوام كامل</option>
                      <option value="دوام جزئي">دوام جزئي</option>
                      <option value="عقد موسمي">عقد موسمي</option>
                      <option value="عمل مرن / هجين">عمل مرن / هجين</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">ساعات العمل</label>
                    <input
                      type="text"
                      value={draftJob.work_hours}
                      onChange={(e) => setDraftJob({ ...draftJob, work_hours: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">تاريخ النشر</label>
                    <input
                      type="date"
                      value={draftJob.published_at}
                      onChange={(e) => setDraftJob({ ...draftJob, published_at: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">آخر موعد للتقديم (Closing Date)</label>
                    <input
                      type="date"
                      value={draftJob.closing_date}
                      onChange={(e) => setDraftJob({ ...draftJob, closing_date: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">حالة توفر الوظيفة</label>
                    <select
                      value={draftJob.availability_status}
                      onChange={(e) =>
                        setDraftJob({
                          ...draftJob,
                          availability_status: e.target.value as JobAvailabilityStatus,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                    >
                      <option value="متاحة">متاحة</option>
                      <option value="قريباً">قريباً</option>
                      <option value="مغلقة">مغلقة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">البطاقة الوظيفية المرتبطة (اختياري)</label>
                    <select
                      value={draftJob.position_id || ''}
                      onChange={(e) => setDraftJob({ ...draftJob, position_id: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    >
                      <option value="">— بدون ربط مباشر —</option>
                      {positions
                        .filter((p) => p.department_id === draftJob.department_id)
                        .map((p) => (
                          <option key={p.position_id} value={p.position_id}>
                            {p.title_ar} ({p.position_id})
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">المقعد الوظيفي المرتبط (اختياري)</label>
                    <select
                      value={draftJob.seat_id || ''}
                      onChange={(e) => setDraftJob({ ...draftJob, seat_id: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    >
                      <option value="">— بدون مقعد محدد —</option>
                      {seats
                        .filter((s) => s.department_id === draftJob.department_id)
                        .map((s) => (
                          <option key={s.seat_id} value={s.seat_id}>
                            {s.seat_id} ({s.seat_status})
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Summary & Job Purpose */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      نبذة مختصرة عن الوظيفة (تظهر في البطاقة الخارجية) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={draftJob.summary}
                      onChange={(e) => setDraftJob({ ...draftJob, summary: e.target.value })}
                      placeholder="ملخص جاذب ومختصر يوضح دور الوظيفة..."
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      الهدف العام من الوظيفة (Job Purpose) *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={draftJob.job_purpose}
                      onChange={(e) => setDraftJob({ ...draftJob, job_purpose: e.target.value })}
                      placeholder="الهدف الاستراتيجي والتشغيلي من هذه الوظيفة..."
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                </div>

                {/* Responsibilities & Skills */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      المهام والمسؤوليات الأساسية (كل مهمة في سطر)
                    </label>
                    <textarea
                      rows={4}
                      value={responsibilitiesText}
                      onChange={(e) => setResponsibilitiesText(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      المهارات الفنية والتقنية (كل مهارة في سطر)
                    </label>
                    <textarea
                      rows={4}
                      value={techSkillsText}
                      onChange={(e) => setTechSkillsText(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      المهارات السلوكية والشخصية (كل مهارة في سطر)
                    </label>
                    <textarea
                      rows={4}
                      value={behavSkillsText}
                      onChange={(e) => setBehavSkillsText(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                </div>

                {/* Qualifications & Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">المؤهلات العلمية المطلوبة</label>
                    <input
                      type="text"
                      value={draftJob.academic_qualifications}
                      onChange={(e) => setDraftJob({ ...draftJob, academic_qualifications: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">الخبرات العملية المطلوبة</label>
                    <input
                      type="text"
                      value={draftJob.experience_required}
                      onChange={(e) => setDraftJob({ ...draftJob, experience_required: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                  </div>
                </div>

                {/* Application URL & Publish Checkboxes */}
                <div className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">
                        رابط نموذج التقديم الخاص بالوظيفة (applicationUrl — Google Forms)
                      </label>
                      <input
                        type="url"
                        dir="ltr"
                        value={draftJob.applicationUrl}
                        onChange={(e) => setDraftJob({ ...draftJob, applicationUrl: e.target.value })}
                        placeholder="https://docs.google.com/forms/d/e/.../viewform"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs font-mono"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-2 pt-3">
                      <label className="flex items-center gap-2 text-xs font-bold text-[#102B46] dark:text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={draftJob.use_unified_form}
                          onChange={(e) => setDraftJob({ ...draftJob, use_unified_form: e.target.checked })}
                          className="rounded text-[#1E8F91]"
                        />
                        <span>تمرير رقم واسم الوظيفة تلقائياً عبر النموذج الموحد (Pre-filled URL)</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={draftJob.is_published}
                          onChange={(e) => setDraftJob({ ...draftJob, is_published: e.target.checked })}
                          className="rounded text-[#1E8F91]"
                        />
                        <span>نشر الوظيفة فوراً في تبويب «الوظائف الشاغرة» للزوار</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      syncTextListsToDraft();
                      setEditorTab('preview');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#E9D8BD]/50 hover:bg-[#E9D8BD] text-[#102B46] font-bold text-xs flex items-center gap-2 transition cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>معاينة بطاقة الوظيفة قبل النشر</span>
                  </button>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsEditorOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#1E8F91] hover:bg-[#157274] text-white font-bold text-xs flex items-center gap-2 shadow-md transition cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isNewJob ? 'حفظ ونشر الوظيفة' : 'حفظ التعديلات'}</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Live Card & Full Job Description Preview before publishing */
              <div className="p-6 md:p-8 space-y-6 bg-[#F7F5F0]/60 dark:bg-slate-950/50">
                <div className="p-4 rounded-xl bg-[#102B46] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-[#E9D8BD] font-bold">معاينة حية (Live Preview)</span>
                    <h4 className="text-sm font-bold">
                      هكذا ستظهر بطاقة الوظيفة وتفاصيلها الكاملة للزوار في تبويب «الوظائف الشاغرة»
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditorTab('form')}
                    className="px-3.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-bold cursor-pointer"
                  >
                    العودة لتحرير الحقول
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  {/* Visitor Card Preview */}
                  <div className="rounded-2xl bg-white dark:bg-slate-900 border-2 border-[#1E8F91] p-6 shadow-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-[#F7F5F0] dark:bg-slate-800 text-[#102B46] dark:text-[#E9D8BD]">
                        {draftJob.job_id}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#1E8F91]/15 text-[#1E8F91]">
                        {draftJob.availability_status}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#102B46] dark:text-white">
                        {draftJob.title_ar || 'المسمى الوظيفي'}
                      </h3>
                      <p className="text-xs text-slate-400" dir="ltr">
                        {draftJob.title_en || 'Job Title'}
                      </p>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 bg-[#F7F5F0] dark:bg-slate-800 p-3 rounded-xl">
                      <div className="flex items-center gap-2 font-bold text-[#102B46] dark:text-white">
                        <Building2 className="w-3.5 h-3.5 text-[#1E8F91]" />
                        <span>{draftJob.department_name_ar}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#236A9F]" />
                        <span>{draftJob.location_ar}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                        <span>{draftJob.employment_type}</span>
                        <span>النشر: {draftJob.published_at}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {draftJob.summary || 'النبذة المختصرة عن الوظيفة ستظهر هنا...'}
                    </p>
                  </div>

                  {/* Full Description Preview */}
                  <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                    <h4 className="text-base font-bold text-[#102B46] dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                      معاينة تفاصيل الوصف الوظيفي الكامل
                    </h4>
                    <div>
                      <div className="text-xs font-bold text-[#1E8F91] mb-1 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>الهدف من الوظيفة:</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {draftJob.job_purpose || '—'}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1E8F91] mb-1">المهام والمسؤوليات الأساسية:</div>
                      <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1">
                        {draftJob.key_responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <strong className="block text-[#102B46] dark:text-white mb-1 flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-[#236A9F]" />
                          المؤهلات العلمية:
                        </strong>
                        {draftJob.academic_qualifications}
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <strong className="block text-[#102B46] dark:text-white mb-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#1E8F91]" />
                          الخبرات المطلوبة وآخر موعد:
                        </strong>
                        {draftJob.experience_required} | الإغلاق: {draftJob.closing_date}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditorTab('form')}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold cursor-pointer"
                  >
                    تعديل البيانات
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveJobSubmit}
                    className="px-6 py-2.5 rounded-xl bg-[#1E8F91] hover:bg-[#157274] text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>اعتماد وحفظ الوظيفة الآن</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {jobToDelete && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setJobToDelete(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-[#D97965]/20 text-[#D97965] flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h4 className="text-base font-bold text-[#102B46] dark:text-white">
                تأكيد حذف الوظيفة ({jobToDelete.job_id})
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                هل أنت متأكد من رغبتك في حذف وظيفة <strong>«{jobToDelete.title_ar}»</strong>؟ يمكنك بدلاً من ذلك إخفاؤها مؤقتاً أو تغيير حالتها إلى مغلقة.
              </p>
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setJobToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteCareerJob(jobToDelete.job_id);
                  setJobToDelete(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#D97965] hover:bg-[#c56450] text-white text-xs font-bold cursor-pointer"
              >
                تأكيد الحذف النهائي
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Edit Application URL Modal */}
      {linkEditJob && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLinkEditJob(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#1E8F91]">{linkEditJob.job_id}</span>
                <h4 className="text-base font-bold text-[#102B46] dark:text-white">
                  إعداد رابط التقديم — {linkEditJob.title_ar}
                </h4>
              </div>
              <button onClick={() => setLinkEditJob(null)} className="p-1 rounded-lg hover:bg-slate-100 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">
                  رابط نموذج Google Forms الخاص بالوظيفة (applicationUrl)
                </label>
                <input
                  type="url"
                  dir="ltr"
                  value={tempAppUrl}
                  onChange={(e) => setTempAppUrl(e.target.value)}
                  placeholder="https://docs.google.com/forms/d/e/.../viewform"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F7F5F0]/60 dark:bg-slate-800 text-xs font-mono"
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-bold text-[#102B46] dark:text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={tempUseUnified}
                  onChange={(e) => setTempUseUnified(e.target.checked)}
                  className="rounded text-[#1E8F91]"
                />
                <span>تفعيل تمرير رقم واسم الوظيفة تلقائياً عبر Pre-filled URL</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setLinkEditJob(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  updateCareerJobApplicationUrl(linkEditJob.job_id, tempAppUrl, tempUseUnified);
                  setLinkEditJob(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#1E8F91] text-white text-xs font-bold cursor-pointer"
              >
                حفظ الرابط
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Republish Closed Job Modal */}
      {republishJob && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setRepublishJob(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-base font-bold text-[#102B46] dark:text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#1E8F91]" />
              <span>إعادة نشر الوظيفة المغلقة ({republishJob.job_id})</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              سيتم تحويل حالة وظيفة <strong>«{republishJob.title_ar}»</strong> إلى <strong>متاحة</strong> وإظهارها للزوار في تبويب الوظائف الشاغرة مع تحديث تاريخ الإغلاق الجديد:
            </p>
            <div>
              <label className="block text-xs font-bold mb-1">تاريخ إغلاق التقديم الجديد</label>
              <input
                type="date"
                value={newClosingDateInput}
                onChange={(e) => setNewClosingDateInput(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRepublishJob(null)}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-bold cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="button"
                onClick={() => {
                  setCareerJobAvailability(republishJob.job_id, 'متاحة', newClosingDateInput);
                  setRepublishJob(null);
                }}
                className="flex-1 py-2 rounded-xl bg-[#1E8F91] text-white text-xs font-bold cursor-pointer"
              >
                تأكيد إعادة النشر
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
