const express =require('express')
const router =express.Router()
const {singup,signin,signout}=require('../controllers/authController')

const {userSignUpValidator} =require('../middleware/userValidator')

router.post('/singup', userSignUpValidator , singup)
router.post('/signin',signin)
router.get('/signout',signout)




module.exports=router ;