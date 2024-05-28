
//courses schema

const mongoose =require('mongoose')
const courseSchema = new mongoose.Schema({
    
Coursename:{ type: String, require: true },

Description:{ type: String, require: true },

fee:{ type: String, require: true },

teachername:{ type: String, require: true },

})

const courseModel =mongoose.model('courses', courseSchema);
module.exports =courseModel;