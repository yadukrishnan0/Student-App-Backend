const mongoose =require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    isVerified: { type: Boolean, default: false },
},{timestamps:true});

const usersModel = mongoose.model('users',userSchema);
module.exports = usersModel;