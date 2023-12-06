const express = require('express');
const router = express();
const authController = require("../controllers/authController")



router.post("/user_registration", authController.doUserRegistration)

router.post("/user_login",authController.doLogin)



module.exports = router