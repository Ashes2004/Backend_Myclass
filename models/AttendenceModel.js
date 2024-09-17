import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },
  totalStudents: {
    type: Number,
    required: true,
  },
  presentCount: {
    type: Number,
    default: 0,
  },
  absentCount: {
    type: Number,
    default: 0,
  },
  isHoliday: {
    type: Boolean,
    default: false,
  },
  studentAttendances: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      present: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
