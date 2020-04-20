const express = require('express')
require('./db/mongoose')
const port = process.env.PORT 
const app = express()
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

app.use(userRouter)
app.use(taskRouter)

app.use(express.json())

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

// app.use((req,res,next)=>{
//     if(req.method === 'GET') {
//             res.send('GET methods are disbaled!')
//     } else  {
//             next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send('Site is currenly down. Check back soon!')
// })






// const router = new express.Router()

// router.get('/test',(req,res)=>{
//     res.send('testing')
// })
// app.use(router)



// const jwt =require('jsonwebtoken')

// const myFunction = async ()=>{
//     const token =  jwt.sign({id:'qwe'},"tulsi")

//     const data = jwt.verify(token,'tulsi')
//     console.log(data)
// }

// myFunction()

// app.post('/users',(req,res)=>{
    
//     const user = new User(req.body)

//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })
    
// })

// app.get('/users',(req,res)=>{
//     User.find({}).then((users)=>{
//         res.send(users)
//     }).catch(()=>{
//         res.status(500).send()
//     })
// })

// app.get('/users/:id',(req,res)=>{

//     const _id =req.params.id
//     User.findById(_id).then((user)=>{
//         if(!user) {
//             return res.status(404).send("testing")
//         }
//         res.send(user)
//     }).catch((error)=>{
//         res.status(500).send(error)
//     })
// })

// app.post('/tasks',(req,res)=>{
    
//     const task = new Task(req.body)

//     task.save().then(()=>{
//         res.status(201).send(task)
//     }).catch((error)=>{
//         res.status(400).send(error)
//     })
    
// })

// app.get('/tasks',(req,res)=>{
//     Task.find({}).then((tasks)=>{
//         res.send(tasks)
//     }).catch((e)=>{
//         res.status(500).send(e)
//     })
    
// })

// app.get('/tasks/:id',(req,res)=>{
//     Task.findById(req.params.id).then((task)=>{
//         if(!task) {
//             return res.status(404).send()
//         }
//         res.send(task)
//     }).catch((e)=>{
//         res.status(500).send(e)
//     })
// })

// const pet = {
//     name: 'pet'
// }
// pet.toJSON = function() {
//     //console.log(this) 
//     return {}
// }


// console.log(JSON.stringify(pet))


// const Task = require('./db/models/task')
// const User = require('./db/models/user')
// const myFunction = async function() {
//     // const task = await Task.findById('5e9c5406f7095b4c0a5b2fb5')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user  = await User.findById('5e9c5318a8c3874b6196fb89')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)

// }

// myFunction()