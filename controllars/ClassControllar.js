import Class from "../models/ClassModel.js";
import Student from "../models/StudentModel.js";
import Teacher from "../models/TeacherModel.js";
import mongoose from "mongoose";
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate({
      path: "students",
      select: "  _id studentName studentId studentRoll",
    });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) return res.status(404).json({ message: "Class not found" });
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassByClassId = async (req, res) => {
  try {
    const classItem = await Class.findOne({ classId: req.params.id }).populate(
      "students"
    );
    if (!classItem) return res.status(404).json({ message: "Class not found" });
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getClassById2 = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id).populate("students");
    if (!classItem) return res.status(404).json({ message: "Class not found" });
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createClass = async (req, res) => {
  try {
    const classItem = new Class(req.body);

    if (req.body.students && req.body.students.length > 0) {
      for (let i = 0; i < req.body.students.length; i++) {
        await Student.findByIdAndUpdate(req.body.students[i], {
          $set: { classId: classItem._id, studentRoll: (i + 1).toString() },
        });
      }
    }

    if (req.body.allocatedTeachers && req.body.allocatedTeachers.length > 0) {
      await Teacher.updateMany(
        { _id: { $in: req.body.allocatedTeachers } },
        { $addToSet: { allocatedClasses: classItem._id } }
      );
    }
    const ClassTeacherAdd = await Teacher.findById(req.body.classTeacher);
    ClassTeacherAdd.ClassTeacher = classItem._id;
    await ClassTeacherAdd.save();

    await classItem.save();
    res.status(201).json(classItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) return res.status(404).json({ message: "Class not found" });

    if (req.body.students && req.body.students.length > 0) {
      const currentStudentIds = classItem.students.map((s) => s.toString());
      const updatedStudentIds = req.body.students.map((s) => s.toString());

      const removedStudents = currentStudentIds.filter(
        (id) => !updatedStudentIds.includes(id)
      );

      await Student.updateMany(
        { _id: { $in: removedStudents } },
        { $unset: { classId: "", studentRoll: "" } }
      );

      let nextRollNumber = 1;
      for (let i = 0; i < updatedStudentIds.length; i++) {
        const studentId = updatedStudentIds[i];
        const student = await Student.findById(studentId);

        if (student && student.studentRoll) {
          nextRollNumber = parseInt(student.studentRoll) + 1;
        } else {
          await Student.findByIdAndUpdate(studentId, {
            $set: {
              classId: classItem._id,
              studentRoll: nextRollNumber.toString(),
              quizResponses: [],
              attendance: [],
              numberOfDaysPresent: 0,
              totalSchoolDays: 0,
            },
          });
          nextRollNumber++;
        }
      }

      classItem.students = updatedStudentIds;
      await classItem.save();
      return res.status(200).json(classItem);
    } else {
      const currentTeachers = classItem.allocatedTeachers.map((s) => s.toString());
      const updatedTeachers = req.body.allocatedTeachers.map((s) => s.toString());

      const removedTeachers = currentTeachers.filter(
        (id) => !updatedTeachers.includes(id)
      );

      await Teacher.updateMany(
        { _id: { $in: removedTeachers } },
        { $pull: { allocatedClasses: classItem._id } }
      );

      classItem.allocatedTeachers = updatedTeachers;
      if (req.body.allocatedTeachers && req.body.allocatedTeachers.length > 0) {
        await Teacher.updateMany(
          { _id: { $in: req.body.allocatedTeachers } },
          { $addToSet: { allocatedClasses: classItem._id } }
        );
      }

      if (classItem.classTeacher !== req.body.classTeacher) {
        if (classItem.classTeacher) {
          const oldClassTeacher = await Teacher.findById(classItem.classTeacher);
          if (oldClassTeacher) {
            oldClassTeacher.ClassTeacher = null;
            await oldClassTeacher.save();
          } else {
            return res.status(404).json({ message: "Previous class teacher not found" });
          }
        }

        if (req.body.classTeacher) {
          const newClassTeacher = await Teacher.findById(req.body.classTeacher);
          if (newClassTeacher) {
            newClassTeacher.ClassTeacher = classItem._id;
            await newClassTeacher.save();
          } else {
            return res.status(404).json({ message: "New class teacher not found" });
          }
        }

        classItem.classTeacher = req.body.classTeacher;
      }

      await classItem.save();
      res.status(200).json(classItem);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    if (!classItem) {
      return res.status(404).json({ message: "Class not found" });
    }

    // Update students associated with this class
    const updateStudentsResult = await Student.updateMany(
      { classId: classItem._id },
      {
        $set: {
          classId: null,
          quizResponses: [],
          attendance: [],
          numberOfDaysPresent: 0,
          totalSchoolDays: 0,
        },
      }
    );

    if (!updateStudentsResult.acknowledged) {
      return res.status(500).json({ message: "Failed to update students" });
    }

    // Update teachers to remove the classId from their allocatedClasses
    const updateTeachersResult = await Teacher.updateMany(
      { allocatedClasses: classItem._id },
      { $pull: { allocatedClasses: classItem._id } }
    );

    if (!updateTeachersResult.acknowledged) {
      return res.status(500).json({ message: "Failed to update teachers" });
    }

    
    const previousClassTeacher = await Teacher.findById(classItem.classTeacher._id);
   
      await previousClassTeacher.updateOne(
        { $unset: { ClassTeacher: "" } }
      );

     

    res.json({ message: "Class deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

