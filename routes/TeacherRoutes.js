import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getTeacher,
  getTeacherById,
  getTeacherByIdMiddleWare,
  teacherLogin,
  updateTeacher,
} from "../controllars/TeacherControllar.js";
import authenticateToken from "../middleware/authMiddleware.js";
const router = express.Router();

// Get all teachers
router.get("/", getTeacher);
// Get a teacher by ID
router.get("/:id", getTeacherById);
// Create a new teacher
router.get("/get/teacher" , authenticateToken ,getTeacherByIdMiddleWare);
router.post("/", createTeacher);
router.post("/login", teacherLogin);
// Update a teacher
router.patch("/:id", updateTeacher);
// Delete a teacher
router.delete("/:id", deleteTeacher);

export default router;
