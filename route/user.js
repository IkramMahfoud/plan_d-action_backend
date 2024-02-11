const express =require('express')
const router =express.Router()
const { requireSignIn, isAuth } = require('../middleware/auth'); 


const {getOneUser}=require('../controllers/userController')
const {userById}=require('../middleware/user')


router.get('/profile/:userId', requireSignIn, isAuth,getOneUser)
router.param('userId',userById)

module.exports=router ;