import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useBlogs = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["blogs", { page, limit }],
    queryFn: async () => {
      const { data } = await api.get("/blogs", {
        params: {
          page,
          limit,
        },
      });
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
