const express = require('express')
const router = express.Router()

router.get("/", (req, res)=>{
    res.json("User list")
})

router.get("/:id", (req, res)=>{
    const id = req.params.id
    res.json(`User ${id}`)
})



module.exports = router

