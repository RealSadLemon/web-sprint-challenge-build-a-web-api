// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const actionsModel = require('./actions-model');
const { actionsBodyValidation, logger, actionsBodyIdValidation } = require('./actions-middlware');

router.get('/', logger, (req, res) => {
    actionsModel.get()
        .then(actions => {
            if(actions == []){
                res.status(404).json({ message: "action not found." });
                return;
            } else {
                res.status(200).json(actions);
                return;
            }
        })
})

router.get('/:id', logger, (req, res) => {
    actionsModel.get(req.params.id)
        .then(action => {
            if(action === null){
                res.status(404).json({ message: "action not found." });
                return;
            } else {
                res.status(200).json(action)
            }
        })
})

router.post('/', logger, actionsBodyValidation, (req, res) => {
    const { body } = req;
    actionsModel.insert(body)
        .then(postedAction => {
            res.status(201).json(postedAction);
        })
})

router.put('/:id', logger, actionsBodyValidation, (req, res) => {
    const { body } = req;
    actionsModel.update(req.params.id, body)
        .then(updatedAction => {
            res.status(200).json(updatedAction);
        })
})

router.delete('/:id', logger, actionsBodyIdValidation, (req, res) => {
    actionsModel.remove(req.params.id)
        .then(deletedActionId => {
            res.status(200).json(actionsModel.get(deletedActionId));
        })
})

module.exports = router;