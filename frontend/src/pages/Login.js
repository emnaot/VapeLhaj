import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  console.log("data login", data);

  return (
    <section
      id="login"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gold-dark to-gray-900"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-gold to-gold-dark p-6 text-center">
          <div className="w-24 h-24 mx-auto mb-4 relative overflow-hidden rounded-full">
            <img
              src={loginIcons}
              alt="Icône de connexion"
              className="w-full h-full object-cover rounded-full border-4 border-white"
            />
          </div>
          <h2 className="text-white text-2xl font-bold">Connexion</h2>
          <p className="text-gray-200">Connectez-vous à votre compte</p>
        </div>
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email :
            </label>
            <input
              type="email"
              placeholder="Entrez votre email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Mot de passe :
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Entrez votre mot de passe"
                value={data.password}
                name="password"
                onChange={handleOnChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold transition"
              />
              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gold"
                onClick={() => setShowPassword((preve) => !preve)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block w-fit ml-auto text-gold hover:text-gold-dark hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-gold to-gold-dark text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300 font-semibold"
          >
            Connexion
          </button>
        </form>
        <p className="text-center text-gray-600 py-4">
          Vous n'avez pas de compte ?{" "}
          <Link
            to={"/sign-up"}
            className="text-gold hover:text-gold-dark font-semibold"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
