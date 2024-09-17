import express from "express";
import {
  createResult,
  deleteResult,
  getAllResults,
  getResultById,
  getResultByStudentId,
  getResultByStudentIdAndResultId,
  updateResultByAdmin,
  updateResultByTeacher,
} from "../controllars/ResultControllar.js";

const router = express.Router();

router.post("/", createResult);
router.delete("/:id", deleteResult);
router.get("/", getAllResults);
router.get("/:resultID/student/:studentID", getResultByStudentIdAndResultId);
router.get("/:id", getResultById);
router.get("/student/:studentId", getResultByStudentId);
router.patch("/" , updateResultByTeacher);
router.patch("/admin/:id" , updateResultByAdmin);
export default router;
