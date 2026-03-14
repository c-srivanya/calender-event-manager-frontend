import React from "react";

const EventCard = ({ event, onEdit, onDelete }) => {
  const start = event.startTime ? new Date(event.startTime) : null;
  const end = event.endTime ? new Date(event.endTime) : null;

  return (
    <div className="event-card">
      <div className="event-card-top">
        <h3>{event.title}</h3>
        <span className="event-date">
          {start ? start.toLocaleString() : ""}
          {end && start ? ` – ${end.toLocaleString()}` : ""}
        </span>
      </div>

      <p className="event-desc">{event.description}</p>

    <div className="event-actions">
      <button className="btn btn-sm" onClick={() => onEdit?.(event)}>
        Edit
      </button>
      <button className="btn btn-sm btn-danger" onClick={() => onDelete?.(event.id)}>
        Delete
      </button>
    </div>
  </div>
);
}
export default EventCard;
