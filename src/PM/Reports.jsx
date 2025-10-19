import { useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  FiBarChart2,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiDownload,
  FiFileText,
  FiPieChart,
  FiUsers,
  FiClock,
  FiTarget,
  FiMoreVertical,
} from "react-icons/fi";

export default function Reports() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // 🧩 Sample Report Data (replace with API later)
  const reports = [
    {
      id: 1,
      title: "Monthly Project Summary",
      type: "Project",
      generatedBy: "Priya Sharma",
      date: "2025-10-01",
      status: "Completed",
    },
    {
      id: 2,
      title: "Team Performance Report",
      type: "Performance",
      generatedBy: "Vikram Singh",
      date: "2025-10-10",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Time Tracking Overview",
      type: "Time",
      generatedBy: "Ravi Patel",
      date: "2025-09-25",
      status: "Completed",
    },
    {
      id: 4,
      title: "Goals & KPIs Progress",
      type: "Goals",
      generatedBy: "Simran Kaur",
      date: "2025-10-15",
      status: "Completed",
    },
    {
      id: 5,
      title: "Quarterly Business Report",
      type: "Finance",
      generatedBy: "Arjun Mehta",
      date: "2025-09-20",
      status: "Completed",
    },
  ];

  const reportTypes = ["All", "Project", "Performance", "Time", "Goals", "Finance"];

  const filteredReports = reports.filter(
    (r) =>
      (typeFilter === "All" || r.type === typeFilter) &&
      r.title.toLowerCase().includes(search.toLowerCase())
  );

  const getIcon = (type) => {
    switch (type) {
      case "Project":
        return <FiFileText className="text-blue-600" size={20} />;
      case "Performance":
        return <FiBarChart2 className="text-purple-600" size={20} />;
      case "Time":
        return <FiClock className="text-green-600" size={20} />;
      case "Goals":
        return <FiTarget className="text-yellow-600" size={20} />;
      case "Finance":
        return <FiPieChart className="text-pink-600" size={20} />;
      default:
        return <FiFileText className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <FiBarChart2 size={22} /> Reports
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
            <FiDownload size={16} /> Export All
          </button>
        </header>

        {/* Filters */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
            <FiSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-3">
            <FiFilter className="text-gray-500" size={18} />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {reportTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
              <FiFileText size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Reports</p>
              <h3 className="text-lg font-bold text-gray-800">
                {reports.length}
              </h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <FiClock size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <h3 className="text-lg font-bold text-gray-800">
                {reports.filter((r) => r.status === "Completed").length}
              </h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600">
              <FiBarChart2 size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <h3 className="text-lg font-bold text-gray-800">
                {reports.filter((r) => r.status === "In Progress").length}
              </h3>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
              <FiUsers size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Generated By</p>
              <h3 className="text-lg font-bold text-gray-800">
                {new Set(reports.map((r) => r.generatedBy)).size}
              </h3>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <main className="flex-1 overflow-y-auto p-8 pt-0">
          {filteredReports.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              No reports found 😕
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        {getIcon(report.type)}
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-800 text-sm line-clamp-2">
                          {report.title}
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                          Type: {report.type}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMoreVertical size={16} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="mt-4 text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium text-gray-700">
                        Generated By:
                      </span>{" "}
                      {report.generatedBy}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiCalendar className="text-gray-400" size={14} />{" "}
                      {report.date}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-100">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        report.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {report.status}
                    </span>
                    <button className="text-blue-600 text-xs font-semibold hover:underline flex items-center gap-1">
                      <FiDownload size={14} /> Download
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
