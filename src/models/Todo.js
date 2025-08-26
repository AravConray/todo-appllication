const mongoose = require('mongoose');
const { Schema } = mongoose;
const todoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Todo', todoSchema);
