import mongoose from 'mongoose';

// Define the schema for managing class assignments
const administrativeSchema = new mongoose.Schema({
    InstituteName: {
        type: String,
        required: true,
      },
      InstituteCode: {
        type: String,
        required: true,
        unique:true
      },
      profilePhoto:{
        type:String
      },
      contactNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
     
      password: {
        type: String,
        required: true
      },  
//   classes: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Class'
//   }],
//   teachers: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Teacher'
//   }],
//   Attendance: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Attendance'
//   }],
//   gradeRecords: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Grade'
//   }],
//   inventoryItems: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Inventory'
//   }],
  notices: [{
    title: String,
    description: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  events: [{
    name: String,
    description: String,
    date: Date,
    location: String
  }],
  announcements: [{
    message: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

const Administrative = mongoose.model('Administrative', administrativeSchema);

export default Administrative;
