const { json } = require('express')
const { static } = require('express')
const express = require('express')
const path = require('path')
const db = require('./database')

const logger = require('./midleware/logger')
// const member = require('./member')
// const res = require('express/lib/response')

const app = express()

app.use(json())
app.use(logger)
app.use(express.urlencoded({extended: 'false'}))
const member = [
    {
      id: 1,
      title: "Work",
      
    },
    {
      id: 2,
      title: "Play",
     
    },
    {
      id: 3,
      title: "Study",
    }
];



app.get('/', async(req,res)=>{
   
    const result = await db.promise().query('SELECT * FROM USERS')
    res.status(200).send(result[0])
})

app.get('/api/member', (req,res) => 
{
    res.json(member);
    res.send('done');
}
)

// app.use(static(path.join(__dirname,'public')))

const PORT = process.env.PORT || 8000

app.post('/',(req,res)=>{
    const { username, password } = req.body;
    if(username && password){
        try {
            db.promise().query(`INSERT INTO USERS VALUES ('${username}', '${password}')`) 
            res.status(201).send({msg : 'User Created'})
        } catch (error) {
            console.log(error)
        }
    }
    res.send("OK")
})

app.listen(PORT, ()=> console.log(`The server is run on port ${PORT}`))

