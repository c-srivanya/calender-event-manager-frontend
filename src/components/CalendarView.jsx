import React from "react";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarView = ({ events, onSelectDay }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const grid = [];
  for (let i = 0; i < firstDay; i++) grid.push(null);
  for (let day = 1; day <= daysInMonth; day++) grid.push(day);

  const eventsByDate = events.reduce((acc, ev) => {
    const start = ev.startTime ? new Date(ev.startTime) : null;
    const key = start ? start.toDateString() : null;
    if (!key) return acc;
    acc[key] = acc[key] || [];
    acc[key].push(ev);
    return acc;
  }, {});

  return (
    <div className="calendar-wrap">
      <h2 className="calendar-title">
        {today.toLocaleString("default", { month: "long" })} {year}
      </h2>

      <div className="calendar-grid">
        {weekdays.map((w) => (
          <div key={w} className="calendar-header">
            {w}
          </div>
        ))}

        {grid.map((day, idx) => {
          const date = day
            ? new Date(year, month, day).toDateString()
            : null;

          const dayEvents = day ? eventsByDate[date] || [] : [];

          return (
            <button
              key={`${date}-${idx}`}
              className={`calendar-day ${day ? "" : "calendar-empty"}`}
              onClick={() => day && onSelectDay?.(new Date(year, month, day))}
              type="button"
            >
              {day ? (
                <>
                  <span className="calendar-day-number">{day}</span>
                  {dayEvents.length > 0 && (
                    <span className="calendar-badge">{dayEvents.length}</span>
                  )}
                </>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;