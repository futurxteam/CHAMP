import Event from "../models/Event.js";

// @desc    Get all published events (active only)
// @route   GET /api/events
export const getEvents = async (req, res) => {
  try {
    const today = new Date();
    // Filter: published, registration deadline not passed, and max occupants not reached
    const events = await Event.find({
      status: "published",
      registrationTimeline: { $gte: today }
    }).sort({ date: 1 });

    // Secondary filter for max occupants
    const activeEvents = events.filter(e => e.registrations.length < e.maxOccupants);

    res.json(activeEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("registrations", "name email");
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register for an event
// @route   POST /api/events/:id/register
export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (new Date() > new Date(event.registrationTimeline)) {
      return res.status(400).json({ message: "Registration deadline has passed" });
    }

    if (event.registrations.length >= event.maxOccupants) {
      return res.status(400).json({ message: "Event is at maximum capacity" });
    }

    const userId = req.user._id;
    if (event.registrations.includes(userId)) {
      return res.status(400).json({ message: "You are already registered for this event" });
    }

    event.registrations.push(userId);
    await event.save();

    res.json({ message: "Successfully registered for event", registrations: event.registrations.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create event (Admin only)
// @route   POST /api/events
export const createEvent = async (req, res) => {
  try {
    const { title, date, time, description, location, thumbnail, maxOccupants, registrationTimeline } = req.body;

    const event = await Event.create({
      title,
      date,
      time,
      description,
      location,
      thumbnail,
      maxOccupants,
      registrationTimeline,
      createdBy: req.user._id,
      status: "published" 
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update event (Admin only)
// @route   PUT /api/events/:id
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete event (Admin only)
// @route   DELETE /api/events/:id
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await event.deleteOne();
    res.json({ message: "Event removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all events for management (Admin only)
// @route   GET /api/events/admin/all
export const getAdminEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
