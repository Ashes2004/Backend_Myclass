import OnlineClass from "../models/OnlineClassModel.js";


export const createOnlineClass = async (req, res) => {
  try {
    const { Subject, Class, Teacher, Date, StartTime , Link } = req.body;

    const onlineClass = new OnlineClass({
      Subject,
      Class,
      Teacher,
      Date,
      StartTime,
      Link
    });

    const savedOnlineClass = await onlineClass.save();
    res.status(201).json(savedOnlineClass);
  } catch (error) {
    res.status(500).json({ message: "Error creating online class", error });
  }
};

export const getAllOnlineClasses = async (req, res) => {
  try {
    const onlineClasses = await OnlineClass.find().populate('Class').populate('Teacher');
    res.status(200).json(onlineClasses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching online classes", error });
  }
};

export const getOnlineClassById = async (req, res) => {
  try {
    const onlineClass = await OnlineClass.findById(req.params.id).populate('Class').populate('Teacher');
    if (!onlineClass) {
      return res.status(404).json({ message: "Online class not found" });
    }
    res.status(200).json(onlineClass);
  } catch (error) {
    res.status(500).json({ message: "Error fetching online class", error });
  }
};

export const updateOnlineClass = async (req, res) => {
  try {
    const updatedOnlineClass = await OnlineClass.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedOnlineClass) {
      return res.status(404).json({ message: "Online class not found" });
    }
    res.status(200).json(updatedOnlineClass);
  } catch (error) {
    res.status(500).json({ message: "Error updating online class", error });
  }
};

export const deleteOnlineClass = async (req, res) => {
  try {
    const deletedOnlineClass = await OnlineClass.findByIdAndDelete(req.params.id);
    if (!deletedOnlineClass) {
      return res.status(404).json({ message: "Online class not found" });
    }
    res.status(200).json({ message: "Online class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting online class", error });
  }
};

export const getOnlineClassByTeacherID = async (req, res) => {
  try {
     
    const onlineClasses = await OnlineClass.find({ Teacher: req.params.teacherId }).populate('Class').populate('Teacher');
    if (!onlineClasses || onlineClasses.length === 0) {
      return res.status(404).json({ message: "No online classes found for this teacher" });
    }
    res.status(200).json(onlineClasses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching online classes by teacher", error });
  }
};

export const getOnlineClassByClassID = async (req, res) => {
  try {
    const classID = req.params.classId;
    const onlineClasses = await OnlineClass.find({ Class: classID }).populate('Class').populate('Teacher');
    if (!onlineClasses || onlineClasses.length === 0) {
      return res.status(404).json({ message: "No online classes found for this class" });
    }
    res.status(200).json(onlineClasses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching online classes by class", error });
  }
};
