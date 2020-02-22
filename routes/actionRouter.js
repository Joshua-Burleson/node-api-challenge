const router = require('express').Router({mergeParams: true});
const { get, insert, update, remove } = require('../data/helpers/actionModel');

const { validateAction, validateActionID } = require('../custom-middleware/helpers');

router.use('/:id', validateActionID);

router.get('/', async (req, res) => {
    try{
        const actions = await(get());
        res.status(200).json(actions);
    }
    catch(exc){
        res.status(500).json(exc);
    }

});

router.post('/', validateAction, async (req, res) => {
    try {
        const newAction = insert(req.action);
        res.status(201).json(newAction);
    }
    catch(exc){
        res.status(500).json(exc);
    }
});


router.get('/:id', async (req, res) => {
    try{
        const action = await get(req.actionID) ;
        res.status(200).json(action);
    }
    catch(exc){
        res.status(500).json(exc);
    }

});

router.put('/:id', validateAction, async (req, res) => {
    try{
        const updatedAction = await update(req.actionID, req.action);
        res.status(200).json(updatedAction);
    }
    catch(exc){
        res.status(500).json(exc);
    }
});
router.delete('/:id', async (req, res) => {
    try{
        const deleted = await remove(req.actionID);
        res.status(200).json({message: `${deleted} records deleted`});
    }
    catch(exc){
        res.status(500).json(exc);
    }
});


module.exports = router;