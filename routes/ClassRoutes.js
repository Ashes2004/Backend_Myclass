import express from "express";
import {
  createClass,
  deleteClass,
  getAllClasses,
  getClassByClassId,
  getClassById,
  getClassById2,
  updateClass,
} from "../controllars/ClassControllar.js";

const router = express.Router();

router.get("/", getAllClasses);
router.get("/:id", getClassById);
router.get("/ID/:id", getClassById2);
router.get("/classid/:id", getClassByClassId);
router.post("/", createClass);
router.patch("/:id", updateClass);
router.delete("/:id", deleteClass);

export default router;
