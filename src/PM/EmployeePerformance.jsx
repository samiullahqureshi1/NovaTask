// import { useEffect, useState } from "react";
// import Sidebar from "../component/Sidebar";
// import axios from "axios";
// import toast from "react-hot-toast";
// import {
//   FiUser,
//   FiClock,
//   FiTrendingUp,
//   FiCheckCircle,
//   FiActivity,
//   FiFolder,
// } from "react-icons/fi";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// export default function EmployeePerformance() {
//   const [employee, setEmployee] = useState(null);
//   const [tracking, setTracking] = useState([]);
//   const [totalTime, setTotalTime] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const employeeId = localStorage.getItem("employeeId");

//   const formatTime = (seconds) => {
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     return `${h}h ${m}m`;
//   };

//   useEffect(() => {
//     const fetchPerformance = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:5000/Task/getTimeTracking/${employeeId}`
//         );

//         if (data.success) {
//           setEmployee(data.employee);
//           setTracking(data.tracking);
//           setTotalTime(data.totalTime);
//         } else {
//           toast.error("Failed to fetch employee performance data");
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Server error fetching performance data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPerformance();
//   }, [employeeId]);

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center text-gray-500">
//         Loading performance data...
//       </div>
//     );
//   }

//   // ---- Compute Stats ----
//   const totalTasks = tracking.length;
//   const completed = tracking.filter((t) => t.status === "done").length;
//   const inprogress = tracking.filter((t) => t.status === "inprogress").length;
//   const pending = tracking.filter((t) => t.status === "pending").length;

//   const completionRate = totalTasks
//     ? Math.round((completed / totalTasks) * 100)
//     : 0;

//   const efficiency =
//     employee?.workingHours && totalTime
//       ? Math.round(
//           (totalTime / (employee.workingHours * 3600)) * 100
//         )
//       : 0;

//   // ---- Charts ----
//   const projectLabels = tracking.map((t) => t.task.project?.name || "Unnamed");
//   const timeData = tracking.map((t) => t.timeSpent / 3600);

//   const projectTimeData = {
//     labels: projectLabels,
//     datasets: [
//       {
//         label: "Hours Worked",
//         data: timeData,
//         backgroundColor: "rgba(37, 99, 235, 0.6)",
//         borderColor: "rgba(37, 99, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const taskDistributionData = {
//     labels: ["Done", "In Progress", "Pending"],
//     datasets: [
//       {
//         label: "Task Distribution",
//         data: [completed, inprogress, pending],
//         backgroundColor: [
//           "rgba(16, 185, 129, 0.6)", // green
//           "rgba(234, 179, 8, 0.6)", // yellow
//           "rgba(156, 163, 175, 0.6)", // gray
//         ],
//         borderColor: ["#10B981", "#EAB308", "#9CA3AF"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       <Sidebar />

//       <div className="flex-1 p-8 overflow-y-auto">
//         {/* ========== HEADER ========== */}
//         {employee && (
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100 rounded-2xl shadow-sm p-6 mb-8">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-600 text-white rounded-full shadow">
//                 <FiUser size={22} />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {employee.name}
//                 </h2>
//                 <p className="text-sm text-gray-500">{employee.email}</p>
//               </div>
//             </div>

//             <div className="mt-4 sm:mt-0 flex items-center gap-4">
//               <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 flex items-center gap-2 shadow-sm">
//                 <FiClock className="text-blue-600" />
//                 <div>
//                   <p className="text-xs text-gray-500 uppercase font-semibold">
//                     Total Time Logged
//                   </p>
//                   <p className="text-base font-semibold text-gray-800">
//                     {formatTime(totalTime)}
//                   </p>
//                 </div>
//               </div>
//               {employee.workingHours && (
//                 <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 flex items-center gap-2 shadow-sm">
//                   <FiActivity className="text-green-600" />
//                   <div>
//                     <p className="text-xs text-gray-500 uppercase font-semibold">
//                       Daily Working Hours
//                     </p>
//                     <p className="text-base font-semibold text-gray-800">
//                       {employee.workingHours} hrs
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* ========== METRICS CARDS ========== */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
//           <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
//             <p className="text-xs text-gray-500 uppercase">Total Tasks</p>
//             <h3 className="text-2xl font-bold text-gray-800 mt-2">{totalTasks}</h3>
//           </div>

//           <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
//             <p className="text-xs text-gray-500 uppercase">Completed</p>
//             <h3 className="text-2xl font-bold text-green-600 mt-2">{completed}</h3>
//           </div>

//           <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
//             <p className="text-xs text-gray-500 uppercase">In Progress</p>
//             <h3 className="text-2xl font-bold text-yellow-600 mt-2">{inprogress}</h3>
//           </div>

//           <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
//             <p className="text-xs text-gray-500 uppercase">Completion Rate</p>
//             <h3 className="text-2xl font-bold text-blue-600 mt-2">
//               {completionRate}%
//             </h3>
//           </div>
//         </div>

//         {/* ========== CHARTS SECTION ========== */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
//           <div className="bg-white border rounded-xl p-6 shadow-sm">
//             <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//               <FiClock className="text-blue-500" /> Time Spent per Project
//             </h3>
//             {tracking.length > 0 ? (
//               <Bar data={projectTimeData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
//             ) : (
//               <p className="text-sm text-gray-400 text-center">No data available</p>
//             )}
//           </div>

//           <div className="bg-white border rounded-xl p-6 shadow-sm">
//             <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
//               <FiCheckCircle className="text-green-500" /> Task Status Breakdown
//             </h3>
//             <Pie data={taskDistributionData} />
//           </div>
//         </div>

//         {/* ========== RECENT TASKS ========== */}
//         <div className="bg-white border rounded-xl p-6 shadow-sm">
//           <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
//             <FiFolder className="text-purple-500" /> Recent Tasks
//           </h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm text-gray-700">
//               <thead className="bg-gray-100 text-xs uppercase text-gray-600">
//                 <tr>
//                   <th className="py-3 px-4 text-left">Project</th>
//                   <th className="py-3 px-4 text-left">Task</th>
//                   <th className="py-3 px-4 text-left">Status</th>
//                   <th className="py-3 px-4 text-left">Time Spent</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tracking.slice(0, 5).map((t, i) => (
//                   <tr key={i} className="border-b last:border-0 hover:bg-gray-50 transition">
//                     <td className="py-3 px-4">{t.task.project?.name || "—"}</td>
//                     <td className="py-3 px-4 font-medium text-gray-800">
//                       {t.task.title}
//                     </td>
//                     <td className="py-3 px-4">
//                       <span
//                         className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
//                           t.status === "done"
//                             ? "bg-green-100 text-green-700"
//                             : t.status === "inprogress"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         {t.status}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4 font-semibold text-gray-900">
//                       {formatTime(t.timeSpent)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiUser,
  FiClock,
  FiCheckCircle,
  FiActivity,
  FiFolder,
} from "react-icons/fi";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

export default function EmployeePerformance() {
  const [employee, setEmployee] = useState(null);
  const [tracking, setTracking] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [loading, setLoading] = useState(true);

  const employeeId = localStorage.getItem("employeeId");

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/Task/getTimeTracking/${employeeId}`
        );

        if (data.success) {
          setEmployee(data.employee);
          setTracking(data.tracking);
          setTotalTime(data.totalTime);
        } else {
          toast.error("Failed to fetch employee performance data");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error fetching performance data");
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading performance data...
      </div>
    );
  }

  // ---- Compute Stats ----
  const totalTasks = tracking.length;
  const completed = tracking.filter((t) => t.status === "done").length;
  const inprogress = tracking.filter((t) => t.status === "inprogress").length;
  const pending = tracking.filter((t) => t.status === "pending").length;

  const completionRate = totalTasks
    ? Math.round((completed / totalTasks) * 100)
    : 0;

  // ---- Nivo Data ----
  const projectData = tracking.map((t) => ({
    project: t.task.project?.name || "Unnamed",
    "Hours Worked": parseFloat((t.timeSpent / 3600).toFixed(2)),
  }));

  const taskStatusData = [
    { id: "Done", label: "Done", value: completed, color: "#10B981" },
    { id: "In Progress", label: "In Progress", value: inprogress, color: "#EAB308" },
    { id: "Pending", label: "Pending", value: pending, color: "#9CA3AF" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        {/* HEADER */}
        {employee && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100 rounded-2xl shadow-sm p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 text-white rounded-full shadow">
                <FiUser size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {employee.name}
                </h2>
                <p className="text-sm text-gray-500">{employee.email}</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 flex items-center gap-4">
              <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 flex items-center gap-2 shadow-sm">
                <FiClock className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Total Time Logged
                  </p>
                  <p className="text-base font-semibold text-gray-800">
                    {formatTime(totalTime)}
                  </p>
                </div>
              </div>
              {employee.workingHours && (
                <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 flex items-center gap-2 shadow-sm">
                  <FiActivity className="text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Daily Working Hours
                    </p>
                    <p className="text-base font-semibold text-gray-800">
                      {employee.workingHours} hrs
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <p className="text-xs text-gray-500 uppercase">Total Tasks</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-2">{totalTasks}</h3>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <p className="text-xs text-gray-500 uppercase">Completed</p>
            <h3 className="text-2xl font-bold text-green-600 mt-2">{completed}</h3>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <p className="text-xs text-gray-500 uppercase">In Progress</p>
            <h3 className="text-2xl font-bold text-yellow-600 mt-2">{inprogress}</h3>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <p className="text-xs text-gray-500 uppercase">Completion Rate</p>
            <h3 className="text-2xl font-bold text-blue-600 mt-2">{completionRate}%</h3>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Bar Chart */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FiClock className="text-blue-500" /> Time Spent per Project
            </h3>
            {projectData.length > 0 ? (
              <div style={{ height: 300 }}>
                <ResponsiveBar
                  data={projectData}
                  keys={["Hours Worked"]}
                  indexBy="project"
                  margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                  padding={0.3}
                  colors={{ scheme: "nivo" }}
                  borderRadius={5}
                  enableLabel={false}
                  axisBottom={{
                    tickRotation: -25,
                    legend: "Project",
                    legendPosition: "middle",
                    legendOffset: 40,
                  }}
                  axisLeft={{
                    legend: "Hours",
                    legendPosition: "middle",
                    legendOffset: -45,
                  }}
                  tooltip={({ indexValue, value }) => (
                    <div className="bg-white text-gray-800 text-sm p-2 rounded shadow">
                      <strong>{indexValue}</strong>: {value} hrs
                    </div>
                  )}
                  animate={true}
                  motionConfig="gentle"
                />
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center">
                No data available
              </p>
            )}
          </div>

          {/* Pie Chart */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FiCheckCircle className="text-green-500" /> Task Status Breakdown
            </h3>
            <div style={{ height: 300 }}>
              <ResponsivePie
                data={taskStatusData}
                margin={{ top: 30, right: 40, bottom: 40, left: 40 }}
                innerRadius={0.6}
                padAngle={2}
                cornerRadius={4}
                colors={{ datum: "data.color" }}
                borderWidth={2}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                tooltip={({ datum }) => (
                  <div className="bg-white text-gray-800 text-sm p-2 rounded shadow">
                    <strong>{datum.id}</strong>: {datum.value}
                  </div>
                )}
                animate={true}
                motionConfig="wobbly"
              />
            </div>
          </div>
        </div>

        {/* RECENT TASKS */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FiFolder className="text-purple-500" /> Recent Tasks
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left">Project</th>
                  <th className="py-3 px-4 text-left">Task</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Time Spent</th>
                </tr>
              </thead>
              <tbody>
                {tracking.slice(0, 5).map((t, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">{t.task.project?.name || "—"}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {t.task.title}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          t.status === "done"
                            ? "bg-green-100 text-green-700"
                            : t.status === "inprogress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {formatTime(t.timeSpent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
