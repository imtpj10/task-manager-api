const express = require('express')
const User = require('../db/models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

router.use(express.json())
router.post('/users',async(req,res)=>{
    
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(404).send(e)
    }
    
})

router.post('/users/login',async(req,res)=>{
    
    try {
        const user = await User.findByCredential(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    
    } catch(e) {
        res.status(400).send(e)
    }
    
})

router.post('/users/logout',auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    }catch{
        res.status(500).send()
    }
})

router.get('/users/me',auth, async(req,res)=>{

    try{
        res.send(req.user)
    }catch (e) {
        res.status(500).send(e)
    }
})

// router.get('/users/:id',async(req,res)=>{

//     const _id =req.params.id

//     try {
//         const user = await User.findById(_id)
//         if(!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

router.patch('/users/me',auth, async(req,res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','password','age','email']

    const isValidUpdate = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValidUpdate) {
        return res.status(404).send('Invalid Update')
    }
    try {
        const user = req.user

        updates.forEach((update)=> user[update] = req.body[update])
        await user.save()
        //const user = await User.findByIdAndUpdate(_id,req.body,{new: true, runValidators:true})
        // if(!user) {
        //     return res.status(404).send()
        // }
        res.send(user)
    }catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async(req,res)=>{
    try{
        // const user = await User.findByIdAndRemove(req.params.id)
        // if(!user) {
        //     return res.status(404).send()
        // }
        
        req.user.remove()
        res.send(req.user)
    }catch (e) {
        res.status(500).send(e)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb( new Error('Please upload a Word document'))

        }
        cb(undefined,true)
    }
    
})

router.post('/users/me/avatar',auth, upload.single('avatar'),async(req,res) =>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar',auth, async(req,res) =>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)

    }catch(e) {
        res.status(404).send()
    }
})
module.exports = router