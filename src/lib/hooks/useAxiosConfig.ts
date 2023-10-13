import axios from 'axios';
import { apiHttp } from '../configs/appConfig';

export type ServerResponse<T> = {
  message: string;
  data: T;
  status: boolean;
};

const useAxiosConfig = () => {
  apiHttp.interceptors.response.use(
    (axios) => {
      // Mock persistedTemplate
      const persistedTemplate = localStorage.getItem('persistedTemplate');

      const parsedTemplate = persistedTemplate
        ? JSON.parse(persistedTemplate)
        : null;

      if (parsedTemplate && axios.data?.data?.attributes) {
        axios.data.data = parsedTemplate;
      }

      if (axios.data.data?.attributes?.coverImage?.includes('example.com')) {
        axios.data.data.attributes.coverImage =
          'https://fastly.picsum.photos/id/14/2500/1667.jpg?hmac=ssQyTcZRRumHXVbQAVlXTx-MGBxm6NHWD3SryQ48G-o';
      }

      return axios;
    },
    function (error) {
      if (axios.isAxiosError(error)) {
        const errorObj = error.response?.data as ServerResponse<any>;
        console.log(errorObj);
      }

      console.log('[Intercepted Response]', JSON.stringify(error.message));

      return Promise.reject(error);
    }
  );
};

export default useAxiosConfig;
