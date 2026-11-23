import React, { useState } from 'react';
import { useEnterprise } from '../context/EnterpriseContext';

interface ODAndOperationsLabProps {
  mode: 'od' | 'ops' | 'lab';
}

export const ODAndOperationsLab: React.FC<ODAndOperationsLabProps> = ({ mode }) => {
  const {
    departments,
    positions,
    seats,
    employees,
    vacancies,
    applications,
    leaves,
    trainingCatalog,
    enrollments,
    reviews,
    services,
    bookings,
    tickets,
    strategicGoals,
    successionPlans,
    surveys,
    auditEvents,
    lastImportReport,
    enrollInTraining,
    completeTraining,
    updateBookingStatus,
    createTicket,
    updateTicketStatus,
    submitSurveyResponse,
    runImportSimulation,
    executeTrainingScenario,
    checkAccessAndAudit,
    resetSimulationData,
  } = useEnterprise();

  // OD Sub-tabs
  const [odTab, setOdTab] = useState<'strategy' | 'performance_ld' | 'skill_gap' | 'succession_survey'>('strategy');

  // Survey Form State
  const [surveyDept, setSurveyDept] = useState<string>('D02');
  const [surveyEnps, setSurveyEnps] = useState<number>(9);
  const [surveySat, setSurveySat] = useState<number>(90);
  const [surveyComment, setSurveyComment] = useState<string>('');

  // Operations New Ticket State
  const [newTktTitle, setNewTktTitle] = useState<string>('');
  const [newTktCat, setNewTktCat] = useState<
    'طلب خدمة ضيف' | 'شكوى عميل' | 'صيانة ومرافق' | 'مبادرة استدامة' | 'دعم موارد بشرية وتقنية'
  >('طلب خدمة ضيف');
  const [newTktDept, setNewTktDept] = useState<string>('D02');
  const [newTktPriority, setNewTktPriority] = useState<'عالية' | 'متوسطة' | 'منخفضة'>('متوسطة');

  // Lab & Import State
  const [csvRawInput, setCsvRawInput] = useState<string>('');
  const [scenarioResultLog, setScenarioResultLog] = useState<string>('');

  // ============================================================================
  // 12. ORGANIZATIONAL DEVELOPMENT & TALENT MANAGEMENT (التطوير المؤسسي وإدارة المواهب)
  // ============================================================================
  if (mode === 'od') {
    // Live eNPS calculation from actual survey responses
    const totalResponses = surveys.length;
    const promoters = surveys.filter((s) => s.enps_score >= 9).length;
    const detractors = surveys.filter((s) => s.enps_score <= 6).length;
    const calculatedEnps =
      totalResponses > 0 ? Math.round(((promoters - detractors) / totalResponses) * 100) : 0;
    const avgSatisfaction =
      totalResponses > 0
        ? Math.round(surveys.reduce((sum, s) => sum + s.satisfaction_pct, 0) / totalResponses)
        : 0;

    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-[#102B46] p-6 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
          <div className="text-xs text-[#1E8F91] font-bold mb-1">
            الوحدة 12 — التطوير المؤسسي وإدارة المواهب (Organizational Development & Talent Management)
          </div>
          <h1 className="text-2xl font-bold mb-2">إدارة الاستراتيجية، الأداء، التعلم، فجوات المهارات، والتعاقب الوظيفي</h1>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { id: 'strategy', label: '12.A الأهداف الاستراتيجية ومؤشرات KPIs (2027–2029)' },
              { id: 'performance_ld', label: '12.B & C إدارة الأداء والتعلم والتطوير (L&D)' },
              { id: 'skill_gap', label: '12.D تحليل فجوات المهارات (Skill Gap Analysis)' },
              { id: 'succession_survey', label: '12.E & F التعاقب الوظيفي واستطلاعات الموظفين (eNPS)' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setOdTab(t.id as typeof odTab)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold ${
                  odTab === t.id
                    ? 'bg-[#102B46] dark:bg-[#1E8F91] text-white'
                    : 'bg-[#F7F5F0] dark:bg-[#0B1D30] text-[#354554] dark:text-[#E9D8BD]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 12.A STRATEGY & KPIS */}
        {odTab === 'strategy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategicGoals.map((goal) => {
              const dept = departments.find((d) => d.department_id === goal.owner_department_id);
              const pos = positions.find((p) => p.position_id === goal.owner_position_id);
              return (
                <div
                  key={goal.goal_id}
                  className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-3 text-xs"
                >
                  <div className="flex items-center justify-between text-[#1E8F91] font-bold">
                    <span>{goal.pillar_name}</span>
                    <span>المالك: {dept?.name_ar} ({goal.owner_department_id})</span>
                  </div>
                  <h2 className="text-base font-bold">{goal.title}</h2>
                  <div className="p-3 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] space-y-1">
                    <div><b>المسؤول الوظيفي:</b> {pos?.title_ar} ({goal.owner_position_id})</div>
                    <div><b>مؤشر الأداء (KPI):</b> {goal.kpi_name}</div>
                    <div><b>المعادلة المعتمدة:</b> {goal.kpi_formula}</div>
                    <div><b>خط الأساس:</b> {goal.baseline_value} | <b>المستهدف:</b> {goal.target_2028_2029}</div>
                  </div>
                  <div>
                    <div className="font-bold mb-1">المبادرات المسجلة:</div>
                    <ul className="list-disc list-inside text-[#354554] dark:text-[#E9D8BD] space-y-1">
                      {goal.initiatives.map((init, i) => (
                        <li key={i}>{init}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-1 tabular-nums">
                      <span>نسبة تحقيق الهدف في المحاكاة</span>
                      <span className="text-[#1E8F91]">{goal.current_simulated_progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[#F7F5F0] dark:bg-[#0B1D30] rounded-full overflow-hidden">
                      <div className="bg-[#1E8F91] h-full" style={{ width: `${goal.current_simulated_progress}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 12.B & C PERFORMANCE & L&D */}
        {odTab === 'performance_ld' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
              <h2 className="text-lg font-bold">دليل البرامج التدريبية (Training Catalog) والالتحاق</h2>
              <div className="space-y-3 text-xs">
                {trainingCatalog.map((prog) => {
                  const progEnr = enrollments.filter((e) => e.training_id === prog.training_id);
                  return (
                    <div
                      key={prog.training_id}
                      className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] space-y-1.5"
                    >
                      <div className="flex justify-between font-bold text-[#1E8F91]">
                        <span>
                          {prog.training_id} · {prog.skill_category}
                        </span>
                        <span className="tabular-nums">{prog.duration_hours} ساعة · {prog.cost_jod_simulated} JOD</span>
                      </div>
                      <div className="font-bold text-sm">{prog.title}</div>
                      <div className="text-[#354554] dark:text-[#E9D8BD]">
                        أسلوب التنفيذ: {prog.delivery_mode} | الإدارات المستهدفة: {prog.target_departments.join(', ')} | الملتحقون:{' '}
                        <b className="tabular-nums">{progEnr.length}</b>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
              <h2 className="text-lg font-bold">قياس أثر التدريب (التقييم القبلي والبعدي وأثر 30 يوماً)</h2>
              <div className="space-y-3 text-xs">
                {enrollments.map((enr) => {
                  const emp = employees.find((e) => e.employee_id === enr.employee_id);
                  const prog = trainingCatalog.find((t) => t.training_id === enr.training_id);
                  return (
                    <div
                      key={enr.enrollment_id}
                      className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] space-y-2"
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>
                          {emp?.display_name_alias} ({enr.employee_id}) — {prog?.title}
                        </span>
                        <span className="text-[#1E8F91]">{enr.completion_status}</span>
                      </div>
                      <div className="flex items-center gap-4 tabular-nums">
                        <span>الاختبار القبلي: <b>{enr.score_before}%</b></span>
                        <span>←</span>
                        <span>الاختبار البعدي: <b className="text-[#1E8F91]">{enr.score_after}%</b></span>
                        <span>(التحسن: <b>+{enr.score_after - enr.score_before}%</b>)</span>
                      </div>
                      {enr.impact_30d_notes && (
                        <div className="text-[#354554] dark:text-[#E9D8BD]">أثر 30 يوماً: {enr.impact_30d_notes}</div>
                      )}
                      {enr.completion_status !== 'Completed' && (
                        <button
                          onClick={() =>
                            completeTraining(enr.enrollment_id, 92, 'تحسن موثق في معالجة طلبات وشكاوى الضيوف بعد 30 يوماً.')
                          }
                          className="px-3 py-1 bg-[#1E8F91] text-white rounded font-bold"
                        >
                          توثيق إتمام التدريب وقياس الأثر (92%)
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 12.D SKILL GAP ANALYSIS */}
        {odTab === 'skill_gap' && (
          <div className="bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
            <h2 className="text-lg font-bold">تحليل فجوات المهارات (Skill Gap Analysis — السيناريو 09)</h2>
            <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
              مقارنة المهارات المطلوبة للمسمى الوظيفي (المستوى المستهدف 4/4) مع المهارات المتوفرة لدى الموظف، وتحديد مستوى الأولوية والتدريب المقترح:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#102B46] text-white">
                  <tr>
                    <th className="p-3">الموظف</th>
                    <th className="p-3">المسمى والقسم</th>
                    <th className="p-3">المهارة المطلوبة</th>
                    <th className="p-3">المستوى الحالي</th>
                    <th className="p-3">الفجوة</th>
                    <th className="p-3">مستوى الأولوية</th>
                    <th className="p-3">التدريب المقترح والإجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.slice(5, 18).map((emp) => {
                    const pos = positions.find((p) => p.position_id === emp.position_id);
                    const targetSkill = emp.skills[0] || { name: 'إدارة الشكاوى', level: 2 };
                    const gap = 4 - targetSkill.level;
                    const recommendedProg =
                      emp.department_id === 'D02'
                        ? trainingCatalog[0]
                        : emp.department_id === 'D04'
                        ? trainingCatalog[1]
                        : trainingCatalog[4];

                    return (
                      <tr key={emp.employee_id} className="border-b border-[#E9D8BD] dark:border-[#1E8F91]/20">
                        <td className="p-2.5 font-bold">
                          {emp.display_name_alias} ({emp.employee_id})
                        </td>
                        <td className="p-2.5">
                          {pos?.title_ar} ({emp.department_id})
                        </td>
                        <td className="p-2.5 font-bold">{targetSkill.name}</td>
                        <td className="p-2.5 tabular-nums">{targetSkill.level} / 4</td>
                        <td className="p-2.5 tabular-nums font-bold text-[#D97965]">
                          {gap > 0 ? `-${gap} درجات` : 'لا توجد فجوة'}
                        </td>
                        <td className="p-2.5 font-bold">
                          {gap >= 2 ? 'عالية (عاجلة)' : gap === 1 ? 'متوسطة' : 'مكتمل'}
                        </td>
                        <td className="p-2.5">
                          {gap > 0 ? (
                            <button
                              onClick={() => enrollInTraining(emp.employee_id, recommendedProg.training_id)}
                              className="px-2.5 py-1 bg-[#1E8F91] text-white rounded font-bold"
                            >
                              إلحاق بـ {recommendedProg.training_id} ({recommendedProg.title.slice(0, 22)}...)
                            </button>
                          ) : (
                            <span className="text-[#1E8F91] font-bold">مستوفى</span>
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

        {/* 12.E & F SUCCESSION PLANNING & EMPLOYEE SURVEYS */}
        {odTab === 'succession_survey' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
              <h2 className="text-lg font-bold">التعاقب الوظيفي والوظائف الحرجة (Succession Planning)</h2>
              <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
                تنويه حوكمة: لا ينشئ النظام أحكاماً قطعية عن قابلية ترقية موظف اعتماداً على تقييم آلي فقط؛ تخضع جميع خطط الإحلال لمراجعة لجنة الموارد البشرية والإدارة العليا.
              </p>
              <div className="space-y-3 text-xs">
                {successionPlans.map((plan) => {
                  const pos = positions.find((p) => p.position_id === plan.critical_position_id);
                  const incumbent = employees.find((e) => e.employee_id === plan.incumbent_employee_id);
                  const successor = employees.find((e) => e.employee_id === plan.candidate_employee_id);
                  return (
                    <div
                      key={plan.plan_id}
                      className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] space-y-2"
                    >
                      <div className="flex justify-between font-bold text-[#1E8F91]">
                        <span>
                          الوظيفة الحرجة: {pos?.title_ar} ({plan.critical_position_id})
                        </span>
                        <span>الجاهزية: {plan.readiness_level}</span>
                      </div>
                      <div>
                        الشاغل الحالي: <b>{incumbent?.display_name_alias} ({plan.incumbent_employee_id})</b> ← البديل المرشح للتأهيل:{' '}
                        <b>{successor?.display_name_alias} ({plan.candidate_employee_id})</b>
                      </div>
                      <div>
                        <b>خطة التأهيل القيادي:</b> {plan.development_actions.join(' · ')}
                      </div>
                      <div className="text-[#354554] dark:text-[#E9D8BD]">
                        <b>ملاحظة اللجنة البشرية:</b> {plan.committee_review_note}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
              <h2 className="text-lg font-bold">استبيان رضا الموظفين ومؤشر الولاء (eNPS)</h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD]">
                  <div className="text-[#354554] dark:text-[#E9D8BD]">مؤشر eNPS الفعلي ({totalResponses} استجابات)</div>
                  <div className="text-2xl font-bold text-[#1E8F91] tabular-nums mt-1">+{calculatedEnps}</div>
                </div>
                <div className="p-3 rounded-lg bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD]">
                  <div className="text-[#354554] dark:text-[#E9D8BD]">متوسط الرضا الوظيفي</div>
                  <div className="text-2xl font-bold tabular-nums mt-1">{avgSatisfaction}%</div>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitSurveyResponse(surveyDept, surveyEnps, surveySat, surveyComment);
                  setSurveyComment('');
                }}
                className="space-y-3 text-xs pt-2 border-t border-[#E9D8BD]"
              >
                <div className="font-bold">إضافة استجابة تجريبية جديدة للاستبيان:</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold mb-1">الإدارة</label>
                    <select
                      value={surveyDept}
                      onChange={(e) => setSurveyDept(e.target.value)}
                      className="w-full border border-[#E9D8BD] rounded px-2 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                    >
                      {departments.map((d) => (
                        <option key={d.department_id} value={d.department_id}>
                          {d.department_id} — {d.name_ar}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold mb-1">درجة التوصية eNPS (0–10)</label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={surveyEnps}
                      onChange={(e) => setSurveyEnps(Number(e.target.value))}
                      className="w-full border border-[#E9D8BD] rounded px-2 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30] tabular-nums"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold mb-1">ملاحظة الموظف حول بيئة العمل</label>
                  <input
                    value={surveyComment}
                    onChange={(e) => setSurveyComment(e.target.value)}
                    placeholder="اكتب رأيك التدريبي..."
                    className="w-full border border-[#E9D8BD] rounded px-3 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30]"
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-[#1E8F91] text-white font-bold rounded-lg">
                  تسجيل الاستجابة وإعادة حساب eNPS
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // 13. TOURISM & HOSPITALITY OPERATIONS (العمليات السياحية والتشغيلية)
  // ============================================================================
  if (mode === 'ops') {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-[#102B46] p-6 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30">
          <div className="text-xs text-[#1E8F91] font-bold mb-1">
            الوحدة 13 — العمليات السياحية والتشغيلية وربطها بالموارد البشرية
          </div>
          <h1 className="text-2xl font-bold mb-1">
            إدارة الحجوزات، طلبات الضيوف، شكاوى العملاء، الصيانة، والاستدامة
          </h1>
          <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
            ترتبط كل عملية تشغيلية بالقسم المختص (`D01–D10`) والموظف المسؤول، لتدريب المستخدمين على العلاقة المباشرة بين جودة العمليات السياحية وتخطيط الموارد البشرية.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Simulated Bookings Management */}
          <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
            <h2 className="text-base font-bold">إدارة الحجوزات السياحية الواردة ({bookings.length})</h2>
            <div className="space-y-3 text-xs">
              {bookings.map((b) => {
                const srv = services.find((s) => s.service_id === b.service_id);
                return (
                  <div
                    key={b.booking_id}
                    className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <div className="font-bold text-[#1E8F91] tabular-nums">
                        {b.booking_id} · القسم المسؤول: {srv?.responsible_department_id || 'D02'}
                      </div>
                      <div className="font-bold text-sm mt-0.5">{srv?.name}</div>
                      <div className="text-[#354554] dark:text-[#E9D8BD] tabular-nums">
                        الضيف: {b.guest_alias} · الزوار: {b.visitors_count} · المبلغ: <b>{b.amount_jod} JOD</b> ({b.start_date} إلى {b.end_date})
                      </div>
                    </div>
                    <select
                      value={b.booking_status}
                      onChange={(e) =>
                        updateBookingStatus(b.booking_id, e.target.value as typeof b.booking_status)
                      }
                      className="border border-[#E9D8BD] rounded px-2.5 py-1.5 text-xs font-bold bg-white dark:bg-[#102B46]"
                    >
                      <option value="Confirmed">Confirmed (مؤكد)</option>
                      <option value="Pending">Pending (قيد المراجعة)</option>
                      <option value="Completed">Completed (مكتمل)</option>
                      <option value="Cancelled">Cancelled (ملغى)</option>
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Operational Tickets, Guest Requests, Complaints & Maintenance */}
          <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
            <h2 className="text-base font-bold">تذاكر العمليات، طلبات الضيوف، الشكاوى، والصيانة ({tickets.length})</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newTktTitle.trim()) return;
                createTicket({
                  title: newTktTitle,
                  category: newTktCat,
                  department_id: newTktDept,
                  related_employee_id: 'E005',
                  owner_role: `مدير القسم ${newTktDept}`,
                  priority: newTktPriority,
                });
                setNewTktTitle('');
              }}
              className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs pb-4 border-b border-[#E9D8BD]"
            >
              <input
                required
                value={newTktTitle}
                onChange={(e) => setNewTktTitle(e.target.value)}
                placeholder="عنوان الطلب / الشكوى / الصيانة..."
                className="sm:col-span-2 border border-[#E9D8BD] rounded-lg px-3 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30]"
              />
              <select
                value={newTktCat}
                onChange={(e) => setNewTktCat(e.target.value as typeof newTktCat)}
                className="border border-[#E9D8BD] rounded-lg px-2 py-1.5 bg-[#F7F5F0] dark:bg-[#0B1D30]"
              >
                <option value="طلب خدمة ضيف">طلب خدمة ضيف</option>
                <option value="شكوى عميل">شكوى عميل</option>
                <option value="صيانة ومرافق">صيانة ومرافق</option>
                <option value="مبادرة استدامة">مبادرة استدامة</option>
              </select>
              <button type="submit" className="bg-[#1E8F91] text-white font-bold rounded-lg px-3 py-1.5">
                + إضافة تذكرة
              </button>
            </form>

            <div className="space-y-2.5 text-xs">
              {tickets.map((t) => (
                <div
                  key={t.ticket_id}
                  className="p-3.5 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] flex flex-wrap items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-bold text-[#1E8F91]">
                      {t.ticket_id} · {t.category} · القسم: {t.department_id} · الأولوية: {t.priority}
                    </div>
                    <div className="font-bold mt-0.5">{t.title}</div>
                    {t.resolution_notes && (
                      <div className="text-[#354554] dark:text-[#E9D8BD] mt-0.5">المعالجة: {t.resolution_notes}</div>
                    )}
                  </div>
                  <select
                    value={t.status}
                    onChange={(e) => updateTicketStatus(t.ticket_id, e.target.value as typeof t.status)}
                    className="border border-[#E9D8BD] rounded px-2 py-1 text-xs font-bold bg-white dark:bg-[#102B46]"
                  >
                    <option value="مفتوحة">مفتوحة</option>
                    <option value="قيد المعالجة">قيد المعالجة</option>
                    <option value="مغلقة">مغلقة</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 14, 18, 19, 21. TRAINING SCENARIOS LAB, SEED IMPORTER, QA & HANDOFF
  // ============================================================================
  const SCENARIOS = [
    { num: 1, title: 'السيناريو 01: طلب واعتماد شاغر جديد', desc: 'مدير قسم يطلب تعيين موظف جديد، والموارد البشرية تعتمد الشاغر وتنشره في صفحة الوظائف.' },
    { num: 2, title: 'السيناريو 02: تقديم مرشح عبر الموقع إلى ATS', desc: 'متقدم يقدم طلباً إلكترونياً عبر الموقع ويظهر طلبه مباشرة في نظام تتبع المتقدمين.' },
    { num: 3, title: 'السيناريو 03: لجنة المقابلات المنظمة (5 معايير)', desc: 'تقييم المرشح وفق معايير التواصل، التعامل مع ضيف، حل مشكلة، سلامة، مرونة العمل (سلم 1–4).' },
    { num: 4, title: 'السيناريو 04: التعيين وربط المقعد الشاغر', desc: 'المتقدم المقبول يتحول إلى موظف افتراضي ويُربط بمقعد وظيفي شاغر دون ازدواج.' },
    { num: 5, title: 'السيناريو 05: بوابة الموظف وبرنامج التهيئة', desc: 'الموظف الجديد يدخل بوابة الموظفين، ويشاهد بياناته ويحدث مهام برنامج التهيئة 1/7/30 يوماً.' },
    { num: 6, title: 'السيناريو 06: دورة الإجازة وتحديث الرصيد', desc: 'يقدم الموظف طلب إجازة، ويظهر للمدير لاعتماده، ثم تُحدّث الحالة والرصيد التجريبي.' },
    { num: 7, title: 'السيناريو 07: خطة التدريب ومعالجة الفجوة المهارية', desc: 'ينشئ مدير HR خطة تدريب لموظفي الاستقبال في إدارة الشكاوى ويقيس نسبة الإكمال.' },
    { num: 8, title: 'السيناريو 08: تقييم الأداء الموزون (50/30/20)', desc: 'تقييم أداء موظف بالأوزان المعتمدة وربط النتيجة بخطة تطوير فردية ومسار مهني.' },
  ];

  return (
    <div className="space-y-6">
      {/* Interactive 8/12 Training Scenarios Runner */}
      <div className="bg-white dark:bg-[#102B46] p-6 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs text-[#1E8F91] font-bold">الوحدة 18 و19 — مختبر سيناريوهات المحاكاة التدريبية والاختبارات</div>
            <h1 className="text-2xl font-bold">تشغيل السيناريوهات التدريبية والتحقق من سلامة البيانات</h1>
          </div>
          <button
            onClick={resetSimulationData}
            className="px-4 py-2 border border-[#D97965] text-[#D97965] hover:bg-[#D97965] hover:text-white rounded-lg text-xs font-bold transition-colors"
          >
            إعادة ضبط بيانات المحاكاة للحالة الابتدائية
          </button>
        </div>

        {scenarioResultLog && (
          <div className="p-4 rounded-xl bg-[#1E8F91]/15 border border-[#1E8F91] text-xs font-bold">
            نتيجة التنفيذ الفوري: {scenarioResultLog}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SCENARIOS.map((sc) => (
            <div
              key={sc.num}
              className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] dark:border-[#1E8F91]/30 flex flex-col justify-between text-xs"
            >
              <div>
                <div className="font-bold text-[#1E8F91] mb-1">{sc.title}</div>
                <p className="text-[#354554] dark:text-[#E9D8BD] leading-relaxed mb-3">{sc.desc}</p>
              </div>
              <button
                onClick={() => {
                  const res = executeTrainingScenario(sc.num);
                  setScenarioResultLog(res);
                }}
                className="w-full py-2 bg-[#102B46] dark:bg-[#1E8F91] hover:bg-[#1E8F91] text-white font-bold rounded-lg transition-colors"
              >
                تشغيل السيناريو عملياً
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Seed Data CSV/JSON Importer & Validation Report (Section 14) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
          <h2 className="text-lg font-bold">استيراد البيانات والتحقق المرجعي (Seed Data Importer — CSV / JSON)</h2>
          <p className="text-xs text-[#354554] dark:text-[#E9D8BD]">
            ينفذ النظام الخطوات الـ 7 الإلزامية: قراءة الجداول، مطابقة الحقول، التحقق من المعرفات، اكتشاف المكرر، منع تكرار الاستيراد، إنشاء العلاقات، وعرض التقرير.
          </p>
          <textarea
            rows={3}
            value={csvRawInput}
            onChange={(e) => setCsvRawInput(e.target.value)}
            placeholder="الصق هنا بيانات CSV أو JSON إضافية من تبويبات الجداول (أو اضغط فحص قاعدة البيانات الحالية)..."
            className="w-full border border-[#E9D8BD] rounded-lg p-3 text-xs bg-[#F7F5F0] dark:bg-[#0B1D30]"
          />
          <button
            onClick={() => runImportSimulation(csvRawInput || undefined)}
            className="px-5 py-2.5 bg-[#1E8F91] text-white text-xs font-bold rounded-lg"
          >
            تشغيل فحص واستيراد البيانات وعرض التقرير
          </button>

          {lastImportReport && (
            <div className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#1E8F91] text-xs space-y-1.5">
              <div className="font-bold text-[#1E8F91]">
                تقرير الاستيراد الموثق ({lastImportReport.timestamp}) — الحالة: {lastImportReport.status}
              </div>
              <div className="tabular-nums">
                السجلات المقروءة: <b>{lastImportReport.recordsRead}</b> · الحقول المطابقة: <b>{lastImportReport.matchedFields} جدولاً</b> · المكرر المستبعد: <b>{lastImportReport.duplicatesSkipped}</b>
              </div>
              <ul className="space-y-1 text-[#354554] dark:text-[#E9D8BD]">
                {lastImportReport.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Security Audit Log (audit_events) */}
        <div className="lg:col-span-6 bg-white dark:bg-[#102B46] p-6 rounded-xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">سجل التدقيق الأمني والعمليات (audit_events — {auditEvents.length})</h2>
            <button
              onClick={() => checkAccessAndAudit('اختبار اختراق صلاحيات 403', ['super_admin'])}
              className="px-3 py-1 bg-[#D97965]/20 text-[#D97965] border border-[#D97965] rounded text-xs font-bold"
            >
              توليد اختبار صلاحيات
            </button>
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto text-xs">
            {auditEvents.map((evt) => (
              <div
                key={evt.event_id}
                className={`p-3 rounded-lg border ${
                  evt.status === 'DENIED_403'
                    ? 'bg-red-950/15 border-red-500/40'
                    : 'bg-[#F7F5F0] dark:bg-[#0B1D30] border-[#E9D8BD] dark:border-[#1E8F91]/20'
                }`}
              >
                <div className="flex justify-between font-bold tabular-nums">
                  <span>
                    {evt.event_id} · الدور: {evt.actor_role} · الكيان: {evt.entity_type} ({evt.entity_id})
                  </span>
                  <span className={evt.status === 'DENIED_403' ? 'text-red-600' : 'text-[#1E8F91]'}>
                    {evt.status}
                  </span>
                </div>
                <div className="mt-1">{evt.action}</div>
                <div className="text-[11px] text-[#354554] dark:text-[#E9D8BD] tabular-nums mt-0.5">
                  التوقيت: {evt.occurred_at} | البيانات المختزلة: {evt.metadata_redacted}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 21: Project Handoff & Architecture Documentation */}
      <div className="bg-white dark:bg-[#102B46] p-6 rounded-2xl border border-[#E9D8BD] dark:border-[#1E8F91]/30 space-y-4 text-xs">
        <div className="text-[#1E8F91] font-bold">الوحدة 21 — وثيقة التسليم النهائي وملف الانتقال (Project Handoff & Architecture Report)</div>
        <h2 className="text-lg font-bold">تقرير حالة التنفيذ، توثيق البنية، وإعدادات البيئة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] space-y-1.5">
            <div className="font-bold text-sm text-[#1E8F91]">١. ما تم إنجازه وتفعيله بالكامل (100%)</div>
            <p className="text-[#354554] dark:text-[#E9D8BD] leading-relaxed">
              • الموقع السياحي العام بصفحاته الـ 11 وهوية بلو برادايس المعتمدة وخط Arial.<br />
              • قاعدة البيانات المترابطة (10 إدارات، 39 مسمى P001–P039، 96 مقعداً S001–S096، 72 موظفاً E001–E072، 24 شاغراً).<br />
              • لوحة القيادة التنفيذية وHRIS وCMS.<br />
              • نظام ATS ولجنة المقابلات وبوابات الموظف والمدير ووحدة التطوير المؤسسي (OD).<br />
              • أداة تصدير وتحميل ملف HTML مستقل بضغطة زر.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] space-y-1.5">
            <div className="font-bold text-sm text-[#236A9F] dark:text-[#E9D8BD]">٢. إعدادات Firebase والبيئة الإنتاجية المستقبلية</div>
            <p className="text-[#354554] dark:text-[#E9D8BD] leading-relaxed">
              • يعمل التطبيق حالياً بنمط المحاكاة الدائمة محلياً مع التحقق المرجعي الكامل.<br />
              • عند الرغبة بالانتقال إلى Cloud Firestore وFirebase Authentication، يتم وضع المتغيرات في ملف البيئة الخادمي دون كشف أي مفاتيح سرية في المتصفح، مع تطبيق قواعد `firestore.rules` المبنية على الأدوار الـ 11.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#F7F5F0] dark:bg-[#0B1D30] border border-[#E9D8BD] space-y-1.5">
            <div className="font-bold text-sm text-[#D97965]">٣. حسم التعارضات الموثقة في المرجع المعرفي</div>
            <p className="text-[#354554] dark:text-[#E9D8BD] leading-relaxed">
              • <b>المسميات الوظيفية:</b> اعتُمد الجدول الأحدث المكون من 39 مسمى (P001–P039) بمجموع 96 مقعداً بدلاً من الإشارة القديمة (P035).<br />
              • <b>الشعار:</b> اعتُمد الشعار الهندسي BP المستوحى من أفق البحر وقوس الشمس دون طائرة كخيار افتراضي وفق أحدث دليل هوية، مع إتاحة التبديل من CMS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
