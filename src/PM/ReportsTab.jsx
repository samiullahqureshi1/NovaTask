import { useEffect, useState } from "react";

export default function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/Employee/reports/overview");
        const json = await res.json();
        if (json.success) setData(json.summary);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-extrabold text-gray-800 mb-6">Reports & Analytics</h1>
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow">
        {loading ? (
          <p className="text-gray-500 text-center">Loading reports...</p>
        ) : !data ? (
          <p className="text-gray-400 text-center">No data available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-blue-700">{data.projects.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600">Completed Tasks</p>
              <p className="text-2xl font-bold text-green-700">{data.tasks.done}</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-600">Active Employees</p>
              <p className="text-2xl font-bold text-indigo-700">{data.employees.active}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
