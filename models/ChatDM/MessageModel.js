import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel", // Dynamically reference the sender model
    },
    senderModel: {
      type: String,
      required: true,
      enum: ["Teacher", "Student"], // Specify the possible models for the sender
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "receiverModel", // Dynamically reference the receiver model
    },
    receiverModel: {
      type: String,
      required: true,
      enum: ["Teacher", "Student"], // Specify the possible models for the receiver
    },
    message: {
      type: String,
      required: true,
    },
    // createdAt, updatedAt are automatically added by timestamps
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
