import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import CreatorScene from "./CreatorScene";
import LeftPanel from "./LeftPanel";

export default function ViewerLayout() {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModel() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/models/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setModel(res.data);
      } catch (err) {
        setModel(null);
      } finally {
        setLoading(false);
      }
    }
    fetchModel();
  }, [id]);

  useEffect(() => {
    console.log("Updated model:", model);
  }, [model]);

  if (loading) return <div>Loading...</div>;
  if (!model) return <div>Model not found.</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <LeftPanel model={model} />
      <div className="flex-1">
        <CreatorScene model={model} />
      </div>
    </div>
  );
}
