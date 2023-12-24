import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

export const createCategory = asyncHandler(async (req, res) => {
  const category = new Category(req.body);
  const save = await category.save();

  res.status(201).json(save);
});

export const getCategories = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Category.countDocuments({});

  const categories = await Category.find({})
    .sort([["name", "desc"]])
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ categories, page, pages: Math.ceil(count / pageSize) });
});
