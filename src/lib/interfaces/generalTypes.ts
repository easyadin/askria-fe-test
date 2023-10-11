export interface ILocalStorageKeys {
  sideNavExpanded: string;
}

export interface IQueryResponse<T> {
  totalPages: number;
  totalRecords: number;
  totalRecordsPerPage: number;
  currentPage: number;
  data: T[];
}

export interface IQuery {
  limit?: number;
  search_value?: string | null;
  sort_by?: string;
  page?: string | null;
  startDate?: string;
  endDate?: string;
  order_by?: string;
}

export interface IPublicNavigationItem {
  label: string;
  href: string;
  variant?: string;
  ariaLabel?: string;
  SubMenuComponent?: any;
  icon?: any;
  tab?: string | undefined;
}

export interface IQuerySearchParam {
  page: string;
  tab?: string;
  search_value: string;
  journalCategory?: string[];
  author?: string[];
  coAuthors?: string[];
  issue?: string[];
  [key: string]: any;
  isAcceptedManuscripts?: boolean;
}

export interface IHighlights {
  score: number;
  path: string;
  texts: IHighlightText[];
}

export interface IHighlightText {
  value: string;
  type: 'hit' | 'text';
}
