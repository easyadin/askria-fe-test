import { useMutation } from 'react-query';
import { ITemplate } from './template.interface';
import { apiHttp } from '../../lib/configs/appConfig';
import { ServerResponse } from '../../lib/hooks/useAxiosConfig';

export const apiPUTPath = import.meta.env.VITE_APP_BASE_API_PUT_ENDPOINT;

const updateTemplate = async (template: ITemplate) => {
  const update = await apiHttp.put<ServerResponse<ITemplate>>(apiPUTPath, {
    data: template,
  });

  return update.data.data;
};

export const useUpdateTemplate = () => {
  return useMutation(updateTemplate);
};
