/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EnterpriseProvider, useEnterprise } from './context/EnterpriseContext';
import { PublicWebsite, PublicPageId } from './components/PublicWebsite';
import { AdminAndHRISPortal, AdminSubTab } from './components/AdminAndHRISPortal';
import { ATSAndSelfServicePortals } from './components/ATSAndSelfServicePortals';
import { ODAndOperationsLab } from './components/ODAndOperationsLab';
import { BrandLogo } from './components/BrandLogo';
import { exportStandaloneHTML } from './utils/htmlExporter';
import { RoleId } from './types/enterprise';
import {
  Globe,
  LayoutDashboard,
  Users,
  UserPlus,
  UserCheck,
  Briefcase,
  Target,
  Compass,
  FlaskConical,
  Download,
  Moon,
  Sun,
  Shield,
  X,
} from 'lucide-react';

type WorkspaceMode =
  | 'public'
  | 'admin'
  | 'recruitment'
  | 'hr'
  | 'ats'
  | 'employee'
  | 'manager'
  | 'od'
  | 'ops'
  | 'lab';

const PlatformShell: React.FC = () => {
  const {
    lang,
    setLang,
    darkMode,
    setDarkMode,
    currentUser,
    switchUserByRole,
    roles,
    toasts,
    dismissToast,
    cms,
    departments,
    positions,
    seats,
    employees,
    vacancies,
    applications,
    leaves,
    services,
    bookings,
    strategicGoals,
    checkAccessAndAudit,
    notify,
  } = useEnterprise();

  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('public');
  const [publicPage, setPublicPage] = useState<PublicPageId>('home');
  const [adminSubTab, setAdminSubTab] = useState<AdminSubTab>('exec_dashboard');

  const handlePortalSwitch = (target: WorkspaceMode) => {
    if (target === 'public') {
      setWorkspaceMode('public');
      return;
    }
    // Enforce RBAC route protection (Scenario 11)
    if (target === 'admin' && !checkAccessAndAudit('لوحة الإدارة التنفيذية (/admin)', ['super_admin', 'system_admin', 'executive', 'hr_admin', 'auditor', 'finance'])) {
      return;
    }
    if (target === 'hr' && !checkAccessAndAudit('نظام الموارد البشرية (/hr)', ['super_admin', 'hr_admin', 'executive', 'auditor'])) {
      return;
    }
    if (target === 'ats' && !checkAccessAndAudit('بوابة التوظيف والفرز (/ats)', ['super_admin', 'hr_admin', 'recruiter', 'line_manager'])) {
      return;
    }
    if (target === 'manager' && !checkAccessAndAudit('بوابة مدير القسم (/manager)', ['super_admin', 'hr_admin', 'line_manager', 'executive'])) {
      return;
    }
    if (target === 'employee' && !checkAccessAndAudit('بوابة الخدمة الذاتية للموظف (/employee)', ['super_admin', 'hr_admin', 'employee', 'line_manager'])) {
      return;
    }

    if (target === 'recruitment') {
      if (!checkAccessAndAudit('إدارة التوظيف وبوابة الوظائف (Recruitment Management)', ['super_admin', 'system_admin', 'executive', 'hr_admin', 'recruiter'])) {
        return;
      }
      setAdminSubTab('recruitment_manage');
      setWorkspaceMode('admin');
      return;
    }

    if (target === 'hr') {
      setAdminSubTab('hr_employees');
      setWorkspaceMode('admin');
    } else if (target === 'admin') {
      setAdminSubTab('exec_dashboard');
      setWorkspaceMode('admin');
    } else {
      setWorkspaceMode(target);
    }
  };

  const handleDownloadHTML = () => {
    exportStandaloneHTML({
      cms,
      departments,
      positions,
      seats,
      employees,
      vacancies,
      applications,
      leaves,
      services,
      bookings,
      strategicGoals,
    });
    notify(
      'success',
      'تم تصدير وتنزيل ملف HTML المستقل',
      'تم تحميل ملف blue-paradise-enterprise.html الذاتي التشغيل بالكامل.'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] dark:bg-[#0B1D30] text-[#102B46] dark:text-[#F7F5F0]">
      {/* Global Simulation Disclosure & Mode Switcher Bar */}
      <div className="bg-[#102B46] text-[#F7F5F0] border-b border-[#1E8F91]/40 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left/Right Mode Switch Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => handlePortalSwitch('public')}
              className={`px-3 py-1 rounded-md font-bold transition-colors whitespace-nowrap shrink-0 ${
                workspaceMode === 'public'
                  ? 'bg-[#1E8F91] text-white'
                  : 'bg-[#183B5E] text-[#E9D8BD] hover:text-white'
              }`}
            >
              الموقع السياحي العام
            </button>
            <button
              onClick={() => handlePortalSwitch('admin')}
              className={`px-3 py-1 rounded-md font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                workspaceMode === 'admin' && adminSubTab === 'exec_dashboard'
                  ? 'bg-[#1E8F91] text-white'
                  : 'bg-[#183B5E] text-[#E9D8BD] hover:text-white'
              }`}
            >
              لوحة الإدارة (/admin)
            </button>
            <button
              onClick={() => handlePortalSwitch('recruitment')}
              className={`px-3 py-1 rounded-md font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                workspaceMode === 'admin' && adminSubTab === 'recruitment_manage'
                  ? 'bg-[#1E8F91] text-white'
                  : 'bg-[#183B5E] text-[#E9D8BD] hover:text-white'
              }`}
            >
              إدارة التوظيف (Recruitment)
            </button>
            <button
              onClick={() => handlePortalSwitch('hr')}
              className={`px-3 py-1 rounded-md font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                workspaceMode === 'admin' && adminSubTab.startsWith('hr_')
                  ? 'bg-[#1E8F91] text-white'
                  : 'bg-[#183B5E] text-[#E9D8BD] hover:text-white'
              }`}
            >
              نظام الموارد البشرية (HRIS)
            </button>
            <button
              onClick={() => handlePortalSwitch('ats')}
              className={`px-3 py-1 rounded-md font-bold transition-colors whitespace-nowrap shrink-0 ${
                workspaceMode === 'ats'
                  ? 'bg-[#1E8F91] text-white'
                  : 'bg-[#183B5E] text-[#E9D8BD] hover:text-white'
              }`}
            >
              بوابة التوظيف (ATS)
            </button>
            <button
              onClick={() => handlePortalSwitch('employee')}
              className={`px-3 py-1 rounded-md font-bold transition-colors whitespace-nowrap shrink-0 ${
                workspaceMode === 'employee'
                  ? 'bg-[#1E8F91] text-white'
                  : 'bg-[#183B5E] text-[#E9D8BD] hover:text-white'
              }`}
            >
              بوابة الموظف (/employee)
            </button>
            <button
              onClick={() => handlePortalSwitch('manager')}
              className={`px-3 py-1 rounded-md font-bold transition-colors whitespace-nowrap shrink-0 ${
                workspaceMode === 'manager'
                  ? 'bg-[#1E8F91] text-white'
                  : 'bg-[#183B5E] text-[#E9D8BD] hover:text-white'
              }`}
            >
              بوابة المدير (/manager)
            </button>
            <button
              onClick={() => handlePortalSwitch('od')}
              className={`px-3 py-1 rounded-md font-bold transition-colors whitespace-nowrap shrink-0 ${
                workspaceMode === 'od'
                  ? 'bg-[#1E8F91] text-white'
                  : 'bg-[#183B5E] text-[#E9D8BD] hover:text-white'
              }`}
            >
              التطوير المؤسسي (OD)
            </button>
            <button
              onClick={() => handlePortalSwitch('lab')}
              className={`px-3 py-1 rounded-md font-bold transition-colors whitespace-nowrap shrink-0 ${
                workspaceMode === 'lab'
                  ? 'bg-[#1E8F91] text-white'
                  : 'bg-[#183B5E] text-[#E9D8BD] hover:text-white'
              }`}
            >
              مختبر السيناريوهات (12)
            </button>
          </div>

          {/* Role Switcher, Language, Theme & Standalone HTML Download */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="تبديل الدور الوظيفي (RBAC)"
              value={currentUser.role_id}
              onChange={(e) => switchUserByRole(e.target.value as RoleId)}
              className="bg-[#183B5E] text-[#F7F5F0] border border-[#1E8F91]/60 rounded-md px-2.5 py-1 text-xs font-bold"
            >
              {roles.map((r) => (
                <option key={r.role_id} value={r.role_id}>
                  الدور: {r.role_name_ar}
                </option>
              ))}
            </select>

            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-2.5 py-1 rounded-md bg-[#183B5E] hover:bg-[#236A9F] text-white font-bold whitespace-nowrap shrink-0"
            >
              {lang === 'ar' ? 'EN (LTR)' : 'العربية (RTL)'}
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-md bg-[#183B5E] hover:bg-[#236A9F] text-[#E9D8BD]"
              title="تبديل الوضع الليلي / النهاري"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleDownloadHTML}
              className="px-3 py-1 rounded-md bg-[#D97965] hover:bg-[#c56753] text-white font-bold flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="تنزيل المنصة كاملة كملف HTML واحد مستقل"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل ملف HTML مستقل</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content View: Either Public Website OR Enterprise Sidebar Workspace */}
      {workspaceMode === 'public' ? (
        <PublicWebsite
          activePage={publicPage}
          setActivePage={setPublicPage}
          onNavigatePortal={(p) => handlePortalSwitch(p)}
        />
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Enterprise Fixed Sidebar (260px on desktop) */}
          <aside className="w-full lg:w-[260px] bg-[#102B46] text-[#F7F5F0] border-l border-[#1E8F91]/30 p-5 flex flex-col justify-between shrink-0">
            <div className="space-y-6">
              <div className="pb-4 border-b border-[#1E8F91]/30">
                <BrandLogo variant="light" />
                <div className="text-[11px] text-[#E9D8BD] mt-2">
                  المنصة الإدارية ونظام تكنولوجيا الموارد البشرية (HRIS & Enterprise)
                </div>
              </div>

              <nav className="space-y-1.5 text-xs">
                <button
                  onClick={() => {
                    setWorkspaceMode('admin');
                    setAdminSubTab('exec_dashboard');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg font-bold transition-colors text-right cursor-pointer ${
                    workspaceMode === 'admin' && adminSubTab === 'exec_dashboard'
                      ? 'bg-[#1E8F91] text-white'
                      : 'text-[#E9D8BD] hover:bg-[#183B5E]'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span>لوحة القيادة التنفيذية</span>
                </button>

                <button
                  onClick={() => handlePortalSwitch('recruitment')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg font-bold transition-colors text-right cursor-pointer ${
                    workspaceMode === 'admin' && adminSubTab === 'recruitment_manage'
                      ? 'bg-[#1E8F91] text-white'
                      : 'text-[#E9D8BD] hover:bg-[#183B5E]'
                  }`}
                >
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span>Recruitment Management – إدارة التوظيف</span>
                </button>

                <button
                  onClick={() => {
                    setWorkspaceMode('admin');
                    setAdminSubTab('org_manage');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg font-bold transition-colors text-right ${
                    workspaceMode === 'admin' && (adminSubTab === 'org_manage' || adminSubTab === 'cms_manage')
                      ? 'bg-[#1E8F91] text-white'
                      : 'text-[#E9D8BD] hover:bg-[#183B5E]'
                  }`}
                >
                  <Shield className="w-4 h-4 shrink-0" />
                  <span>إدارة المؤسسة والمحتوى (CMS)</span>
                </button>

                <button
                  onClick={() => {
                    setWorkspaceMode('admin');
                    setAdminSubTab('hr_employees');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg font-bold transition-colors text-right ${
                    workspaceMode === 'admin' && adminSubTab.startsWith('hr_')
                      ? 'bg-[#1E8F91] text-white'
                      : 'text-[#E9D8BD] hover:bg-[#183B5E]'
                  }`}
                >
                  <Users className="w-4 h-4 shrink-0" />
                  <span>نظام الموارد البشرية (HRIS)</span>
                </button>

                <button
                  onClick={() => handlePortalSwitch('ats')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg font-bold transition-colors text-right ${
                    workspaceMode === 'ats'
                      ? 'bg-[#1E8F91] text-white'
                      : 'text-[#E9D8BD] hover:bg-[#183B5E]'
                  }`}
                >
                  <UserPlus className="w-4 h-4 shrink-0" />
                  <span>بوابة التوظيف والفرز (ATS)</span>
                </button>

                <button
                  onClick={() => handlePortalSwitch('employee')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg font-bold transition-colors text-right ${
                    workspaceMode === 'employee'
                      ? 'bg-[#1E8F91] text-white'
                      : 'text-[#E9D8BD] hover:bg-[#183B5E]'
                  }`}
                >
                  <UserCheck className="w-4 h-4 shrink-0" />
                  <span>بوابة الموظف (/employee)</span>
                </button>

                <button
                  onClick={() => handlePortalSwitch('manager')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg font-bold transition-colors text-right ${
                    workspaceMode === 'manager'
                      ? 'bg-[#1E8F91] text-white'
                      : 'text-[#E9D8BD] hover:bg-[#183B5E]'
                  }`}
                >
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span>بوابة مدير القسم (/manager)</span>
                </button>

                <button
                  onClick={() => handlePortalSwitch('od')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg font-bold transition-colors text-right ${
                    workspaceMode === 'od'
                      ? 'bg-[#1E8F91] text-white'
                      : 'text-[#E9D8BD] hover:bg-[#183B5E]'
                  }`}
                >
                  <Target className="w-4 h-4 shrink-0" />
                  <span>التطوير المؤسسي والمواهب (OD)</span>
                </button>

                <button
                  onClick={() => handlePortalSwitch('ops')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg font-bold transition-colors text-right ${
                    workspaceMode === 'ops'
                      ? 'bg-[#1E8F91] text-white'
                      : 'text-[#E9D8BD] hover:bg-[#183B5E]'
                  }`}
                >
                  <Compass className="w-4 h-4 shrink-0" />
                  <span>العمليات السياحية والتشغيلية</span>
                </button>

                <button
                  onClick={() => handlePortalSwitch('lab')}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg font-bold transition-colors text-right ${
                    workspaceMode === 'lab'
                      ? 'bg-[#1E8F91] text-white'
                      : 'text-[#E9D8BD] hover:bg-[#183B5E]'
                  }`}
                >
                  <FlaskConical className="w-4 h-4 shrink-0" />
                  <span>مختبر السيناريوهات واستيراد البيانات</span>
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#1E8F91]/30 space-y-2 text-xs">
              <div className="text-[#E9D8BD]">المستخدم النشط في المحاكاة:</div>
              <div className="font-bold text-white">{currentUser.display_name}</div>
              <button
                onClick={() => handlePortalSwitch('public')}
                className="w-full mt-2 py-2 bg-[#183B5E] hover:bg-[#1E8F91] text-white rounded-lg font-bold flex items-center justify-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>العودة للموقع السياحي العام</span>
              </button>
            </div>
          </aside>

          {/* Enterprise Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Contextual Workspace Top Header */}
            <header className="bg-white dark:bg-[#102B46] border-b border-[#E9D8BD] dark:border-[#1E8F91]/30 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-bold text-[#354554] dark:text-[#E9D8BD]">
                <span>بلو برادايس (العقبة)</span>
                <span className="mx-2">/</span>
                <span className="text-[#102B46] dark:text-white">
                  {workspaceMode === 'admin' && 'لوحة الإدارة الرئيسية ونظام الموارد البشرية (HRIS)'}
                  {workspaceMode === 'ats' && 'بوابة الاستقطاب وتتبع المتقدمين (Recruitment & ATS)'}
                  {workspaceMode === 'employee' && 'بوابة الخدمة الذاتية للموظف (/employee)'}
                  {workspaceMode === 'manager' && 'بوابة مدير القسم (/manager)'}
                  {workspaceMode === 'od' && 'التطوير المؤسسي وإدارة المواهب (OD)'}
                  {workspaceMode === 'ops' && 'العمليات السياحية والتشغيلية'}
                  {workspaceMode === 'lab' && 'مختبر السيناريوهات التدريبية واستيراد البيانات وسجل التدقيق'}
                </span>
              </div>
              <div className="text-xs text-[#354554] dark:text-[#E9D8BD] tabular-nums">
                الإدارات: <b>10</b> · المسميات: <b>{positions.length}</b> · المقاعد: <b>{seats.length}</b> · الموظفون النشطون:{' '}
                <b className="text-[#1E8F91]">{employees.filter((e) => e.employment_status !== 'Inactive').length}</b>
              </div>
            </header>

            <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
              {workspaceMode === 'admin' && (
                <AdminAndHRISPortal
                  activeSubTab={adminSubTab}
                  setActiveSubTab={setAdminSubTab}
                  onPreviewVisitorCareers={() => {
                    setPublicPage('careers');
                    setWorkspaceMode('public');
                  }}
                />
              )}
              {(workspaceMode === 'ats' || workspaceMode === 'employee' || workspaceMode === 'manager') && (
                <ATSAndSelfServicePortals mode={workspaceMode} />
              )}
              {(workspaceMode === 'od' || workspaceMode === 'ops' || workspaceMode === 'lab') && (
                <ODAndOperationsLab mode={workspaceMode} />
              )}
            </main>
          </div>
        </div>
      )}

      {/* Toast Notifications Container */}
      <div className="fixed bottom-5 left-5 z-50 space-y-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-lg border text-xs flex items-start justify-between gap-3 ${
              t.type === 'error'
                ? 'bg-red-900 text-white border-red-400'
                : t.type === 'warning'
                ? 'bg-[#D97965] text-white border-white/30'
                : 'bg-[#102B46] text-white border-[#1E8F91]'
            }`}
          >
            <div>
              <div className="font-bold text-sm mb-0.5">{t.title}</div>
              <div className="text-[#F7F5F0]/90 leading-relaxed">{t.message}</div>
            </div>
            <button onClick={() => dismissToast(t.id)} className="opacity-80 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <EnterpriseProvider>
      <PlatformShell />
    </EnterpriseProvider>
  );
}
