import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import TaskBoard from "./Pages/TaskBoard";
import HumanResources from "./Pages/HumanResources";
import CRM from "./Pages/CRM";
import LandingPage from "./component/LandingPage";
import Login from "./AuthForms";
import Signup from "./AuthSignUp";
import ProjectManagement from "./Pages/ProjectManagement";
import AnnouncementPage from "./Pages/AnnouncementPage";
import EmployeeAttendance from "./Pages/EmployeeAttendance";
import EmployeePayroll from "./Pages/EmployeePayroll";
import EmployeeLeaveManagement from "./Pages/EmployeeLeaveManagement";
import TeamOverviewPage from "./Pages/TeamOverviewPage";
import ManagerProjectsPage from "./Pages/ManagerProjectsPage";
import ManagerApprovals from "./Pages/ManagerApprovals";
import SetPassword from "./Pages/SetPassword";
import Projects from "./PM/ProjectsTab";
import Tasks from "./PM/TasksTab";
import Team from "./PM/TeamsTab";
import Calendar from "./PM/Calendar";
import TimeTracking from "./PM/TimeTrackingTab";
import Files from "./PM/Files";
import Goals from "./PM/Goals";
import Performance from "./PM/Performance";
import Reports from "./PM/Reports";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />



        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/team" element={<Team />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/time-tracking" element={<TimeTracking />} />
        <Route path="/files" element={<Files />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/reports" element={<Reports />} />








        <Route path="/human-resources" element={<HumanResources />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/employee/tasks" element={<TaskBoard />} />
        <Route path="/employee/announcements" element={<AnnouncementPage />} />
        <Route path="/employee/attendance" element={<EmployeeAttendance />} />
        <Route path="/employee/payroll" element={<EmployeePayroll />} />
        <Route
          path="/employee/leave-management"
          element={<EmployeeLeaveManagement />}
        />
        <Route path="/manager/team-overview" element={<TeamOverviewPage />} />
        <Route path="/manager/tasks" element={<TaskBoard />} />
        <Route
          path="/manager/project-overview"
          element={<ManagerProjectsPage />}
        />
        <Route path="/manager/approvals" element={<ManagerApprovals />} />
        <Route path="/set-password" element={<SetPassword />} />

        <Route path="/home" element={<Navigate to="/dashboard" />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <h1 className="text-2xl font-semibold text-red-500">
                404 - Page Not Found
              </h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
