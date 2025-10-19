import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../component/Sidebar";
import {
  FiClipboard,
  FiUsers,
  FiCheckCircle,
  FiBell,
  FiSearch,
  FiTrendingUp,
  FiBarChart2,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { FaTasks, FaProjectDiagram, FaStar } from "react-icons/fa";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(null);

  // ✅ Fetch user from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading NovaTask Dashboard...
      </div>
    );
  }

  const role = user.role?.toLowerCase();
  const darkTextColor = "text-gray-800";
  const lightBg = "bg-gray-50";

  // 🔹 Common Data
  const taskStats = [
    { name: "Pending", value: 8, fill: "#f59e0b" },
    { name: "In Progress", value: 12, fill: "#3b82f6" },
    { name: "Completed", value: 15, fill: "#10b981" },
  ];

  const projectData = [
    { month: "Jan", progress: 60 },
    { month: "Feb", progress: 70 },
    { month: "Mar", progress: 80 },
    { month: "Apr", progress: 85 },
    { month: "May", progress: 90 },
    { month: "Jun", progress: 95 },
  ];

  const managerStats = [
    { title: "Active Projects", value: 6, icon: <FaProjectDiagram className="text-blue-600 text-xl" /> },
    { title: "Team Members", value: 12, icon: <FiUsers className="text-indigo-600 text-xl" /> },
    { title: "Tasks In Progress", value: 23, icon: <FiClipboard className="text-amber-500 text-xl" /> },
    { title: "Completed Tasks", value: 18, icon: <FiCheckCircle className="text-emerald-500 text-xl" /> },
  ];

  const adminStats = [
    { title: "Total Projects", value: 14, icon: <FaProjectDiagram className="text-blue-600 text-xl" /> },
    { title: "Managers", value: 4, icon: <FiUsers className="text-indigo-600 text-xl" /> },
    { title: "Tasks", value: 145, icon: <FiClipboard className="text-amber-500 text-xl" /> },
    { title: "Performance Avg", value: "88%", icon: <FiBarChart2 className="text-emerald-500 text-xl" /> },
  ];

  const employeeStats = [
    { title: "My Tasks", value: 26, icon: <FaTasks className="text-blue-600 text-xl" /> },
    { title: "Projects", value: 3, icon: <FaProjectDiagram className="text-purple-600 text-xl" /> },
    { title: "Performance", value: "91%", icon: <FaStar className="text-yellow-500 text-xl" /> },
    { title: "Time Tracked", value: "34h", icon: <FiClock className="text-indigo-500 text-xl" /> },
  ];

  // 🔹 Recent activity placeholder
  const recentTasks = [
    { id: 1, title: "Design Dashboard Layout", status: "Completed", deadline: "Oct 17" },
    { id: 2, title: "Fix API Integration", status: "In Progress", deadline: "Oct 20" },
    { id: 3, title: "Team Meeting Notes", status: "Pending", deadline: "Oct 21" },
  ];

  return (
    <div className={`flex h-screen ${lightBg} overflow-hidden`}>
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <div>
            <h1 className={`text-2xl font-extrabold ${darkTextColor} capitalize`}>
              {role} Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {role === "admin"
                ? "Track all projects, managers, and progress overview."
                : role === "manager"
                ? "Monitor your team performance and project tasks."
                : "View your assigned projects, tasks, and progress."}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <FiSearch className="text-gray-500" size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition relative">
              <FiBell className="text-gray-500" size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name || "User"
              )}&background=3b82f6&color=fff`}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shadow-sm cursor-pointer"
            />
          </div>
        </header>

        {/* Main Dashboard Area */}
        <main className="flex-1 p-8 overflow-y-auto space-y-8">
          {/* ===== ADMIN VIEW ===== */}
          {role === "admin" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {adminStats.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-gray-600 text-sm font-semibold uppercase">
                        {item.title}
                      </h3>
                      <span className="p-2 bg-blue-50 rounded-md">{item.icon}</span>
                    </div>
                    <p className="text-3xl font-extrabold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Project Progress Chart */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Project Progress</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={projectData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="progress"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ r: 5, fill: "#3b82f6" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Task Distribution */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Tasks Overview</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={taskStats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                        {taskStats.map((entry, index) => (
                          <cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {/* ===== MANAGER VIEW ===== */}
          {role === "manager" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {managerStats.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-gray-600 text-sm font-semibold uppercase">
                        {item.title}
                      </h3>
                      <span className="p-2 bg-indigo-50 rounded-md">{item.icon}</span>
                    </div>
                    <p className="text-3xl font-extrabold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Team Project Overview</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={projectData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="progress" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* ===== EMPLOYEE VIEW ===== */}
        {role === "employee" && (
  <>
    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {employeeStats.map((item) => (
        <div
          key={item.title}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-600 text-sm font-semibold uppercase">
              {item.title}
            </h3>
            <span className="p-2 bg-blue-50 rounded-md">{item.icon}</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-800">{item.value}</p>
        </div>
      ))}
    </div>

    {/* Two-column Grid: Recent Tasks + Chart */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Recent Tasks */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Tasks</h3>
        <table className="w-full text-left border-t border-gray-100">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="py-2">Task</th>
              <th>Status</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {recentTasks.map((task) => (
              <tr
                key={task.id}
                className="border-t border-gray-100 hover:bg-gray-50 text-sm"
              >
                <td className="py-3 font-medium">{task.title}</td>
                <td className="capitalize text-gray-600">{task.status}</td>
                <td>{task.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Performance Chart */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Performance Progress
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={projectData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </>
)}

        </main>
      </div>
    </div>
  );
}
