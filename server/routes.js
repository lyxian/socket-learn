const Model = require('./model');
const express = require('express');
const router = express.Router();

router.post('/post', async (request, response) => {
    const data = new Model({
        name: request.body.name,
        age: request.body.age
    })
    try {
        const dataToSave = await data.save();
        response.status(200).json(dataToSave);
    } catch (error) {
        response.statusMessage(400).json({
            message: error.message
        });
    }
    // response.send('Post API');
})

router.get('/getAll', async (request, response) => {
    try {
        const data = await Model.find();
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
})

router.get('/getOne/:id', async (request, response) => {
    try {
        const data = await Model.findById(request.params.id);
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
})

router.patch('/update/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const updatedData = request.body;
        const options = { new: true };
        const result = await Model.findByIdAndUpdate(id, updatedData, options);
        response.status(201).json(result);
    } catch (error) {
        response.status(400).json({
            message: error.message
        });
    }
})

router.delete('/delete/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const data = await Model.findByIdAndDelete(id);
        response.status(201).json(`Docuiment with ${data.name} has been deleted.`);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
})

module.exports = router;