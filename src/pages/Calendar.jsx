import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CalendarView from "../components/CalendarView";
import EventService from "../services/EventService";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await EventService.getAllEvents();
      setEvents(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSelectDay = (date) => {
    setSelectedDate(date);
    const key = date.toDateString();
    const matches = events.filter((ev) => {
      if (!ev.startTime) return false;
      return new Date(ev.startTime).toDateString() === key;
    });
    setSelectedDateEvents(matches);
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1>Calendar</h1>
        <p className="subheading">Tap a day to see events.</p>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <CalendarView events={events} onSelectDay={handleSelectDay} />

            {selectedDate && (
              <div className="selected-day">
                <h3>
                  Events on {selectedDate.toLocaleDateString()}
                </h3>
                {!selectedDateEvents.length ? (
                  <p>No events scheduled.</p>
                ) : (
                  <div className="event-list">
                    {selectedDateEvents.map((ev) => (
                      <div key={ev.id} className="event-card">
                        <h4>{ev.title}</h4>
                        <p>{ev.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;