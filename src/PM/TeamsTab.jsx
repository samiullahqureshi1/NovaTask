import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import {
  FiPlus,
  FiSearch,
  FiUsers,
  FiMail,
  FiPhone,
  FiUser,
  FiFilter,
  FiMoreVertical,
  FiCircle,
  FiX,
  FiUpload,
} from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

export default function Team() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentEmpId, setCurrentEmpId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [empToDelete, setEmpToDelete] = useState(null);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    department: "",
    role: "",
    joiningDate: "",
    salary: "",
    avatar: null,
    documents: [],
  });

  // 🔹 Fetch All Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/Employee/getEmployee"
        );
        if (data.success) {
          setEmployees(data.employees);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("❌ Error fetching employees:", error);
        toast.error("Error loading employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // 🔹 Filter logic
  const roles = ["All", "Admin", "Manager", "Employee"];
  const filteredMembers = employees.filter(
    (m) =>
      (roleFilter === "All" || m.role === roleFilter) &&
      m.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Handle input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setNewEmployee((prev) => ({ ...prev, avatar: files[0] }));
    } else if (name === "documents") {
      setNewEmployee((prev) => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(files)],
      }));
    } else {
      setNewEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveDoc = (index) => {
    setNewEmployee((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  // 🔹 Add / Update Employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in newEmployee) {
        if (key === "documents") {
          newEmployee.documents.forEach((doc) =>
            formData.append("documents", doc)
          );
        } else {
          formData.append(key, newEmployee[key]);
        }
      }

      toast.loading(editMode ? "Updating employee..." : "Adding employee...", {
        id: "empAction",
      });

      const url = editMode
        ? `http://localhost:5000/Employee/updateEmployee/${currentEmpId}`
        : "http://localhost:5000/Employee/addEmployee";

      const method = editMode ? axios.put : axios.post;
      const { data } = await method(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(
          editMode ? "Employee updated successfully!" : "Employee added!",
          { id: "empAction" }
        );
        if (editMode) {
          setEmployees((prev) =>
            prev.map((e) => (e._id === data.employee._id ? data.employee : e))
          );
        } else {
          setEmployees((prev) => [data.employee, ...prev]);
        }
        setDrawerOpen(false);
        resetForm();
      } else {
        toast.error(data.message, { id: "empAction" });
      }
    } catch (error) {
      console.error("❌ Error saving employee:", error);
      toast.error("Server error", { id: "empAction" });
    }
  };

  const resetForm = () => {
    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      dob: "",
      department: "",
      role: "",
      joiningDate: "",
      salary: "",
      avatar: null,
      documents: [],
    });
    setEditMode(false);
    setCurrentEmpId(null);
  };

  // 🔹 Edit Employee
  const handleViewDetails = async (id) => {
    try {
      toast.loading("Fetching employee details...", { id: "getEmp" });
      const { data } = await axios.get(
        `http://localhost:5000/Employee/getEmployeeById/${id}`
      );
      toast.dismiss("getEmp");
      if (data.success) {
        const emp = data.employee;
        setNewEmployee({
          name: emp.name,
          email: emp.email,
          phone: emp.phone,
          dob: emp.dob?.slice(0, 10) || "",
          department: emp.department,
          role: emp.role,
          joiningDate: emp.joiningDate?.slice(0, 10) || "",
          salary: emp.salary,
          avatar: null,
          documents: emp.documents || [],
        });
        setEditMode(true);
        setCurrentEmpId(id);
        setDrawerOpen(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load employee details");
    }
  };

  // 🔹 Delete Employee
  const handleDelete = async () => {
    try {
      toast.loading("Deleting employee...", { id: "delEmp" });
      const { data } = await axios.delete(
        `http://localhost:5000/Employee/deleteEmployee/${empToDelete._id}`
      );
      if (data.success) {
        setEmployees((prev) =>
          prev.filter((emp) => emp._id !== empToDelete._id)
        );
        toast.success("Employee deleted!", { id: "delEmp" });
        setShowDeleteModal(false);
      } else {
        toast.error("Failed to delete employee", { id: "delEmp" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error deleting employee", { id: "delEmp" });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <FiUsers size={22} /> Team
          </h1>
          <button
            onClick={() => {
              resetForm();
              setDrawerOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
          >
            <FiPlus size={16} /> Add Member
          </button>
        </header>

        {/* Filters */}
        <div className="bg-white border-b border-gray-100 px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full max-w-sm">
            <FiSearch className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search team members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-2 text-sm text-gray-700 w-full"
            />
          </div>

          <div className="flex items-center gap-3">
            <FiFilter className="text-gray-500" size={18} />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Team Grid */}
        <main className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="text-center text-gray-500 mt-20">Loading...</div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              No team members found 😕
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member._id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          member.avatar ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            member.name
                          )}&background=3b82f6&color=fff&size=64`
                        }
                        alt={member.name}
                        className="w-12 h-12 rounded-full border border-gray-200 object-cover"
                      />
                      <div>
                        <h2 className="font-bold text-gray-800 text-sm">
                          {member.name}
                        </h2>
                        <p className="text-xs font-semibold mt-0.5 text-gray-600">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => {
                          setEmpToDelete(member);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-400 hover:text-red-600"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-gray-600 space-y-2">
                    <p className="flex items-center gap-2">
                      <FiMail className="text-gray-400" /> {member.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiPhone className="text-gray-400" /> {member.phone}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm">
                      <FiCircle
                        className={
                          member.status === "Active"
                            ? "text-green-500"
                            : "text-gray-400"
                        }
                        size={12}
                      />
                      <span
                        className={
                          member.status === "Active"
                            ? "text-green-700 text-xs font-medium"
                            : "text-gray-500 text-xs font-medium"
                        }
                      >
                        {member.status || "Active"}
                      </span>
                    </div>

                    <button
                      onClick={() => handleViewDetails(member._id)}
                      className="text-blue-600 text-xs font-semibold hover:underline"
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

      {/* Drawer Form */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-6 py-4 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800">
            {editMode ? "Edit Employee" : "Add New Employee"}
          </h2>
          <button
            onClick={() => {
              setDrawerOpen(false);
              resetForm();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto h-[calc(100%-64px)] space-y-5"
        >
          {[
            { label: "Full Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Department", name: "department", type: "text" },
            { label: "Role / Position", name: "role", type: "text" },
            { label: "Joining Date", name: "joiningDate", type: "date" },
            { label: "Salary (₹)", name: "salary", type: "number" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700">
                {f.label}
              </label>
              <input
                name={f.name}
                type={f.type}
                value={newEmployee[f.name]}
                onChange={handleInputChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          ))}

          {/* Avatar Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center relative hover:border-blue-400 transition">
              {newEmployee.avatar ? (
                <>
                  {/* Image preview (old or new) */}
                  <img
                    src={
                      typeof newEmployee.avatar === "string"
                        ? newEmployee.avatar // existing Cloudinary image
                        : URL.createObjectURL(newEmployee.avatar) // new upload
                    }
                    alt="Employee"
                    className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    {typeof newEmployee.avatar === "string"
                      ? "Current Photo"
                      : newEmployee.avatar.name}
                  </p>

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() =>
                      setNewEmployee((prev) => ({ ...prev, avatar: null }))
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow hover:bg-red-600"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  {/* Upload placeholder */}
                  <FiUpload size={28} className="text-gray-400" />
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    <span className="text-blue-600 font-medium">
                      Click to upload
                    </span>{" "}
                    or drag
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Supported: JPG, PNG, WEBP (Max 5 MB)
                  </p>
                </>
              )}

              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {/* Filename badge (only for new uploads) */}
            {newEmployee.avatar && typeof newEmployee.avatar !== "string" && (
              <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs px-2 py-1 rounded-full">
                {newEmployee.avatar.name}
                <button
                  type="button"
                  onClick={() =>
                    setNewEmployee((prev) => ({ ...prev, avatar: null }))
                  }
                  className="text-blue-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Document Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee Documents
            </label>
            <label
              htmlFor="documents"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-400 transition bg-gray-50"
            >
              <FiUpload size={24} className="text-gray-400" />
              <p className="text-sm text-gray-600 mt-1">
                Upload multiple documents (PDF, DOCX)
              </p>
              <input
                id="documents"
                name="documents"
                type="file"
                multiple
                onChange={handleInputChange}
                className="hidden"
              />
            </label>

            {newEmployee.documents.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {newEmployee.documents.map((file, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs px-2 py-1 rounded-full"
                  >
                    {file.name || file}
                    <button
                      type="button"
                      onClick={() => handleRemoveDoc(index)}
                      className="text-green-500 hover:text-red-500"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
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
              Save Employee
            </button>
          </div>
        </form>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FiX size={20} />
            </button>

            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Delete Employee?
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900">
                  {empToDelete?.name}
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
                  onClick={handleDelete}
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
