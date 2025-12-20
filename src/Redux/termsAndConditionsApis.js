import { baseApis } from './main/baseApis'

const termsAndConditionsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndCondition: builder.query({
      query: () => ({
        url: '/manage-web/get-terms-conditions',
        method: 'GET',
      }),
      providesTags: ['termsAndCondition'],
    }),
    createTermsAndCondition: builder.mutation({
      query: (data) => ({
        url: '/manage-web/add-terms-conditions',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['termsAndCondition'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateTermsAndConditionMutation,
  useGetTermsAndConditionQuery,
} = termsAndConditionsApis

export default termsAndConditionsApis
