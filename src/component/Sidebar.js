// import { useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FolderKanban,
//   ClipboardCheck,
//   Users,
//   CalendarDays,
//   FileText,
//   BarChart2,
//   Target,
//   LineChart,
//   Settings,
//   LifeBuoy,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Clock4, // ⏱️ For Time Tracking
// } from "lucide-react";

// export default function Sidebar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   // Project Management Menu (with Time Tracking)
//   const menuItems = [
//     { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
//     { name: "Projects", icon: <FolderKanban size={18} />, path: "/projects" },
//     { name: "Tasks", icon: <ClipboardCheck size={18} />, path: "/tasks" },
//     { name: "Team", icon: <Users size={18} />, path: "/team" },
//     { name: "Calendar", icon: <CalendarDays size={18} />, path: "/calendar" },
//     { name: "Time Tracking", icon: <Clock4 size={18} />, path: "/time-tracking" }, // ⏱️ Added Module
//     { name: "Files", icon: <FileText size={18} />, path: "/files" },
//     { name: "Goals & KPIs", icon: <Target size={18} />, path: "/goals" },
//     { name: "Performance", icon: <LineChart size={18} />, path: "/performance" },
//     { name: "Reports", icon: <BarChart2 size={18} />, path: "/reports" },
//   ];

//   const bottomMenu = [
//     { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
//     { name: "Help & Support", icon: <LifeBuoy size={18} />, path: "/support" },
//   ];

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login", { replace: true });
//   };

//   // --- THEME: Static + Neutral + Professional ---
//   const baseBg = "bg-white border-r border-gray-200";
//   const hoverBg = "hover:bg-gray-100";
//   const activeBg = "bg-blue-50 border-l-4 border-blue-500";
//   const textColor = "text-gray-600";
//   const activeText = "text-blue-600 font-medium";

//   return (
//     <div
//       className={`h-screen ${isCollapsed ? "w-20" : "w-64"} 
//       ${baseBg} ${textColor} flex flex-col justify-between py-5 transition-all duration-200`}
//     >
//       {/* Collapse Button */}
//       <button
//         onClick={() => setIsCollapsed(!isCollapsed)}
//         className="absolute top-5 -right-3 bg-white border border-gray-300 p-1.5 rounded-full shadow-sm hover:bg-gray-100 text-gray-600 z-20"
//       >
//         {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
//       </button>

//       {/* Logo */}
//       <div className="flex items-center gap-3 px-5 mb-8">
//         <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-10 h-10 flex items-center justify-center rounded-md text-white font-bold">
//           NT
//         </div>
//         {!isCollapsed && (
//           <span className="font-bold text-lg text-gray-800">NovaTask</span>
//         )}
//       </div>

//       {/* Main Navigation */}
//       <div className="flex-1">
//         {!isCollapsed && (
//           <p className="text-xs font-semibold uppercase text-gray-400 px-5 mb-3 tracking-wide">
//             Project Management
//           </p>
//         )}

//         <nav className="flex flex-col space-y-1">
//           {menuItems.map((item) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <NavLink
//                 key={item.name}
//                 to={item.path}
//                 className={`flex items-center gap-3 px-5 py-2.5 text-sm rounded-md transition-all 
//                 ${
//                   isActive
//                     ? `${activeBg} ${activeText}`
//                     : `${hoverBg} ${textColor}`
//                 } ${isCollapsed ? "justify-center" : ""}`}
//               >
//                 {item.icon}
//                 {!isCollapsed && <span>{item.name}</span>}
//               </NavLink>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-gray-200 my-3 mx-4"></div>

//       {/* Bottom Menu */}
//       <div>
//         {bottomMenu.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <NavLink
//               key={item.name}
//               to={item.path}
//               className={`flex items-center gap-3 px-5 py-2.5 text-sm rounded-md transition-all 
//               ${
//                 isActive
//                   ? `${activeBg} ${activeText}`
//                   : `${hoverBg} ${textColor}`
//               } ${isCollapsed ? "justify-center" : ""}`}
//             >
//               {item.icon}
//               {!isCollapsed && <span>{item.name}</span>}
//             </NavLink>
//           );
//         })}

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className={`flex items-center gap-3 px-5 py-2.5 text-sm text-gray-500 hover:text-red-500 hover:bg-gray-100 w-full rounded-md transition ${
//             isCollapsed ? "justify-center" : ""
//           }`}
//         >
//           <LogOut size={18} />
//           {!isCollapsed && <span>Logout</span>}
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  ClipboardCheck,
  Users,
  CalendarDays,
  FileText,
  BarChart2,
  Target,
  LineChart,
  Settings,
  LifeBuoy,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Clock4,
  User,
} from "lucide-react";
import {jwtDecode} from "jwt-decode"; // ⚡ Make sure to install this: npm install jwt-decode

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState(null);

  // 🧩 Decode Role from JWT Token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role || "employee"); // default employee if not found
      } catch (error) {
        console.error("Invalid token:", error);
        setRole("employee");
      }
    } else {
      setRole("employee");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  // --- COMMON THEME ---
  const baseBg = "bg-white border-r border-gray-200";
  const hoverBg = "hover:bg-gray-100";
  const activeBg = "bg-blue-50 border-l-4 border-blue-500";
  const textColor = "text-gray-600";
  const activeText = "text-blue-600 font-medium";

  // --- ADMIN MENU ---
  const adminMenu = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { name: "Projects", icon: <FolderKanban size={18} />, path: "/projects" },
    { name: "Tasks", icon: <ClipboardCheck size={18} />, path: "/tasks" },
    { name: "Team", icon: <Users size={18} />, path: "/team" },
    { name: "Calendar", icon: <CalendarDays size={18} />, path: "/calendar" },
    { name: "Time Tracking", icon: <Clock4 size={18} />, path: "/time-tracking" },
    { name: "Files", icon: <FileText size={18} />, path: "/files" },
    // { name: "Goals & KPIs", icon: <Target size={18} />, path: "/goals" },
    { name: "Performance", icon: <LineChart size={18} />, path: "/performance" },
    { name: "Reports", icon: <BarChart2 size={18} />, path: "/reports" },
  ];

  // --- EMPLOYEE MENU ---
  const employeeMenu = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { name: "My Tasks", icon: <ClipboardCheck size={18} />, path: "/employee/tasks" },
    { name: "Calendar", icon: <CalendarDays size={18} />, path: "/employee/calendar" },
    { name: "Time Tracking", icon: <Clock4 size={18} />, path: "/employee/time-tracking" },
    { name: "Files", icon: <FileText size={18} />, path: "/employee/files" },
    // { name: "Goals & KPIs", icon: <Target size={18} />, path: "/employee/goals" },
    { name: "Performance", icon: <LineChart size={18} />, path: "/employee/performance" },
  ];

  const bottomMenu =
    role === "admin"
      ? [
          { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
          { name: "Help & Support", icon: <LifeBuoy size={18} />, path: "/support" },
        ]
      : [
          { name: "Profile", icon: <User size={18} />, path: "/employee/profile" },
          { name: "Help & Support", icon: <LifeBuoy size={18} />, path: "/employee/support" },
        ];

  // --- CHOOSE MENU BASED ON ROLE ---
  const menuItems = role === "admin" ? adminMenu : employeeMenu;

  return (
    <div
      className={`h-screen ${isCollapsed ? "w-20" : "w-64"} 
      ${baseBg} ${textColor} flex flex-col justify-between py-5 transition-all duration-200`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-5 -right-3 bg-white border border-gray-300 p-1.5 rounded-full shadow-sm hover:bg-gray-100 text-gray-600 z-20"
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-10 h-10 flex items-center justify-center rounded-md text-white font-bold">
          NT
        </div>
        {!isCollapsed && (
          <span className="font-bold text-lg text-gray-800">NovaTask</span>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1">
        {!isCollapsed && (
          <p className="text-xs font-semibold uppercase text-gray-400 px-5 mb-3 tracking-wide">
            {role === "admin" ? "Project Management" : "Employee Panel"}
          </p>
        )}

        <nav className="flex flex-col space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm rounded-md transition-all 
                ${
                  isActive
                    ? `${activeBg} ${activeText}`
                    : `${hoverBg} ${textColor}`
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-3 mx-4"></div>

      {/* Bottom Menu */}
      <div>
        {bottomMenu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm rounded-md transition-all 
              ${
                isActive
                  ? `${activeBg} ${activeText}`
                  : `${hoverBg} ${textColor}`
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-5 py-2.5 text-sm text-gray-500 hover:text-red-500 hover:bg-gray-100 w-full rounded-md transition ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
