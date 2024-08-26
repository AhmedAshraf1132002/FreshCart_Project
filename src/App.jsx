import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Notfound from "./Components/Notfound/Notfound";
import CounterContextProvider from "./Components/Contexts/CounterContext";
import AuthContextProvider from "./Components/Contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
// import ProtectAuthRoute from "./Components/ProtectAuthRoute/ProtectAuthRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import ShippingAddress from "./Components/ShippingAddress/ShippingAddress";
import Orders from "./Components/Orders/Orders";
import { Offline, Online } from "react-detect-offline";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"



function App() {

const queryClient = new QueryClient()


  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute>  },
        { path: "Login", element: <Login /> },
        { path: "Register", element: <Register /> },
        { path: "Cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "Products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "Categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: "Brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "ShippingAddress/:cartId", element: <ProtectedRoute><ShippingAddress /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
        { path: "ProductDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>

    <QueryClientProvider client={queryClient} >
    <AuthContextProvider>
        <CounterContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <ToastContainer />
          {/* <Online>Only shown when you're online</Online> */}
          <Offline>Only shown offline (surprise!)</Offline>
        </CounterContextProvider>
      </AuthContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
      
    </>
  );
}

export default App;
