const Product =require('../models/product')
const formidable =require('formidable')
const fs=require('fs')
const Joi =require('joi')
const _ =require('lodash')
exports.createProduct = (req ,res)=>{
   //Création de l'objet formidable
   //Analyse du formulaire avec La méthode parse de formidable est utilisée pour analyser les données du formulaire dans la requête.
   //Création d'un objet Product avec les champs du formulaire
   //Vérification de la taille de l'image (si présente)
   //Validation des champs du formulaire avec Joi
   //Sauvegarde du produit dans la base de données :

}

exports.productById=(req,res,next,id)=>{

  Product.findById(id).exec((err,product)=>{
     if(err || !product){
         res.status(404).json(
             {
                 error :"Product not found"
             }
         )
     }
     req.product =product;

     next();
  })
}
exports.showProduct=(req,res)=>{


     req.product.photo =undefined;
      res.json({
            product:req.product
          })
}
exports.removeProduct =(req,res)=>{

  let product =req.product ;
  product.remove((err ,product)=>{
    if(err){
      res.status(404).json(
          {
              error :"Product not found"
          }
      )
  }
  res.status(204).json({
  })
  })
}
exports.updateProduct = (req ,res)=>{
  let form=new formidable.IncomingForm();
  form.keepextentions=true ;
  form.parse(req,(err,fields,files)=>{
        if(err){
            return   res.status(400).json({
                    error :'Image could Not Upload'
              })
        }

   let product=req.product
   product =_.extend(product,fields)

 if(files.photo)
 {
   if (files.photo.size > Math.pow(10 , 6))
   {
     res.status(400).json({
       error : "Image must be less than 1mb in Size !!!!!"
     })
   }
  product.photo.data=fs.readFileSync(files.photo.filepath)

  product.photo.contentType=files.photo.mimetype;
 }
 const schema =Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price :Joi.required(),
  quantity : Joi.required(),
  category : Joi.required()
})

const {error }=schema.validate(fields);
if(error){
  return res.status(400).json({
    error :error.details[0].message
  })
}
  product.save((err,product)=>{
        if(err){return res.status(400).json({err:"product not updated"}) }
        console.log(product)
        res.json({
          product
        })
      })
  })
}