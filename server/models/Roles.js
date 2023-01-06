const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
}, { timestamps: true })

module.exports = mongoose.model("User", roleSchema);