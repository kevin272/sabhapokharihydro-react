import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import DashboardTable from "../../components/Dashboard/DashboardTable";

export default function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data.data || []);
    } catch (err) {
      console.error("Error fetching projects:", err.response || err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProjects();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${API_URL}/projects/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting project:", err.response || err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const headers = [
    { label: "Title" },
    { label: "Status" },
    { label: "Featured" },
    { label: "Actions", style: { width: "200px" } },
  ];

  // Map projects into <tr> elements
  const rows =
    projects.length > 0
      ? projects.map((p) => (
          <tr key={p._id} className="border-t">
            <td className="px-4 py-3">{p.title}</td>
            <td className="px-4 py-3">{p.status}</td>
            <td className="px-4 py-3">{p.featured ? "✅" : "❌"}</td>
            <td className="px-4 py-3 text-right">
              <Link
                to={`/admin/projects/edit/${p._id}`}
                className="btn btn-primary btn-sm me-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      : [];

  if (loading) return <p className="p-6">Loading projects...</p>;

  return (
    <DashboardLayout
      title="Projects Dashboard"
      actions={
        <Link
          to="/admin/projects/add"
          className="btn btn-success"
        >
          ➕ Add Project
        </Link>
      }
    >
      <DashboardTable headers={headers} rows={rows} emptyMessage="No projects found." />
    </DashboardLayout>
  );
}
