
import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

const AlertToken = mongoose.model('AlertToken', tokenSchema);
export default AlertToken;
