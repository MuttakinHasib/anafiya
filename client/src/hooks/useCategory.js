import { useQuery, useQueryClient } from "react-query";
import { CATEGORY_API } from "../services/category";
import toast from "react-hot-toast";

export const useCategory = (page = 1, fetch = false) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    ["categories", { page }],
    () => CATEGORY_API.getCategories(page),
    { enabled: fetch }
  );

  const deleteCategory = async (id) => {
    try {
      const res = await CATEGORY_API.deleteCategory(id);
      queryClient.invalidateQueries(["categories", { page }]);
      toast.success(res.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return {
    deleteCategory,
    categories: {
      data: data?.categories || [],
      totalPage: data?.pages || 1,
      page: data?.page || 1,
    },
    loading: isLoading,
  };
};
