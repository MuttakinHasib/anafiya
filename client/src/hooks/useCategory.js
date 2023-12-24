import { useQuery } from "react-query";
import { CATEGORY_API } from "../services/category";

export const useCategory = (page = 1) => {
  const { data, isLoading } = useQuery(["categories", { page }], () =>
    CATEGORY_API.getCategories(page)
  );

  return {
    categories: {
      data: data?.categories || [],
      totalPage: data?.pages || 1,
      page: data?.page || 1,
    },
    loading: isLoading,
  };
};
