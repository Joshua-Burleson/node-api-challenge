const getActionByID = require('../data/helpers/actionModel').get;
const getProjectByID = require('../data/helpers/projectModel').get;

const validateAction = (req, res, next) => {
    if(!req.body) return res.status(400).json({message: 'no request body sent to API'});
    const { project_id, description, notes } = req.body;
    if( project_id && description && notes ){
        const completed = req.body.completed ? req.body.completed : false;
        req.action = {project_id, description, notes, completed};
        next();
    }
    else {
        return res.status(400).json({message: 'missing action data, ensure you include project_id, description, and notes'});
    }
}

const validateActionID = async (req, res, next) => {
    if(!req.params.id || !Number(req.params.id)) return res.status(400).json({message: 'no ID or invalid ID sent to API, ensure provided ID is a number'});
    try {
        const selectedAction = await getActionByID(req.params.id);
        if(!selectedAction) return res.status(404).json({message: 'Action not found'});
        req.actionID = selectedAction.id;
        next();
    }
    catch(exc){
        return res.status(404).json({message: exc})
    }
}

const validateProject = (req, res, next) => {
    if(!req.body) return res.status(400).json({message: 'no request body sent to API'});
    const { name, description } = req.body;
    if( name && description ){
        const completed = req.body.completed ? req.body.completed : false;
        req.project = {name, description, completed};
        next();
    }
    else {
        return res.status(400).json({message: 'missing project data, ensure you include project_id, description, and notes'});
    }
}

const validateProjectID = async (req, res, next) => {
    if(!req.params.id || !Number(req.params.id)) return res.status(400).json({message: 'no ID or invalid ID sent to API, ensure provided ID is a number'});
    try {
        const selectedProject = await getProjectByID(req.params.id);
        if(!selectedProject) return res.status(404).json({message: 'Project not found'});
        req.projectID = selectedProject.id;
        next();
    }
    catch(exc){
        return res.status(404).json({message: exc})
    }
}


module.exports = {
    validateAction,
    validateActionID,
    validateProject,
    validateProjectID
}