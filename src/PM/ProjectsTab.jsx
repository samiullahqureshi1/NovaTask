import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { FiSearch, FiPlus, FiFilter, FiUsers, FiFolder, FiCalendar, FiMoreVertical } from "react-icons/fi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  // Example projects data (replace later with API)
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      manager: "Arjun Mehta",
      deadline: "Oct 28, 2025",
      progress: 76,
      teamSize: 5,
      status: "In Progress",
      color: "blue",
    },
    {
      id: 2,
      name: "Mobile App UI/UX",
      manager: "Priya Sharma",
      deadline: "Nov 10, 2025",
      progress: 42,
      teamSize: 4,
      status: "In Progress",
      color: "indigo",
    },
    {
      id: 3,
      name: "Backend Optimization",
      manager: "Ravi Patel",
      deadline: "Oct 22, 2025",
      progress: 100,
      teamSize: 3,
      status: "Completed",
      color: "green",
    },
    {
      id: 4,
      name: "Marketing Dashboard",
      manager: "Simran Kaur",
      deadline: "Nov 5, 2025",
      progress: 25,
      teamSize: 6,
      status: "Pending",
      color: "amber",
    },
  ];

  // Filtered + searched projects
  const filteredProjects = projects.filter(
    (p) =>
      (filter === "All" || p.status === filter) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusOptions = ["All", "Pending", "In Progress", "Completed"];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-800">Projects</h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
            <FiPlus size={16} /> New Project
          </button>
        </header>

        {/* Filters */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
            <FiSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <FiFilter className="text-gray-500" size={18} />
            <select
              className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {statusOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <main className="flex-1 overflow-y-auto p-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              No projects found 😕
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
                >
                  {/* Top Section */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">{project.name}</h2>
                      <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <FiUsers /> {project.teamSize} Members
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMoreVertical size={18} />
                    </button>
                  </div>

                  {/* Progress Circle */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="w-16 h-16">
                      <CircularProgressbar
                        value={project.progress}
                        text={`${project.progress}%`}
                        styles={buildStyles({
                          pathColor:
                            project.color === "blue"
                              ? "#3b82f6"
                              : project.color === "indigo"
                              ? "#6366f1"
                              : project.color === "green"
                              ? "#10b981"
                              : "#f59e0b",
                          textColor: "#374151",
                          trailColor: "#e5e7eb",
                        })}
                      />
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="flex items-center gap-1">
                        <FiFolder className="text-gray-400" /> <span>{project.status}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <FiCalendar className="text-gray-400" /> <span>{project.deadline}</span>
                      </p>
                      <p className="flex items-center gap-1">
                        <FiUsers className="text-gray-400" /> <span>Manager: {project.manager}</span>
                      </p>
                    </div>
                  </div>

                  {/* Footer / Status */}
                  <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-100">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : project.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {project.status}
                    </span>
                    <button className="text-blue-600 text-sm font-medium hover:underline">
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
