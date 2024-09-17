import mongoose from 'mongoose';

// Schema for Room
const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  capacity: {
    type: Number,
    required: true
  },
 
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
