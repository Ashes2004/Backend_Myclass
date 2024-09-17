import Attendance from "../models/AttendenceModel.js";
import Class from "../models/ClassModel.js";
import Student from "../models/StudentModel.js";
export const createAttendenceRecord = async (req, res) => {
  const { date, classId, studentAttendances, isHoliday } = req.body;

  try {
    const existingAttendance = await Attendance.findOne({ date, classId });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance for this date has already been recorded.",
      });
    }

    // Create a new attendance record
    const Students = await Class.findOne({ classId: classId });
    const attendanceRecords = isHoliday ? [] : studentAttendances;
    const totalStudents = Students.students.length;
    const presentCount = !isHoliday
      ? studentAttendances.filter((sa) => sa.present).length
      : 0;
    const absentCount = !isHoliday ? totalStudents - presentCount : 0;

    const newAttendance = new Attendance({
      date,
      classId,
      totalStudents,
      presentCount,
      absentCount,
      isHoliday,
      studentAttendances: attendanceRecords,
    });

    await newAttendance.save();

    // Update student model if it's not a holiday
    if (!isHoliday) {
      for (const sa of studentAttendances) {
        await Student.updateOne(
          { _id: sa.studentId },
          {
            $inc: {
              totalSchoolDays: 1,
              numberOfDaysPresent: sa.present ? 1 : 0,
            },
            $push: {
              attendance: newAttendance._id, 
            },
          }
        );
      }
    }

    res.status(201).json({
      message: "Attendance recorded successfully",
      attendanceRecord: newAttendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAttendence = async (req, res) => {
  const { classId, date } = req.params;
  const { studentAttendances, isHoliday } = req.body;

  try {
    // Find the existing attendance record
    const attendanceRecord = await Attendance.findOne({ classId, date });
    if (!attendanceRecord) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    const studentIds = attendanceRecord.studentAttendances.map((sa) => sa.studentId);
    const presentCount = studentAttendances.filter((sa) => sa.present).length;
    const totalStudents = studentAttendances.length;

    if (isHoliday == true) {
      if (attendanceRecord.isHoliday == false) {
        await Student.updateMany(
          { _id: { $in: studentIds } },
          { $inc: { totalSchoolDays: -1, numberOfDaysPresent: -1 }  ,  $pull: { attendance: attendanceRecord._id } }
        );
        let prevattendence = attendanceRecord.studentAttendances; 
        for (const sa of prevattendence) {
          await Student.updateOne(
            { _id: sa.studentId },
            { $inc: { numberOfDaysPresent: sa.present ? 0 : 1 } }
          );
        }
        let nullattendence = [];
        attendanceRecord.isHoliday = true;
        attendanceRecord.presentCount = 0;
        attendanceRecord.absentCount = 0;
        attendanceRecord.studentAttendances = nullattendence;
      }
    } else {
      if (attendanceRecord.isHoliday) {
        attendanceRecord.isHoliday = false;
        attendanceRecord.presentCount = presentCount;
        attendanceRecord.absentCount = totalStudents - presentCount;
        attendanceRecord.studentAttendances = studentAttendances;
        for (const sa of attendanceRecord.studentAttendances) {
          await Student.updateOne(
            { _id: sa.studentId },
            {
              $inc: {
                totalSchoolDays: 1,
                numberOfDaysPresent: sa.present ? 1 : 0,
              },
              $push: {
                attendance: attendanceRecord._id, // Add attendance reference
              },
            }
          );
        }
      } else {
        attendanceRecord.presentCount = presentCount;
        attendanceRecord.absentCount = totalStudents - presentCount;
        await Student.updateMany(
          { _id: { $in: studentIds } },
          { $inc: { totalSchoolDays: -1, numberOfDaysPresent: -1 } }
        );
        for (const sa of studentAttendances) {
          const previousAttendance = attendanceRecord.studentAttendances.find(
            (a) => a.studentId.equals(sa.studentId)
          );
          console.log(previousAttendance.present);

          let increment;
          if (previousAttendance.present === sa.present) {
            increment = 1;
          } else {
            if (sa.present) {
              increment = 2;
            } else {
              increment = 0;
            }
          }

          await Student.updateOne(
            { _id: sa.studentId },
            { $inc: { totalSchoolDays: 1, numberOfDaysPresent: increment } }
          );
        }
      }
    }

    attendanceRecord.studentAttendances = studentAttendances;
    await attendanceRecord.save();

    res
      .status(200)
      .json({ message: "Attendance updated successfully", attendanceRecord });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findAttendenceRecord = async (req, res) => {
  try {
    const { classId, date } = req.params;
    const attendanceRecord = await Attendance.findOne({
      classId,
      date: date,
    });

    if (!attendanceRecord)
      return res.status(404).json({ message: "Attendance record not found" });

    res.json(attendanceRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
