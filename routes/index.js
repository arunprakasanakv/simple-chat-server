var express = require('express');
var router = express.Router();
const login = require('../controllers/loginController');

/* GET Login. */

router.get('/', login.getLogin);

router.get('/login', login.getLogin);

module.exports = router;
