import mongoose from "mongoose";


const studentEnrollmentSchema = new mongoose.Schema({
 Student:{
  type: String,
  required: true
 },
 studentID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Student'
 },
 Password:{
  type: String,
  required: true
 },
 ClassName: {
   type: String,
   required: true

 }


});

const StudentEnrollment = mongoose.model("StudentEnrollment", studentEnrollmentSchema);

export default StudentEnrollment;
