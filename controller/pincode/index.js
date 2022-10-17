var router = require('express').Router();
var {checkPincode} = require('./pincode');

router.post('/checkPincode', checkPincode);

module.exports = router;