import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import EventService from "../services/EventService";

const CreateEvent = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const normalizeDateTime = (value) => {
    if (!value) return "";
    // Keep only yyyy-mm-ddThh:mm (datetime-local expects this format)
    return value.slice(0, 16);
  };

  useEffect(() => {
    if (!id) return;
    EventService.getEvent(id)
      .then((res) => {
        const data = res.data;
        setTitle(data.title || "");
        setDescription(data.description || "");
        setStartTime(normalizeDateTime(data.startTime));
        setEndTime(normalizeDateTime(data.endTime));
      })
      .catch(() => setError("Could not load event."));
  }, [id]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError(null);

    try {
      const payload = {
        title,
        description,
        startTime,
        endTime,
      };

      if (id) {
        await EventService.updateEvent(id, payload);
      } else {
        await EventService.createEvent(payload);
      }
      navigate("/dashboard");
    } catch {
      setError("Unable to save event.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="auth-form">
          <h1>{id ? "Edit Event" : "Create Event"}</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Event title"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="What is the event about?"
              />
            </div>

            <div className="form-group">
              <label>Start</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>End</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            {error && <p className="error">{error}</p>}

            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;