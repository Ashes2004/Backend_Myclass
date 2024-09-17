import express from 'express';

import { createStudent, deleteStudent, getAllStudents, getStudentById, getStudentByIdMiddleWare, getStudentByStudentId, studentLogin, updateStudent } from '../controllars/StudentControllar.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all students
router.get('/' , getAllStudents);
// Create a new student
router.post('/' , createStudent);
// Get a student by ID
router.get('/:id', getStudentById);
// Get a student by ID
router.post('/login', studentLogin);


router.get('/get/student',authenticateToken, getStudentByIdMiddleWare);


// Get a student by student ID
router.get('/find/:id', getStudentByStudentId);
// Update a student
router.patch('/:id',authenticateToken, updateStudent);
// Delete a student
router.delete('/:id',deleteStudent );

export default router;





















