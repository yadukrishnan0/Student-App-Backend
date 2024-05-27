const mongoose =require('mongoose');
const adminSchema = new mongoose.Schema({
    name: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    isVerified: { type: Boolean, default: false },
},{timestamps:true});

const adminModel = mongoose.model('admin',adminSchema);
module.exports = adminModel;