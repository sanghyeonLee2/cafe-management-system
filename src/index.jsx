import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import { RecoilRoot } from "recoil";
import AdminPage from "./pages/admin/AdminPage";
import MenuManagement from "./pages/admin/MenuManagement";
import UserManagement from "./pages/admin/UserManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import MaterialManagement from "./pages/admin/MaterialManagement";
import SupplierManagement from "./pages/admin/SupplierManagement";
import Supplier from "./pages/Supplier";
import MenuItemInfo from "./pages/MenuItemInfo";
import Order from "./pages/Order";
import OrderInfo from "./pages/OrderInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/order-info",
        element: <OrderInfo />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/admin/menu-management",
        element: <MenuManagement />,
      },
      {
        path: "/admin/user-management",
        element: <UserManagement />,
      },
      {
        path: "/admin/order-management",
        element: <OrderManagement />,
      },
      {
        path: "/admin/material-management",
        element: <MaterialManagement />,
      },
      {
        path: "/admin/supplier-management",
        element: <SupplierManagement />,
      },
      {
        path: "/admin/supplier-management/supplier",
        element: <Supplier />,
      },
      {
        path: "/menuItemInfo",
        element: <MenuItemInfo />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    {" "}
    <RouterProvider router={router} />
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
