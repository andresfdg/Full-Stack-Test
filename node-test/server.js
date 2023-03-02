require('dotenv').config()
const express = require('express')

const userslist = require('./mock_database')

const cors = require("cors")




const jwt = require('jsonwebtoken')

const app = express()
app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.listen(3000)

app.get('/',(req, res)=>{
  
    res.json("home")
})



app.post('/login',(req, res)=>{
  
    const email = req.body.email
    var access = false
    for(let i in userslist){
        test = userslist[i].email
       
        if(email == test){
            access = true
        }
    }
    if(access == false){
        res.json("fail")
    }else{
        const user = {email:email}
        const accessToken = jwt.sign(user, process.env.SECRET_KEY )
        res.json({ accessToken: accessToken })

    }   
})


app.get('/getuser',authenticateToken,(req,res)=>{
    res.json(req.user)
})


function authenticateToken(req, res ,next)
{
    const authHeader = req.headers['authorization']
    const token =authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET_KEY,(err, user)=>{
       if(err) return res.sendStatus(403)
       req.user = user
       next()
    })
    next()

}


const useRouter = require("./routes/users")
app.use("/users", useRouter)


