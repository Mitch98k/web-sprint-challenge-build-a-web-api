// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/api/projects', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch(err) {
        res.status(500).json({ message: "The projects could not be retrieved", error: err.message });
    }
}); 

router.get('/api/projects/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const project = await Projects.get(id);
        if (!project) {
            res.status(404).json({ message: "The project with the specified id does not exist" });
        } else {
            res.status(200).json(project);
        }
    } catch(err) {
        res.status(500).json({ message: "The product could not be retrieved", error: err.message });
    }
});

router.post('/api/projects', async (req, res) => {
    const project = req.body;
    try {
        if (!project.name || !project.description) {
            res.status(400).json({ message: "Please provide a name and description" });
        } else {
            const newProject = await Projects.insert(project);
            res.status(201).json(newProject);
        }
    } catch(err) {
        res.status(500).json({ message: "The new project could not be created", error: err.message });
    }
});

router.put('/api/projects/:id', async (req, res) => {
    const {id} = req.params;
    const project = req.body;
    try {
        if (!project.name || !project.description) {
            res.status(400).json({ message: "Please provide a name and description" });
        } else {
            const updProject = await 
            Projects.update(id, project);
            if (!updProject) {
                res.status(404).json({ message: "The project with the specified id does not exist" });
            } else {
                res.status(200).json(updProject);
            }
        }
    } catch(err) {
        res.status(500).json({ message: "The project could not be updated", error: err.message });
    }
});

router.delete('/api/projects/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const delProject = await Projects.get(id);
        if (!delProject) {
            res.status(404).json({ message: "The project with the specified id does not exist" });
        } else {
            await Projects.remove(id);
            res.status(204);
        }
    } catch(err) {
        res.status(500).json({ message: "The project could not be deleted", error: err.message });
    }
});

router.get('/api/projects/:id/actions', async (req, res) => {
    const {id} = req.params;
    try {
        const actions = await Projects.getProjectActions(id);
        if (!actions) {
            res.status(404).json({ message: "The product with the specified id does not exist" });
        } else {
            res.status(200).json(actions);
        }
    } catch(err) {
        res.status(500).json({ message: "The products actions could not be retrieved", error: err.message });
    }
});

module.exports = router;