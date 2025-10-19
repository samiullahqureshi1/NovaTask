import { useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  FiFileText,
  FiUpload,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiDownload,
  FiTrash2,
  FiImage,
  FiVideo,
  FiFile,
} from "react-icons/fi";

export default function Files() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  // 🧩 Sample File Data (replace later with API)
  const files = [
    {
      id: 1,
      name: "Project Plan.pdf",
      type: "Document",
      size: "1.2 MB",
      uploadedBy: "Arjun Mehta",
      date: "2025-10-15",
    },
    {
      id: 2,
      name: "Team Photo.png",
      type: "Image",
      size: "800 KB",
      uploadedBy: "Priya Sharma",
      date: "2025-10-16",
    },
    {
      id: 3,
      name: "Demo Video.mp4",
      type: "Video",
      size: "24 MB",
      uploadedBy: "Vikram Singh",
      date: "2025-10-17",
    },
    {
      id: 4,
      name: "Tasks.xlsx",
      type: "Document",
      size: "600 KB",
      uploadedBy: "Ravi Patel",
      date: "2025-10-18",
    },
    {
      id: 5,
      name: "Logo.svg",
      type: "Image",
      size: "150 KB",
      uploadedBy: "Simran Kaur",
      date: "2025-10-19",
    },
  ];

  const fileTypes = ["All", "Document", "Image", "Video"];

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
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <FiFileText size={22} /> Files
          </h1>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
            <FiUpload size={16} /> Upload File
          </button>
        </header>

        {/* Filters */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
            <FiSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-3">
            <FiFilter className="text-gray-500" size={18} />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fileTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Files Grid */}
        <main className="flex-1 overflow-y-auto p-8">
          {filteredFiles.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              No files found 😕
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
                >
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <h2 className="font-bold text-gray-800 text-sm truncate w-36">
                          {file.name}
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {file.size}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FiMoreVertical size={16} />
                    </button>
                  </div>

                  {/* File Info */}
                  <div className="mt-4 text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium text-gray-700">
                        Uploaded by:
                      </span>{" "}
                      {file.uploadedBy}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Date:</span>{" "}
                      {file.date}
                    </p>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-100">
                    <button className="flex items-center gap-1 text-blue-600 text-xs font-semibold hover:underline">
                      <FiDownload size={14} /> Download
                    </button>
                    <button className="flex items-center gap-1 text-red-500 text-xs font-semibold hover:underline">
                      <FiTrash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
