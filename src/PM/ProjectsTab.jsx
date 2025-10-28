import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  FiSearch,
  FiPlus,
  FiFilter,
  FiFolder,
  FiCalendar,
  FiX,
  FiUpload,
  FiTag,
  FiClock,
  FiLayers,
  FiFlag,
} from "react-icons/fi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    client: "",
    status: "Pending",
    startDate: "",
    endDate: "",
    estimatedTime: "",
    tags: "",
    priority: "Medium",
    relationship: "",
    projectDocuments: [],
  });

  const handleProjectDocsChange = (e) => {
    const files = Array.from(e.target.files);
    setNewProject((prev) => ({
      ...prev,
      projectDocuments: [...prev.projectDocuments, ...files],
    }));
  };

  const handleRemoveProjectDoc = (index) => {
    setNewProject((prev) => ({
      ...prev,
      projectDocuments: prev.projectDocuments.filter((_, i) => i !== index),
    }));
  };

  const statusOptions = ["Pending", "In Progress", "Completed"];
  const priorityOptions = ["Low", "Medium", "High"];

  // 📦 Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const { data } = await axios.get(
          "http://localhost:5000/Project/getProjects"
        );
        if (data.success) setProjects(data.projects);
        else toast.error(data.message || "Failed to fetch projects");
      } catch (error) {
        console.error("❌ Error fetching projects:", error);
        toast.error("Error fetching projects");
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(
    (p) =>
      (filter === "All" || p.status === filter) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  // ➕ Add Project
  const handleAddProject = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", newProject.name);
      formData.append("client", newProject.client);
      formData.append("description", newProject.description);
      formData.append("startDate", newProject.startDate);
      formData.append("endDate", newProject.endDate);
      formData.append("status", newProject.status);
      formData.append("priority", newProject.priority);
      formData.append("tags", newProject.tags);
      formData.append("relationship", newProject.relationship);
      formData.append("estimatedTime", newProject.estimatedTime);
      newProject.projectDocuments.forEach((file) =>
        formData.append("documents", file)
      );

      toast.loading("Creating project...", { id: "createProject" });

      const { data } = await axios.post(
        "http://localhost:5000/Project/addProject",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success("Project added successfully!", { id: "createProject" });
        setProjects((prev) => [...prev, data.project]);
        setDrawerOpen(false);
        setNewProject({
          name: "",
          description: "",
          client: "",
          status: "Pending",
          startDate: "",
          endDate: "",
          estimatedTime: "",
          tags: "",
          priority: "Medium",
          relationship: "",
          projectDocuments: [],
        });
      } else {
        toast.error(data.message || "Failed to add project", {
          id: "createProject",
        });
      }
    } catch (error) {
      console.error("❌ Error adding project:", error);
      toast.error("Server error: Could not add project", {
        id: "createProject",
      });
    }
  };

  // ✏️ View / Edit
  const handleViewDetails = async (projectId) => {
    try {
      toast.loading("Fetching project details...", { id: "fetchProj" });
      const { data } = await axios.get(
        `http://localhost:5000/Project/getProjectById/${projectId}`
      );

      if (data.success) {
        toast.dismiss("fetchProj");
        const p = data.project;
        setNewProject({
          name: p.name,
          client: p.client || "",
          description: p.description || "",
          startDate: p.startDate?.slice(0, 10) || "",
          endDate: p.deadline?.slice(0, 10) || "",
          estimatedTime: p.estimatedTime || "",
          status: p.status || "Pending",
          priority: p.priority || "Medium",
          tags: p.tags?.join(", ") || "",
          relationship: p.relationship || "",
          projectDocuments: p.documents || [],
        });
        setCurrentProjectId(projectId);
        setEditMode(true);
        setDrawerOpen(true);
      } else toast.error("Failed to load project", { id: "fetchProj" });
    } catch (error) {
      console.error("❌ Error fetching project:", error);
      toast.error("Server error while fetching project", { id: "fetchProj" });
    }
  };

  // 🔄 Update Project
  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Updating project...", { id: "updateProj" });
      const updatedData = {
        name: newProject.name,
        client: newProject.client,
        description: newProject.description,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        status: newProject.status,
        priority: newProject.priority,
        tags: newProject.tags,
        relationship: newProject.relationship,
        estimatedTime: newProject.estimatedTime,
      };
      const { data } = await axios.put(
        `http://localhost:5000/Project/updateProject/${currentProjectId}`,
        updatedData
      );
      if (data.success) {
        toast.success("Project updated!", { id: "updateProj" });
        setProjects((prev) =>
          prev.map((proj) =>
            proj._id === data.project._id ? data.project : proj
          )
        );
        setDrawerOpen(false);
        setEditMode(false);
        setCurrentProjectId(null);
      } else toast.error("Failed to update project", { id: "updateProj" });
    } catch (error) {
      console.error("❌ Error updating project:", error);
      toast.error("Server error updating project", { id: "updateProj" });
    }
  };

  // 🗑 Delete Project
  const handleDeleteProject = async () => {
    try {
      toast.loading("Deleting project...", { id: "deleteProj" });
      const { data } = await axios.delete(
        `http://localhost:5000/Project/deleteProject/${projectToDelete._id}`
      );
      if (data.success) {
        toast.success("Project deleted!", { id: "deleteProj" });
        setProjects((prev) =>
          prev.filter((p) => p._id !== projectToDelete._id)
        );
        setShowDeleteModal(false);
      } else toast.error("Failed to delete", { id: "deleteProj" });
    } catch (error) {
      console.error("❌ Error deleting project:", error);
      toast.error("Server error deleting project", { id: "deleteProj" });
    }
  };

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString("en-US") : "—");

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-800">Projects</h1>
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
          >
            <FiPlus size={16} /> New Project
          </button>
        </header>

        {/* Filters */}
        <div className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
            <FiSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <FiFilter className="text-gray-500" size={18} />
            <select
              className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option>All</option>
              {statusOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <main className="flex-1 overflow-y-auto p-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              No projects found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        {project.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Client: {project.client || "—"}
                      </p>
                    </div>
                    <button
                      className="text-red-400 hover:text-gray-600"
                      onClick={() => {
                        setProjectToDelete(project);
                        setShowDeleteModal(true);
                      }}
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="w-16 h-16">
                      <CircularProgressbar
                        value={project.progress || 0}
                        text={`${project.progress || 0}%`}
                        styles={buildStyles({
                          pathColor: "#3b82f6",
                          textColor: "#374151",
                          trailColor: "#e5e7eb",
                        })}
                      />
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <FiFolder className="inline text-gray-400" />{" "}
                        {project.status}
                      </p>
                      <p>
                        <FiCalendar className="inline text-gray-400" />{" "}
                        {formatDate(project.deadline || project.endDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-100">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : project.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {project.status}
                    </span>
                    <button
                      className="text-blue-600 text-sm font-medium hover:underline"
                      onClick={() => handleViewDetails(project._id)}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-6 py-4 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800">
            {editMode ? "Edit Project" : "New Project"}
          </h2>
          <button
            onClick={() => {
              setDrawerOpen(false);
              setEditMode(false);
              setCurrentProjectId(null);
              setNewProject({
                name: "",
                description: "",
                client: "",
                status: "Pending",
                startDate: "",
                endDate: "",
                estimatedTime: "",
                tags: "",
                priority: "Medium",
                relationship: "",
                projectDocuments: [],
              });
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        <form
          onSubmit={editMode ? handleUpdateProject : handleAddProject}
          className="p-6 overflow-y-auto h-[calc(100%-64px)] space-y-5"
        >
          <div>
            <label className="text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              name="name"
              value={newProject.name}
              onChange={handleInputChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={newProject.description}
              onChange={handleInputChange}
              rows="3"
              required
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Client Name
            </label>
            <input
              name="client"
              value={newProject.client}
              onChange={handleInputChange}
              placeholder="e.g., TechNova Inc."
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={newProject.startDate}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={newProject.endDate}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <FiClock /> Estimated Time (hours)
            </label>
            <input
              type="number"
              name="estimatedTime"
              value={newProject.estimatedTime}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <FiTag /> Tags
            </label>
            <input
              name="tags"
              value={newProject.tags}
              onChange={handleInputChange}
              placeholder="e.g., UI, Backend, Dashboard"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FiFlag /> Priority
              </label>
              <select
                name="priority"
                value={newProject.priority}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {priorityOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FiFolder /> Status
              </label>
              <select
                name="status"
                value={newProject.status}
                onChange={handleInputChange}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {statusOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
              <FiLayers /> Relationship
            </label>
            <input
              name="relationship"
              value={newProject.relationship}
              onChange={handleInputChange}
              placeholder="Linked project or department"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1 mb-2">
              <FiUpload /> Project Documents
            </label>
            <label
              htmlFor="projectDocs"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-400 transition group bg-gray-50"
            >
              <FiUpload
                size={28}
                className="text-gray-400 group-hover:text-blue-500 transition"
              />
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium text-blue-600">
                  Click to upload
                </span>{" "}
                or drag & drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PDF, DOCX, ZIP (max 10 MB)
              </p>
              <input
                id="projectDocs"
                type="file"
                multiple
                onChange={handleProjectDocsChange}
                className="hidden"
              />
            </label>

            {newProject.projectDocuments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {newProject.projectDocuments.map((file, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs px-2 py-1 rounded-full"
                  >
                    {file.name || file.split("/").pop()}
                    <button
                      type="button"
                      onClick={() => handleRemoveProjectDoc(index)}
                      className="text-blue-500 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[70]">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FiX size={20} />
            </button>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiFolder className="text-red-600" size={28} />
                </div>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Project?
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900">
                  {projectToDelete?.name}
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProject}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
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
