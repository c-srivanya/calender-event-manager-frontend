import React from "react";

const EventCard = ({ event, onEdit, onDelete }) => {
  const start = event.startTime ? new Date(event.startTime) : null;
  const end = event.endTime ? new Date(event.endTime) : null;
  const status = 'live'; // 'live', 'upcoming', 'past'

  return (
    <div className="group relative bg-background/80 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-genz-soft hover:shadow-genz transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full">
      {/* Gradient accent bar */}
      <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-pastel-400 to-blue-500"></div>
      
      {/* Avatar placeholder */}
      <div className="w-12 h-12 bg-gradient-to-br from-blue-pastel-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-genz-soft group-hover:scale-110 transition-transform">
        <span className="text-white text-sm font-bold">📅</span>
      </div>
      
      {/* Status badge */}
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-pastel-500/20 text-blue-pastel-600 border border-blue-pastel-400/50 mb-3">
        ● {status.toUpperCase()}
      </span>
      
      <h3 className="font-poppins font-semibold text-xl mb-2 leading-tight line-clamp-2 group-hover:text-blue-pastel-600 transition-colors">
        {event.title}
      </h3>
      
      <p className="text-text text-sm mb-4 line-clamp-3 leading-relaxed">
        {event.description || 'No description'}
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <span className="text-xs text-text/70 font-medium">
          {start?.toLocaleDateString() || 'TBD'}
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit?.(event)} className="px-3 h-8">
            ✏️ Edit
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete?.(event.id)} className="px-3 h-8 text-red-400 hover:text-red-500 hover:bg-red-500/10">
            🗑️ Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
