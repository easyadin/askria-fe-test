import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  QueryFunctionContext,
  UseQueryOptions,
  useQuery,
} from 'react-query';
import { IQueryResponse } from '../../lib/interfaces/generalTypes';
import { ITemplate, ITemplateQuery } from './template.interface';
import { apiHttp } from '../../lib/configs/appConfig';
import { ServerResponse } from '../../lib/hooks/useAxiosConfig';

export const apiGETPath = import.meta.env.VITE_APP_BASE_API_GET_ENDPOINT;

export const templateQueryKeys = {
  all: [{ scope: 'templates' }] as const,
  templates: (query: ITemplateQuery) => [
    {
      ...templateQueryKeys.all[0],
      entity: 'template list',
      ...query,
    },
  ],
  template: (templateId?: string) => [
    {
      ...templateQueryKeys.all[0],
      entity: 'Single ',
      templateId,
    },
  ],
};

async function fetchTemplates({
  pageParam = 1,
  queryKey: [{}],
}: QueryFunctionContext<ReturnType<(typeof templateQueryKeys)['templates']>>) {
  const params: Record<string, any> = {
    page: pageParam,
  };

  // Remove fields with null values
  Object.keys(params).forEach((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  const res = await apiHttp.get<ServerResponse<IQueryResponse<ITemplate>>>(
    apiGETPath,
    {
      params,
    }
  );

  /**
   * Ideally it should return a list but this is based on result by the mock api.
   * I placed it in a list to mimic my result typings
   */
  return {
    data: res.data.data,
  } as unknown as IQueryResponse<ITemplate>;
}

async function fetchTemplate({
  queryKey: [{ templateId }],
}: QueryFunctionContext<ReturnType<(typeof templateQueryKeys)['template']>>) {
  if (!templateId) {
    return null;
  }
  const res = await apiHttp.get<ServerResponse<ITemplate>>(
    apiGETPath + templateId
  );

  return res.data.data;
}

export const useGetTemplates = <
  SelectData = IQueryResponse<ITemplate>,
  Error = unknown
>(
  query: ITemplateQuery,
  options?: UseInfiniteQueryOptions<
    IQueryResponse<ITemplate>,
    Error,
    SelectData,
    IQueryResponse<ITemplate>,
    ReturnType<(typeof templateQueryKeys)['templates']>
  >
) => {
  return useInfiniteQuery<
    IQueryResponse<ITemplate>,
    Error,
    SelectData,
    ReturnType<(typeof templateQueryKeys)['templates']>
  >(templateQueryKeys.templates(query), fetchTemplates, {
    getNextPageParam: (lastPage) => {
      if (+lastPage.currentPage < lastPage.totalPages) {
        return +lastPage.currentPage + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 15,
    suspense: true,
    ...options,
  });
};

export const useGetTemplate = <
  SelectReturnType = ITemplate,
  ErrorType = unknown
>(
  templateId: string | undefined,
  options?: UseQueryOptions<
    ITemplate | null,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof templateQueryKeys)['template']>
  >
) => {
  return useQuery<
    ITemplate | null,
    ErrorType,
    SelectReturnType,
    ReturnType<(typeof templateQueryKeys)['template']>
  >(templateQueryKeys.template(templateId), fetchTemplate, {
    staleTime: 1000 * 60 * 15,
    suspense: true,
    ...options,
  });
};
