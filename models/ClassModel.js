import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
    unique: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
  subjects: [
    {
      subjectName: {
        type: String,
        required: true,
      },
      subjectCode: {
        type: String,
        required: true,
      },
    },
  ],
  allocatedTeachers:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    }
  ],
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required : true
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  ClassRoutine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassRoutine",
  },
  examsConducted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exams", // Reference to the exams associated with this class
    },
  ],
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz", // Reference to the quizzes associated with this class
    },
  ],
  attendance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance", // Reference to the attendance records associated with this class
    },
  ],
  examResults: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grades", // Reference to the exam results associated with this class
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Class = mongoose.model("Class", classSchema);

export default Class;
