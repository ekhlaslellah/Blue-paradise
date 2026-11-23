import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RoleId,
  Department,
  Position,
  Seat,
  Employee,
  Location,
  RoleDefinition,
  UserAccount,
  Vacancy,
  Application,
  ATSStage,
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
  JobAvailabilityStatus,
  GoogleFormsIntegrationConfig,
} from '../types/enterprise';
import {
  INITIAL_CMS,
  INITIAL_LOCATIONS,
  INITIAL_DEPARTMENTS,
  INITIAL_POSITIONS,
  INITIAL_SEATS,
  INITIAL_EMPLOYEES,
  INITIAL_ROLES,
  INITIAL_USERS,
  INITIAL_VACANCIES,
  INITIAL_APPLICATIONS,
  INITIAL_INTERVIEWS,
  INITIAL_INTERVIEW_SCORES,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVES,
  INITIAL_TRAINING_CATALOG,
  INITIAL_ENROLLMENTS,
  INITIAL_CYCLES,
  INITIAL_REVIEWS,
  INITIAL_PAYROLL,
  INITIAL_SERVICES,
  INITIAL_BOOKINGS,
  INITIAL_TICKETS,
  INITIAL_STRATEGIC_GOALS,
  INITIAL_SUCCESSION_PLANS,
  INITIAL_SURVEYS,
  INITIAL_AUDIT_EVENTS,
  INITIAL_CAREER_JOBS,
  INITIAL_FORMS_CONFIG,
} from '../data/seedData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

export interface ImportReport {
  timestamp: string;
  sourceName: string;
  recordsRead: number;
  matchedFields: number;
  validIds: number;
  duplicatesSkipped: number;
  importedCount: number;
  status: 'SUCCESS' | 'PARTIAL' | 'FAILED';
  details: string[];
}

interface EnterpriseContextType {
  // UI & Session State
  lang: 'ar' | 'en';
  setLang: (l: 'ar' | 'en') => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
  currentUser: UserAccount;
  switchUserByRole: (role: RoleId) => void;
  activeEmployeeId: string;
  setActiveEmployeeId: (id: string) => void;
  activeManagerDeptId: string;
  setActiveManagerDeptId: (id: string) => void;
  toasts: ToastMessage[];
  notify: (type: ToastMessage['type'], title: string, message: string) => void;
  dismissToast: (id: string) => void;

  // 22 Tables
  cms: CMSContent;
  locations: Location[];
  departments: Department[];
  positions: Position[];
  seats: Seat[];
  employees: Employee[];
  roles: RoleDefinition[];
  users: UserAccount[];
  vacancies: Vacancy[];
  applications: Application[];
  interviews: Interview[];
  interviewScores: InterviewScore[];
  attendance: AttendanceRecord[];
  leaves: LeaveRequest[];
  trainingCatalog: TrainingProgram[];
  enrollments: TrainingEnrollment[];
  cycles: PerformanceCycle[];
  reviews: PerformanceReview[];
  payroll: PayrollRecord[];
  services: ServiceItem[];
  bookings: BookingRecord[];
  tickets: OperationalTicket[];
  strategicGoals: StrategicGoal[];
  successionPlans: SuccessionPlan[];
  surveys: SurveyResponse[];
  auditEvents: AuditEvent[];
  lastImportReport: ImportReport | null;
  careerJobs: CareerJob[];
  formsConfig: GoogleFormsIntegrationConfig;

  // Actions & Business Logic with Integrity Validation
  updateCMS: (partial: Partial<CMSContent>) => void;
  updateService: (serviceId: string, partial: Partial<ServiceItem>) => void;
  createBooking: (data: Omit<BookingRecord, 'booking_id' | 'created_at' | 'booking_status'>) => BookingRecord | null;
  updateBookingStatus: (bookingId: string, status: BookingRecord['booking_status']) => void;
  createEmployee: (data: {
    display_name_alias: string;
    seat_id: string;
    hire_date: string;
    base_salary_jod: number;
    work_email_test: string;
  }) => boolean;
  updateEmployeeStatus: (employeeId: string, status: Employee['employment_status']) => void;
  toggleOnboardingTask: (employeeId: string, taskId: string) => void;
  createVacancy: (data: {
    position_id: string;
    seat_id: string;
    employment_type: Vacancy['employment_type'];
    closing_date: string;
    requirements_ar: string[];
    job_questions: string[];
    autoPublish?: boolean;
  }) => boolean;
  approveAndPublishVacancy: (vacancyId: string) => boolean;
  submitApplication: (data: {
    vacancy_id: string;
    candidate_alias: string;
    contact_test: string;
    qualification: string;
    years_experience: number;
    skills: string[];
    answers: { question: string; answer: string }[];
    consent_flag: boolean;
  }) => Application | null;
  advanceApplicationStage: (applicationId: string, newStage: ATSStage, humanReason: string) => boolean;
  submitInterviewRubric: (
    applicationId: string,
    panelAlias: string,
    scores: { criterion_id: string; criterion_name: string; score: number; rationale: string }[],
    recommendation: Interview['recommendation']
  ) => boolean;
  hireCandidateToSeat: (applicationId: string) => Employee | null;
  submitLeaveRequest: (data: {
    employee_id: string;
    leave_type: LeaveRequest['leave_type'];
    start_date: string;
    end_date: string;
    reason: string;
  }) => boolean;
  decideLeaveRequest: (leaveId: string, decision: 'Approved' | 'Rejected', comment: string) => boolean;
  requestAttendanceCorrection: (attendanceId: string, reason: string) => void;
  approveAttendanceCorrection: (attendanceId: string) => void;
  enrollInTraining: (employeeId: string, trainingId: string) => boolean;
  completeTraining: (enrollmentId: string, scoreAfter: number, impactNotes: string) => void;
  submitPerformanceReview: (data: {
    employee_id: string;
    cycle_id: string;
    goals_score: number;
    competencies_score: number;
    learning_score: number;
    manager_feedback: string;
    idp_plan: string;
  }) => boolean;
  updatePayrollStatus: (payrollId: string, status: PayrollRecord['payment_status']) => boolean;
  createTicket: (data: Omit<OperationalTicket, 'ticket_id' | 'opened_at' | 'status'>) => void;
  updateTicketStatus: (ticketId: string, status: OperationalTicket['status'], notes?: string) => void;
  submitSurveyResponse: (departmentId: string, enpsScore: number, satisfactionPct: number, comment: string) => void;
  checkAccessAndAudit: (resource: string, requiredRoles: RoleId[]) => boolean;
  runImportSimulation: (rawInput?: string, fileName?: string) => ImportReport;
  executeTrainingScenario: (scenarioNumber: number) => string;
  resetSimulationData: () => void;

  // Career Portal & Recruitment Management Actions
  saveCareerJob: (job: CareerJob, isNew: boolean) => boolean;
  deleteCareerJob: (jobId: string) => boolean;
  toggleCareerJobPublish: (jobId: string) => boolean;
  setCareerJobAvailability: (jobId: string, status: JobAvailabilityStatus, newClosingDate?: string) => boolean;
  reorderCareerJob: (jobId: string, direction: 'up' | 'down') => boolean;
  updateCareerJobApplicationUrl: (jobId: string, url: string, useUnified: boolean) => boolean;
  updateFormsConfig: (partial: Partial<GoogleFormsIntegrationConfig>) => boolean;
  resolveApplicationUrl: (job: CareerJob) => { url: string | null; isUnified: boolean; prefilledUrl: string | null };
}

const STORAGE_KEY = 'blue_paradise_enterprise_v1_state';

const EnterpriseContext = createContext<EnterpriseContextType | undefined>(undefined);

export const EnterpriseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEY}_${key}`);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  const [cms, setCms] = useState<CMSContent>(() => loadStored('cms', INITIAL_CMS));
  const [locations] = useState<Location[]>(INITIAL_LOCATIONS);
  const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [positions] = useState<Position[]>(INITIAL_POSITIONS);
  const [seats, setSeats] = useState<Seat[]>(() => loadStored('seats', INITIAL_SEATS));
  const [employees, setEmployees] = useState<Employee[]>(() => loadStored('employees', INITIAL_EMPLOYEES));
  const [roles] = useState<RoleDefinition[]>(INITIAL_ROLES);
  const [users] = useState<UserAccount[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<UserAccount>(() => loadStored('currentUser', INITIAL_USERS[0]));
  const [activeEmployeeId, setActiveEmployeeId] = useState<string>('E008');
  const [activeManagerDeptId, setActiveManagerDeptId] = useState<string>('D02');

  const [vacancies, setVacancies] = useState<Vacancy[]>(() => loadStored('vacancies', INITIAL_VACANCIES));
  const [applications, setApplications] = useState<Application[]>(() => loadStored('applications', INITIAL_APPLICATIONS));
  const [interviews, setInterviews] = useState<Interview[]>(() => loadStored('interviews', INITIAL_INTERVIEWS));
  const [interviewScores, setInterviewScores] = useState<InterviewScore[]>(() =>
    loadStored('interviewScores', INITIAL_INTERVIEW_SCORES)
  );
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => loadStored('attendance', INITIAL_ATTENDANCE));
  const [leaves, setLeaves] = useState<LeaveRequest[]>(() => loadStored('leaves', INITIAL_LEAVES));
  const [trainingCatalog] = useState<TrainingProgram[]>(INITIAL_TRAINING_CATALOG);
  const [enrollments, setEnrollments] = useState<TrainingEnrollment[]>(() => loadStored('enrollments', INITIAL_ENROLLMENTS));
  const [cycles] = useState<PerformanceCycle[]>(INITIAL_CYCLES);
  const [reviews, setReviews] = useState<PerformanceReview[]>(() => loadStored('reviews', INITIAL_REVIEWS));
  const [payroll, setPayroll] = useState<PayrollRecord[]>(() => loadStored('payroll', INITIAL_PAYROLL));
  const [services, setServices] = useState<ServiceItem[]>(() => loadStored('services', INITIAL_SERVICES));
  const [bookings, setBookings] = useState<BookingRecord[]>(() => loadStored('bookings', INITIAL_BOOKINGS));
  const [tickets, setTickets] = useState<OperationalTicket[]>(() => loadStored('tickets', INITIAL_TICKETS));
  const [strategicGoals, setStrategicGoals] = useState<StrategicGoal[]>(() =>
    loadStored('strategicGoals', INITIAL_STRATEGIC_GOALS)
  );
  const [successionPlans] = useState<SuccessionPlan[]>(INITIAL_SUCCESSION_PLANS);
  const [surveys, setSurveys] = useState<SurveyResponse[]>(() => loadStored('surveys', INITIAL_SURVEYS));
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(() => loadStored('auditEvents', INITIAL_AUDIT_EVENTS));
  const [lastImportReport, setLastImportReport] = useState<ImportReport | null>(null);
  const [careerJobs, setCareerJobs] = useState<CareerJob[]>(() => loadStored('careerJobs', INITIAL_CAREER_JOBS));
  const [formsConfig, setFormsConfig] = useState<GoogleFormsIntegrationConfig>(() =>
    loadStored('formsConfig', INITIAL_FORMS_CONFIG)
  );

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_cms`, JSON.stringify(cms));
      localStorage.setItem(`${STORAGE_KEY}_seats`, JSON.stringify(seats));
      localStorage.setItem(`${STORAGE_KEY}_employees`, JSON.stringify(employees));
      localStorage.setItem(`${STORAGE_KEY}_currentUser`, JSON.stringify(currentUser));
      localStorage.setItem(`${STORAGE_KEY}_vacancies`, JSON.stringify(vacancies));
      localStorage.setItem(`${STORAGE_KEY}_applications`, JSON.stringify(applications));
      localStorage.setItem(`${STORAGE_KEY}_interviews`, JSON.stringify(interviews));
      localStorage.setItem(`${STORAGE_KEY}_interviewScores`, JSON.stringify(interviewScores));
      localStorage.setItem(`${STORAGE_KEY}_attendance`, JSON.stringify(attendance));
      localStorage.setItem(`${STORAGE_KEY}_leaves`, JSON.stringify(leaves));
      localStorage.setItem(`${STORAGE_KEY}_enrollments`, JSON.stringify(enrollments));
      localStorage.setItem(`${STORAGE_KEY}_reviews`, JSON.stringify(reviews));
      localStorage.setItem(`${STORAGE_KEY}_payroll`, JSON.stringify(payroll));
      localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
      localStorage.setItem(`${STORAGE_KEY}_bookings`, JSON.stringify(bookings));
      localStorage.setItem(`${STORAGE_KEY}_tickets`, JSON.stringify(tickets));
      localStorage.setItem(`${STORAGE_KEY}_strategicGoals`, JSON.stringify(strategicGoals));
      localStorage.setItem(`${STORAGE_KEY}_surveys`, JSON.stringify(surveys));
      localStorage.setItem(`${STORAGE_KEY}_auditEvents`, JSON.stringify(auditEvents));
      localStorage.setItem(`${STORAGE_KEY}_careerJobs`, JSON.stringify(careerJobs));
      localStorage.setItem(`${STORAGE_KEY}_formsConfig`, JSON.stringify(formsConfig));
    } catch {
      // Ignore storage quota issues in sandbox
    }
  }, [
    cms,
    seats,
    employees,
    currentUser,
    vacancies,
    applications,
    interviews,
    interviewScores,
    attendance,
    leaves,
    enrollments,
    reviews,
    payroll,
    services,
    bookings,
    tickets,
    strategicGoals,
    surveys,
    auditEvents,
    careerJobs,
    formsConfig,
  ]);

  const notify = (type: ToastMessage['type'], title: string, message: string) => {
    const id = `TOAST-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [{ id, type, title, message }, ...prev.slice(0, 3)]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logAudit = (
    entity_type: string,
    entity_id: string,
    action: string,
    metadata_redacted: string,
    status: 'ALLOWED' | 'DENIED_403' = 'ALLOWED'
  ) => {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const evt: AuditEvent = {
      event_id: `AUD-${String(auditEvents.length + 1).padStart(3, '0')}`,
      actor_id: currentUser.user_id,
      actor_role: currentUser.role_id,
      entity_type,
      entity_id,
      action,
      occurred_at: now,
      metadata_redacted,
      status,
    };
    setAuditEvents((prev) => [evt, ...prev]);
  };

  const switchUserByRole = (role: RoleId) => {
    const found = users.find((u) => u.role_id === role) || {
      user_id: `USR-${role.toUpperCase()}`,
      employee_id: role === 'executive' ? 'E002' : null,
      role_id: role,
      display_name: INITIAL_ROLES.find((r) => r.role_id === role)?.role_name_ar || role,
      identity_provider_uid: `sim-auth-${role}`,
      is_active: true,
    };
    setCurrentUser(found);
    logAudit('auth_session', found.user_id, `تبديل الدور النشط في المحاكاة إلى: ${found.display_name}`, `role=${role}`);
    notify('info', 'تبديل الدور والصلاحيات (RBAC)', `تم تفعيل صلاحيات: ${found.display_name}`);
  };

  const checkAccessAndAudit = (resource: string, requiredRoles: RoleId[]): boolean => {
    if (currentUser.role_id === 'super_admin' || requiredRoles.includes(currentUser.role_id)) {
      return true;
    }
    logAudit(
      resource,
      'RESTRICTED',
      `منع وصول غير مخول (403 Forbidden) بواسطة الدور ${currentUser.role_id} إلى ${resource}`,
      `required=${requiredRoles.join(',')}`,
      'DENIED_403'
    );
    notify(
      'error',
      '403 — وصول مرفوض (Access Denied)',
      `الدور الحالي (${currentUser.display_name}) لا يملك صلاحية الوصول إلى: ${resource}. تم توثيق المحاولة في سجل التدقيق.`
    );
    return false;
  };

  const updateCMS = (partial: Partial<CMSContent>) => {
    setCms((prev) => ({ ...prev, ...partial }));
    logAudit('cms_content', 'CMS-MAIN', 'تحديث محتوى وإعدادات الموقع العام عبر CMS', Object.keys(partial).join(','));
    notify('success', 'تم حفظ التعديلات', 'انعكست تحديثات المحتوى مباشرة في الموقع العام.');
  };

  const updateService = (serviceId: string, partial: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((s) => (s.service_id === serviceId ? { ...s, ...partial } : s)));
    logAudit('services', serviceId, 'تحديث بيانات/سعر خدمة سياحية تجريبية', JSON.stringify(partial));
    notify('success', 'تم تحديث الخدمة', `تم تحديث الخدمة ${serviceId} في قاعدة البيانات والموقع العام.`);
  };

  const createBooking = (
    data: Omit<BookingRecord, 'booking_id' | 'created_at' | 'booking_status'>
  ): BookingRecord | null => {
    if (!data.guest_alias.trim() || !data.service_id || data.visitors_count < 1) {
      notify('error', 'خطأ في التحقق من الحجز', 'يرجى استكمال اسم الضيف المستعار والخدمة وعدد الزوار.');
      return null;
    }
    if (data.end_date < data.start_date) {
      notify('error', 'تاريخ غير صالح', 'لا يمكن أن يكون تاريخ المغادرة قبل تاريخ الوصول.');
      return null;
    }
    const newBooking: BookingRecord = {
      ...data,
      booking_id: `BKG${String(bookings.length + 1).padStart(3, '0')}`,
      booking_status: 'Confirmed',
      created_at: new Date().toISOString().slice(0, 10),
    };
    setBookings((prev) => [newBooking, ...prev]);
    logAudit('bookings', newBooking.booking_id, `إنشاء حجز تجريبي جديد للضيف ${data.guest_alias}`, `service=${data.service_id}, amount=${data.amount_jod} JOD`);
    notify(
      'success',
      `تأكيد الحجز التجريبي #${newBooking.booking_id}`,
      'تم تسجيل الحجز في قاعدة البيانات وإرساله إلى لوحة الإدارة (تنويه: حجز تدريبي بدون مدفوعات حقيقية).'
    );
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingRecord['booking_status']) => {
    setBookings((prev) => prev.map((b) => (b.booking_id === bookingId ? { ...b, booking_status: status } : b)));
    logAudit('bookings', bookingId, `تغيير حالة الحجز التجريبي إلى ${status}`, `status=${status}`);
    notify('info', 'تحديث حالة الحجز', `تم تغيير حالة الحجز ${bookingId} إلى ${status}.`);
  };

  const createEmployee = (data: {
    display_name_alias: string;
    seat_id: string;
    hire_date: string;
    base_salary_jod: number;
    work_email_test: string;
  }): boolean => {
    if (!checkAccessAndAudit('إضافة موظف جديد', ['super_admin', 'hr_admin'])) return false;

    const targetSeat = seats.find((s) => s.seat_id === data.seat_id);
    if (!targetSeat) {
      notify('error', 'مقعد غير موجود', 'المقعد الوظيفي المحدد غير موجود في جدول المقاعد.');
      return false;
    }
    // Referential Integrity Rule: Prevent assigning two active employees to the same seat_id!
    const existingActiveOnSeat = employees.find(
      (e) => e.seat_id === data.seat_id && e.employment_status !== 'Inactive'
    );
    if (targetSeat.seat_status === 'Occupied' || existingActiveOnSeat) {
      notify(
        'error',
        'منع ازدواج المقعد الوظيفي (Integrity Violation)',
        `المقعد ${data.seat_id} مشغول حالياً بالموظف ${existingActiveOnSeat?.employee_id || targetSeat.assigned_employee_id}. لا يجوز ربط موظفين نشطين بالمقعد نفسه.`
      );
      return false;
    }

    const pos = positions.find((p) => p.position_id === targetSeat.position_id);
    const deptHead = employees.find((e) => e.department_id === targetSeat.department_id);
    const newEmpId = `E${String(employees.length + 1).padStart(3, '0')}`;

    const newEmployee: Employee = {
      employee_id: newEmpId,
      seat_id: targetSeat.seat_id,
      display_name_alias: data.display_name_alias.includes('تجريبي')
        ? data.display_name_alias
        : `${data.display_name_alias} (تجريبي)`,
      display_name_en: `Simulated Employee ${newEmpId}`,
      department_id: targetSeat.department_id,
      position_id: targetSeat.position_id,
      hire_date: data.hire_date || '2026-11-15',
      employment_status: 'Probation',
      work_email_test: data.work_email_test || `${newEmpId.toLowerCase()}@blueparadise.sim.jo`,
      manager_employee_id: deptHead ? deptHead.employee_id : 'E001',
      base_salary_jod: data.base_salary_jod || pos?.salary_min_jod || 600,
      leave_balance_days: 14,
      skills: (pos?.required_skills || ['خدمة العملاء']).map((sk) => ({ name: sk, level: 2 })),
      onboarding_tasks: [
        { id: `${newEmpId}-OB1`, phase: 'قبل اليوم الأول', title: 'إصدار الرقم الوظيفي وإسناد المقعد والصلاحيات الأولية', completed: true },
        { id: `${newEmpId}-OB2`, phase: 'اليوم الأول', title: 'التعريف بالمنشأة وسياسات السلامة والمدير المباشر', completed: false },
        { id: `${newEmpId}-OB3`, phase: 'الأسبوع الأول', title: 'إتمام تدريب معايير الضيافة وخصوصية البيانات التدريبية', completed: false },
        { id: `${newEmpId}-OB4`, phase: 'الشهر الأول (30 يوماً)', title: 'مراجعة خطة الـ 30 يوماً وتقييم بدء التشغيل', completed: false },
        { id: `${newEmpId}-OB5`, phase: 'الأيام 60 / 90', title: 'مراجعة التعلم والأداء وتثبيت المسار الوظيفي', completed: false },
      ],
      career_notes: 'تعيين جديد عبر نظام الموارد البشرية مع خطة تهيئة 30/60/90 يوماً.',
    };

    setEmployees((prev) => [newEmployee, ...prev]);
    setSeats((prev) =>
      prev.map((s) =>
        s.seat_id === targetSeat.seat_id
          ? { ...s, seat_status: 'Occupied', assigned_employee_id: newEmpId }
          : s
      )
    );
    logAudit('employees', newEmpId, `تعيين الموظف ${newEmployee.display_name_alias} على المقعد ${targetSeat.seat_id}`, `position=${targetSeat.position_id}, dept=${targetSeat.department_id}`);
    notify('success', 'تم إضافة الموظف وربط المقعد', `تم إنشاء السجل ${newEmpId} وإشغال المقعد ${targetSeat.seat_id} بنجاح.`);
    return true;
  };

  const updateEmployeeStatus = (employeeId: string, status: Employee['employment_status']) => {
    const emp = employees.find((e) => e.employee_id === employeeId);
    if (!emp) return;
    setEmployees((prev) => prev.map((e) => (e.employee_id === employeeId ? { ...e, employment_status: status } : e)));
    if (status === 'Inactive') {
      setSeats((prev) =>
        prev.map((s) => (s.seat_id === emp.seat_id ? { ...s, seat_status: 'Vacant', assigned_employee_id: null } : s))
      );
    }
    logAudit('employees', employeeId, `تحديث الحالة الوظيفية إلى ${status}`, `seat_id=${emp.seat_id}`);
    notify('info', 'تحديث حالة الموظف', `تم تغيير حالة ${emp.display_name_alias} إلى ${status}.`);
  };

  const toggleOnboardingTask = (employeeId: string, taskId: string) => {
    setEmployees((prev) =>
      prev.map((e) => {
        if (e.employee_id !== employeeId || !e.onboarding_tasks) return e;
        return {
          ...e,
          onboarding_tasks: e.onboarding_tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
        };
      })
    );
    logAudit('onboarding', employeeId, `تحديث مهمة تهيئة وظيفية ${taskId}`, `employee_id=${employeeId}`);
    notify('success', 'تحديث برنامج التهيئة', 'تم حفظ تقدم مهمة التهيئة الوظيفية.');
  };

  const createVacancy = (data: {
    position_id: string;
    seat_id: string;
    employment_type: Vacancy['employment_type'];
    closing_date: string;
    requirements_ar: string[];
    job_questions: string[];
    autoPublish?: boolean;
  }): boolean => {
    const seat = seats.find((s) => s.seat_id === data.seat_id);
    if (!seat || seat.seat_status !== 'Vacant') {
      notify('error', 'المقعد غير شاغر', 'لا يمكن فتح شاغر إلا لمقعد بحالة شاغر (Vacant).');
      return false;
    }
    const existingOpen = vacancies.find((v) => v.seat_id === data.seat_id && v.status !== 'Closed');
    if (existingOpen) {
      notify('warning', 'شاغر مفتوح مسبقاً', `يوجد شاغر مفتوح بالفعل (${existingOpen.vacancy_id}) لهذا المقعد ${data.seat_id}.`);
      return false;
    }
    const newId = `V${String(vacancies.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().slice(0, 10);
    const canPublishDirectly =
      data.autoPublish && ['super_admin', 'hr_admin', 'recruiter'].includes(currentUser.role_id);

    const newVac: Vacancy = {
      vacancy_id: newId,
      position_id: data.position_id,
      seat_id: data.seat_id,
      department_id: seat.department_id,
      opening_date: today,
      status: canPublishDirectly ? 'Published' : 'PendingApproval',
      employment_type: data.employment_type,
      publish_date: today,
      closing_date: data.closing_date || '2026-12-31',
      requirements_ar: data.requirements_ar.length ? data.requirements_ar : ['اجتياز المقابلة المنظمة وتقييم الكفايات.'],
      job_questions: data.job_questions.length ? data.job_questions : ['ما هي أبرز خبراتك المرتبطة بهذا الدور؟'],
    };

    setVacancies((prev) => [newVac, ...prev]);
    logAudit('vacancies', newId, `إنشاء شاغر وظيفي للمقعد ${data.seat_id} (${newVac.status})`, `pos=${data.position_id}`);
    notify(
      'success',
      canPublishDirectly ? `تم نشر الشاغر ${newId}` : `تم إرسال طلب الشاغر ${newId} للاعتماد`,
      canPublishDirectly
        ? 'أصبح الشاغر متاحاً للتقديم في صفحة الوظائف العامة ونظام ATS.'
        : 'تم تسجيل طلب الاحتياج وبانتظار اعتماد إدارة الموارد البشرية.'
    );
    return true;
  };

  const approveAndPublishVacancy = (vacancyId: string): boolean => {
    if (!checkAccessAndAudit('اعتماد ونشر الشواغر', ['super_admin', 'hr_admin', 'executive'])) return false;
    setVacancies((prev) =>
      prev.map((v) =>
        v.vacancy_id === vacancyId
          ? { ...v, status: 'Published', publish_date: new Date().toISOString().slice(0, 10) }
          : v
      )
    );
    logAudit('vacancies', vacancyId, 'اعتماد ونشر الشاغر في بوابة الوظائف العامة', 'status=Published');
    notify('success', 'تم اعتماد ونشر الشاغر', `الشاغر ${vacancyId} منشور الآن في صفحة التوظيف (Careers).`);
    return true;
  };

  const submitApplication = (data: {
    vacancy_id: string;
    candidate_alias: string;
    contact_test: string;
    qualification: string;
    years_experience: number;
    skills: string[];
    answers: { question: string; answer: string }[];
    consent_flag: boolean;
  }): Application | null => {
    if (!data.consent_flag) {
      notify('error', 'الموافقة مطلوبة', 'يرجى الموافقة على إقرار البيانات التدريبية الوهمية قبل إرسال الطلب.');
      return null;
    }
    if (!data.candidate_alias.trim() || !data.contact_test.trim()) {
      notify('error', 'بيانات ناقصة', 'يرجى إدخال الاسم المستعار ووسيلة التواصل الاختبارية.');
      return null;
    }
    const newId = `A${String(applications.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().slice(0, 10);
    const newApp: Application = {
      application_id: newId,
      vacancy_id: data.vacancy_id,
      candidate_alias: data.candidate_alias.includes('مرشح') ? data.candidate_alias : `${data.candidate_alias} (مرشح تجريبي)`,
      contact_test: data.contact_test,
      qualification: data.qualification,
      years_experience: data.years_experience,
      skills: data.skills,
      answers: data.answers,
      applied_at: today,
      stage: 'Applied',
      consent_flag: true,
      score_reference: Math.min(95, 70 + data.years_experience * 4 + data.skills.length * 3),
      source_channel: 'بوابة وظائف الموقع الرسمي',
      human_reviewer_notes: 'بانتظار المراجعة البشرية من اختصاصي الاستقطاب.',
      stage_history: [
        { stage: 'Applied', date: today, actor: data.candidate_alias, reason: 'تقديم طلب إلكتروني عبر بوابة الوظائف' },
      ],
    };
    setApplications((prev) => [newApp, ...prev]);
    logAudit('applications', newId, `استلام طلب توظيف جديد (${newId}) للشاغر ${data.vacancy_id}`, `candidate=${newApp.candidate_alias}`);
    notify('success', `تم استلام طلبك بنجاح — رقم المرجع ${newId}`, 'انتقل الطلب مباشرة إلى نظام تتبع المتقدمين (ATS) للمراجعة البشرية.');
    return newApp;
  };

  const advanceApplicationStage = (applicationId: string, newStage: ATSStage, humanReason: string): boolean => {
    if (!humanReason.trim()) {
      notify(
        'error',
        'تبرير المسؤول البشري إلزامي',
        'وفق سياسة بلو برادايس، لا يُسمح بنقل حالة المرشح أو رفضه آلياً دون توثيق سبب ومراجعة مسؤول بشري.'
      );
      return false;
    }
    const today = new Date().toISOString().slice(0, 10);
    setApplications((prev) =>
      prev.map((a) => {
        if (a.application_id !== applicationId) return a;
        return {
          ...a,
          stage: newStage,
          human_reviewer_notes: humanReason,
          stage_history: [
            ...a.stage_history,
            { stage: newStage, date: today, actor: currentUser.display_name, reason: humanReason },
          ],
        };
      })
    );
    logAudit('applications', applicationId, `نقل مرحلة المرشح إلى ${newStage} بمراجعة بشرية`, `reason=${humanReason}`);
    notify('success', 'تم تحديث مرحلة المرشح', `انتقل الطلب ${applicationId} إلى مرحلة ${newStage}.`);
    return true;
  };

  const submitInterviewRubric = (
    applicationId: string,
    panelAlias: string,
    scores: { criterion_id: string; criterion_name: string; score: number; rationale: string }[],
    recommendation: Interview['recommendation']
  ): boolean => {
    // Validate rubric score range 1 to 4
    for (const s of scores) {
      if (s.score < 1 || s.score > 4) {
        notify('error', 'خطأ في سلم التقييم', 'يجب أن تكون درجات معايير المقابلة ضمن السلم المعتمد (من 1 إلى 4 فقط).');
        return false;
      }
    }
    const intId = `INT-${String(interviews.length + 1).padStart(3, '0')}`;
    const newInt: Interview = {
      interview_id: intId,
      application_id: applicationId,
      scheduled_at: new Date().toISOString().slice(0, 16).replace('T', ' '),
      panel_alias: panelAlias,
      status: 'Completed',
      rubric_version: 'v1.0-5Criteria',
      recommendation,
    };
    const newScores: InterviewScore[] = scores.map((s, idx) => ({
      score_id: `SCR-${Date.now()}-${idx}`,
      interview_id: intId,
      criterion_id: s.criterion_id,
      criterion_name: s.criterion_name,
      score: s.score,
      evaluator_alias: currentUser.display_name,
      rationale: s.rationale || 'تقييم موثق حسب دليل المقابلات المنظمة.',
    }));
    const totalScore = scores.reduce((acc, item) => acc + item.score, 0); // out of 20
    const pctScore = Math.round((totalScore / 20) * 100);

    setInterviews((prev) => [newInt, ...prev]);
    setInterviewScores((prev) => [...newScores, ...prev]);
    setApplications((prev) =>
      prev.map((a) =>
        a.application_id === applicationId
          ? {
              ...a,
              stage: recommendation === 'Strong Hire' || recommendation === 'Hire' ? 'Offer' : 'Interview',
              score_reference: pctScore,
              human_reviewer_notes: `تقييم لجنة المقابلات (${totalScore}/20 — ${pctScore}%) | التوصية: ${recommendation}`,
              stage_history: [
                ...a.stage_history,
                {
                  stage: recommendation === 'Strong Hire' || recommendation === 'Hire' ? 'Offer' : 'Interview',
                  date: new Date().toISOString().slice(0, 10),
                  actor: panelAlias,
                  reason: `اعتماد بطاقة تقييم المقابلة الخماسية (${totalScore}/20)`,
                },
              ],
            }
          : a
      )
    );
    logAudit('interviews', intId, `توثيق تقييم مقابلة منظمة للطلب ${applicationId} (${totalScore}/20)`, `rec=${recommendation}`);
    notify('success', 'تم حفظ تقييم المقابلة المنظمة', `المجموع: ${totalScore} من 20 (${pctScore}%) — التوصية: ${recommendation}`);
    return true;
  };

  const hireCandidateToSeat = (applicationId: string): Employee | null => {
    const app = applications.find((a) => a.application_id === applicationId);
    if (!app) return null;
    const vac = vacancies.find((v) => v.vacancy_id === app.vacancy_id);
    if (!vac) return null;
    const seat = seats.find((s) => s.seat_id === vac.seat_id);
    if (!seat || seat.seat_status === 'Occupied') {
      notify('error', 'المقعد مشغول', `المقعد ${vac.seat_id} لم يعد شاغراً. لا يمكن إتمام التعيين المزدوج.`);
      return null;
    }

    const pos = positions.find((p) => p.position_id === vac.position_id);
    const deptHead = employees.find((e) => e.department_id === vac.department_id);
    const newEmpId = `E${String(employees.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().slice(0, 10);

    const newEmp: Employee = {
      employee_id: newEmpId,
      seat_id: seat.seat_id,
      display_name_alias: app.candidate_alias.replace('مرشح تجريبي', 'موظف معين حديثاً'),
      display_name_en: `Simulated Employee ${newEmpId}`,
      department_id: vac.department_id,
      position_id: vac.position_id,
      hire_date: today,
      employment_status: 'Probation',
      work_email_test: `${newEmpId.toLowerCase()}@blueparadise.sim.jo`,
      manager_employee_id: deptHead ? deptHead.employee_id : 'E001',
      base_salary_jod: pos?.salary_min_jod || 550,
      leave_balance_days: 14,
      skills: app.skills.map((sk) => ({ name: sk, level: 3 })),
      onboarding_tasks: [
        { id: `${newEmpId}-OB1`, phase: 'قبل اليوم الأول', title: 'إصدار الرقم الوظيفي وإسناد المقعد والصلاحيات الأولية', completed: true },
        { id: `${newEmpId}-OB2`, phase: 'اليوم الأول', title: 'التعريف بالمنشأة وسياسات السلامة والمدير المباشر', completed: false },
        { id: `${newEmpId}-OB3`, phase: 'الأسبوع الأول', title: 'إتمام تدريب معايير الضيافة وخصوصية البيانات التدريبية', completed: false },
        { id: `${newEmpId}-OB4`, phase: 'الشهر الأول (30 يوماً)', title: 'مراجعة خطة الـ 30 يوماً وتقييم بدء التشغيل', completed: false },
        { id: `${newEmpId}-OB5`, phase: 'الأيام 60 / 90', title: 'مراجعة التعلم والأداء وتثبيت المسار الوظيفي', completed: false },
      ],
      career_notes: `تم التعيين من طلب التوظيف ${app.application_id} على الشاغر ${vac.vacancy_id}.`,
    };

    setEmployees((prev) => [newEmp, ...prev]);
    setSeats((prev) =>
      prev.map((s) => (s.seat_id === seat.seat_id ? { ...s, seat_status: 'Occupied', assigned_employee_id: newEmpId } : s))
    );
    setVacancies((prev) => prev.map((v) => (v.vacancy_id === vac.vacancy_id ? { ...v, status: 'Closed' } : v)));
    setApplications((prev) =>
      prev.map((a) =>
        a.application_id === applicationId
          ? {
              ...a,
              stage: 'Hired',
              stage_history: [
                ...a.stage_history,
                {
                  stage: 'Hired',
                  date: today,
                  actor: currentUser.display_name,
                  reason: `تحويل المرشح إلى سجل موظف ${newEmpId} وربطه بالمقعد ${seat.seat_id} وإغلاق الشاغر ${vac.vacancy_id}`,
                },
              ],
            }
          : a
      )
    );
    setActiveEmployeeId(newEmpId);
    logAudit('hire_workflow', newEmpId, `تعيين المرشح ${app.application_id} كموظف ${newEmpId} على المقعد ${seat.seat_id}`, `vacancy=${vac.vacancy_id}`);
    notify(
      'success',
      `تم التعيين وتوليد برنامج التهيئة — ${newEmpId}`,
      `تحول المرشح إلى موظف مرتبط بالمقعد ${seat.seat_id} وأُغلق الشاغر ${vac.vacancy_id} تلقائياً.`
    );
    return newEmp;
  };

  const submitLeaveRequest = (data: {
    employee_id: string;
    leave_type: LeaveRequest['leave_type'];
    start_date: string;
    end_date: string;
    reason: string;
  }): boolean => {
    // Integrity Check: end_date >= start_date
    if (data.end_date < data.start_date) {
      notify(
        'error',
        'تاريخ إجازة غير صالح (Data Integrity Rule)',
        'لا تُقبل إجازة ينتهي تاريخها قبل تاريخ بدايتها. يرجى تصحيح التواريخ.'
      );
      return false;
    }
    const start = new Date(data.start_date);
    const end = new Date(data.end_date);
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
    const emp = employees.find((e) => e.employee_id === data.employee_id);
    if (emp && days > emp.leave_balance_days) {
      notify('error', 'رصيد الإجازات غير كافٍ', `المدة المطلوبة (${days} أيام) تتجاوز الرصيد المتاح (${emp.leave_balance_days} يوماً).`);
      return false;
    }

    const newLeave: LeaveRequest = {
      leave_id: `L${String(leaves.length + 1).padStart(3, '0')}`,
      employee_id: data.employee_id,
      leave_type: data.leave_type,
      start_date: data.start_date,
      end_date: data.end_date,
      requested_days: days,
      reason: data.reason || 'طلب إجازة عبر بوابة الموظف',
      status: 'PendingManager',
      manager_approval: null,
    };
    setLeaves((prev) => [newLeave, ...prev]);
    logAudit('leave_requests', newLeave.leave_id, `تقديم طلب إجازة (${days} أيام) للموظف ${data.employee_id}`, `type=${data.leave_type}`);
    notify('success', `تم إرسال طلب الإجازة ${newLeave.leave_id}`, 'ظهر الطلب الآن لدى المدير المباشر للمراجعة والاعتماد.');
    return true;
  };

  const decideLeaveRequest = (leaveId: string, decision: 'Approved' | 'Rejected', comment: string): boolean => {
    const target = leaves.find((l) => l.leave_id === leaveId);
    if (!target) return false;

    setLeaves((prev) =>
      prev.map((l) =>
        l.leave_id === leaveId
          ? { ...l, status: decision, manager_approval: comment || `تم ${decision === 'Approved' ? 'اعتماد' : 'رفض'} الطلب بواسطة ${currentUser.display_name}` }
          : l
      )
    );

    if (decision === 'Approved' && target.status !== 'Approved') {
      setEmployees((prev) =>
        prev.map((e) =>
          e.employee_id === target.employee_id
            ? { ...e, leave_balance_days: Math.max(0, e.leave_balance_days - target.requested_days) }
            : e
        )
      );
    }

    logAudit('leave_requests', leaveId, `تحديث حالة الإجازة إلى ${decision}`, `employee=${target.employee_id}, days=${target.requested_days}`);
    notify(
      decision === 'Approved' ? 'success' : 'warning',
      decision === 'Approved' ? `تم اعتماد الإجازة ${leaveId}` : `تم رفض الإجازة ${leaveId}`,
      decision === 'Approved'
        ? `تم خصم ${target.requested_days} أيام من الرصيد التجريبي وإشعار الموظف.`
        : 'تم توثيق سبب الرفض وإشعار الموظف في بوابته.'
    );
    return true;
  };

  const requestAttendanceCorrection = (attendanceId: string, reason: string) => {
    setAttendance((prev) =>
      prev.map((a) =>
        a.attendance_id === attendanceId ? { ...a, status: 'CorrectionPending', correction_reason: reason } : a
      )
    );
    logAudit('attendance', attendanceId, 'تقديم طلب تصحيح سجل حضور', `reason=${reason}`);
    notify('info', 'تم إرسال طلب تصحيح الحضور', 'بانتظار مراجعة واعتماد المدير المباشر.');
  };

  const approveAttendanceCorrection = (attendanceId: string) => {
    setAttendance((prev) =>
      prev.map((a) =>
        a.attendance_id === attendanceId
          ? { ...a, status: 'Corrected', actual_hours: a.scheduled_hours, approved_by: currentUser.employee_id || 'E005' }
          : a
      )
    );
    logAudit('attendance', attendanceId, 'اعتماد تصحيح سجل الحضور وتحديث الساعات الفعلية', `approved_by=${currentUser.user_id}`);
    notify('success', 'تم اعتماد تصحيح الحضور', 'تم تعديل الساعات الفعلية وحفظ سجل التغيير.');
  };

  const enrollInTraining = (employeeId: string, trainingId: string): boolean => {
    const exists = enrollments.find((e) => e.employee_id === employeeId && e.training_id === trainingId);
    if (exists) {
      notify('warning', 'مسجل مسبقاً', 'الموظف مسجل بالفعل في هذا البرنامج التدريبي.');
      return false;
    }
    const newEnr: TrainingEnrollment = {
      enrollment_id: `ENR-${String(enrollments.length + 1).padStart(2, '0')}`,
      employee_id: employeeId,
      training_id: trainingId,
      enrollment_date: new Date().toISOString().slice(0, 10),
      completion_status: 'InProgress',
      score_before: 65,
      score_after: 65,
    };
    setEnrollments((prev) => [newEnr, ...prev]);
    logAudit('training_enrollments', newEnr.enrollment_id, `تسجيل الموظف ${employeeId} في البرنامج التدريبي ${trainingId}`, '');
    notify('success', 'تم التسجيل في البرنامج التدريبي', 'أُضيف البرنامج إلى خطة تعلم الموظف.');
    return true;
  };

  const completeTraining = (enrollmentId: string, scoreAfter: number, impactNotes: string) => {
    setEnrollments((prev) =>
      prev.map((e) =>
        e.enrollment_id === enrollmentId
          ? {
              ...e,
              completion_status: 'Completed',
              score_after: Math.min(100, Math.max(0, scoreAfter)),
              impact_30d_notes: impactNotes || 'تحسن ملموس في الأداء الميداني وتغطية الفجوة المهارية.',
            }
          : e
      )
    );
    logAudit('training_enrollments', enrollmentId, `إتمام البرنامج التدريبي بنتيجة بعدية ${scoreAfter}%`, '');
    notify('success', 'تم توثيق إتمام التدريب وأثره', 'تحدثت مؤشرات إتمام التدريب وتقليص الفجوة المهارية.');
  };

  const submitPerformanceReview = (data: {
    employee_id: string;
    cycle_id: string;
    goals_score: number;
    competencies_score: number;
    learning_score: number;
    manager_feedback: string;
    idp_plan: string;
  }): boolean => {
    const overall = Math.round(data.goals_score * 0.5 + data.competencies_score * 0.3 + data.learning_score * 0.2);
    const newRev: PerformanceReview = {
      review_id: `R${String(reviews.length + 1).padStart(3, '0')}`,
      employee_id: data.employee_id,
      cycle_id: data.cycle_id,
      smart_goals: [
        { title: 'تحقيق مستهدفات الجودة ورضا الضيوف في القسم', weight: 50, achievement_pct: data.goals_score },
        { title: 'الالتزام بالكفايات السلوكية وقيم الضيافة الإنسانية', weight: 30, achievement_pct: data.competencies_score },
        { title: 'إتمام الساعات التدريبية ونقل المعرفة للفريق', weight: 20, achievement_pct: data.learning_score },
      ],
      goals_score: data.goals_score,
      competencies_score: data.competencies_score,
      learning_score: data.learning_score,
      overall_score: overall,
      manager_feedback: data.manager_feedback,
      idp_plan: data.idp_plan,
      review_status: 'Approved',
    };
    setReviews((prev) => [newRev, ...prev]);
    logAudit('performance_reviews', newRev.review_id, `اعتماد تقييم أداء موزون (${overall}%) للموظف ${data.employee_id}`, 'weights=50/30/20');
    notify('success', `تم اعتماد تقييم الأداء (${overall}%)`, 'تم حساب النتيجة الموزونة (50% نتائج، 30% كفايات، 20% تعلم) وربطها بخطة التطوير الفردية.');
    return true;
  };

  const updatePayrollStatus = (payrollId: string, status: PayrollRecord['payment_status']): boolean => {
    if (!checkAccessAndAudit('إدارة واعتماد مسير الرواتب', ['super_admin', 'hr_admin', 'finance'])) return false;
    setPayroll((prev) => prev.map((p) => (p.payroll_id === payrollId ? { ...p, payment_status: status } : p)));
    logAudit('payroll', payrollId, `تحديث حالة سجل الراتب إلى ${status}`, '');
    notify('success', 'تم تحديث حالة الراتب', `تم نقل السجل ${payrollId} إلى حالة ${status}.`);
    return true;
  };

  const createTicket = (data: Omit<OperationalTicket, 'ticket_id' | 'opened_at' | 'status'>) => {
    const newTicket: OperationalTicket = {
      ...data,
      ticket_id: `TKT${String(tickets.length + 1).padStart(3, '0')}`,
      opened_at: new Date().toISOString().slice(0, 10),
      status: 'مفتوحة',
    };
    setTickets((prev) => [newTicket, ...prev]);
    logAudit('tickets', newTicket.ticket_id, `فتح تذكرة تشغيلية جديدة (${data.category})`, `dept=${data.department_id}`);
    notify('success', `تم فتح التذكرة ${newTicket.ticket_id}`, 'تم توجيه التذكرة إلى القسم المختص للمتابعة.');
  };

  const updateTicketStatus = (ticketId: string, status: OperationalTicket['status'], notes?: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.ticket_id === ticketId ? { ...t, status, resolution_notes: notes || t.resolution_notes } : t
      )
    );
    logAudit('tickets', ticketId, `تحديث حالة التذكرة إلى ${status}`, '');
    notify('info', 'تحديث التذكرة التشغيلية', `تم تحديث حالة التذكرة ${ticketId} إلى ${status}.`);
  };

  const submitSurveyResponse = (departmentId: string, enpsScore: number, satisfactionPct: number, comment: string) => {
    const newResp: SurveyResponse = {
      response_id: `SRV-R${surveys.length + 1}`,
      department_id: departmentId,
      enps_score: enpsScore,
      satisfaction_pct: satisfactionPct,
      comment: comment || 'مشاركة تدريبية في استبيان رضا الموظفين.',
      submitted_at: new Date().toISOString().slice(0, 10),
    };
    setSurveys((prev) => [newResp, ...prev]);
    logAudit('surveys', newResp.response_id, 'إضافة استجابة جديدة لاستبيان رضا الموظفين وeNPS', `dept=${departmentId}, score=${enpsScore}`);
    notify('success', 'شكراً لمشاركتك في الاستبيان', 'تم تحديث مؤشر eNPS ورضا الموظفين بناءً على الاستجابات الفعلية المسجلة.');
  };

  const runImportSimulation = (rawInput?: string, fileName = 'قاعدة_بيانات_بلو_برادايس_التدريبية.csv'): ImportReport => {
    let customRows = 0;
    if (rawInput && rawInput.trim().length > 0) {
      const lines = rawInput.trim().split('\n');
      customRows = lines.length;
    }
    const totalEntities =
      departments.length +
      positions.length +
      seats.length +
      employees.length +
      vacancies.length +
      applications.length +
      services.length;

    const report: ImportReport = {
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      sourceName: fileName,
      recordsRead: customRows > 0 ? customRows : totalEntities + 3,
      matchedFields: 22,
      validIds: customRows > 0 ? customRows : totalEntities,
      duplicatesSkipped: 3,
      importedCount: customRows > 0 ? customRows : totalEntities,
      status: 'SUCCESS',
      details: [
        '1. قراءة بيانات الجداول: تمت قراءة تبويبات الأقسام (10)، المسميات (39)، المقاعد (96)، الموظفين (72)، والشواغر (24).',
        '2. مطابقة الحقول: تطابق 100% مع قاموس البيانات المعتمد (UTF-8، التواريخ YYYY-MM-DD، العملة JOD).',
        '3. التحقق من المعرفات: التحقق من المفاتيح الأساسية D01–D10، P001–P039، S001–S096، E001–E072.',
        '4. اكتشاف السجلات المكررة: تم اكتشاف واستبعاد 3 سجلات مكررة دون إفساد الجداول.',
        '5. منع تكرار الاستيراد: تفعيل قفل Idempotency لمنع ازدواج المقاعد أو الموظفين النشطين.',
        '6. سلامة العلاقات المرجعية: كل موظف نشط مرتبط بمقعد فريد ومسمى وقسم ومدير مباشر.',
      ],
    };
    setLastImportReport(report);
    logAudit('seed_import', fileName, 'تنفيذ عملية استيراد والتحقق من تكامل البيانات المرجعية', `read=${report.recordsRead}, skipped=${report.duplicatesSkipped}`);
    notify('success', 'اكتمل فحص واستيراد البيانات بنجاح', 'تم التحقق من جميع العلاقات المرجعية ومنع السجلات المكررة.');
    return report;
  };

  const executeTrainingScenario = (scenarioNumber: number): string => {
    switch (scenarioNumber) {
      case 1: {
        // Scenario 1: Department manager requests a new vacancy, HR approves and publishes it
        const vacantSeat = seats.find(
          (s) => s.seat_status === 'Vacant' && !vacancies.some((v) => v.seat_id === s.seat_id && v.status !== 'Closed')
        );
        if (!vacantSeat) return 'جميع المقاعد الشاغرة لديها إعلانات توظيف نشطة حالياً.';
        createVacancy({
          position_id: vacantSeat.position_id,
          seat_id: vacantSeat.seat_id,
          employment_type: 'دوام كامل',
          closing_date: '2026-12-28',
          requirements_ar: ['خبرة في خدمة الضيوف والالتزام بمعايير بلو برادايس.'],
          job_questions: ['كيف تطبق قيمة الضيافة الإنسانية في عملك اليومي؟'],
          autoPublish: true,
        });
        return `تم تنفيذ السيناريو 1: فُتح الشاغر على المقعد ${vacantSeat.seat_id} واعتماده ونشره في صفحة الوظائف.`;
      }
      case 2: {
        // Scenario 2: Candidate submits application on website -> appears in ATS
        const pubVac = vacancies.find((v) => v.status === 'Published') || vacancies[0];
        const app = submitApplication({
          vacancy_id: pubVac.vacancy_id,
          candidate_alias: `نورس العقبة ${applications.length + 1} (مرشح تجريبي)`,
          contact_test: `candidate${applications.length + 1}@sim.jo`,
          qualification: 'بكالوريوس إدارة سياحة وضيافة',
          years_experience: 3,
          skills: ['خدمة العملاء', 'اللغة الإنجليزية', 'التواصل الفعال'],
          answers: [{ question: 'سؤال الوظيفة', answer: 'إجابة نموذجية ضمن المحاكاة التدريبية.' }],
          consent_flag: true,
        });
        return `تم تنفيذ السيناريو 2: قدم المرشح طلبه رقم ${app?.application_id} للشاغر ${pubVac.vacancy_id} وظهر فوراً في ATS.`;
      }
      case 3: {
        // Scenario 3: HR reviews candidate, schedules interview & records rubric score
        const targetApp = applications.find((a) => a.stage === 'Applied' || a.stage === 'Screening' || a.stage === 'Shortlisted' || a.stage === 'Interview') || applications[0];
        submitInterviewRubric(
          targetApp.application_id,
          'لجنة المقابلات المنظمة (HR + مدير القسم)',
          [
            { criterion_id: 'C1', criterion_name: 'التواصل', score: 4, rationale: 'تواصل واضح ومهني' },
            { criterion_id: 'C2', criterion_name: 'التعامل مع ضيف', score: 4, rationale: 'تركيز عالٍ على الضيف' },
            { criterion_id: 'C3', criterion_name: 'حل مشكلة', score: 3, rationale: 'منهجية منظمة لحل المشكلات' },
            { criterion_id: 'C4', criterion_name: 'سلامة', score: 4, rationale: 'التزام بمعايير السلامة' },
            { criterion_id: 'C5', criterion_name: 'مرونة العمل', score: 3, rationale: 'جاهزية للمناوبات' },
          ],
          'Strong Hire'
        );
        return `تم تنفيذ السيناريو 3: تقييم المرشح ${targetApp.application_id} عبر معايير اللجنة الخماسية (18/20) وتأهيله لمرحلة العرض الوظيفي.`;
      }
      case 4: {
        // Scenario 4: Accepted candidate converts to virtual employee linked to vacant seat
        const offerApp = applications.find((a) => a.stage === 'Offer') || applications[0];
        const hired = hireCandidateToSeat(offerApp.application_id);
        return hired
          ? `تم تنفيذ السيناريو 4: تحويل المرشح ${offerApp.application_id} إلى الموظف ${hired.employee_id} وإسناده للمقعد ${hired.seat_id}.`
          : 'يرجى التأكد من وجود مرشح في مرحلة العرض لمقعد شاغر.';
      }
      case 5: {
        // Scenario 5: New employee enters portal and progresses onboarding
        const targetEmp = employees[0];
        const firstIncomplete = targetEmp.onboarding_tasks?.find((t) => !t.completed);
        if (firstIncomplete) {
          toggleOnboardingTask(targetEmp.employee_id, firstIncomplete.id);
        }
        setActiveEmployeeId(targetEmp.employee_id);
        return `تم تنفيذ السيناريو 5: تفعيل بوابة الموظف لـ ${targetEmp.display_name_alias} (${targetEmp.employee_id}) وتحديث مهام برنامج التهيئة.`;
      }
      case 6: {
        // Scenario 6: Employee submits leave request -> Manager approves -> Balance updated
        const pendingLeave = leaves.find((l) => l.status === 'PendingManager' || l.status === 'PendingHR');
        if (pendingLeave) {
          decideLeaveRequest(pendingLeave.leave_id, 'Approved', 'اعتماد ضمن السيناريو التدريبي السادس بعد التحقق من عدم تعارض المناوبات.');
          return `تم تنفيذ السيناريو 6: اعتماد طلب الإجازة ${pendingLeave.leave_id} وتحديث رصيد إجازات الموظف ${pendingLeave.employee_id}.`;
        } else {
          submitLeaveRequest({
            employee_id: 'E008',
            leave_type: 'سنوية',
            start_date: '2026-12-01',
            end_date: '2026-12-03',
            reason: 'طلب إجازة ضمن السيناريو التدريبي السادس',
          });
          return 'تم تنفيذ السيناريو 6: إنشاء طلب إجازة جديد للموظف E008 وإرساله لاعتماد المدير.';
        }
      }
      case 7: {
        // Scenario 7: HR creates training plan for skill gap and measures completion
        enrollInTraining('E010', 'T001');
        return 'تم تنفيذ السيناريو 7: إلحاق موظف الاستقبال E010 ببرنامج إدارة شكاوى الضيوف (T001) لمعالجة فجوة المهارات.';
      }
      case 8: {
        // Scenario 8: Evaluate employee performance (50/30/20) and link to IDP
        submitPerformanceReview({
          employee_id: 'E009',
          cycle_id: 'CYC-2026-Q4',
          goals_score: 90,
          competencies_score: 88,
          learning_score: 92,
          manager_feedback: 'تقدم ممتاز في سرعة خدمة الضيوف والالتزام بمعايير الجودة.',
          idp_plan: 'خطة تطوير فردية للترشح لوظيفة مشرف استقبال خلال العام القادم.',
        });
        return 'تم تنفيذ السيناريو 8: اعتماد تقييم الأداء الموزون للموظف E009 وربطه بخطة تطوير ومسار مهني.';
      }
      default:
        return 'تم تشغيل فحص السيناريو وتوثيقه في سجل التدقيق.';
    }
  };

  const saveCareerJob = (job: CareerJob, isNew: boolean): boolean => {
    if (!checkAccessAndAudit('إدارة الوظائف وبوابة التوظيف', ['super_admin', 'hr_admin', 'recruiter', 'executive'])) {
      return false;
    }
    if (!job.title_ar.trim() || !job.department_id || !job.job_purpose.trim()) {
      notify('error', 'بيانات غير مكتملة', 'يرجى استكمال المسمى الوظيفي، القسم الإداري، والهدف من الوظيفة قبل الحفظ.');
      return false;
    }
    if (job.closing_date && job.published_at && job.closing_date < job.published_at) {
      notify('error', 'تاريخ إغلاق غير صالح', 'لا يمكن أن يكون آخر موعد للتقديم قبل تاريخ نشر الوظيفة.');
      return false;
    }
    if (isNew) {
      setCareerJobs((prev) => [...prev, job].sort((a, b) => a.sort_order - b.sort_order));
      logAudit('career_jobs', job.job_id, `إضافة وظيفة جديدة: ${job.title_ar}`, `dept=${job.department_id}, published=${job.is_published}`);
      notify('success', `تم إنشاء الوظيفة ${job.job_id}`, `تمت إضافة "${job.title_ar}" إلى بوابة التوظيف بنجاح.`);
    } else {
      setCareerJobs((prev) =>
        prev.map((j) => (j.job_id === job.job_id ? job : j)).sort((a, b) => a.sort_order - b.sort_order)
      );
      logAudit('career_jobs', job.job_id, `تعديل بيانات الوظيفة: ${job.title_ar}`, `status=${job.availability_status}, published=${job.is_published}`);
      notify('success', `تم تحديث الوظيفة ${job.job_id}`, `تم حفظ التعديلات على "${job.title_ar}" وانعكست مباشرة في بوابة الوظائف.`);
    }
    return true;
  };

  const deleteCareerJob = (jobId: string): boolean => {
    if (!checkAccessAndAudit('حذف وظيفة من بوابة التوظيف', ['super_admin', 'hr_admin'])) {
      return false;
    }
    const target = careerJobs.find((j) => j.job_id === jobId);
    if (!target) return false;
    setCareerJobs((prev) => prev.filter((j) => j.job_id !== jobId));
    logAudit('career_jobs', jobId, `حذف الوظيفة: ${target.title_ar}`, `dept=${target.department_id}`);
    notify('warning', `تم حذف الوظيفة ${jobId}`, `أُزيلت الوظيفة "${target.title_ar}" من قائمة الوظائف.`);
    return true;
  };

  const toggleCareerJobPublish = (jobId: string): boolean => {
    if (!checkAccessAndAudit('نشر أو إخفاء وظيفة', ['super_admin', 'hr_admin', 'recruiter'])) {
      return false;
    }
    const target = careerJobs.find((j) => j.job_id === jobId);
    if (!target) return false;
    const nextState = !target.is_published;
    setCareerJobs((prev) =>
      prev.map((j) =>
        j.job_id === jobId
          ? {
              ...j,
              is_published: nextState,
              published_at: nextState ? new Date().toISOString().slice(0, 10) : j.published_at,
            }
          : j
      )
    );
    logAudit('career_jobs', jobId, `${nextState ? 'نشر' : 'إلغاء نشر (إخفاء)'} الوظيفة: ${target.title_ar}`, `is_published=${nextState}`);
    notify(
      nextState ? 'success' : 'info',
      nextState ? `تم نشر الوظيفة ${jobId}` : `تم إخفاء الوظيفة ${jobId}`,
      nextState
        ? `أصبحت "${target.title_ar}" مرئية للزوار في تبويب الوظائف الشاغرة.`
        : `تم إلغاء نشر "${target.title_ar}" وإخفاؤها مؤقتاً عن الزوار.`
    );
    return true;
  };

  const setCareerJobAvailability = (
    jobId: string,
    status: JobAvailabilityStatus,
    newClosingDate?: string
  ): boolean => {
    if (!checkAccessAndAudit('تحديث حالة توفر الوظيفة', ['super_admin', 'hr_admin', 'recruiter'])) {
      return false;
    }
    const target = careerJobs.find((j) => j.job_id === jobId);
    if (!target) return false;
    const today = new Date().toISOString().slice(0, 10);
    setCareerJobs((prev) =>
      prev.map((j) =>
        j.job_id === jobId
          ? {
              ...j,
              availability_status: status,
              is_published: status === 'متاحة' ? true : j.is_published,
              published_at: status === 'متاحة' && target.availability_status === 'مغلقة' ? today : j.published_at,
              closing_date: newClosingDate || j.closing_date,
            }
          : j
      )
    );
    logAudit(
      'career_jobs',
      jobId,
      `تغيير حالة الوظيفة "${target.title_ar}" إلى (${status})`,
      `closing_date=${newClosingDate || target.closing_date}`
    );
    notify(
      'success',
      `تحديث حالة الوظيفة (${status})`,
      status === 'متاحة' && target.availability_status === 'مغلقة'
        ? `تمت إعادة نشر الوظيفة "${target.title_ar}" وفتح باب التقديم مجدداً.`
        : `تم تغيير حالة "${target.title_ar}" إلى: ${status}.`
    );
    return true;
  };

  const reorderCareerJob = (jobId: string, direction: 'up' | 'down'): boolean => {
    if (!checkAccessAndAudit('إعادة ترتيب عرض الوظائف', ['super_admin', 'hr_admin', 'recruiter'])) {
      return false;
    }
    const sorted = [...careerJobs].sort((a, b) => a.sort_order - b.sort_order);
    const idx = sorted.findIndex((j) => j.job_id === jobId);
    if (idx === -1) return false;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return false;

    const currentOrder = sorted[idx].sort_order;
    const targetOrder = sorted[swapIdx].sort_order;
    sorted[idx] = { ...sorted[idx], sort_order: targetOrder };
    sorted[swapIdx] = { ...sorted[swapIdx], sort_order: currentOrder };

    setCareerJobs([...sorted].sort((a, b) => a.sort_order - b.sort_order));
    logAudit('career_jobs', jobId, `تغيير ترتيب ظهور الوظيفة (${direction === 'up' ? 'لأعلى' : 'لأسفل'})`, '');
    return true;
  };

  const updateCareerJobApplicationUrl = (jobId: string, url: string, useUnified: boolean): boolean => {
    if (!checkAccessAndAudit('تحديث رابط نموذج التقديم (Google Forms)', ['super_admin', 'hr_admin', 'recruiter'])) {
      return false;
    }
    setCareerJobs((prev) =>
      prev.map((j) =>
        j.job_id === jobId ? { ...j, applicationUrl: url.trim(), use_unified_form: useUnified } : j
      )
    );
    logAudit('career_jobs', jobId, 'تحديث رابط التقديم الخارجي (applicationUrl)', `use_unified=${useUnified}`);
    notify('success', 'تم حفظ رابط التقديم', `تم تحديث إعدادات نموذج التقديم للوظيفة ${jobId}.`);
    return true;
  };

  const updateFormsConfig = (partial: Partial<GoogleFormsIntegrationConfig>): boolean => {
    if (!checkAccessAndAudit('إعدادات الربط مع Google Forms & Apps Script', ['super_admin', 'hr_admin'])) {
      return false;
    }
    setFormsConfig((prev) => ({ ...prev, ...partial }));
    logAudit('forms_integration', 'GOOGLE-FORMS-CFG', 'تحديث إعدادات النموذج الموحد والربط مع Google Apps Script', Object.keys(partial).join(','));
    notify('success', 'تم حفظ إعدادات الربط الخارجي', 'تم تحديث معاملات النموذج الموحد (Pre-filled URL) بنجاح.');
    return true;
  };

  const resolveApplicationUrl = (
    job: CareerJob
  ): { url: string | null; isUnified: boolean; prefilledUrl: string | null } => {
    const directUrl = job.applicationUrl?.trim() || '';
    const baseUrl = directUrl || (job.use_unified_form && formsConfig.enable_unified_fallback ? formsConfig.unified_form_base_url.trim() : '');

    if (!baseUrl) {
      return { url: null, isUnified: false, prefilledUrl: null };
    }

    const separator = baseUrl.includes('?') ? '&' : '?';
    const params = new URLSearchParams();
    params.set('usp', 'pp_url');
    params.set(formsConfig.job_id_param || 'job_id', job.job_id);
    params.set(formsConfig.job_title_param || 'job_title', job.title_ar);
    params.set(formsConfig.department_param || 'department', job.department_name_ar);

    const prefilledUrl = `${baseUrl}${separator}${params.toString()}`;
    return {
      url: directUrl || baseUrl,
      isUnified: job.use_unified_form,
      prefilledUrl: job.use_unified_form ? prefilledUrl : directUrl,
    };
  };

  const resetSimulationData = () => {
    localStorage.clear();
    setCms(INITIAL_CMS);
    setSeats(INITIAL_SEATS);
    setEmployees(INITIAL_EMPLOYEES);
    setVacancies(INITIAL_VACANCIES);
    setApplications(INITIAL_APPLICATIONS);
    setInterviews(INITIAL_INTERVIEWS);
    setInterviewScores(INITIAL_INTERVIEW_SCORES);
    setAttendance(INITIAL_ATTENDANCE);
    setLeaves(INITIAL_LEAVES);
    setEnrollments(INITIAL_ENROLLMENTS);
    setReviews(INITIAL_REVIEWS);
    setPayroll(INITIAL_PAYROLL);
    setServices(INITIAL_SERVICES);
    setBookings(INITIAL_BOOKINGS);
    setTickets(INITIAL_TICKETS);
    setStrategicGoals(INITIAL_STRATEGIC_GOALS);
    setSurveys(INITIAL_SURVEYS);
    setAuditEvents(INITIAL_AUDIT_EVENTS);
    setCareerJobs(INITIAL_CAREER_JOBS);
    setFormsConfig(INITIAL_FORMS_CONFIG);
    notify('info', 'إعادة ضبط بيئة المحاكاة', 'تمت استعادة البيانات الابتدائية المعتمدة (96 مقعداً، 72 موظفاً، 24 شاغراً، وبوابة التوظيف).');
  };

  return (
    <EnterpriseContext.Provider
      value={{
        lang,
        setLang,
        darkMode,
        setDarkMode,
        currentUser,
        switchUserByRole,
        activeEmployeeId,
        setActiveEmployeeId,
        activeManagerDeptId,
        setActiveManagerDeptId,
        toasts,
        notify,
        dismissToast,
        cms,
        locations,
        departments,
        positions,
        seats,
        employees,
        roles,
        users,
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
        payroll,
        services,
        bookings,
        tickets,
        strategicGoals,
        successionPlans,
        surveys,
        auditEvents,
        lastImportReport,
        careerJobs,
        formsConfig,
        updateCMS,
        updateService,
        createBooking,
        updateBookingStatus,
        createEmployee,
        updateEmployeeStatus,
        toggleOnboardingTask,
        createVacancy,
        approveAndPublishVacancy,
        submitApplication,
        advanceApplicationStage,
        submitInterviewRubric,
        hireCandidateToSeat,
        submitLeaveRequest,
        decideLeaveRequest,
        requestAttendanceCorrection,
        approveAttendanceCorrection,
        enrollInTraining,
        completeTraining,
        submitPerformanceReview,
        updatePayrollStatus,
        createTicket,
        updateTicketStatus,
        submitSurveyResponse,
        checkAccessAndAudit,
        runImportSimulation,
        executeTrainingScenario,
        resetSimulationData,
        saveCareerJob,
        deleteCareerJob,
        toggleCareerJobPublish,
        setCareerJobAvailability,
        reorderCareerJob,
        updateCareerJobApplicationUrl,
        updateFormsConfig,
        resolveApplicationUrl,
      }}
    >
      {children}
    </EnterpriseContext.Provider>
  );
};

export const useEnterprise = (): EnterpriseContextType => {
  const ctx = useContext(EnterpriseContext);
  if (!ctx) throw new Error('useEnterprise must be used inside EnterpriseProvider');
  return ctx;
};
