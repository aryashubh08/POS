import { useEffect, useState } from "react";
import api from "../api/axios";

const useItemsData = (selected) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getItems = async () => {
    if (!selected) return; // ✅ important safeguard

    try {
      setLoading(true);
      const res = await api.get(`/api/v1/items/get/${selected}`);

      // 🔥 check your backend response structure
      setItems(res.data?.items || res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, [selected]); // ✅ dependency add ki

  return { items, loading };
};

export default useItemsData;
