import Result from "../models/ResultModel.js";
import mongoose from "mongoose";
export const createResult = async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllResults = async (req, res) => {
  try {
    const results = await Result.find().populate("ClassDetails.class.students.student")
    .populate("ClassDetails.class.classID");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResultById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Result.findById(id)
      .populate("student")
      .populate("class");
    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getResultByStudentIdAndResultId = async (req, res) => {
  try {
    const { studentID, resultID } = req.params;

    const result = await Result.findById(resultID);

    if (!result) {
      return res.status(404).json({ message: "Result not found." });
    }

    const classDetails = result.ClassDetails.map((cls) => {
      const student = cls.class.students.find(
        (stu) => stu.student.toString() === studentID
      );

      if (student) {
        return {
          examName: result.examName,
          year: result.year,
          visibility: result.visibility,
          classID: cls.class.classID,
          studentID: student.student,
          marks: student.marks,
        };
      }
      return null;
    }).filter(Boolean);

    if (classDetails.length === 0) {
      return res.status(404).json({ message: "No results found for this student in this result." });
    }

    res.status(200).json({ studentResult: classDetails[0] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};








export const getResultByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
  
    
 
    const results = await Result.find({
      "ClassDetails.class.students.student": studentId,
    });

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No results found for this student." });
    }

    const studentResults = results.map((result) => {
      const classDetails = result.ClassDetails.map((cls) => {
        const student = cls.class.students.find(
          (stu) => stu.student.toString() === studentId
        );

        if (student) {
          return {
            ResultId: result._id,
            examName: result.examName,
            year: result.year,
            visibility: result.visibility,
            publishDate: result.publishDate || '',
            classID: cls.class.classID,
            studentID: student.student,
            marks: student.marks,
          };
        }
        return null;
      }).filter(Boolean);

      return classDetails;
    }).flat();

    res.status(200).json({ studentResults });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const deleteResult = async (req, res) => {
  try {
    const id = req.params.id;
    await Result.findByIdAndDelete(id);
    res.status(204).json({ message: "Result deleted successfully" });
  } catch (error) {
    res.status(404).send(error);
  }
};


export const updateResultByTeacher = async (req, res) => {
  try {
    const { examName, year, classID, studentID, subjects } = req.body;

    let result = await Result.findOne({ examName, year });

    if (!result) {
      return res.status(404).json({ message: "Result not found for this exam and year." });
    }

    let classDetails = result.ClassDetails.find(
      (cls) => cls.class.classID.toString() === classID
    );

    if (!classDetails) {
      classDetails = {
        class: {
          classID: classID,
          students: [
            {
              student: studentID,
              marks: subjects.map(({ subject, totalMarks, obtainMarks }) => ({
                subject,
                TotalMarks: totalMarks,
                obtainMarks: obtainMarks,
              })),
            },
          ],
        },
      };
      result.ClassDetails.push(classDetails);
    } else {
      let student = classDetails.class.students.find(
        (stu) => stu.student.toString() === studentID
      );

      if (!student) {
        student = {
          student: studentID,
          marks: subjects.map(({ subject, totalMarks, obtainMarks }) => ({
            subject,
            TotalMarks: totalMarks,
            obtainMarks: obtainMarks,
          })),
        };
        classDetails.class.students.push(student);
      } else {
        subjects.forEach(({ subject, totalMarks, obtainMarks }) => {
          let subjectMarks = student.marks.find((mark) => mark.subject === subject);

          if (!subjectMarks) {
            student.marks.push({
              subject: subject,
              TotalMarks: totalMarks,
              obtainMarks: obtainMarks,
            });
          } else {
            subjectMarks.TotalMarks = totalMarks;
            subjectMarks.obtainMarks = obtainMarks;
          }
        });
      }
    }

    await result.save();

    res.status(200).json({ message: "Result updated successfully.", result });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



export const updateResultByAdmin = async (req,res)=>{
  try {
    const {visibility , publishDate} = req.body;
    const result = await Result.findById(req.params.id);
    if(!result)
    {
      res.status(404).json({message: "result not found"});
    }

    result.visibility = visibility;
    result.publishDate = publishDate;
    await result.save();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}