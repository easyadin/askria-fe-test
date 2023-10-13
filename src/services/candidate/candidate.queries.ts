import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  QueryFunctionContext,
} from 'react-query';
import { IQueryResponse } from '../../lib/interfaces/generalTypes';
import { ICandidate, ICandidateQuery } from './candidate.interface';
import candidateData from '../../assets/candidates_data.json';

export const apiGETPath = import.meta.env.VITE_APP_BASE_API_GET_ENDPOINT;

export const candidateQueryKeys = {
  all: [{ scope: 'candidates' }] as const,
  candidates: (query: ICandidateQuery) => [
    {
      ...candidateQueryKeys.all[0],
      entity: 'candidate list',
      ...query,
    },
  ],
  candidate: (candidateId?: string) => [
    {
      ...candidateQueryKeys.all[0],
      entity: 'Single ',
      candidateId,
    },
  ],
};

async function fetchCandidates({
  pageParam = 1,
  queryKey: [{}],
}: QueryFunctionContext<
  ReturnType<(typeof candidateQueryKeys)['candidates']>
>) {
  const params: Record<string, any> = {
    page: pageParam,
  };

  // Remove fields with null values
  Object.keys(params).forEach((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  const res: IQueryResponse<ICandidate> = {
    totalPages: 0,
    totalRecords: 0,
    totalRecordsPerPage: 0,
    currentPage: 0,
    data: candidateData as ICandidate[],
  };

  return res;
}

export const useGetCandidates = <
  SelectData = IQueryResponse<ICandidate>,
  Error = unknown
>(
  query: ICandidateQuery,
  options?: UseInfiniteQueryOptions<
    IQueryResponse<ICandidate>,
    Error,
    SelectData,
    IQueryResponse<ICandidate>,
    ReturnType<(typeof candidateQueryKeys)['candidates']>
  >
) => {
  return useInfiniteQuery<
    IQueryResponse<ICandidate>,
    Error,
    SelectData,
    ReturnType<(typeof candidateQueryKeys)['candidates']>
  >(candidateQueryKeys.candidates(query), fetchCandidates, {
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
