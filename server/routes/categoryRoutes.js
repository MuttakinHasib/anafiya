import express from "express";

import { admin, protect } from "../middleware/auth.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
} from "../controllers/categoryController.js";
const router = express.Router();

router.route("/").get(getCategories).post(protect, admin, createCategory);
router
  .route("/:id")
  .get(protect, admin, getCategoryById)
  .patch(protect, admin, updateCategoryById)
  .delete(protect, admin, deleteCategory);

export default router;
