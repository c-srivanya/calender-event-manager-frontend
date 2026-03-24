import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CalendarView from "../components/CalendarView";
import EventService from "../services/EventService";
import { Button } from "../components/ui/button";
import { Calendar as CalendarIcon, Plus } from 'lucide-react';

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
    <div className="min-h-screen glass">
      <Navbar />
      <div className="container mx-auto p-12 space-y-12 lg:p-24">
        {/* Hero header */}
        <div className="glass rounded-genz-xl p-12 lg:p-20 backdrop-blur-xl border border-glass-border shadow-genz-3d max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary via-blue-pastel-400 to-purple-500 text-white px-6 py-3 rounded-2xl shadow-glow-blue mb-8 font-extrabold animate-slideUp">
                <CalendarIcon size={24} />
                Your Life Calendar
              </div>
              <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-slate-900 via-primary to-blue-pastel-600 bg-clip-text text-transparent drop-shadow-genz mb-6 leading-tight">
                Perfect<br/>Planning
              </h1>
              <p className="text-2xl text-text/70 font-medium leading-relaxed max-w-lg">
                Visualize your events in style. Tap days for magic ✨
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <Button size="lg" className="group text-2xl font-black shadow-genz-3d hover:shadow-glow-blue h-24 px-12 glassPulse">
                <Plus size={32} className="group-hover:rotate-90 transition-transform mr-4" />
                Add Event
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="glass max-w-4xl mx-auto p-20 rounded-genz-xl text-center shadow-genz-soft glassPulse">
            <div className="text-6xl mb-8 animate-pulse">📅</div>
            <h2 className="text-4xl font-bold text-text/80 mb-4">Loading your universe...</h2>
            <p className="text-xl text-text/60">Events manifesting</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto items-start">
            {/* Calendar */}
            <div className="lg:col-span-2 glass rounded-genz-xl p-10 shadow-genz-3d hover:shadow-glow-blue group-hover:scale-[1.01] transition-all duration-700">
              <h3 className="text-3xl font-black bg-gradient-to-r from-primary to-blue-pastel-500 bg-clip-text text-transparent mb-8 drop-shadow-genz animate-slideUp">
                View Mode
              </h3>
              <CalendarView events={events} onSelectDay={handleSelectDay} className="glass p-8 rounded-genz shadow-genz-soft" />
            </div>

            {/* Selected events panel */}
            <div className="lg:sticky lg:top-24 h-fit glass rounded-genz-xl p-10 shadow-genz-3d hover:shadow-glow-blue">
              <h3 className="text-3xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-8 drop-shadow-genz flex items-center gap-3">
                {selectedDate ? selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                }) : 'Select a day'}
              </h3>
              
              {selectedDateEvents.length === 0 ? (
                <div className="text-center py-20 glass rounded-genz-lg p-12">
                  <div className="text-6xl mb-6 animate-bounce">🎯</div>
                  <h4 className="text-2xl font-bold text-text/60 mb-4">No events yet</h4>
                  <p className="text-lg text-text/50">Tap a day to plan something epic</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="glass p-6 rounded-2xl hover:shadow-genz-soft group transition-all duration-300 border border-glass-border">
                      <h4 className="font-black text-xl bg-gradient-to-r from-primary to-blue-pastel-500 bg-clip-text text-transparent group-hover:translate-x-2 transition-transform mb-2">
                        {event.title}
                      </h4>
                      <p className="text-text/70 leading-relaxed">{event.description || 'No details'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;

