// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const actionsModel = require('./actions-model');
const { actionsBodyValidation, logger, actionsIdValidation } = require('./actions-middlware');

router.get('/', logger, (req, res) => {
    actionsModel.get()
        .then(actions => {
            res.status(200).json(actions);
        })
})

router.get('/:id', logger, actionsIdValidation, (req, res) => {
    res.status(200).json(req.action);
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

router.delete('/:id', logger, actionsIdValidation, (req, res) => {
    actionsModel.remove(req.params.id)
        .then(deletedActionId => {
            res.status(200).json(req.action);
        })
})

module.exports = router;