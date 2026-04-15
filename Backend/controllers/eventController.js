import Event from "../models/Event.js";

// @desc    Get all events
// @route   GET /api/events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    
    // Pattern similar to Blogs
    const result = events.map((event) => {
      if (req.user) {
        return event;
      }
      return {
        _id: event._id,
        title: event.title,
        date: event.date,
        description: event.description,
        location: event.location,
        isPremium: event.isPremium,
        // Hide fullDetails
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      if (req.user) {
        return res.json(event);
      }
      return res.json({
        _id: event._id,
        title: event.title,
        date: event.date,
        description: event.description,
        location: event.location,
        isPremium: event.isPremium,
        message: "Login to view full event details",
      });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Event
const createEvent = async (req, res) => {
  const { title, date, description, fullDetails, location, isPremium } = req.body;
  try {
    const event = new Event({ title, date, description, fullDetails, location, isPremium });
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getEvents, getEventById, createEvent };
