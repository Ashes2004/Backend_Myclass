import express from 'express';
import { 
    getTeacherRoutines, 
    getTeacherRoutineById, 
    createTeacherRoutinesFromClassRoutines
} from '../controllars/TeacherRoutineController.js';

const router = express.Router();

router.get('/', getTeacherRoutines); // Get all teacher routines
router.get('/:id', getTeacherRoutineById); // Get a specific teacher routine by ID
router.get('/create/routine', createTeacherRoutinesFromClassRoutines); // Create a new teacher routine


export default router;
