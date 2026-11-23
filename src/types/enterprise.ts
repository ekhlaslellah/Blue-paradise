export type RoleId =
  | 'super_admin'
  | 'system_admin'
  | 'executive'
  | 'hr_admin'
  | 'recruiter'
  | 'finance'
  | 'line_manager'
  | 'employee'
  | 'applicant'
  | 'visitor'
  | 'auditor';

export type JobGrade = 'E' | 'M' | 'S' | 'P' | 'O' | 'T';

export interface Department {
  department_id: string; // D01 - D10
  name_ar: string;
  name_en: string;
  manager_position_id: string;
  planned_seats: number;
  parent_department_id: string | null;
  category: 'executive' | 'operations' | 'support';
  description_ar: string;
}

export interface Position {
  position_id: string; // P001 - P039
  department_id: string;
  title_ar: string;
  title_en: string;
  grade: JobGrade;
  planned_count: number;
  salary_min_jod: number;
  salary_max_jod: number;
  reports_to_position_id: string | null;
  description: string;
  required_skills: string[];
  is_critical?: boolean;
}

export interface Seat {
  seat_id: string; // S001 - S096
  position_id: string;
  department_id: string;
  seat_status: 'Occupied' | 'Vacant' | 'Frozen';
  location_id: string;
  assigned_employee_id: string | null;
}

export interface OnboardingTask {
  id: string;
  phase: 'قبل اليوم الأول' | 'اليوم الأول' | 'الأسبوع الأول' | 'الشهر الأول (30 يوماً)' | 'الأيام 60 / 90';
  title: string;
  completed: boolean;
}

export interface Employee {
  employee_id: string; // E001 - E072+
  seat_id: string;
  display_name_alias: string;
  display_name_en: string;
  department_id: string;
  position_id: string;
  hire_date: string; // YYYY-MM-DD
  employment_status: 'Active' | 'Probation' | 'OnLeave' | 'Inactive';
  work_email_test: string;
  manager_employee_id: string | null;
  base_salary_jod: number;
  leave_balance_days: number;
  skills: { name: string; level: number }[]; // level 1-4
  onboarding_tasks?: OnboardingTask[];
  career_notes?: string;
}

export interface Location {
  location_id: string;
  name: string;
  city: string;
  state: string;
  capacity: number;
  type: 'HQ & Resort' | 'Experience Hub' | 'Future Concept';
  is_simulated: boolean;
}

export interface RoleDefinition {
  role_id: RoleId;
  role_name_ar: string;
  role_name_en: string;
  scope: string;
  permissions: string[];
}

export interface UserAccount {
  user_id: string;
  employee_id: string | null;
  role_id: RoleId;
  display_name: string;
  identity_provider_uid: string;
  is_active: boolean;
}

export interface Vacancy {
  vacancy_id: string; // V001+
  position_id: string;
  seat_id: string;
  department_id: string;
  opening_date: string;
  status: 'Draft' | 'PendingApproval' | 'Published' | 'Closed';
  employment_type: 'دوام كامل' | 'دوام جزئي' | 'عقد موسمي تدريبي';
  publish_date: string;
  closing_date: string;
  requirements_ar: string[];
  job_questions: string[];
}

export type ATSStage =
  | 'Applied'
  | 'Screening'
  | 'Shortlisted'
  | 'Interview'
  | 'Offer'
  | 'Hired'
  | 'Rejected'
  | 'Withdrawn'
  | 'On Hold';

export interface Application {
  application_id: string; // A001+
  vacancy_id: string;
  candidate_alias: string;
  contact_test: string;
  qualification: string;
  years_experience: number;
  skills: string[];
  answers: { question: string; answer: string }[];
  applied_at: string;
  stage: ATSStage;
  consent_flag: boolean;
  score_reference: number;
  source_channel: string;
  human_reviewer_notes: string;
  stage_history: { stage: ATSStage; date: string; actor: string; reason: string }[];
}

export interface Interview {
  interview_id: string;
  application_id: string;
  scheduled_at: string;
  panel_alias: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  rubric_version: string;
  recommendation: 'Strong Hire' | 'Hire' | 'Hold' | 'No Hire' | 'Pending';
}

export interface InterviewScore {
  score_id: string;
  interview_id: string;
  criterion_id: string;
  criterion_name: string; // التواصل، التعامل مع ضيف، حل مشكلة، سلامة، مرونة العمل
  score: number; // 1 to 4
  evaluator_alias: string;
  rationale: string;
}

export interface AttendanceRecord {
  attendance_id: string;
  employee_id: string;
  work_date: string;
  shift_name: 'الصباحية (07:00 - 15:00)' | 'المسائية (15:00 - 23:00)' | 'الليلية (23:00 - 07:00)' | 'الإدارية (08:30 - 16:30)';
  scheduled_hours: number;
  actual_hours: number;
  status: 'Present' | 'Late' | 'Absent' | 'CorrectionPending' | 'Corrected';
  correction_reason?: string;
  approved_by: string | null;
}

export interface LeaveRequest {
  leave_id: string; // L001+
  employee_id: string;
  leave_type: 'سنوية' | 'مرضية' | 'طارئة' | 'تدريبية';
  start_date: string;
  end_date: string;
  requested_days: number;
  reason: string;
  status: 'PendingManager' | 'PendingHR' | 'Approved' | 'Rejected';
  manager_approval: string | null;
}

export interface TrainingProgram {
  training_id: string; // T001+
  title: string;
  skill_category: string;
  duration_hours: number;
  delivery_mode: 'حضوري في المنتجع' | 'تفاعلي عن بُعد' | 'تدريب ميداني عملي';
  target_departments: string[];
  cost_jod_simulated: number;
}

export interface TrainingEnrollment {
  enrollment_id: string;
  employee_id: string;
  training_id: string;
  enrollment_date: string;
  completion_status: 'Enrolled' | 'InProgress' | 'Completed';
  score_before: number; // out of 100
  score_after: number; // out of 100
  impact_30d_notes?: string;
}

export interface PerformanceCycle {
  cycle_id: string;
  label: string;
  start_date: string;
  end_date: string;
  status: 'Active' | 'Completed' | 'Upcoming';
}

export interface PerformanceReview {
  review_id: string; // R001+
  employee_id: string;
  cycle_id: string;
  smart_goals: { title: string; weight: number; achievement_pct: number }[];
  goals_score: number; // out of 100 (weighted 50%)
  competencies_score: number; // out of 100 (weighted 30%)
  learning_score: number; // out of 100 (weighted 20%)
  overall_score: number; // 0.5*goals + 0.3*comp + 0.2*learn
  manager_feedback: string;
  idp_plan: string;
  review_status: 'Draft' | 'Submitted' | 'Approved';
}

export interface PayrollRecord {
  payroll_id: string;
  employee_id: string;
  period: string; // e.g., 2026-11
  base_pay_jod: number;
  additions_jod: number;
  deductions_jod: number;
  net_pay_jod: number;
  payment_status: 'Draft' | 'HRVerified' | 'FinanceReviewed' | 'ApprovedLocked';
}

export interface ServiceItem {
  service_id: string; // SRV01+
  name: string;
  name_en: string;
  category: 'إقامة ومنتجعات' | 'تجارب بحرية وبيئية' | 'تجارب ثقافية وتراثية' | 'الضيافة والمطاعم' | 'فعاليات مؤسسية';
  target_audience: 'عائلات' | 'أفراد ومغامرون' | 'شركات وفرق عمل' | 'الجميع';
  base_price_jod: number;
  description: string;
  features: string[];
  image_url: string;
  is_published: boolean;
  is_future_proposal?: boolean;
  responsible_department_id: string;
}

export interface BookingRecord {
  booking_id: string; // BKG001+
  service_id: string;
  guest_alias: string;
  guest_email_test: string;
  visitors_count: number;
  start_date: string;
  end_date: string;
  amount_jod: number;
  booking_status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  created_at: string;
}

export interface OperationalTicket {
  ticket_id: string; // TKT001+
  title: string;
  category: 'طلب خدمة ضيف' | 'شكوى عميل' | 'صيانة ومرافق' | 'مبادرة استدامة' | 'دعم موارد بشرية وتقنية';
  department_id: string;
  related_employee_id: string | null;
  opened_at: string;
  owner_role: string;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  status: 'مفتوحة' | 'قيد المعالجة' | 'مغلقة';
  resolution_notes?: string;
}

export interface StrategicGoal {
  goal_id: string;
  pillar_number: number;
  pillar_name: string;
  title: string;
  owner_department_id: string;
  owner_position_id: string;
  kpi_name: string;
  kpi_formula: string;
  baseline_value: string;
  target_2028_2029: string;
  current_simulated_progress: number;
  initiatives: string[];
}

export interface SuccessionPlan {
  plan_id: string;
  critical_position_id: string;
  incumbent_employee_id: string;
  candidate_employee_id: string;
  readiness_level: 'جاهز خلال 6 أشهر' | 'جاهز خلال 12 شهراً' | 'قيد التأهيل القيادي';
  development_actions: string[];
  committee_review_note: string;
}

export interface SurveyResponse {
  response_id: string;
  department_id: string;
  enps_score: number; // 0 to 10
  satisfaction_pct: number;
  comment: string;
  submitted_at: string;
}

export interface AuditEvent {
  event_id: string;
  actor_id: string;
  actor_role: RoleId;
  entity_type: string;
  entity_id: string;
  action: string;
  occurred_at: string;
  metadata_redacted: string;
  status: 'ALLOWED' | 'DENIED_403';
}

export interface CMSContent {
  hero_title_ar: string;
  hero_title_en: string;
  hero_subtitle_ar: string;
  hero_subtitle_en: string;
  slogan_ar: string;
  slogan_en: string;
  vision_ar: string;
  mission_ar: string;
  logo_mode: 'geometric_bp' | 'attached_image';
  simulation_banner_text: string;
  announcements: { id: string; title: string; date: string; category: string; summary: string }[];
}

export type JobAvailabilityStatus = 'متاحة' | 'مغلقة' | 'قريباً';

export type JobEmploymentType = 'دوام كامل' | 'دوام جزئي' | 'عقد موسمي' | 'عمل مرن / هجين';

export interface CareerJob {
  job_id: string; // e.g., JOB-001
  title_ar: string;
  title_en: string;
  department_id: string;
  department_name_ar: string;
  position_id?: string;
  seat_id?: string;
  location_ar: string;
  employment_type: JobEmploymentType;
  work_hours: string;
  published_at: string; // YYYY-MM-DD
  closing_date: string; // YYYY-MM-DD
  is_published: boolean; // Published vs Unpublished (Hidden/Draft)
  availability_status: JobAvailabilityStatus; // متاحة | مغلقة | قريباً
  summary: string;
  job_purpose: string;
  key_responsibilities: string[];
  academic_qualifications: string;
  technical_skills: string[];
  behavioral_skills: string[];
  experience_required: string;
  applicationUrl: string; // Independent application link (Google Forms / Apps Script)
  use_unified_form: boolean; // Supports passing job_id & job_title via pre-filled URL
  sort_order: number;
  is_trial_data: boolean;
}

export interface GoogleFormsIntegrationConfig {
  unified_form_base_url: string;
  enable_unified_fallback: boolean;
  job_id_param: string; // e.g. entry.100001 or job_id
  job_title_param: string; // e.g. entry.100002 or job_title
  department_param: string; // e.g. entry.100003 or department
  apps_script_webhook_url: string;
}

