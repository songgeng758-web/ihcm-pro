import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { EmployeeList } from "./components/EmployeeList";
import { EmployeeDetail } from "./components/EmployeeDetail";
import { PlaceholderPage } from "./components/PlaceholderPage";
import { RecruitmentJobs } from "./components/recruitment/RecruitmentJobs";
import { RecruitmentPipeline } from "./components/recruitment/RecruitmentPipeline";
import { CandidateDetail } from "./components/recruitment/CandidateDetail";
import { PerformanceCycles } from "./components/performance/PerformanceCycles";
import { MyPerformance } from "./components/performance/MyPerformance";
import { TeamPerformance } from "./components/performance/TeamPerformance";
import { NineBox } from "./components/performance/NineBox";
import { PayrollCalculation } from "./components/payroll/PayrollCalculation";
import { PayrollStructure } from "./components/payroll/PayrollStructure";
import { MyPayroll } from "./components/payroll/MyPayroll";
import { AttendanceCalendar } from "./components/attendance/AttendanceCalendar";
import { LeaveManagement } from "./components/attendance/LeaveManagement";
import { SelfServicePortal } from "./components/self-service/SelfServicePortal";
import { ManagerApprovals } from "./components/manager/ManagerApprovals";
import { ReportCenter } from "./components/insights/ReportCenter";
import { TurnoverRisk } from "./components/insights/TurnoverRisk";
import { OrgHealth } from "./components/insights/OrgHealth";
import { OrgStructure } from "./components/organization/OrgStructure";
import { Transitions } from "./components/organization/Transitions";
import { Training } from "./components/talent/Training";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "employees", Component: EmployeeList },
      { path: "employees/:id", Component: EmployeeDetail },
      { path: "org/structure", Component: OrgStructure },
      { path: "org/transitions", Component: Transitions },
      { path: "organization", Component: OrgStructure },
      { path: "movements", Component: Transitions },
      { path: "recruit/jobs", Component: RecruitmentJobs },
      { path: "recruit/pipeline/:jobId", Component: RecruitmentPipeline },
      { path: "recruit/candidate/:candidateId", Component: CandidateDetail },
      { path: "performance/cycles", Component: PerformanceCycles },
      { path: "performance/my", Component: MyPerformance },
      { path: "performance/team", Component: TeamPerformance },
      { path: "performance/nine-box", Component: NineBox },
      { path: "talent/training", Component: Training },
      { path: "training", Component: Training },
      { path: "payroll/calculation", Component: PayrollCalculation },
      { path: "payroll/structure", Component: PayrollStructure },
      { path: "payroll/my", Component: MyPayroll },
      { path: "attendance", Component: AttendanceCalendar },
      { path: "attendance/calendar", Component: AttendanceCalendar },
      { path: "attendance/leave", Component: LeaveManagement },
      { path: "self-service", Component: SelfServicePortal },
      { path: "self-service/portal", Component: SelfServicePortal },
      { path: "manager/approvals", Component: ManagerApprovals },
      { path: "dashboards", Component: Dashboard },
      { path: "reports/center", Component: ReportCenter },
      { path: "insights/turnover-risk", Component: TurnoverRisk },
      { path: "insights/org-health", Component: OrgHealth },
      { path: "analytics", Component: PlaceholderPage },
      { path: "settings", Component: PlaceholderPage },
    ],
  },
]);
