const express = require('express');
const Departments = require('../data/models/Department');

//show list department
module.exports.showsDepartments = (req, res, next) => {
    Departments.find()
    .then(department => {
        res.send({department: department});
    })
    .catch(err => console.log(err))
}

//create department
module.exports.createDepartment = (req, res, next) => {
    const name = req.body.name;
    let newDepartment = new Departments({name})
    newDepartment.save()
    .then(item => {
        console.log(item);
        res.status(200).json({'department': 'Department in added successfully'})
    })
    .catch(err => {
        console.log(req.body);
        res.status(400).send("unable to save to database");
    });
}

//delete department
module.exports.deleteDepartment = (req, res, next) => {
    console.log(req.params.id)
    Departments.findByIdAndDelete(req.params.id)
    .then(department => res.json(department))
    .catch(err => res.status(400).json('Err: ' + err))
}

module.exports.editDepartment = (req, res, next) => {
    Departments.findById(req.params.id)
    .then(
        department => {
            res.json({departmentId: department});
        }
    ).catch( 
        err => res.status(400).json({err: err})
    )
}

//update department
module.exports.updateDepartment = (req, res, next) => {
    let nameChange = req.body.nameChange;
    Departments.findById(req.params.id)
    .then(department => {
        department.name = nameChange;
        department.save()
        .then(() => res.json({message:'Exercise update'}))
        .catch( err => res.status(400).json('Err: ' + err));
    })
}