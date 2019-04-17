const express = require('express');
const actions = require('../controllers/postLogic');
const commentActions = require('../controllers/commentLogic');
const router = express.Router();

router.get('/posts', actions.getPost);
router.get('/posts/:id', actions.getPost);
router.post('/posts', actions.postPost);
router.get('/posts/:postId/comments', commentActions.getPostComments);
module.exports = router;
