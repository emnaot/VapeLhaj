import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassowrd"; // Corrected spelling
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
import Promotion from "../pages/Promotion"; // Import du composant Promotion
import ScrollToTop from "../components/ScrollToTop"; // Import the ScrollToTop component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <>
            <ScrollToTop /> {/* Add ScrollToTop here */}
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
        path: "contact", // Ajout de la route pour la page Contact
        element: (
          <>
            <ScrollToTop />
            <Contact />
          </>
        ),
      },
      {
        path: "faq", // Ajout de la route pour la page FAQ
        element: (
          <>
            <ScrollToTop />
            <FAQ />
          </>
        ),
      },
      {
        path: "promotion", // Ajout de la route pour la page Promotion
        element: (
          <>
            <ScrollToTop />
            <Promotion />
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
