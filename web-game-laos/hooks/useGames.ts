import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export const useGames = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["games", { page, limit }],
    queryFn: async () => {
      const { data } = await api.get("/games", {
        params: {
          page,
          limit,
        },
      });
      console.log(data);
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
};
