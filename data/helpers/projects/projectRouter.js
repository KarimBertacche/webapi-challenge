const express = require('express');
const dbProjects = require('./projectModel');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const projects = await dbProjects.get();
        res.status(200).json(projects);
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving the Projects'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const actions = await dbProject.getProjectActions(id);



    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving the actions for the projects'
        });
    }
});

function validateId(req, res, next) {
    const { id } = req.params;

    if(id) {
        

    } else {

    }
};

module.exports = router;