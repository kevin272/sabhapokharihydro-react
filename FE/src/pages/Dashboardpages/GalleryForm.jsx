import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axios.config";

export default function GalleryForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImage(null);
      return;
    }
    if (!file.type?.startsWith("image/")) {
      setError("Please select an image file");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be 5MB or smaller");
      e.target.value = "";
      return;
    }
    setError("");
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setError("Please select an image");

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("image", image);

      // axiosInstance response interceptor returns BODY already
      await axiosInstance.post("/gallery", fd); // no manual headers

      navigate("/admin/gallery", { replace: true });
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.message ||
            err?.error ||
            err?.data?.message ||
            err?.data?.error ||
            "Upload failed";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Add Gallery Image</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: 500 }}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            onChange={onFileChange}
            accept="image/*"
            required
          />
        </div>

        <button className="btn btn-primary" disabled={submitting}>
          {submitting ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
