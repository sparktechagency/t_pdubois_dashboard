import { createBrowserRouter } from "react-router-dom";

import Login from "../Pages/auth/Login";
import ForgetPassword from "../Pages/auth/ForgetPassword";
import VerifyCode from "../Pages/auth/VerifyCode";
import SetNewPassword from "../Pages/auth/SetNewPassword";

import AdminRoute from "../ProtectedRoute/AdminRoute";
import Dashboard from "../Pages/layout/Dashboard";
import PrivacyPolicy from "../Pages/privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../Pages/termsAndConditions/TermsAndConditions";
import Profile from "../Pages/profile/Profile";
import ErrorBoundary from "../ErrorBoundary";
import FAQ from "../Pages/faq/FAQ";
import Users from "../Pages/users/Users";
import DashboardHome from "../Pages/dashboardHome/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorBoundary />,
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsAndConditions />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/reset-password",
    element: <SetNewPassword />,
  },
]);
export default router;
