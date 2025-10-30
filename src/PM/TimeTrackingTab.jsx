// import { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../component/Sidebar";
// import toast from "react-hot-toast";
// import {
//   FiClock,
//   FiUser,
//   FiFolder,
//   FiCalendar,
//   FiCheckCircle,
//   FiChevronDown,
//   FiChevronUp,
// } from "react-icons/fi";

// export default function TimeTracking() {
//   const [projects, setProjects] = useState([]);
//   const [expanded, setExpanded] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const formatTime = (seconds) => {
//     if (!seconds) return "0h 0m";
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     return `${h}h ${m}m`;
//   };

//   useEffect(() => {
//     const fetchProjectTracking = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get("http://localhost:5000/task/getAllProjectTimeTracking");

//         if (data.success) {
//           setProjects(data.projects);
//         } else {
//           toast.error("Failed to fetch project time tracking");
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Server error while fetching project tracking");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProjectTracking();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center text-gray-500 text-lg font-medium">
//         Loading project time tracking...
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       <Sidebar />

//       <div className="flex-1 flex flex-col p-8 overflow-y-auto">
//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">📊 Project Time Tracking</h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Detailed overview of projects, tasks & employee time contribution
//             </p>
//           </div>
//         </div>

//         {/* NO DATA */}
//         {projects.length === 0 ? (
//           <div className="text-center text-gray-500 italic mt-20">
//             No project tracking data found.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//             {projects.map((proj, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-200 rounded-2xl shadow-md hover:shadow-lg bg-white transition-all duration-300 overflow-hidden"
//               >
//                 {/* PROJECT HEADER CARD */}
//                 <div
//                   onClick={() => setExpanded(expanded === index ? null : index)}
//                   className="cursor-pointer bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500 text-white p-6 rounded-t-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="p-3 bg-white bg-opacity-20 rounded-full">
//                       <FiFolder size={24} />
//                     </div>
//                     <div>
//                       <h2 className="text-xl font-semibold">{proj.project?.name}</h2>
//                       <p className="text-xs mt-1 flex items-center gap-2 text-emerald-100">
//                         <FiCalendar size={12} />
//                         Deadline:{" "}
//                         {proj.project?.deadline
//                           ? new Date(proj.project.deadline).toLocaleDateString()
//                           : "No deadline"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4 mt-4 sm:mt-0">
//                     <div className="flex items-center gap-2 bg-white text-emerald-700 rounded-xl px-4 py-2 shadow-sm">
//                       <FiClock />
//                       <span className="text-sm font-semibold">
//                         {formatTime(proj.totalProjectTime)}
//                       </span>
//                     </div>
//                     {expanded === index ? (
//                       <FiChevronUp className="text-white text-xl" />
//                     ) : (
//                       <FiChevronDown className="text-white text-xl" />
//                     )}
//                   </div>
//                 </div>

//                 {/* PROJECT DETAILS */}
//                 {expanded === index && (
//                   <div className="p-6 bg-gray-50 border-t space-y-6">
//                     {/* TASK LIST */}
//                     {proj.tasks.length === 0 ? (
//                       <p className="text-center text-gray-500 italic">No tasks found.</p>
//                     ) : (
//                       proj.tasks.map((task, tIndex) => (
//                         <div
//                           key={tIndex}
//                           className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300"
//                         >
//                           {/* TASK HEADER */}
//                           <div className="flex justify-between items-center mb-3">
//                             <div className="flex items-center gap-2">
//                               <FiCheckCircle
//                                 className={`${
//                                   task.status === "Completed"
//                                     ? "text-green-500"
//                                     : "text-gray-400"
//                                 }`}
//                                 size={18}
//                               />
//                               <h3 className="text-md font-semibold text-gray-800">
//                                 {task.title}
//                               </h3>
//                             </div>
//                             <span
//                               className={`text-xs font-semibold px-2 py-1 rounded-full ${
//                                 task.priority === "High"
//                                   ? "bg-red-100 text-red-700"
//                                   : task.priority === "Medium"
//                                   ? "bg-yellow-100 text-yellow-700"
//                                   : "bg-green-100 text-green-700"
//                               }`}
//                             >
//                               {task.priority}
//                             </span>
//                           </div>

//                           {/* TASK DETAILS */}
//                           <div className="text-sm text-gray-600 mb-3 flex justify-between">
//                             <span>
//                               Total Task Time:{" "}
//                               <span className="font-semibold text-gray-800">
//                                 {formatTime(task.totalTime)}
//                               </span>
//                             </span>
//                             <span
//                               className={`text-xs px-2 py-1 rounded-full font-semibold ${
//                                 task.status === "Completed"
//                                   ? "bg-green-100 text-green-700"
//                                   : "bg-gray-100 text-gray-600"
//                               }`}
//                             >
//                               {task.status}
//                             </span>
//                           </div>

//                           {/* EMPLOYEES */}
//                           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
//                             {task.employees.map((emp, eIndex) => (
//                               <div
//                                 key={eIndex}
//                                 className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-all"
//                               >
//                                 <div className="flex items-center gap-2 mb-1">
//                                   <FiUser className="text-emerald-500" size={16} />
//                                   <p className="text-sm font-medium text-gray-800">
//                                     {emp.name}
//                                   </p>
//                                 </div>
//                                 <div className="flex items-center justify-between text-xs text-gray-600">
//                                   <span>Time: {formatTime(emp.timeSpent)}</span>
//                                   <span
//                                     className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
//                                       emp.status === "done"
//                                         ? "bg-green-100 text-green-700"
//                                         : emp.status === "inprogress"
//                                         ? "bg-yellow-100 text-yellow-700"
//                                         : "bg-gray-100 text-gray-700"
//                                     }`}
//                                   >
//                                     {emp.status}
//                                   </span>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../component/Sidebar";
import toast from "react-hot-toast";
import {
  FiClock,
  FiUser,
  FiFolder,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export default function TimeTracking() {
  const [projects, setProjects] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatTime = (seconds) => {
    if (!seconds) return "0h 0m";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  useEffect(() => {
    const fetchProjectTracking = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/task/getAllProjectTimeTracking");

        if (data.success) {
          setProjects(data.projects);
        } else {
          toast.error("Failed to fetch project time tracking");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error while fetching project tracking");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectTracking();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 text-lg font-medium">
        Loading project time tracking...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden text-gray-200">
  <Sidebar />

  <div className="flex-1 flex flex-col p-8 overflow-y-auto custom-scroll">
    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          📊 Project Time Tracking
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Detailed overview of projects, tasks & employee time contribution
        </p>
      </div>
    </div>

    {/* NO DATA */}
    {projects.length === 0 ? (
      <div className="text-center text-gray-500 italic mt-20">
        No project tracking data found.
      </div>
    ) : (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {projects.map((proj, index) => (
          <div
            key={index}
            className="border border-gray-800 rounded-2xl shadow-md hover:shadow-xl bg-gray-900/80 backdrop-blur-md transition-all duration-300 overflow-hidden"
          >
            {/* PROJECT HEADER CARD */}
            <div
              onClick={() => setExpanded(expanded === index ? null : index)}
              className="cursor-pointer bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 text-white p-6 rounded-t-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-full">
                  <FiFolder size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{proj.project?.name}</h2>
                  <p className="text-xs mt-1 flex items-center gap-2 text-emerald-100">
                    <FiCalendar size={12} />
                    Deadline:{" "}
                    {proj.project?.deadline
                      ? new Date(proj.project.deadline).toLocaleDateString()
                      : "No deadline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <div className="flex items-center gap-2 bg-white text-emerald-700 rounded-xl px-4 py-2 shadow-sm">
                  <FiClock />
                  <span className="text-sm font-semibold">
                    {formatTime(proj.totalProjectTime)}
                  </span>
                </div>
                {expanded === index ? (
                  <FiChevronUp className="text-white text-xl" />
                ) : (
                  <FiChevronDown className="text-white text-xl" />
                )}
              </div>
            </div>

            {/* PROJECT DETAILS */}
            {expanded === index && (
              <div className="p-6 bg-gray-900/70 border-t border-gray-800 space-y-6">
                {/* TASK LIST */}
                {proj.tasks.length === 0 ? (
                  <p className="text-center text-gray-500 italic">
                    No tasks found.
                  </p>
                ) : (
                  proj.tasks.map((task, tIndex) => (
                    <div
                      key={tIndex}
                      className="bg-gray-800/60 border border-gray-700 rounded-xl p-5 hover:border-emerald-500/60 hover:shadow-lg transition-all duration-300"
                    >
                      {/* TASK HEADER */}
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <FiCheckCircle
                            className={`${
                              task.status === "Completed"
                                ? "text-emerald-400"
                                : "text-gray-500"
                            }`}
                            size={18}
                          />
                          <h3 className="text-md font-semibold text-white">
                            {task.title}
                          </h3>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
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

                      {/* TASK DETAILS */}
                      <div className="text-sm text-gray-400 mb-3 flex justify-between">
                        <span>
                          Total Task Time:{" "}
                          <span className="font-semibold text-gray-100">
                            {formatTime(task.totalTime)}
                          </span>
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${
                            task.status === "Completed"
                              ? "bg-green-900/40 text-green-400"
                              : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      {/* EMPLOYEES */}
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {task.employees.map((emp, eIndex) => (
                          <div
                            key={eIndex}
                            className="bg-gray-900/60 border border-gray-700 rounded-lg p-3 hover:border-emerald-500/50 hover:shadow-md transition-all"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <FiUser className="text-emerald-400" size={16} />
                              <p className="text-sm font-medium text-gray-200">
                                {emp.name}
                              </p>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span>Time: {formatTime(emp.timeSpent)}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                  emp.status === "done"
                                    ? "bg-green-900/40 text-green-400"
                                    : emp.status === "inprogress"
                                    ? "bg-yellow-900/40 text-yellow-400"
                                    : "bg-gray-800 text-gray-400"
                                }`}
                              >
                                {emp.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
}
