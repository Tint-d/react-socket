import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { paths } from "./paths";
import FallBack from "@/common/Fallback";
import PrivateRoute from "./PrivateRoute";
import Register from "@/pages/auth/Register";
import Layout from "@/layout/Layout";

const Login = lazy(() => import("../pages/auth/Login"));
const Home = lazy(() => import("../pages/Home"));

const allRoutes = [
  {
    path: paths.Login,
    element: (
      <Suspense fallback={<FallBack />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: paths.Register,
    element: (
      <Suspense fallback={<FallBack />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: paths.Home,
    element: (
      <PrivateRoute
        element={
          <Suspense fallback={<FallBack />}>
            <Layout>
              <Home />
            </Layout>
          </Suspense>
        }
      />
    ),
  },
];

const router = createBrowserRouter(allRoutes);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
