import Poll from '../models/PollModel.js';


export const createPoll = async (req, res) => {
  try {
    const { teacherId, classId, timer } = req.body;

    const newPoll = new Poll({
      teacher: teacherId,
      class: classId,
      Timer: timer,
    });

    await newPoll.save();
    res.status(201).json({ message: "Poll created successfully", poll: newPoll });
  } catch (error) {
    res.status(500).json({ message: "Error creating poll", error });
  }
};


export const getPollByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const poll = await Poll.find({ class: classId }).populate("teacher class");

    if (!poll) {
      return res.status(404).json({ message: "No active poll found for this class" });
    }

    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({ message: "Error fetching poll", error });
  }
};


export const getPollByTeacher = async (req, res) => {
    try {
      const { teacherId } = req.params;
  
      const poll = await Poll.find({ teacher: teacherId  }).populate("teacher class");
  
      if (!poll) {
        return res.status(404).json({ message: "No active poll found for this class" });
      }
  
      res.status(200).json(poll);
    } catch (error) {
      res.status(500).json({ message: "Error fetching poll", error });
    }
  };

export const submitResponse = async (req, res) => {
  try {
    
    const { studentId, option } = req.body;

 
    if (!['A', 'B', 'C', 'D'].includes(option)) {
      return res.status(400).json({ message: "Invalid option selected" });
    }

   
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found for this class" });
    }

 
    const existingResponse = poll.studentResponse.find(
      (response) => response.student.toString() === studentId
    );

    if (existingResponse) {
      return res.status(400).json({ message: "  You have already responded" });
    }


    poll.studentResponse.push({
      student: studentId,
      option,
    });

   
    await poll.save();
    res.status(200).json({ message: "Response submitted successfully", poll });
  } catch (error) {
    res.status(500).json({ message: "Error submitting response", error });
  }
};


export const endPoll = async (req, res) => {
  try {
    const { classId } = req.params;

    const poll = await Poll.findOne({ class: classId });

    if (!poll) {
      return res.status(404).json({ message: "Poll not found for this class" });
    }


    const results = { A: 0, B: 0, C: 0, D: 0 };

    poll.studentResponse.forEach((response) => {
      if (['A', 'B', 'C', 'D'].includes(response.option)) {
        results[response.option]++;
      }
    });

    res.status(200).json({ message: "Poll ended successfully", results });
  } catch (error) {
    res.status(500).json({ message: "Error ending poll", error });
  }
};


export const endPollbyId = async (req, res) => {
    try {
     
  
      const poll = await Poll.findById(req.params.id);
  
      if (!poll) {
        return res.status(404).json({ message: "Poll not found for this class" });
      }
  
  
      const results = { A: 0, B: 0, C: 0, D: 0 };
  
      poll.studentResponse.forEach((response) => {
        if (['A', 'B', 'C', 'D'].includes(response.option)) {
          results[response.option]++;
        }
      });
  
      res.status(200).json({ message: "Poll ended successfully", results });
    } catch (error) {
      res.status(500).json({ message: "Error ending poll", error });
    }
  };


export const deletePoll = async(req,res)=>{
    try {
        const poll = await Poll.findByIdAndDelete(req.params.id);
        if(!poll) res.status(404).json({message: "poll not found"});
        res.status(200).json({message: "poll deleted successfully "})
    } catch (error) {
        res.status(500).json({ message: "Error to delete poll", error });
    }
}
