import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassowrd";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import FAQ from "../pages/Faq.js";
import Contact from "../pages/Contact.js";
import Promotion from "../pages/Promotion";
import ScrollToTop from "../components/ScrollToTop";
import Livraison from "../pages/Livraison";
import Retours from "../pages/Retours";
import ProtectionJeunesse from "../pages/ProtectionJeunesse";
import CadeauxOfferts from "../pages/CadeauxOfferts";
import MentionsLegales from "../pages/MentionsLegales"; // Import for Mentions Legales page

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <>
            <ScrollToTop />
            <Home />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <>
            <ScrollToTop />
            <Login />
          </>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <>
            <ScrollToTop />
            <ForgotPassword />
          </>
        ),
      },
      {
        path: "sign-up",
        element: (
          <>
            <ScrollToTop />
            <SignUp />
          </>
        ),
      },
      {
        path: "product-category",
        element: (
          <>
            <ScrollToTop />
            <CategoryProduct />
          </>
        ),
      },
      {
        path: "product/:id",
        element: (
          <>
            <ScrollToTop />
            <ProductDetails />
          </>
        ),
      },
      {
        path: "cart",
        element: (
          <>
            <ScrollToTop />
            <Cart />
          </>
        ),
      },
      {
        path: "search",
        element: (
          <>
            <ScrollToTop />
            <SearchProduct />
          </>
        ),
      },
      {
        path: "contact",
        element: (
          <>
            <ScrollToTop />
            <Contact />
          </>
        ),
      },
      {
        path: "faq",
        element: (
          <>
            <ScrollToTop />
            <FAQ />
          </>
        ),
      },
      {
        path: "promotion",
        element: (
          <>
            <ScrollToTop />
            <Promotion />
          </>
        ),
      },
      {
        path: "livraison",
        element: (
          <>
            <ScrollToTop />
            <Livraison />
          </>
        ),
      },
      {
        path: "retours",
        element: (
          <>
            <ScrollToTop />
            <Retours />
          </>
        ),
      },
      {
        path: "protection-jeunesse",
        element: (
          <>
            <ScrollToTop />
            <ProtectionJeunesse />
          </>
        ),
      },
      {
        path: "cadeaux-offerts",
        element: (
          <>
            <ScrollToTop />
            <CadeauxOfferts />
          </>
        ),
      },
      {
        path: "mentions-legales", // Ajout de la route pour Mentions Légales
        element: (
          <>
            <ScrollToTop />
            <MentionsLegales />
          </>
        ),
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: (
              <>
                <ScrollToTop />
                <AllUsers />
              </>
            ),
          },
          {
            path: "all-products",
            element: (
              <>
                <ScrollToTop />
                <AllProducts />
              </>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
