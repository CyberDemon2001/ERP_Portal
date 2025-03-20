const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uniqueId: {
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "staff"],
        
    },
    password:
    {
        type: String,
        required: true,
    },
}, { timestamps: true })


const User = mongoose.model('User', userSchema);
module.exports = User;