import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventService from "../services/EventService";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const refreshEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await EventService.getAllEvents();
      setEvents(res.data || []);
    } catch (err) {
      setError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  const handleEdit = (event) => {
    navigate(`/edit-event/${event.id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await EventService.deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch {
      setError("Could not delete event.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <button className="btn btn-primary" onClick={() => navigate("/create-event")}>
            + New event
          </button>
        </div>

        {loading && <p>Loading events...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !events.length && (
          <div className="empty-state">
            <p>No events yet. Add one to get started!</p>
          </div>
        )}

        <div className="event-list">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;