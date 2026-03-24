import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import useStore from '../stores/useStore';
import EventCard from '../components/EventCard';

const Dashboard = () => {
  const { events, loading, error, fetchEvents, deleteEvent } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleEdit = (event) => {
    navigate(`/edit-event/${event.id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;
    await deleteEvent(id);
  };

  return (
    <div className="container mx-auto p-8 space-y-8 glass rounded-genz-xl shadow-glass-2 glassPulse">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 border-b border-glass-border">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-blue-pastel-400 to-blue-pastel-600 bg-clip-text text-transparent drop-shadow-genz animate-fadeIn">
          Dashboard
        </h1>
        <Button 
          onClick={() => navigate("/create-event")}
          className="bg-gradient-to-r from-primary to-blue-pastel-600 hover:from-primary/90 hover:to-blue-pastel-500 shadow-glow-blue hover:shadow-glow-blue font-poppins font-semibold text-lg px-10 py-4 h-auto rounded-genz-xl glassPulse flex items-center gap-3 shadow-genz-soft hover:shadow-genz animate-slideUp"
        >
          + New Event
        </Button>
      </div>

      {loading && <p className="text-center text-xl py-12 glass p-8 rounded-genz">Loading events...</p>}
      {error && <p className="text-red-400 text-center font-semibold glass p-8 rounded-genz">{error}</p>}

      {!loading && events.length === 0 && (
        <div className="glass text-center py-20 rounded-genz-xl p-16 border border-glass-border shadow-genz-soft glassPulse animate-fadeIn">
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-pastel-500 bg-clip-text text-transparent">
            No events yet
          </h3>
          <p className="text-xl text-text/80 font-medium">Create your first event to get started with calendar magic ✨</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {events.map((event, index) => (
          <div 
            key={event.id} 
            className="group" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <EventCard 
              event={event} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              className="glassPulse hover:glassPulse h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

