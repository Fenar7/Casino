// models/Data.js
import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: null
  },
  time1hour: {
    type: Number,
    default: null
  },
  time1minute: {
    type: Number,
    default: null
  }
});

export default mongoose.models.Data || mongoose.model('Data', DataSchema);
