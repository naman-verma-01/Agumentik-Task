const express = require("express");
const router = express.Router();
const { login, signup } = require("../service/AdminService")

router.post("/login", async (req, res) => {
    try {
        const response = await login(req.body.email, req.body.password)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})

router.post("/signup", async (req, res) => {
    try {
        const response = await signup(req.body.email, req.body.password, req.body.name)
        res.status(response.status).json(response.data)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;