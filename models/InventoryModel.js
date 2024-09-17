import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemId: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  supplier: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ["New", "Good", "Fair", "Poor"],
    required: true,
  },
  lastCheckedDate: {
    type: Date,
    default: Date.now,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
