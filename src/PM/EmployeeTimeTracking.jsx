// import { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../component/Sidebar";
// import toast from "react-hot-toast";
// import {
//   FiClock,
//   FiUser,
//   FiMail,
//   FiFolder,
//   FiCalendar,
//   FiCheckCircle,
// } from "react-icons/fi";

// export default function EmployeeTimeTrackingCards() {
//   const [employee, setEmployee] = useState(null);
//   const [tracking, setTracking] = useState([]);
//   const [totalTime, setTotalTime] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const employeeId = localStorage.getItem("employeeId");

//   // Format seconds to hours/mins
//   const formatTime = (seconds) => {
//     if (!seconds) return "0h 0m";
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     return `${h}h ${m}m`;
//   };

//   useEffect(() => {
//     const fetchTracking = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(
//           `http://localhost:5000/Task/getTimeTracking/${employeeId}`
//         );

//         if (data.success) {
//           setEmployee(data.employee);
//           setTracking(data.tracking);
//           setTotalTime(data.totalTime);
//         } else {
//           toast.error("Failed to fetch time tracking data");
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Server error while fetching time tracking");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTracking();
//   }, [employeeId]);

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center text-gray-500">
//         Loading time tracking...
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       <Sidebar />

//       <div className="flex-1 flex flex-col p-8 overflow-y-auto">
//         {/* ================= HEADER CARD ================= */}
//         {employee && (
//           <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100 rounded-2xl shadow-md p-6 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-600 text-white rounded-full shadow-md">
//                 <FiUser size={24} />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {employee.name}
//                 </h2>
//                 <p className="text-sm text-gray-500 flex items-center gap-1">
//                   <FiMail size={14} /> {employee.email}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 mt-4 sm:mt-0">
//               <div className="bg-white shadow-sm border border-gray-200 px-5 py-3 rounded-xl flex items-center gap-2">
//                 <FiClock className="text-blue-600" />
//                 <div>
//                   <p className="text-xs text-gray-500 uppercase font-semibold">
//                     Total Time Worked
//                   </p>
//                   <p className="text-lg font-semibold text-gray-800">
//                     {formatTime(totalTime)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= TASK CARDS ================= */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {tracking.length === 0 ? (
//             <div className="col-span-full text-center text-gray-500 italic">
//               No tasks found.
//             </div>
//           ) : (
//             tracking.map((t, i) => (
//               <div
//                 key={i}
//                 className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6 relative overflow-hidden"
//               >
//                 {/* Accent top border */}
//                 <div
//                   className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl ${
//                     t.status === "done"
//                       ? "bg-green-500"
//                       : t.status === "inprogress"
//                       ? "bg-yellow-500"
//                       : "bg-gray-400"
//                   }`}
//                 ></div>

//                 {/* Project Info */}
//                 <div className="mb-4">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                       <FiFolder className="text-blue-500" />{" "}
//                       {t.task.project?.name || "Untitled Project"}
//                     </h3>
//                     <span
//                       className={`text-xs font-semibold px-2 py-1 rounded-full ${
//                         t.task.project?.priority === "High"
//                           ? "bg-red-100 text-red-700"
//                           : t.task.project?.priority === "Medium"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-green-100 text-green-700"
//                       }`}
//                     >
//                       {t.task.project?.priority || "N/A"}
//                     </span>
//                   </div>
//                   {/* <p className="text-xs text-gray-500 mt-1">
//                     Client:{" "}
//                     <span className="font-medium text-gray-700">
//                       {t.task.project?.client || "—"}
//                     </span>
//                   </p> */}
//                 </div>

//                 {/* Task Info */}
//                 <div className="mb-4">
//                   <p className="text-sm text-gray-800 font-medium mb-1">
//                     Task: {t.task.title}
//                   </p>
//                   <p className="text-xs text-gray-500 line-clamp-2">
//                     {t.task.description || "No description"}
//                   </p>
//                 </div>

//                 {/* Status & Time */}
//                 <div className="flex items-center justify-between border-t pt-3 mt-auto">
//                   <div className="flex items-center gap-2">
//                     <span
//                       className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
//                         t.status === "done"
//                           ? "bg-green-100 text-green-700"
//                           : t.status === "inprogress"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-gray-100 text-gray-700"
//                       }`}
//                     >
//                       {t.status}
//                     </span>
//                     <FiCheckCircle
//                       className={`${
//                         t.status === "done"
//                           ? "text-green-500"
//                           : "text-gray-400"
//                       }`}
//                     />
//                   </div>

//                   <div className="text-sm font-semibold text-gray-700 flex items-center gap-1">
//                     <FiClock className="text-blue-500" />{" "}
//                     {formatTime(t.timeSpent)}
//                   </div>
//                 </div>

//                 {/* Deadline */}
//                 {t.task.project?.deadline && (
//                   <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
//                     <FiCalendar size={12} className="text-gray-400" />
//                     Deadline:{" "}
//                     {new Date(t.task.project.deadline).toLocaleDateString()}
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
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
  FiMail,
  FiFolder,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

export default function EmployeeTimeTrackingCards() {
  const [employee, setEmployee] = useState(null);
  const [tracking, setTracking] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [loading, setLoading] = useState(true);

  const employeeId = localStorage.getItem("employeeId");

  // Format seconds to hours/mins
  const formatTime = (seconds) => {
    if (!seconds) return "0h 0m";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/Task/getTimeTracking/${employeeId}`
        );

        if (data.success) {
          setEmployee(data.employee);
          setTracking(data.tracking);
          setTotalTime(data.totalTime);
        } else {
          toast.error("Failed to fetch time tracking data");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error while fetching time tracking");
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading time tracking...
      </div>
    );
  }

  return (
   <div className="flex h-screen bg-gray-950 overflow-hidden text-gray-200">
  <Sidebar />

  <div className="flex-1 flex flex-col p-8 overflow-y-auto custom-scroll">
    {/* ================= HEADER CARD ================= */}
    {employee && (
      <div className="bg-gradient-to-r from-indigo-900/40 via-gray-900/70 to-gray-950/80 border border-gray-800 rounded-2xl shadow-lg p-6 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 text-white rounded-full shadow-md">
            <FiUser size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-100">{employee.name}</h2>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              <FiMail size={14} /> {employee.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <div className="bg-gray-900/70 shadow-sm border border-gray-800 px-5 py-3 rounded-xl flex items-center gap-2">
            <FiClock className="text-indigo-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">
                Total Time Worked
              </p>
              <p className="text-lg font-semibold text-gray-100">
                {formatTime(totalTime)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* ================= TASK CARDS ================= */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {tracking.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 italic">
          No tasks found.
        </div>
      ) : (
        tracking.map((t, i) => (
          <div
            key={i}
            className="relative bg-gray-900/80 border border-gray-800 rounded-2xl shadow-md hover:shadow-indigo-600/10 hover:border-indigo-500 transition-all duration-300 p-6 overflow-hidden backdrop-blur-sm"
          >
            {/* Accent top border */}
            <div
              className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl ${
                t.status === "done"
                  ? "bg-green-500"
                  : t.status === "inprogress"
                  ? "bg-amber-400"
                  : "bg-gray-600"
              }`}
            ></div>

            {/* Project Info */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
                  <FiFolder className="text-indigo-400" />
                  {t.task.project?.name || "Untitled Project"}
                </h3>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    t.task.project?.priority === "High"
                      ? "bg-red-900/30 text-red-400 border border-red-800/40"
                      : t.task.project?.priority === "Medium"
                      ? "bg-yellow-900/30 text-yellow-400 border border-yellow-800/40"
                      : "bg-green-900/30 text-green-400 border border-green-800/40"
                  }`}
                >
                  {t.task.project?.priority || "N/A"}
                </span>
              </div>
            </div>

            {/* Task Info */}
            <div className="mb-4">
              <p className="text-sm text-gray-200 font-medium mb-1">
                Task: {t.task.title}
              </p>
              <p className="text-xs text-gray-400 line-clamp-2">
                {t.task.description || "No description"}
              </p>
            </div>

            {/* Status & Time */}
            <div className="flex items-center justify-between border-t border-gray-800 pt-3 mt-auto">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    t.status === "done"
                      ? "bg-green-900/40 text-green-400"
                      : t.status === "inprogress"
                      ? "bg-amber-900/40 text-amber-400"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {t.status}
                </span>
                <FiCheckCircle
                  className={`${
                    t.status === "done"
                      ? "text-green-400"
                      : "text-gray-500"
                  }`}
                />
              </div>

              <div className="text-sm font-semibold text-gray-300 flex items-center gap-1">
                <FiClock className="text-indigo-400" />
                {formatTime(t.timeSpent)}
              </div>
            </div>

            {/* Deadline */}
            {t.task.project?.deadline && (
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <FiCalendar size={12} className="text-gray-500" />
                Deadline:{" "}
                <span className="text-gray-400">
                  {new Date(t.task.project.deadline).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  </div>
</div>

  );
}
