import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { createSlug } from "../utils/slug";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: { type: String },
    color: { type: String },
    slug: { type: String },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

categorySchema.pre("save", async function (next) {
  this.slug = createSlug(this.name + "-" + nanoid(5));
});

export default Category;
