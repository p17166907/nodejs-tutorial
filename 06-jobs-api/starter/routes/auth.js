const express = require('express')
const router = express.Router()

const { login, register } = require('../controllers/auth')

// localhost:3000/api/v1/auth/register
router.post('/register', register)
router.post('/login', login)

module.exports = router
