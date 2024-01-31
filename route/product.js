const express =require('express')
const router =express.Router()


const {createProduct, showProduct, productById, removeProduct, updateProduct} =require('../controllers/productController')
const {userById}=require('../middleware/user')
router.get('/:productId',showProduct)
router.post('/create/:userId',createProduct)
router.delete('/:productId/:userId',removeProduct)
router.put('/:productId/:userId',updateProduct)
router.param('userId',userById)
router.param('productId',productById)

module.exports=router ;