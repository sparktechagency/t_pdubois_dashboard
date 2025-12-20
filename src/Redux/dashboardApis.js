import { baseApis } from "./main/baseApis";

const dashboardApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/meta/dashboard-meta-data",
        method: "GET",
      }),
    }),
    getUserGrowth: builder.query({
      query: (params) => ({
        url: "/meta/user-chart-data",
        method: "GET",
        params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetDashboardStatsQuery, useGetUserGrowthQuery } =
  dashboardApis;

export default dashboardApis;
