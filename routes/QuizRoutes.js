import express from 'express';
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  createQuizResponse,
  getQuizResponses
} from '../controllars/QuizControllar.js';

const router = express.Router();

// Quiz routes
router.post('/', createQuiz);  
router.get('', getAllQuizzes);  
router.get('/:id', getQuizById);  
router.patch('/:id', updateQuiz); 
router.delete('/:id', deleteQuiz);  

// Quiz response routes
router.post('/:quizId/responses', createQuizResponse);  
router.get('/:quizId/responses', getQuizResponses);  

export default router;
