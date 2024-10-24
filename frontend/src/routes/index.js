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
import Livraison from "../pages/Livraison";
import Retours from "../pages/Retours";
import ProtectionJeunesse from "../pages/ProtectionJeunesse";
import CadeauxOfferts from "../pages/CadeauxOfferts";
import MentionsLegales from "../pages/MentionsLegales"; // Import for Mentions Legales page
import APropos from "../pages/Apropos"; // Import for À Propos page
import PolitiqueConfidentialite from "../pages/PolitiqueConfidentialite"; // Import de la page

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App now contains ScrollToTop globally
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "promotion",
        element: <Promotion />,
      },
      {
        path: "livraison",
        element: <Livraison />,
      },
      {
        path: "retours",
        element: <Retours />,
      },
      {
        path: "protection-jeunesse",
        element: <ProtectionJeunesse />,
      },
      {
        path: "cadeaux-offerts",
        element: <CadeauxOfferts />,
      },
      {
        path: "mentions-legales",
        element: <MentionsLegales />,
      },
      {
        path: "a-propos",
        element: <APropos />,
      },
      {
        path: "politique-confidentialite",
        element: <PolitiqueConfidentialite />,
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
        ],
      },
    ],
  },
]);

export default router;
