const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let toDoSchema = new Schema({
    completed: {type: Boolean, default: false},
    description: {type: String, required: true},
    date: {type: String, required: true}

}) 
module.exports = mongoose.model('Task', toDoSchema);