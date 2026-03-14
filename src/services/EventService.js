import api from "./api";

const EventService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (user) => api.post("/auth/register", user),

  getAllEvents: () => api.get("/events"),
  getEvent: (id) => api.get(`/events/${id}`),
  createEvent: (event) => api.post("/events", event),
  updateEvent: (id, event) => api.put(`/events/${id}`, event),
  deleteEvent: (id) => api.delete(`/events/${id}`),
};

export default EventService;