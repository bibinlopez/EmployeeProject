const Employee = require('../model/employee')

const createEmployee = (req, res) => {
    console.log(req.body);
    var cv = `/${req.file.filename}`
    console.log('this is file',req.file);
    var data = {
        name: req.body.name,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        departmentId: req.body.departmentId,
        file: cv
    }
    const employee = new Employee(data)
    employee.save()
        .then((result) => {
            return res.status(200).json({
                success: true,
                data: result
            })
        })
        .catch((err) => {
            return res.status(422).json({
                success: false,
                error: err
            })
        })
}


const getAllEmployee = (req,res)=>{{
    
    Employee.find()
    .populate({path:"departmentId",select: {name:1,_id:0}})
    .then((result)=>{
        return res.status(200).json({
            success: true,
            data: { result, nbHits: result.length}
        })
    })
    .catch((err)=>{
        return res.status(422).json({
            success: false,
            error: err
        })
    })
}}

const getEmployee = (req,res)=>{
    
    Employee.findById(req.params.id)
    .populate({path:"departmentId",select: {name:1,_id:0}})
    .then((result)=>{
        return res.status(200).json({
            success: true,
            data: result
        })
    })
    .catch((err)=>{
        return res.status(422).json({
            success: false,
            error: err
        })
    })
}

const getEmployeebyDeparment = (req,res)=>{
    Employee.find({departmentId: req.params.depId})
    .populate({path:"departmentId",select: {name:1,_id:0}})
    .then((result)=>{
        return res.status(200).json({
            success: true,
            data: result
        })
    })
    .catch((err)=>{
        return res.status(422).json({
            success: false,
            error: err
        })
    })
}

const deleteEmployee = (req,res)=>{
    Employee.findByIdAndRemove(req.params.id)
    .then((result)=>{
        return res.status(200).json({
            success: true,
            message: 'successfully Deleted'
        })
    })
    .catch((err)=>{
        return res.status(422).json({
            success: false,
            error: err
        })
    })
}

const updateEmployee = (req,res)=>{
    console.log('@@@',req.file.filename);
    if (req.file) {
        var cv = `/${req.file.filename}`
    }
    console.log(req.body.email);
    var data = {
        name: req.body.name,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        departmentId: req.body.departmentId,
        file: cv
    }
    Employee.findByIdAndUpdate(req.params.id, { $set: data })
        .then((result) => {
            if (result) {
                return res.status(200).json({
                    success: true,
                    message: 'successfully updated'
                })
            } else {
                return res.status(200).json({
                    success: false,
                    error: "Product not found"
                })
            }
        })
        .catch((err) => {
            return res.status(200).json({
                success: false,
                error: err
            })
        })
}


module.exports = { createEmployee,
    getAllEmployee,
    getEmployee,
    deleteEmployee,
    getEmployeebyDeparment,
    updateEmployee }