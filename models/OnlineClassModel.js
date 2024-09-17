import mongoose from 'mongoose'


const onlineClassSchema = new mongoose.Schema({
Subject:{
    type:String,
    required:true
},
Class:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true
},
Teacher:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true

},
Date:{
    type:String,
    required:true
},
StartTime:{
    type:String,
    required:true
},
Link: {
    type:String,
    required:true
},
createdAt: {
    type: Date,
    default: Date.now,
  }


});


const OnlineClass = mongoose.model("OnlineClass", onlineClassSchema);
export default OnlineClass;