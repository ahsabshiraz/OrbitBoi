import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import CreatorScene from "./CreatorScene";
import LeftPanel from "./LeftPanel";

export default function Creator() {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/experiences/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExperience(response.data);
      } catch (err) {
        setError('Failed to load experience');
        console.error('Error fetching experience:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExperience();
    }
  }, [id]);

  if (loading) return <div>Loading experience...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!experience) return <div>Experience not found</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <LeftPanel experience={experience} />
      <div className="flex-1">
        <CreatorScene experience={experience} />
      </div>
    </div>
  );
}
