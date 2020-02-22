const router = require('express').Router({mergeParams: true});


router.get('/');
router.post('/');
router.put('/:id');
router.delete('/:id');


module.exports = router;