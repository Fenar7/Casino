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
  },
  time2hour: {
    type: Number,
    default: null
  },
  time2minute: {
    type: Number,
    default: null
  },
  time3hour: {
    type: Number,
    default: null
  },
  time3minute: {
    type: Number,
    default: null
  },
  time4hour: {
    type: Number,
    default: null
  },
  time4minute: {
    type: Number,
    default: null
  },
});

export default mongoose.models.Data || mongoose.model('Data', DataSchema);
