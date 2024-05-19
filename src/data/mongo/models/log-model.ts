import { Schema, model } from "mongoose";


const logSchema = new Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  origin: {
    type: String,
    require: true,
  },
});

export const LogModel = model('log', logSchema);