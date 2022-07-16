// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const actionsModel = require('./actions-model');

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

module.exports = router;