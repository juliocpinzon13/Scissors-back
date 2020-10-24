const express = require('express');
const router = express.Router();

const Client = require('../models/Client');
const Stylist = require('../models/Stylist');

//Login Page
router.get('/login', (req, res) => res.send('Login'));

//Register Page
router.get('/register', (req, res) => res.send('Register'));

module.exports = router;