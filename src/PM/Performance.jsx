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
  <div className="flex h-screen bg-gray-950 overflow-hidden text-gray-200">
  <Sidebar />

  <div className="flex-1 flex flex-col">
    {/* HEADER */}
    <header className="flex justify-between items-center bg-gray-900/90 backdrop-blur-md px-8 py-4 border-b border-gray-800 shadow-md">
      <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
        <FiBarChart2 size={22} className="text-indigo-400" /> Performance
      </h1>
      <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition">
        <FiAward size={16} /> Generate Report
      </button>
    </header>

    {/* FILTERS */}
    <div className="bg-gray-900/80 border-b border-gray-800 px-8 py-4 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
      <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md px-3 py-2 w-full max-w-sm">
        <FiSearch className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none ml-2 text-sm text-gray-200 placeholder-gray-500 w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        <FiFilter className="text-gray-400" size={18} />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-gray-700 bg-gray-800 text-gray-200 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {roles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      <StatCard
        icon={<FiUsers size={22} />}
        title="Total Team Members"
        value={performanceData.length}
        color="indigo"
        dark
      />
      <StatCard
        icon={<FiTrendingUp size={22} />}
        title="Avg Productivity"
        value={`${averageProductivity}%`}
        color="green"
        dark
      />
      <StatCard
        icon={<FiTarget size={22} />}
        title="Avg Tasks"
        value={averageGoals}
        color="yellow"
        dark
      />
      <StatCard
        icon={<FiAward size={22} />}
        title="Top Performer"
        value={topPerformer ? topPerformer.name : "N/A"}
        color="purple"
        dark
      />
    </div>

    {/* EMPLOYEE PERFORMANCE CARDS */}
    <main className="flex-1 overflow-y-auto p-8 pt-0 custom-scroll">
      {loading ? (
        <div className="text-center text-gray-500 mt-20">Loading...</div>
      ) : filteredData.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 italic">
          No performance data found 😕
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((member) => (
            <div
              key={member.employeeId}
              className="bg-gray-900/80 border border-gray-800 rounded-xl shadow-md hover:shadow-xl hover:border-indigo-500 transition-all duration-300 p-6 flex flex-col justify-between backdrop-blur-md"
            >
              {/* CARD HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-gray-100 text-sm">
                    {member.name}
                  </h2>
                  <p className="text-xs text-gray-400">
                    {member.role || "Employee"}
                  </p>
                </div>
                <FiMoreVertical className="text-gray-500" size={16} />
              </div>

              {/* STATS */}
              <div className="mt-4 space-y-2 text-sm text-gray-400">
                <p>
                  <span className="font-medium text-gray-300">
                    Completion Rate:
                  </span>{" "}
                  {member.completionRate}%
                </p>
                <p>
                  <span className="font-medium text-gray-300">
                    Tasks Done:
                  </span>{" "}
                  {member.done}/{member.totalTasks}
                </p>
                <p>
                  <span className="font-medium text-gray-300">Total Hours:</span>{" "}
                  {(member.totalTime / 3600).toFixed(1)}h
                </p>
              </div>

              {/* STATUS FOOTER */}
              <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-800">
                <div className="flex items-center gap-1 text-xs font-medium">
                  {member.completionRate >= 75 ? (
                    <>
                      <FiArrowUp className="text-green-400" size={14} />
                      <span className="text-green-400">Excellent</span>
                    </>
                  ) : member.completionRate >= 50 ? (
                    <>
                      <FiTrendingUp className="text-yellow-400" size={14} />
                      <span className="text-yellow-400">Improving</span>
                    </>
                  ) : (
                    <>
                      <FiArrowDown className="text-red-400" size={14} />
                      <span className="text-red-400">Needs Work</span>
                    </>
                  )}
                </div>

                <button className="text-indigo-400 text-xs font-semibold hover:text-indigo-300 transition">
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

function StatCard({ icon, title, value, color, dark }) {
  const colors = {
    blue: "from-blue-500 to-indigo-500",
    green: "from-emerald-500 to-teal-500",
    yellow: "from-amber-400 to-yellow-500",
    purple: "from-purple-500 to-pink-500",
    indigo: "from-indigo-500 to-blue-600",
  };

  if (dark) {
    return (
      <div className="bg-gray-900/80 border border-gray-800 rounded-xl shadow-md hover:shadow-lg hover:border-indigo-500 transition-all duration-300 p-5 flex items-center gap-4 backdrop-blur-md">
        <div
          className={`bg-gradient-to-br ${colors[color]} p-3 rounded-lg shadow-md flex items-center justify-center text-white`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-lg font-bold text-gray-100">{value}</h3>
        </div>
      </div>
    );
  }

  // 🌤️ Default Light Mode (unchanged)
  const lightColors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4">
      <div className={`${lightColors[color]} p-3 rounded-lg`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-lg font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}

