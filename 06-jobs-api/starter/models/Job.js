const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    // Define the company field
    company: { type: String, required: [true, 'Please provide a company name'], maxlength: 50 },
    // Define the position field
    position: { type: String, required: [true, 'Please provide a job position'], maxlength: 100 },
    // Define the status field
    status: { type: String, enum: ['interviews', 'declined', 'pending'], default: 'pending' },
    // Define the createdBy field
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: [true, 'Please provide user'] },
    // Automatically managed timestamps
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
 