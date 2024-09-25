import React, { useState } from "react";
import loginIcons from "../assest/signin.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);

    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section
      id="signup"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gold-dark to-gray-900"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-gold to-gold-dark p-6 text-center">
          <div className="w-24 h-24 mx-auto mb-4 relative overflow-hidden rounded-full">
            <img
              src={data.profilePic || loginIcons}
              alt="Icône d'inscription"
              className="w-full h-full object-cover rounded-full border-4 border-white"
            />
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <h2 className="text-white text-2xl font-bold">Inscription</h2>
          <p className="text-gray-200">Créez votre compte</p>
        </div>
        <form
          className="p-6 space-y-4 overflow-y-auto max-h-96"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Nom :
            </label>
            <input
              type="text"
              placeholder="Entrez votre nom"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold transition"
            />
          </div>
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
              Numéro de téléphone :
            </label>
            <input
              type="tel"
              placeholder="Entrez votre numéro de téléphone"
              name="phone"
              value={data.phone}
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
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Confirmez le mot de passe :
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmez votre mot de passe"
                value={data.confirmPassword}
                name="confirmPassword"
                onChange={handleOnChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold transition"
              />
              <div
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gold"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-gold to-gold-dark text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition duration-300 font-semibold"
          >
            S'inscrire
          </button>
        </form>
        <p className="text-center text-gray-600 py-4">
          Vous avez déjà un compte ?
          <Link
            to={"/login"}
            className="text-gold hover:text-gold-dark font-semibold ml-1"
          >
            Connectez-vous
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
