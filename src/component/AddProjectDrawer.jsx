import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function AddProjectDrawer({ setIsDrawerOpen, setProjects }) {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    startDate: "",
    deadline: "",
    budget: "",
    status: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/Project/addProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => [...prev, data.project]);
        setIsDrawerOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 rounded-l-2xl overflow-y-auto">
      <div className="flex justify-between items-center border-b px-6 py-5 bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800">Add Project</h2>
        <FiX className="cursor-pointer" onClick={() => setIsDrawerOpen(false)} />
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {["name", "client"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold text-gray-700 mb-1 capitalize">
              {field}
            </label>
            <input
              required
              type="text"
              value={formData[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Saving..." : "Save Project"}
        </button>
      </form>
    </div>
  );
}
