// add middlewares here related to actions

function logger(req, res, next) {
    console.log(`[${new Date().toISOString().substring(0, 10)}] - ${req.method} to ${req.url} from ${req.get('Origin')} with payload ${req.body}`)
  
    next();
}

function actionsBodyValidation(req, res, next) {
    const body = req.body;
    if(typeof body.project_id !== 'number'){
        res.status(400).json({ message: 'missing required project_id field' });
        return;
    } else if(typeof body.description !== 'string' || body.description.trim() === ''){
        res.status(400).json({ message: 'missing required description field' });
        return;
    } else if(typeof body.notes !== 'string' || body.notes.trim() === ''){
        res.status(400).json({ message: 'missing required notes field' });
        return;
    } else if(typeof body.completed !== 'boolean'){
        res.status(400).json({ message: 'missing required completed field' });
        return;
    }
    req.action = body;
    next();
}

module.exports = {
    actionsBodyValidation,
    logger
}