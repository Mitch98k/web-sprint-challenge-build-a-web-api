// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');

const router = express.Router();

router.get('/api/actions', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    } catch(err) {
        res.status(500).json({ message: "The actions could not be retrieved", error: err.message });
    }
});

router.get('/api/actions/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const action = await Actions.get(id);
        if (!action) {
            res.status(404).json({ message: "The action with the specified id does not exist" });
        } else {
            res.status(200).json(action);
        }
    } catch(err) {
        res.status(500).json({ message: "The action could not be retrieved", error: err.message });
    }
});

router.post('/api/actions', async (req, res) => {
    const action = req.body;
    try {
        if (!action.project_id || !action.description || !action.notes) {
            res.status(400).json({ message: "Please provide a project id, description, and notes" });
        } else {
            const valid = await Actions.get(action.project_id);
            if (!valid) {
                res.status(404).json({ message: "The project id provided does not exist"});
            } else {
                const newAction = await Actions.insert(action);
                res.status(201).json(newAction);
            }
        }
    } catch(err) {
        res.status(500).json({ message: "The new action could not be created", error: err.message });
    }
});

router.put('/api/actions/:id', async (req, res) => {
    const {id} = req.params;
    const action = req.body;
    try {
        if (!action.project_id || !action.description || !action.notes) {
            res.status(400).json({ message: "PLease provide a project id, description, and notes" });
        } else {
            const valid = await Actions.get(action.project_id);
            if (!valid) {
                res.status(400).json({ message: "The project id provided does not exist" });
            } else {
                const updAction = await Actions.update(id, action);
                res.status(200).json(updAction);
            }
        }
    } catch(err) {
        res.status(500).json({ message: "The action could not be updated", error: err.message });
    }
});

router.delete('/api/actions/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const delAction = await Actions.get(id);
        if (!delAction) {
            res.status(404).json({ message: "The action with the specified id does not exist" });
        } else {
            await Actions.remove(id);
            res.status(204);
        }
    } catch(err) {
        res.status(500).json({ message: "The action could not be removed", error: err.message });
    }
});

module.exports = router;