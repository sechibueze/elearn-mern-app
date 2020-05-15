const { validationResult } = require('express-validator');
const { cloudinaryUploader, updateCloudinaryMediaContent } = require('../config/cloudinaryConfig');
const { getDataURI } = require('../_utils/dataURI');
const Category = require('../models/Category');

const createCategory = (req, res ) => {
  const errorContainer = validationResult(req);
  if (!errorContainer.isEmpty()) {
    return res.status(422).json({
      status: false,
      errors: errorContainer.errors.map(err => err.msg)
    });
  }
  // Passed all validateions
  
  const dataURI = getDataURI(req);
  cloudinaryUploader.upload(dataURI)
    .then(result => {
      const { title, description } = req.body;
      let categoryData = { title, description };
      categoryData.image = {};
      categoryData.image.imageUrl = result.secure_url;
      categoryData.image.publicId = result.public_id;

      let newCategory = new Category(categoryData);
      newCategory.save(err => {
        if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not save categories' });
        return res.status(201).json({
          status: true,
          message: 'Category created',
          data: newCategory
        })
      })
    })
    .catch(err => {
      if (err) return res.status(500).json({ status: false, error: 'Server error:: Could not save categories' });

    })
  
};
const getAllCategory = (req, res ) => {
  Category.find({})
    .then(results => {
      return res.status(200).json({
        status: true,
        message: 'Categories',
        data: results
      });
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve categories' });

    });
};
const getCategoryById = (req, res ) => {

  Category.findOne({_id: req.params.categoryId})
    .then(results => {
      return res.status(200).json({
        status: true,
        message: 'One Category',
        data: results
      });
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not retrieve categories' });

    });
};
const updateCategoryById = (req, res ) => {
  const categoryId = req.params.categoryId;
  // Passed all validateions
  const { title, description } = req.body;
  const canUpdateCategoryImageData = getDataURI(req) || req.body.category_image;
  
  Category.findOne({_id: categoryId})
    .then(async categoryItem => {
      if(!categoryItem) return res.status(400).json({ status: false, error: 'Server error:: Could not update categories' });

      if (title) categoryItem.title = title;
      if (description) categoryItem.description = description;

      if (canUpdateCategoryImageData) {
        const result = await updateCloudinaryMediaContent(categoryItem.image.publicId, canUpdateCategoryImageData);
        categoryItem.image.imageUrl = result.secure_url;
      }
      categoryItem.save(err => {
        return res.status(200).json({
          status: true,
          message: 'Category updated',
          data: categoryItem
        })
      })
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not update categories' });

    });
  
};
const deleteCategory = (req, res ) => {
  const categoryId = req.params.categoryId;
  Category.findOneAndRemove({_id: categoryId})
    .then(result => {
      // console.log('results :: ', result)

      return res.status(200).json({
        status: true,
        message: 'Category deleted'
      });
    })
    .catch(err => {
      return res.status(500).json({ status: false, error: 'Server error:: Could not remove categories' });

    })
};
module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategory

};