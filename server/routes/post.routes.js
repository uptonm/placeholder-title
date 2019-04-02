const express = require('express');
const actions = require('../controllers/postLogic');
const router = express.Router();

router.get('/posts', actions.getPost);
router.get('/posts/:id', actions.getPost);
router.post('/posts', actions.postPost);

module.exports = router;