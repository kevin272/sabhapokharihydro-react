import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axios.config";

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [category, setCategory] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [status, setStatus] = useState("Planning");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState(null);

  const baseURL = import.meta.env.VITE_API_URL.replace("/api", "");

  // Load project data in edit mode
  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/project/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const p = res.data.data;
          setTitle(p.title || "");
          setClient(p.client || "");
          setCategory(p.category || "");
          setTechnologies(p.technologies?.join(", ") || "");
          setStatus(p.status || "Planning");
          setStartDate(p.duration?.start ? p.duration.start.split("T")[0] : "");
          setEndDate(p.duration?.end ? p.duration.end.split("T")[0] : "");
          setShortDescription(p.shortDescription || "");
          if (p.images) {
            setPreview(p.images.map((img) => `${baseURL}${img.url}`));
          }
        })
        .catch((err) =>
          setError(err.response?.data?.message || "Failed to load project")
        );
    }
  }, [id, token, baseURL]);

  // Handle image selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map((f) => URL.createObjectURL(f)));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("client", client);
      formData.append("category", category);
      formData.append("technologies", technologies);
      formData.append("status", status);
      formData.append("shortDescription", shortDescription);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      images.forEach((file) => formData.append("images", file));

      if (id) {
        await axiosInstance.put(`/project/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axiosInstance.post("/project", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      navigate("/admin/projects");
    } catch (err) {
      setError(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg rounded-4 border-0 mx-auto" style={{ maxWidth: "800px" }}>
        <div className="card-body p-5">
          <h2 className="mb-4 fw-bold text-center">
            {id ? "Edit Project" : "Add New Project"}
          </h2>
          {error && <p className="text-danger">{error}</p>}

          <form onSubmit={handleSubmit} className="row g-4">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Project Title</label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Client</label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={client}
                onChange={(e) => setClient(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Category</label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Technologies</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="React, Node.js, MongoDB"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Status</label>
              <select
                className="form-select form-select-lg"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Planning">Planning</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Start Date</label>
              <input
                type="date"
                className="form-control form-control-lg"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">End Date</label>
              <input
                type="date"
                className="form-control form-control-lg"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">Short Description</label>
              <textarea
                className="form-control form-control-lg"
                rows="3"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold">Project Images</label>
              <input
                type="file"
                className="form-control form-control-lg"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              {preview.length > 0 && (
                <div className="d-flex flex-wrap gap-3 mt-3">
                  {preview.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="col-12">
              <button className="btn btn-primary btn-lg w-100 rounded-3 fw-bold">
                {id ? "Update Project" : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
