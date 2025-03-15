const express = require("express")
const { AdminRrgister, AdminLogin } = require("../controllers/AdminController")
const router = express.Router()

router.post("/adminregister", AdminRrgister)
router.post("/adminlogin", AdminLogin)

module.exports = router