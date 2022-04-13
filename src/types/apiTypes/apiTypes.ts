export type signInResponseType = {
  key: string;
};

export type getProfileResponse = {
  email: string;
  first_name: string;
  last_name: string;
  pk: number;
  username?: string;
};

export interface searchParamsType {
    limit?: number;
    offset?: number;
    name?: string;
}

export interface searchYachtParamsType extends searchParamsType {
    is_draft?: boolean;
    country?: number[];
}

export interface searchResponseType<T=any> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}