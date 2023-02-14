const mongoose = require('mongoose')
const departmentController = mongoose.Schema({
    name: {
        type: String,
        require: [true,'must provide department name']
    },
    details: {
        type: String,
        require: false
    }
})


module.exports = mongoose.model('Department',departmentController)