import { useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  FiTarget,
  FiPlus,
  FiSearch,
  FiFilter,
  FiTrendingUp,
  FiMoreVertical,
  FiActivity,
  FiCalendar,
} from "react-icons/fi";

export default function Goals() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // 🧩 Sample Goals & KPIs Data (replace with API later)
  const goals = [
    {
      id: 1,
      title: "Increase Client Retention",
      owner: "Priya Sharma",
      startDate: "2025-09-01",
      endDate: "2025-12-31",
      progress: 78,
      kpi: "Client Retention Rate",
      status: "On Track",
    },
    {
      id: 2,
      title: "Launch NovaTask Mobile App",
      owner: "Vikram Singh",
      startDate: "2025-10-01",
      endDate: "2026-01-15",
      progress: 52,
      kpi: "App Launch Milestone",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Improve Task Completion Rate",
      owner: "Ravi Patel",
      startDate: "2025-08-15",
      endDate: "2025-11-30",
      progress: 63,
      kpi: "Tasks Closed / Assigned",
      status: "Delayed",
    },
    {
      id: 4,
      title: "Boost Sales Conversion",
      owner: "Simran Kaur",
      startDate: "2025-07-01",
      endDate: "2025-12-31",
      progress: 90,
      kpi: "Conversion Percentage",
      status: "Achieved",
    },
  ];

  const statuses = ["All", "On Track", "In Progress", "Delayed", "Achieved"];

  const filteredGoals = goals.filter(
    (g) =>
      (statusFilter === "All" || g.status === statusFilter) &&
      g.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <FiTarget size={22} /> Goals & KPIs
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
            <FiPlus size={16} /> Add Goal
          </button>
        </header>

        {/* Filters */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
            <FiSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search goals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
            />
          </div>

          {/* Filter by Status */}
          <div className="flex items-center gap-3">
            <FiFilter className="text-gray-500" size={18} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Goals Grid */}
        <main className="flex-1 overflow-y-auto p-8">
          {filteredGoals.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              No goals or KPIs found 😕
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
                >
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FiTrendingUp size={22} className="text-blue-600" />
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-800 text-sm line-clamp-2">
                          {goal.title}
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                          Owner: {goal.owner}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMoreVertical size={16} />
                    </button>
                  </div>

                  {/* Progress Section */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center text-xs font-medium text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          goal.progress >= 90
                            ? "bg-green-500"
                            : goal.progress >= 70
                            ? "bg-blue-500"
                            : goal.progress >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* KPI Info */}
                  <div className="mt-4 text-sm text-gray-600 space-y-1">
                    <p className="flex items-center gap-2">
                      <FiActivity className="text-gray-400" size={14} />{" "}
                      <span className="font-medium text-gray-700">KPI:</span>{" "}
                      {goal.kpi}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiCalendar className="text-gray-400" size={14} />{" "}
                      {goal.startDate} → {goal.endDate}
                    </p>
                  </div>

                  {/* Status Footer */}
                  <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-100">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        goal.status === "On Track"
                          ? "bg-green-100 text-green-700"
                          : goal.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : goal.status === "Achieved"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {goal.status}
                    </span>

                    <button className="text-blue-600 text-xs font-semibold hover:underline">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
