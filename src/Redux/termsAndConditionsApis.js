import { baseApis } from './main/baseApis'

const termsAndConditionsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndCondition: builder.query({
      query: () => ({
        url: '/terms-condition/retrive',
        method: 'GET',
      }),
      providesTags: ['termsAndCondition'],
    }),
    createTermsAndCondition: builder.mutation({
      query: (data) => ({
        url: '/terms-condition/create-or-update',
        method: 'POST',
        body: data,
      }),
      providesTags: ['termsAndCondition'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateTermsAndConditionMutation,
  useGetTermsAndConditionQuery,
} = termsAndConditionsApis

export default termsAndConditionsApis
