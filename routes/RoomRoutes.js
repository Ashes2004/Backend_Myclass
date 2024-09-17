import express from 'express';
import {
  getAllRooms,
  createRoom,
  getRoomById,
  updateRoom,
  deleteRoom
} from '../controllars/RoomControllar.js';

const router = express.Router();

// Route to get all rooms
router.get('/', getAllRooms);

// Route to create a new room
router.post('/', createRoom);

// Route to get a specific room by ID
router.get('/:id', getRoomById);

// Route to update a room by ID
router.put('/:id', updateRoom);

// Route to delete a room by ID
router.delete('/:id', deleteRoom);

export default router;
