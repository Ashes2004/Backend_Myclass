import StudentEnrollment from "../models/StudentEnrollmentModel.js";
import Student from "../models/StudentModel.js";
import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {

    try{
        let studentenrollments = await StudentEnrollment.find()
        .populate({
          path: 'Student',
          select: 'studentName _id', // specify fields to include
        });
              
        	res.status(200).json({studentenrollments});
    }catch(error)
    {
        res.status(500).json({ message: error.message });
        console.log("Error in fetching student enrollments", error);
    }    
})

router.post("/", async (req, res) => {
    try {
        // Check if the student has already submitted an enrollment request
        let studentAvailable = await StudentEnrollment.findOne({ Student: req.body.Student });
        if (studentAvailable) {
            return res.status(400).json({ message: "You have already submitted the enrollment request" });
        }

        // Find the student by studentId
        let student = await Student.findOne({ studentId: req.body.Student });
        if (!student) {
            return res.status(404).json({ message: "Student Not Found" });
        }

        // Check if the password matches
        if (student.password === req.body.Password) {
            let studentenrollments = new StudentEnrollment(req.body); 
            studentenrollments.studentID = student._id;	
            await studentenrollments.save();	
            return res.status(200).json({ studentenrollments });
        } else {
            return res.status(400).json({ message: "Incorrect Password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("Error in processing student enrollment request", error);
    }    
});

router.delete("/:id", async (req, res) => {

    try{ 
        let student = await StudentEnrollment.findOne({studentID : req.params.id});
        if (student.length == 0) return res.status(404).json({ message: "studentenrollments not found" });
        let studentenrollments = await StudentEnrollment.findByIdAndDelete(student.id); 	
        
        res.status(200).json({message: " studentenrollments Deleted successfully"});
    }catch(error)
    {
        res.status(500).json({ message: error.message });
        console.log("Error in fetching student enrollments", error);
    }    
})

export default router;