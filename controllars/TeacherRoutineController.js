import { TeacherRoutine , ClassRoutine } from '../models/RoutineModal.js';
import Teacher from '../models/TeacherModel.js';
// Get all teacher routines
export const getTeacherRoutines = async (req, res) => {
    try {
        const teacherRoutines = await TeacherRoutine.find().populate('teacherId');
        res.json(teacherRoutines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific teacher routine by ID
export const getTeacherRoutineById = async (req, res) => {
    try {
        const teacherRoutine = await TeacherRoutine.findOne({teacherId: req.params.id}).populate({ path: 'teacherId', select : 'name'}).populate({
            path: 'routine.periods.classId', 
            select: 'name' 
          });
        if (teacherRoutine.length == 0) return res.status(404).json({ message: 'Teacher routine not found' });
        res.json(teacherRoutine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// // Create a new teacher routine
// export const createTeacherRoutine = async (req, res) => {
//     const teacherRoutine = new TeacherRoutine(req.body);
   
//     try {
//         const newTeacherRoutine = await teacherRoutine.save();
//         const teacher = await Teacher.findById( req.body.teacherId);
//         if (!teacher) {
//             return res.status(404).json({ message: "Teacher not found" });
//         }

//         // Update the teacher's routine with the new routine ID
//         teacher.TeacherRoutine = newTeacherRoutine._id;
//         await teacher.save();
        
//         res.status(201).json(newTeacherRoutine);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // Update a teacher routine by ID
// export const updateTeacherRoutine = async (req, res) => {
//     try {
//         const updatedTeacherRoutine = await TeacherRoutine.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedTeacherRoutine) return res.status(404).json({ message: 'Teacher routine not found' });
//         res.json(updatedTeacherRoutine);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // Delete a teacher routine by ID
// export const deleteTeacherRoutine = async (req, res) => {
//     try {
//         // Find the teacher routine by ID and delete it
//         const teacherRoutine = await TeacherRoutine.findByIdAndDelete(req.params.id);
        
//         // If the teacher routine is not found, return a 404 error
//         if (!teacherRoutine) {
//             return res.status(404).json({ message: 'Teacher routine not found' });
//         }
        
//         // If the teacher is associated with this routine, update or remove the reference
//         const teacher = await Teacher.findOne({ TeacherRoutine: req.params.id });
//         if (teacher) {
//             teacher.TeacherRoutine = null; // Or any other logic to handle removing the reference
//             await teacher.save();
//         }
        
//         res.json({ message: 'Teacher routine deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


import mongoose from 'mongoose';

export const createTeacherRoutinesFromClassRoutines = async () => {
    try {
        // Fetch all class routines with teacher details
        const classRoutines = await ClassRoutine.find().populate('routine.periods.teacherId');

        // Dictionary to hold teacher routines
        const teacherRoutineMap = {};

        // Process each class routine
        classRoutines.forEach(classRoutine => {
            classRoutine.routine.forEach(dailyRoutine => {
                const day = dailyRoutine.day;

                dailyRoutine.periods.forEach(period => {
                    // Ensure teacherId is properly set
                    const teacherId = period.teacherId?._id;
                    if (!teacherId) {
                        console.warn(`Missing teacherId for period: ${JSON.stringify(period)}`);
                        return; // Skip this period if teacherId is missing
                    }

                    // Initialize if teacher's entry doesn't exist
                    if (!teacherRoutineMap[teacherId]) {
                        teacherRoutineMap[teacherId] = {
                            teacherId: new mongoose.Types.ObjectId(teacherId),
                            routine: {}
                        };
                    }

                    // Initialize the day array if it doesn't exist
                    if (!teacherRoutineMap[teacherId].routine[day]) {
                        teacherRoutineMap[teacherId].routine[day] = [];
                    }

                    // Push the period to the teacher's routine for the day
                    teacherRoutineMap[teacherId].routine[day].push({
                        subject: period.subject,
                        roomNumber: period.roomNumber,
                        startPeriod: period.startPeriod,
                        endPeriod: period.endPeriod,
                        classId: classRoutine.classId
                    });
                });
            });
        });

        // Save teacher routines to the database
        for (const [teacherId, routineData] of Object.entries(teacherRoutineMap)) {
            // Convert routine map to array
            const routineArray = Object.entries(routineData.routine).map(([day, periods]) => ({
                day,
                periods,
            }));

            // Check if a routine for the teacher already exists
            const existingRoutine = await TeacherRoutine.findOne({ teacherId: routineData.teacherId });
            if (existingRoutine) {
                // Update existing routine
                existingRoutine.routine = routineArray;
                await existingRoutine.save();
            } else {
                // Create new routine
                const newRoutine = new TeacherRoutine({
                    teacherId: routineData.teacherId,
                    routine: routineArray,
                });
                await newRoutine.save();
            }
        }

        console.log('Teacher routines created/updated successfully.');
    } catch (err) {
        console.error('Error creating teacher routines:', err);
    }
};
