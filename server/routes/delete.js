const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.delete('/:taskId', (req, res) => {
  try {
    Task.findOneAndRemove({ _id: req.params.taskId })
      .then((deletedTask) => {
        res.send(deletedTask);
      })
      .catch((e) => {
        res.send(e);
      });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;