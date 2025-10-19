import { useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  FiPlus,
  FiSearch,
  FiUsers,
  FiMail,
  FiPhone,
  FiUser,
  FiFilter,
  FiMoreVertical,
  FiCircle,
} from "react-icons/fi";

export default function Team() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  // 🧩 Sample team data (replace with API data)
  const teamMembers = [
    {
      id: 1,
      name: "Arjun Mehta",
      role: "Admin",
      email: "arjun@novatask.com",
      phone: "+91 98765 43210",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Manager",
      email: "priya@novatask.com",
      phone: "+91 98765 12345",
      status: "Active",
    },
    {
      id: 3,
      name: "Ravi Patel",
      role: "Employee",
      email: "ravi@novatask.com",
      phone: "+91 98765 67890",
      status: "Offline",
    },
    {
      id: 4,
      name: "Simran Kaur",
      role: "Employee",
      email: "simran@novatask.com",
      phone: "+91 98765 55555",
      status: "Active",
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "Manager",
      email: "vikram@novatask.com",
      phone: "+91 98765 99999",
      status: "Active",
    },
    {
      id: 6,
      name: "Ananya Gupta",
      role: "Employee",
      email: "ananya@novatask.com",
      phone: "+91 98765 44444",
      status: "Offline",
    },
  ];

  const roles = ["All", "Admin", "Manager", "Employee"];

  const filteredMembers = teamMembers.filter(
    (m) =>
      (roleFilter === "All" || m.role === roleFilter) &&
      m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <FiUsers size={22} /> Team
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
            <FiPlus size={16} /> Add Member
          </button>
        </header>

        {/* Filters Section */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
            <FiSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search team members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
            />
          </div>

          {/* Filter by Role */}
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

        {/* Team Members Grid */}
        <main className="flex-1 overflow-y-auto p-8">
          {filteredMembers.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              No team members found 😕
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
                >
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member.name
                        )}&background=3b82f6&color=fff&size=64`}
                        alt={member.name}
                        className="w-12 h-12 rounded-full border border-gray-200"
                      />
                      <div>
                        <h2 className="font-bold text-gray-800 text-sm">{member.name}</h2>
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
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMoreVertical size={16} />
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-4 text-sm text-gray-600 space-y-2">
                    <p className="flex items-center gap-2">
                      <FiMail className="text-gray-400" /> {member.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiPhone className="text-gray-400" /> {member.phone}
                    </p>
                  </div>

                  {/* Status Footer */}
                  <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm">
                      <FiCircle
                        className={
                          member.status === "Active"
                            ? "text-green-500"
                            : "text-gray-400"
                        }
                        size={12}
                      />
                      <span
                        className={
                          member.status === "Active"
                            ? "text-green-700 text-xs font-medium"
                            : "text-gray-500 text-xs font-medium"
                        }
                      >
                        {member.status}
                      </span>
                    </div>

                    <button className="text-blue-600 text-xs font-semibold hover:underline">
                      View Profile →
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
