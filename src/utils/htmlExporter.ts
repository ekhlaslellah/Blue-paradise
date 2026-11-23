import {
  Department,
  Position,
  Seat,
  Employee,
  Vacancy,
  Application,
  LeaveRequest,
  ServiceItem,
  BookingRecord,
  StrategicGoal,
  CMSContent,
} from '../types/enterprise';

export function exportStandaloneHTML(state: {
  cms: CMSContent;
  departments: Department[];
  positions: Position[];
  seats: Seat[];
  employees: Employee[];
  vacancies: Vacancy[];
  applications: Application[];
  leaves: LeaveRequest[];
  services: ServiceItem[];
  bookings: BookingRecord[];
  strategicGoals: StrategicGoal[];
}) {
  const serialized = JSON.stringify(state).replace(/</g, '\\u003c');

  const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>بلو برادايس | Blue Paradise — المنصة المؤسسية ونظام الموارد البشرية (ملف HTML مستقل)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --bp-navy: #102B46;
      --bp-teal: #1E8F91;
      --bp-blue: #236A9F;
      --bp-sand: #E9D8BD;
      --bp-ivory: #F7F5F0;
      --bp-coral: #D97965;
      --bp-gray: #354554;
    }
    *, *::before, *::after, html, body, button, input, select, textarea, h1, h2, h3, h4, h5, h6 {
      font-family: Arial, sans-serif !important;
    }
    body {
      background-color: var(--bp-ivory);
      color: var(--bp-navy);
      margin: 0;
    }
    .tabular-nums { font-variant-numeric: tabular-nums; }
  </style>
</head>
<body class="min-h-screen flex flex-col bg-[#F7F5F0] text-[#102B46]">
  <!-- Top Simulation Banner -->
  <div class="bg-[#102B46] text-[#E9D8BD] text-xs px-4 py-2 border-b border-[#1E8F91]/30 flex flex-wrap items-center justify-between gap-2">
    <span>بيئة محاكاة تدريبية — شركة بلو برادايس للمنتجعات والتجارب السياحية (العقبة - الأردن) | جميع البيانات تجريبية وافتراضية</span>
    <div class="flex items-center gap-3">
      <label class="text-xs">الدور النشط (RBAC):</label>
      <select id="roleSelect" onchange="switchRole(this.value)" class="bg-[#183B5E] text-white text-xs rounded px-2 py-1 border border-[#1E8F91]">
        <option value="super_admin">Super Admin — مدير النظام الأعلى</option>
        <option value="hr_admin">HR Admin — مدير الموارد البشرية</option>
        <option value="line_manager">Department Manager — مدير قسم</option>
        <option value="employee">Employee — بوابة الموظف</option>
        <option value="visitor">Visitor — زائر الموقع العام</option>
      </select>
      <button onclick="toggleLang()" class="bg-[#1E8F91] text-white px-2.5 py-1 rounded text-xs font-bold">AR / EN</button>
    </div>
  </div>

  <!-- Main Header -->
  <header class="bg-white border-b border-[#E9D8BD] px-6 py-4 flex items-center justify-between gap-6 sticky top-0 z-30">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-lg bg-[#102B46] text-white flex items-center justify-center font-bold text-sm">BP</div>
      <span class="text-lg font-bold text-[#102B46] whitespace-nowrap">بلو برادايس | Blue Paradise</span>
    </div>
    <nav class="flex flex-wrap items-center gap-4 text-sm font-bold text-[#354554]">
      <button onclick="showTab('public')" id="nav-public" class="hover:text-[#1E8F91] py-1 border-b-2 border-[#1E8F91] text-[#102B46]">الموقع السياحي العام</button>
      <button onclick="showTab('careers')" id="nav-careers" class="hover:text-[#1E8F91] py-1">الوظائف والتقديم (Careers)</button>
      <button onclick="showTab('admin')" id="nav-admin" class="hover:text-[#1E8F91] py-1">لوحة الإدارة وHRIS</button>
      <button onclick="showTab('ats')" id="nav-ats" class="hover:text-[#1E8F91] py-1">نظام الاستقطاب (ATS)</button>
      <button onclick="showTab('employee')" id="nav-employee" class="hover:text-[#1E8F91] py-1">بوابة الموظف والمدير</button>
      <button onclick="showTab('od')" id="nav-od" class="hover:text-[#1E8F91] py-1">التطوير المؤسسي (OD)</button>
    </nav>
    <div>
      <button onclick="showTab('booking')" class="bg-[#1E8F91] hover:bg-[#236A9F] text-white px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap">حجز تجربة / إقامة</button>
    </div>
  </header>

  <div id="toastBox" class="fixed bottom-5 left-5 z-50 space-y-2 max-w-sm"></div>

  <!-- Dynamic Content Container -->
  <main id="appContainer" class="flex-1 max-w-7xl w-full mx-auto px-6 py-8"></main>

  <footer class="bg-[#102B46] text-[#F7F5F0] py-8 px-6 mt-12 border-t border-[#1E8F91]/30">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E9D8BD]">
      <div>بلو برادايس للمنتجعات والتجارب السياحية (Blue Paradise Resorts & Experiences) — العقبة، الأردن (شركة افتراضية للمحاكاة التدريبية)</div>
      <div>الأقسام: 10 · المسميات: 39 · المقاعد المخططة: 96 · الموظفون: <span id="footerEmpCount">72</span> · الشواغر: <span id="footerVacCount">24</span></div>
    </div>
  </footer>

  <script>
    const DB = ${serialized};
    let currentTab = 'public';
    let currentRole = 'super_admin';
    let currentDir = 'rtl';

    function notify(title, msg, isError = false) {
      const box = document.getElementById('toastBox');
      const el = document.createElement('div');
      el.className = (isError ? 'bg-red-800' : 'bg-[#102B46]') + ' text-white p-3.5 rounded-lg border border-[#1E8F91] shadow-lg text-xs';
      el.innerHTML = '<div class="font-bold mb-1">' + title + '</div><div class="text-[#E9D8BD]">' + msg + '</div>';
      box.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }

    function toggleLang() {
      currentDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.dir = currentDir;
      document.documentElement.lang = currentDir === 'rtl' ? 'ar' : 'en';
      notify('تغيير اتجاه الواجهة', currentDir === 'rtl' ? 'تم تفعيل العربية (RTL)' : 'Switched to English (LTR)');
      render();
    }

    function switchRole(r) {
      currentRole = r;
      notify('تبديل الدور (RBAC)', 'الدور الحالي: ' + r);
      render();
    }

    function showTab(t) {
      if ((t === 'admin' || t === 'ats' || t === 'od') && currentRole === 'visitor') {
        notify('403 — وصول مرفوض', 'دور الزائر غير مخول بالدخول إلى لوحات الإدارة الداخلية.', true);
        return;
      }
      currentTab = t;
      ['public','careers','admin','ats','employee','od'].forEach(id => {
        const btn = document.getElementById('nav-' + id);
        if (btn) btn.className = (id === t) ? 'py-1 border-b-2 border-[#1E8F91] text-[#102B46] font-bold' : 'hover:text-[#1E8F91] py-1 text-[#354554]';
      });
      render();
    }

    function submitSimulatedBooking(e) {
      e.preventDefault();
      const srvId = document.getElementById('bkgSrv').value;
      const guest = document.getElementById('bkgGuest').value;
      const count = Number(document.getElementById('bkgCount').value || 2);
      const start = document.getElementById('bkgStart').value;
      const end = document.getElementById('bkgEnd').value;
      if (end < start) {
        notify('خطأ في التاريخ', 'تاريخ المغادرة لا يمكن أن يسبق تاريخ الوصول.', true);
        return;
      }
      const srv = DB.services.find(s => s.service_id === srvId) || DB.services[0];
      const newBkg = {
        booking_id: 'BKG00' + (DB.bookings.length + 1),
        service_id: srvId,
        guest_alias: guest + ' (ضيف افتراضي)',
        guest_email_test: 'guest@sim.jo',
        visitors_count: count,
        start_date: start,
        end_date: end,
        amount_jod: srv.base_price_jod * count,
        booking_status: 'Confirmed',
        created_at: new Date().toISOString().slice(0, 10)
      };
      DB.bookings.unshift(newBkg);
      notify('تم تأكيد الحجز التجريبي #' + newBkg.booking_id, 'انتقل الحجز إلى قاعدة البيانات ولوحة الإدارة (حجز تدريبي بدون دفع حقيقي).');
      render();
    }

    function applyJob(e) {
      e.preventDefault();
      const vacId = document.getElementById('appVac').value;
      const name = document.getElementById('appName').value;
      const qual = document.getElementById('appQual').value;
      const exp = Number(document.getElementById('appExp').value || 2);
      const newApp = {
        application_id: 'A00' + (DB.applications.length + 1),
        vacancy_id: vacId,
        candidate_alias: name + ' (مرشح تجريبي)',
        contact_test: 'candidate@sim.jo',
        qualification: qual,
        years_experience: exp,
        skills: ['خدمة العملاء', 'التواصل الفعال'],
        answers: [],
        applied_at: new Date().toISOString().slice(0, 10),
        stage: 'Applied',
        consent_flag: true,
        score_reference: 85,
        source_channel: 'بوابة الوظائف المستقلة',
        human_reviewer_notes: 'طلب جديد قيد الفرز البشري'
      };
      DB.applications.unshift(newApp);
      notify('تم إرسال طلب التوظيف #' + newApp.application_id, 'ظهر الطلب الآن في نظام تتبع المتقدمين ATS.');
      showTab('ats');
    }

    function hireApplicant(appId) {
      if (currentRole !== 'super_admin' && currentRole !== 'hr_admin') {
        notify('403 — صلاحية غير كافية', 'التعيين النهائي يتطلب صلاحية مدير الموارد البشرية أو مدير النظام.', true);
        return;
      }
      const app = DB.applications.find(a => a.application_id === appId);
      if (!app) return;
      const vac = DB.vacancies.find(v => v.vacancy_id === app.vacancy_id) || DB.vacancies[0];
      const seat = DB.seats.find(s => s.seat_id === vac.seat_id);
      if (seat && seat.seat_status === 'Occupied') {
        notify('منع ازدواج المقعد', 'المقعد مشغول بالفعل ولا يمكن إسناد موظفين نشطين لنفس المقعد.', true);
        return;
      }
      const empId = 'E0' + (DB.employees.length + 1);
      DB.employees.unshift({
        employee_id: empId,
        seat_id: vac.seat_id,
        display_name_alias: app.candidate_alias,
        department_id: vac.department_id,
        position_id: vac.position_id,
        hire_date: new Date().toISOString().slice(0, 10),
        employment_status: 'Probation',
        work_email_test: empId.toLowerCase() + '@blueparadise.sim.jo',
        manager_employee_id: 'E001',
        base_salary_jod: 600,
        leave_balance_days: 14,
        skills: []
      });
      if (seat) { seat.seat_status = 'Occupied'; seat.assigned_employee_id = empId; }
      vac.status = 'Closed';
      app.stage = 'Hired';
      notify('تم التعيين وربط المقعد', 'تحول المرشح إلى موظف ' + empId + ' على المقعد ' + vac.seat_id);
      render();
    }

    function render() {
      const container = document.getElementById('appContainer');
      const occupiedCount = DB.seats.filter(s => s.seat_status === 'Occupied').length;
      const vacantCount = DB.seats.filter(s => s.seat_status === 'Vacant').length;
      document.getElementById('footerEmpCount').textContent = DB.employees.length;
      document.getElementById('footerVacCount').textContent = vacantCount;

      if (currentTab === 'public' || currentTab === 'booking') {
        container.innerHTML = \`
          <section class="rounded-2xl overflow-hidden bg-[#102B46] text-white p-8 md:p-12 mb-10 border border-[#1E8F91]/40">
            <div class="max-w-3xl">
              <div class="text-xs text-[#E9D8BD] mb-2">\${DB.cms.slogan_ar} · \${DB.cms.slogan_en}</div>
              <h1 class="text-3xl md:text-5xl font-bold mb-4 leading-tight">\${DB.cms.hero_title_ar}</h1>
              <p class="text-base text-[#F7F5F0]/90 mb-6 leading-relaxed">\${DB.cms.hero_subtitle_ar}</p>
              <div class="flex flex-wrap gap-3">
                <button onclick="showTab('careers')" class="bg-[#1E8F91] hover:bg-[#236A9F] text-white px-5 py-2.5 rounded-lg text-sm font-bold">الوظائف المتاحة (\${DB.vacancies.filter(v=>v.status==='Published').length})</button>
                <button onclick="showTab('admin')" class="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-lg text-sm font-bold">دخول لوحة الإدارة وHRIS</button>
              </div>
            </div>
          </section>

          <section class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div class="bg-white p-6 rounded-xl border border-[#E9D8BD]">
              <h2 class="text-lg font-bold mb-2 text-[#102B46]">الرؤية المعتمدة</h2>
              <p class="text-sm text-[#354554] leading-relaxed">\${DB.cms.vision_ar}</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-[#E9D8BD]">
              <h2 class="text-lg font-bold mb-2 text-[#102B46]">الرسالة المؤسسية</h2>
              <p class="text-sm text-[#354554] leading-relaxed">\${DB.cms.mission_ar}</p>
            </div>
          </section>

          <h2 class="text-2xl font-bold mb-4">الإقامات والتجارب السياحية الموثقة</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            \${DB.services.map(s => \`
              <div class="bg-white rounded-xl border border-[#E9D8BD] p-5 flex flex-col justify-between">
                <div>
                  <div class="text-xs text-[#1E8F91] font-bold mb-1">\${s.category} · \${s.target_audience}</div>
                  <h3 class="text-base font-bold mb-2">\${s.name}</h3>
                  <p class="text-xs text-[#354554] mb-4 leading-relaxed">\${s.description}</p>
                </div>
                <div class="pt-3 border-t border-[#E9D8BD] flex items-center justify-between">
                  <span class="font-bold text-sm tabular-nums">\${s.base_price_jod} دينار أردني (JOD)</span>
                  <span class="text-xs text-[#354554]">القسم: \${s.responsible_department_id}</span>
                </div>
              </div>
            \`).join('')}
          </div>

          <section class="bg-white rounded-xl border border-[#E9D8BD] p-6">
            <h2 class="text-xl font-bold mb-4">نموذج الحجز التجريبي الفوري (ينتقل مباشرة إلى لوحة الإدارة)</h2>
            <form onsubmit="submitSimulatedBooking(event)" class="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div>
                <label class="block text-xs font-bold mb-1">الخدمة أو الإقامة</label>
                <select id="bkgSrv" class="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 text-xs">
                  \${DB.services.map(s => \`<option value="\${s.service_id}">\${s.name} (\${s.base_price_jod} JOD)</option>\`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold mb-1">اسم الضيف الافتراضي</label>
                <input id="bkgGuest" required placeholder="مثال: عائلة السالم" class="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 text-xs" />
              </div>
              <div>
                <label class="block text-xs font-bold mb-1">عدد الزوار</label>
                <input id="bkgCount" type="number" min="1" max="20" value="2" class="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 text-xs tabular-nums" />
              </div>
              <div>
                <label class="block text-xs font-bold mb-1">تاريخ الوصول والمغادرة</label>
                <div class="flex gap-1">
                  <input id="bkgStart" type="date" value="2026-11-20" class="w-1/2 border border-[#E9D8BD] rounded-lg px-2 py-2 text-xs" />
                  <input id="bkgEnd" type="date" value="2026-11-22" class="w-1/2 border border-[#E9D8BD] rounded-lg px-2 py-2 text-xs" />
                </div>
              </div>
              <button type="submit" class="bg-[#102B46] hover:bg-[#1E8F91] text-white font-bold py-2.5 px-4 rounded-lg text-xs">تأكيد الحجز التجريبي</button>
            </form>
          </section>
        \`;
      } else if (currentTab === 'careers') {
        const pubVacs = DB.vacancies.filter(v => v.status === 'Published');
        container.innerHTML = \`
          <h1 class="text-2xl font-bold mb-2">بوابة الوظائف والاستقطاب (Careers)</h1>
          <p class="text-sm text-[#354554] mb-6">جميع الشواغر مرتبطة مباشرة بجدول المسميات (39 مسمى) والمقاعد المخططة (96 مقعداً). لا تطلب النسخة التدريبية أي أرقام وطنية أو وثائق حقيقية.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            \${pubVacs.map(v => {
              const pos = DB.positions.find(p => p.position_id === v.position_id);
              const dept = DB.departments.find(d => d.department_id === v.department_id);
              return \`
                <div class="bg-white rounded-xl border border-[#E9D8BD] p-5">
                  <div class="text-xs text-[#1E8F91] font-bold mb-1">الشاغر \${v.vacancy_id} · المقعد \${v.seat_id} · \${dept ? dept.name_ar : v.department_id}</div>
                  <h3 class="text-lg font-bold mb-2">\${pos ? pos.title_ar : v.position_id}</h3>
                  <p class="text-xs text-[#354554] mb-3">\${pos ? pos.description : ''}</p>
                  <div class="text-xs text-[#102B46] font-bold tabular-nums">النطاق التدريبي: \${pos ? pos.salary_min_jod + ' - ' + pos.salary_max_jod : ''} JOD | الإغلاق: \${v.closing_date}</div>
                </div>
              \`;
            }).join('')}
          </div>
          <div class="bg-white rounded-xl border border-[#E9D8BD] p-6">
            <h2 class="text-lg font-bold mb-4">نموذج التقديم الإلكتروني المباشر إلى نظام ATS</h2>
            <form onsubmit="applyJob(event)" class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label class="block text-xs font-bold mb-1">اختر الشاغر</label>
                <select id="appVac" class="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 text-xs">
                  \${pubVacs.map(v => \`<option value="\${v.vacancy_id}">\${v.vacancy_id} — مقعد \${v.seat_id}</option>\`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold mb-1">الاسم المستعار للمتقدم</label>
                <input id="appName" required placeholder="مثال: رامي الحسن" class="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 text-xs" />
              </div>
              <div>
                <label class="block text-xs font-bold mb-1">المؤهل والتخصص</label>
                <input id="appQual" required placeholder="بكالوريوس سياحة وفندقة" class="w-full border border-[#E9D8BD] rounded-lg px-3 py-2 text-xs" />
              </div>
              <div class="flex gap-2">
                <input id="appExp" type="number" min="0" max="25" value="3" class="w-20 border border-[#E9D8BD] rounded-lg px-2 py-2 text-xs tabular-nums" title="سنوات الخبرة" />
                <button type="submit" class="flex-1 bg-[#1E8F91] text-white font-bold py-2 px-4 rounded-lg text-xs">إرسال الطلب لـ ATS</button>
              </div>
            </form>
          </div>
        \`;
      } else if (currentTab === 'admin') {
        container.innerHTML = \`
          <h1 class="text-2xl font-bold mb-6">لوحة القيادة التنفيذية ونظام الموارد البشرية (HRIS)</h1>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div class="bg-white p-4 rounded-xl border border-[#E9D8BD]">
              <div class="text-xs text-[#354554]">المقاعد المخططة</div>
              <div class="text-2xl font-bold tabular-nums">\${DB.seats.length}</div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-[#E9D8BD]">
              <div class="text-xs text-[#354554]">الموظفون الفعليون</div>
              <div class="text-2xl font-bold text-[#1E8F91] tabular-nums">\${occupiedCount}</div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-[#E9D8BD]">
              <div class="text-xs text-[#354554]">المقاعد الشاغرة</div>
              <div class="text-2xl font-bold text-[#D97965] tabular-nums">\${vacantCount}</div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-[#E9D8BD]">
              <div class="text-xs text-[#354554]">طلبات التوظيف (ATS)</div>
              <div class="text-2xl font-bold tabular-nums">\${DB.applications.length}</div>
            </div>
            <div class="bg-white p-4 rounded-xl border border-[#E9D8BD]">
              <div class="text-xs text-[#354554]">الحجوزات التجريبية</div>
              <div class="text-2xl font-bold tabular-nums">\${DB.bookings.length}</div>
            </div>
          </div>

          <h2 class="text-lg font-bold mb-3">الإدارات العشر المعتمدة (D01 – D10) وتوزيع المقاعد الـ 96</h2>
          <div class="bg-white rounded-xl border border-[#E9D8BD] overflow-x-auto mb-8">
            <table class="w-full text-right text-xs">
              <thead class="bg-[#102B46] text-white">
                <tr>
                  <th class="p-3">الرمز</th>
                  <th class="p-3">الإدارة</th>
                  <th class="p-3">المقاعد المخططة</th>
                  <th class="p-3">المشغولة</th>
                  <th class="p-3">الشاغرة</th>
                </tr>
              </thead>
              <tbody>
                \${DB.departments.map(d => {
                  const occ = DB.seats.filter(s => s.department_id === d.department_id && s.seat_status === 'Occupied').length;
                  const vac = DB.seats.filter(s => s.department_id === d.department_id && s.seat_status === 'Vacant').length;
                  return \`
                    <tr class="border-b border-[#E9D8BD]">
                      <td class="p-3 font-bold tabular-nums">\${d.department_id}</td>
                      <td class="p-3 font-bold">\${d.name_ar} (\${d.name_en})</td>
                      <td class="p-3 tabular-nums">\${d.planned_seats}</td>
                      <td class="p-3 text-[#1E8F91] font-bold tabular-nums">\${occ}</td>
                      <td class="p-3 text-[#D97965] font-bold tabular-nums">\${vac}</td>
                    </tr>
                  \`;
                }).join('')}
              </tbody>
            </table>
          </div>

          <h2 class="text-lg font-bold mb-3">سجل الموظفين النشطين (\${DB.employees.length} موظفاً مرتبطاً بمقعد فريد)</h2>
          <div class="bg-white rounded-xl border border-[#E9D8BD] overflow-x-auto max-h-96">
            <table class="w-full text-right text-xs">
              <thead class="bg-[#102B46] text-white sticky top-0">
                <tr>
                  <th class="p-3">الرقم الوظيفي</th>
                  <th class="p-3">الاسم المستعار</th>
                  <th class="p-3">المقعد</th>
                  <th class="p-3">القسم</th>
                  <th class="p-3">المسمى</th>
                  <th class="p-3">تاريخ التعيين</th>
                  <th class="p-3">الحالة</th>
                </tr>
              </thead>
              <tbody>
                \${DB.employees.map(e => \`
                  <tr class="border-b border-[#E9D8BD]">
                    <td class="p-2.5 font-bold tabular-nums">\${e.employee_id}</td>
                    <td class="p-2.5">\${e.display_name_alias}</td>
                    <td class="p-2.5 tabular-nums">\${e.seat_id}</td>
                    <td class="p-2.5 tabular-nums">\${e.department_id}</td>
                    <td class="p-2.5 tabular-nums">\${e.position_id}</td>
                    <td class="p-2.5 tabular-nums">\${e.hire_date}</td>
                    <td class="p-2.5">\${e.employment_status}</td>
                  </tr>
                \`).join('')}
              </tbody>
            </table>
          </div>
        \`;
      } else if (currentTab === 'ats') {
        container.innerHTML = \`
          <h1 class="text-2xl font-bold mb-2">نظام تتبع المتقدمين (ATS) ولجنة المقابلات</h1>
          <p class="text-xs text-[#354554] mb-6">مراحل التوظيف: Applied → Screening → Shortlisted → Interview → Offer → Hired (مع المراجعة البشرية الإلزامية).</p>
          <div class="space-y-4">
            \${DB.applications.map(a => \`
              <div class="bg-white rounded-xl border border-[#E9D8BD] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div class="text-xs text-[#1E8F91] font-bold mb-1">طلب \${a.application_id} · الشاغر \${a.vacancy_id} · المرحلة الحالية: \${a.stage}</div>
                  <h3 class="text-base font-bold">\${a.candidate_alias} — \${a.qualification}</h3>
                  <p class="text-xs text-[#354554] mt-1">ملاحظة المراجع البشري: \${a.human_reviewer_notes}</p>
                </div>
                <div class="flex items-center gap-2">
                  \${a.stage !== 'Hired' ? \`<button onclick="hireApplicant('\${a.application_id}')" class="bg-[#1E8F91] hover:bg-[#102B46] text-white px-4 py-2 rounded-lg text-xs font-bold">اعتماد التعيين وربط المقعد</button>\` : \`<span class="text-xs font-bold text-[#1E8F91]">تم التعيين (Hired)</span>\`}
                </div>
              </div>
            \`).join('')}
          </div>
        \`;
      } else if (currentTab === 'employee') {
        const emp = DB.employees[7] || DB.employees[0];
        container.innerHTML = \`
          <h1 class="text-2xl font-bold mb-4">بوابة الخدمة الذاتية للموظف وبوابة مدير القسم</h1>
          <div class="bg-white rounded-xl border border-[#E9D8BD] p-6 mb-6">
            <h2 class="text-lg font-bold mb-2">ملف الموظف النشط: \${emp.display_name_alias} (\${emp.employee_id})</h2>
            <div class="text-xs text-[#354554] space-x-4 space-x-reverse">
              <span>المقعد الوظيفي: <b>\${emp.seat_id}</b></span> ·
              <span>القسم: <b>\${emp.department_id}</b></span> ·
              <span>المسمى: <b>\${emp.position_id}</b></span> ·
              <span>رصيد الإجازات: <b>\${emp.leave_balance_days} يوماً</b></span>
            </div>
          </div>
          <h2 class="text-lg font-bold mb-3">طلبات الإجازات وسجل الاعتماد</h2>
          <div class="bg-white rounded-xl border border-[#E9D8BD] p-4 space-y-3">
            \${DB.leaves.map(l => \`
              <div class="flex items-center justify-between border-b border-[#E9D8BD] pb-2 text-xs">
                <div><b>\${l.leave_id}</b> — الموظف \${l.employee_id} · إجازة \${l.leave_type} (\${l.start_date} إلى \${l.end_date}) — \${l.requested_days} أيام</div>
                <span class="font-bold text-[#1E8F91]">\${l.status}</span>
              </div>
            \`).join('')}
          </div>
        \`;
      } else if (currentTab === 'od') {
        container.innerHTML = \`
          <h1 class="text-2xl font-bold mb-4">وحدة التطوير المؤسسي وإدارة المواهب (OD & Strategy 2027–2029)</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            \${DB.strategicGoals.map(g => \`
              <div class="bg-white rounded-xl border border-[#E9D8BD] p-5">
                <div class="text-xs text-[#1E8F91] font-bold mb-1">\${g.pillar_name} · القسم المالك: \${g.owner_department_id}</div>
                <h3 class="text-sm font-bold mb-2">\${g.title}</h3>
                <div class="text-xs text-[#354554] mb-2">المعادلة: \${g.kpi_formula}</div>
                <div class="w-full bg-[#F7F5F0] h-2.5 rounded-full overflow-hidden">
                  <div class="bg-[#1E8F91] h-full" style="width: \${g.current_simulated_progress}%"></div>
                </div>
                <div class="text-xs font-bold mt-1 tabular-nums">نسبة التقدم المحاكاة: \${g.current_simulated_progress}% (المستهدف: \${g.target_2028_2029})</div>
              </div>
            \`).join('')}
          </div>
        \`;
      }
    }

    render();
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'blue-paradise-enterprise.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
