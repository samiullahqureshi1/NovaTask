// // // import { useState, useEffect } from "react";
// // // import { NavLink, useLocation, useNavigate } from "react-router-dom";
// // // import {
// // //   LayoutDashboard,
// // //   FolderKanban,
// // //   ClipboardCheck,
// // //   Users,
// // //   CalendarDays,
// // //   FileText,
// // //   BarChart2,
// // //   Target,
// // //   LineChart,
// // //   Settings,
// // //   LifeBuoy,
// // //   LogOut,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   Clock4,
// // //   User,
// // // } from "lucide-react";
// // // import {jwtDecode} from "jwt-decode"; // ⚡ Make sure to install this: npm install jwt-decode

// // // export default function Sidebar() {
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const [isCollapsed, setIsCollapsed] = useState(false);
// // //   const [role, setRole] = useState(null);

// // //   // 🧩 Decode Role from JWT Token
// // //   useEffect(() => {
// // //     const token = localStorage.getItem("token");
// // //     if (token) {
// // //       try {
// // //         const decoded = jwtDecode(token);
// // //         setRole(decoded.role || "employee"); // default employee if not found
// // //       } catch (error) {
// // //         console.error("Invalid token:", error);
// // //         setRole("employee");
// // //       }
// // //     } else {
// // //       setRole("employee");
// // //     }
// // //   }, []);

// // //   const handleLogout = () => {
// // //     localStorage.clear();
// // //     navigate("/login", { replace: true });
// // //   };

// // //   // --- COMMON THEME ---
// // //   const baseBg = "bg-white border-r border-gray-200";
// // //   const hoverBg = "hover:bg-gray-100";
// // //   const activeBg = "bg-blue-50 border-l-4 border-blue-500";
// // //   const textColor = "text-gray-600";
// // //   const activeText = "text-blue-600 font-medium";

// // //   // --- ADMIN MENU ---
// // //   const adminMenu = [
// // //     { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
// // //     { name: "Projects", icon: <FolderKanban size={18} />, path: "/projects" },
// // //     { name: "Tasks", icon: <ClipboardCheck size={18} />, path: "/tasks" },
// // //     { name: "Team", icon: <Users size={18} />, path: "/team" },
// // //     { name: "Calendar", icon: <CalendarDays size={18} />, path: "/calendar" },
// // //     { name: "Time Tracking", icon: <Clock4 size={18} />, path: "/time-tracking" },
// // //     { name: "Files", icon: <FileText size={18} />, path: "/files" },
// // //     { name: "Performance", icon: <LineChart size={18} />, path: "/performance" },
// // //   ];

// // //   // --- EMPLOYEE MENU ---
// // //   const employeeMenu = [
// // //     { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
// // //     { name: "My Tasks", icon: <ClipboardCheck size={18} />, path: "/employee/tasks" },
// // //     { name: "Calendar", icon: <CalendarDays size={18} />, path: "/employee/calendar" },
// // //     { name: "Time Tracking", icon: <Clock4 size={18} />, path: "/employee/time-tracking" },
// // //     { name: "Files", icon: <FileText size={18} />, path: "/employee/files" },
// // //     { name: "Performance", icon: <LineChart size={18} />, path: "/employee/performance" },
// // //   ];

// // //   const bottomMenu =
// // //     role === "admin"
// // //       ? [
// // //           { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
// // //           { name: "Help & Support", icon: <LifeBuoy size={18} />, path: "/support" },
// // //         ]
// // //       : [
// // //           { name: "Profile", icon: <User size={18} />, path: "/employee/profile" },
// // //           { name: "Help & Support", icon: <LifeBuoy size={18} />, path: "/employee/support" },
// // //         ];

// // //   // --- CHOOSE MENU BASED ON ROLE ---
// // //   const menuItems = role === "admin" ? adminMenu : employeeMenu;

// // //   return (
// // //     <div
// // //       className={`h-screen ${isCollapsed ? "w-20" : "w-64"} 
// // //       ${baseBg} ${textColor} flex flex-col justify-between py-5 transition-all duration-200`}
// // //     >
// // //       {/* Collapse Button */}
// // //       <button
// // //         onClick={() => setIsCollapsed(!isCollapsed)}
// // //         className="absolute top-5 -right-3 bg-white border border-gray-300 p-1.5 rounded-full shadow-sm hover:bg-gray-100 text-gray-600 z-20"
// // //       >
// // //         {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
// // //       </button>

// // //       {/* Logo */}
// // //       <div className="flex items-center gap-3 px-5 mb-8">
// // //         <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-10 h-10 flex items-center justify-center rounded-md text-white font-bold">
// // //           NT
// // //         </div>
// // //         {!isCollapsed && (
// // //           <span className="font-bold text-lg text-gray-800">NovaTask</span>
// // //         )}
// // //       </div>

// // //       {/* Main Navigation */}
// // //       <div className="flex-1">
// // //         {!isCollapsed && (
// // //           <p className="text-xs font-semibold uppercase text-gray-400 px-5 mb-3 tracking-wide">
// // //             {role === "admin" ? "Project Management" : "Employee Panel"}
// // //           </p>
// // //         )}

// // //         <nav className="flex flex-col space-y-1">
// // //           {menuItems.map((item) => {
// // //             const isActive = location.pathname === item.path;
// // //             return (
// // //               <NavLink
// // //                 key={item.name}
// // //                 to={item.path}
// // //                 className={`flex items-center gap-3 px-5 py-2.5 text-sm rounded-md transition-all 
// // //                 ${
// // //                   isActive
// // //                     ? `${activeBg} ${activeText}`
// // //                     : `${hoverBg} ${textColor}`
// // //                 } ${isCollapsed ? "justify-center" : ""}`}
// // //               >
// // //                 {item.icon}
// // //                 {!isCollapsed && <span>{item.name}</span>}
// // //               </NavLink>
// // //             );
// // //           })}
// // //         </nav>
// // //       </div>

// // //       {/* Divider */}
// // //       <div className="border-t border-gray-200 my-3 mx-4"></div>

// // //       {/* Bottom Menu */}
// // //       <div>
// // //         {bottomMenu.map((item) => {
// // //           const isActive = location.pathname === item.path;
// // //           return (
// // //             <NavLink
// // //               key={item.name}
// // //               to={item.path}
// // //               className={`flex items-center gap-3 px-5 py-2.5 text-sm rounded-md transition-all 
// // //               ${
// // //                 isActive
// // //                   ? `${activeBg} ${activeText}`
// // //                   : `${hoverBg} ${textColor}`
// // //               } ${isCollapsed ? "justify-center" : ""}`}
// // //             >
// // //               {item.icon}
// // //               {!isCollapsed && <span>{item.name}</span>}
// // //             </NavLink>
// // //           );
// // //         })}

// // //         {/* Logout */}
// // //         <button
// // //           onClick={handleLogout}
// // //           className={`flex items-center gap-3 px-5 py-2.5 text-sm text-gray-500 hover:text-red-500 hover:bg-gray-100 w-full rounded-md transition ${
// // //             isCollapsed ? "justify-center" : ""
// // //           }`}
// // //         >
// // //           <LogOut size={18} />
// // //           {!isCollapsed && <span>Logout</span>}
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import { useState, useEffect } from "react";
// // import { NavLink, useLocation, useNavigate } from "react-router-dom";
// // import {
// //   LayoutDashboard,
// //   FolderKanban,
// //   ClipboardCheck,
// //   Users,
// //   CalendarDays,
// //   FileText,
// //   BarChart2,
// //   LineChart,
// //   Settings,
// //   LifeBuoy,
// //   LogOut,
// //   ChevronLeft,
// //   ChevronRight,
// //   Clock4,
// //   User,
// //   Briefcase,
// //   Building,
// //   Handshake,
// //   ChevronDown,
// //   Target,
// // } from "lucide-react";
// // import { jwtDecode } from "jwt-decode";
// // import { motion, AnimatePresence } from "framer-motion"; // ✅ optional for animation (npm i framer-motion)

// // export default function Sidebar() {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [isCollapsed, setIsCollapsed] = useState(false);
// //   const [role, setRole] = useState(null);
// //   const [activeModule, setActiveModule] = useState("pm"); // default: PM
// //   const [dropdownOpen, setDropdownOpen] = useState(false);

// //   // 🧩 Decode Role from JWT
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       try {
// //         const decoded = jwtDecode(token);
// //         setRole(decoded.role || "employee");
// //       } catch (error) {
// //         console.error("Invalid token:", error);
// //         setRole("employee");
// //       }
// //     } else {
// //       setRole("employee");
// //     }
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     navigate("/login", { replace: true });
// //   };

// //   // --- COMMON THEMING ---
// //   const baseBg = "bg-white border-r border-gray-200";
// //   const hoverBg = "hover:bg-gray-100";
// //   const activeBg = "bg-blue-50 border-l-4 border-blue-500";
// //   const textColor = "text-gray-600";
// //   const activeText = "text-blue-600 font-medium";

// //   // --- ADMIN MODULE MENUS ---
// //   const pmMenu = [
// //     { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
// //     { name: "Projects", icon: <FolderKanban size={18} />, path: "/projects" },
// //     { name: "Tasks", icon: <ClipboardCheck size={18} />, path: "/tasks" },
// //     { name: "Team", icon: <Users size={18} />, path: "/team" },
// //     { name: "Calendar", icon: <CalendarDays size={18} />, path: "/calendar" },
// //     { name: "Time Tracking", icon: <Clock4 size={18} />, path: "/time-tracking" },
// //     { name: "Files", icon: <FileText size={18} />, path: "/files" },
// //     { name: "Performance", icon: <LineChart size={18} />, path: "/performance" },
// //   ];

// //   const hrmMenu = [
// //     { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/hr/dashboard" },
// //     { name: "Employees", icon: <Users size={18} />, path: "/hr/employees" },
// //     { name: "Attendance", icon: <Clock4 size={18} />, path: "/hr/attendance" },
// //     { name: "Leaves", icon: <CalendarDays size={18} />, path: "/hr/leaves" },
// //     { name: "Payroll", icon: <Briefcase size={18} />, path: "/hr/payroll" },
// //     { name: "Reports", icon: <BarChart2 size={18} />, path: "/hr/reports" },
// //   ];

// //   const crmMenu = [
// //     { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/crm/dashboard" },
// //     { name: "Clients", icon: <Handshake size={18} />, path: "/crm/clients" },
// //     { name: "Leads", icon: <Target size={18} />, path: "/crm/leads" },
// //     { name: "Deals", icon: <FolderKanban size={18} />, path: "/crm/deals" },
// //     { name: "Campaigns", icon: <BarChart2 size={18} />, path: "/crm/campaigns" },
// //     { name: "Reports", icon: <FileText size={18} />, path: "/crm/reports" },
// //   ];

// //   // --- EMPLOYEE MENU ---
// //   const employeeMenu = [
// //     { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
// //     { name: "My Tasks", icon: <ClipboardCheck size={18} />, path: "/employee/tasks" },
// //     { name: "Calendar", icon: <CalendarDays size={18} />, path: "/employee/calendar" },
// //     { name: "Time Tracking", icon: <Clock4 size={18} />, path: "/employee/time-tracking" },
// //     { name: "Files", icon: <FileText size={18} />, path: "/employee/files" },
// //     { name: "Performance", icon: <LineChart size={18} />, path: "/employee/performance" },
// //   ];

// //   // --- SELECT MENU BASED ON ROLE & MODULE ---
// //   const getAdminMenu = () => {
// //     switch (activeModule) {
// //       case "hrm":
// //         return hrmMenu;
// //       case "crm":
// //         return crmMenu;
// //       default:
// //         return pmMenu;
// //     }
// //   };

// //   const menuItems = role === "admin" ? getAdminMenu() : employeeMenu;

// //   const bottomMenu =
// //     role === "admin"
// //       ? [
// //           { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
// //           { name: "Help & Support", icon: <LifeBuoy size={18} />, path: "/support" },
// //         ]
// //       : [
// //           { name: "Profile", icon: <User size={18} />, path: "/employee/profile" },
// //           { name: "Help & Support", icon: <LifeBuoy size={18} />, path: "/employee/support" },
// //         ];

// //   return (
// //     <div
// //       className={`h-screen ${isCollapsed ? "w-20" : "w-64"} 
// //       ${baseBg} ${textColor} flex flex-col justify-between py-5 transition-all duration-200 relative`}
// //     >
// //       {/* Collapse Button */}
// //       <button
// //         onClick={() => setIsCollapsed(!isCollapsed)}
// //         className="absolute top-5 -right-3 bg-white border border-gray-300 p-1.5 rounded-full shadow-sm hover:bg-gray-100 text-gray-600 z-20"
// //       >
// //         {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
// //       </button>

// //       {/* Logo Section */}
// //       <div className="flex items-center gap-3 px-5 mb-6">
// //         <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-10 h-10 flex items-center justify-center rounded-md text-white font-bold">
// //           NT
// //         </div>
// //         {!isCollapsed && <span className="font-bold text-lg text-gray-800">NovaTask</span>}
// //       </div>

// //       {/* Module Dropdown (ADMIN ONLY) */}
// //       {role === "admin" && !isCollapsed && (
// //         <div className="relative px-5 mb-6">
// //           <button
// //             onClick={() => setDropdownOpen((p) => !p)}
// //             className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-md flex items-center justify-between text-sm transition"
// //           >
// //             {activeModule === "pm"
// //               ? "Project Management"
// //               : activeModule === "hrm"
// //               ? "Human Resource Management"
// //               : "Customer Relationship Management"}
// //             <ChevronDown size={16} className="text-gray-500" />
// //           </button>

// //           <AnimatePresence>
// //             {dropdownOpen && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: -5 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 exit={{ opacity: 0, y: -5 }}
// //                 transition={{ duration: 0.15 }}
// //                 className="absolute top-11 left-5 right-5 bg-white border border-gray-200 rounded-md shadow-lg z-10"
// //               >
// //                 <div className="flex flex-col">
// //                   {[
// //                     { key: "pm", label: "Project Management" },
// //                     { key: "hrm", label: "Human Resource Management" },
// //                     { key: "crm", label: "Customer Relationship Management" },
// //                   ].map((mod) => (
// //                     <button
// //                       key={mod.key}
// //                       onClick={() => {
// //                         setActiveModule(mod.key);
// //                         setDropdownOpen(false);
// //                       }}
// //                       className={`text-left text-sm px-3 py-2 hover:bg-blue-50 ${
// //                         activeModule === mod.key ? "text-blue-600 font-semibold" : "text-gray-700"
// //                       }`}
// //                     >
// //                       {mod.label}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </div>
// //       )}

// //       {/* Menu */}
// //       <div className="flex-1 overflow-y-auto">
// //         {!isCollapsed && (
// //           <p className="text-xs font-semibold uppercase text-gray-400 px-5 mb-3 tracking-wide">
// //             {role === "admin" ? "Navigation" : "Employee Panel"}
// //           </p>
// //         )}

// //         <nav className="flex flex-col space-y-1">
// //           {menuItems.map((item) => {
// //             const isActive = location.pathname === item.path;
// //             return (
// //               <NavLink
// //                 key={item.name}
// //                 to={item.path}
// //                 className={`flex items-center gap-3 px-5 py-2.5 text-sm rounded-md transition-all 
// //                   ${
// //                     isActive
// //                       ? `${activeBg} ${activeText}`
// //                       : `${hoverBg} ${textColor}`
// //                   } ${isCollapsed ? "justify-center" : ""}`}
// //               >
// //                 {item.icon}
// //                 {!isCollapsed && <span>{item.name}</span>}
// //               </NavLink>
// //             );
// //           })}
// //         </nav>
// //       </div>

// //       {/* Bottom Divider */}
// //       <div className="border-t border-gray-200 my-3 mx-4"></div>

// //       {/* Bottom Menu */}
// //       <div>
// //         {bottomMenu.map((item) => {
// //           const isActive = location.pathname === item.path;
// //           return (
// //             <NavLink
// //               key={item.name}
// //               to={item.path}
// //               className={`flex items-center gap-3 px-5 py-2.5 text-sm rounded-md transition-all 
// //                 ${
// //                   isActive
// //                     ? `${activeBg} ${activeText}`
// //                     : `${hoverBg} ${textColor}`
// //                 } ${isCollapsed ? "justify-center" : ""}`}
// //             >
// //               {item.icon}
// //               {!isCollapsed && <span>{item.name}</span>}
// //             </NavLink>
// //           );
// //         })}

// //         <button
// //           onClick={handleLogout}
// //           className={`flex items-center gap-3 px-5 py-2.5 text-sm text-gray-500 hover:text-red-500 hover:bg-gray-100 w-full rounded-md transition ${
// //             isCollapsed ? "justify-center" : ""
// //           }`}
// //         >
// //           <LogOut size={18} />
// //           {!isCollapsed && <span>Logout</span>}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// import { useState, useEffect } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   FolderKanban,
//   ClipboardCheck,
//   Users,
//   CalendarDays,
//   FileText,
//   BarChart2,
//   LineChart,
//   Settings,
//   LifeBuoy,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Clock4,
//   User,
//   Briefcase,
//   Handshake,
//   ChevronDown,
//   Target,
// } from "lucide-react";
// import { jwtDecode } from "jwt-decode";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Sidebar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [role, setRole] = useState(null);
//   const [activeModule, setActiveModule] = useState("pm");
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // 🧩 Decode Role from JWT
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setRole(decoded.role || "employee");
//       } catch {
//         setRole("employee");
//       }
//     } else {
//       setRole("employee");
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login", { replace: true });
//   };

//   // 🌙 --- DARK THEME COLORS ---
//   const baseBg = "bg-gray-900 border-r border-gray-800";
//   const hoverBg = "hover:bg-gray-700";
//   const activeBg = "bg-indigo-600/30 border-l-4 border-indigo-500";
//   const textColor = "text-gray-300";
//   const activeText = "text-indigo-400 font-semibold";

//   // --- MENUS ---
//   const pmMenu = [
//     { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
//     { name: "Projects", icon: <FolderKanban size={18} />, path: "/projects" },
//     { name: "Tasks", icon: <ClipboardCheck size={18} />, path: "/tasks" },
//     { name: "Team", icon: <Users size={18} />, path: "/team" },
//     { name: "Calendar", icon: <CalendarDays size={18} />, path: "/calendar" },
//     { name: "Time Tracking", icon: <Clock4 size={18} />, path: "/time-tracking" },
//     { name: "Files", icon: <FileText size={18} />, path: "/files" },
//     { name: "Performance", icon: <LineChart size={18} />, path: "/performance" },
//   ];

//   const hrmMenu = [
//     { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/hr/dashboard" },
//     { name: "Employees", icon: <Users size={18} />, path: "/hr/employees" },
//     { name: "Attendance", icon: <Clock4 size={18} />, path: "/hr/attendance" },
//     { name: "Leaves", icon: <CalendarDays size={18} />, path: "/hr/leaves" },
//     { name: "Payroll", icon: <Briefcase size={18} />, path: "/hr/payroll" },
//     { name: "Reports", icon: <BarChart2 size={18} />, path: "/hr/reports" },
//   ];

//   const crmMenu = [
//     { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/crm/dashboard" },
//     { name: "Clients", icon: <Handshake size={18} />, path: "/crm/clients" },
//     { name: "Leads", icon: <Target size={18} />, path: "/crm/leads" },
//     { name: "Deals", icon: <FolderKanban size={18} />, path: "/crm/deals" },
//     { name: "Campaigns", icon: <BarChart2 size={18} />, path: "/crm/campaigns" },
//     { name: "Reports", icon: <FileText size={18} />, path: "/crm/reports" },
//   ];

//   const employeeMenu = [
//     { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
//     { name: "My Tasks", icon: <ClipboardCheck size={18} />, path: "/employee/tasks" },
//     { name: "Calendar", icon: <CalendarDays size={18} />, path: "/employee/calendar" },
//     { name: "Time Tracking", icon: <Clock4 size={18} />, path: "/employee/time-tracking" },
//     { name: "Files", icon: <FileText size={18} />, path: "/employee/files" },
//     { name: "Performance", icon: <LineChart size={18} />, path: "/employee/performance" },
//   ];

//   const getAdminMenu = () => {
//     switch (activeModule) {
//       case "hrm":
//         return hrmMenu;
//       case "crm":
//         return crmMenu;
//       default:
//         return pmMenu;
//     }
//   };

//   const menuItems = role === "admin" ? getAdminMenu() : employeeMenu;

//   const bottomMenu =
//     role === "admin"
//       ? [
//           { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
//           { name: "Help & Support", icon: <LifeBuoy size={18} />, path: "/support" },
//         ]
//       : [
//           { name: "Profile", icon: <User size={18} />, path: "/employee/profile" },
//           { name: "Help & Support", icon: <LifeBuoy size={18} />, path: "/employee/support" },
//         ];

//   return (
//     <div
//       className={`h-screen ${isCollapsed ? "w-20" : "w-64"} 
//       ${baseBg} ${textColor} flex flex-col justify-between py-5 transition-all duration-200 relative`}
//     >
//       {/* Collapse Button */}
//       <button
//         onClick={() => setIsCollapsed(!isCollapsed)}
//         className="absolute top-5 -right-3 bg-gray-800 border border-gray-700 p-1.5 rounded-full shadow-md hover:bg-gray-700 text-gray-300 z-20"
//       >
//         {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
//       </button>

//       {/* Logo */}
//       <div className="flex items-center gap-3 px-5 mb-6">
//         <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-10 h-10 flex items-center justify-center rounded-md text-white font-bold shadow-md">
//           NT
//         </div>
//         {!isCollapsed && <span className="font-bold text-lg text-white">NovaTask</span>}
//       </div>

//       {/* Module Dropdown (ADMIN ONLY) */}
//       {role === "admin" && !isCollapsed && (
//         <div className="relative px-5 mb-6">
//           <button
//             onClick={() => setDropdownOpen((p) => !p)}
//             className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 font-medium py-2 px-3 rounded-md flex items-center justify-between text-sm transition"
//           >
//             {activeModule === "pm"
//               ? "Project Management"
//               : activeModule === "hrm"
//               ? "Human Resource Management"
//               : "Customer Relationship Management"}
//             <ChevronDown size={16} className="text-gray-400" />
//           </button>

//           <AnimatePresence>
//             {dropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: -5 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -5 }}
//                 transition={{ duration: 0.15 }}
//                 className="absolute top-11 left-5 right-5 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10"
//               >
//                 <div className="flex flex-col">
//                   {[ 
//                     { key: "pm", label: "Project Management" },
//                     { key: "hrm", label: "Human Resource Management" },
//                     { key: "crm", label: "Customer Relationship Management" },
//                   ].map((mod) => (
//                     <button
//                       key={mod.key}
//                       onClick={() => {
//                         setActiveModule(mod.key);
//                         setDropdownOpen(false);
//                       }}
//                       className={`text-left text-sm px-3 py-2 hover:bg-gray-700 ${
//                         activeModule === mod.key
//                           ? "text-indigo-400 font-semibold"
//                           : "text-gray-300"
//                       }`}
//                     >
//                       {mod.label}
//                     </button>
//                   ))}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       )}

//       {/* Menu */}
//       <div className="flex-1 overflow-y-auto">
//         {!isCollapsed && (
//           <p className="text-xs font-semibold uppercase text-gray-500 px-5 mb-3 tracking-wide">
//             {role === "admin" ? "Navigation" : "Employee Panel"}
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
//                   ${
//                     isActive
//                       ? `${activeBg} ${activeText}`
//                       : `${hoverBg} ${textColor}`
//                   } ${isCollapsed ? "justify-center" : ""}`}
//               >
//                 {item.icon}
//                 {!isCollapsed && <span>{item.name}</span>}
//               </NavLink>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Bottom Divider */}
//       <div className="border-t border-gray-700 my-3 mx-4"></div>

//       {/* Bottom Menu */}
//       <div>
//         {bottomMenu.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <NavLink
//               key={item.name}
//               to={item.path}
//               className={`flex items-center gap-3 px-5 py-2.5 text-sm rounded-md transition-all 
//                 ${
//                   isActive
//                     ? `${activeBg} ${activeText}`
//                     : `${hoverBg} ${textColor}`
//                 } ${isCollapsed ? "justify-center" : ""}`}
//             >
//               {item.icon}
//               {!isCollapsed && <span>{item.name}</span>}
//             </NavLink>
//           );
//         })}

//         <button
//           onClick={handleLogout}
//           className={`flex items-center gap-3 px-5 py-2.5 text-sm text-red-400 hover:text-white hover:bg-red-600/40 w-full rounded-md transition ${
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
  LineChart,
  Settings,
  LifeBuoy,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Clock4,
  User,
  Briefcase,
  Handshake,
  ChevronDown,
  Target,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [role, setRole] = useState(null);
  const [activeModule, setActiveModule] = useState("pm");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Decode Role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role || "employee");
      } catch {
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

  // --- STYLING VARIABLES ---
  const baseBg =
    "bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 backdrop-blur-md border-r border-gray-800/70";
  const hoverBg = "hover:bg-gray-800/70";
  const activeBg =
    "bg-indigo-600/10 border-l-4 border-indigo-500/80 shadow-[inset_0_0_10px_rgba(99,102,241,0.3)]";
  const textColor = "text-gray-300";
  const activeText = "text-indigo-400 font-semibold";

  // --- MENUS ---
  const pmMenu = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { name: "Projects", icon: <FolderKanban size={18} />, path: "/projects" },
    { name: "Tasks", icon: <ClipboardCheck size={18} />, path: "/tasks" },
    { name: "Team", icon: <Users size={18} />, path: "/team" },
    { name: "Calendar", icon: <CalendarDays size={18} />, path: "/calendar" },
    { name: "Time Tracking", icon: <Clock4 size={18} />, path: "/time-tracking" },
    { name: "Files", icon: <FileText size={18} />, path: "/files" },
    { name: "Performance", icon: <LineChart size={18} />, path: "/performance" },
  ];

  const hrmMenu = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/hr/dashboard" },
    { name: "Employees", icon: <Users size={18} />, path: "/hr/employees" },
    { name: "Attendance", icon: <Clock4 size={18} />, path: "/hr/attendance" },
    { name: "Leaves", icon: <CalendarDays size={18} />, path: "/hr/leaves" },
    { name: "Payroll", icon: <Briefcase size={18} />, path: "/hr/payroll" },
    { name: "Reports", icon: <BarChart2 size={18} />, path: "/hr/reports" },
  ];

  const crmMenu = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/crm/dashboard" },
    { name: "Clients", icon: <Handshake size={18} />, path: "/crm/clients" },
    { name: "Leads", icon: <Target size={18} />, path: "/crm/leads" },
    { name: "Deals", icon: <FolderKanban size={18} />, path: "/crm/deals" },
    { name: "Campaigns", icon: <BarChart2 size={18} />, path: "/crm/campaigns" },
    { name: "Reports", icon: <FileText size={18} />, path: "/crm/reports" },
  ];

  const employeeMenu = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { name: "My Tasks", icon: <ClipboardCheck size={18} />, path: "/employee/tasks" },
    { name: "Calendar", icon: <CalendarDays size={18} />, path: "/employee/calendar" },
    { name: "Time Tracking", icon: <Clock4 size={18} />, path: "/employee/time-tracking" },
    { name: "Files", icon: <FileText size={18} />, path: "/employee/files" },
    { name: "Performance", icon: <LineChart size={18} />, path: "/employee/performance" },
  ];

  const getAdminMenu = () => {
    switch (activeModule) {
      case "hrm":
        return hrmMenu;
      case "crm":
        return crmMenu;
      default:
        return pmMenu;
    }
  };

  const menuItems = role === "admin" ? getAdminMenu() : employeeMenu;

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

  return (
    <div
      className={`h-screen ${isCollapsed ? "w-20" : "w-64"} 
      ${baseBg} ${textColor} flex flex-col justify-between py-5 transition-all duration-300 relative shadow-[0_0_15px_rgba(0,0,0,0.4)]`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-5 -right-3 bg-gray-800/80 border border-gray-700/70 p-1.5 rounded-full shadow-md hover:bg-gray-700/70 text-gray-300 backdrop-blur-md transition"
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-10 h-10 flex items-center justify-center rounded-md text-white font-bold shadow-lg shadow-indigo-600/30">
          NT
        </div>
        {!isCollapsed && <span className="font-bold text-lg text-white tracking-wide">NovaTask</span>}
      </div>

      {/* Module Dropdown (ADMIN ONLY) */}
      {role === "admin" && !isCollapsed && (
        <div className="relative px-5 mb-6">
          <button
            onClick={() => setDropdownOpen((p) => !p)}
            className="w-full bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/60 text-gray-200 font-medium py-2 px-3 rounded-md flex items-center justify-between text-sm transition-all"
          >
            {activeModule === "pm"
              ? "Project Management"
              : activeModule === "hrm"
              ? "Human Resource Management"
              : "Customer Relationship Management"}
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute top-11 left-5 right-5 bg-gray-800/80 border border-gray-700/70 rounded-md shadow-xl backdrop-blur-md z-10"
              >
                <div className="flex flex-col">
                  {[
                    { key: "pm", label: "Project Management" },
                    { key: "hrm", label: "Human Resource Management" },
                    { key: "crm", label: "Customer Relationship Management" },
                  ].map((mod) => (
                    <button
                      key={mod.key}
                      onClick={() => {
                        setActiveModule(mod.key);
                        setDropdownOpen(false);
                      }}
                      className={`text-left text-sm px-3 py-2 hover:bg-gray-700/70 transition-all ${
                        activeModule === mod.key
                          ? "text-indigo-400 font-semibold"
                          : "text-gray-300"
                      }`}
                    >
                      {mod.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Menu */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-900">
        {!isCollapsed && (
          <p className="text-xs font-semibold uppercase text-gray-500 px-5 mb-3 tracking-wide">
            {role === "admin" ? "Navigation" : "Employee Panel"}
          </p>
        )}

        <nav className="flex flex-col space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm rounded-md transition-all duration-150
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

      <div className="border-t border-gray-800/70 my-3 mx-4"></div>

      {/* Bottom Menu */}
      <div>
        {bottomMenu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm rounded-md transition-all duration-150 
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

        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-5 py-2.5 text-sm text-red-400 hover:text-white hover:bg-red-600/30 w-full rounded-md transition-all ${
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
