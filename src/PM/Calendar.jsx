import { useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  FiCalendar,
  FiList,
  FiPlus,
  FiSearch,
  FiFilter,
  FiClock,
  FiMoreVertical,
} from "react-icons/fi";
import dayjs from "dayjs";

export default function Calendar() {
  const [activeTab, setActiveTab] = useState("calendar"); 
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const today = dayjs();

  // 🗓️ Example Events
  const events = [
    {
      id: 1,
      title: "Team Meeting",
      date: dayjs("2025-10-20"),
      time: "10:00 AM",
      type: "Meeting",
      location: "Conference Room A",
      color: "blue",
    },
    {
      id: 2,
      title: "Project Deadline: Website Redesign",
      date: dayjs("2025-10-22"),
      time: "5:00 PM",
      type: "Deadline",
      location: "Online",
      color: "red",
    },
    {
      id: 3,
      title: "Sprint Review",
      date: dayjs("2025-10-23"),
      time: "2:00 PM",
      type: "Meeting",
      location: "Zoom",
      color: "indigo",
    },
    {
      id: 4,
      title: "Team Lunch",
      date: dayjs("2025-10-25"),
      time: "1:00 PM",
      type: "Event",
      location: "Café 24",
      color: "green",
    },
    {
      id: 5,
      title: "Performance Review",
      date: dayjs("2025-10-29"),
      time: "3:00 PM",
      type: "Deadline",
      location: "Meeting Room B",
      color: "amber",
    },
  ];

  const eventTypes = ["All", "Meeting", "Deadline", "Event"];

  // 🔍 Search + Filter
  const filteredEvents = events.filter(
    (e) =>
      (filter === "All" || e.type === filter) &&
      e.title.toLowerCase().includes(search.toLowerCase())
  );

  // 📅 Calendar structure
  const monthStart = today.startOf("month");
  const daysInMonth = today.daysInMonth();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = monthStart.add(i, "day");
    return {
      date,
      dayNumber: i + 1,
      events: filteredEvents.filter((ev) => ev.date.isSame(date, "day")),
    };
  });

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <FiCalendar size={22} /> Calendar
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
            <FiPlus size={16} /> Add Event
          </button>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-white px-8">
          <button
            onClick={() => setActiveTab("calendar")}
            className={`py-3 px-4 text-sm font-medium flex items-center gap-2 border-b-2 transition ${
              activeTab === "calendar"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <FiCalendar size={16} /> Calendar View
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`py-3 px-4 text-sm font-medium flex items-center gap-2 border-b-2 transition ${
              activeTab === "events"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <FiList size={16} /> Events List
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
            <FiSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <FiFilter className="text-gray-500" size={18} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {eventTypes.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ===================== MAIN CONTENT ===================== */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8">
          {activeTab === "calendar" ? (
            <>
              {/* Calendar View */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {today.format("MMMM YYYY")}
                </h2>
                <p className="text-gray-500 text-sm">
                  Showing {filteredEvents.length} event
                  {filteredEvents.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-4">
                {calendarDays.map((day) => (
                  <div
                    key={day.dayNumber}
                    className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-800">
                        {day.dayNumber}
                      </span>
                      {day.date.isSame(today, "day") && (
                        <span className="text-xs text-blue-600 font-semibold">
                          Today
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      {day.events.length === 0 ? (
                        <p className="text-xs text-gray-400 italic">No events</p>
                      ) : (
                        day.events.map((ev) => (
                          <div
                            key={ev.id}
                            className={`border-l-4 rounded-md px-2 py-1 text-xs bg-gray-50 ${
                              ev.color === "blue"
                                ? "border-blue-500"
                                : ev.color === "red"
                                ? "border-red-500"
                                : ev.color === "green"
                                ? "border-green-500"
                                : ev.color === "amber"
                                ? "border-amber-500"
                                : "border-indigo-500"
                            }`}
                          >
                            <p className="font-medium text-gray-700 truncate">
                              {ev.title}
                            </p>
                            <p className="flex items-center gap-1 text-gray-500">
                              <FiClock size={10} /> {ev.time}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Events List View */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                    <tr>
                      <th className="py-3 px-6">Event</th>
                      <th className="py-3 px-6">Type</th>
                      <th className="py-3 px-6">Date</th>
                      <th className="py-3 px-6">Time</th>
                      <th className="py-3 px-6">Location</th>
                      <th className="py-3 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((ev) => (
                      <tr
                        key={ev.id}
                        className="border-t border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-6 font-medium text-gray-800">
                          {ev.title}
                        </td>
                        <td className="py-3 px-6">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              ev.type === "Meeting"
                                ? "bg-blue-100 text-blue-700"
                                : ev.type === "Deadline"
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {ev.type}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-gray-600">
                          {ev.date.format("MMM DD, YYYY")}
                        </td>
                        <td className="py-3 px-6 text-gray-600">{ev.time}</td>
                        <td className="py-3 px-6 text-gray-600">
                          {ev.location}
                        </td>
                        <td className="py-3 px-6 text-right">
                          <button className="text-gray-400 hover:text-gray-600">
                            <FiMoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredEvents.length === 0 && (
                  <p className="text-center text-gray-500 py-10 text-sm">
                    No events found 😕
                  </p>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
