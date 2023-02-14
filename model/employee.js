const mongoose = require('mongoose')
const employeeController = mongoose.Schema({
    name: {
        type: String,
        require: [true,'must provide employee name']
    },
    email: {
        type: String,
        require: [true,'must provide employee email']
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Department',
        require: [true,'must provide departmentId']
    },
    mobileNumber: {
        type: Number,
        require: [true,'must provide employee mobile Number']
    },
    file: {
        type: String,
        require: [true,'must upload CV']
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
    
})


module.exports = mongoose.model('Employee',employeeController)