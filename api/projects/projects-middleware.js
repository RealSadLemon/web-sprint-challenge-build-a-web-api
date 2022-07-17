// add middlewares here related to projects
const projectsModel = require('./projects-model');

function logger(req, res, next) {
    console.log(`[${new Date().toISOString().substring(0, 10)}] - ${req.method} to ${req.url} from ${req.get('Origin')} with payload ${req.body}`)
    next();
}

function projectsIdValidation(req, res, next) {
    const { id } = req.params;
    projectsModel.get(id)
        .then(project => {
            if(project == null){
                res.status(404).json({ message: "project not found."})
                return;
            }
            req.project = project;
            next();
        })
}

function projectValidation(req, res, next) {
    const { body } = req;
    if(typeof body.description !== 'string' || body.description.trim() === ''){
        res.status(400).json({ message: 'missing required description field' });
        return;
    } else if(typeof body.name !== 'string' || body.name.trim() === ''){
        res.status(400).json({ message: 'missing required name field' });
        return;
    } else if(typeof body.completed !== 'boolean'){
        res.status(400).json({ message: 'missing required completed field' });
        return;
    }
    req.project = body;
    next();
}

module.exports = {
    logger,
    projectsIdValidation,
    projectValidation
}