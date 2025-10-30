// import { useEffect, useState } from "react";
// import Sidebar from "../component/Sidebar";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { FiClock, FiFolder, FiSearch, FiFilter, FiX } from "react-icons/fi";

// export default function EmployeeTasks() {
//   const [tasks, setTasks] = useState([]);
//   const [search, setSearch] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("All");
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [pendingStatusChange, setPendingStatusChange] = useState(null);
//   const [employeeStats, setEmployeeStats] = useState(null); // ✅ analytics data
//   const [activeTimers, setActiveTimers] = useState({});
//   const [elapsedTime, setElapsedTime] = useState({});
//   const columns = ["pending", "inprogress", "done"];
//   const priorities = ["All", "High", "Medium", "Low"];
//   const employeeId = localStorage.getItem("employeeId");
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setElapsedTime((prev) => {
//         const updated = { ...prev };
//         for (const [taskId, startTime] of Object.entries(activeTimers)) {
//           updated[taskId] = Math.floor((Date.now() - startTime) / 1000);
//         }
//         return updated;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [activeTimers]);
//   const handleStartTimer = async (taskId) => {
//     try {
//       toast.loading("Starting timer...", { id: "timer" });
//       const { data } = await axios.put(
//         `http://localhost:5000/Task/startTimer/${taskId}`,
//         { employeeId }
//       );

//       if (data.success) {
//         toast.success("Timer started", { id: "timer" });
//         setActiveTimers((prev) => ({
//           ...prev,
//           [taskId]: Date.now(),
//         }));
//       } else {
//         toast.error("Failed to start timer", { id: "timer" });
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error while starting timer", { id: "timer" });
//     }
//   };

//   const handleStopTimer = async (taskId) => {
//     try {
//       toast.loading("Stopping timer...", { id: "timer" });
//       const { data } = await axios.put(
//         `http://localhost:5000/Task/stopTimer/${taskId}`,
//         { employeeId }
//       );

//       if (data.success) {
//         toast.success("Timer stopped", { id: "timer" });

//         // Remove active timer for this task
//         setActiveTimers((prev) => {
//           const updated = { ...prev };
//           delete updated[taskId];
//           return updated;
//         });

//         // Refresh task data to show updated total time
//         setTasks((prev) => prev.map((t) => (t._id === taskId ? data.task : t)));
//       } else {
//         toast.error("Failed to stop timer", { id: "timer" });
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error while stopping timer", { id: "timer" });
//     }
//   };

//   // ✅ Fetch both tasks and analytics
//   useEffect(() => {
//     if (!employeeId) return toast.error("Employee ID missing in localStorage");

//     const fetchAll = async () => {
//       try {
//         // ✅ Only fetch tasks for this employee
//         const { data } = await axios.get(
//           `http://localhost:5000/Task/getTasksForEmployee/${employeeId}`
//         );

//         if (data.success) {
//           setTasks(data.tasks);
//         } else {
//           toast.error("Failed to load tasks");
//         }
//       } catch (error) {
//         console.error("Error loading employee tasks:", error);
//         toast.error("Error fetching tasks");
//       }
//     };

//     fetchAll();
//   }, [employeeId]);

//   // Filter and group tasks
//   const filteredTasks = tasks.filter(
//     (t) =>
//       t.title?.toLowerCase().includes(search.toLowerCase()) &&
//       (priorityFilter === "All" || t.priority === priorityFilter)
//   );

//   const groupedTasks = columns.map((col) => ({
//     status: col,
//     tasks: filteredTasks.filter((t) =>
//       t.assignees?.some(
//         (a) =>
//           String(a.employee?._id) === String(employeeId) && a.status === col
//       )
//     ),
//   }));

//   // Handle drag-drop
//   const handleDragStart = (e, task) => {
//     e.dataTransfer.setData("taskId", task._id);
//   };

//   const handleDrop = (e, newStatus) => {
//     const taskId = e.dataTransfer.getData("taskId");
//     const task = tasks.find((t) => t._id === taskId);

//     // get current assignee record
//     const assignee = task.assignees.find((a) => a.employee?._id === employeeId);

//     if (assignee?.status !== newStatus) {
//       setPendingStatusChange({ taskId, newStatus });
//       setShowConfirmModal(true);
//     }
//   };

//   // ✅ Update task status
//   const handleUpdateStatus = async () => {
//     const { taskId, newStatus } = pendingStatusChange;
//     setShowConfirmModal(false);
//     toast.loading("Updating task status...", { id: "statusChange" });
//     console.log("Updating task:", taskId, "for employee:", employeeId);

//     try {
//       const { data } = await axios.put(
//         `http://localhost:5000/Task/updateEmployeeTaskStatus/${taskId}`,
//         { employeeId, status: newStatus }
//       );

//       if (data.success) {
//         setTasks((prev) => prev.map((t) => (t._id === taskId ? data.task : t)));
//         toast.success("Task status updated!", { id: "statusChange" });
//       } else {
//         toast.error("Failed to update status", { id: "statusChange" });
//       }
//     } catch (error) {
//       console.error("Error updating task status:", error);
//       toast.error("Server error while updating task", { id: "statusChange" });
//     }
//   };

//   const formatTime = (seconds) => {
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     return `${h}h ${m}m`;
//   };

//   // ✅ Add this here before return()
//   const statusLabels = {
//     pending: "Pending",
//     inprogress: "In Progress",
//     done: "Done",
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
//           <h1 className="text-2xl font-extrabold text-gray-800">My Tasks</h1>

//           {/* ✅ Simple analytics summary (small, inline, same layout) */}
//           {employeeStats && (
//             <div className="flex gap-6 text-sm text-gray-600">
//               <span>
//                 🟢 Completed: <strong>{employeeStats.completedTasks}</strong>
//               </span>
//               <span>
//                 🟡 In Progress: <strong>{employeeStats.inProgressTasks}</strong>
//               </span>
//               <span>
//                 ⚪ Pending: <strong>{employeeStats.pendingTasks}</strong>
//               </span>
//               <span>
//                 ⏱ Total Time:{" "}
//                 <strong>{formatTime(employeeStats.totalTimeSpent)}</strong>
//               </span>
//             </div>
//           )}
//         </header>

//         {/* Filters */}
//         <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
//           <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
//             <FiSearch className="text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search tasks..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
//             />
//           </div>

//           <div className="flex items-center gap-3">
//             <FiFilter className="text-gray-500" size={18} />
//             <select
//               value={priorityFilter}
//               onChange={(e) => setPriorityFilter(e.target.value)}
//               className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {priorities.map((p) => (
//                 <option key={p}>{p}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Task Board */}
//         <main className="flex-1 overflow-x-auto p-8">
//           <div className="flex gap-6 min-w-max">
//             {groupedTasks.map((col) => (
//               <div
//                 key={col.status}
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={(e) => handleDrop(e, col.status)}
//                 className="flex flex-col bg-gray-50 border border-gray-200 rounded-xl w-72 shadow-sm"
//               >
//                 {/* Column Header */}
//                 <div className="flex justify-between items-center bg-white px-4 py-3 border-b border-gray-100 rounded-t-xl">
//                   <h2 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
//                     <span
//                       className={`w-2.5 h-2.5 rounded-full ${
//                         col.status === "pending"
//                           ? "bg-gray-400"
//                           : col.status === "inprogress"
//                           ? "bg-blue-500"
//                           : "bg-green-500"
//                       }`}
//                     ></span>
//                     {statusLabels[col.status]}
//                   </h2>
//                   <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
//                     {col.tasks.length}
//                   </span>
//                 </div>

//                 {/* Tasks */}
//                 <div className="flex-1 p-4 space-y-4 overflow-y-auto min-h-[200px]">
//                   {col.tasks.length === 0 ? (
//                     <p className="text-sm text-gray-400 italic text-center mt-4">
//                       No tasks
//                     </p>
//                   ) : (
//                     col.tasks.map((task) => (
//                       <div
//                         key={task._id}
//                         draggable
//                         onDragStart={(e) => handleDragStart(e, task)}
//                         onClick={() => {
//                           setSelectedTask(task);
//                           setDrawerOpen(true);
//                         }}
//                         className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all p-5 cursor-move relative group"
//                       >
//                         {/* Header — Title + Priority */}
//                         <div className="flex justify-between items-start mb-2">
//                           <div>
//                             <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">
//                               {task.title}
//                             </h3>
//                             {task.projectId && (
//                               <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
//                                 <FiFolder size={12} className="text-gray-400" />
//                                 {task.projectId?.name || "No Project"}
//                               </p>
//                             )}
//                           </div>

//                           <span
//                             className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
//                               task.priority === "High"
//                                 ? "bg-red-100 text-red-700"
//                                 : task.priority === "Medium"
//                                 ? "bg-yellow-100 text-yellow-700"
//                                 : "bg-green-100 text-green-700"
//                             }`}
//                           >
//                             {task.priority}
//                           </span>
//                         </div>

//                         {/* Description */}
//                         {task.description && (
//                           <p className="text-xs text-gray-600 mt-1 mb-3 line-clamp-3 leading-relaxed">
//                             {task.description}
//                           </p>
//                         )}

//                         {/* Task Meta Info */}
//                         <div className="flex items-center justify-between text-[11px] text-gray-500 border-t pt-2 mt-2">
//                           <div className="flex flex-col gap-1">
//                             {/* Status */}
//                             <span className="flex items-center gap-1">
//                               <span
//                                 className={`inline-block w-2 h-2 rounded-full ${
//                                   task.status === "To Do"
//                                     ? "bg-gray-400"
//                                     : task.status === "In Progress"
//                                     ? "bg-blue-500"
//                                     : task.status === "Review"
//                                     ? "bg-amber-500"
//                                     : "bg-green-500"
//                                 }`}
//                               ></span>
//                               {statusLabels[task.status] || task.status}
//                             </span>

//                             {/* Due Date */}
//                             {task.subtasks?.length > 0 && (
//                               <span>
//                                 📝 <strong>{task.subtasks.length}</strong>{" "}
//                                 Subtask
//                                 {task.subtasks.length > 1 && "s"}
//                               </span>
//                             )}
//                           </div>

//                           {/* Right Section: Timer */}
//                           <div className="flex flex-col items-end gap-1">
//                             <span className="flex items-center gap-1 font-medium text-[12px]">
//                               <FiClock size={12} className="text-gray-400" />
//                               {activeTimers[task._id]
//                                 ? formatTime(elapsedTime[task._id] || 0)
//                                 : formatTime(
//                                     task.assignees.find(
//                                       (a) =>
//                                         String(a.employee?._id) ===
//                                         String(employeeId)
//                                     )?.timeSpent || 0
//                                   )}
//                             </span>

//                             {activeTimers[task._id] ? (
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleStopTimer(task._id);
//                                 }}
//                                 className="text-xs flex items-center gap-1 px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-all"
//                               >
//                                 <FiClock size={12} /> Stop
//                               </button>
//                             ) : (
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation();
//                                   handleStartTimer(task._id);
//                                 }}
//                                 className="text-xs flex items-center gap-1 px-2 py-1 bg-green-50 hover:bg-green-100 text-green-600 rounded-md transition-all"
//                               >
//                                 <FiClock size={12} /> Start
//                               </button>
//                             )}
//                           </div>
//                         </div>

//                         {/* Subtasks Preview */}
//                         {task.subtasks?.length > 0 && (
//                           <div className="mt-3 border-t pt-2">
//                             <p className="text-[11px] text-gray-600 font-medium mb-1">
//                               Subtasks:
//                             </p>
//                             <ul className="text-[11px] text-gray-500 space-y-1">
//                               {task.subtasks.slice(0, 3).map((s, i) => (
//                                 <li key={i} className="flex items-center gap-2">
//                                   <span
//                                     className={`w-2 h-2 rounded-full ${
//                                       s.completed
//                                         ? "bg-green-500"
//                                         : "bg-gray-300"
//                                     }`}
//                                   ></span>
//                                   {s.title}
//                                 </li>
//                               ))}
//                               {task.subtasks.length > 3 && (
//                                 <li className="italic text-gray-400">
//                                   + more...
//                                 </li>
//                               )}
//                             </ul>
//                           </div>
//                         )}
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>

//       {/* Drawer for Task Details (unchanged) */}
//       {drawerOpen && selectedTask && (
//         <div className="fixed top-0 right-0 h-full w-full sm:w-[850px] bg-white shadow-2xl z-50 flex flex-col border-l overflow-y-auto transition-all duration-300">
//           {/* HEADER */}
//           <div className="flex justify-between items-start px-8 py-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase tracking-wide">
//                   Task Details
//                 </span>
//                 <span className="text-xs text-gray-500">
//                   #{selectedTask._id?.slice(-6)}
//                 </span>
//               </div>
//               <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
//                 {selectedTask.title}
//               </h2>
//               <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
//                 <FiFolder className="text-gray-400" />{" "}
//                 {selectedTask.projectId?.name || "No project assigned"}
//               </p>
//             </div>

//             <button
//               onClick={() => setDrawerOpen(false)}
//               className="text-gray-400 hover:text-gray-600 transition"
//             >
//               <FiX size={24} />
//             </button>
//           </div>

//           {/* CONTENT */}
//           <div className="flex-1 p-8 space-y-10">
//             {/* --- OVERVIEW --- */}
//             <section>
//               <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3 flex items-center gap-2">
//                 <FiClock className="text-blue-500" /> Overview
//               </h3>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
//                 <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
//                   <p className="text-gray-500 text-xs uppercase font-semibold">
//                     Priority
//                   </p>
//                   <p
//                     className={`mt-1 inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
//                       selectedTask.priority === "High"
//                         ? "bg-red-100 text-red-700"
//                         : selectedTask.priority === "Medium"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-green-100 text-green-700"
//                     }`}
//                   >
//                     {selectedTask.priority}
//                   </p>
//                 </div>

//                 <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
//                   <p className="text-gray-500 text-xs uppercase font-semibold">
//                     Status
//                   </p>
//                   <p className="mt-1 font-medium text-gray-800">
//                     {selectedTask.status}
//                   </p>
//                 </div>

//                 <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
//                   <p className="text-gray-500 text-xs uppercase font-semibold">
//                     Created On
//                   </p>
//                   <p className="mt-1 font-medium text-gray-800">
//                     {new Date(selectedTask.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             </section>

//             {/* --- DESCRIPTION --- */}
//             <section>
//               <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3 flex items-center gap-2">
//                 📝 Description
//               </h3>
//               <div className="border border-gray-200 bg-gray-50 rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap shadow-sm">
//                 {selectedTask.description || "No description provided."}
//               </div>
//             </section>

//             {/* --- ASSIGNEES --- */}
//             {selectedTask.assignees?.length > 0 && (
//               <section>
//                 <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3 flex items-center gap-2">
//                   👥 Assignees
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   {selectedTask.assignees.map((a) => (
//                     <div
//                       key={a._id}
//                       className="flex items-center gap-2 border border-gray-200 bg-white rounded-full px-3 py-1.5 shadow-sm"
//                     >
//                       <img
//                         src={
//                           a.employee?.avatar ||
//                           `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                             a.employee?.name || "User"
//                           )}&background=3b82f6&color=fff`
//                         }
//                         alt={a.employee?.name}
//                         className="w-7 h-7 rounded-full object-cover"
//                       />
//                       <span className="text-sm text-gray-700 font-medium">
//                         {a.employee?.name}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* --- ATTACHMENTS --- */}
//             {selectedTask.documents?.length > 0 && (
//               <section>
//                 <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3 flex items-center gap-2">
//                   📎 Attachments
//                 </h3>
//                 <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white shadow-sm">
//                   {selectedTask.documents.map((doc, i) => (
//                     <li
//                       key={i}
//                       className="px-4 py-2 flex justify-between items-center text-sm text-gray-700 hover:bg-gray-50 transition"
//                     >
//                       <span className="truncate max-w-[300px]">
//                         {doc.split("/").pop()}
//                       </span>
//                       <a
//                         href={doc}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 text-xs font-medium hover:underline"
//                       >
//                         View
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </section>
//             )}

//             {/* --- SUBTASKS --- */}
//             {selectedTask.subtasks?.length > 0 && (
//               <section>
//                 <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3 flex items-center gap-2">
//                   ✅ Subtasks
//                 </h3>
//                 <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
//                   <div className="grid grid-cols-3 bg-gray-100 text-xs font-semibold text-gray-600 border-b">
//                     <div className="py-2 px-3">Name</div>
//                     <div className="py-2 px-3 text-center">Assignees</div>
//                     <div className="py-2 px-3 text-center">Priority</div>
//                   </div>

//                   {selectedTask.subtasks.map((sub, i) => (
//                     <div
//                       key={i}
//                       className="grid grid-cols-3 text-sm border-b last:border-0 hover:bg-gray-50 transition"
//                     >
//                       <div className="px-3 py-2">{sub.title}</div>
//                       <div className="px-3 py-2 flex justify-center">
//                         {sub.assignees?.length ? (
//                           <div className="flex -space-x-2">
//                             {sub.assignees.slice(0, 3).map((a, j) => (
//                               <img
//                                 key={j}
//                                 src={
//                                   a.avatar ||
//                                   `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                                     a.name || "User"
//                                   )}&background=3b82f6&color=fff`
//                                 }
//                                 alt={a.name}
//                                 className="w-6 h-6 rounded-full border-2 border-white"
//                               />
//                             ))}
//                           </div>
//                         ) : (
//                           <span className="text-gray-400">—</span>
//                         )}
//                       </div>
//                       <div className="px-3 py-2 text-center">
//                         <span
//                           className={`text-xs px-2 py-0.5 rounded-full font-medium ${
//                             sub.priority === "High"
//                               ? "bg-red-100 text-red-700"
//                               : sub.priority === "Normal"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : "bg-green-100 text-green-700"
//                           }`}
//                         >
//                           {sub.priority}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* --- TIME TRACKING --- */}
//             <section>
//               <h3 className="text-sm font-semibold text-gray-600 uppercase mb-3 flex items-center gap-2">
//                 ⏱ Time Tracking
//               </h3>
//               <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm text-sm text-gray-700 flex items-center justify-between">
//                 <div>
//                   <p className="text-gray-500 text-xs uppercase font-semibold">
//                     Total Time Spent
//                   </p>
//                   <p className="mt-1 text-gray-800 font-medium">
//                     {(() => {
//                       const assignee = selectedTask.assignees.find(
//                         (a) => String(a.employee?._id) === String(employeeId)
//                       );
//                       const seconds = assignee?.timeSpent || 0;
//                       const hours = Math.floor(seconds / 3600);
//                       const minutes = Math.floor((seconds % 3600) / 60);
//                       return `${hours}h ${minutes}m`;
//                     })()}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-500 text-xs">
//                   <FiClock size={16} />
//                   Last updated:{" "}
//                   {new Date(selectedTask.updatedAt).toLocaleDateString()}
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       )}

//       {/* Confirm Modal */}
//       {showConfirmModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[200]">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
//             <h2 className="text-lg font-semibold text-gray-800 mb-2">
//               Confirm Status Change
//             </h2>
//             <p className="text-sm text-gray-500 mb-6">
//               Are you sure you want to move this task to{" "}
//               <strong>{pendingStatusChange.newStatus}</strong>?
//             </p>
//             <div className="flex justify-center gap-3">
//               <button
//                 onClick={() => setShowConfirmModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdateStatus}
//                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import toast from "react-hot-toast";
import { FiClock, FiFolder, FiSearch, FiFilter, FiX } from "react-icons/fi";

export default function EmployeeTasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState(null);
  const [employeeStats, setEmployeeStats] = useState(null); // ✅ analytics data
  const [activeTimers, setActiveTimers] = useState({});
  const [elapsedTime, setElapsedTime] = useState({});
  const columns = ["pending", "inprogress", "done"];
  const priorities = ["All", "High", "Medium", "Low"];
  const employeeId = localStorage.getItem("employeeId");
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => {
        const updated = { ...prev };
        for (const [taskId, startTime] of Object.entries(activeTimers)) {
          updated[taskId] = Math.floor((Date.now() - startTime) / 1000);
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimers]);
  const handleStartTimer = async (taskId) => {
    try {
      toast.loading("Starting timer...", { id: "timer" });
      const { data } = await axios.put(
        `http://localhost:5000/Task/startTimer/${taskId}`,
        { employeeId }
      );

      if (data.success) {
        toast.success("Timer started", { id: "timer" });
        setActiveTimers((prev) => ({
          ...prev,
          [taskId]: Date.now(),
        }));
      } else {
        toast.error("Failed to start timer", { id: "timer" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while starting timer", { id: "timer" });
    }
  };

  const handleStopTimer = async (taskId) => {
    try {
      toast.loading("Stopping timer...", { id: "timer" });
      const { data } = await axios.put(
        `http://localhost:5000/Task/stopTimer/${taskId}`,
        { employeeId }
      );

      if (data.success) {
        toast.success("Timer stopped", { id: "timer" });

        // Remove active timer for this task
        setActiveTimers((prev) => {
          const updated = { ...prev };
          delete updated[taskId];
          return updated;
        });

        // Refresh task data to show updated total time
        setTasks((prev) => prev.map((t) => (t._id === taskId ? data.task : t)));
      } else {
        toast.error("Failed to stop timer", { id: "timer" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error while stopping timer", { id: "timer" });
    }
  };

  // ✅ Fetch both tasks and analytics
  useEffect(() => {
    if (!employeeId) return toast.error("Employee ID missing in localStorage");

    const fetchAll = async () => {
      try {
        // ✅ Only fetch tasks for this employee
        const { data } = await axios.get(
          `http://localhost:5000/Task/getTasksForEmployee/${employeeId}`
        );

        if (data.success) {
          setTasks(data.tasks);
        } else {
          toast.error("Failed to load tasks");
        }
      } catch (error) {
        console.error("Error loading employee tasks:", error);
        toast.error("Error fetching tasks");
      }
    };

    fetchAll();
  }, [employeeId]);

  // Filter and group tasks
  const filteredTasks = tasks.filter(
    (t) =>
      t.title?.toLowerCase().includes(search.toLowerCase()) &&
      (priorityFilter === "All" || t.priority === priorityFilter)
  );

  const groupedTasks = columns.map((col) => ({
    status: col,
    tasks: filteredTasks.filter((t) =>
      t.assignees?.some(
        (a) =>
          String(a.employee?._id) === String(employeeId) && a.status === col
      )
    ),
  }));

  // Handle drag-drop
  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("taskId", task._id);
  };

  const handleDrop = (e, newStatus) => {
    const taskId = e.dataTransfer.getData("taskId");
    const task = tasks.find((t) => t._id === taskId);

    // get current assignee record
    const assignee = task.assignees.find((a) => a.employee?._id === employeeId);

    if (assignee?.status !== newStatus) {
      setPendingStatusChange({ taskId, newStatus });
      setShowConfirmModal(true);
    }
  };

  // ✅ Update task status
  const handleUpdateStatus = async () => {
    const { taskId, newStatus } = pendingStatusChange;
    setShowConfirmModal(false);
    toast.loading("Updating task status...", { id: "statusChange" });
    console.log("Updating task:", taskId, "for employee:", employeeId);

    try {
      const { data } = await axios.put(
        `http://localhost:5000/Task/updateEmployeeTaskStatus/${taskId}`,
        { employeeId, status: newStatus }
      );

      if (data.success) {
        setTasks((prev) => prev.map((t) => (t._id === taskId ? data.task : t)));
        toast.success("Task status updated!", { id: "statusChange" });
      } else {
        toast.error("Failed to update status", { id: "statusChange" });
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Server error while updating task", { id: "statusChange" });
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  // ✅ Add this here before return()
  const statusLabels = {
    pending: "Pending",
    inprogress: "In Progress",
    done: "Done",
  };

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden text-gray-200">
  <Sidebar />

  <div className="flex-1 flex flex-col">
    {/* HEADER */}
    <header className="flex justify-between items-center bg-gray-900/90 backdrop-blur-md px-8 py-4 border-b border-gray-800 shadow-md">
      <h1 className="text-2xl font-extrabold text-white">My Tasks</h1>

      {/* ✅ Analytics summary (dark mode styled) */}
      {employeeStats && (
        <div className="flex gap-6 text-sm text-gray-400">
          <span>
            🟢 Completed:{" "}
            <strong className="text-green-400">{employeeStats.completedTasks}</strong>
          </span>
          <span>
            🟡 In Progress:{" "}
            <strong className="text-yellow-400">{employeeStats.inProgressTasks}</strong>
          </span>
          <span>
            ⚪ Pending:{" "}
            <strong className="text-gray-300">{employeeStats.pendingTasks}</strong>
          </span>
          <span>
            ⏱ Total Time:{" "}
            <strong className="text-indigo-400">
              {formatTime(employeeStats.totalTimeSpent)}
            </strong>
          </span>
        </div>
      )}
    </header>

    {/* FILTERS */}
    <div className="bg-gray-900/80 border-b border-gray-800 px-8 py-4 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
      <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md px-3 py-2 w-full max-w-sm">
        <FiSearch className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none ml-2 text-sm text-gray-200 placeholder-gray-500 w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        <FiFilter className="text-gray-400" size={18} />
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border border-gray-700 bg-gray-800 text-gray-200 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {priorities.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
    </div>

    {/* TASK BOARD */}
    <main className="flex-1 overflow-x-auto p-8 custom-scroll">
      <div className="flex gap-6 min-w-max">
        {groupedTasks.map((col) => (
          <div
            key={col.status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, col.status)}
            className="flex flex-col bg-gray-900/70 border border-gray-800 rounded-xl w-72 shadow-md hover:shadow-lg transition backdrop-blur-sm"
          >
            {/* COLUMN HEADER */}
            <div className="flex justify-between items-center bg-gray-900/90 border-b border-gray-800 rounded-t-xl px-4 py-3">
              <h2 className="font-semibold text-gray-200 text-sm flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    col.status === "pending"
                      ? "bg-gray-500"
                      : col.status === "inprogress"
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                ></span>
                {statusLabels[col.status]}
              </h2>
              <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                {col.tasks.length}
              </span>
            </div>

            {/* TASKS */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto min-h-[200px]">
              {col.tasks.length === 0 ? (
                <p className="text-sm text-gray-500 italic text-center mt-4">
                  No tasks
                </p>
              ) : (
                col.tasks.map((task) => (
                  <div
                    key={task._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onClick={() => {
                      setSelectedTask(task);
                      setDrawerOpen(true);
                    }}
                    className="bg-gray-800/80 border border-gray-700 rounded-xl shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all p-5 cursor-move relative group backdrop-blur-md"
                  >
                    {/* Header — Title + Priority */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-100 text-sm leading-snug line-clamp-2">
                          {task.title}
                        </h3>
                        {task.projectId && (
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <FiFolder size={12} className="text-gray-500" />
                            {task.projectId?.name || "No Project"}
                          </p>
                        )}
                      </div>

                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                          task.priority === "High"
                            ? "bg-red-900/40 text-red-400"
                            : task.priority === "Medium"
                            ? "bg-yellow-900/40 text-yellow-400"
                            : "bg-green-900/40 text-green-400"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    {/* Description */}
                    {task.description && (
                      <p className="text-xs text-gray-400 mt-1 mb-3 line-clamp-3 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    {/* Task Meta Info */}
                    <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-700 pt-2 mt-2">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${
                              task.status === "To Do"
                                ? "bg-gray-500"
                                : task.status === "In Progress"
                                ? "bg-blue-500"
                                : task.status === "Review"
                                ? "bg-amber-500"
                                : "bg-green-500"
                            }`}
                          ></span>
                          {statusLabels[task.status] || task.status}
                        </span>

                        {task.subtasks?.length > 0 && (
                          <span className="text-gray-500">
                            📝 <strong>{task.subtasks.length}</strong>{" "}
                            Subtask{task.subtasks.length > 1 && "s"}
                          </span>
                        )}
                      </div>

                      {/* Timer Controls */}
                      <div className="flex flex-col items-end gap-1">
                        <span className="flex items-center gap-1 font-medium text-[12px] text-gray-300">
                          <FiClock size={12} className="text-indigo-400" />
                          {activeTimers[task._id]
                            ? formatTime(elapsedTime[task._id] || 0)
                            : formatTime(
                                task.assignees.find(
                                  (a) =>
                                    String(a.employee?._id) ===
                                    String(employeeId)
                                )?.timeSpent || 0
                              )}
                        </span>

                        {activeTimers[task._id] ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStopTimer(task._id);
                            }}
                            className="text-xs flex items-center gap-1 px-2 py-1 bg-red-900/40 hover:bg-red-800/50 text-red-400 rounded-md transition-all"
                          >
                            <FiClock size={12} /> Stop
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartTimer(task._id);
                            }}
                            className="text-xs flex items-center gap-1 px-2 py-1 bg-green-900/40 hover:bg-green-800/50 text-green-400 rounded-md transition-all"
                          >
                            <FiClock size={12} /> Start
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Subtasks Preview */}
                    {task.subtasks?.length > 0 && (
                      <div className="mt-3 border-t border-gray-700 pt-2">
                        <p className="text-[11px] text-gray-400 font-medium mb-1">
                          Subtasks:
                        </p>
                        <ul className="text-[11px] text-gray-500 space-y-1">
                          {task.subtasks.slice(0, 3).map((s, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  s.completed ? "bg-green-500" : "bg-gray-600"
                                }`}
                              ></span>
                              {s.title}
                            </li>
                          ))}
                          {task.subtasks.length > 3 && (
                            <li className="italic text-gray-500">+ more...</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>


      {/* Drawer for Task Details (unchanged) */}
      {drawerOpen && selectedTask && (
  <div className="fixed top-0 right-0 h-full w-full sm:w-[850px] bg-gray-950/95 text-gray-200 shadow-2xl z-50 flex flex-col border-l border-gray-800 overflow-y-auto backdrop-blur-md transition-all duration-300">
    {/* HEADER */}
    <div className="flex justify-between items-start px-8 py-6 border-b border-gray-800 bg-gradient-to-r from-indigo-800/40 via-indigo-700/20 to-gray-900/80">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold bg-indigo-900/40 text-indigo-300 px-2 py-0.5 rounded-full uppercase tracking-wide">
            Task Details
          </span>
          <span className="text-xs text-gray-500">
            #{selectedTask._id?.slice(-6)}
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-white leading-tight">
          {selectedTask.title}
        </h2>
        <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
          <FiFolder className="text-gray-500" />{" "}
          {selectedTask.projectId?.name || "No project assigned"}
        </p>
      </div>

      <button
        onClick={() => setDrawerOpen(false)}
        className="text-gray-400 hover:text-gray-200 transition"
      >
        <FiX size={24} />
      </button>
    </div>

    {/* CONTENT */}
    <div className="flex-1 p-8 space-y-10 custom-scroll">
      {/* --- OVERVIEW --- */}
      <section>
        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3 flex items-center gap-2">
          <FiClock className="text-indigo-400" /> Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4 shadow-sm backdrop-blur-sm">
            <p className="text-gray-500 text-xs uppercase font-semibold">
              Priority
            </p>
            <p
              className={`mt-1 inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                selectedTask.priority === "High"
                  ? "bg-red-900/40 text-red-400"
                  : selectedTask.priority === "Medium"
                  ? "bg-yellow-900/40 text-yellow-400"
                  : "bg-green-900/40 text-green-400"
              }`}
            >
              {selectedTask.priority}
            </p>
          </div>

          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 text-xs uppercase font-semibold">
              Status
            </p>
            <p className="mt-1 font-medium text-gray-300">
              {selectedTask.status}
            </p>
          </div>

          <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4 shadow-sm">
            <p className="text-gray-500 text-xs uppercase font-semibold">
              Created On
            </p>
            <p className="mt-1 font-medium text-gray-300">
              {new Date(selectedTask.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* --- DESCRIPTION --- */}
      <section>
        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3 flex items-center gap-2">
          📝 Description
        </h3>
        <div className="border border-gray-800 bg-gray-900/70 rounded-lg p-4 text-sm text-gray-300 whitespace-pre-wrap backdrop-blur-sm">
          {selectedTask.description || "No description provided."}
        </div>
      </section>

      {/* --- ASSIGNEES --- */}
      {selectedTask.assignees?.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3 flex items-center gap-2">
            👥 Assignees
          </h3>
          <div className="flex flex-wrap gap-3">
            {selectedTask.assignees.map((a) => (
              <div
                key={a._id}
                className="flex items-center gap-2 border border-gray-800 bg-gray-900/60 rounded-full px-3 py-1.5 shadow-sm backdrop-blur-sm"
              >
                <img
                  src={
                    a.employee?.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      a.employee?.name || "User"
                    )}&background=3b82f6&color=fff`
                  }
                  alt={a.employee?.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm text-gray-300 font-medium">
                  {a.employee?.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- ATTACHMENTS --- */}
      {selectedTask.documents?.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3 flex items-center gap-2">
            📎 Attachments
          </h3>
          <ul className="divide-y divide-gray-800 border border-gray-800 rounded-lg bg-gray-900/70 backdrop-blur-sm">
            {selectedTask.documents.map((doc, i) => (
              <li
                key={i}
                className="px-4 py-2 flex justify-between items-center text-sm text-gray-300 hover:bg-gray-800/70 transition"
              >
                <span className="truncate max-w-[300px]">
                  {doc.split("/").pop()}
                </span>
                <a
                  href={doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 text-xs font-medium hover:text-indigo-300 transition"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* --- SUBTASKS --- */}
      {selectedTask.subtasks?.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3 flex items-center gap-2">
            ✅ Subtasks
          </h3>
          <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/70 backdrop-blur-sm">
            <div className="grid grid-cols-3 bg-gray-800 text-xs font-semibold text-gray-400 border-b border-gray-700">
              <div className="py-2 px-3">Name</div>
              <div className="py-2 px-3 text-center">Assignees</div>
              <div className="py-2 px-3 text-center">Priority</div>
            </div>

            {selectedTask.subtasks.map((sub, i) => (
              <div
                key={i}
                className="grid grid-cols-3 text-sm border-b border-gray-800 last:border-0 hover:bg-gray-800/60 transition"
              >
                <div className="px-3 py-2 text-gray-300">{sub.title}</div>
                <div className="px-3 py-2 flex justify-center">
                  {sub.assignees?.length ? (
                    <div className="flex -space-x-2">
                      {sub.assignees.slice(0, 3).map((a, j) => (
                        <img
                          key={j}
                          src={
                            a.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              a.name || "User"
                            )}&background=3b82f6&color=fff`
                          }
                          alt={a.name}
                          className="w-6 h-6 rounded-full border-2 border-gray-900"
                        />
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </div>
                <div className="px-3 py-2 text-center">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      sub.priority === "High"
                        ? "bg-red-900/40 text-red-400"
                        : sub.priority === "Normal"
                        ? "bg-yellow-900/40 text-yellow-400"
                        : "bg-green-900/40 text-green-400"
                    }`}
                  >
                    {sub.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- TIME TRACKING --- */}
      <section>
        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3 flex items-center gap-2">
          ⏱ Time Tracking
        </h3>
        <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4 shadow-sm text-sm text-gray-300 flex items-center justify-between backdrop-blur-sm">
          <div>
            <p className="text-gray-500 text-xs uppercase font-semibold">
              Total Time Spent
            </p>
            <p className="mt-1 text-gray-100 font-medium">
              {(() => {
                const assignee = selectedTask.assignees.find(
                  (a) => String(a.employee?._id) === String(employeeId)
                );
                const seconds = assignee?.timeSpent || 0;
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                return `${hours}h ${minutes}m`;
              })()}
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <FiClock size={16} className="text-indigo-400" />
            Last updated:{" "}
            {new Date(selectedTask.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </section>
    </div>
  </div>
)}


      {/* Confirm Modal */}
      {showConfirmModal && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] animate-fadeIn">
    <div className="bg-gray-900/90 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center text-gray-200 backdrop-blur-md">
      <h2 className="text-lg font-semibold text-gray-100 mb-2">
        Confirm Status Change
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Are you sure you want to move this task to{" "}
        <strong className="text-indigo-400">
          {pendingStatusChange.newStatus}
        </strong>
        ?
      </p>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setShowConfirmModal(false)}
          className="px-4 py-2 border border-gray-700 rounded-md text-sm text-gray-400 hover:bg-gray-800 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateStatus}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-md transition"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
