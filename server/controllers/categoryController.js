import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

export const createCategory = asyncHandler(async (req, res) => {
  const category = new Category(req.body);
  const save = await category.save();

  res.status(201).json(save);
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  res.status(200).json(categories);
});
