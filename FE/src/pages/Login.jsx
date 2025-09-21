import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios.config";
import { Lock, User, Loader2 } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", { username, password });
const token =
  res?.data?.token ??  // { data: { token } }
  res?.token ??        // { token }
  res?.access_token ?? res?.accessToken;    
    if (!token) throw new Error("No token in response");

      localStorage.setItem("token", token);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Invalid login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="!min-h-screen !flex !items-center !justify-center !bg-gradient-to-br from-blue-50 via-white to-blue-100 !px-4">
      <div className="!w-full !max-w-md !bg-white/90 !backdrop-blur !shadow-xl !rounded-2xl !p-8">
        
        {/* Header */}
        <div className="!text-center !mb-8">
          <h1 className="!text-3xl !font-extrabold !text-gray-800">Admin Panel</h1>
          <p className="!text-gray-500 !mt-2">Login to manage the system</p>
        </div>

        {/* Error */}
        {error && (
          <p className="!mb-6 !text-sm !text-red-600 !bg-red-50 !px-4 !py-2 !rounded-lg">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="!space-y-6">
          {/* Username */}
          <div className="!relative">
            <User className="!absolute !top-1/2 !left-3 -translate-y-1/2 !text-gray-400 !h-5 !w-5" />
            <input
              type="text"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="!w-full !pl-10 !pr-3 !py-3 !border !border-gray-300 !rounded-lg !text-gray-800 placeholder:!text-gray-400 focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !outline-none"
            />
          </div>

          {/* Password */}
          <div className="!relative">
            <Lock className="!absolute !top-1/2 !left-3 -translate-y-1/2 !text-gray-400 !h-5 !w-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="!w-full !pl-10 !pr-3 !py-3 !border !border-gray-300 !rounded-lg !text-gray-800 placeholder:!text-gray-400 focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="!w-full !flex !items-center !justify-center gap-2 !bg-blue-600 !text-white !font-semibold !py-3 !px-4 !rounded-lg !shadow-md hover:!bg-blue-700 !transition disabled:!opacity-50"
          >
            {loading && <Loader2 className="!h-5 !w-5 !animate-spin" />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
