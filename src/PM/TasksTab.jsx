// import { useEffect, useState } from "react";
// import Sidebar from "../component/Sidebar";
// import {
//   FiPlus,
//   FiSearch,
//   FiMoreVertical,
//   FiClock,
//   FiUser,
//   FiFolder,
//   FiFilter,
//   FiX,
//   FiFlag,
//   FiPaperclip,
//   FiUpload,
// } from "react-icons/fi";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { FaTrash } from "react-icons/fa";

// export default function Tasks() {
//   const [search, setSearch] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("All");
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [subtasks, setSubtasks] = useState([{ title: "", assignees: [] }]);
//   const [showSubtaskEmpModal, setShowSubtaskEmpModal] = useState(false);
//   const [activeSubtaskIndex, setActiveSubtaskIndex] = useState(null);
//   const [selectedSubtaskEmployees, setSelectedSubtaskEmployees] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [taskToDelete, setTaskToDelete] = useState(null);
//   // Dummy Data
//   const [tasks, setTasks] = useState([]);

//   const [projects, setProjects] = useState([]);
//   const [showProjectModal, setShowProjectModal] = useState(false);
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:5000/Project/getProjects"
//         );
//         if (data.success) setProjects(data.projects);
//       } catch (err) {
//         console.error(" Error loading projects:", err);
//       }
//     };
//     fetchProjects();
//   }, []);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingTaskId, setEditingTaskId] = useState(null);
//   const columns = ["To Do", "In Progress", "Review", "Completed"];
//   const priorities = ["All", "High", "Medium", "Low"];

//   const filteredTasks = tasks.filter(
//     (t) =>
//       t.title.toLowerCase().includes(search.toLowerCase()) &&
//       (priorityFilter === "All" || t.priority === priorityFilter)
//   );

//   const groupedTasks = columns.map((col) => ({
//     status: col,
//     tasks: filteredTasks.filter((t) => t.status === col),
//   }));
//   const [selectedAvatar, setSelectedAvatar] = useState(null);
//   const [selectedDocs, setSelectedDocs] = useState([]);
//   const [projectDocs, setProjectDocs] = useState([]);

//   // Drawer state for new task fields
//   const [taskData, setTaskData] = useState({
//     title: "",
//     project: "",
//     status: "To Do",
//     assignees: [],
//     dueDate: "",
//     priority: "Medium",
//     estimate: "",
//     tags: "",
//     relationships: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTaskData((prev) => ({ ...prev, [name]: value }));
//   };
//   const [employees, setEmployees] = useState([]);
//   const [showEmployeeModal, setShowEmployeeModal] = useState(false);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:5000/employee/getEmployee"
//         );
//         if (data.success) setEmployees(data.employees);
//       } catch (err) {
//         console.error(" Error fetching employees:", err);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const handleSubmitTask = async (e) => {
//     e.preventDefault();

//     if (!taskData.title) return toast.error("Please enter a task title");
//     if (!taskData.project) return toast.error("Please select a project");

//     try {
//       const formData = new FormData();

//       formData.append("title", taskData.title);
//       formData.append("description", taskData.description);
//       formData.append("priority", taskData.priority);
//       formData.append("status", taskData.status);
//       formData.append("projectId", taskData.project);

//       const assigneeIds = taskData.assignees.map((a) => a._id);
//       formData.append("assignees", JSON.stringify(assigneeIds));

//       selectedDocs.forEach((file) => formData.append("documents", file));

//       const formattedSubs = subtasks.map((sub) => ({
//         title: sub.title,
//         priority: sub.priority || "Normal",
//         dueDate: sub.dueDate || null,
//         assignees: sub.assignees.map((a) => a._id),
//       }));
//       formData.append("subtasks", JSON.stringify(formattedSubs));

//       toast.loading(isEditing ? "Updating task..." : "Creating task...", {
//         id: "taskAction",
//       });

//       const url = isEditing
//         ? `http://localhost:5000/Task/update/${editingTaskId}`
//         : "http://localhost:5000/Task/add";

//       const method = isEditing ? "put" : "post";

//       const { data } = await axios[method](url, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (data.success) {
//         toast.success(
//           isEditing
//             ? "Task updated successfully!"
//             : "Task created successfully!",
//           { id: "taskAction" }
//         );

//         setDrawerOpen(false);
//         setIsEditing(false);
//         setEditingTaskId(null);

//         if (isEditing) {
//           setTasks((prev) =>
//             prev.map((t) => (t._id === editingTaskId ? data.task : t))
//           );
//         } else {
//           setTasks((prev) => [...prev, data.task]);
//         }

//         setTaskData({
//           title: "",
//           project: "",
//           status: "To Do",
//           assignees: [],
//           priority: "Medium",
//           description: "",
//         });
//         setSubtasks([{ title: "", assignees: [] }]);
//         setSelectedDocs([]);
//       } else {
//         toast.error(data.message || "Operation failed", { id: "taskAction" });
//       }
//     } catch (error) {
//       console.error(" Error submitting task:", error);
//       toast.error("Server error while saving task", { id: "taskAction" });
//     }
//   };

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:5000/Task/get");
//         if (data.success) {
//           setTasks(data.tasks);
//         }
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };
//     fetchTasks();
//   }, []);
//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
//           <h1 className="text-2xl font-extrabold text-gray-800">Tasks</h1>
//           <button
//             onClick={() => setDrawerOpen(true)}
//             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
//           >
//             <FiPlus size={16} /> New Task
//           </button>
//         </header>

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

//         <main className="flex-1 overflow-x-auto p-8">
//           <div className="flex gap-6 min-w-max">
//             {groupedTasks.map((col) => (
//               <div
//                 key={col.status}
//                 className="flex flex-col bg-gray-50 border border-gray-200 rounded-xl w-72 shadow-sm"
//               >
//                 <div className="flex justify-between items-center bg-white px-4 py-3 border-b border-gray-100 rounded-t-xl">
//                   <h2 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
//                     <span
//                       className={`w-2.5 h-2.5 rounded-full ${
//                         col.status === "To Do"
//                           ? "bg-gray-400"
//                           : col.status === "In Progress"
//                           ? "bg-blue-500"
//                           : col.status === "Review"
//                           ? "bg-amber-500"
//                           : "bg-green-500"
//                       }`}
//                     ></span>
//                     {col.status}
//                   </h2>
//                   <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
//                     {col.tasks.length}
//                   </span>
//                 </div>

//                 <div className="flex-1 p-4 space-y-4 overflow-y-auto">
//                   {col.tasks.length === 0 ? (
//                     <p className="text-sm text-gray-400 italic text-center mt-4">
//                       No tasks
//                     </p>
//                   ) : (
//                     col.tasks.map((task) => (
//                       <div
//                         key={task._id}
//                         onClick={() => {
//                           setIsEditing(true);
//                           setEditingTaskId(task._id);
//                           setDrawerOpen(true);

//                           setTaskData({
//                             title: task.title || "",
//                             description: task.description || "",
//                             priority: task.priority || "Medium",
//                             status: task.status || "To Do",
//                             project:
//                               task.projectId?._id || task.projectId || "",
//                             assignees:
//                               task.assignees?.map((a) => ({
//                                 _id: a.employee?._id || a.employee,
//                                 name: a.employee?.name || "Unnamed",
//                                 avatar: a.employee?.avatar || "",
//                               })) || [],
//                           });

//                           setSubtasks(
//                             task.subtasks?.length
//                               ? task.subtasks.map((sub) => ({
//                                   title: sub.title || "",
//                                   priority: sub.priority || "Normal",
//                                   dueDate: sub.dueDate
//                                     ? new Date(sub.dueDate)
//                                         .toISOString()
//                                         .split("T")[0]
//                                     : "",
//                                   assignees:
//                                     sub.assignees?.map((a) => ({
//                                       _id: a.employee?._id || a.employee,
//                                       name: a.employee?.name || "Unnamed",
//                                       avatar: a.employee?.avatar || "",
//                                     })) || [],
//                                 }))
//                               : [
//                                   {
//                                     title: "",
//                                     assignees: [],
//                                     priority: "Normal",
//                                     dueDate: "",
//                                   },
//                                 ]
//                           );

//                           if (task.documents?.length > 0) {
//                             setSelectedDocs(
//                               task.documents.map((doc) => ({
//                                 name: doc.split("/").pop(),
//                                 url: doc,
//                               }))
//                             );
//                           } else {
//                             setSelectedDocs([]);
//                           }
//                         }}
//                         className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4 space-y-3 cursor-pointer"
//                       >
//                         <div className="absolute top-2 mb-5 right-2">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent opening the drawer
//                               setTaskToDelete(task);
//                               setShowDeleteModal(true);
//                             }}
//                             className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md"
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                         <div className="flex justify-between items-start mt-4">
//                           <div>
//                             <h3 className="font-semibold text-gray-800 text-sm leading-snug">
//                               {task.title}
//                             </h3>
//                             {task.description && (
//                               <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                                 {task.description}
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

//                         {task.assignees?.length > 0 && (
//                           <div className="flex items-center mt-3">
//                             <div className="flex -space-x-2">
//                               {task.assignees.slice(0, 5).map((a) => (
//                                 <img
//                                   key={a._id}
//                                   src={
//                                     a.employee?.avatar ||
//                                     `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                                       a.employee?.name || "User"
//                                     )}&background=3b82f6&color=fff&size=32`
//                                   }
//                                   alt={a.employee?.name}
//                                   title={a.employee?.name}
//                                   className="w-7 h-7 rounded-full border-2 border-white shadow-sm object-cover"
//                                 />
//                               ))}
//                               {task.assignees.length > 5 && (
//                                 <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-semibold text-gray-600">
//                                   +{task.assignees.length - 5}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         )}

//                         <div className="flex justify-between items-center pt-2 border-t mt-2 text-[11px] text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <FiFolder className="text-gray-400" size={12} />
//                             Project: {task.projectId?.slice(-5) || "N/A"}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <FiClock className="text-gray-400" size={12} />
//                             {new Date(task.createdAt).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>

//       {drawerOpen && (
//         <div className="fixed top-0 right-0 h-full w-full sm:w-[1050px] bg-white shadow-2xl z-50 flex border-l transition-all duration-300 ease-in-out">
//           <div className="flex-1 flex flex-col p-8 overflow-y-auto">
//             <div className="flex justify-between items-start border-b pb-4 mb-6">
//               <div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full uppercase">
//                     Task
//                   </span>
//                   <span className="text-xs text-gray-500">#Auto-ID</span>
//                 </div>
//                 <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
//                   Create New Task
//                 </h2>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Fill out the fields below to create a new task
//                 </p>
//               </div>
//               <button
//                 onClick={() => setDrawerOpen(false)}
//                 className="text-gray-400 hover:text-gray-700 transition"
//               >
//                 <FiX size={24} />
//               </button>
//             </div>
//             <div className="mb-6">
//               <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
//                 Task Title
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={taskData.title}
//                 onChange={handleChange}
//                 placeholder="Enter task title"
//                 className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <p className="text-xs text-gray-400 mt-1">
//                 Give your task a clear and concise name
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-sm">
//               <div className="">
//                 <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
//                   Project
//                 </label>

//                 <div className="border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
//                   <div className="flex items-center justify-between">
//                     {/* Dropdown to select project */}
//                     <select
//                       name="project"
//                       value={taskData.project}
//                       onChange={handleChange}
//                       className="flex-1 bg-transparent outline-none text-sm text-gray-700"
//                     >
//                       <option value="">Select Project</option>
//                       {projects.map((proj) => (
//                         <option key={proj._id} value={proj._id}>
//                           {proj.name}
//                         </option>
//                       ))}
//                     </select>

//                     {/* Add Project Button */}
//                     <button
//                       type="button"
//                       onClick={() => setShowProjectModal(true)}
//                       className="ml-3 text-blue-600 font-medium hover:text-blue-800 text-sm flex items-center gap-1"
//                     >
//                       <FiPlus size={14} /> Add
//                     </button>
//                   </div>

//                   {/* Optional: Show selected project summary */}
//                   {taskData.project && (
//                     <div className="mt-3 flex items-center justify-between text-xs text-gray-600 bg-blue-50 border border-blue-100 rounded-md px-3 py-2">
//                       <div className="flex items-center gap-2">
//                         <FiFolder className="text-blue-500" size={14} />
//                         <span className="font-medium">
//                           {projects.find((p) => p._id === taskData.project)
//                             ?.name || "Selected Project"}
//                         </span>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setTaskData((prev) => ({ ...prev, project: "" }))
//                         }
//                         className="text-blue-500 hover:text-red-500 text-xs font-semibold"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 <p className="text-xs text-gray-400 mt-1">
//                   Select or create a project for this task
//                 </p>
//               </div>
//               <div>
//                 <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
//                   Assignees
//                 </label>

//                 <div className="border border-gray-300 rounded-md px-2 py-2 focus-within:ring-2 focus-within:ring-blue-500 bg-white transition">
//                   <div className="flex items-center gap-2">
//                     <select
//                       onChange={(e) => {
//                         const selected = employees.find(
//                           (emp) => emp._id === e.target.value
//                         );
//                         if (
//                           selected &&
//                           !taskData.assignees.some(
//                             (a) => a._id === selected._id
//                           )
//                         ) {
//                           setTaskData((prev) => ({
//                             ...prev,
//                             assignees: [...prev.assignees, selected],
//                           }));
//                         }
//                       }}
//                       className="flex-1 bg-transparent outline-none text-sm text-gray-700 border-none focus:ring-0"
//                     >
//                       <option value="">Select Employee</option>
//                       {employees.map((emp) => (
//                         <option key={emp._id} value={emp._id}>
//                           {emp.name}
//                         </option>
//                       ))}
//                     </select>

//                     <button
//                       type="button"
//                       onClick={() => setShowEmployeeModal(true)}
//                       className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition"
//                     >
//                       <FiPlus size={12} /> Add
//                     </button>
//                   </div>

//                   {taskData.assignees.length > 0 && (
//                     <div className="flex flex-wrap gap-2 mt-3">
//                       {taskData.assignees.map((emp) => (
//                         <span
//                           key={emp._id}
//                           className="flex items-center gap-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs px-2 py-1 rounded-full"
//                         >
//                           {emp.name}
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setTaskData((prev) => ({
//                                 ...prev,
//                                 assignees: prev.assignees.filter(
//                                   (a) => a._id !== emp._id
//                                 ),
//                               }))
//                             }
//                             className="text-blue-500 hover:text-red-500 text-[11px]"
//                           >
//                             ✕
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 <p className="text-xs text-gray-400 mt-1">
//                   You can assign multiple employees
//                 </p>
//               </div>

//               <div>
//                 <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
//                   Status
//                 </label>
//                 <select
//                   name="status"
//                   value={taskData.status}
//                   onChange={handleChange}
//                   className="border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                 >
//                   <option>To Do</option>
//                   <option>In Progress</option>
//                   <option>Review</option>
//                   <option>Completed</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-gray-500 text-xs font-semibold uppercase mb-1">
//                   Priority
//                 </label>
//                 <select
//                   name="priority"
//                   value={taskData.priority}
//                   onChange={handleChange}
//                   className="border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                 >
//                   <option>Low</option>
//                   <option>Medium</option>
//                   <option>High</option>
//                 </select>
//               </div>
//             </div>

//             <div className="mb-8">
//               <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//                 <FiFolder className="text-blue-500" /> Task Description
//               </h3>
//               <textarea
//                 name="description"
//                 value={taskData.description}
//                 onChange={handleChange}
//                 rows={6}
//                 placeholder="Describe your task here..."
//                 className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>

//             <div className="mt-8">
//               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <FiPaperclip className="text-gray-600" /> Attachments
//               </h3>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition bg-gray-50 relative">
//                 <p className="text-sm text-gray-600">
//                   Drag & drop task files or{" "}
//                   <span className="text-blue-600 font-medium cursor-pointer">
//                     click to upload
//                   </span>
//                 </p>
//                 <input
//                   type="file"
//                   multiple
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   onChange={(e) => setSelectedDocs(Array.from(e.target.files))}
//                 />

//                 {selectedDocs.length > 0 && (
//                   <ul className="mt-4 space-y-1 text-sm text-gray-600 text-left">
//                     {selectedDocs.map((file, index) => (
//                       <li
//                         key={index}
//                         className="flex items-center justify-between bg-white border rounded-md px-2 py-1"
//                       >
//                         {file.url ? (
//                           <a
//                             href={file.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="truncate max-w-[220px] text-blue-600 hover:underline"
//                           >
//                             {file.name}
//                           </a>
//                         ) : (
//                           <span className="truncate max-w-[220px]">
//                             {file.name}
//                           </span>
//                         )}

//                         <button
//                           type="button"
//                           onClick={() =>
//                             setSelectedDocs((prev) =>
//                               prev.filter((_, i) => i !== index)
//                             )
//                           }
//                           className="text-xs text-red-500 hover:text-red-700"
//                         >
//                           ✕
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>
//             <div className="mt-10">
//               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <FiFolder className="text-blue-500" /> Subtasks
//               </h3>

//               <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
//                 <div className="grid grid-cols-5 bg-gray-100 text-xs font-semibold text-gray-600 border-b">
//                   <div className="py-2 px-3">Name</div>
//                   <div className="py-2 px-3 text-center">Assignee</div>
//                   <div className="py-2 px-3 text-center">Priority</div>
//                   <div className="py-2 px-3 text-center">Due Date</div>
//                   <div className="py-2 px-3 text-center">⋯</div>
//                 </div>

//                 {subtasks.length > 0 ? (
//                   subtasks.map((sub, index) => (
//                     <div
//                       key={index}
//                       className="relative grid grid-cols-5 items-center text-sm border-b last:border-0 hover:bg-gray-50"
//                     >
//                       <div className="px-3 py-2">
//                         <input
//                           type="text"
//                           placeholder="Subtask name"
//                           value={sub.title}
//                           onChange={(e) => {
//                             const newSubs = [...subtasks];
//                             newSubs[index].title = e.target.value;
//                             setSubtasks(newSubs);
//                           }}
//                           className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400"
//                         />
//                       </div>

//                       <div className="px-3 py-2 flex justify-center relative">
//                         <div className="flex items-center justify-center">
//                           <div className="flex -space-x-2">
//                             {sub.assignees?.map((emp) => (
//                               <img
//                                 key={emp._id}
//                                 src={
//                                   emp.avatar ||
//                                   `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                                     emp.name || "User"
//                                   )}&background=3b82f6&color=fff&size=32`
//                                 }
//                                 alt={emp.name}
//                                 title={`${emp.name} (Click to remove)`}
//                                 onClick={() => {
//                                   const newSubs = [...subtasks];
//                                   newSubs[index].assignees =
//                                     sub.assignees.filter(
//                                       (a) => a._id !== emp._id
//                                     );
//                                   setSubtasks(newSubs);
//                                 }}
//                                 className="w-7 h-7 rounded-full border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-red-400"
//                               />
//                             ))}
//                           </div>

//                           <button
//                             type="button"
//                             onClick={() => {
//                               setActiveSubtaskIndex(index);
//                               setSelectedSubtaskEmployees(sub.assignees || []);
//                               setShowSubtaskEmpModal(true);
//                             }}
//                             className="ml-2 w-7 h-7 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400 hover:border-blue-500 hover:text-blue-500"
//                             title="Add Assignee"
//                           >
//                             +
//                           </button>
//                         </div>

//                         {sub.showDropdown && (
//                           <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-60 max-h-56 overflow-y-auto p-2">
//                             {employees.map((emp) => {
//                               const isSelected = sub.assignees.some(
//                                 (a) => a._id === emp._id
//                               );
//                               return (
//                                 <div
//                                   key={emp._id}
//                                   onClick={() => {
//                                     const newSubs = [...subtasks];
//                                     if (isSelected) {
//                                       newSubs[index].assignees =
//                                         sub.assignees.filter(
//                                           (a) => a._id !== emp._id
//                                         );
//                                     } else {
//                                       newSubs[index].assignees.push(emp);
//                                     }
//                                     setSubtasks(newSubs);
//                                   }}
//                                   className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md transition ${
//                                     isSelected
//                                       ? "bg-blue-50 text-blue-700"
//                                       : "hover:bg-gray-50 text-gray-700"
//                                   }`}
//                                 >
//                                   <img
//                                     src={
//                                       emp.avatar ||
//                                       `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                                         emp.name || "User"
//                                       )}&background=3b82f6&color=fff&size=32`
//                                     }
//                                     alt={emp.name}
//                                     className="w-7 h-7 rounded-full border"
//                                   />
//                                   <span className="text-sm flex-1 truncate">
//                                     {emp.name}
//                                   </span>
//                                   {isSelected && (
//                                     <span className="text-blue-600 font-bold">
//                                       ✔
//                                     </span>
//                                   )}
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         )}
//                       </div>

//                       <div className="px-3 py-2 flex justify-center">
//                         <select
//                           value={sub.priority || "Normal"}
//                           onChange={(e) => {
//                             const newSubs = [...subtasks];
//                             newSubs[index].priority = e.target.value;
//                             setSubtasks(newSubs);
//                           }}
//                           className="border border-gray-300 rounded-md text-xs px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
//                         >
//                           <option>Low</option>
//                           <option>Normal</option>
//                           <option>High</option>
//                         </select>
//                       </div>

//                       <div className="px-3 py-2 text-center">
//                         <input
//                           type="date"
//                           value={sub.dueDate || ""}
//                           onChange={(e) => {
//                             const newSubs = [...subtasks];
//                             newSubs[index].dueDate = e.target.value;
//                             setSubtasks(newSubs);
//                           }}
//                           className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                       </div>

//                       <div className="px-3 py-2 flex justify-center">
//                         <button
//                           type="button"
//                           onClick={() =>
//                             setSubtasks((prev) =>
//                               prev.filter((_, i) => i !== index)
//                             )
//                           }
//                           className="text-gray-400 hover:text-red-500"
//                           title="Remove Subtask"
//                         >
//                           <FiX size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center text-gray-400 text-sm py-4">
//                     No subtasks added yet.
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setSubtasks((prev) => [
//                     ...prev,
//                     {
//                       title: "",
//                       assignees: [],
//                       priority: "Normal",
//                       dueDate: "",
//                     },
//                   ])
//                 }
//                 className="mt-3 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
//               >
//                 <FiPlus size={14} /> Add Task
//               </button>
//             </div>

//             <form onSubmit={handleSubmitTask}>
//               <div className="mt-10 flex justify-end border-t pt-6">
//                 <button
//                   type="button"
//                   onClick={() => setDrawerOpen(false)}
//                   className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-100 mr-3"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-5 py-2.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
//                 >
//                   {isEditing ? "Update Task" : "Create Task"}
//                 </button>
//               </div>
//             </form>
//           </div>

//           <div className="w-[360px] border-l flex flex-col bg-gray-50">
//             <div className="p-4 border-b bg-white flex justify-between items-center">
//               <h3 className="font-semibold text-gray-800">Activity</h3>
//               <div className="flex items-center gap-3 text-gray-400">
//                 <FiSearch
//                   size={16}
//                   className="cursor-pointer hover:text-gray-600"
//                 />
//                 <span className="relative cursor-pointer hover:text-gray-600">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.6}
//                     stroke="currentColor"
//                     className="w-5 h-5"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M14.857 17.243A4 4 0 0112 18a4 4 0 01-2.857-.757M8.25 9V5.25A2.25 2.25 0 0110.5 3h3a2.25 2.25 0 012.25 2.25V9m-8.25 0h8.25m-8.25 0V9m8.25 0V9M5.25 9A2.25 2.25 0 007.5 6.75h9a2.25 2.25 0 012.25 2.25M4.5 21h15a2.25 2.25 0 002.25-2.25V9.75A2.25 2.25 0 0019.5 7.5H4.5A2.25 2.25 0 002.25 9.75v9A2.25 2.25 0 004.5 21z"
//                     />
//                   </svg>
//                   <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
//                     3
//                   </span>
//                 </span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.6}
//                   stroke="currentColor"
//                   className="w-5 h-5 cursor-pointer hover:text-gray-600"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M10.5 6h9.75M10.5 12h9.75m-9.75 6h9.75M3.75 6h.008M3.75 12h.008M3.75 18h.008"
//                   />
//                 </svg>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-700 space-y-4">
//               <button className="text-xs text-gray-500 hover:text-gray-700 mb-2 flex items-center gap-1">
//                 <span>▸</span> Show more
//               </button>

//               <div className="flex justify-between items-start">
//                 <div className="flex items-center gap-2 text-gray-700">
//                   <span className="text-gray-400">•</span>
//                   <div>
//                     <p className="font-medium text-gray-800">
//                       You tracked time
//                     </p>
//                     <p className="text-xs text-gray-500 flex items-center gap-1">
//                       <FiClock size={12} /> 1m on Oct 20
//                     </p>
//                   </div>
//                 </div>
//                 <span className="text-xs text-gray-400">1 hour ago</span>
//               </div>
//             </div>

//             <div className="border-t bg-white p-3 flex flex-col gap-2">
//               <div className="flex items-center gap-2 border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
//                 <input
//                   type="text"
//                   placeholder="Write a comment..."
//                   className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
//                 />
//                 <button className="text-blue-600 hover:text-blue-700">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.8}
//                     stroke="currentColor"
//                     className="w-5 h-5"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M5.25 5.25 18.75 12 5.25 18.75 8.25 12z"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               <div className="flex items-center gap-4 px-1 mt-1 text-gray-400">
//                 <FiPlus
//                   size={16}
//                   className="cursor-pointer hover:text-gray-600"
//                 />
//                 <FiPaperclip
//                   size={16}
//                   className="cursor-pointer hover:text-gray-600"
//                 />
//                 <FiUser
//                   size={16}
//                   className="cursor-pointer hover:text-gray-600"
//                 />
//                 <FiClock
//                   size={16}
//                   className="cursor-pointer hover:text-gray-600"
//                 />
//                 <span className="ml-auto text-xs text-gray-400">
//                   2 comments
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {showProjectModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[80] animate-fadeIn">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-8 relative border border-gray-200">
//             {/* Close Button */}
//             <button
//               onClick={() => setShowProjectModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
//             >
//               <FiX size={22} />
//             </button>

//             {/* Header */}
//             <div className="flex items-center gap-3 mb-8 border-b pb-4">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <FiFolder size={20} className="text-blue-600" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-semibold text-gray-800 leading-none">
//                   Add New Project
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Create a new project and manage its details here.
//                 </p>
//               </div>
//             </div>

//             {/* Form */}
//             <form
//               onSubmit={async (e) => {
//                 e.preventDefault();
//                 try {
//                   const formData = new FormData(e.target);

//                   toast.loading("Creating project...", { id: "addProj" });
//                   const { data } = await axios.post(
//                     "http://localhost:5000/Project/addProject",
//                     formData,
//                     { headers: { "Content-Type": "multipart/form-data" } }
//                   );

//                   if (data.success) {
//                     toast.success("Project added successfully!", {
//                       id: "addProj",
//                     });
//                     setProjects((prev) => [...prev, data.project]);
//                     setShowProjectModal(false);
//                   } else {
//                     toast.error(data.message || "Failed to add project", {
//                       id: "addProj",
//                     });
//                   }
//                 } catch (error) {
//                   console.error(" Error adding project:", error);
//                   toast.error("Server error: Could not add project", {
//                     id: "addProj",
//                   });
//                 }
//               }}
//               className="grid grid-cols-1 sm:grid-cols-2 gap-6"
//             >
//               {/* Project Name */}
//               <div className="sm:col-span-2">
//                 <label className="text-sm font-medium text-gray-700">
//                   Project Name
//                 </label>
//                 <input
//                   name="name"
//                   required
//                   placeholder="Enter project name"
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-400 outline-none transition"
//                 />
//               </div>

//               {/* Client */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Client
//                 </label>
//                 <input
//                   name="client"
//                   placeholder="Client name"
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
//                 />
//               </div>

//               {/* Status */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Status
//                 </label>
//                 <select
//                   name="status"
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                 >
//                   <option>Planning</option>
//                   <option>In Progress</option>
//                   <option>On Hold</option>
//                   <option>Completed</option>
//                 </select>
//               </div>

//               {/* Dates */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   name="endDate"
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               {/* Priority */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Priority
//                 </label>
//                 <select
//                   name="priority"
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                 >
//                   <option>Low</option>
//                   <option>Medium</option>
//                   <option>High</option>
//                 </select>
//               </div>

//               {/* Description */}
//               <div className="sm:col-span-2">
//                 <label className="text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   rows={3}
//                   placeholder="Project overview..."
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               {/* File Upload */}
//               {/* File Upload */}
//               <div className="sm:col-span-2">
//                 <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                   <FiUpload /> Upload Documents
//                 </label>
//                 <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition bg-gray-50 relative">
//                   <p className="text-sm text-gray-600">
//                     Drag & drop project files or{" "}
//                     <span className="text-blue-600 font-medium cursor-pointer">
//                       click to upload
//                     </span>
//                   </p>
//                   <input
//                     type="file"
//                     name="documents"
//                     multiple
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     onChange={(e) => setProjectDocs(Array.from(e.target.files))}
//                   />

//                   {/* Show selected files */}
//                   {projectDocs.length > 0 && (
//                     <ul className="mt-4 space-y-1 text-sm text-gray-600 text-left">
//                       {projectDocs.map((file, index) => (
//                         <li
//                           key={index}
//                           className="flex items-center justify-between bg-white border rounded-md px-2 py-1"
//                         >
//                           <span className="truncate max-w-[220px]">
//                             {file.name}
//                           </span>
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setProjectDocs((prev) =>
//                                 prev.filter((_, i) => i !== index)
//                               )
//                             }
//                             className="text-xs text-red-500 hover:text-red-700"
//                           >
//                             ✕
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="sm:col-span-2 flex justify-end gap-3 pt-6 border-t border-gray-100 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowProjectModal(false)}
//                   className="px-5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition"
//                 >
//                   Save Project
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showEmployeeModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[90] animate-fadeIn">
//           <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-8 relative border border-gray-200">
//             {/* Close Button */}
//             <button
//               onClick={() => setShowEmployeeModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
//             >
//               <FiX size={22} />
//             </button>

//             {/* Header */}
//             <div className="flex items-center gap-3 mb-8 border-b pb-4">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <FiUser size={20} className="text-blue-600" />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-semibold text-gray-800 leading-none">
//                   Add New Employee
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Fill out employee details to add them to your organization.
//                 </p>
//               </div>
//             </div>

//             {/* Form */}
//             <form
//               onSubmit={async (e) => {
//                 e.preventDefault();
//                 const formData = new FormData(e.target);
//                 toast.loading("Adding employee...", { id: "addEmp" });

//                 try {
//                   const { data } = await axios.post(
//                     "http://localhost:5000/Employee/addEmployee",
//                     formData,
//                     { headers: { "Content-Type": "multipart/form-data" } }
//                   );

//                   if (data.success) {
//                     toast.success("Employee added successfully!", {
//                       id: "addEmp",
//                     });
//                     setEmployees((prev) => [...prev, data.employee]);
//                     setShowEmployeeModal(false);
//                   } else {
//                     toast.error(data.message || "Failed to add employee", {
//                       id: "addEmp",
//                     });
//                   }
//                 } catch (error) {
//                   console.error(" Error adding employee:", error);
//                   toast.error("Server error: Could not add employee", {
//                     id: "addEmp",
//                   });
//                 }
//               }}
//               className="grid grid-cols-1 sm:grid-cols-2 gap-6"
//             >
//               {/* Full Name */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <input
//                   name="name"
//                   required
//                   placeholder="Enter full name"
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   placeholder="employee@company.com"
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Phone
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   required
//                   placeholder="+91 9876543210"
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
//                 />
//               </div>

//               {/* Department */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Department
//                 </label>
//                 <input
//                   name="department"
//                   required
//                   placeholder="e.g., Marketing, HR"
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
//                 />
//               </div>

//               {/* Role */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Role / Position
//                 </label>
//                 <input
//                   name="role"
//                   required
//                   placeholder="e.g., Frontend Developer"
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
//                 />
//               </div>

//               {/* Salary */}
//               <div>
//                 <label className="text-sm font-medium text-gray-700">
//                   Salary (₹)
//                 </label>
//                 <input
//                   type="number"
//                   name="salary"
//                   required
//                   placeholder="e.g., 60000"
//                   className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
//                 />
//               </div>

//               {/* Profile Picture */}
//               <div className="sm:col-span-2">
//                 <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                   <FiUpload /> Profile Picture
//                 </label>
//                 <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition bg-gray-50 relative">
//                   {selectedAvatar ? (
//                     <div className="flex flex-col items-center space-y-2">
//                       <img
//                         src={URL.createObjectURL(selectedAvatar)}
//                         alt="Preview"
//                         className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm"
//                       />
//                       <p className="text-xs text-gray-600">
//                         {selectedAvatar.name}
//                       </p>
//                       <button
//                         type="button"
//                         onClick={() => setSelectedAvatar(null)}
//                         className="text-xs text-red-500 hover:text-red-600 mt-1"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       <p className="text-sm text-gray-600">
//                         Drag & drop image or{" "}
//                         <span className="text-blue-600 font-medium cursor-pointer">
//                           click to upload
//                         </span>
//                       </p>
//                       <input
//                         type="file"
//                         name="avatar"
//                         accept="image/*"
//                         className="absolute inset-0 opacity-0 cursor-pointer"
//                         onChange={(e) => setSelectedAvatar(e.target.files[0])}
//                       />
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Documents */}
//               <div className="sm:col-span-2">
//                 <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                   <FiUpload /> Upload Documents
//                 </label>
//                 <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition bg-gray-50 relative">
//                   <p className="text-sm text-gray-600">
//                     Drag & drop files or{" "}
//                     <span className="text-blue-600 font-medium cursor-pointer">
//                       click to upload
//                     </span>
//                   </p>
//                   <input
//                     type="file"
//                     name="documents"
//                     multiple
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     onChange={(e) =>
//                       setSelectedDocs(Array.from(e.target.files))
//                     }
//                   />

//                   {/* Show selected files */}
//                   {selectedDocs.length > 0 && (
//                     <ul className="mt-4 space-y-1 text-sm text-gray-600 text-left">
//                       {selectedDocs.map((file, index) => (
//                         <li
//                           key={index}
//                           className="flex items-center justify-between bg-white border rounded-md px-2 py-1"
//                         >
//                           <span className="truncate max-w-[220px]">
//                             {file.name}
//                           </span>
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setSelectedDocs((prev) =>
//                                 prev.filter((_, i) => i !== index)
//                               )
//                             }
//                             className="text-xs text-red-500 hover:text-red-700"
//                           >
//                             ✕
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="sm:col-span-2 flex justify-end gap-3 pt-6 border-t border-gray-100 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowEmployeeModal(false)}
//                   className="px-5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition"
//                 >
//                   Save Employee
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showSubtaskEmpModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[100] animate-fadeIn">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative border border-gray-200">
//             {/*  Close Button */}
//             <button
//               onClick={() => setShowSubtaskEmpModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
//             >
//               <FiX size={22} />
//             </button>

//             {/* Header */}
//             <div className="mb-6 border-b pb-4">
//               <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
//                 <FiUser className="text-blue-600" /> Assign Employees
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 Select one or more employees to assign to this subtask.
//               </p>
//             </div>

//             {/* Employee Grid */}
//             <div className="max-h-[450px] overflow-y-auto pr-1">
//               {employees.length === 0 ? (
//                 <div className="text-center text-gray-500 py-10">
//                   No employees available.
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {employees.map((emp) => {
//                     const isSelected = selectedSubtaskEmployees.some(
//                       (a) => a._id === emp._id
//                     );
//                     return (
//                       <div
//                         key={emp._id}
//                         onClick={() => {
//                           if (isSelected) {
//                             setSelectedSubtaskEmployees((prev) =>
//                               prev.filter((a) => a._id !== emp._id)
//                             );
//                           } else {
//                             setSelectedSubtaskEmployees((prev) => [
//                               ...prev,
//                               emp,
//                             ]);
//                           }
//                         }}
//                         className={`flex items-center gap-4 border rounded-lg p-3 cursor-pointer transition ${
//                           isSelected
//                             ? "border-blue-500 bg-blue-50"
//                             : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
//                         }`}
//                       >
//                         {/* Avatar */}
//                         <img
//                           src={
//                             emp.avatar ||
//                             `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                               emp.name || "User"
//                             )}&background=3b82f6&color=fff&size=64`
//                           }
//                           alt={emp.name}
//                           className="w-12 h-12 rounded-full border border-gray-200 object-cover"
//                         />

//                         {/* Info */}
//                         <div className="flex-1">
//                           <p className="font-medium text-gray-800">
//                             {emp.name}
//                           </p>
//                           <p className="text-xs text-gray-500">{emp.role}</p>
//                         </div>

//                         {/* Checkbox Indicator */}
//                         <div
//                           className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                             isSelected
//                               ? "bg-blue-600 border-blue-600"
//                               : "border-gray-300"
//                           }`}
//                         >
//                           {isSelected && (
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               strokeWidth={3}
//                               stroke="white"
//                               className="w-3.5 h-3.5"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M5 13l4 4L19 7"
//                               />
//                             </svg>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="flex justify-end gap-3 pt-6 border-t mt-6">
//               <button
//                 type="button"
//                 onClick={() => setShowSubtaskEmpModal(false)}
//                 className="px-5 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   const updatedSubtasks = [...subtasks];
//                   updatedSubtasks[activeSubtaskIndex].assignees =
//                     selectedSubtaskEmployees;
//                   setSubtasks(updatedSubtasks);
//                   setShowSubtaskEmpModal(false);
//                 }}
//                 className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition"
//               >
//                 Save Selection
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[120] animate-fadeIn">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center relative border border-gray-200">
//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
//             >
//               <FiX size={20} />
//             </button>

//             <div className="flex flex-col items-center">
//               <div className="p-3 bg-red-100 rounded-full mb-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="red"
//                   className="w-8 h-8"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </div>

//               <h2 className="text-lg font-semibold text-gray-800 mb-1">
//                 Delete Task?
//               </h2>
//               <p className="text-sm text-gray-500 mb-6">
//                 Are you sure you want to delete{" "}
//                 <strong>{taskToDelete?.title}</strong>? This action cannot be
//                 undone.
//               </p>

//               <div className="flex justify-center gap-3">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={async () => {
//                     try {
//                       toast.loading("Deleting task...", { id: "deleteTask" });
//                       const { data } = await axios.delete(
//                         `http://localhost:5000/Task/deleteTask/${taskToDelete._id}`
//                       );

//                       if (data.message === "Task deleted successfully") {
//                         setTasks((prev) =>
//                           prev.filter((t) => t._id !== taskToDelete._id)
//                         );
//                         toast.success("Task deleted successfully!", {
//                           id: "deleteTask",
//                         });
//                         setShowDeleteModal(false);
//                       } else {
//                         toast.error("Failed to delete task", {
//                           id: "deleteTask",
//                         });
//                       }
//                     } catch (error) {
//                       console.error("❌ Error deleting task:", error);
//                       toast.error("Server error: could not delete task", {
//                         id: "deleteTask",
//                       });
//                     }
//                   }}
//                   className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md transition"
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
  FiPlus,
  FiSearch,
  FiMoreVertical,
  FiClock,
  FiUser,
  FiFolder,
  FiFilter,
  FiX,
  FiFlag,
  FiPaperclip,
  FiUpload,
} from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function Tasks() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [subtasks, setSubtasks] = useState([{ title: "", assignees: [] }]);
  const [showSubtaskEmpModal, setShowSubtaskEmpModal] = useState(false);
  const [activeSubtaskIndex, setActiveSubtaskIndex] = useState(null);
  const [selectedSubtaskEmployees, setSelectedSubtaskEmployees] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  // Dummy Data
  const [tasks, setTasks] = useState([]);

  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/Project/getProjects"
        );
        if (data.success) setProjects(data.projects);
      } catch (err) {
        console.error(" Error loading projects:", err);
      }
    };
    fetchProjects();
  }, []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
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
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [projectDocs, setProjectDocs] = useState([]);

  // Drawer state for new task fields
  const [taskData, setTaskData] = useState({
    title: "",
    project: "",
    status: "To Do",
    assignees: [],
    dueDate: "",
    priority: "Medium",
    estimate: "",
    tags: "",
    relationships: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };
  const [employees, setEmployees] = useState([]);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/employee/getEmployee"
        );
        if (data.success) setEmployees(data.employees);
      } catch (err) {
        console.error(" Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmitTask = async (e) => {
    e.preventDefault();

    if (!taskData.title) return toast.error("Please enter a task title");
    if (!taskData.project) return toast.error("Please select a project");

    try {
      const formData = new FormData();

      formData.append("title", taskData.title);
      formData.append("description", taskData.description);
      formData.append("priority", taskData.priority);
      formData.append("status", taskData.status);
      formData.append("projectId", taskData.project);

      const assigneeIds = taskData.assignees.map((a) => a._id);
      formData.append("assignees", JSON.stringify(assigneeIds));

      selectedDocs.forEach((file) => formData.append("documents", file));

      const formattedSubs = subtasks.map((sub) => ({
        title: sub.title,
        priority: sub.priority || "Normal",
        dueDate: sub.dueDate || null,
        assignees: sub.assignees.map((a) => a._id),
      }));
      formData.append("subtasks", JSON.stringify(formattedSubs));

      toast.loading(isEditing ? "Updating task..." : "Creating task...", {
        id: "taskAction",
      });

      const url = isEditing
        ? `http://localhost:5000/Task/update/${editingTaskId}`
        : "http://localhost:5000/Task/add";

      const method = isEditing ? "put" : "post";

      const { data } = await axios[method](url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(
          isEditing
            ? "Task updated successfully!"
            : "Task created successfully!",
          { id: "taskAction" }
        );

        setDrawerOpen(false);
        setIsEditing(false);
        setEditingTaskId(null);

        if (isEditing) {
          setTasks((prev) =>
            prev.map((t) => (t._id === editingTaskId ? data.task : t))
          );
        } else {
          setTasks((prev) => [...prev, data.task]);
        }

        setTaskData({
          title: "",
          project: "",
          status: "To Do",
          assignees: [],
          priority: "Medium",
          description: "",
        });
        setSubtasks([{ title: "", assignees: [] }]);
        setSelectedDocs([]);
      } else {
        toast.error(data.message || "Operation failed", { id: "taskAction" });
      }
    } catch (error) {
      console.error(" Error submitting task:", error);
      toast.error("Server error while saving task", { id: "taskAction" });
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/Task/get");
        if (data.success) {
          setTasks(data.tasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);
  return (
   <div className="flex h-screen bg-gray-900 text-gray-300 overflow-hidden">
  <Sidebar />

  <div className="flex-1 flex flex-col">

       <header className="flex justify-between items-center bg-gray-900/80 backdrop-blur-md px-8 py-4 border-b border-gray-800 shadow-md">
  <h1 className="text-2xl font-extrabold text-white">Tasks</h1>
  <button
    onClick={() => setDrawerOpen(true)}
    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-all shadow-md hover:shadow-lg"
  >
    <FiPlus size={16} /> New Task
  </button>
</header>


       <div className="bg-gray-900/60 border-b border-gray-800 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
  <div className="flex items-center bg-gray-800 rounded-md px-3 py-2 w-full max-w-sm border border-gray-700">
    <FiSearch className="text-gray-400" size={18} />
    <input
      type="text"
      placeholder="Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="bg-transparent outline-none ml-2 text-sm text-gray-200 w-full placeholder-gray-500"
    />
  </div>

  <div className="flex items-center gap-3">
    <FiFilter className="text-gray-400" size={18} />
    <select
      value={priorityFilter}
      onChange={(e) => setPriorityFilter(e.target.value)}
      className="border border-gray-700 bg-gray-800 text-gray-200 rounded-md text-sm px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 outline-none"
    >
      {priorities.map((p) => (
        <option key={p}>{p}</option>
      ))}
    </select>
  </div>
</div>


       <main className="flex-1 overflow-x-auto p-8 bg-gray-900 text-gray-300">
  <div className="flex gap-6 min-w-max">
    {groupedTasks.map((col) => (
      <div
        key={col.status}
        className="flex flex-col bg-gray-900/80 border border-gray-800 rounded-xl w-72 shadow-lg backdrop-blur-md"
      >
        {/* Column Header */}
        <div className="flex justify-between items-center bg-gray-900/90 px-4 py-3 border-b border-gray-800 rounded-t-xl">
          <h2 className="font-semibold text-gray-200 text-sm flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                col.status === "To Do"
                  ? "bg-gray-500"
                  : col.status === "In Progress"
                  ? "bg-indigo-500"
                  : col.status === "Review"
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
            ></span>
            {col.status}
          </h2>
          <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
            {col.tasks.length}
          </span>
        </div>

        {/* Column Body */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scroll">
          {col.tasks.length === 0 ? (
            <p className="text-sm text-gray-500 italic text-center mt-4">
              No tasks
            </p>
          ) : (
            col.tasks.map((task) => (
              <div
                key={task._id}
                onClick={() => {
                  setIsEditing(true);
                  setEditingTaskId(task._id);
                  setDrawerOpen(true);

                  setTaskData({
                    title: task.title || "",
                    description: task.description || "",
                    priority: task.priority || "Medium",
                    status: task.status || "To Do",
                    project: task.projectId?._id || task.projectId || "",
                    assignees:
                      task.assignees?.map((a) => ({
                        _id: a.employee?._id || a.employee,
                        name: a.employee?.name || "Unnamed",
                        avatar: a.employee?.avatar || "",
                      })) || [],
                  });

                  setSubtasks(
                    task.subtasks?.length
                      ? task.subtasks.map((sub) => ({
                          title: sub.title || "",
                          priority: sub.priority || "Normal",
                          dueDate: sub.dueDate
                            ? new Date(sub.dueDate)
                                .toISOString()
                                .split("T")[0]
                            : "",
                          assignees:
                            sub.assignees?.map((a) => ({
                              _id: a.employee?._id || a.employee,
                              name: a.employee?.name || "Unnamed",
                              avatar: a.employee?.avatar || "",
                            })) || [],
                        }))
                      : [
                          {
                            title: "",
                            assignees: [],
                            priority: "Normal",
                            dueDate: "",
                          },
                        ]
                  );

                  if (task.documents?.length > 0) {
                    setSelectedDocs(
                      task.documents.map((doc) => ({
                        name: doc.split("/").pop(),
                        url: doc,
                      }))
                    );
                  } else {
                    setSelectedDocs([]);
                  }
                }}
                className="relative bg-gray-800/80 border border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-indigo-500 transition-all p-4 space-y-3 cursor-pointer backdrop-blur-sm"
              >
                {/* Delete Button */}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTaskToDelete(task);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-400 hover:text-red-500 text-xs font-semibold flex items-center gap-1 bg-red-900/30 px-2 py-1 rounded-md"
                  >
                    <FaTrash />
                  </button>
                </div>

                {/* Task Header */}
                <div className="flex justify-between items-start mt-4">
                  <div>
                    <h3 className="font-semibold text-gray-100 text-sm leading-snug">
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                  </div>

                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${
                      task.priority === "High"
                        ? "bg-red-900/40 text-red-400 border-red-700"
                        : task.priority === "Medium"
                        ? "bg-amber-900/40 text-amber-400 border-amber-700"
                        : "bg-emerald-900/40 text-emerald-400 border-emerald-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                {/* Assignees */}
                {task.assignees?.length > 0 && (
                  <div className="flex items-center mt-3">
                    <div className="flex -space-x-2">
                      {task.assignees.slice(0, 5).map((a) => (
                        <img
                          key={a._id}
                          src={
                            a.employee?.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              a.employee?.name || "User"
                            )}&background=3b82f6&color=fff&size=32`
                          }
                          alt={a.employee?.name}
                          title={a.employee?.name}
                          className="w-7 h-7 rounded-full border-2 border-gray-900 shadow-sm object-cover"
                        />
                      ))}
                      {task.assignees.length > 5 && (
                        <div className="w-7 h-7 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-[10px] font-semibold text-gray-300">
                          +{task.assignees.length - 5}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Footer Info */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-700 mt-2 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <FiFolder className="text-gray-500" size={12} />
                    {task.projectId?.slice(-5) || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="text-gray-500" size={12} />
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
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

      {drawerOpen && (
  <div className="fixed top-0 right-0 h-full w-full sm:w-[1050px] bg-gray-900/95 backdrop-blur-md shadow-2xl z-50 flex border-l border-gray-800 transition-all duration-300 ease-in-out">
    {/* LEFT CONTENT AREA */}
    <div className="flex-1 flex flex-col p-8 overflow-y-auto custom-scroll">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-800 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold bg-indigo-900/50 text-indigo-400 px-2 py-0.5 rounded-full uppercase">
              Task
            </span>
            <span className="text-xs text-gray-500">#Auto-ID</span>
          </div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            {isEditing ? "Edit Task" : "Create New Task"}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Fill out the fields below to create a new task
          </p>
        </div>
        <button
          onClick={() => setDrawerOpen(false)}
          className="text-gray-400 hover:text-gray-200 transition"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Task Title */}
      <div className="mb-6">
        <label className="block text-gray-400 text-xs font-semibold uppercase mb-1">
          Task Title
        </label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="w-full border border-gray-700 bg-gray-800/80 text-gray-200 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <p className="text-xs text-gray-500 mt-1">
          Give your task a clear and concise name
        </p>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-sm">
        {/* Project */}
        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase mb-1">
            Project
          </label>
          <div className="border border-gray-700 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 bg-gray-800/70">
            <div className="flex items-center justify-between">
              <select
                name="project"
                value={taskData.project}
                onChange={handleChange}
                className="flex-1 bg-transparent outline-none text-sm text-gray-200"
              >
                <option value="">Select Project</option>
                {projects.map((proj) => (
                  <option key={proj._id} value={proj._id}>
                    {proj.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowProjectModal(true)}
                className="ml-3 text-indigo-400 font-medium hover:text-indigo-300 text-sm flex items-center gap-1"
              >
                <FiPlus size={14} /> Add
              </button>
            </div>

            {taskData.project && (
              <div className="mt-3 flex items-center justify-between text-xs text-gray-400 bg-gray-800/60 border border-gray-700 rounded-md px-3 py-2">
                <div className="flex items-center gap-2">
                  <FiFolder className="text-indigo-400" size={14} />
                  <span className="font-medium text-gray-200">
                    {projects.find((p) => p._id === taskData.project)?.name ||
                      "Selected Project"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setTaskData((prev) => ({ ...prev, project: "" }))
                  }
                  className="text-indigo-400 hover:text-red-400 text-xs font-semibold"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Assignees */}
        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase mb-1">
            Assignees
          </label>
          <div className="border border-gray-700 rounded-md px-2 py-2 bg-gray-800/70 transition">
            <div className="flex items-center gap-2">
              <select
                onChange={(e) => {
                  const selected = employees.find(
                    (emp) => emp._id === e.target.value
                  );
                  if (
                    selected &&
                    !taskData.assignees.some((a) => a._id === selected._id)
                  ) {
                    setTaskData((prev) => ({
                      ...prev,
                      assignees: [...prev.assignees, selected],
                    }));
                  }
                }}
                className="flex-1 bg-transparent outline-none text-sm text-gray-200 border-none focus:ring-0"
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowEmployeeModal(true)}
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/30 rounded transition"
              >
                <FiPlus size={12} /> Add
              </button>
            </div>

            {taskData.assignees.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {taskData.assignees.map((emp) => (
                  <span
                    key={emp._id}
                    className="flex items-center gap-1 bg-indigo-900/40 border border-indigo-700 text-indigo-300 text-xs px-2 py-1 rounded-full"
                  >
                    {emp.name}
                    <button
                      type="button"
                      onClick={() =>
                        setTaskData((prev) => ({
                          ...prev,
                          assignees: prev.assignees.filter(
                            (a) => a._id !== emp._id
                          ),
                        }))
                      }
                      className="text-indigo-400 hover:text-red-400 text-[11px]"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase mb-1">
            Status
          </label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="border border-gray-700 rounded-md w-full px-3 py-2 text-sm bg-gray-800/70 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Review</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-gray-400 text-xs font-semibold uppercase mb-1">
            Priority
          </label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="border border-gray-700 rounded-md w-full px-3 py-2 text-sm bg-gray-800/70 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
          <FiFolder className="text-indigo-400" /> Task Description
        </h3>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          rows={6}
          placeholder="Describe your task here..."
          className="w-full border border-gray-700 rounded-md bg-gray-800/70 text-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Attachments */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-200 mb-3 flex items-center gap-2">
          <FiPaperclip className="text-indigo-400" /> Attachments
        </h3>
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-indigo-500 transition bg-gray-800/40 relative">
          <p className="text-sm text-gray-400">
            Drag & drop task files or{" "}
            <span className="text-indigo-400 font-medium cursor-pointer">
              click to upload
            </span>
          </p>
          <input
            type="file"
            multiple
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => setSelectedDocs(Array.from(e.target.files))}
          />

          {selectedDocs.length > 0 && (
            <ul className="mt-4 space-y-1 text-sm text-gray-400 text-left">
              {selectedDocs.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-md px-2 py-1"
                >
                  {file.url ? (
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate max-w-[220px] text-indigo-400 hover:underline"
                    >
                      {file.name}
                    </a>
                  ) : (
                    <span className="truncate max-w-[220px]">{file.name}</span>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedDocs((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="text-xs text-red-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-10 flex justify-end border-t border-gray-800 pt-6">
        <button
          type="button"
          onClick={() => setDrawerOpen(false)}
          className="px-5 py-2.5 border border-gray-700 text-gray-400 text-sm rounded-md hover:bg-gray-800 mr-3 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 shadow-md transition"
        >
          {isEditing ? "Update Task" : "Create Task"}
        </button>
      </div>
    </div>

    {/* RIGHT SIDEBAR (Activity Feed) */}
    <div className="w-[360px] border-l border-gray-800 flex flex-col bg-gray-900/80">
      <div className="p-4 border-b border-gray-800 bg-gray-900/90 flex justify-between items-center">
        <h3 className="font-semibold text-gray-200">Activity</h3>
        <div className="flex items-center gap-3 text-gray-400">
          <FiSearch
            size={16}
            className="cursor-pointer hover:text-gray-200"
          />
          <span className="relative cursor-pointer hover:text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.6}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.243A4 4 0 0112 18a4 4 0 01-2.857-.757M8.25 9V5.25A2.25 2.25 0 0110.5 3h3a2.25 2.25 0 012.25 2.25V9M4.5 21h15a2.25 2.25 0 002.25-2.25V9.75A2.25 2.25 0 0019.5 7.5H4.5A2.25 2.25 0 002.25 9.75v9A2.25 2.25 0 004.5 21z"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 text-sm text-gray-400 space-y-4 custom-scroll">
        <button className="text-xs text-gray-500 hover:text-gray-300 mb-2 flex items-center gap-1">
          <span>▸</span> Show more
        </button>

        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2 text-gray-300">
            <span className="text-gray-600">•</span>
            <div>
              <p className="font-medium text-gray-200">You tracked time</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FiClock size={12} /> 1m on Oct 20
              </p>
            </div>
          </div>
          <span className="text-xs text-gray-500">1 hour ago</span>
        </div>
      </div>

      <div className="border-t border-gray-800 bg-gray-900/90 p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2 border border-gray-700 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 text-sm outline-none bg-transparent text-gray-200 placeholder-gray-500"
          />
          <button className="text-indigo-400 hover:text-indigo-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.25 18.75 12 5.25 18.75 8.25 12z"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4 px-1 mt-1 text-gray-500">
          <FiPlus size={16} className="cursor-pointer hover:text-gray-300" />
          <FiPaperclip size={16} className="cursor-pointer hover:text-gray-300" />
          <FiUser size={16} className="cursor-pointer hover:text-gray-300" />
          <FiClock size={16} className="cursor-pointer hover:text-gray-300" />
          <span className="ml-auto text-xs text-gray-500">
            2 comments
          </span>
        </div>
      </div>
    </div>
  </div>
)}

      {showProjectModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-[80] animate-fadeIn">
    <div className="bg-gray-900/95 border border-gray-800 rounded-xl shadow-2xl w-full max-w-3xl p-8 relative backdrop-blur-md text-gray-200">
      {/* Close Button */}
      <button
        onClick={() => setShowProjectModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
      >
        <FiX size={22} />
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-4">
        <div className="p-2 bg-indigo-900/50 rounded-lg border border-indigo-700/40">
          <FiFolder size={20} className="text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white leading-none">
            Add New Project
          </h2>
          <p className="text-sm text-gray-400">
            Create a new project and manage its details here.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const formData = new FormData(e.target);
            toast.loading("Creating project...", { id: "addProj" });
            const { data } = await axios.post(
              "http://localhost:5000/Project/addProject",
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (data.success) {
              toast.success("Project added successfully!", { id: "addProj" });
              setProjects((prev) => [...prev, data.project]);
              setShowProjectModal(false);
            } else {
              toast.error(data.message || "Failed to add project", {
                id: "addProj",
              });
            }
          } catch (error) {
            console.error("❌ Error adding project:", error);
            toast.error("Server error: Could not add project", {
              id: "addProj",
            });
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Project Name */}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-400">
            Project Name
          </label>
          <input
            name="name"
            required
            placeholder="Enter project name"
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* Client */}
        <div>
          <label className="text-sm font-medium text-gray-400">Client</label>
          <input
            name="client"
            placeholder="Client name"
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-medium text-gray-400">Status</label>
          <select
            name="status"
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option>Planning</option>
            <option>In Progress</option>
            <option>On Hold</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Dates */}
        <div>
          <label className="text-sm font-medium text-gray-400">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-400">End Date</label>
          <input
            type="date"
            name="endDate"
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="text-sm font-medium text-gray-400">Priority</label>
          <select
            name="priority"
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-400">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            placeholder="Project overview..."
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* File Upload */}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <FiUpload className="text-indigo-400" /> Upload Documents
          </label>
          <div className="mt-2 border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-indigo-500 transition bg-gray-800/60 relative">
            <p className="text-sm text-gray-400">
              Drag & drop project files or{" "}
              <span className="text-indigo-400 font-medium cursor-pointer">
                click to upload
              </span>
            </p>
            <input
              type="file"
              name="documents"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => setProjectDocs(Array.from(e.target.files))}
            />

            {projectDocs.length > 0 && (
              <ul className="mt-4 space-y-1 text-sm text-gray-400 text-left">
                {projectDocs.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-md px-2 py-1"
                  >
                    <span className="truncate max-w-[220px]">{file.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setProjectDocs((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="text-xs text-red-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sm:col-span-2 flex justify-end gap-3 pt-6 border-t border-gray-800 mt-4">
          <button
            type="button"
            onClick={() => setShowProjectModal(false)}
            className="px-5 py-2.5 border border-gray-700 rounded-md text-sm text-gray-400 hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-md transition"
          >
            Save Project
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {showEmployeeModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-[90] animate-fadeIn">
    <div className="bg-gray-900/95 border border-gray-800 rounded-xl shadow-2xl w-full max-w-3xl p-8 relative text-gray-200 backdrop-blur-md">
      {/* Close Button */}
      <button
        onClick={() => setShowEmployeeModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
      >
        <FiX size={22} />
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-4">
        <div className="p-2 bg-indigo-900/50 rounded-lg border border-indigo-700/40">
          <FiUser size={20} className="text-indigo-400" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white leading-none">
            Add New Employee
          </h2>
          <p className="text-sm text-gray-400">
            Fill out employee details to add them to your organization.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          toast.loading("Adding employee...", { id: "addEmp" });

          try {
            const { data } = await axios.post(
              "http://localhost:5000/Employee/addEmployee",
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (data.success) {
              toast.success("Employee added successfully!", { id: "addEmp" });
              setEmployees((prev) => [...prev, data.employee]);
              setShowEmployeeModal(false);
            } else {
              toast.error(data.message || "Failed to add employee", {
                id: "addEmp",
              });
            }
          } catch (error) {
            console.error("❌ Error adding employee:", error);
            toast.error("Server error: Could not add employee", {
              id: "addEmp",
            });
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {/* Full Name */}
        <div>
          <label className="text-sm font-medium text-gray-400">
            Full Name
          </label>
          <input
            name="name"
            required
            placeholder="Enter full name"
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-400">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="employee@company.com"
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-gray-400">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="+91 9876543210"
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* Department */}
        <div>
          <label className="text-sm font-medium text-gray-400">
            Department
          </label>
          <input
            name="department"
            required
            placeholder="e.g., Marketing, HR"
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* Role */}
        <div>
          <label className="text-sm font-medium text-gray-400">
            Role / Position
          </label>
          <input
            name="role"
            required
            placeholder="e.g., Frontend Developer"
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="text-sm font-medium text-gray-400">
            Salary (₹)
          </label>
          <input
            type="number"
            name="salary"
            required
            placeholder="e.g., 60000"
            className="mt-1 w-full border border-gray-700 bg-gray-800 text-gray-200 rounded-md px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>

        {/* Profile Picture */}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <FiUpload className="text-indigo-400" /> Profile Picture
          </label>
          <div className="mt-2 border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-indigo-500 transition bg-gray-800/60 relative">
            {selectedAvatar ? (
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={URL.createObjectURL(selectedAvatar)}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover border border-gray-700 shadow-sm"
                />
                <p className="text-xs text-gray-400">{selectedAvatar.name}</p>
                <button
                  type="button"
                  onClick={() => setSelectedAvatar(null)}
                  className="text-xs text-red-400 hover:text-red-500 mt-1"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-400">
                  Drag & drop image or{" "}
                  <span className="text-indigo-400 font-medium cursor-pointer">
                    click to upload
                  </span>
                </p>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setSelectedAvatar(e.target.files[0])}
                />
              </>
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <FiUpload className="text-indigo-400" /> Upload Documents
          </label>
          <div className="mt-2 border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-indigo-500 transition bg-gray-800/60 relative">
            <p className="text-sm text-gray-400">
              Drag & drop files or{" "}
              <span className="text-indigo-400 font-medium cursor-pointer">
                click to upload
              </span>
            </p>
            <input
              type="file"
              name="documents"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => setSelectedDocs(Array.from(e.target.files))}
            />

            {selectedDocs.length > 0 && (
              <ul className="mt-4 space-y-1 text-sm text-gray-400 text-left">
                {selectedDocs.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-md px-2 py-1"
                  >
                    <span className="truncate max-w-[220px]">{file.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedDocs((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="text-xs text-red-400 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sm:col-span-2 flex justify-end gap-3 pt-6 border-t border-gray-800 mt-4">
          <button
            type="button"
            onClick={() => setShowEmployeeModal(false)}
            className="px-5 py-2.5 border border-gray-700 rounded-md text-sm text-gray-400 hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-md transition"
          >
            Save Employee
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    {showSubtaskEmpModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-[100] animate-fadeIn">
    <div className="bg-gray-900/95 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative text-gray-200 backdrop-blur-md">
      {/* Close Button */}
      <button
        onClick={() => setShowSubtaskEmpModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
      >
        <FiX size={22} />
      </button>

      {/* Header */}
      <div className="mb-6 border-b border-gray-800 pb-4">
        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
          <FiUser className="text-indigo-400" /> Assign Employees
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Select one or more employees to assign to this subtask.
        </p>
      </div>

      {/* Employee Grid */}
      <div className="max-h-[450px] overflow-y-auto pr-1 custom-scroll">
        {employees.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No employees available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {employees.map((emp) => {
              const isSelected = selectedSubtaskEmployees.some(
                (a) => a._id === emp._id
              );
              return (
                <div
                  key={emp._id}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedSubtaskEmployees((prev) =>
                        prev.filter((a) => a._id !== emp._id)
                      );
                    } else {
                      setSelectedSubtaskEmployees((prev) => [...prev, emp]);
                    }
                  }}
                  className={`flex items-center gap-4 border rounded-lg p-3 cursor-pointer transition ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-900/40"
                      : "border-gray-700 hover:border-indigo-500 hover:bg-gray-800/60"
                  }`}
                >
                  {/* Avatar */}
                  <img
                    src={
                      emp.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        emp.name || "User"
                      )}&background=3730a3&color=fff&size=64`
                    }
                    alt={emp.name}
                    className="w-12 h-12 rounded-full border border-gray-700 object-cover shadow-sm"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <p className="font-medium text-gray-200">{emp.name}</p>
                    <p className="text-xs text-gray-500">{emp.role}</p>
                  </div>

                  {/* Checkbox Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-600"
                        : "border-gray-500"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="white"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-800 mt-6">
        <button
          type="button"
          onClick={() => setShowSubtaskEmpModal(false)}
          className="px-5 py-2 border border-gray-700 rounded-md text-sm text-gray-400 hover:bg-gray-800 transition"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            const updatedSubtasks = [...subtasks];
            updatedSubtasks[activeSubtaskIndex].assignees =
              selectedSubtaskEmployees;
            setSubtasks(updatedSubtasks);
            setShowSubtaskEmpModal(false);
          }}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-md transition"
        >
          Save Selection
        </button>
      </div>
    </div>
  </div>
)}

     {showDeleteModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-[120] animate-fadeIn">
    <div className="bg-gray-900/95 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center relative text-gray-200 backdrop-blur-md">
      {/* Close Button */}
      <button
        onClick={() => setShowDeleteModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
      >
        <FiX size={20} />
      </button>

      {/* Icon */}
      <div className="flex flex-col items-center">
        <div className="p-3 bg-red-900/40 border border-red-700/40 rounded-full mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="rgb(248, 113, 113)"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-lg font-semibold text-white mb-1">
          Delete Task?
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Are you sure you want to delete{" "}
          <strong className="text-gray-200">{taskToDelete?.title}</strong>? This
          action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-sm border border-gray-700 rounded-md text-gray-400 hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              try {
                toast.loading("Deleting task...", { id: "deleteTask" });
                const { data } = await axios.delete(
                  `http://localhost:5000/Task/deleteTask/${taskToDelete._id}`
                );

                if (data.message === "Task deleted successfully") {
                  setTasks((prev) =>
                    prev.filter((t) => t._id !== taskToDelete._id)
                  );
                  toast.success("Task deleted successfully!", {
                    id: "deleteTask",
                  });
                  setShowDeleteModal(false);
                } else {
                  toast.error("Failed to delete task", { id: "deleteTask" });
                }
              } catch (error) {
                console.error("❌ Error deleting task:", error);
                toast.error("Server error: could not delete task", {
                  id: "deleteTask",
                });
              }
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md shadow-md transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
