import { useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  FiBarChart2,
  FiSearch,
  FiFilter,
  FiTrendingUp,
  FiArrowUp,
  FiArrowDown,
  FiUsers,
  FiTarget,
  FiAward,
  FiMoreVertical,
} from "react-icons/fi";

export default function Performance() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // 🧩 Sample performance data (replace with API later)
  const performanceData = [
    {
      id: 1,
      name: "Arjun Mehta",
      role: "Admin",
      productivity: 92,
      tasksCompleted: 120,
      goalsAchieved: 8,
      rating: "Excellent",
      trend: "up",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Manager",
      productivity: 84,
      tasksCompleted: 98,
      goalsAchieved: 6,
      rating: "Very Good",
      trend: "up",
    },
    {
      id: 3,
      name: "Ravi Patel",
      role: "Employee",
      productivity: 63,
      tasksCompleted: 72,
      goalsAchieved: 4,
      rating: "Average",
      trend: "down",
    },
    {
      id: 4,
      name: "Simran Kaur",
      role: "Employee",
      productivity: 88,
      tasksCompleted: 105,
      goalsAchieved: 7,
      rating: "Good",
      trend: "up",
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Manager",
      productivity: 71,
      tasksCompleted: 89,
      goalsAchieved: 5,
      rating: "Average",
      trend: "down",
    },
  ];

  const roles = ["All", "Admin", "Manager", "Employee"];

  const filteredData = performanceData.filter(
    (p) =>
      (roleFilter === "All" || p.role === roleFilter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <FiBarChart2 size={22} /> Performance
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
            <FiAward size={16} /> Generate Report
          </button>
        </header>

        {/* Filters */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
            <FiSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-3">
            <FiFilter className="text-gray-500" size={18} />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
              <FiUsers size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Team Members</p>
              <h3 className="text-lg font-bold text-gray-800">
                {performanceData.length}
              </h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <FiTrendingUp size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Productivity</p>
              <h3 className="text-lg font-bold text-gray-800">
                {Math.round(
                  performanceData.reduce((a, b) => a + b.productivity, 0) /
                    performanceData.length
                )}
                %
              </h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600">
              <FiTarget size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Goals Achieved</p>
              <h3 className="text-lg font-bold text-gray-800">
                {Math.round(
                  performanceData.reduce((a, b) => a + b.goalsAchieved, 0) /
                    performanceData.length
                )}
              </h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
              <FiAward size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Top Performer</p>
              <h3 className="text-lg font-bold text-gray-800">
                {
                  performanceData.reduce((a, b) =>
                    a.productivity > b.productivity ? a : b
                  ).name
                }
              </h3>
            </div>
          </div>
        </div>

        {/* Performance Cards */}
        <main className="flex-1 overflow-y-auto p-8 pt-0">
          {filteredData.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              No performance data found 😕
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredData.map((member) => (
                <div
                  key={member.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
                >
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-bold text-gray-800 text-sm">
                        {member.name}
                      </h2>
                      <p
                        className={`text-xs font-semibold mt-0.5 ${
                          member.role === "Admin"
                            ? "text-red-600"
                            : member.role === "Manager"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {member.role}
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMoreVertical size={16} />
                    </button>
                  </div>

                  {/* Performance Stats */}
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-700">
                        Productivity:
                      </span>{" "}
                      {member.productivity}%
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Tasks Completed:
                      </span>{" "}
                      {member.tasksCompleted}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Goals Achieved:
                      </span>{" "}
                      {member.goalsAchieved}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Rating:</span>{" "}
                      <span
                        className={`font-semibold ${
                          member.rating === "Excellent"
                            ? "text-green-600"
                            : member.rating === "Very Good"
                            ? "text-blue-600"
                            : member.rating === "Good"
                            ? "text-yellow-600"
                            : "text-gray-600"
                        }`}
                      >
                        {member.rating}
                      </span>
                    </p>
                  </div>

                  {/* Trend & Status */}
                  <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs font-medium">
                      {member.trend === "up" ? (
                        <FiArrowUp className="text-green-500" size={14} />
                      ) : (
                        <FiArrowDown className="text-red-500" size={14} />
                      )}
                      <span
                        className={`${
                          member.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {member.trend === "up" ? "Improving" : "Falling"}
                      </span>
                    </div>

                    <button className="text-blue-600 text-xs font-semibold hover:underline">
                      View Report →
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
