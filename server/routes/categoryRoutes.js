import express from "express";

import { admin, protect } from "../middleware/auth.js";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";
const router = express.Router();

router.route("/").get(getCategories).post(protect, admin, createCategory);

export default router;
