import React, { useState } from 'react';
import { useEnterprise } from '../context/EnterpriseContext';
import { Application, ATSStage } from '../types/enterprise';
import {
  Briefcase,
  UserCheck,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Award,
  AlertCircle,
  Plus,
  Users,
  Shield,
} from 'lucide-react';

interface ATSAndSelfServicePortalsProps {
  mode: 'ats' | 'employee' | 'manager';
}

export const ATSAndSelfServicePortals: React.FC<ATSAndSelfServicePortalsProps> = ({ mode }) => {
  const {
    departments,
    positions,
    seats,
    employees,
    vacancies,
    applications,
    interviews,
    interviewScores,
    attendance,
    leaves,
    trainingCatalog,
    enrollments,
    cycles,
    reviews,
    tickets,
    activeEmployeeId,
    setActiveEmployeeId,
    activeManagerDeptId,
    setActiveManagerDeptId,
    createVacancy,
    approveAndPublishVacancy,
    advanceApplicationStage,
    submitInterviewRubric,
    hireCandidateToSeat,
    toggleOnboardingTask,
    submitLeaveRequest,
    decideLeaveRequest,
    requestAttendanceCorrection,
    approveAttendanceCorrection,
    enrollInTraining,
    submitPerformanceReview,
    createTicket,
    checkAccessAndAudit,
  } = useEnterprise();

  // ==================== ATS STATE ====================
  const [atsStageFilter, setAtsStageFilter] = useState<string>('ALL');
  const [selectedAppForRubric, setSelectedAppForRubric] = useState<Application | null>(null);
  const [rubricScores, setRubricScores] = useState<{
    criterion_id: string;
    criterion_name: string;
    score: number;
    rationale: string;
  }[]>([
    { criterion_id: 'C1', criterion_name: 'التواصل', score: 4, rationale: 'تواصل واضح ومهني باللغتين' },
    { criterion_id: 'C2', criterion_name: 'التعامل مع ضيف', score: 4, rationale: 'تعاطف واحترافية في مواقف الضيوف' },
    { criterion_id: 'C3', criterion_name: 'حل مشكلة', score: 3, rationale: 'حلول عملية سريعة' },
    { criterion_id: 'C4', criterion_name: 'سلامة', score: 4, rationale: 'التزام ببروتوكولات السلامة' },
    { criterion_id: 'C5', criterion_name: 'مرونة العمل', score: 3, rationale: 'جاهزية للمناوبات' },
  ]);
  const [rubricRec, setRubricRec] = useState<'Strong Hire' | 'Hire' | 'Hold' | 'No Hire'>('Strong Hire');
  const [humanStageReason, setHumanStageReason] = useState<Record<string, string>>({});

  // Create Vacancy Form State
  const [vacDeptId, setVacDeptId] = useState<string>('D02');
  const [vacSeatId, setVacSeatId] = useState<string>('S012');
  const [vacType, setVacType] = useState<'دوام كامل' | 'دوام جزئي' | 'عقد موسمي تدريبي'>('دوام كامل');
  const [vacClosing, setVacClosing] = useState<string>('2026-12-30');
  const [vacReqs, setVacReqs] = useState<string>('إجادة خدمة الضيوف والالتزام بمعايير بلو برادايس, مهارات تواصل عالية');
  const [vacQuestions, setVacQuestions] = useState<string>('كيف تتعامل مع ضغط العمل في أوقات الذروة؟');

  // ==================== EMPLOYEE PORTAL STATE ====================
  const [empSubTab, setEmpSubTab] = useState<'profile_onboarding' | 'leaves_attendance' | 'training_goals' | 'helpdesk'>('profile_onboarding');
  const [leaveType, setLeaveType] = useState<'سنوية' | 'مرضية' | 'طارئة' | 'تدريبية'>('سنوية');
  const [leaveStart, setLeaveStart] = useState<string>('2026-12-05');
  const [leaveEnd, setLeaveEnd] = useState<string>('2026-12-07');
  const [leaveReason, setLeaveReason] = useState<string>('');
  const [correctionReasonInput, setCorrectionReasonInput] = useState<string>('');
  const [ticketTitleInput, setTicketTitleInput] = useState<string>('');

  // ==================== MANAGER PORTAL STATE ====================
  const [mgrEvalEmpId, setMgrEvalEmpId] = useState<string>('E008');
  const [mgrGoalsScore, setMgrGoalsScore] = useState<number>(90);
  const [mgrCompScore, setMgrCompScore] = useState<number>(88);
  const [mgrLearnScore, setMgrLearnScore] = useState<number>(92);
  const [mgrFeedback, setMgrFeedback] = useState<string>('التزام متميز بمعايير خدمة الضيوف وجودة الأداء.');
  const [mgrIdp, setMgrIdp] = useState<string>('تأهيل الموظف لمهام الإشراف التشغيلي في الربع القادم.');

  // ============================================================================
  // 9. RECRUITMENT & ATS PORTAL
  // ============================================================================
  if (mode === 'ats') {
    const deptVacantSeats = seats.filter((s) => s.department_id === vacDeptId && s.seat_status === 'Vacant');
    const selectedSeatObj = seats.find((s) => s.seat_id === vacSeatId) || deptVacantSeats[0];

    const handleCreateVacancy = (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedSeatObj) return;
      createVacancy({
        position_id: selectedSeatObj.position_id,
        seat_id: selectedSeatObj.seat_id,
        employment_type: vacType,
        closing_date: vacClosing,
        requirements_ar: vacReqs.split(',').map((s) => s.trim()).filter(Boolean),
        job_questions: vacQuestions.split(',').map((s) => s.trim()).filter(Boolean),
        autoPublish: true,
      });
    };

    const handleRubricSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedAppForRubric) return;
      const ok = submitInterviewRubric(
        selectedAppForRubric.application_id,
        'لجنة الاختيار المنظمة (HR + مدير القسم المختص)',
        rubricScores,
        rubricRec
      );
      if (ok) setSelectedAppForRubric(null);
    };

    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
          <div className="text-xs text-[#1E8F91] font-bold mb-1">الوحدة 9 — نظام الاستقطاب وتتبع المتقدمين (Recruitment & ATS)</div>
          <h1 className="text-2xl font-bold mb-2">بوابة التوظيف وفرز المرشحين ولجنة المقابلات</h1>
          <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
            مسار ATS المعتمد: <b>Applied → Screening → Shortlisted → Interview → Offer → Hired</b> (مع الحالات البديلة: Rejected / Withdrawn / On Hold). تلتزم البوابة بالمراجعة البشرية الإلزامية قبل أي قرار قبول أو رفض.
          </p>
        </div>

        {/* Create New Vacancy Linked to Vacant Seat + Pending Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
            <h2 className="text-base font-bold mb-3">فتح شاغر وظيفي جديد مرتبط بمقعد شاغر</h2>
            <form onSubmit={handleCreateVacancy} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">١. اختر الإدارة</label>
                  <select
                    value={vacDeptId}
                    onChange={(e) => {
                      const dId = e.target.value;
                      setVacDeptId(dId);
                      const firstVac = seats.find((s) => s.department_id === dId && s.seat_status === 'Vacant');
                      if (firstVac) setVacSeatId(firstVac.seat_id);
                    }}
                    className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                  >
                    {departments.map((d) => (
                      <option key={d.department_id} value={d.department_id}>
                        {d.department_id} — {d.name_ar}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">٢. المقعد الشاغر والمسمى</label>
                  <select
                    value={selectedSeatObj?.seat_id || ''}
                    onChange={(e) => setVacSeatId(e.target.value)}
                    className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                  >
                    {deptVacantSeats.map((s) => {
                      const pos = positions.find((p) => p.position_id === s.position_id);
                      return (
                        <option key={s.seat_id} value={s.seat_id}>
                          {s.seat_id} — {s.position_id} ({pos?.title_ar})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">نوع العقد</label>
                  <select
                    value={vacType}
                    onChange={(e) => setVacType(e.target.value as typeof vacType)}
                    className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                  >
                    <option value="دوام كامل">دوام كامل</option>
                    <option value="دوام جزئي">دوام جزئي</option>
                    <option value="عقد موسمي تدريبي">عقد موسمي تدريبي</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">تاريخ إغلاق الإعلان</label>
                  <input
                    type="date"
                    value={vacClosing}
                    onChange={(e) => setVacClosing(e.target.value)}
                    className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30] tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">المتطلبات الوظيفية (مفصولة بفاصلة)</label>
                <input
                  value={vacReqs}
                  onChange={(e) => setVacReqs(e.target.value)}
                  className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">أسئلة الفرز المخصصة للوظيفة</label>
                <input
                  value={vacQuestions}
                  onChange={(e) => setVacQuestions(e.target.value)}
                  className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1E8F91] hover:bg-[#236A9F] text-white font-bold rounded-lg"
              >
                اعتماد ونشر الشاغر في بوابة الوظائف
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
            <h2 className="text-base font-bold mb-3">الشواغر الوظيفية المسجلة ({vacancies.length})</h2>
            <div className="space-y-2.5 max-h-80 overflow-y-auto text-xs">
              {vacancies.map((v) => {
                const pos = positions.find((p) => p.position_id === v.position_id);
                return (
                  <div
                    key={v.vacancy_id}
                    className="p-3.5 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/20 flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-[#1E8F91]">
                        {v.vacancy_id} · المقعد {v.seat_id} · القسم {v.department_id}
                      </div>
                      <div className="font-bold mt-0.5">{pos?.title_ar}</div>
                      <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] tabular-nums">
                        الإغلاق: {v.closing_date} | الحالة: <b>{v.status}</b>
                      </div>
                    </div>
                    {v.status === 'PendingApproval' && (
                      <button
                        onClick={() => approveAndPublishVacancy(v.vacancy_id)}
                        className="px-3 py-1.5 bg-[#1E8F91] text-white rounded-lg font-bold shrink-0"
                      >
                        اعتماد ونشر
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ATS Candidate Cards & Pipeline Filter */}
        <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold">بطاقات المرشحين وسجل انتقال المراحل ({applications.length})</h2>
            <div className="flex flex-wrap gap-1.5">
              {['ALL', 'Applied', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected', 'On Hold'].map((st) => (
                <button
                  key={st}
                  onClick={() => setAtsStageFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    atsStageFilter === st
                      ? 'bg-[#102B46] dark:bg-[#1E8F91] text-white'
                      : 'bg-[#F7F5F0] dark:bg-[#0B1D30] text-[#354554] dark:text-[#E9D8BD]'
                  }`}
                >
                  {st === 'ALL' ? 'الكل' : st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {applications
              .filter((a) => (atsStageFilter === 'ALL' ? true : a.stage === atsStageFilter))
              .map((app) => {
                const vac = vacancies.find((v) => v.vacancy_id === app.vacancy_id);
                const pos = positions.find((p) => p.position_id === vac?.position_id);
                return (
                  <div
                    key={app.application_id}
                    className="p-5 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-3 text-xs"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="text-[#1E8F91] font-bold">
                          طلب {app.application_id} · الشاغر {app.vacancy_id} ({pos?.title_ar}) · المقعد المستهدف: {vac?.seat_id}
                        </div>
                        <h3 className="text-base font-bold mt-1">
                          {app.candidate_alias} — {app.qualification} (خبرة: {app.years_experience} سنوات)
                        </h3>
                        <div className="text-[#354554] dark:text-[#E9D8BD] mt-1">
                          المهارات: {app.skills.join(' · ')} | المؤشر الاسترشادي للفرز (لا يُستخدم للرفض الآلي):{' '}
                          <b className="tabular-nums">{app.score_reference}%</b>
                        </div>
                        <div className="mt-1.5 font-bold text-[#102B46] dark:text-[#E9D8BD]">
                          توصية/ملاحظة المراجع البشري: {app.human_reviewer_notes}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="px-3 py-1 rounded-lg bg-[#102B46] text-white font-bold">
                          المرحلة الحالية: {app.stage}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setSelectedAppForRubric(app)}
                            className="px-3 py-1.5 bg-[#236A9F] text-white rounded-lg font-bold"
                          >
                            تقييم لجنة المقابلات (5 معايير)
                          </button>
                          {app.stage !== 'Hired' && (
                            <button
                              onClick={() => hireCandidateToSeat(app.application_id)}
                              className="px-3 py-1.5 bg-[#1E8F91] text-white rounded-lg font-bold"
                            >
                              تثبيت العرض وتحويل لموظف مرتبط بالمقعد
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Human-in-the-Loop Stage Change Bar */}
                    <div className="pt-3 border-t border-[#E9D8BD] dark:border-[#1E8F91]/20 flex flex-wrap items-center gap-2">
                      <input
                        placeholder="اكتب مبرر المسؤول البشري لنقل المرحلة أو الرفض (إلزامي)..."
                        value={humanStageReason[app.application_id] || ''}
                        onChange={(e) =>
                          setHumanStageReason((prev) => ({ ...prev, [app.application_id]: e.target.value }))
                        }
                        className="flex-1 min-w-[220px] border border-[#E9D8BD] rounded-lg px-3 py-1.5 bg-white dark:bg-[#102B46]"
                      />
                      {(['Screening', 'Shortlisted', 'Interview', 'Offer', 'On Hold', 'Rejected'] as ATSStage[]).map(
                        (targetStage) => (
                          <button
                            key={targetStage}
                            onClick={() =>
                              advanceApplicationStage(
                                app.application_id,
                                targetStage,
                                humanStageReason[app.application_id] || ''
                              )
                            }
                            className="px-2.5 py-1.5 border border-[#102B46] dark:border-[#E9D8BD] rounded-lg font-bold hover:bg-[#102B46] hover:text-white transition-colors"
                          >
                            نقل إلى {targetStage}
                          </button>
                        )
                      )}
                    </div>

                    {/* Stage Transition Audit Trail */}
                    <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] pt-1">
                      <span className="font-bold">سجل انتقال الحالة: </span>
                      {app.stage_history.map((h, i) => (
                        <span key={i}>
                          [{h.date} — {h.stage}: {h.reason}]{i < app.stage_history.length - 1 ? ' ← ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Structured 5-Criteria Interview Rubric Modal */}
        {selectedAppForRubric && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#102B46] rounded-2xl max-w-xl w-full p-6 border border-[#E9D8BD] text-xs space-y-4">
              <div>
                <div className="text-[#1E8F91] font-bold">بطاقة تقييم المقابلة المنظمة (السيناريو 04)</div>
                <h3 className="text-lg font-bold">
                  تقييم المرشح: {selectedAppForRubric.candidate_alias} ({selectedAppForRubric.application_id})
                </h3>
                <p className="text-[#354554] dark:text-[#E9D8BD]">
                  تقييم 5 معايير معتمدة على سلم من 1 إلى 4 مع توثيق الأسباب المكتوبة ومقارنة الأدلة:
                </p>
              </div>
              <form onSubmit={handleRubricSubmit} className="space-y-3">
                {rubricScores.map((item, idx) => (
                  <div key={item.criterion_id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-3 font-bold">
                      {idx + 1}. {item.criterion_name}
                    </div>
                    <div className="col-span-3">
                      <select
                        value={item.score}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setRubricScores((prev) =>
                            prev.map((r, i) => (i === idx ? { ...r, score: val } : r))
                          );
                        }}
                        className="w-full border border-[#E9D8BD] rounded px-2 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30] font-bold tabular-nums"
                      >
                        <option value={4}>4 — متميز</option>
                        <option value={3}>3 — كفؤ</option>
                        <option value={2}>2 — نامٍ</option>
                        <option value={1}>1 — دون المعيار</option>
                      </select>
                    </div>
                    <div className="col-span-6">
                      <input
                        value={item.rationale}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRubricScores((prev) =>
                            prev.map((r, i) => (i === idx ? { ...r, rationale: val } : r))
                          );
                        }}
                        placeholder="الدليل / المبرر المكتوب..."
                        className="w-full border border-[#E9D8BD] rounded px-2.5 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                      />
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block font-bold mb-1">توصية لجنة الاختيار</label>
                  <select
                    value={rubricRec}
                    onChange={(e) => setRubricRec(e.target.value as typeof rubricRec)}
                    className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30] font-bold"
                  >
                    <option value="Strong Hire">Strong Hire — توصية قوية بالتعيين وإصدار عرض</option>
                    <option value="Hire">Hire — توصية بالتعيين</option>
                    <option value="Hold">Hold — قائمة انتظار</option>
                    <option value="No Hire">No Hire — عدم التوصية بالتعيين</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#E9D8BD]">
                  <button
                    type="button"
                    onClick={() => setSelectedAppForRubric(null)}
                    className="px-4 py-2 border border-[#354554] rounded-lg font-bold"
                  >
                    إلغاء
                  </button>
                  <button type="submit" className="px-5 py-2 bg-[#1E8F91] text-white rounded-lg font-bold">
                    اعتماد التقييم وحفظ الدرجات
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // 10. EMPLOYEE SELF-SERVICE PORTAL (/employee)
  // ============================================================================
  if (mode === 'employee') {
    const emp = employees.find((e) => e.employee_id === activeEmployeeId) || employees[7] || employees[0];
    const empPos = positions.find((p) => p.position_id === emp.position_id);
    const empDept = departments.find((d) => d.department_id === emp.department_id);
    const empMgr = employees.find((m) => m.employee_id === emp.manager_employee_id);
    const empLeaves = leaves.filter((l) => l.employee_id === emp.employee_id);
    const empAtt = attendance.filter((a) => a.employee_id === emp.employee_id);
    const empEnrollments = enrollments.filter((en) => en.employee_id === emp.employee_id);
    const empReviews = reviews.filter((r) => r.employee_id === emp.employee_id);

    const handleLeaveSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const ok = submitLeaveRequest({
        employee_id: emp.employee_id,
        leave_type: leaveType,
        start_date: leaveStart,
        end_date: leaveEnd,
        reason: leaveReason,
      });
      if (ok) setLeaveReason('');
    };

    return (
      <div className="space-y-6">
        {/* Employee Header Card (Sees own data only) */}
        <div className="bg-white dark:bg-[#102B46] p-6 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs text-[#1E8F91] font-bold">
              بوابة الخدمة الذاتية للموظف (/employee) — معزولة الصلاحيات (يرى بياناته ومهامه فقط)
            </div>
            <h1 className="text-2xl font-bold">{emp.display_name_alias}</h1>
            <div className="text-xs text-[#354554] dark:text-[#E9D8BD] flex flex-wrap items-center gap-3">
              <span>الرقم الوظيفي: <b className="tabular-nums">{emp.employee_id}</b></span>
              <span>·</span>
              <span>المقعد: <b className="tabular-nums">{emp.seat_id}</b></span>
              <span>·</span>
              <span>القسم: <b>{empDept?.name_ar} ({emp.department_id})</b></span>
              <span>·</span>
              <span>المسمى: <b>{empPos?.title_ar}</b></span>
              <span>·</span>
              <span>المدير المباشر: <b>{empMgr ? `${empMgr.display_name_alias} (${empMgr.employee_id})` : 'الإدارة العليا'}</b></span>
              <span>·</span>
              <span>الحالة: <b className="text-[#1E8F91]">{emp.employment_status}</b></span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 text-xs">
            <label className="font-bold text-[#354554] dark:text-[#E9D8BD]">محاكاة عرض البوابة لموظف محدد:</label>
            <select
              value={emp.employee_id}
              onChange={(e) => setActiveEmployeeId(e.target.value)}
              className="border border-[#E9D8BD] rounded-lg px-3 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30] font-bold"
            >
              {employees.slice(0, 20).map((item) => (
                <option key={item.employee_id} value={item.employee_id}>
                  {item.employee_id} — {item.display_name_alias} ({item.department_id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sub-navigation for Employee Self-Service */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'profile_onboarding', label: 'ملفي الوظيفي وبرنامج التهيئة (Onboarding)' },
            { id: 'leaves_attendance', label: `الإجازات والحضور والمناوبات (رصيدي: ${emp.leave_balance_days} يوماً)` },
            { id: 'training_goals', label: 'تدريباتي وأهدافي وتقييماتي' },
            { id: 'helpdesk', label: 'طلب مساعدة وإعدادات الحساب' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setEmpSubTab(t.id as typeof empSubTab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold ${
                empSubTab === t.id
                  ? 'bg-[#102B46] dark:bg-[#1E8F91] text-white'
                  : 'bg-white dark:bg-[#102B46] border border-[#E9D8BD] dark:border-[#1E8F91]/30'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {empSubTab === 'profile_onboarding' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
              <h2 className="text-lg font-bold">برنامج التهيئة الوظيفية (Onboarding 1 / 7 / 30 / 60 / 90 يوماً)</h2>
              <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
                يمكنك تحديث إنجاز مهام التهيئة الخاصة بك (السيناريو التدريبي الخامس):
              </p>
              <div className="space-y-2.5 text-xs">
                {(emp.onboarding_tasks || []).map((task) => (
                  <label
                    key={task.id}
                    className="p-3.5 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/20 flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleOnboardingTask(emp.employee_id, task.id)}
                        className="w-4 h-4 accent-[#1E8F91]"
                      />
                      <div>
                        <div className="font-bold text-[#1E8F91]">{task.phase}</div>
                        <div className={task.completed ? 'line-through opacity-75' : 'font-bold'}>{task.title}</div>
                      </div>
                    </div>
                    <span className="font-bold">{task.completed ? 'مكتمل' : 'قيد الإنجاز'}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4 text-xs">
              <h2 className="text-lg font-bold">بطاقة الوصف الوظيفي والمهارات المسجلة</h2>
              <div className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] space-y-2">
                <div><b>المسمى:</b> {empPos?.title_ar} ({empPos?.title_en})</div>
                <div><b>الهدف والمسؤوليات:</b> {empPos?.description}</div>
                <div><b>تاريخ المباشرة:</b> <span className="tabular-nums">{emp.hire_date}</span></div>
                <div><b>البريد المؤسسي التجريبي:</b> {emp.work_email_test}</div>
              </div>
              <div>
                <div className="font-bold mb-2">مهاراتي الحالية مقارنة بمتطلبات المسمى:</div>
                <div className="grid grid-cols-2 gap-2">
                  {emp.skills.map((s, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] flex justify-between">
                      <span className="font-bold">{s.name}</span>
                      <span className="text-[#1E8F91] font-bold tabular-nums">مستوى {s.level}/4</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {empSubTab === 'leaves_attendance' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
              <h2 className="text-lg font-bold">تقديم طلب إجازة جديد</h2>
              <div className="text-xs text-[#1E8F91] font-bold">
                رصيدك التجريبي المتاح حالياً: <span className="tabular-nums text-base">{emp.leave_balance_days} يوماً</span>
              </div>
              <form onSubmit={handleLeaveSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">نوع الإجازة</label>
                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value as typeof leaveType)}
                    className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                  >
                    <option value="سنوية">سنوية</option>
                    <option value="مرضية">مرضية</option>
                    <option value="طارئة">طارئة</option>
                    <option value="تدريبية">تدريبية</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">تاريخ البداية</label>
                    <input
                      type="date"
                      value={leaveStart}
                      onChange={(e) => setLeaveStart(e.target.value)}
                      className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30] tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">تاريخ النهاية</label>
                    <input
                      type="date"
                      value={leaveEnd}
                      onChange={(e) => setLeaveEnd(e.target.value)}
                      className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30] tabular-nums"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold mb-1">سبب الطلب وملاحظات التسليم</label>
                  <textarea
                    rows={2}
                    required
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    placeholder="اكتب مبرر الإجازة..."
                    className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#1E8F91] hover:bg-[#236A9F] text-white font-bold rounded-lg"
                >
                  إرسال الطلب إلى المدير المباشر
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
                <h2 className="text-base font-bold mb-3">سجل طلبات إجازاتي ومتابعة حالتها ({empLeaves.length})</h2>
                {empLeaves.length === 0 ? (
                  <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">لا توجد طلبات إجازة مسجلة لهذا الموظف بعد.</div>
                ) : (
                  <div className="space-y-2.5 text-xs">
                    {empLeaves.map((l) => (
                      <div
                        key={l.leave_id}
                        className="p-3.5 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold">
                            {l.leave_id} — إجازة {l.leave_type} ({l.requested_days} أيام)
                          </div>
                          <div className="text-[#354554] dark:text-[#E9D8BD] tabular-nums">
                            {l.start_date} إلى {l.end_date} | {l.reason}
                          </div>
                        </div>
                        <span className="font-bold text-[#1E8F91]">{l.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
                <h2 className="text-base font-bold mb-3">جدول مناوباتي وسجل الحضور وتصحيح الساعات</h2>
                <div className="space-y-2.5 text-xs">
                  {empAtt.map((a) => (
                    <div
                      key={a.attendance_id}
                      className="p-3.5 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] flex flex-wrap items-center justify-between gap-2"
                    >
                      <div>
                        <div className="font-bold tabular-nums">
                          {a.work_date} — {a.shift_name}
                        </div>
                        <div className="text-[#354554] dark:text-[#E9D8BD] tabular-nums">
                          المجدول: {a.scheduled_hours} س · الفعلي: {a.actual_hours} س · الحالة: <b>{a.status}</b>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          placeholder="سبب طلب التصحيح..."
                          value={correctionReasonInput}
                          onChange={(e) => setCorrectionReasonInput(e.target.value)}
                          className="border border-[#E9D8BD] rounded px-2 py-1 bg-white dark:bg-[#102B46]"
                        />
                        <button
                          onClick={() =>
                            requestAttendanceCorrection(a.attendance_id, correctionReasonInput || 'تعويض فرق التوقيت في الوردية')
                          }
                          className="px-3 py-1 bg-[#102B46] dark:bg-[#1E8F91] text-white rounded font-bold"
                        >
                          طلب تصحيح
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {empSubTab === 'training_goals' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
              <h2 className="text-lg font-bold">برامجي التدريبية والتسجيل الذاتي</h2>
              <div className="space-y-2.5 text-xs">
                {empEnrollments.map((en) => {
                  const prog = trainingCatalog.find((t) => t.training_id === en.training_id);
                  return (
                    <div key={en.enrollment_id} className="p-3.5 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD]">
                      <div className="font-bold text-[#1E8F91]">
                        {en.training_id} — {prog?.title}
                      </div>
                      <div className="mt-1 tabular-nums">
                        الحالة: <b>{en.completion_status}</b> · التقييم القبلي: {en.score_before}% · التقييم البعدي: <b>{en.score_after}%</b>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-3 border-t border-[#E9D8BD]">
                <div className="text-xs font-bold mb-2">التسجيل في برنامج تدريبي جديد من الدليل:</div>
                <div className="flex flex-wrap gap-2">
                  {trainingCatalog.map((t) => (
                    <button
                      key={t.training_id}
                      onClick={() => enrollInTraining(emp.employee_id, t.training_id)}
                      className="px-3 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30] hover:bg-[#1E8F91] hover:text-white border border-[#E9D8BD] rounded-lg text-xs font-bold transition-colors"
                    >
                      + {t.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
              <h2 className="text-lg font-bold">أهدافي الذكية (SMART) وتقييم الأداء</h2>
              {empReviews.length === 0 ? (
                <div className="text-xs text-[#354554] dark:text-[#E9D8BD]">لم يُصدر تقييم أداء معتمد لهذا الموظف بعد في الدورة الحالية.</div>
              ) : (
                empReviews.map((rev) => (
                  <div key={rev.review_id} className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] text-xs space-y-2">
                    <div className="flex justify-between font-bold text-[#1E8F91]">
                      <span>دورة التقييم: {rev.cycle_id}</span>
                      <span className="tabular-nums text-base">النتيجة الموزونة: {rev.overall_score}%</span>
                    </div>
                    <div className="tabular-nums">
                      النتائج (50%): <b>{rev.goals_score}%</b> · الكفايات (30%): <b>{rev.competencies_score}%</b> · التعلم (20%): <b>{rev.learning_score}%</b>
                    </div>
                    <div><b>ملاحظات المدير:</b> {rev.manager_feedback}</div>
                    <div><b>خطة التطوير الفردية (IDP):</b> {rev.idp_plan}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {empSubTab === 'helpdesk' && (
          <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 max-w-xl space-y-4">
            <h2 className="text-lg font-bold">فتح تذكرة مساعدة أو دعم تقني / موارد بشرية (WF-10)</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!ticketTitleInput.trim()) return;
                createTicket({
                  title: ticketTitleInput,
                  category: 'دعم موارد بشرية وتقنية',
                  department_id: emp.department_id,
                  related_employee_id: emp.employee_id,
                  owner_role: 'شؤون الموظفين D06 / تقنية المعلومات D10',
                  priority: 'متوسطة',
                });
                setTicketTitleInput('');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold mb-1">موضوع الطلب أو المشكلة</label>
                <input
                  required
                  value={ticketTitleInput}
                  onChange={(e) => setTicketTitleInput(e.target.value)}
                  placeholder="مثال: طلب تحديث بيانات الاتصال أو صلاحية نظام الحجوزات..."
                  className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                />
              </div>
              <button type="submit" className="px-5 py-2.5 bg-[#1E8F91] text-white font-bold rounded-lg">
                إرسال تذكرة المساعدة
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // 11. DEPARTMENT MANAGER PORTAL (/manager)
  // ============================================================================
  const mgrDept = departments.find((d) => d.department_id === activeManagerDeptId) || departments[1];
  const deptTeam = employees.filter((e) => e.department_id === mgrDept.department_id);
  const deptSeats = seats.filter((s) => s.department_id === mgrDept.department_id);
  const deptVacantSeats = deptSeats.filter((s) => s.seat_status === 'Vacant');
  const deptLeaves = leaves.filter((l) => deptTeam.some((e) => e.employee_id === l.employee_id));

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#102B46] p-6 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs text-[#1E8F91] font-bold">
            بوابة مدير القسم (/manager) — صلاحيات مقيدة بفريق القسم المختص فقط دون كشف الرواتب
          </div>
          <h1 className="text-2xl font-bold mt-1">
            إدارة قسم: {mgrDept.name_ar} ({mgrDept.department_id})
          </h1>
          <p className="text-xs text-[#354554] dark:text-[#E9D8BD] mt-1">
            أعضاء الفريق النشطون: <b className="tabular-nums">{deptTeam.length}</b> · المقاعد المخططة:{' '}
            <b className="tabular-nums">{mgrDept.planned_seats}</b> · الشواغر المتاحة للقسم:{' '}
            <b className="tabular-nums text-[#D97965]">{deptVacantSeats.length}</b>
          </p>
        </div>

        <div className="flex flex-col items-end gap-2 text-xs">
          <label className="font-bold">تبديل القسم لمعاينة بوابة مديره:</label>
          <div className="flex items-center gap-2">
            <select
              value={mgrDept.department_id}
              onChange={(e) => {
                const dId = e.target.value;
                setActiveManagerDeptId(dId);
                const firstTeam = employees.find((emp) => emp.department_id === dId);
                if (firstTeam) setMgrEvalEmpId(firstTeam.employee_id);
              }}
              className="border border-[#E9D8BD] rounded-lg px-3 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30] font-bold"
            >
              {departments.map((d) => (
                <option key={d.department_id} value={d.department_id}>
                  {d.department_id} — {d.name_ar}
                </option>
              ))}
            </select>
            <button
              onClick={() => checkAccessAndAudit('كشوف رواتب الموظفين الفردية', ['super_admin', 'hr_admin', 'finance'])}
              className="px-3 py-1.5 bg-[#D97965]/20 text-[#D97965] border border-[#D97965] rounded-lg font-bold"
              title="اختبار منع وصول مدير القسم للرواتب (السيناريو 11)"
            >
              اختبار فتح الرواتب (403)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Team Members & Request New Vacancy */}
        <div className="lg:col-span-7 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">موظفو القسم التابعون للمدير فقط ({deptTeam.length})</h2>
            {deptVacantSeats.length > 0 && (
              <button
                onClick={() => {
                  const targetSeat = deptVacantSeats[0];
                  createVacancy({
                    position_id: targetSeat.position_id,
                    seat_id: targetSeat.seat_id,
                    employment_type: 'دوام كامل',
                    closing_date: '2026-12-30',
                    requirements_ar: [`احتياج تشغيلي لقسم ${mgrDept.name_ar}`],
                    job_questions: ['ما مدى خبرتك في مهام هذا القسم؟'],
                    autoPublish: false,
                  });
                }}
                className="px-3 py-1.5 bg-[#1E8F91] text-white rounded-lg text-xs font-bold"
              >
                + طلب فتح شاغر للمقعد {deptVacantSeats[0].seat_id}
              </button>
            )}
          </div>

          <div className="overflow-x-auto max-h-80">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#102B46] text-white sticky top-0">
                <tr>
                  <th className="p-2.5">الرقم</th>
                  <th className="p-2.5">الاسم المستعار</th>
                  <th className="p-2.5">المقعد</th>
                  <th className="p-2.5">المسمى</th>
                  <th className="p-2.5">رصيد الإجازة</th>
                  <th className="p-2.5">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {deptTeam.map((e) => {
                  const pos = positions.find((p) => p.position_id === e.position_id);
                  return (
                    <tr key={e.employee_id} className="border-b border-[#E9D8BD] dark:border-[#1E8F91]/20">
                      <td className="p-2.5 font-bold tabular-nums text-[#1E8F91]">{e.employee_id}</td>
                      <td className="p-2.5 font-bold">{e.display_name_alias}</td>
                      <td className="p-2.5 tabular-nums">{e.seat_id}</td>
                      <td className="p-2.5">{pos?.title_ar}</td>
                      <td className="p-2.5 tabular-nums">{e.leave_balance_days} يوماً</td>
                      <td className="p-2.5">{e.employment_status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Team Leave Approvals */}
          <div className="pt-4 border-t border-[#E9D8BD]">
            <h3 className="text-sm font-bold mb-2">طلبات إجازات الفريق ({deptLeaves.length})</h3>
            <div className="space-y-2 text-xs">
              {deptLeaves.map((l) => (
                <div
                  key={l.leave_id}
                  className="p-3 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] flex items-center justify-between"
                >
                  <div>
                    <b>{l.leave_id}</b> — الموظف {l.employee_id} · {l.leave_type} ({l.requested_days} أيام: {l.start_date} إلى {l.end_date})
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{l.status}</span>
                    {l.status === 'PendingManager' && (
                      <>
                        <button
                          onClick={() => decideLeaveRequest(l.leave_id, 'Approved', `موافقة مدير القسم ${mgrDept.department_id}`)}
                          className="px-2.5 py-1 bg-[#1E8F91] text-white rounded font-bold"
                        >
                          اعتماد
                        </button>
                        <button
                          onClick={() => decideLeaveRequest(l.leave_id, 'Rejected', 'تعارض مع جدول مناوبات القسم')}
                          className="px-2.5 py-1 bg-[#D97965] text-white rounded font-bold"
                        >
                          رفض
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Performance Evaluation & IDP Form */}
        <div className="lg:col-span-5 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
          <h2 className="text-base font-bold">تقييم أداء عضو الفريق واقتراح خطة تطوير (IDP)</h2>
          <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
            الأوزان التدريبية المعتمدة: 50% نتائج ومؤشرات · 30% كفايات وسلوك · 20% تعلم وتحسين.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitPerformanceReview({
                employee_id: mgrEvalEmpId,
                cycle_id: cycles[0].cycle_id,
                goals_score: mgrGoalsScore,
                competencies_score: mgrCompScore,
                learning_score: mgrLearnScore,
                manager_feedback: mgrFeedback,
                idp_plan: mgrIdp,
              });
            }}
            className="space-y-3 text-xs"
          >
            <div>
              <label className="block font-bold mb-1">اختر الموظف من فريقك</label>
              <select
                value={mgrEvalEmpId}
                onChange={(e) => setMgrEvalEmpId(e.target.value)}
                className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
              >
                {deptTeam.map((member) => (
                  <option key={member.employee_id} value={member.employee_id}>
                    {member.employee_id} — {member.display_name_alias}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-bold mb-1">النتائج (50%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={mgrGoalsScore}
                  onChange={(e) => setMgrGoalsScore(Number(e.target.value))}
                  className="w-full border border-[#E9D8BD] rounded-lg px-2 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30] tabular-nums"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">الكفايات (30%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={mgrCompScore}
                  onChange={(e) => setMgrCompScore(Number(e.target.value))}
                  className="w-full border border-[#E9D8BD] rounded-lg px-2 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30] tabular-nums"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">التعلم (20%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={mgrLearnScore}
                  onChange={(e) => setMgrLearnScore(Number(e.target.value))}
                  className="w-full border border-[#E9D8BD] rounded-lg px-2 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30] tabular-nums"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] font-bold flex justify-between">
              <span>المجموع الموزون المحسوب تلقائياً:</span>
              <span className="text-[#1E8F91] tabular-nums">
                {Math.round(mgrGoalsScore * 0.5 + mgrCompScore * 0.3 + mgrLearnScore * 0.2)}%
              </span>
            </div>

            <div>
              <label className="block font-bold mb-1">ملاحظات المدير المباشر وجلسة التغذية الراجعة</label>
              <textarea
                rows={2}
                value={mgrFeedback}
                onChange={(e) => setMgrFeedback(e.target.value)}
                className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">خطة التطوير الفردية (IDP) والتوصية التدريبية</label>
              <textarea
                rows={2}
                value={mgrIdp}
                onChange={(e) => setMgrIdp(e.target.value)}
                className="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 bg-[#F7F5F0] dark:bg-[#0B1D30]"
              />
            </div>

            <button type="submit" className="w-full py-2.5 bg-[#1E8F91] text-white font-bold rounded-lg">
              اعتماد التقييم وحفظ خطة التطوير
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
