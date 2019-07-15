const express = require('express');
const dbActions = require('./actionModel');

const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const actions = await dbActions.get();
        res.status(200).json(actions);
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving the Actions'
        });
    }
});

router.post('/:id', validateDescription, async (req, res) => {
    try {
        const newAction = { ...req.body, project_id: req.params.id };
        
        if(newAction && Object.keys(newAction).length) {
            const addedAction = await dbActions.insert(newAction);

            res.status(201).json(addedAction);
        } else {
            res.status(400).json({
                message: 'Name or description are missing from the request'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while creating action'
        });
    }
});

router.put('/:id', [ validateById, validateDescription ], async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;

        if(changes && Object.keys(changes).length) {
            const updatedAction = await dbActions.update(id, changes);

            res.status(200).json(updatedAction);
        } else {
            res.status(400).json({
                message: 'Name or description are missing from the request'
            });
        }

    } catch(error) {
        res.status(500).json({
            message: 'Server error while updating action'
        });
    }
});

router.delete('/:id', validateById, async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await dbActions.remove(id);

        res.status(204).end();

    } catch(error) {
        res.status(500).json({
            message: 'Server error while deleting the action'
        }); 
    }
});

async function validateById(req, res, next) {
    try {
        const { id } = req.params;
        
        if(!isNaN(parseInt(id))) {
            const action = await dbActions.get(id);

            if(action) {
                req.action = action;
                next();
            } else {
                res.status(404).json({
                    message: 'Action not found, invalid Id'
                });
            }
        } else {
            res.status(400).json({
                message: 'Id is not a number'
            });
        }
    } catch(error) {
        res.status(500).json({
            message: 'Server error while retrieving the id for the action'
        });
    }
};

function validateDescription(req, res, next) {
    try {
        const { body } = req;

        if(body.description.length > 0 && body.description.length <= 128) {
            next()
        } else if(body.description === '') {
            res.status(400).json({
                message: 'Description is undefined'
            });
        } else {
            res.status(400).json({
                message: 'Description exceeds 128 characters'
            }); 
        }

    } catch(error) {
        res.status(500).json({
            message: 'Server error while validating request body'
        });
    }
}

module.exports = router;