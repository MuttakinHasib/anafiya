import { api } from "../api";

export const CATEGORY_API = {
  getCategories: async (page) => api.get(`/api/categories?pageNumber=${page}`),
  deleteCategory: async (id) => api.delete(`/api/categories/${id}`),
  createCategory: async (payload) => api.post(`/api/categories`, payload),
};
