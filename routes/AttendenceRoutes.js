import express from 'express';
import { createAttendenceRecord, findAttendenceRecord, updateAttendence } from '../controllars/AttendenceControllar.js';

const router = express.Router();
 

router.post('/', createAttendenceRecord);
router.patch('/update/:classId/:date', updateAttendence);
router.get('/:classId/:date', findAttendenceRecord);


export default router;








