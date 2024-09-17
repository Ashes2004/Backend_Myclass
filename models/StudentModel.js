import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  profilePhoto:{
    type: String,
  
  },
  guardianName: {
    type: String,
    required: true,
  },
  gender:{
    type: String,
    required: true,
  },
  guardianPhoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true
  },
  studentDOB: {
    type: String,
    required: true
  },
  studentEmailID: {
    type: String,
    required: true,
    unique: true
  },
  studentId: {
    type: String,
  
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  studentRoll: {
    type: String,
   
  },

  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  quizResponses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizResForEach",
    },
  ],
  
  examResults: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grades",
    },
  ],
 attendance:[
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attendance",
  },
 ],
  numberOfDaysPresent: {
    type: Number,
    default: 0,
  },
  totalSchoolDays: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
