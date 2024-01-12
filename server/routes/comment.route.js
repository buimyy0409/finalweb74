const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment.controller');

router.get('/:id', commentController.getCommentById);
router.post('/get-list-by', commentController.getCommentsByFilter);
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;