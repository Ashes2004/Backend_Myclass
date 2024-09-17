import express from 'express';
import { 
    getClassRoutines, 
    getClassRoutineById, 
    createClassRoutine, 
    updateClassRoutine, 
    deleteClassRoutine 
} from '../controllars/ClassRoutineController.js';

const router = express.Router();

router.get('/', getClassRoutines); // Get all class routines
router.get('/:id', getClassRoutineById); // Get a specific class routine by ID
router.post('/', createClassRoutine); // Create a new class routine
router.patch('/:id', updateClassRoutine); // Update a class routine by ID
router.delete('/:id', deleteClassRoutine); // Delete a class routine by ID

export default router;
