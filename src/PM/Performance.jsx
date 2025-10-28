import { useState, useEffect } from "react";
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
import axios from "axios";
import toast from "react-hot-toast";

export default function Performance() {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const roles = ["All", "Admin", "Manager", "Employee"];

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/task/getAllEmployeePerformance"
        );
        if (data.success) {
          setPerformanceData(data.employees);
        } else {
          toast.error("Failed to fetch performance data");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error fetching performance");
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, []);

  const filteredData = performanceData.filter(
    (p) =>
      (roleFilter === "All" || p.role === roleFilter) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const averageProductivity =
    performanceData.length > 0
      ? Math.round(
          performanceData.reduce((a, b) => a + b.completionRate, 0) /
            performanceData.length
        )
      : 0;

  const averageGoals =
    performanceData.length > 0
      ? Math.round(
          performanceData.reduce((a, b) => a + b.totalTasks, 0) /
            performanceData.length
        )
      : 0;

  const topPerformer =
    performanceData.length > 0
      ? performanceData.reduce((a, b) =>
          a.completionRate > b.completionRate ? a : b
        )
      : null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

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

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
          <StatCard
            icon={<FiUsers size={22} />}
            title="Total Team Members"
            value={performanceData.length}
            color="blue"
          />
          <StatCard
            icon={<FiTrendingUp size={22} />}
            title="Avg Productivity"
            value={`${averageProductivity}%`}
            color="green"
          />
          <StatCard
            icon={<FiTarget size={22} />}
            title="Avg Tasks"
            value={averageGoals}
            color="yellow"
          />
          <StatCard
            icon={<FiAward size={22} />}
            title="Top Performer"
            value={topPerformer ? topPerformer.name : "N/A"}
            color="purple"
          />
        </div>

        {/* Employee Performance Cards */}
        <main className="flex-1 overflow-y-auto p-8 pt-0">
          {loading ? (
            <div className="text-center text-gray-500 mt-20">Loading...</div>
          ) : filteredData.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              No performance data found 😕
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredData.map((member) => (
                <div
                  key={member.employeeId}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-bold text-gray-800 text-sm">
                        {member.name}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {member.role || "Employee"}
                      </p>
                    </div>
                    <FiMoreVertical className="text-gray-400" size={16} />
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-700">
                        Completion Rate:
                      </span>{" "}
                      {member.completionRate}%
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Tasks Done:
                      </span>{" "}
                      {member.done}/{member.totalTasks}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">
                        Total Hours:
                      </span>{" "}
                      {(member.totalTime / 3600).toFixed(1)}h
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs font-medium">
                      {member.completionRate >= 75 ? (
                        <>
                          <FiArrowUp className="text-green-500" size={14} />
                          <span className="text-green-600">Excellent</span>
                        </>
                      ) : member.completionRate >= 50 ? (
                        <>
                          <FiTrendingUp className="text-yellow-500" size={14} />
                          <span className="text-yellow-600">Improving</span>
                        </>
                      ) : (
                        <>
                          <FiArrowDown className="text-red-500" size={14} />
                          <span className="text-red-600">Needs Work</span>
                        </>
                      )}
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

function StatCard({ icon, title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4">
      <div className={`${colors[color]} p-3 rounded-lg`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-lg font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}
