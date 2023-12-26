import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { createSlug } from "../utils/slug.js";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: { type: String },
    slug: { type: String },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("save", function (next) {
  this.slug = createSlug(this.name + "-" + nanoid(5));
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
