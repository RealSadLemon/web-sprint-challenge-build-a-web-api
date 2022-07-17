// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const { logger, projectsIdValidation, projectValidation } = require('./projects-middleware');
const projectsModel = require('./projects-model');

router.get('/', logger, (req, res) => {
    projectsModel.get()
        .then(projects => {
            res.status(200).json(projects);
        })
});

router.get('/:id', logger, projectsIdValidation, (req, res) => {
    //req.project comes from projectsIdValidation middleware.
    res.status(200).json(req.project)
})

router.post('/', logger, projectValidation, (req, res) => {
    //req.project comes from projectValidation middleware.
    projectsModel.insert(req.project)
        .then(postedProject => {
            res.status(201).json(postedProject);
        })
})

router.put('/:id', logger, projectValidation, (req, res) => {
    //req.project comes from projectValidation middleware.
    projectsModel.update(req.params.id, req.project)
        .then(updatedProject => {
            res.status(200).json(updatedProject);
        })
})

router.delete('/:id', logger, projectsIdValidation, (req, res) => {
    //req.project comes from projectsIdValidation middleware.
    const { id } = req.params;
    projectsModel.remove(id)
        .then(projectId => {
            res.status(200).json(req.project);
        })
})

router.get('/:id/actions', logger, projectsIdValidation, (req, res) => {
    const { id } = req.params;
    projectsModel.getProjectActions(id)
        .then(actions => {
            if(actions == []){
                res.status(404).json(actions);
                return;
            } else {
                res.status(200).json(actions);
                return;
            }
        })
})

module.exports = router;