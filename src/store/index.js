import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { accountApi } from "./api/AccountApi";
import { clientApi } from "./api/ClientApi";

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(accountApi.middleware)
      .concat(clientApi.middleware);
  },
});

setupListeners(store.dispatch);
export {
  useLoginMutation,
  useFetchAccountDetailQuery,
  useFetchAccountListQuery,
} from "./api/AccountApi";
export {
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
} from "./api/ClientApi";
