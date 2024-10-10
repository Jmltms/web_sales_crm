import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiDomain = process.env.REACT_APP_API_DOMAIN;
const token = localStorage.getItem("user_token");

const clientApi = createApi({
  reducerPath: "client",
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
  }),
  tagTypes: ["client"],
  endpoints(builder) {
    return {
      // api for fetching industry list
      fetchIndustryList: builder.query({
        query: () => {
          return {
            url: `/api/client/industry_list/`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      addNewLeads: builder.mutation({
        query: (data) => {
          return {
            url: `/api/client/add_new_leads/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: data,
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
      fetchAllLeads: builder.query({
        query: ({
          page = 1,
          pageSize,
          status,
          searchOwner,
          search,
          search_service = 0,
        }) => {
          return {
            url: `api/client/fetch_all_leads/?page=${page}&page_size=${pageSize}&status=${status}&search_owner=${searchOwner}&search_str=${search}&filter_service=${search_service}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      fetchFilterLeads: builder.query({
        query: ({
          page,
          pageSize,
          status,
          search = "",
          session,
          statusLabel,
        }) => {
          return {
            url: `api/client/fetch_uncontacted_leads/?page=${page}&page_size=${pageSize}&search_str=${search}&status=${status}&session=${session}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      fetchClosedLeads: builder.query({
        query: ({
          page,
          pageSize,
          search = "",
          session,
          search_service = 0,
        }) => {
          return {
            url: `api/client/fetch_closed_leads/?page=${page}&page_size=${pageSize}&search_str=${search}&session=${session}&filter_service=${search_service}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      fetchPrioLeads: builder.query({
        query: ({ page, pageSize, search = "", session, statusLabel }) => {
          return {
            url: `api/client/fetch_leads/?page=${page}&page_size=${pageSize}&search_str=${search}&session=${session}&status_label=${statusLabel}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      fetchDetailLeads: builder.query({
        query: (id) => {
          return {
            url: `/api/client/${id}/fetch_detail_leads/`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      updataLeadStatus: builder.mutation({
        query: (data) => {
          return {
            url: `api/client/update_lead_status/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: data,
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
      uploadLeadsFromExcel: builder.mutation({
        query: (excelFile) => {
          return {
            url: `api/client/import_csv_leads/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: excelFile,
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
      transferLeads: builder.mutation({
        query: (formData) => {
          return {
            url: `api/client/change_lead_owner/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
      addNotes: builder.mutation({
        query: (formData) => {
          return {
            url: `api/client/add_lead_note/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: formData,
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
      fetchleadNotes: builder.query({
        query: ({ page, pageSize, leadId }) => {
          return {
            url: `api/client/fetch_lead_note/?page=${page}&page_size=${pageSize}&lead_id=${leadId}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      fetchleadActivity: builder.query({
        query: ({ page, pageSize, leadId }) => {
          return {
            url: `api/client/fetch_lead_activity/?page=${page}&page_size=${pageSize}&lead_id=${leadId}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      fetchNonPaginateStaff: builder.query({
        query: () => {
          return {
            url: `api/account/fetch_all_staff/`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      addRevenue: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/client/add_revenue/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
      editRevenue: builder.mutation({
        query: (formBody) => {
          return {
            url: `api/client/edit_revenue/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: formBody,
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
      fetchRevenue: builder.query({
        query: ({ id }) => {
          return {
            url: `api/client/fetch_detail_revenue/?id=${id}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      uploadUncontactedLeadsExcel: builder.mutation({
        query: (excelFile) => {
          return {
            url: `api/client/uncontacted_csv_leads/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: excelFile,
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
      fetchService: builder.query({
        query: ({ page = 1, pageSize = 10 }) => {
          return {
            url: `api/client/fetch_services/?page=${page}&page_size=${pageSize}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      fetchLeadService: builder.query({
        query: ({ id }) => {
          return {
            url: `api/client/fetch_lead_service/?lead_id=${id}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      deleteLead: builder.mutation({
        query: (form) => {
          return {
            url: `api/client/remove_leads/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: form,
            method: "PUT",
          };
        },
      }),
      fetchDeletedLeads: builder.query({
        query: ({ page = 1, pageSize, search }) => {
          return {
            url: `api/client/fetch_deleted_leads/?page=${page}&page_size=${pageSize}&search_str=${search}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      fetchClientList: builder.query({
        query: ({ page = 1, pageSize, search }) => {
          return {
            url: `api/client/fetch_client_list/?page=${page}&page_size=${pageSize}&search_str=${search}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      addExisitingLeads: builder.mutation({
        query: (form) => {
          return {
            url: `api/client/add_existing_leads/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: form,
            method: "POST",
          };
        },
      }),
      contactedExcelLeads: builder.mutation({
        query: (form) => {
          return {
            url: `api/client/contacted_csv_leads/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: form,
            method: "POST",
          };
        },
      }),
      pipelineExcelLeads: builder.mutation({
        query: (form) => {
          return {
            url: `api/client/pipeline_csv_leads/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: form,
            method: "POST",
          };
        },
      }),
      fetchTableDashboardData: builder.query({
        query: ({ page, pageSize, search, startDate }) => {
          return {
            url: `api/client/fetch_dashboard_table/?page=${page}&page_size=${pageSize}&search_str=${search}&year=${startDate}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      fetchStatusLabelDashboard: builder.query({
        query: () => {
          return {
            url: `/api/client/fetch_status_count/`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      fetchTotal: builder.query({
        query: ({ startDate }) => {
          return {
            url: `api/client/fetch_monthly_total/?year=${startDate}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      fetchTotalPipelineDashboard: builder.query({
        query: () => {
          return {
            url: `api/client/fetch_pipeline_total/`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      fetchAgentReport: builder.query({
        query: ({ page, pageSize, search }) => {
          return {
            url: `api/client/fetch_agent_leads/?page=${page}&page_size=${pageSize}&search_str=${search}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),
      fetchTotalRev: builder.query({
        query: () => {
          return {
            url: `api/client/fetch_revenue_total/`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
      }),

      addAttachment: builder.mutation({
        query: (form) => {
          return {
            url: `api/client/add_attachment/`,
            headers: {
              Authorization: "token " + token,
            },
            body: form,
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
      fetchAttachment: builder.query({
        query: ({ page, pageSize, id }) => {
          return {
            url: `api/client/fetch_lead_attachment/?page=${page}&page_size=${pageSize}&id=${id}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      deleteAttachment: builder.mutation({
        query: (data) => {
          return {
            url: `api/client/fetch_delete_attachment/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: data,
            method: "PUT",
          };
        },
        invalidatesTags: ["client"],
      }),
      fetchMsfBreakdown: builder.query({
        query: (id) => {
          return {
            url: `api/client/${id}/fetch_term_status/`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      updateMsfBreakdown: builder.mutation({
        query: (data) => {
          return {
            url: `api/client/edit_msf_breakdown/`,
            headers: {
              Authorization: "token " + token,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            body: data,
            method: "POST",
          };
        },
        invalidatesTags: ["client"],
      }),
      fetchNotification: builder.query({
        query: ({ page, pageSize, employeeId }) => {
          return {
            url: `api/client/fetch_notification/?page=${page}&page_size=${pageSize}&employee_id=${employeeId}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
      seenNotification: builder.mutation({
        query: (id) => {
          return {
            url: `api/client/${id}/seen_notification/`,
            headers: {
              Authorization: "token " + token,
            },
            method: "PUT",
          };
        },
        invalidatesTags: ["client"],
      }),
      deleteNotification: builder.mutation({
        query: (id) => {
          return {
            url: `api/client/${id}/delete_notification/`,
            headers: {
              Authorization: "token " + token,
            },
            method: "PUT",
          };
        },
        invalidatesTags: ["client"],
      }),
      countNotification: builder.query({
        query: (id) => {
          return {
            url: `api/client/count_notification/?employee_id=${id}`,
            headers: { Authorization: "token " + token },
            method: "GET",
          };
        },
        providesTags: ["client"],
      }),
    };
  },
});

export const {
  useFetchIndustryListQuery,
  useAddNewLeadsMutation,
  useFetchAllLeadsQuery,
  useFetchFilterLeadsQuery,
  useFetchDetailLeadsQuery,
  useUpdataLeadStatusMutation,
  useFetchPrioLeadsQuery,
  useUploadLeadsFromExcelMutation,
  useTransferLeadsMutation,
  useAddNotesMutation,
  useFetchleadNotesQuery,
  useFetchleadActivityQuery,
  useFetchNonPaginateStaffQuery,
  useAddRevenueMutation,
  useFetchRevenueQuery,
  useEditRevenueMutation,
  useUploadUncontactedLeadsExcelMutation,
  useFetchServiceQuery,
  useFetchLeadServiceQuery,
  useDeleteLeadMutation,
  useFetchDeletedLeadsQuery,
  useFetchClosedLeadsQuery,
  useFetchClientListQuery,
  useAddExisitingLeadsMutation,
  useContactedExcelLeadsMutation,
  usePipelineExcelLeadsMutation,
  useFetchTableDashboardDataQuery,
  useFetchStatusLabelDashboardQuery,
  useFetchTotalQuery,
  useFetchTotalPipelineDashboardQuery,
  useFetchAgentReportQuery,
  useFetchTotalRevQuery,
  useAddAttachmentMutation,
  useFetchAttachmentQuery,
  useDeleteAttachmentMutation,
  useFetchMsfBreakdownQuery,
  useUpdateMsfBreakdownMutation,
  useFetchNotificationQuery,
  useSeenNotificationMutation,
  useDeleteNotificationMutation,
  useCountNotificationQuery,
} = clientApi;
export { clientApi };
