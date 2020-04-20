const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify:false
})



// const me  = new User({
//     name: '    yare Yadav  ',
//     email: ' Tps10@iitbbs.ac.in',
//     password: '   passw  ',
//     age: 22
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log('Error! '+error)
// })



// const task = new Task({
//     description: '  Lunch   ',
    
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log(error)
// })



