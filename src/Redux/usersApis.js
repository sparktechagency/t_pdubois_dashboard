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
  }),
  overrideExisting: false,
});

export const { useGetAllUsersQuery } = usersApis;

export default usersApis;
