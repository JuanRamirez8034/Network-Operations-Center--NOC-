import { Schema, model } from "mongoose";


const logSchema = new Schema({
  createdAt: {
    type: Date,
    default: new Date(),
  },
  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
});

export const LogModel = model('log', logSchema);