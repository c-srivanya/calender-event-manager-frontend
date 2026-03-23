
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from '../stores/useStore';

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
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <button 
          onClick={() => navigate("/create-event")}
          className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          + New Event
        </button>
      </div>

      {loading && <p className="text-center text-xl py-12">Loading...</p>}
      {error && <p className="text-red-400 text-center font-semibold">{error}</p>}

      {!loading && events.length === 0 && (
        <div className="text-center py-20 bg-gradient-to-r from-slate-50 dark:from-slate-900/50 to-slate-100 dark:to-slate-900/20 rounded-3xl p-12 border border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-bold mb-4">No events yet</h3>
          <p>Create your first event to get started!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="group">
            <EventCard event={event} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
