import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import EventService from '../services/EventService'

const useStore = create(
  devtools(
    (set, get) => ({
      events: [],
      loading: false,
      error: null,
      user: null,

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      fetchEvents: async () => {
        const { setLoading, setError } = get()
        setLoading(true)
        setError(null)
        try {
          const res = EventService.getAllEvents()
          set({ events: res.data || [] })
        } catch (err) {
          setError('Failed to load events')
        } finally {
          setLoading(false)
        }
      },

      addEvent: async (event) => {
        try {
          await EventService.createEvent(event)
          get().fetchEvents() // Refresh
        } catch (err) {
          get().setError('Failed to create event')
        }
      },

      updateEvent: async (id, event) => {
        try {
          await EventService.updateEvent(id, event)
          get().fetchEvents()
        } catch (err) {
          get().setError('Failed to update event')
        }
      },

      deleteEvent: async (id) => {
        try {
          await EventService.deleteEvent(id)
          get().fetchEvents()
        } catch (err) {
          get().setError('Failed to delete event')
        }
      }
    }),
    { name: 'calendar-store' }
  )
)

export default useStore

