import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    category: "hydropower",
    status: "planning",
    featured: false,
    isPublic: true,
    capacityMW: "",
    river: "",
    client: "",
    technologies: "",
    startDate: "",
    endDate: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch project by ID
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/projects/${id}`);
        const project = data.data; // ✅ backend wraps in data

        setFormData({
          title: project.title || "",
          description: project.description || "",
          shortDescription: project.shortDescription || "",
          category: project.category || "hydropower",
          status: project.status || "planning",
          featured: project.featured || false,
          isPublic: project.isPublic ?? true,
          capacityMW: project.capacityMW || "",
          river: project.river || "",
          client: project.client || "",
          technologies: project.technologies?.join(", ") || "",
          startDate: project.duration?.start
            ? project.duration.start.split("T")[0]
            : "",
          endDate: project.duration?.end
            ? project.duration.end.split("T")[0]
            : "",
        });

        setExistingImages(project.images || []); // ✅ objects {url, caption}
      } catch (err) {
        setError("Failed to load project data");
      }
    };

    fetchProject();
  }, [API_URL, id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle new image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  // Remove existing image
  const removeExistingImage = (idx) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Remove new image
  const removeNewImage = (idx) => {
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = new FormData();

      const normalized = {
        ...formData,
        technologies: formData.technologies
          ? formData.technologies.split(",").map((t) => t.trim())
          : [],
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      Object.entries(normalized).forEach(([key, value]) => {
        payload.append(key, value);
      });

      // Keep existing images
      existingImages.forEach((img) => {
        payload.append("existingImages", JSON.stringify(img));
      });

      // Add new images
      newImages.forEach((file) => {
        payload.append("images", file);
      });

      await axios.put(`${API_URL}/projects/${id}`, payload, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/projects");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow-lg rounded-4 w-100" style={{ maxWidth: "800px" }}>
        <div className="card-body p-5">
          <h2 className="fw-bold mb-4 text-center">Edit Project</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-3">
              <label className="fw-semibold">Project Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="fw-semibold">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
              >
                <option value="planning">Planning</option>
                <option value="construction">Construction</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="fw-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                rows={4}
                required
              />
            </div>

            {/* Short Description */}
            <div className="mb-3">
              <label className="fw-semibold">Short Description</label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                className="form-control"
                maxLength={200}
              />
            </div>

            {/* Existing Images */}
            <div className="mb-3">
              <label className="fw-semibold">Project Images</label>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {existingImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="position-relative border rounded overflow-hidden"
                    style={{ width: "100px", height: "100px" }}
                  >
                    <img
                      src={`${API_URL.replace("/api", "")}${img.url}`}
                      alt={img.caption}
                      className="w-100 h-100 object-fit-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(idx)}
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    >
                      ×
                    </button>
                  </div>
                ))}

                {imagePreviews.map((src, idx) => (
                  <div
                    key={idx}
                    className="position-relative border rounded overflow-hidden"
                    style={{ width: "100px", height: "100px" }}
                  >
                    <img
                      src={src}
                      alt={`new-${idx}`}
                      className="w-100 h-100 object-fit-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(idx)}
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                multiple
                className="form-control mt-2"
                onChange={handleImageChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100"
            >
              {loading ? "Updating..." : "Update Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
