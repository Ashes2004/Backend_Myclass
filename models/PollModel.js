import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  Timer: {
    type: String,
    required: true,
  },
  studentResponse: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      option: {
        type: String,
        enum: ['A', 'B', 'C', 'D'], 
      },
    },
  ],
});

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;
