// useFetch.js
import { useState, useEffect } from "react";
import axiosInstance from "../../config/axios.config";

const API_URL = import.meta.env.VITE_API_URL; // e.g. http://localhost:5000/api
const SERVER_URL = API_URL.replace(/\/api$/, ""); // http://localhost:5000

const fixImageUrl = (item) => {
  if (item?.image?.startsWith("/uploads")) {
    return { ...item, image: `${SERVER_URL}${item.image}` };
  }
  return item;
};

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(url, options);
        let responseData = res.data?.data || res.data || res;

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
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
