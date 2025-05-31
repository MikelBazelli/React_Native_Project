const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const verifyToken = require('../middleware/verifyToken');

// POST a new menu item
router.post('/', verifyToken, menuController.createMenuItem);

module.exports = router;
