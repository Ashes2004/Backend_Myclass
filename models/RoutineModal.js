import mongoose from "mongoose";

// Schema for the class period object
const classPeriodSchema = new mongoose.Schema({
  subject: {
    type: String,
  
  },
  
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    
    ref: "Teacher", // Reference to the Teacher model
  },
  roomNumber: {
    type: String,
   
  },
  startPeriod: {
    type: String,
   
  },
  endPeriod: {
    type: String,
   
    
  },
});

const teacherDailyRoutineSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  periods: [classPeriodSchema],
});

const timeFormat = /^[0-2][0-9]:[0-5][0-9]$/; // Regex for "HH:MM" format

const teacherRoutineSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  routine: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: true,
      },
      periods: [
        {
          subject: String,
          roomNumber: String,
          startPeriod: {
            type: String,
            required: true,
            validate: {
              validator: v => timeFormat.test(v),
              message: props => `${props.value} is not a valid time format!`
            }
          },
          endPeriod: {
            type: String,
            required: true,
            validate: {
              validator: v => timeFormat.test(v),
              message: props => `${props.value} is not a valid time format!`
            }
          },
          
          classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class', // Reference to the Class model
            required: true // Set to true if this field is mandatory
          }
        }
      ]
    }
  ]
});
const classDailyRoutineSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  periods: [classPeriodSchema],
});

const classRoutineSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Class", // Reference to the Class model
    unique: true,
  },
  routine: [classDailyRoutineSchema],
});

classRoutineSchema.index(
  { classId: 1, "routine.day": 1 },
  { unique: true }
);

const ClassRoutine = mongoose.model("ClassRoutine", classRoutineSchema);
const TeacherRoutine = mongoose.model("TeacherRoutine", teacherRoutineSchema);
export { ClassRoutine, TeacherRoutine };
