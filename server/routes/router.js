const express = require('express')
const router = express.Router()
const Task = require('../models/todo.schema');

router.get('/', (req, res) => {
    console.log('got to tasks GET');
    Task.find({})
        .then((data) => {
            console.log('here is the data', data);
            res.send(data);
        }).catch((error) => {
            console.log('error in GET', error);
            res.sendStatus(500)
        })
})

router.post('/', (req, res) => {
    console.log('got to tasks POST');
    let newTask = new Task(req.body);
    newTask.save().then((data) => {
        console.log(data);
        res.sendStatus(201)
    }).catch((error) => {
        console.log('error', error);
        res.sendStatus(500)
    });
});

router.delete('/:id', (req, res) => {
    Task.findByIdAndRemove({
        _id: req.params.id
    }).then((responseFromMongoDB) => {
        console.log(responseFromMongoDB);

        res.sendStatus(200);
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;

    Task.findByIdAndUpdate(id, req.body)
        .then((data) => {
            console.log('new data from edit PUT', data);
    
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });

})




module.exports = router;