import React, { useState } from 'react';
import { useEnterprise } from '../context/EnterpriseContext';
import { Employee } from '../types/enterprise';
import { RecruitmentManagementAdmin } from './RecruitmentManagementAdmin';
import {
  Users,
  Building2,
  Briefcase,
  Calendar,
  Clock,
  ShieldAlert,
  FileEdit,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Lock,
  Layers,
  TrendingUp,
} from 'lucide-react';

export type AdminSubTab =
  | 'exec_dashboard'
  | 'recruitment_manage'
  | 'org_manage'
  | 'cms_manage'
  | 'hr_employees'
  | 'hr_org_chart'
  | 'hr_workforce'
  | 'hr_attendance'
  | 'hr_leaves'
  | 'hr_payroll';

interface AdminAndHRISPortalProps {
  activeSubTab: AdminSubTab;
  setActiveSubTab: (tab: AdminSubTab) => void;
  onPreviewVisitorCareers?: () => void;
}

export const AdminAndHRISPortal: React.FC<AdminAndHRISPortalProps> = ({
  activeSubTab,
  setActiveSubTab,
  onPreviewVisitorCareers,
}) => {
  const {
    cms,
    locations,
    departments,
    positions,
    seats,
    employees,
    roles,
    vacancies,
    applications,
    attendance,
    leaves,
    enrollments,
    reviews,
    payroll,
    services,
    bookings,
    tickets,
    currentUser,
    updateCMS,
    updateService,
    createEmployee,
    updateEmployeeStatus,
    decideLeaveRequest,
    approveAttendanceCorrection,
    updatePayrollStatus,
    checkAccessAndAudit,
  } = useEnterprise();

  // Employee Directory Filters & Add Employee Modal
  const [empSearch, setEmpSearch] = useState<string>('');
  const [empDeptFilter, setEmpDeptFilter] = useState<string>('ALL');
  const [empStatusFilter, setEmpStatusFilter] = useState<string>('ALL');
  const [selectedEmployeeProfile, setSelectedEmployeeProfile] = useState<Employee | null>(null);
  const [showAddEmpModal, setShowAddEmpModal] = useState<boolean>(false);
  const [newEmpName, setNewEmpName] = useState<string>('');
  const [newEmpSeatId, setNewEmpSeatId] = useState<string>('');
  const [newEmpSalary, setNewEmpSalary] = useState<number>(600);
  const [newEmpEmail, setNewEmpEmail] = useState<string>('');

  // Org Chart Selected Department
  const [selectedOrgDept, setSelectedOrgDept] = useState<string>('D02');

  // CMS Local Form
  const [cmsTitleAr, setCmsTitleAr] = useState<string>(cms.hero_title_ar);
  const [cmsSloganAr, setCmsSloganAr] = useState<string>(cms.slogan_ar);
  const [cmsSubtitleAr, setCmsSubtitleAr] = useState<string>(cms.hero_subtitle_ar);

  // Dynamically computed KPIs from relational tables
  const activeEmployeesCount = employees.filter((e) => e.employment_status !== 'Inactive').length;
  const plannedSeatsCount = seats.length; // 96
  const vacantSeatsCount = seats.filter((s) => s.seat_status === 'Vacant').length; // 24
  const openVacanciesCount = vacancies.filter((v) => v.status === 'Published' || v.status === 'PendingApproval').length;
  const pendingLeavesCount = leaves.filter((l) => l.status === 'PendingManager' || l.status === 'PendingHR').length;
  const activeTrainingsCount = enrollments.filter((e) => e.completion_status === 'InProgress' || e.completion_status === 'Completed').length;
  const openTicketsCount = tickets.filter((t) => t.status !== 'مغلقة').length;
  const totalWorkforceMonthlyJod = employees
    .filter((e) => e.employment_status !== 'Inactive')
    .reduce((sum, e) => sum + e.base_salary_jod, 0);

  const canViewPayroll = ['super_admin', 'hr_admin', 'finance'].includes(currentUser.role_id);

  const handleAddEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = createEmployee({
      display_name_alias: newEmpName,
      seat_id: newEmpSeatId,
      hire_date: new Date().toISOString().slice(0, 10),
      base_salary_jod: newEmpSalary,
      work_email_test: newEmpEmail,
    });
    if (ok) {
      setShowAddEmpModal(false);
      setNewEmpName('');
      setNewEmpEmail('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation Bar for Admin & HRIS */}
      <div className="bg-white dark:bg-[#102B46] p-2 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 flex flex-wrap gap-1.5">
        {[
          { id: 'exec_dashboard', label: '7.1 لوحة القيادة التنفيذية' },
          { id: 'recruitment_manage', label: 'Recruitment Management – إدارة التوظيف' },
          { id: 'org_manage', label: '7.2 إدارة المؤسسة والصلاحيات' },
          { id: 'cms_manage', label: '7.3 إدارة المحتوى والخدمات (CMS)' },
          { id: 'hr_employees', label: '8.A إدارة الموظفين (72)' },
          { id: 'hr_org_chart', label: '8.B الهيكل التنظيمي (39 مسمى)' },
          { id: 'hr_workforce', label: '8.C تخطيط القوى العاملة (96 مقعداً)' },
          { id: 'hr_attendance', label: '8.D الحضور والورديات' },
          { id: 'hr_leaves', label: '8.E إدارة الإجازات' },
          { id: 'hr_payroll', label: '8.F محاكاة الرواتب (محمية RBAC)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === 'hr_payroll' && !checkAccessAndAudit('وحدة الرواتب والأجور السرية', ['super_admin', 'hr_admin', 'finance'])) {
                return;
              }
              setActiveSubTab(tab.id as AdminSubTab);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
              activeSubTab === tab.id
                ? 'bg-[#102B46] dark:bg-[#1E8F91] text-white'
                : 'text-[#354554] dark:text-[#E9D8BD] hover:bg-[#F7F5F0] dark:hover:bg-[#0B1D30]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==================== RECRUITMENT MANAGEMENT – إدارة التوظيف ==================== */}
      {activeSubTab === 'recruitment_manage' && (
        <RecruitmentManagementAdmin onPreviewVisitorPortal={onPreviewVisitorCareers} />
      )}

      {/* ==================== 7.1 EXECUTIVE DASHBOARD ==================== */}
      {activeSubTab === 'exec_dashboard' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold">لوحة القيادة التنفيذية — بلو برادايس</h1>
              <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
                تُحسب جميع المؤشرات العشرة أدناه لحظياً من الجداول الـ 22 المترابطة في قاعدة البيانات.
              </p>
            </div>
            <div className="text-xs text-[#1E8F91] font-bold tabular-nums">
              تاريخ النظام: 2026-11-15 · المقر الافتراضي: العقبة، الأردن
            </div>
          </div>

          {/* 10 Live Calculated Executive Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white dark:bg-[#102B46] p-4 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">إجمالي الموظفين الفعليين</div>
              <div className="text-2xl font-bold text-[#1E8F91] tabular-nums mt-1">{activeEmployeesCount}</div>
              <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] mt-1">مسندون لمقاعد وظيفية نشطة</div>
            </div>
            <div className="bg-white dark:bg-[#102B46] p-4 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">المقاعد الوظيفية المخططة</div>
              <div className="text-2xl font-bold tabular-nums mt-1">{plannedSeatsCount}</div>
              <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] mt-1">موزعة على 10 إدارات و39 مسمى</div>
            </div>
            <div className="bg-white dark:bg-[#102B46] p-4 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">المقاعد الشاغرة</div>
              <div className="text-2xl font-bold text-[#D97965] tabular-nums mt-1">{vacantSeatsCount}</div>
              <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] mt-1">
                نسبة الشغور: {Math.round((vacantSeatsCount / plannedSeatsCount) * 100)}%
              </div>
            </div>
            <div className="bg-white dark:bg-[#102B46] p-4 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">الوظائف المفتوحة</div>
              <div className="text-2xl font-bold text-[#236A9F] dark:text-[#E9D8BD] tabular-nums mt-1">{openVacanciesCount}</div>
              <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] mt-1">مرتبطة بمقاعد شاغرة</div>
            </div>
            <div className="bg-white dark:bg-[#102B46] p-4 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">طلبات التوظيف (ATS)</div>
              <div className="text-2xl font-bold tabular-nums mt-1">{applications.length}</div>
              <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] mt-1">في مسار الفرز والمقابلات</div>
            </div>
            <div className="bg-white dark:bg-[#102B46] p-4 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">الإجازات المعلقة</div>
              <div className="text-2xl font-bold text-[#D97965] tabular-nums mt-1">{pendingLeavesCount}</div>
              <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] mt-1">بانتظار اعتماد المدير أو HR</div>
            </div>
            <div className="bg-white dark:bg-[#102B46] p-4 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">التدريبات النشطة والمكتملة</div>
              <div className="text-2xl font-bold text-[#1E8F91] tabular-nums mt-1">{activeTrainingsCount}</div>
              <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] mt-1">ضمن 5 برامج تدريبية معتمدة</div>
            </div>
            <div className="bg-white dark:bg-[#102B46] p-4 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">تقييمات الأداء المعتمدة</div>
              <div className="text-2xl font-bold tabular-nums mt-1">{reviews.length}</div>
              <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] mt-1">دورة الربع الرابع 2026</div>
            </div>
            <div className="bg-white dark:bg-[#102B46] p-4 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">الحجوزات التجريبية</div>
              <div className="text-2xl font-bold text-[#1E8F91] tabular-nums mt-1">{bookings.length}</div>
              <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] mt-1">
                الإيراد التجريبي: {bookings.reduce((s, b) => s + b.amount_jod, 0)} JOD
              </div>
            </div>
            <div className="bg-white dark:bg-[#102B46] p-4 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">التنبيهات والتذاكر الإدارية</div>
              <div className="text-2xl font-bold text-[#D97965] tabular-nums mt-1">{openTicketsCount + pendingLeavesCount}</div>
              <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] mt-1">تذاكر تشغيلية وطلبات معلقة</div>
            </div>
          </div>

          {/* Interactive Department Seat Occupancy Chart & Action Center */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
              <h2 className="text-base font-bold mb-4">
                مخطط إشغال المقاعد الوظيفية حسب الإدارات العشر (D01 – D10 | إجمالي 96 مقعداً)
              </h2>
              <div className="space-y-3">
                {departments.map((dept) => {
                  const deptSeats = seats.filter((s) => s.department_id === dept.department_id);
                  const occ = deptSeats.filter((s) => s.seat_status === 'Occupied').length;
                  const vac = deptSeats.filter((s) => s.seat_status === 'Vacant').length;
                  const pct = Math.round((occ / Math.max(1, dept.planned_seats)) * 100);
                  return (
                    <div key={dept.department_id} className="text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">
                          {dept.department_id} — {dept.name_ar}
                        </span>
                        <span className="tabular-nums text-[#354554] dark:text-[#E9D8BD]">
                          مشغول: <b>{occ}</b> · شاغر: <b className="text-[#D97965]">{vac}</b> / المخطط: <b>{dept.planned_seats}</b> ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-full overflow-hidden flex">
                        <div className="bg-[#1E8F91] h-full" style={{ width: `${pct}%` }} />
                        <div className="bg-[#D97965]/70 h-full" style={{ width: `${100 - pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold mb-3">مركز الإجراءات والتنبيهات الفورية</h2>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/20">
                    <div className="font-bold text-[#102B46] dark:text-white">طلبات الإجازة بانتظار البت ({pendingLeavesCount})</div>
                    <p className="text-[#354554] dark:text-[#E9D8BD] mt-1">
                      توجد طلبات إجازة تحتاج مراجعة المدير أو شؤون الموظفين لتحديث الرصيد.
                    </p>
                    <button
                      onClick={() => setActiveSubTab('hr_leaves')}
                      className="mt-2 text-[#1E8F91] font-bold hover:underline"
                    >
                      الانتقال لإدارة الإجازات ←
                    </button>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/20">
                    <div className="font-bold text-[#102B46] dark:text-white">
                      مرشحون في مرحلة العرض الوظيفي ({applications.filter((a) => a.stage === 'Offer').length})
                    </div>
                    <p className="text-[#354554] dark:text-[#E9D8BD] mt-1">
                      جاهزون للتحويل إلى سجل موظف مرتبط بمقعد شاغر.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/20">
                    <div className="font-bold text-[#102B46] dark:text-white">
                      تصحيحات الحضور المعلقة ({attendance.filter((a) => a.status === 'CorrectionPending').length})
                    </div>
                    <button
                      onClick={() => setActiveSubTab('hr_attendance')}
                      className="mt-1 text-[#1E8F91] font-bold hover:underline"
                    >
                      مراجعة سجلات الحضور ←
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-[#E9D8BD] dark:border-[#1E8F91]/20 text-xs">
                <div className="text-[#354554] dark:text-[#E9D8BD]">إجمالي كتلة الرواتب الشهرية الافتراضية</div>
                <div className="text-lg font-bold tabular-nums mt-0.5">{totalWorkforceMonthlyJod.toLocaleString()} JOD / شهر</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 7.2 ORGANIZATION MANAGEMENT ==================== */}
      {activeSubTab === 'org_manage' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
            <h2 className="text-xl font-bold mb-2">بيانات المؤسسة والفروع الافتراضية</h2>
            <p className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-4">
              الاسم المعتمد: <b>بلو برادايس للمنتجعات والتجارب السياحية | Blue Paradise Resorts & Experiences</b> — الطبيعة القانونية: افتراضية بالكامل لأغراض المحاكاة التدريبية.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {locations.map((loc) => (
                <div
                  key={loc.location_id}
                  className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/20 text-xs"
                >
                  <div className="font-bold text-[#1E8F91] mb-1">
                    {loc.location_id} · {loc.type}
                  </div>
                  <div className="font-bold text-sm mb-1">{loc.name}</div>
                  <div className="text-[#354554] dark:text-[#E9D8BD]">
                    {loc.city} — {loc.state} | السعة التقديرية: <b className="tabular-nums">{loc.capacity}</b>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
            <h2 className="text-lg font-bold mb-3">مصفوفة الأدوار والصلاحيات المعتمدة (11 دوراً — RBAC)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#102B46] text-white">
                  <tr>
                    <th className="p-3">معرف الدور</th>
                    <th className="p-3">المسمى بالعربية والإنجليزية</th>
                    <th className="p-3">نطاق الوصول (Scope)</th>
                    <th className="p-3">الأذونات الممنوحة</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((r) => (
                    <tr key={r.role_id} className="border-b border-[#E9D8BD] dark:border-[#1E8F91]/20">
                      <td className="p-3 font-bold tabular-nums text-[#1E8F91]">{r.role_id}</td>
                      <td className="p-3 font-bold">
                        {r.role_name_ar} ({r.role_name_en})
                      </td>
                      <td className="p-3 text-[#354554] dark:text-[#E9D8BD]">{r.scope}</td>
                      <td className="p-3 tabular-nums">{r.permissions.join(' · ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 7.3 CMS MANAGEMENT ==================== */}
      {activeSubTab === 'cms_manage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
            <h2 className="text-lg font-bold">تعديل نصوص وهوية الموقع العام (CMS)</h2>
            <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
              أي تعديل تحفظه هنا يظهر فوراً في الصفحة الرئيسية للموقع العام دون تعديل الكود البرمجي.
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">العنوان الرئيسي (Hero Title)</label>
                <input
                  value={cmsTitleAr}
                  onChange={(e) => setCmsTitleAr(e.target.value)}
                  className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">الشعار اللفظي (Slogan)</label>
                <input
                  value={cmsSloganAr}
                  onChange={(e) => setCmsSloganAr(e.target.value)}
                  className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">الوصف التعريفي في الصفحة الرئيسية</label>
                <textarea
                  rows={3}
                  value={cmsSubtitleAr}
                  onChange={(e) => setCmsSubtitleAr(e.target.value)}
                  className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">نمط الشعار المعتمد في الرأسية</label>
                <select
                  value={cms.logo_mode}
                  onChange={(e) => updateCMS({ logo_mode: e.target.value as 'geometric_bp' | 'attached_image' })}
                  className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                >
                  <option value="geometric_bp">الشعار الهندسي المعتمد BP (أفق البحر وقوس الشمس بدون طائرة — وثيقة 02)</option>
                  <option value="attached_image">صورة الشعار المرفقة (مع رمز الطائرة)</option>
                </select>
              </div>
              <button
                onClick={() =>
                  updateCMS({
                    hero_title_ar: cmsTitleAr,
                    slogan_ar: cmsSloganAr,
                    hero_subtitle_ar: cmsSubtitleAr,
                  })
                }
                className="px-5 py-2.5 bg-[#1E8F91] hover:bg-[#236A9F] text-white font-bold rounded-lg"
              >
                حفظ وتحديث الموقع العام فوراً
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
            <h2 className="text-lg font-bold">إدارة أسعار ونشر الخدمات والإقامات التجريبية</h2>
            <div className="space-y-3 text-xs">
              {services.map((srv) => (
                <div
                  key={srv.service_id}
                  className="p-3.5 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/20 flex flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-bold">
                      {srv.service_id} — {srv.name}
                    </div>
                    <div className="text-[#354554] dark:text-[#E9D8BD]">{srv.category}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[11px]">السعر (JOD):</label>
                    <input
                      type="number"
                      min={10}
                      max={2000}
                      value={srv.base_price_jod}
                      onChange={(e) => updateService(srv.service_id, { base_price_jod: Number(e.target.value) })}
                      className="w-20 border border-[#E9D8BD] rounded px-2 py-1 text-center font-bold tabular-nums bg-white dark:bg-[#102B46]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== 8.A EMPLOYEE MANAGEMENT ==================== */}
      {activeSubTab === 'hr_employees' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#102B46] p-5 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 flex flex-wrap items-end justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
              <div>
                <label className="block text-xs font-bold mb-1">بحث بالاسم المستعار أو الرقم الوظيفي أو المقعد</label>
                <input
                  value={empSearch}
                  onChange={(e) => setEmpSearch(e.target.value)}
                  placeholder="E001, S001, طارق..."
                  className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 text-xs bg-[#F7F5F0] dark:bg-[#0B1D30]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">تصفية حسب القسم</label>
                <select
                  value={empDeptFilter}
                  onChange={(e) => setEmpDeptFilter(e.target.value)}
                  className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 text-xs bg-[#F7F5F0] dark:bg-[#0B1D30]"
                >
                  <option value="ALL">جميع الإدارات ({employees.length})</option>
                  {departments.map((d) => (
                    <option key={d.department_id} value={d.department_id}>
                      {d.department_id} — {d.name_ar}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">الحالة الوظيفية</label>
                <select
                  value={empStatusFilter}
                  onChange={(e) => setEmpStatusFilter(e.target.value)}
                  className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 text-xs bg-[#F7F5F0] dark:bg-[#0B1D30]"
                >
                  <option value="ALL">جميع الحالات</option>
                  <option value="Active">نشط (Active)</option>
                  <option value="Probation">تحت التجربة (Probation)</option>
                  <option value="OnLeave">في إجازة (OnLeave)</option>
                  <option value="Inactive">غير نشط (Inactive)</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                const firstVacant = seats.find((s) => s.seat_status === 'Vacant');
                if (firstVacant) setNewEmpSeatId(firstVacant.seat_id);
                setShowAddEmpModal(true);
              }}
              className="px-4 py-2.5 bg-[#1E8F91] hover:bg-[#236A9F] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة موظف تجريبي</span>
            </button>
          </div>

          <div className="bg-white dark:bg-[#102B46] rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#102B46] text-white">
                <tr>
                  <th className="p-3">الرقم الوظيفي</th>
                  <th className="p-3">الاسم المستعار</th>
                  <th className="p-3">المقعد (Seat)</th>
                  <th className="p-3">القسم</th>
                  <th className="p-3">المسمى الوظيفي</th>
                  <th className="p-3">المدير المباشر</th>
                  <th className="p-3">تاريخ التعيين</th>
                  <th className="p-3">الحالة</th>
                  <th className="p-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter((e) => (empDeptFilter === 'ALL' ? true : e.department_id === empDeptFilter))
                  .filter((e) => (empStatusFilter === 'ALL' ? true : e.employment_status === empStatusFilter))
                  .filter((e) => {
                    if (!empSearch.trim()) return true;
                    const q = empSearch.toLowerCase();
                    return (
                      e.employee_id.toLowerCase().includes(q) ||
                      e.seat_id.toLowerCase().includes(q) ||
                      e.display_name_alias.toLowerCase().includes(q)
                    );
                  })
                  .map((emp) => {
                    const pos = positions.find((p) => p.position_id === emp.position_id);
                    const dept = departments.find((d) => d.department_id === emp.department_id);
                    const mgr = employees.find((m) => m.employee_id === emp.manager_employee_id);
                    return (
                      <tr
                        key={emp.employee_id}
                        className="border-b border-[#E9D8BD] dark:border-[#1E8F91]/20 hover:bg-[#F7F5F0]/60 dark:hover:bg-[#0B1D30]/50"
                      >
                        <td className="p-3 font-bold tabular-nums text-[#1E8F91]">{emp.employee_id}</td>
                        <td className="p-3 font-bold">{emp.display_name_alias}</td>
                        <td className="p-3 tabular-nums font-bold">{emp.seat_id}</td>
                        <td className="p-3">
                          {emp.department_id} — {dept?.name_ar}
                        </td>
                        <td className="p-3">
                          {emp.position_id} — {pos?.title_ar}
                        </td>
                        <td className="p-3">{mgr ? `${mgr.display_name_alias} (${mgr.employee_id})` : 'مجلس الإدارة الافتراضي'}</td>
                        <td className="p-3 tabular-nums">{emp.hire_date}</td>
                        <td className="p-3">
                          <select
                            value={emp.employment_status}
                            onChange={(e) =>
                              updateEmployeeStatus(emp.employee_id, e.target.value as Employee['employment_status'])
                            }
                            className="border border-[#E9D8BD] rounded px-2 py-1 text-[11px] bg-[#F7F5F0] dark:bg-[#0B1D30]"
                          >
                            <option value="Active">Active</option>
                            <option value="Probation">Probation</option>
                            <option value="OnLeave">OnLeave</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => setSelectedEmployeeProfile(emp)}
                            className="px-2.5 py-1 bg-[#102B46] dark:bg-[#1E8F91] text-white rounded text-[11px] font-bold"
                          >
                            عرض الملف
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Add Employee Modal with Referential Seat Integrity Check */}
          {showAddEmpModal && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#102B46] rounded-2xl max-w-md w-full p-6 border border-[#E9D8BD]">
                <h3 className="text-lg font-bold mb-1">إضافة موظف تجريبي جديد</h3>
                <p className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-4">
                  يتحقق النظام من عدم ربط موظفين نشطين بالمقعد نفسه. يمكنك تجربة اختيار مقعد مشغول لاختبار منع الازدواج.
                </p>
                <form onSubmit={handleAddEmployeeSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">الاسم المستعار للموظف</label>
                    <input
                      required
                      value={newEmpName}
                      onChange={(e) => setNewEmpName(e.target.value)}
                      placeholder="مثال: كرم الزعبي (تجريبي)"
                      className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">اختر المقعد الوظيفي (Seat ID)</label>
                    <select
                      value={newEmpSeatId}
                      onChange={(e) => setNewEmpSeatId(e.target.value)}
                      className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                    >
                      {seats.map((s) => {
                        const pos = positions.find((p) => p.position_id === s.position_id);
                        return (
                          <option key={s.seat_id} value={s.seat_id}>
                            {s.seat_id} [{s.seat_status}] — {s.department_id} / {pos?.title_ar}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">الراتب الافتراضي (JOD)</label>
                      <input
                        type="number"
                        value={newEmpSalary}
                        onChange={(e) => setNewEmpSalary(Number(e.target.value))}
                        className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30] tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">البريد الاختباري</label>
                      <input
                        value={newEmpEmail}
                        onChange={(e) => setNewEmpEmail(e.target.value)}
                        placeholder="emp@blueparadise.sim.jo"
                        className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowAddEmpModal(false)}
                      className="px-4 py-2 border border-[#354554] rounded-lg font-bold"
                    >
                      إلغاء
                    </button>
                    <button type="submit" className="px-4 py-2 bg-[#1E8F91] text-white rounded-lg font-bold">
                      حفظ وربط المقعد
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Employee Profile Modal */}
          {selectedEmployeeProfile && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#102B46] rounded-2xl max-w-lg w-full p-6 border border-[#E9D8BD] text-xs space-y-3">
                <div className="text-[#1E8F91] font-bold">
                  الملف الوظيفي — {selectedEmployeeProfile.employee_id} · المقعد {selectedEmployeeProfile.seat_id}
                </div>
                <h3 className="text-lg font-bold">{selectedEmployeeProfile.display_name_alias}</h3>
                <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30]">
                  <div>القسم: <b>{selectedEmployeeProfile.department_id}</b></div>
                  <div>المسمى: <b>{selectedEmployeeProfile.position_id}</b></div>
                  <div>تاريخ التعيين: <b className="tabular-nums">{selectedEmployeeProfile.hire_date}</b></div>
                  <div>رصيد الإجازات: <b className="tabular-nums">{selectedEmployeeProfile.leave_balance_days} يوماً</b></div>
                  <div>المدير المباشر: <b>{selectedEmployeeProfile.manager_employee_id || 'مجلس الإدارة'}</b></div>
                  <div>البريد: <b>{selectedEmployeeProfile.work_email_test}</b></div>
                </div>
                <div>
                  <div className="font-bold mb-1">المهارات المسجلة:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployeeProfile.skills.map((sk, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD]">
                        {sk.name} (مستوى {sk.level}/4)
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-bold mb-1">المسار المهني والملاحظات:</div>
                  <p className="text-[#354554] dark:text-[#E9D8BD]">{selectedEmployeeProfile.career_notes}</p>
                </div>
                <div className="flex justify-end pt-3">
                  <button
                    onClick={() => setSelectedEmployeeProfile(null)}
                    className="px-4 py-2 bg-[#102B46] dark:bg-[#1E8F91] text-white rounded-lg font-bold"
                  >
                    إغلاق الملف
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== 8.B INTERACTIVE ORGANIZATIONAL CHART ==================== */}
      {activeSubTab === 'hr_org_chart' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
            <h2 className="text-xl font-bold mb-2">الهيكل التنظيمي التفاعلي (10 إدارات · 39 مسمى · 96 مقعداً)</h2>
            <p className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-6">
              مجلس إدارة افتراضي (توجيه وحوكمة) ← المدير التنفيذي (P001) ← الإدارات التشغيلية وإدارات الدعم. اختر أي إدارة لعرض مسمياتها ومقاعدها وموظفيها:
            </p>

            {/* Tree Top Node */}
            <div className="flex flex-col items-center mb-6">
              <div className="px-5 py-2.5 rounded-xl bg-[#102B46] text-white border border-[#1E8F91] text-xs font-bold">
                مجلس الإدارة الافتراضي (حوكمة وتوجيه) ← المدير التنفيذي P001 (E001)
              </div>
              <div className="h-4 w-0.5 bg-[#1E8F91]" />
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 w-full">
                {departments.map((d) => {
                  const occ = seats.filter((s) => s.department_id === d.department_id && s.seat_status === 'Occupied').length;
                  const vac = seats.filter((s) => s.department_id === d.department_id && s.seat_status === 'Vacant').length;
                  const isSel = selectedOrgDept === d.department_id;
                  return (
                    <button
                      key={d.department_id}
                      onClick={() => setSelectedOrgDept(d.department_id)}
                      className={`p-3 rounded-xl border text-right transition-colors ${
                        isSel
                          ? 'bg-[#1E8F91] text-white border-[#102B46]'
                          : 'bg-[#F7F5F0] dark:bg-[#0B1D30] border-[#E9D8BD] dark:border-[#1E8F91]/30'
                      }`}
                    >
                      <div className="text-xs font-bold tabular-nums">{d.department_id}</div>
                      <div className="text-xs font-bold truncate mt-0.5">{d.name_ar}</div>
                      <div className="text-[11px] mt-1 tabular-nums opacity-90">
                        مقاعد: {d.planned_seats} ({occ} مشغول · {vac} شاغر)
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Department Detailed Positions & Seats */}
            {(() => {
              const dept = departments.find((d) => d.department_id === selectedOrgDept) || departments[0];
              const deptPositions = positions.filter((p) => p.department_id === dept.department_id);
              const deptManagerPos = positions.find((p) => p.position_id === dept.manager_position_id);
              const deptManagerEmp = employees.find((e) => e.position_id === dept.manager_position_id);

              return (
                <div className="p-5 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E9D8BD] pb-3">
                    <div>
                      <h3 className="text-lg font-bold">
                        {dept.department_id} — {dept.name_ar} ({dept.name_en})
                      </h3>
                      <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">{dept.description_ar}</p>
                    </div>
                    <div className="text-xs bg-white dark:bg-[#102B46] px-3 py-2 rounded-lg border border-[#E9D8BD]">
                      مدير الإدارة: <b>{deptManagerPos?.title_ar}</b> ({deptManagerEmp?.display_name_alias || 'شاغر'})
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {deptPositions.map((pos) => {
                      const posSeats = seats.filter((s) => s.position_id === pos.position_id);
                      const occCount = posSeats.filter((s) => s.seat_status === 'Occupied').length;
                      return (
                        <div
                          key={pos.position_id}
                          className="bg-white dark:bg-[#102B46] p-4 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/20 text-xs space-y-2"
                        >
                          <div className="flex items-center justify-between font-bold text-[#1E8F91]">
                            <span>
                              {pos.position_id} · المستوى {pos.grade}
                            </span>
                            <span className="tabular-nums">
                              المقاعد: {occCount} / {pos.planned_count}
                            </span>
                          </div>
                          <div className="font-bold text-sm">{pos.title_ar}</div>
                          <p className="text-[#354554] dark:text-[#E9D8BD]">{pos.description}</p>
                          <div className="text-[11px] tabular-nums">
                            النطاق التدريبي: <b>{pos.salary_min_jod} – {pos.salary_max_jod} JOD</b> · يتبع لـ:{' '}
                            <b>{pos.reports_to_position_id || 'مجلس الإدارة'}</b>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {posSeats.map((s) => (
                              <span
                                key={s.seat_id}
                                className={`px-2 py-0.5 rounded text-[11px] font-bold tabular-nums ${
                                  s.seat_status === 'Occupied'
                                    ? 'bg-[#1E8F91]/15 text-[#102B46] dark:text-[#E9D8BD]'
                                    : 'bg-[#D97965]/20 text-[#D97965]'
                                }`}
                              >
                                {s.seat_id}: {s.assigned_employee_id || 'شاغر'}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ==================== 8.C WORKFORCE PLANNING ==================== */}
      {activeSubTab === 'hr_workforce' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
            <h2 className="text-xl font-bold mb-2">تخطيط القوى العاملة (Workforce Planning — P001 إلى P039)</h2>
            <p className="text-xs text-[#354554] dark:text-[#E9D8BD] mb-4">
              مقارنة المقاعد المخططة (96) والمشغولة ({activeEmployeesCount}) والشاغرة ({vacantSeatsCount}) وتكاليف الرواتب التقديرية بالدينار الأردني:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#102B46] text-white">
                  <tr>
                    <th className="p-3">رمز المسمى</th>
                    <th className="p-3">المسمى الوظيفي</th>
                    <th className="p-3">الإدارة</th>
                    <th className="p-3">الدرجة</th>
                    <th className="p-3">المخطط</th>
                    <th className="p-3">المشغول</th>
                    <th className="p-3">الفجوة (الشواغر)</th>
                    <th className="p-3">نطاق الراتب (JOD)</th>
                    <th className="p-3">أولوية الاستقطاب</th>
                  </tr>
                </thead>
                <tbody>
                  {positions.map((pos) => {
                    const posSeats = seats.filter((s) => s.position_id === pos.position_id);
                    const occ = posSeats.filter((s) => s.seat_status === 'Occupied').length;
                    const gap = pos.planned_count - occ;
                    return (
                      <tr key={pos.position_id} className="border-b border-[#E9D8BD] dark:border-[#1E8F91]/20">
                        <td className="p-2.5 font-bold tabular-nums text-[#1E8F91]">{pos.position_id}</td>
                        <td className="p-2.5 font-bold">{pos.title_ar}</td>
                        <td className="p-2.5 tabular-nums">{pos.department_id}</td>
                        <td className="p-2.5 font-bold">{pos.grade}</td>
                        <td className="p-2.5 tabular-nums font-bold">{pos.planned_count}</td>
                        <td className="p-2.5 tabular-nums text-[#1E8F91] font-bold">{occ}</td>
                        <td className="p-2.5 tabular-nums text-[#D97965] font-bold">{gap}</td>
                        <td className="p-2.5 tabular-nums">
                          {pos.salary_min_jod} – {pos.salary_max_jod} JOD
                        </td>
                        <td className="p-2.5">
                          {gap > 0 ? (
                            <span className="text-[#D97965] font-bold">احتياج نشط ({gap} مقعد)</span>
                          ) : (
                            <span className="text-[#1E8F91]">مكتمل 100%</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 8.D ATTENDANCE & SHIFTS ==================== */}
      {activeSubTab === 'hr_attendance' && (
        <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
          <h2 className="text-xl font-bold">إدارة الحضور والانصراف والورديات</h2>
          <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
            متابعة سجلات الدوام وساعات العمل المجدولة والفعلية وطلبات تصحيح الحضور (السيناريو التدريبي 07).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#102B46] text-white">
                <tr>
                  <th className="p-3">السجل</th>
                  <th className="p-3">الموظف</th>
                  <th className="p-3">التاريخ</th>
                  <th className="p-3">الوردية</th>
                  <th className="p-3">الساعات المجدولة</th>
                  <th className="p-3">الساعات الفعلية</th>
                  <th className="p-3">الحالة والسبب</th>
                  <th className="p-3">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((att) => {
                  const emp = employees.find((e) => e.employee_id === att.employee_id);
                  return (
                    <tr key={att.attendance_id} className="border-b border-[#E9D8BD] dark:border-[#1E8F91]/20">
                      <td className="p-3 font-bold tabular-nums">{att.attendance_id}</td>
                      <td className="p-3 font-bold">
                        {emp?.display_name_alias} ({att.employee_id})
                      </td>
                      <td className="p-3 tabular-nums">{att.work_date}</td>
                      <td className="p-3">{att.shift_name}</td>
                      <td className="p-3 tabular-nums">{att.scheduled_hours} س</td>
                      <td className="p-3 tabular-nums font-bold">{att.actual_hours} س</td>
                      <td className="p-3">
                        <span className="font-bold">{att.status}</span>
                        {att.correction_reason && (
                          <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] mt-0.5">
                            السبب: {att.correction_reason}
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        {att.status === 'CorrectionPending' ? (
                          <button
                            onClick={() => approveAttendanceCorrection(att.attendance_id)}
                            className="px-3 py-1 bg-[#1E8F91] text-white rounded font-bold"
                          >
                            اعتماد التصحيح
                          </button>
                        ) : (
                          <span className="text-[#354554] dark:text-[#E9D8BD]">معتمد ({att.approved_by || 'النظام'})</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================== 8.E LEAVE MANAGEMENT ==================== */}
      {activeSubTab === 'hr_leaves' && (
        <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
          <h2 className="text-xl font-bold">إدارة الإجازات واعتماد الطلبات</h2>
          <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
            مسار طلب الإجازة: موظف ← مدير مباشر ← شؤون الموظفين ← تحديث الرصيد التجريبي وإرسال إشعار.
          </p>
          <div className="space-y-3">
            {leaves.map((lv) => {
              const emp = employees.find((e) => e.employee_id === lv.employee_id);
              return (
                <div
                  key={lv.leave_id}
                  className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/20 flex flex-wrap items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm">
                      {lv.leave_id} — {emp?.display_name_alias} ({lv.employee_id}) · إجازة {lv.leave_type}
                    </div>
                    <div className="text-[#354554] dark:text-[#E9D8BD] tabular-nums">
                      من {lv.start_date} إلى {lv.end_date} (المدة: <b>{lv.requested_days} أيام</b> | رصيد الموظف الحالي:{' '}
                      <b>{emp?.leave_balance_days} يوماً</b>)
                    </div>
                    <div className="text-[#354554] dark:text-[#E9D8BD]">السبب: {lv.reason}</div>
                    {lv.manager_approval && <div className="text-[#1E8F91] font-bold">قرار المراجعة: {lv.manager_approval}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold px-2.5 py-1 rounded bg-white dark:bg-[#102B46] border border-[#E9D8BD]">
                      {lv.status}
                    </span>
                    {(lv.status === 'PendingManager' || lv.status === 'PendingHR') && (
                      <>
                        <button
                          onClick={() => decideLeaveRequest(lv.leave_id, 'Approved', 'تم الاعتماد وخصم الأيام من الرصيد التجريبي.')}
                          className="px-3 py-1.5 bg-[#1E8F91] text-white rounded-lg font-bold"
                        >
                          موافقة واعتماد
                        </button>
                        <button
                          onClick={() => decideLeaveRequest(lv.leave_id, 'Rejected', 'تعارض مع جدول مناوبات الذروة في القسم.')}
                          className="px-3 py-1.5 bg-[#D97965] text-white rounded-lg font-bold"
                        >
                          رفض
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== 8.F PAYROLL SIMULATION (PROTECTED) ==================== */}
      {activeSubTab === 'hr_payroll' && (
        <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
          {!canViewPayroll ? (
            <div className="p-8 text-center rounded-xl bg-red-950/20 border border-red-600/40 space-y-2">
              <div className="text-lg font-bold text-red-600">403 Forbidden — بيانات الرواتب محمية بصلاحيات مشددة</div>
              <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
                الدور الحالي ({currentUser.display_name}) غير مخول بالاطلاع على الأجور الفردية للموظفين. تم تسجيل المحاولة في سجل التدقيق.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl font-bold">محاكاة مسير الرواتب والتعويضات (Payroll Simulation — JOD)</h2>
                  <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
                    نطاقات تعليمية بالدينار الأردني فقط؛ لا تُحسب خصومات قانونية أو ضمان اجتماعي كقواعد رسمية دون اعتماد.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#1E8F91]">الفترة النشطة: 2026-11</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#102B46] text-white">
                    <tr>
                      <th className="p-3">سجل الراتب</th>
                      <th className="p-3">الموظف</th>
                      <th className="p-3">الراتب الأساسي (JOD)</th>
                      <th className="p-3">البدلات الإضافية</th>
                      <th className="p-3">الخصومات التدريبية</th>
                      <th className="p-3">صافي الراتب المحسوب</th>
                      <th className="p-3">حالة الاعتماد</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payroll.map((pay) => {
                      const emp = employees.find((e) => e.employee_id === pay.employee_id);
                      return (
                        <tr key={pay.payroll_id} className="border-b border-[#E9D8BD] dark:border-[#1E8F91]/20">
                          <td className="p-2.5 font-bold tabular-nums">{pay.payroll_id}</td>
                          <td className="p-2.5 font-bold">
                            {emp?.display_name_alias} ({pay.employee_id})
                          </td>
                          <td className="p-2.5 tabular-nums">{pay.base_pay_jod} JOD</td>
                          <td className="p-2.5 tabular-nums text-[#1E8F91]">+{pay.additions_jod} JOD</td>
                          <td className="p-2.5 tabular-nums text-[#D97965]">-{pay.deductions_jod} JOD</td>
                          <td className="p-2.5 tabular-nums font-bold text-sm">{pay.net_pay_jod} JOD</td>
                          <td className="p-2.5">
                            <select
                              value={pay.payment_status}
                              onChange={(e) =>
                                updatePayrollStatus(pay.payroll_id, e.target.value as typeof pay.payment_status)
                              }
                              className="border border-[#E9D8BD] rounded px-2 py-1 text-[11px] bg-[#F7F5F0] dark:bg-[#0B1D30]"
                            >
                              <option value="Draft">Draft (مسودة)</option>
                              <option value="HRVerified">HRVerified (تدقيق HR)</option>
                              <option value="FinanceReviewed">FinanceReviewed (مراجعة مالية)</option>
                              <option value="ApprovedLocked">ApprovedLocked (معتمد ومقفل)</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
