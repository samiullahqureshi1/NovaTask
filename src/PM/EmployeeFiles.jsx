// import { useState, useEffect } from "react";
// import Sidebar from "../component/Sidebar";
// import {
//   FiFileText,
//   FiUpload,
//   FiSearch,
//   FiFilter,
//   FiImage,
//   FiVideo,
//   FiFile,
//   FiDownload,
//   FiTrash2,
//   FiX,
// } from "react-icons/fi";
// import axios from "axios";

// export default function EmployeeFiles() {
//   const [files, setFiles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("All");
//   const [uploading, setUploading] = useState(false);
//   const [deleting, setDeleting] = useState(null);
//   const [fileToDelete, setFileToDelete] = useState(null); 

//   const fileTypes = ["All", "Document", "Image", "Video"];
//   const userId = localStorage.getItem("employeeId");
//   const userName = localStorage.getItem("employeeName") || "Employee User";

//   useEffect(() => {
//     if (userId) fetchFiles();
//   }, [userId]);

//   const fetchFiles = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/files/employee?userId=${userId}`
//       );
//       setFiles(res.data);
//     } catch (err) {
//       console.error("Error fetching files:", err);
//     }
//   };

//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("userId", userId);
//     formData.append("userName", userName);

//     try {
//       setUploading(true);
//       await axios.post("http://localhost:5000/api/files/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       fetchFiles();
//     } catch (err) {
//       console.error("Upload failed:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const openDeleteModal = (file) => setFileToDelete(file);

//   const confirmDelete = async () => {
//     if (!fileToDelete) return;

//     try {
//       setDeleting(fileToDelete._id);
//       await axios.delete(`http://localhost:5000/api/files/${fileToDelete._id}`);
//       setFiles((prev) => prev.filter((f) => f._id !== fileToDelete._id));
//       setFileToDelete(null);
//     } catch (err) {
//       console.error("Delete failed:", err);
//     } finally {
//       setDeleting(null);
//     }
//   };

//   const cancelDelete = () => setFileToDelete(null);

//   const filteredFiles = files.filter(
//     (f) =>
//       (typeFilter === "All" || f.type === typeFilter) &&
//       f.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const getFileIcon = (type) => {
//     switch (type) {
//       case "Image":
//         return <FiImage size={22} className="text-blue-500" />;
//       case "Video":
//         return <FiVideo size={22} className="text-purple-500" />;
//       case "Document":
//       default:
//         return <FiFile size={22} className="text-green-500" />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
//           <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
//             <FiFileText size={22} /> My Files
//           </h1>

//           <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md cursor-pointer transition">
//             <FiUpload size={16} /> {uploading ? "Uploading..." : "Upload File"}
//             <input
//               type="file"
//               className="hidden"
//               onChange={handleUpload}
//               disabled={uploading}
//             />
//           </label>
//         </header>

//         <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
//           <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
//             <FiSearch className="text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search files..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
//             />
//           </div>

//           <div className="flex items-center gap-3">
//             <FiFilter className="text-gray-500" size={18} />
//             <select
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//               className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {fileTypes.map((t) => (
//                 <option key={t}>{t}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <main className="flex-1 overflow-y-auto p-8">
//           {filteredFiles.length === 0 ? (
//             <div className="text-center text-gray-500 mt-20">
//               No files found 😕
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredFiles.map((file) => (
//                 <div
//                   key={file._id}
//                   className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="bg-gray-100 p-3 rounded-lg">
//                       {getFileIcon(file.type)}
//                     </div>
//                     <div>
//                       <h2 className="font-bold text-gray-800 text-sm truncate w-36">
//                         {file.name}
//                       </h2>
//                       <p className="text-xs text-gray-500 mt-0.5">{file.size}</p>
//                     </div>
//                   </div>

//                   <div className="mt-4 text-sm text-gray-600 space-y-1">
//                     <p>
//                       <span className="font-medium text-gray-700">Date:</span>{" "}
//                       {new Date(file.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>

//                   <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-100">
//                     <a
//                       href={file.url}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="flex items-center gap-1 text-blue-600 text-xs font-semibold hover:underline"
//                     >
//                       <FiDownload size={14} /> Download
//                     </a>
//                     <button
//                       onClick={() => openDeleteModal(file)}
//                       disabled={deleting === file._id}
//                       className="flex items-center gap-1 text-red-500 text-xs font-semibold hover:underline"
//                     >
//                       <FiTrash2 size={14} />
//                       {deleting === file._id ? "Deleting..." : "Delete"}
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>

//       {fileToDelete && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-96">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-bold text-gray-800">
//                 Confirm Delete
//               </h2>
//               <button
//                 onClick={cancelDelete}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <FiX size={18} />
//               </button>
//             </div>

//             <p className="text-sm text-gray-600 mb-6">
//               Are you sure you want to delete{" "}
//               <span className="font-medium text-gray-800">
//                 {fileToDelete.name}
//               </span>
//               ? This action cannot be undone.
//             </p>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={cancelDelete}
//                 className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 disabled={deleting === fileToDelete._id}
//                 className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
//               >
//                 {deleting === fileToDelete._id ? "Deleting..." : "Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import {
  FiFileText,
  FiUpload,
  FiSearch,
  FiFilter,
  FiImage,
  FiVideo,
  FiFile,
  FiDownload,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import axios from "axios";

export default function EmployeeFiles() {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [fileToDelete, setFileToDelete] = useState(null); 

  const fileTypes = ["All", "Document", "Image", "Video"];
  const userId = localStorage.getItem("employeeId");
  const userName = localStorage.getItem("employeeName") || "Employee User";

  useEffect(() => {
    if (userId) fetchFiles();
  }, [userId]);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/files/employee?userId=${userId}`
      );
      setFiles(res.data);
    } catch (err) {
      console.error("Error fetching files:", err);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("userName", userName);

    try {
      setUploading(true);
      await axios.post("http://localhost:5000/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchFiles();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const openDeleteModal = (file) => setFileToDelete(file);

  const confirmDelete = async () => {
    if (!fileToDelete) return;

    try {
      setDeleting(fileToDelete._id);
      await axios.delete(`http://localhost:5000/api/files/${fileToDelete._id}`);
      setFiles((prev) => prev.filter((f) => f._id !== fileToDelete._id));
      setFileToDelete(null);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(null);
    }
  };

  const cancelDelete = () => setFileToDelete(null);

  const filteredFiles = files.filter(
    (f) =>
      (typeFilter === "All" || f.type === typeFilter) &&
      f.name.toLowerCase().includes(search.toLowerCase())
  );

  const getFileIcon = (type) => {
    switch (type) {
      case "Image":
        return <FiImage size={22} className="text-blue-500" />;
      case "Video":
        return <FiVideo size={22} className="text-purple-500" />;
      case "Document":
      default:
        return <FiFile size={22} className="text-green-500" />;
    }
  };

  return (
   <div className="flex h-screen bg-gray-950 overflow-hidden text-gray-200">
  <Sidebar />

  <div className="flex-1 flex flex-col">
    {/* Header */}
    <header className="flex justify-between items-center bg-gray-900/90 border-b border-gray-800 px-8 py-4 shadow-lg backdrop-blur-sm">
      <h1 className="text-2xl font-extrabold text-gray-100 flex items-center gap-2">
        <FiFileText size={22} /> My Files
      </h1>

      <label className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md cursor-pointer transition">
        <FiUpload size={16} /> {uploading ? "Uploading..." : "Upload File"}
        <input
          type="file"
          className="hidden"
          onChange={handleUpload}
          disabled={uploading}
        />
      </label>
    </header>

    {/* Filters */}
    <div className="bg-gray-900/80 border-b border-gray-800 px-8 py-4 flex flex-wrap items-center justify-between gap-4 backdrop-blur-sm">
      <div className="flex items-center bg-gray-800 rounded-md px-3 py-2 w-full max-w-sm">
        <FiSearch className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none ml-2 text-sm text-gray-300 w-full placeholder-gray-500"
        />
      </div>

      <div className="flex items-center gap-3">
        <FiFilter className="text-gray-400" size={18} />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-200"
        >
          {fileTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>

    {/* Main Content */}
    <main className="flex-1 overflow-y-auto p-8 custom-scroll">
      {filteredFiles.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">No files found 😕</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFiles.map((file) => (
            <div
              key={file._id}
              className="bg-gray-900/80 border border-gray-800 rounded-xl shadow-md hover:shadow-indigo-600/10 transition p-6 flex flex-col justify-between backdrop-blur-sm"
            >
              {/* File Header */}
              <div className="flex items-center gap-3">
                <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                  {getFileIcon(file.type)}
                </div>
                <div>
                  <h2 className="font-bold text-gray-100 text-sm truncate w-36">
                    {file.name}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">{file.size}</p>
                </div>
              </div>

              {/* File Info */}
              <div className="mt-4 text-sm text-gray-400 space-y-1">
                <p>
                  <span className="font-medium text-gray-500">Date:</span>{" "}
                  {new Date(file.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-800">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-indigo-400 text-xs font-semibold hover:underline"
                >
                  <FiDownload size={14} /> Download
                </a>
                <button
                  onClick={() => openDeleteModal(file)}
                  disabled={deleting === file._id}
                  className="flex items-center gap-1 text-red-400 text-xs font-semibold hover:text-red-300 transition"
                >
                  <FiTrash2 size={14} />
                  {deleting === file._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  </div>

  {/* Delete Confirmation Modal */}
  {fileToDelete && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fadeIn">
      <div className="bg-gray-900/90 border border-gray-800 rounded-2xl shadow-2xl p-6 w-96 text-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-100">Confirm Delete</h2>
          <button
            onClick={cancelDelete}
            className="text-gray-500 hover:text-gray-300 transition"
          >
            <FiX size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-200">
            {fileToDelete.name}
          </span>
          ? This action{" "}
          <span className="text-red-400 font-medium">cannot be undone.</span>
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={cancelDelete}
            className="px-4 py-2 text-sm border border-gray-700 rounded-md text-gray-400 hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            disabled={deleting === fileToDelete._id}
            className="px-4 py-2 text-sm bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white rounded-md font-medium shadow-md disabled:opacity-50 transition"
          >
            {deleting === fileToDelete._id ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
}
