const express = require('express');
const router = express.Router();
const diffController = require('../controllers/diff.ctrl');



router.post('/:id/left', (req, res, next) =>diffController.postItem({req, res, next, type:'left'}));


router.post('/:id/right', (req, res, next) =>diffController.postItem({req, res, next, type:'right'}));

router.get('/:id', diffController.checkDiff);


module.exports = router;
