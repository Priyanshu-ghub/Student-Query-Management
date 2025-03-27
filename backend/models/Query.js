const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
  studentName: { 
    type: String, 
    required: true 
  },
  question: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Resolved'], 
    default: 'Pending' 
  },
  response: { 
    type: String, 
    default: '' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Ensure you're properly exporting the model
module.exports = mongoose.model('Query', QuerySchema);