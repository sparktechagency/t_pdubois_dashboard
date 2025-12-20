import { baseApis } from './main/baseApis'

const privacyPolicyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: '/privacy-policy/retrive',
        method: 'GET',
      }),
      providesTags: ['privacyPolicy'],
    }),
    createPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: '/privacy-policy/create-or-update',
        method: 'POST',
        body: data,
      }),
      providesTags: ['privacyPolicy'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetPrivacyPolicyQuery, useCreatePrivacyPolicyMutation } =
  privacyPolicyApis

export default privacyPolicyApis
