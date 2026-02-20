const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['prototype', 'testing', 'shipped'],
    default: 'prototype'
  },
  notes: { type: String },
  updatedBy: { type: String },
  activityLog: [
    {
      changedTo: String,
      changedBy: String,
      changedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Component', componentSchema);