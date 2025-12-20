import { baseApis } from './main/baseApis'

const allUsersApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: '/user/retrieve/all',
        method: 'GET',
        params,
      }),
      providesTags: ['users'],
    }),
    updateStatusUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/update/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['users'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllUsersQuery, useUpdateStatusUserMutation } = allUsersApis

export default allUsersApis
