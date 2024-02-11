const express =require('express')
const router =express.Router()
const {requireSignIn} =require('../middleware/auth')



const {createCategory} =require('../controllers/categoryController')
const {userById}=require('../middleware/user')

router.post('/create/:userId',createCategory)
router.param('userId',userById)
module.exports=router ;