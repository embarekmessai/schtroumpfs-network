const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {type: Object},
    token: {type: String},
    freinds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);