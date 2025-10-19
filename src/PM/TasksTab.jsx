import { useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  FiPlus,
  FiSearch,
  FiMoreVertical,
  FiClock,
  FiUser,
  FiFolder,
  FiFilter,
} from "react-icons/fi";

export default function Tasks() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // 🧩 Sample task data (replace with API later)
  const tasks = [
    {
      id: 1,
      title: "Design Landing Page",
      project: "Website Redesign",
      assignee: "Arjun Mehta",
      status: "To Do",
      priority: "High",
      due: "Oct 22, 2025",
    },
    {
      id: 2,
      title: "Fix Navbar Responsiveness",
      project: "Marketing Dashboard",
      assignee: "Priya Sharma",
      status: "In Progress",
      priority: "Medium",
      due: "Oct 25, 2025",
    },
    {
      id: 3,
      title: "Implement Payment API",
      project: "E-Commerce App",
      assignee: "Ravi Patel",
      status: "In Progress",
      priority: "High",
      due: "Oct 27, 2025",
    },
    {
      id: 4,
      title: "Finalize Sprint Review",
      project: "Backend Optimization",
      assignee: "Simran Kaur",
      status: "Review",
      priority: "Low",
      due: "Oct 28, 2025",
    },
    {
      id: 5,
      title: "Deploy to Production",
      project: "Backend Optimization",
      assignee: "Vikram Singh",
      status: "Completed",
      priority: "High",
      due: "Oct 20, 2025",
    },
  ];

  const columns = ["To Do", "In Progress", "Review", "Completed"];
  const priorities = ["All", "High", "Medium", "Low"];

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) &&
      (priorityFilter === "All" || t.priority === priorityFilter)
  );

  const groupedTasks = columns.map((col) => ({
    status: col,
    tasks: filteredTasks.filter((t) => t.status === col),
  }));

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-800">Tasks (Kanban View)</h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
            <FiPlus size={16} /> New Task
          </button>
        </header>

        {/* Filters */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
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

          {/* Priority Filter */}
          <div className="flex items-center gap-3">
            <FiFilter className="text-gray-500" size={18} />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {priorities.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Kanban Board */}
        <main className="flex-1 overflow-x-auto p-8">
          <div className="flex gap-6 min-w-max">
            {groupedTasks.map((col) => (
              <div
                key={col.status}
                className="flex flex-col bg-gray-50 border border-gray-200 rounded-xl w-72 shadow-sm"
              >
                {/* Column Header */}
                <div className="flex justify-between items-center bg-white px-4 py-3 border-b border-gray-100 rounded-t-xl">
                  <h2 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        col.status === "To Do"
                          ? "bg-gray-400"
                          : col.status === "In Progress"
                          ? "bg-blue-500"
                          : col.status === "Review"
                          ? "bg-amber-500"
                          : "bg-green-500"
                      }`}
                    ></span>
                    {col.status}
                  </h2>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {col.tasks.length}
                  </span>
                </div>

                {/* Tasks in Column */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {col.tasks.length === 0 ? (
                    <p className="text-sm text-gray-400 italic text-center mt-4">
                      No tasks
                    </p>
                  ) : (
                    col.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                            {task.title}
                          </h3>
                          <button className="text-gray-400 hover:text-gray-600">
                            <FiMoreVertical size={16} />
                          </button>
                        </div>

                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <FiFolder className="text-gray-400" /> {task.project}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FiClock className="text-gray-400" />
                            {task.due}
                          </div>

                          <span
                            className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                              task.priority === "High"
                                ? "bg-red-100 text-red-700"
                                : task.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              task.assignee
                            )}&background=3b82f6&color=fff&size=32`}
                            alt={task.assignee}
                            className="w-7 h-7 rounded-full border border-gray-200"
                          />
                          <span className="text-xs text-gray-600">{task.assignee}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
