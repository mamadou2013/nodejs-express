const express = require('express');
const controller = require('../Controller/studentController');
const programController = require('../Controller/programController');
const router = express.Router();

//store data into database 
router.post('/create',controller.create);

//login user to his account
router.post('/login',controller.loginUser);

//get all students
router.get('/students', controller.findAll);

//get one student
router.get('/students/:id',controller.findById);

//check if the student exist
router.put('/student',controller.studdentAuthentication);

//update student password
router.put('/student/update',controller.createPassword);

//find the student program based on the id
router.put('/program',programController.findProgramById);


module.exports = router;