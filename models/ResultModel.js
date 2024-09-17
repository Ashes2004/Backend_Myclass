import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  ClassDetails: [
    {
      class: {
        classID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class",
          reuired: true,
        },
        students: [
          {
            student: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Student",
              required: true,
            },
            marks: [
              {
                subject: {
                  type: String,
                },
                TotalMarks: {
                  type: Number,
                },
                obtainMarks: {
                  type: Number,
                },
              },
            ],
          },
        ],
      },
    },
  ],

  visibility: {
    type: Boolean,
    default: false,
  },
  publishDate:{
    type:String
  }
});

const Result = mongoose.model("Result", resultSchema);
export default Result;
