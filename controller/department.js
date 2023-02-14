const Department = require('../model/department')

const createDepartment = (req, res) => {

    Department.findOne({ name: req.body.name })
        .then((result) => {
            if (result) {
                console.log(result);
                return res.status(200).json({
                    success: false,
                    error: "Department already exist"
                })
            } else {
                const department = new Department(req.body)
                department.save()
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
        })
        .catch((err) => {
            return res.status(422).json({
                success: false,
                error: err
            })
        })




}

const getAllDepartment = (req, res) => {
    {
        Department.find()
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
}

const getDepartment = (req, res) => {
    Department.findById(req.params.id)
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

const deleteDepartment = (req, res) => {
    Department.findByIdAndRemove(req.params.id)
        .then((result) => {
            return res.status(200).json({
                success: true,
                message: 'successfully Deleted'
            })
        })
        .catch((err) => {
            return res.status(422).json({
                success: false,
                error: err
            })
        })
}

const updateDepartment = (req, res) => {
    var data = req.body
    Department.findOne({ name: req.body.name })
        .then((result) => {
            if (result) {
                console.log(result);
                return res.status(200).json({
                    success: false,
                    error: "Department already exist"
                })
            } else {
                Department.findByIdAndUpdate(req.params.id, { $set: req.body })
                    .then((result) => {
                        if (result) {
                            return res.status(200).json({
                                success: true,
                                data: result
                            })
                        } else {
                            return res.status(200).json({
                                success: false,
                                error: "Department not found"
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
        })
        .catch((err) => {
            return res.status(200).json({
                success: false,
                error: err
            })
        })
}

module.exports = { createDepartment, getAllDepartment, getDepartment, deleteDepartment, updateDepartment }