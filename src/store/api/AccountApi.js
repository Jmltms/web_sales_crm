import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("user_token");

const accountApi = createApi({
  reducerPath: "account",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  endpoints(builder) {
    return {
      // login api
      login: builder.mutation({
        query: (form) => {
          return {
            url: `/api/user/login/`,
            method: "POST",
            body: form,
          };
        },
      }),
      // fetch account detail api
      fetchAccountDetail: builder.query({
        query: (id) => {
          return {
            url: `/api/account/${id}/fetch_detailed_account`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      fetchAccountList: builder.query({
        query: ({ page, pageSize, search_str = "" }) => {
          return {
            url: `api/account/fetch_staff_account/?page=${page}&page_size=${pageSize}&search_str=${search_str}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
    };
  },
});
export const {
  useLoginMutation,
  useFetchAccountDetailQuery,
  useFetchAccountListQuery,
} = accountApi;
export { accountApi };
