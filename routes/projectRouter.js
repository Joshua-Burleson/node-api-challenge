const router = require('express').Router({mergeParams: true});
const { get, insert, update, remove } = require('../data/helpers/projectModel');

const { validateProject, validateProjectID } = require('../custom-middleware/helpers');

router.use('/:id', validateProjectID);

router.get('/', async (req, res) => {
    try{
        const projects = await(get());
        res.status(200).json(projects);
    }
    catch(exc){
        res.status(503).json({message: "something went wrong"});
    }

});

router.get('/:id', async (req, res) => {
    try{
        const project = await(get(req.projectID));
        res.status(200).json(project);
    }
    catch(exc){
        res.status(503).json({message: "something went wrong"});
    }

});

router.post('/', validateProject, async (req, res) => {
    try {
        const newProject = await insert(req.project);
        res.status(201).json(newProject);
    }
    catch(exc){
        res.status(503).json({message: "something went wrong"});
    }
});


router.put('/:id', validateProject, async (req, res) => {
    try{
        const updatedProject = await update(req.projectID, req.project);
        res.status(200).json(updatedProject);
    }
    catch(exc){
        res.status(503).json({message: "something went wrong"});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const deleted = await remove(req.actionID);
        res.status(200).json({message: `${deleted} records deleted`});
    }
    catch(exc){
        res.status(503).json({message: "something went wrong"});
    }
});


module.exports = router;