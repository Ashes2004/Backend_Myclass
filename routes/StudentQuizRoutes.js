// import express from 'express';
// import StudentQuiz from '../models/StudentQuizModel.js';
// import Quiz from '../models/QuizModel.js';
// import Student from '../models/StudentModel.js';
// const router = express.Router();

// // Submit a quiz
// router.post('/', async (req, res) => {
//   try {
//     const { studentId, quizId, answers } = req.body;
//     const quiz = await Quiz.findById(quizId);
//     if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

//     // Calculate score
//     let score = 0;
//     answers.forEach(answer => {
//       const question = quiz.questions.id(answer.questionId);
//       if (question) {
//         const correctOption = question.options.find(option => option.isCorrect);
//         if (correctOption && correctOption.option === answer.selectedOption) {
//           score++;
//         }
//       }
//     });

//     const studentQuiz = new StudentQuiz({ studentId, quizId, answers, score });
//     await studentQuiz.save();
//  // Update student's quiz results
//  const student = await Student.findById(studentId);
//  student.quizResults.push({ quizId, score });
//  await student.save();

//     res.status(201).json(studentQuiz);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Get quiz results for a student
// router.get('/results/:studentId', async (req, res) => {
//   try {
//     const results = await StudentQuiz.find({ studentId: req.params.studentId }).populate('quizId');
//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
