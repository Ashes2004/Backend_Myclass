import Room from '../models/RoomModel.js';

// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
};

// Create a new room
export const createRoom = async (req, res) => {
  const { roomNumber, capacity } = req.body;
  try {
    const newRoom = new Room({ roomNumber, capacity });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: 'Error creating room', error });
  }
};

// Get a specific room by ID
export const getRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room', error });
  }
};

// Update a room by ID
export const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { roomNumber, capacity } = req.body;
  try {
    const room = await Room.findByIdAndUpdate(id, { roomNumber, capacity }, { new: true });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error updating room', error });
  }
};

// Delete a room by ID
export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting room', error });
  }
};
