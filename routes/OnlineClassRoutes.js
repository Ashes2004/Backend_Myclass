import express from 'express';
import {
  createOnlineClass,
  getAllOnlineClasses,
  getOnlineClassById,
  updateOnlineClass,
  deleteOnlineClass,
  getOnlineClassByTeacherID,
  getOnlineClassByClassID
} from "../controllars/OnlineClassControllar.js";

const router = express.Router();

router.post('/', createOnlineClass);

router.get('/', getAllOnlineClasses);

router.get('/:id', getOnlineClassById);

router.put('/:id', updateOnlineClass);

router.delete('/:id', deleteOnlineClass);

router.get('/teacher/:teacherId', getOnlineClassByTeacherID);

router.get('/class/:classId', getOnlineClassByClassID);

export default router;
