import Student from "../models/StudentModel.js";
import jwt from 'jsonwebtoken';
 
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("classId");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createStudent = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const yearPrefix = currentYear.toString();

    // Find the highest serial number for the current year
    const latestStudent = await Student.findOne({ studentId: { $regex: `^${yearPrefix}` } })
      .sort({ studentId: -1 })
      .limit(1);

    let serialNumber = 1;
    if (latestStudent) {
      const latestSerial = parseInt(latestStudent.studentId.slice(-2));
      serialNumber = latestSerial + 1;
    }


    const serialNumberStr = serialNumber.toString().padStart(2, '0');
    const studentId = `${yearPrefix}${serialNumberStr}`;
    const password = `${studentId}@St`;
    
    const studentData = { ...req.body, studentId , password};
    const student = new Student(studentData);

    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('quizResponses').populate("classId");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentByIdMiddleWare = async (req, res) => {
  try {
    const student = await Student.findById(req.user.studentId) .populate({
      path: 'classId',
      populate: {
        path: 'classTeacher', 
        model: 'Teacher'
      }
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getStudentByStudentId = async (req, res) => {
  try {
    const student = await Student.findOne({studentId : req.params.id});
    if (student.length == 0) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const studentLogin = async (req, res) => {
  const { studentEmailID, password } = req.body;

  try {
    
      const student = await Student.findOne({ studentEmailID });
      if (!student) {
          return res.status(400).json({ message: 'Email not found ' });
      }

 
     
      if (student.password != password) {
          return res.status(400).json({ message: 'Invalid  password' });
      }

      
      const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

     
      res.json({ token , student }  );
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
};