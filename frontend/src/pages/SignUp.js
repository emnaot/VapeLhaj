import React, { useState } from "react";
import loginIcons from "../assest/signin.png";
import { FaEye, FaEyeSlash, FaCloudUploadAlt } from "react-icons/fa"; // Ajoutez l'icône de téléchargement
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
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({ ...prev, profilePic: imagePic }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section id="signup">
      <div
        className="mx-auto container flex justify-center items-center min-h-screen"
        style={{ padding: "0.25px", marginTop: "-25px" }}
      >
        <div className="bg-white p-8 w-full max-w-md shadow-md rounded-lg">
          <h1 className="text-4xl font-bold text-center mb-6">
            Créer un compte
          </h1>

          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full mb-4">
            <img src={data.profilePic || loginIcons} alt="login icons" />
            <form>
              <label>
                <div
                  className="flex justify-center items-center bg-transparent text-center absolute w-full py-2 cursor-pointer"
                  style={{ bottom: "25px" }} // Ajustez la valeur en pixels pour déplacer l'icône
                >
                  <FaCloudUploadAlt className="text-2xl text-gray-100" />{" "}
                  {/* Icône de téléchargement */}
                </div>

                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Prénom"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              required
              className="bg-gray-100 p-3 rounded-md outline-none"
            />
            <input
              type="email"
              placeholder="Courriel"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              required
              className="bg-gray-100 p-3 rounded-md outline-none"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                required
                className="bg-gray-100 p-3 rounded-md w-full outline-none"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-xl"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmez le mot de passe"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                required
                className="bg-gray-100 p-3 rounded-md w-full outline-none"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer text-xl"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" className="cursor-pointer" />
              <p className="text-sm text-gray-600">
                En entrant sur ce site, vous reconnaissez être majeur(e) et que
                vous êtes autorisé(e) par la législation de votre pays à acheter
                des produits contenant de la nicotine.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="cursor-pointer" />
              <p className="text-sm text-gray-600">
                En soumettant ce formulaire, j'accepte que les données fournies
                soient utilisées pour vous recontacter.
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="bg-black text-white py-3 rounded-full font-semibold flex-1">
                Créer
              </button>
              <Link
                to={"/login"}
                className="text-center text-black border py-3 rounded-full font-semibold flex-1"
              >
                Se connecter
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
