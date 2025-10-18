import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // 2 попытки
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // 1с, 2с, 4с
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2,
    },
  },
});
