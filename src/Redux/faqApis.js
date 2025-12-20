import { baseApis } from "./main/baseApis";

const faqApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaq: builder.query({
      query: () => ({
        url: "/manage-web/get-faq",
        method: "GET",
      }),
      providesTags: ["faq"],
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/manage-web/add-faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/manage-web/edit-faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/manage-web/delete-faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApis;

export default faqApis;
