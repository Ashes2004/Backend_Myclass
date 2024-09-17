import { ClassRoutine } from '../models/RoutineModal.js';
import Class from '../models/ClassModel.js';
// Get all class routines
export const getClassRoutines = async (req, res) => {
    try {
        const classRoutines = await ClassRoutine.find().populate('classId');
        res.json(classRoutines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Get a specific class routine by ID
export const getClassRoutineById = async (req, res) => {
    try {
        const classRoutine = await ClassRoutine.findOne({classId : req.params.id}).populate('classId');
        if (classRoutine.length == 0) return res.status(404).json({ message: 'Class routine not found' });
        res.json(classRoutine);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new class routine
export const createClassRoutine = async (req, res) => {
    const classRoutine = new ClassRoutine(req.body);
    try {
        const existingRoutine = await ClassRoutine.findOne({ classId: req.body.classId });
        if (existingRoutine) {
            return res.status(400).json({ message: 'A routine with this class ID already exists' });
        }
        const newClassRoutine = await classRoutine.save();
        const classelement = await Class.findById(req.body.classId);
        if(!classelement)
        {
            return res.status(404).json({ message: 'class not found' });
        }

        classelement.ClassRoutine = newClassRoutine._id;
        await classelement.save();
        res.status(201).json(newClassRoutine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a class routine by ID
export const updateClassRoutine = async (req, res) => {
    try {
        const updatedClassRoutine = await ClassRoutine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClassRoutine) return res.status(404).json({ message: 'Class routine not found' });
        res.json(updatedClassRoutine);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a class routine by ID
export const deleteClassRoutine = async (req, res) => {
    try {
        const classRoutine = await ClassRoutine.findByIdAndDelete(req.params.id);
        if (!classRoutine) return res.status(404).json({ message: 'Class routine not found' });
        const classelement = await Class.findOne({ClassRoutine :req.body.id});
        if(!classelement)
        {
            classelement.ClassRoutine = null;
            await classelement.save();
        }
        res.json({ message: 'Class routine deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
