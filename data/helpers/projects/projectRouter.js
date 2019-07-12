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

router.get('/:id', validateById, async (req, res) => {
    res.status(200).json(req.project);
});

router.get('/actions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const actions = await dbProjects.getProjectActions(id);

    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving the actions for the projects'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProject = req.body;
        
        if(newProject && Object.keys(newProject).length) {
            const addedProject = await dbProjects.insert(newProject);

            res.status(201).json(addedProject);
        } else {
            res.status(400).json({
                message: 'Name or description are missing from the request'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while creating project'
        });
    }
});

async function validateById(req, res, next) {
    try {
        const { id } = req.params;

        if(id) {
            const project = await dbProjects.gets(id);
            req.project = project;
            next();
        } else {
            res.status(404).json({
                message: 'Project Id not found'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving the actions for the projects'
        });
    }
};

module.exports = router;