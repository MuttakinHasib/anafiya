import slugify from "slugify";

export const createSlug = (str) =>
  slugify(str, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    lower: true, // convert to lower case, defaults to `false`
    strict: false, // strip special characters except replacement, defaults to `false`
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
