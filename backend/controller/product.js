const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../multer");

// create product
router.post(
    "/create-product",
    upload.array("images"),
    catchAsyncErrors(async (req, res, next) => {
      try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shop) {
          return next(new ErrorHandler("Shop Id is invalid!", 400));
        } else {
          const files = req.files;
          const imageUrls = files.map((file) => `${file.filename}`);
  
          const productData = req.body;
          productData.images = imageUrls;
          productData.shop = shop;
  
          const product = await Product.create(productData);
  
          res.status(201).json({
            success: true,
            product,
          });
        }
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
);

module.exports=router;
  