const express = require("express")
const { AdminRrgister } = require("../controllers/AdminController")
const router = express.Router()

router.post("/adminregister", AdminRrgister)

module.exports = router