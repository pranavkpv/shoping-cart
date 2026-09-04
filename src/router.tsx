import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";

const ProductsPage = lazy(
  () => import("./pages/ProductsPage")
);

const CartPage = lazy(
  () => import("./pages/CartPage")
);

const CheckoutPage = lazy(
  () => import("./pages/CheckoutPage")
);

const NotFoundPage = lazy(
  () => import("./pages/NotFoundPage")
);

const OrderSuccessPage = lazy(
  () => import("./pages/OrderSuccessPage")
);

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <p className="text-lg">Loading...</p>
  </div>
);

const LazyPage = () => (
  <Suspense fallback={<PageLoader />}>
    <Outlet />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <LazyPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/products" replace />,
          },
          {
            path: "products",
            element: <ProductsPage />,
          },
          {
            path: "cart",
            element: <CartPage />,
          },
          {
            path: "checkout",
            element: <CheckoutPage />,
          },
          {
            path: "order-success",
            element: <OrderSuccessPage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);