import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/global.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './components/auth/LoginComponent';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import Admin from './pages/Admin';
import AdminCreateProduct from './pages/AdminCreateProduct';
import AdminHome from './components/AdminHome';
import SingleProductData from './components/SingleProductData';
import AdminProducts from './pages/AdminProducts';
import AdminModifyProduct from './pages/AdminModifyProduct';
import AdminDeleteProduct from './pages/AdminDeleteProduct';
import ProductFilter from './components/ProductFilter';
import AdminProductFilter from './components/AdminProductFilter';
import UserProvider from './contexts/userProvider';
import { CartContextProvider } from './contexts/CartProvider';
import Cart from './pages/Cart';
import AdminAuth from './components/auth/AdminAuth';
import AdminUserList from './pages/AdminUserList';
import AdminOrderList from './pages/AdminOrderList';
import CategoryForm from './components/CategoryForm';
import UserProfile from './pages/UserProfile';
import UserAuth from './components/auth/UserAuth';
import { CategoryProvider } from './contexts/categoryProvider';
import { FavProvider } from './contexts/favProvider';
import Favourites from './pages/Favourites';


const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
      
        {
          path: "/termekek/:sortType/:pagenumber",
          element: <Products />,
        },
        {
          path: "/termekek/product/:productid",
          element: <SingleProductData />
        },
        {
          path: "/termekek/kereses/:searchTerm/:sortType",
          element: <ProductFilter />
        },
        {
          path:"/kosar",
          element:<UserAuth><Cart/></UserAuth>
        },
        {
          path: "/kedvencek",
          element:<UserAuth><Favourites /></UserAuth>
        },
        {
          path: "/profil",
          element: <UserAuth><UserProfile /></UserAuth>
        },
        {
          path: "/admin",
          element: <AdminAuth><Admin/></AdminAuth>,
          children: [
            {
              path: "/admin",
              element: <AdminHome />
            },
            {
              path: "/admin/termek-felvitel",
              element: <AdminCreateProduct />
            },
            {
              path: "/admin/termekek",
              element: <AdminProducts />
            },
            {
              path: "/admin/termekek/:sortType/:pagenumber",
              element: <AdminProducts />
            },
            {
              path: "/admin/termekek/:id/modositas",
              element: <AdminModifyProduct />
            },
            {
              path: "/admin/termekek/:id/torles",
              element: <AdminDeleteProduct />
            },
            {
              path: "/admin/termekek/kereses/:searchterm/:sortType",
              element: <AdminProductFilter />
            },
            {
              path: "/admin/vasarlok",
              element: <AdminUserList />
            },
            {
              path: "/admin/megrendelesek",
              element: <AdminOrderList />
            },
            {
              path: "/admin/kategoriak/uj-kategoria",
              element: <CategoryForm />
            }
          ]
        }
      ]
    },
    {
      path: "/bejelentkezes",
      element: <Login />
    },
    {
      path: "/regisztracio",
      element: <SignUp />
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CategoryProvider>
    <UserProvider >
      <FavProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </FavProvider>
    </UserProvider>
  </CategoryProvider>
);