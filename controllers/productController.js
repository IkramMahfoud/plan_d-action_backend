const Product = require('../models/product')
const formidable = require('formidable')
const fs = require('fs')
const Joi = require('joi')
const _ = require('lodash')



exports.createProduct = (req, res) =>
{
  // Create a new instance of formidable to parse the form data
  const form = new formidable.IncomingForm();

  // Parse the form data
  form.parse(req, (err, fields, files) =>
  {
    if (err) {
      return res.status(400).json({ error: 'Failed to parse form data' });
    }

    // Validate the fields using Joi schema
    const schema = Joi.object({
      name: Joi.string().trim().required().max(150),
      description: Joi.string().trim().required().max(2000),
      price: Joi.number().required(),
      quantity: Joi.number(),
      category: Joi.string().required(),
      shipping: Joi.boolean().required()
    });

    const { error } = schema.validate(fields);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create a new product object
    const product = new Product({
      name: fields.name,
      description: fields.description,
      price: fields.price,
      quantity: fields.quantity,
      category: fields.category,
      shipping: fields.shipping === 'true' || fields.shipping === true
    });

    // If there's a photo, set the photo data and content type
    if (files.photo) {
      if (files.photo.size > Math.pow(10, 6)) {
        return res.status(400).json({ error: 'Image must be less than 1mb in size' });
      }

      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    // Save the product to the database
    product.save((err, savedProduct) =>
    {
      if (err) {
        return res.status(400).json({ error: 'Failed to save product to the database' });
      }
      res.json({ product: savedProduct });
    });
  });
};



exports.productById = (req, res, next, id) =>
{

  Product.findById(id).exec((err, product) =>
  {
    if (err || !product) {
      res.status(404).json(
        {
          error: "Product not found"
        }
      )
    }
    req.product = product;

    next();
  })
}


exports.showProduct = (req, res) =>
{

  req.product.photo = undefined;
  res.json({
    product: req.product
  })
}



exports.removeProduct = (req, res) =>
{

  let product = req.product;
  product.remove((err, product) =>
  {
    if (err) {
      res.status(404).json(
        {
          error: "Product not found"
        }
      )
    }
    res.status(204).json({
    })
  })
}

exports.updateProduct = (req, res) =>
{
  let form = new formidable.IncomingForm();
  form.keepextentions = true;
  form.parse(req, (err, fields, files) =>
  {
    if (err) {
      return res.status(400).json({
        error: 'Image could Not Upload'
      })
    }

    let product = req.product
    product = _.extend(product, fields)

    if (files.photo) {
      if (files.photo.size > Math.pow(10, 6)) {
        res.status(400).json({
          error: "Image must be less than 1mb in Size !!!!!"
        })
      }
      product.photo.data = fs.readFileSync(files.photo.filepath)

      product.photo.contentType = files.photo.mimetype;
    }
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.required(),
      quantity: Joi.required(),
      category: Joi.required()
    })

    const { error } = schema.validate(fields);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      })
    }
    product.save((err, product) =>
    {
      if (err) { return res.status(400).json({ err: "product not updated" }) }
      console.log(product)
      res.json({
        product
      })
    })
  })
}