import { baseApis } from "./main/baseApis";

const usersApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/user/get-all-users",
        method: "GET",
        params,
      }),
      providesTags: ["users"],
    }),
    userBlockUnblock: builder.mutation({
      query: (id) => ({
        url: `/user/block-user/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["users"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllUsersQuery, useUserBlockUnblockMutation } = usersApis;

export default usersApis;
