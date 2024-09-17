import express from 'express';
import {
  createPoll,
  getPollByClass,
  getPollByTeacher,
  submitResponse,
  endPoll,
  deletePoll,
  endPollbyId
} from '../controllars/pollController.js';

const router = express.Router();


router.post('/create', createPoll);


router.get('/class/:classId', getPollByClass);
router.get('/teacher/:teacherId', getPollByTeacher);

router.post('/:id/response', submitResponse);


router.get('/class/:classId/end', endPoll);
router.get('/:id/pollresponse', endPollbyId);

router.delete('/delete/:id', deletePoll);

export default router;
