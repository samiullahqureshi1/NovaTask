import { useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  FiClock,
  FiPlay,
  FiPause,
  FiSearch,
  FiFilter,
  FiPlus,
  FiCalendar,
} from "react-icons/fi";

export default function TimeTracking() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [runningTask, setRunningTask] = useState(null);

  // 🧩 Sample Time Tracking Data (replace with API later)
  const timeEntries = [
    {
      id: 1,
      task: "Design new dashboard UI",
      project: "Nova Admin Panel",
      date: "2025-10-18",
      duration: "2h 15m",
      status: "Completed",
    },
    {
      id: 2,
      task: "Setup Firebase Auth",
      project: "NovaTask Web",
      date: "2025-10-19",
      duration: "1h 40m",
      status: "Active",
    },
    {
      id: 3,
      task: "Meeting with Client",
      project: "CRM Revamp",
      date: "2025-10-17",
      duration: "45m",
      status: "Completed",
    },
    {
      id: 4,
      task: "Code review & testing",
      project: "Task API",
      date: "2025-10-16",
      duration: "3h 20m",
      status: "Paused",
    },
  ];

  const statuses = ["All", "Active", "Paused", "Completed"];

  const filteredEntries = timeEntries.filter(
    (entry) =>
      (statusFilter === "All" || entry.status === statusFilter) &&
      entry.task.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleTimer = (id) => {
    if (runningTask === id) setRunningTask(null);
    else setRunningTask(id);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <FiClock size={22} /> Time Tracking
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
            <FiPlus size={16} /> Log Time
          </button>
        </header>

        {/* Filters */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
            <FiSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
            />
          </div>

          {/* Filter Dropdown */}
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

        {/* Table Section */}
        <main className="flex-1 overflow-y-auto p-8">
          {filteredEntries.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              No time entries found 😕
            </div>
          ) : (
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Task</th>
                    <th className="px-6 py-3 text-left font-semibold">Project</th>
                    <th className="px-6 py-3 text-left font-semibold">Date</th>
                    <th className="px-6 py-3 text-left font-semibold">Duration</th>
                    <th className="px-6 py-3 text-left font-semibold">Status</th>
                    <th className="px-6 py-3 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-3 font-medium text-gray-800">
                        {entry.task}
                      </td>
                      <td className="px-6 py-3">{entry.project}</td>
                      <td className="px-6 py-3 flex items-center gap-1 text-gray-600">
                        <FiCalendar size={14} /> {entry.date}
                      </td>
                      <td className="px-6 py-3">{entry.duration}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            entry.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : entry.status === "Paused"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => handleToggleTimer(entry.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {runningTask === entry.id ? (
                            <FiPause size={18} />
                          ) : (
                            <FiPlay size={18} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
