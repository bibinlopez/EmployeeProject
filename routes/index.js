var express = require('express');
var router = express.Router();

var path = require('path')
const multer = require('multer');

const {createDepartment, getAllDepartment,getDepartment,deleteDepartment,updateDepartment} = require('../controller/department')
const { createEmployee,getAllEmployee,getEmployee,deleteEmployee,getEmployeebyDeparment,updateEmployee } = require('../controller/employee')


router.post('/dep',createDepartment)
router.get('/dep',getAllDepartment)
router.get('/dep/:id',getDepartment)
router.delete('/dep/:id',deleteDepartment)
router.put('/dep/:id',updateDepartment)



var storage = multer.diskStorage({
  destination: './public/employeeCV' ,
  filename: function (req, file, cb) {
    console.log("this is file: ",file);
  //   console.log("*****",file.originalname);

    var ext = path.extname(file.originalname)
    const pdf = 'pdf'
    console.log('ext',ext);
    if(!(ext===pdf)){
      console.log('upload valid document');
    }
    cb(null, file.fieldname + '-' + Date.now()+ext)
  }
})

const maxSize = 1 * 1000 * 1000;
// var upload = multer({ storage: storage })
var upload = multer({ 
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb){
  
      // Set the filetypes, it is optional
      var filetypes = /pdf|docx|doc/;
      var mimetype = filetypes.test(file.mimetype);

      var extname = filetypes.test(path.extname(
                  file.originalname).toLowerCase());
      
      if (mimetype && extname) {
          return cb(null, true);
      }else{
        console.log('please upload valide document');
        cb("Error: File upload only supports the "
              + "following filetypes - " + filetypes);
      }
    } 

})   

router.use('/',express.static('./public/employeeCV'))

router.post('/emp',upload.single('cv'),createEmployee)
router.get('/emp',getAllEmployee)
router.get('/emp/:id',getEmployee)
router.get('/empdep/:depId',getEmployeebyDeparment)
router.delete('/emp/:id',deleteEmployee)
router.put('/emp/:id',upload.single('cv'),updateEmployee)

module.exports = router;
