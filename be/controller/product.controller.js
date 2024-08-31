import Product from "../models/products.model.js";
import mongoose from "mongoose";
export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error In Fetching Products", error.message);
  }
};

export const postProduct = async (req, res) => {
  const productData = req.body;
  if (!productData.name || !productData.price || !productData.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProducts = new Product(productData);

  try {
    await newProducts.save();
    res.status(201).json({ success: true, data: newProducts });
  } catch (error) {
    console.log("Error in Create product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const putProduct = async (req, res) => {
  const { id } = req.params;
  const products = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: true, message: "Invalid Products ID" });
  }

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, products, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: true, message: "Invalid Products ID" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Products Deleted" });
  } catch (error) {
    console.log("Error In Deleting Products", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
