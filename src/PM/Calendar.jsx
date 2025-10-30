// import { useEffect, useState } from "react";
// import Sidebar from "../component/Sidebar";
// import {
//   FiCalendar,
//   FiList,
//   FiPlus,
//   FiSearch,
//   FiFilter,
//   FiClock,
//   FiMoreVertical,
//   FiX,
// } from "react-icons/fi";
// import dayjs from "dayjs";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function Calendar() {
//   const [activeTab, setActiveTab] = useState("calendar");
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentEventId, setCurrentEventId] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [eventToDelete, setEventToDelete] = useState(null);

//   const today = dayjs();

//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     description: "",
//     type: "Meeting",
//     date: "",
//     time: "",
//     location: "",
//     color: "blue",
//   });

//   const eventTypes = ["All", "Meeting", "Deadline", "Event"];

//   // 🧩 Fetch Events
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         toast.loading("Fetching events...", { id: "fetchEvents" });
//         const { data } = await axios.get("http://localhost:5000/Event/get");
//         if (data.success) {
//           setEvents(data.events);
//           toast.success("Events loaded!", { id: "fetchEvents" });
//         } else {
//           toast.error("Failed to load events", { id: "fetchEvents" });
//         }
//       } catch (error) {
//         console.error("❌ Error fetching events:", error);
//         toast.error("Server error fetching events", { id: "fetchEvents" });
//       }
//     };
//     fetchEvents();
//   }, []);

//   // 🔍 Filter & Search
//   const filteredEvents = events.filter(
//     (e) =>
//       (filter === "All" || e.type === filter) &&
//       e.title.toLowerCase().includes(search.toLowerCase())
//   );

//   // 📅 Calendar data
//   const monthStart = today.startOf("month");
//   const daysInMonth = today.daysInMonth();
//   const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
//     const date = monthStart.add(i, "day");
//     return {
//       date,
//       dayNumber: i + 1,
//       events: filteredEvents.filter((ev) =>
//         dayjs(ev.date).isSame(date, "day")
//       ),
//     };
//   });

//   // 🧾 Input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent((prev) => ({ ...prev, [name]: value }));
//   };

//   // ➕ Add Event
//   const handleAddEvent = async (e) => {
//     e.preventDefault();
//     try {
//       toast.loading("Creating event...", { id: "eventCreate" });
//       const { data } = await axios.post(
//         "http://localhost:5000/Event/add",
//         newEvent
//       );

//       if (data.success) {
//         toast.success("Event added!", { id: "eventCreate" });
//         setEvents((prev) => [...prev, data.event]);
//         setDrawerOpen(false);
//         setNewEvent({
//           title: "",
//           description: "",
//           type: "Meeting",
//           date: "",
//           time: "",
//           location: "",
//           color: "blue",
//         });
//       } else {
//         toast.error("Failed to create event", { id: "eventCreate" });
//       }
//     } catch (error) {
//       console.error("❌ Error adding event:", error);
//       toast.error("Server error while adding event", { id: "eventCreate" });
//     }
//   };

//   // ✏️ Edit / View
//   const handleViewEvent = (event) => {
//     setNewEvent({
//       title: event.title,
//       description: event.description || "",
//       type: event.type || "Meeting",
//       date: event.date?.slice(0, 10) || "",
//       time: event.time || "",
//       location: event.location || "",
//       color: event.color || "blue",
//     });
//     setCurrentEventId(event._id);
//     setEditMode(true);
//     setDrawerOpen(true);
//   };

//   // 🔄 Update Event
//   const handleUpdateEvent = async (e) => {
//     e.preventDefault();
//     try {
//       toast.loading("Updating event...", { id: "updateEvent" });
//       const { data } = await axios.put(
//         `http://localhost:5000/Event/update/${currentEventId}`,
//         newEvent
//       );

//       if (data.success) {
//         toast.success("Event updated!", { id: "updateEvent" });
//         setEvents((prev) =>
//           prev.map((ev) => (ev._id === data.event._id ? data.event : ev))
//         );
//         setDrawerOpen(false);
//         setEditMode(false);
//         setCurrentEventId(null);
//       } else {
//         toast.error("Failed to update event", { id: "updateEvent" });
//       }
//     } catch (error) {
//       console.error("❌ Error updating event:", error);
//       toast.error("Server error while updating event", { id: "updateEvent" });
//     }
//   };

//   // 🗑 Delete Event
//   const handleDeleteEvent = async () => {
//     try {
//       toast.loading("Deleting event...", { id: "deleteEvent" });
//       const { data } = await axios.delete(
//         `http://localhost:5000/Event/delete/${eventToDelete._id}`
//       );
//       if (data.success) {
//         toast.success("Event deleted!", { id: "deleteEvent" });
//         setEvents((prev) => prev.filter((e) => e._id !== eventToDelete._id));
//         setShowDeleteModal(false);
//       } else toast.error("Failed to delete", { id: "deleteEvent" });
//     } catch (error) {
//       console.error("❌ Error deleting event:", error);
//       toast.error("Server error while deleting", { id: "deleteEvent" });
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
//           <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
//             <FiCalendar size={22} /> Calendar
//           </h1>
//           <button
//             onClick={() => {
//               setDrawerOpen(true);
//               setEditMode(false);
//               setNewEvent({
//                 title: "",
//                 description: "",
//                 type: "Meeting",
//                 date: "",
//                 time: "",
//                 location: "",
//                 color: "blue",
//               });
//             }}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
//           >
//             <FiPlus size={16} /> Add Event
//           </button>
//         </header>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 bg-white px-8">
//           <button
//             onClick={() => setActiveTab("calendar")}
//             className={`py-3 px-4 text-sm font-medium flex items-center gap-2 border-b-2 transition ${
//               activeTab === "calendar"
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <FiCalendar size={16} /> Calendar View
//           </button>
//           <button
//             onClick={() => setActiveTab("events")}
//             className={`py-3 px-4 text-sm font-medium flex items-center gap-2 border-b-2 transition ${
//               activeTab === "events"
//                 ? "border-blue-600 text-blue-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <FiList size={16} /> Events List
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
//           <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
//             <FiSearch className="text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search events..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
//             />
//           </div>
//           <div className="flex items-center gap-3">
//             <FiFilter className="text-gray-500" size={18} />
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {eventTypes.map((opt) => (
//                 <option key={opt}>{opt}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-8 space-y-8">
//           {activeTab === "calendar" ? (
//             <>
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-bold text-gray-800">
//                   {today.format("MMMM YYYY")}
//                 </h2>
//                 <p className="text-gray-500 text-sm">
//                   Showing {filteredEvents.length} event
//                   {filteredEvents.length !== 1 ? "s" : ""}
//                 </p>
//               </div>

//               {/* Calendar Grid */}
//               <div className="grid grid-cols-7 gap-4">
//                 {calendarDays.map((day) => (
//                   <div
//                     key={day.dayNumber}
//                     className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col shadow-sm hover:shadow-md transition"
//                   >
//                     <div className="flex justify-between items-center mb-2">
//                       <span className="text-sm font-semibold text-gray-800">
//                         {day.dayNumber}
//                       </span>
//                       {day.date.isSame(today, "day") && (
//                         <span className="text-xs text-blue-600 font-semibold">
//                           Today
//                         </span>
//                       )}
//                     </div>

//                     <div className="space-y-2">
//                       {day.events.length === 0 ? (
//                         <p className="text-xs text-gray-400 italic">No events</p>
//                       ) : (
//                         day.events.map((ev) => (
//                           <div
//                             key={ev._id}
//                             onClick={() => handleViewEvent(ev)}
//                             className={`border-l-4 rounded-md px-2 py-1 text-xs cursor-pointer bg-gray-50 ${
//                               ev.color === "blue"
//                                 ? "border-blue-500"
//                                 : ev.color === "red"
//                                 ? "border-red-500"
//                                 : ev.color === "green"
//                                 ? "border-green-500"
//                                 : ev.color === "amber"
//                                 ? "border-amber-500"
//                                 : "border-indigo-500"
//                             }`}
//                           >
//                             <p className="font-medium text-gray-700 truncate">
//                               {ev.title}
//                             </p>
//                             <p className="flex items-center gap-1 text-gray-500">
//                               <FiClock size={10} /> {ev.time}
//                             </p>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//                 <table className="w-full text-sm text-left">
//                   <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
//                     <tr>
//                       <th className="py-3 px-6">Event</th>
//                       <th className="py-3 px-6">Type</th>
//                       <th className="py-3 px-6">Date</th>
//                       <th className="py-3 px-6">Time</th>
//                       <th className="py-3 px-6">Location</th>
//                       <th className="py-3 px-6 text-right">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredEvents.map((ev) => (
//                       <tr
//                         key={ev._id}
//                         className="border-t border-gray-100 hover:bg-gray-50 transition"
//                       >
//                         <td className="py-3 px-6 font-medium text-gray-800">
//                           {ev.title}
//                         </td>
//                         <td className="py-3 px-6">
//                           <span
//                             className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                               ev.type === "Meeting"
//                                 ? "bg-blue-100 text-blue-700"
//                                 : ev.type === "Deadline"
//                                 ? "bg-red-100 text-red-700"
//                                 : "bg-green-100 text-green-700"
//                             }`}
//                           >
//                             {ev.type}
//                           </span>
//                         </td>
//                         <td className="py-3 px-6 text-gray-600">
//                           {dayjs(ev.date).format("MMM DD, YYYY")}
//                         </td>
//                         <td className="py-3 px-6 text-gray-600">{ev.time}</td>
//                         <td className="py-3 px-6 text-gray-600">
//                           {ev.location}
//                         </td>
//                         <td className="py-3 px-6 text-right">
//                           <button
//                             onClick={() => {
//                               setEventToDelete(ev);
//                               setShowDeleteModal(true);
//                             }}
//                             className="text-gray-400 hover:text-red-600"
//                           >
//                             🗑
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 {filteredEvents.length === 0 && (
//                   <p className="text-center text-gray-500 py-10 text-sm">
//                     No events found 😕
//                   </p>
//                 )}
//               </div>
//             </>
//           )}
//         </main>
//       </div>

//       {/* Drawer */}
//       <div
//         className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
//           drawerOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between border-b px-6 py-4 bg-gray-50">
//           <h2 className="text-lg font-bold text-gray-800">
//             {editMode ? "Edit Event" : "Add Event"}
//           </h2>
//           <button
//             onClick={() => setDrawerOpen(false)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <FiX size={20} />
//           </button>
//         </div>

//         <form
//           onSubmit={editMode ? handleUpdateEvent : handleAddEvent}
//           className="p-6 overflow-y-auto h-[calc(100%-64px)] space-y-5"
//         >
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Event Title
//             </label>
//             <input
//               name="title"
//               value={newEvent.title}
//               onChange={handleChange}
//               required
//               className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={newEvent.description}
//               onChange={handleChange}
//               rows="3"
//               className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 name="date"
//                 value={newEvent.date}
//                 onChange={handleChange}
//                 className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Time
//               </label>
//               <input
//                 type="time"
//                 name="time"
//                 value={newEvent.time}
//                 onChange={handleChange}
//                 className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Location
//             </label>
//             <input
//               name="location"
//               value={newEvent.location}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Type
//               </label>
//               <select
//                 name="type"
//                 value={newEvent.type}
//                 onChange={handleChange}
//                 className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               >
//                 <option>Meeting</option>
//                 <option>Deadline</option>
//                 <option>Event</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Color Tag
//               </label>
//               <select
//                 name="color"
//                 value={newEvent.color}
//                 onChange={handleChange}
//                 className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               >
//                 <option value="blue">Blue</option>
//                 <option value="red">Red</option>
//                 <option value="green">Green</option>
//                 <option value="amber">Amber</option>
//                 <option value="indigo">Indigo</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex justify-end gap-3 pt-6">
//             <button
//               type="button"
//               onClick={() => setDrawerOpen(false)}
//               className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Delete Confirmation */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[70]">
//           <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//             >
//               <FiX size={20} />
//             </button>
//             <div className="text-center">
//               <h2 className="text-lg font-semibold text-gray-800 mb-2">
//                 Delete Event?
//               </h2>
//               <p className="text-sm text-gray-600 mb-6">
//                 Are you sure you want to delete{" "}
//                 <span className="font-semibold text-gray-900">
//                   {eventToDelete?.title}
//                 </span>
//                 ? This action cannot be undone.
//               </p>
//               <div className="flex justify-center gap-3">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteEvent}
//                   className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  FiCalendar,
  FiList,
  FiPlus,
  FiSearch,
  FiFilter,
  FiClock,
  FiMoreVertical,
  FiX,
} from "react-icons/fi";
import dayjs from "dayjs";
import axios from "axios";
import toast from "react-hot-toast";

export default function Calendar() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [events, setEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const today = dayjs();

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    type: "Meeting",
    date: "",
    time: "",
    location: "",
    color: "blue",
  });

  const eventTypes = ["All", "Meeting", "Deadline", "Event"];

  // 🧩 Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        toast.loading("Fetching events...", { id: "fetchEvents" });
        const { data } = await axios.get("http://localhost:5000/Event/get");
        if (data.success) {
          setEvents(data.events);
          toast.success("Events loaded!", { id: "fetchEvents" });
        } else {
          toast.error("Failed to load events", { id: "fetchEvents" });
        }
      } catch (error) {
        console.error("❌ Error fetching events:", error);
        toast.error("Server error fetching events", { id: "fetchEvents" });
      }
    };
    fetchEvents();
  }, []);

  // 🔍 Filter & Search
  const filteredEvents = events.filter(
    (e) =>
      (filter === "All" || e.type === filter) &&
      e.title.toLowerCase().includes(search.toLowerCase())
  );

  // 📅 Calendar data
  const monthStart = today.startOf("month");
  const daysInMonth = today.daysInMonth();
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = monthStart.add(i, "day");
    return {
      date,
      dayNumber: i + 1,
      events: filteredEvents.filter((ev) =>
        dayjs(ev.date).isSame(date, "day")
      ),
    };
  });

  // 🧾 Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // ➕ Add Event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Creating event...", { id: "eventCreate" });
      const { data } = await axios.post(
        "http://localhost:5000/Event/add",
        newEvent
      );

      if (data.success) {
        toast.success("Event added!", { id: "eventCreate" });
        setEvents((prev) => [...prev, data.event]);
        setDrawerOpen(false);
        setNewEvent({
          title: "",
          description: "",
          type: "Meeting",
          date: "",
          time: "",
          location: "",
          color: "blue",
        });
      } else {
        toast.error("Failed to create event", { id: "eventCreate" });
      }
    } catch (error) {
      console.error("❌ Error adding event:", error);
      toast.error("Server error while adding event", { id: "eventCreate" });
    }
  };

  // ✏️ Edit / View
  const handleViewEvent = (event) => {
    setNewEvent({
      title: event.title,
      description: event.description || "",
      type: event.type || "Meeting",
      date: event.date?.slice(0, 10) || "",
      time: event.time || "",
      location: event.location || "",
      color: event.color || "blue",
    });
    setCurrentEventId(event._id);
    setEditMode(true);
    setDrawerOpen(true);
  };

  // 🔄 Update Event
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Updating event...", { id: "updateEvent" });
      const { data } = await axios.put(
        `http://localhost:5000/Event/update/${currentEventId}`,
        newEvent
      );

      if (data.success) {
        toast.success("Event updated!", { id: "updateEvent" });
        setEvents((prev) =>
          prev.map((ev) => (ev._id === data.event._id ? data.event : ev))
        );
        setDrawerOpen(false);
        setEditMode(false);
        setCurrentEventId(null);
      } else {
        toast.error("Failed to update event", { id: "updateEvent" });
      }
    } catch (error) {
      console.error("❌ Error updating event:", error);
      toast.error("Server error while updating event", { id: "updateEvent" });
    }
  };

  // 🗑 Delete Event
  const handleDeleteEvent = async () => {
    try {
      toast.loading("Deleting event...", { id: "deleteEvent" });
      const { data } = await axios.delete(
        `http://localhost:5000/Event/delete/${eventToDelete._id}`
      );
      if (data.success) {
        toast.success("Event deleted!", { id: "deleteEvent" });
        setEvents((prev) => prev.filter((e) => e._id !== eventToDelete._id));
        setShowDeleteModal(false);
      } else toast.error("Failed to delete", { id: "deleteEvent" });
    } catch (error) {
      console.error("❌ Error deleting event:", error);
      toast.error("Server error while deleting", { id: "deleteEvent" });
    }
  };

  return (
   <div className="flex h-screen bg-gray-950 overflow-hidden text-gray-200">
  <Sidebar />

  <div className="flex-1 flex flex-col">
    {/* Header */}
    <header className="flex justify-between items-center bg-gray-900/90 backdrop-blur-md px-8 py-4 border-b border-gray-800 shadow-md">
      <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
        <FiCalendar size={22} className="text-indigo-400" /> Calendar
      </h1>
      <button
        onClick={() => {
          setDrawerOpen(true);
          setEditMode(false);
          setNewEvent({
            title: "",
            description: "",
            type: "Meeting",
            date: "",
            time: "",
            location: "",
            color: "blue",
          });
        }}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition"
      >
        <FiPlus size={16} /> Add Event
      </button>
    </header>

    {/* Tabs */}
    <div className="flex border-b border-gray-800 bg-gray-900/80 px-8 backdrop-blur-md">
      <button
        onClick={() => setActiveTab("calendar")}
        className={`py-3 px-4 text-sm font-medium flex items-center gap-2 border-b-2 transition ${
          activeTab === "calendar"
            ? "border-indigo-500 text-indigo-400"
            : "border-transparent text-gray-400 hover:text-gray-200"
        }`}
      >
        <FiCalendar size={16} /> Calendar View
      </button>
      <button
        onClick={() => setActiveTab("events")}
        className={`py-3 px-4 text-sm font-medium flex items-center gap-2 border-b-2 transition ${
          activeTab === "events"
            ? "border-indigo-500 text-indigo-400"
            : "border-transparent text-gray-400 hover:text-gray-200"
        }`}
      >
        <FiList size={16} /> Events List
      </button>
    </div>

    {/* Filters */}
    <div className="bg-gray-900/80 border-b border-gray-800 px-8 py-4 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
      <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md px-3 py-2 w-full max-w-sm">
        <FiSearch className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none ml-2 text-sm text-gray-200 placeholder-gray-500 w-full"
        />
      </div>
      <div className="flex items-center gap-3">
        <FiFilter className="text-gray-400" size={18} />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-700 bg-gray-800 text-gray-200 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {eventTypes.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Main Content */}
    <main className="flex-1 overflow-y-auto p-8 space-y-8 custom-scroll">
      {activeTab === "calendar" ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              {today.format("MMMM YYYY")}
            </h2>
            <p className="text-gray-400 text-sm">
              Showing {filteredEvents.length} event
              {filteredEvents.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-4">
            {calendarDays.map((day) => (
              <div
                key={day.dayNumber}
                className="bg-gray-900/70 border border-gray-800 rounded-xl p-3 flex flex-col shadow-md hover:border-indigo-500 transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-200">
                    {day.dayNumber}
                  </span>
                  {day.date.isSame(today, "day") && (
                    <span className="text-xs text-indigo-400 font-semibold">
                      Today
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  {day.events.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">No events</p>
                  ) : (
                    day.events.map((ev) => (
                      <div
                        key={ev._id}
                        onClick={() => handleViewEvent(ev)}
                        className={`border-l-4 rounded-md px-2 py-1 text-xs cursor-pointer bg-gray-800/70 hover:bg-gray-800 transition ${
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
                        <p className="font-medium text-gray-200 truncate">
                          {ev.title}
                        </p>
                        <p className="flex items-center gap-1 text-gray-400">
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
          <div className="bg-gray-900/80 border border-gray-800 rounded-xl shadow-md overflow-hidden backdrop-blur-md">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="bg-gray-800 text-gray-400 border-b border-gray-700">
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
                    key={ev._id}
                    className="border-t border-gray-800 hover:bg-gray-800/70 transition"
                  >
                    <td className="py-3 px-6 font-medium text-gray-100">
                      {ev.title}
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          ev.type === "Meeting"
                            ? "bg-blue-900/40 text-blue-400"
                            : ev.type === "Deadline"
                            ? "bg-red-900/40 text-red-400"
                            : "bg-green-900/40 text-green-400"
                        }`}
                      >
                        {ev.type}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-gray-400">
                      {dayjs(ev.date).format("MMM DD, YYYY")}
                    </td>
                    <td className="py-3 px-6 text-gray-400">{ev.time}</td>
                    <td className="py-3 px-6 text-gray-400">
                      {ev.location || "-"}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <button
                        onClick={() => {
                          setEventToDelete(ev);
                          setShowDeleteModal(true);
                        }}
                        className="text-gray-500 hover:text-red-500"
                      >
                        🗑
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

  {/* Drawer */}
  <div
    className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-gray-900/95 border-l border-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 backdrop-blur-md ${
      drawerOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4 bg-gray-900/80">
      <h2 className="text-lg font-bold text-white">
        {editMode ? "Edit Event" : "Add Event"}
      </h2>
      <button
        onClick={() => setDrawerOpen(false)}
        className="text-gray-400 hover:text-gray-200"
      >
        <FiX size={20} />
      </button>
    </div>

    <form
      onSubmit={editMode ? handleUpdateEvent : handleAddEvent}
      className="p-6 overflow-y-auto h-[calc(100%-64px)] space-y-5 custom-scroll"
    >
      <div>
        <label className="text-sm font-medium text-gray-400">Event Title</label>
        <input
          name="title"
          value={newEvent.title}
          onChange={handleChange}
          required
          className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-400">Description</label>
        <textarea
          name="description"
          value={newEvent.description}
          onChange={handleChange}
          rows="3"
          className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-400">Date</label>
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-400">Time</label>
          <input
            type="time"
            name="time"
            value={newEvent.time}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-400">Location</label>
        <input
          name="location"
          value={newEvent.location}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-400">Type</label>
          <select
            name="type"
            value={newEvent.type}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option>Meeting</option>
            <option>Deadline</option>
            <option>Event</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-400">Color Tag</label>
          <select
            name="color"
            value={newEvent.color}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="amber">Amber</option>
            <option value="indigo">Indigo</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <button
          type="button"
          onClick={() => setDrawerOpen(false)}
          className="px-4 py-2 border border-gray-700 rounded-md text-sm text-gray-400 hover:bg-gray-800 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm shadow-md transition"
        >
          Save
        </button>
      </div>
    </form>
  </div>

  {/* Delete Confirmation */}
  {showDeleteModal && (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-[70] animate-fadeIn">
      <div className="bg-gray-900/95 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative text-gray-200 text-center">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold text-white mb-2">
          Delete Event?
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-200">
            {eventToDelete?.title}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 border border-gray-700 rounded-md text-sm text-gray-400 hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteEvent}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
}
