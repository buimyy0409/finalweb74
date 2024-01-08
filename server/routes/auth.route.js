const express = require('express')
const router = express.Router();

const {login, signup, verify} = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.mdw');


router.post('/signup', signup )


// login
router.post('/login', login)

// verify
router.post('/verify', authMiddleware, verify)

module.exports = router;