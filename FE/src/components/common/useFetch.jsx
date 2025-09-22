// useFetch.jsx
import { useState, useEffect } from "react";
import axiosInstance from "../../config/axios.config";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/+$/, "");
const SERVER_URL = API_URL.replace(/\/api$/, "");

const fixImageUrl = (item) => {
  if (!item) return item;
  // common fields across your APIs
  const copy = { ...item };
  if (typeof copy.image === "string" && copy.image.startsWith("/uploads")) {
    copy.image = `${SERVER_URL}${copy.image}`;
  }
  if (Array.isArray(copy.images)) {
    copy.images = copy.images.map((img) =>
      img?.url?.startsWith("/uploads")
        ? { ...img, url: `${SERVER_URL}${img.url}` }
        : img
    );
  }
  if (typeof copy.img === "string" && copy.img.startsWith("/uploads")) {
    copy.img = `${SERVER_URL}${copy.img}`;
  }
  return copy;
};

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        // axiosInstance already returns BODY: { success, message, data }
        const body = await axiosInstance.get(url, options);
        let responseData = body?.data;

        // normalize image paths
        if (Array.isArray(responseData)) {
          responseData = responseData.map(fixImageUrl);
        } else if (responseData && typeof responseData === "object") {
          responseData = fixImageUrl(responseData);
        }

        if (isMounted) {
          setData(responseData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
