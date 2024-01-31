const express =require('express')
const router =express.Router()
// const {requireSignIn} =require('../middleware/auth')
const {singup,signin,signout}=require('../controllers/authController')

router.post('/singup',singup)
router.post('/signin',signin)
router.get('/signout',signout)




module.exports=router ;