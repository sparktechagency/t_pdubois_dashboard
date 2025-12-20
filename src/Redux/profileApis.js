import { baseApis } from "./main/baseApis";

const profileApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/user/get-my-profile`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/user/update-profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateProfileMutation, useGetProfileQuery } = profileApis;

export default profileApis;
