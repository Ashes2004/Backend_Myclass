import express from "express";
import {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice,
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllars/miscController.js";

const router = express.Router();

// Notice Routes
router.get("/notices", getNotices);
router.post("/notices", createNotice);
router.patch("/notices/:id", updateNotice);
router.delete("/notices/:id", deleteNotice);

// Announcement Routes
router.get("/announcements", getAnnouncements);
router.post("/announcements", createAnnouncement);
router.patch("/announcements/:id", updateAnnouncement);
router.delete("/announcements/:id", deleteAnnouncement);

// Event Routes
router.get("/events", getEvents);
router.post("/events", createEvent);
router.patch("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

export default router;
