import Administrative from "../models/AdminModel.js";

// Helper function to find administrative record
const findAdministrative = async () => {
  const admin = await Administrative.findOne();
  if (!admin) {
    throw new Error("Administrative record not found");
  }
  return admin;
};

// Notice Controllers
export const getNotices = async (req, res) => {
  try {
    const admin = await findAdministrative();
    res.status(200).json(admin.notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotice = async (req, res) => {
  const { title, description } = req.body;
  try {
    const admin = await findAdministrative();
    admin.notices.push({ title, description });
    await admin.save();
    res.status(201).json(admin.notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNotice = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const admin = await findAdministrative();
    const notice = admin.notices.id(id);
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    notice.title = title;
    notice.description = description;
    await admin.save();
    res.status(200).json(admin.notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotice = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await findAdministrative();
    admin.notices.id(id).remove();
    await admin.save();
    res.status(200).json(admin.notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Announcement Controllers
export const getAnnouncements = async (req, res) => {
  try {
    const admin = await findAdministrative();
    res.status(200).json(admin.announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAnnouncement = async (req, res) => {
  const { message } = req.body;
  try {
    const admin = await findAdministrative();
    admin.announcements.push({ message });
    await admin.save();
    res.status(201).json(admin.announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  try {
    const admin = await findAdministrative();
    const announcement = admin.announcements.id(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    announcement.message = message;
    await admin.save();
    res.status(200).json(admin.announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await findAdministrative();
    admin.announcements.id(id).remove();
    await admin.save();
    res.status(200).json(admin.announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Event Controllers
export const getEvents = async (req, res) => {
  try {
    const admin = await findAdministrative();
    res.status(200).json(admin.events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  const { name, description, date, location } = req.body;
  try {
    const admin = await findAdministrative();
    admin.events.push({ name, description, date, location });
    await admin.save();
    res.status(201).json(admin.events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, date, location } = req.body;
  try {
    const admin = await findAdministrative();
    const event = admin.events.id(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    event.name = name;
    event.description = description;
    event.date = date;
    event.location = location;
    await admin.save();
    res.status(200).json(admin.events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await findAdministrative();
    admin.events.id(id).remove();
    await admin.save();
    res.status(200).json(admin.events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
