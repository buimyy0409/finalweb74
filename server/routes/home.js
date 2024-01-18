const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/', (req, res) => {
  try {
    const newTask = new Task({ name: req.body.name, priority: req.body.priority });

    newTask.save((err, task) => {
      if (err) {
        res.send(err);
      } else {
        res.send(task);
      }
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;