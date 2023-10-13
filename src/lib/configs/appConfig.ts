import { QueryClient, QueryCache, MutationCache } from 'react-query';
import axios from 'axios';

export const apiEndpoint = import.meta.env.VITE_APP_BASE_API;

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        // Failure(err as any);
      }
      if (axios.isAxiosError(err)) {
        if (err?.response?.status === 404) {
          // return Failure("Content could not be found, Please try again");
        }
      } else {
        if (err instanceof Error) {
          // Failure("Something went wrong, Please try again");
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: async (err) => {
      if (axios.isAxiosError(err)) {
      } else {
        if (err instanceof Error) {
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      notifyOnChangeProps: 'tracked',
    },
  },
});

export const apiHttp = axios.create({
  baseURL: apiEndpoint,
});
