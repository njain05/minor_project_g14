const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    parentEmail: { type: String, required: true },
    urn: { type: String, required: true },
    magicToken: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: '30d' }
});

module.exports = mongoose.model('Report', reportSchema);