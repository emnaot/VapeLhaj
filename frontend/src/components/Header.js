import React, { useContext, useState, useEffect } from "react";
import Logo from "./Logo"; // Assure-toi d'avoir le bon chemin pour le logo
import { GrSearch } from "react-icons/gr";
import { FaBolt, FaBars } from "react-icons/fa"; // Ajout de FaBars pour le menu mobile
import { LuUser2 } from "react-icons/lu"; // Nouvelle icône utilisateur
import { FiShoppingCart } from "react-icons/fi"; // Nouvelle icône panier
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Context from "../context";
import ROLE from "../common/role";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Détection mobile
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false); // État pour gérer l'ouverture du menu sur mobile
  const [searchVisible, setSearchVisible] = useState(false); // Gérer l'affichage de la barre de recherche
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fonction pour capitaliser la première lettre de chaque catégorie
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Récupérer les catégories à partir de l'API
  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data); // Charger les données des catégories
  };

  useEffect(() => {
    fetchCategoryProduct(); // Appel au chargement des catégories

    // Listener pour ajuster l'état mobile en fonction du redimensionnement de la fenêtre
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Si l'écran est plus petit que 768px, on est en version mobile
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const handleUserIconClick = () => {
    if (!user?._id) {
      navigate("/login"); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    } else {
      setMenuDisplay(!menuDisplay); // Afficher ou masquer le menu utilisateur si l'utilisateur est connecté
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full py-0 bg-white z-40 flex justify-center mb-6">
      <div
        className={`text-white w-full ${
          isMobile
            ? "px-4 h-[70px] rounded-none"
            : "max-w-[1350px] px-8 h-[72px] rounded-2xl"
        } mx-auto flex items-center justify-between shadow-md`}
        style={{ backgroundColor: "#111111" }}
      >
        {/* Version Web */}
        {!isMobile && (
          <>
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to={"/"}>
                <Logo w={120} h={50} /> {/* Ajuste la taille du logo */}
              </Link>
            </div>

            {/* Liens de navigation dynamiques pour version web */}
            <nav className="hidden lg:flex space-x-8 items-center">
              {/* Bouton Promotion */}
              <button className="flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition">
                <FaBolt className="mr-2" /> Promotion
              </button>

              {/* Liens générés dynamiquement pour les catégories */}
              {loading ? (
                <div>Chargement des catégories...</div>
              ) : (
                categoryProduct.slice(0, 5).map((category, index) => (
                  <Link
                    key={index}
                    to={`/product-category?category=${category.category}`}
                    className="hover:underline"
                  >
                    {capitalizeFirstLetter(category.category)}
                  </Link>
                ))
              )}

              {/* Lien Contact qui reste toujours dans le header */}
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </nav>

            {/* Section icônes pour version web */}
            <div className="flex items-center gap-6">
              {/* Icône de recherche */}
              <div className="relative">
                <GrSearch
                  className="text-xl cursor-pointer"
                  onClick={() => setSearchVisible(!searchVisible)}
                />

                {searchVisible && (
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="absolute top-0 left-0 w-64 pl-4 py-2 rounded-full bg-gray-100 text-black focus:outline-none"
                    onChange={handleSearch}
                    value={search}
                    style={{ marginTop: "40px" }} // Ajuste la position de la barre de recherche sous l'icône
                  />
                )}
              </div>

              {/* Icône utilisateur (modifiée avec LuUser2) */}
              <div className="relative">
                <div
                  className="cursor-pointer relative flex justify-center"
                  onClick={handleUserIconClick} // Redirige ou ouvre le menu utilisateur
                >
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="w-10 h-10 rounded-full"
                      alt={user?.name}
                    />
                  ) : (
                    <LuUser2 className="text-2xl" /> // Nouvelle icône de profil
                  )}
                </div>

                {/* Menu utilisateur pour la version web */}
                {menuDisplay && user?._id && (
                  <div className="absolute bg-yellow-50 top-12 right-0 p-2 shadow-md rounded-md border border-yellow-300">
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-products"
                        className="block px-2 py-1 hover:bg-yellow-200 rounded text-yellow-700 font-semibold"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="mt-2 px-3 py-1 w-full text-center bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>

              {/* Icône panier (modifiée avec FiShoppingCart) */}
              <Link to="/cart" className="relative">
                <FiShoppingCart className="text-2xl cursor-pointer" />
                {context?.cartProductCount > 0 && (
                  <div className="bg-gold text-white text-sm w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                    {context?.cartProductCount}
                  </div>
                )}
              </Link>
            </div>
          </>
        )}

        {/* Version Mobile */}
        {isMobile && (
          <div className="w-full flex justify-between items-center">
            {/* Menu burger + drapeau + utilisateur */}
            <div className="flex items-center gap-4">
              <FaBars
                className="text-2xl cursor-pointer text-white"
                onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Tunisia.svg"
                alt="Tunisia"
                className="w-6 h-4 cursor-pointer"
              />
              <LuUser2
                className="text-2xl text-white cursor-pointer"
                onClick={handleUserIconClick} // Redirige ou ouvre le menu utilisateur sur mobile
              />
            </div>

            {/* Logo centré */}
            <Link to="/">
              <Logo w={120} h={50} /> {/* Ajuste la taille du logo */}
            </Link>

            {/* Icônes recherche et panier à droite */}
            <div className="flex items-center gap-4">
              <GrSearch
                className="text-2xl cursor-pointer text-white"
                onClick={() => setSearchVisible(!searchVisible)}
              />

              {searchVisible && (
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="absolute top-14 right-0 w-64 pl-4 py-2 rounded-full bg-gray-100 text-black focus:outline-none"
                  onChange={handleSearch}
                />
              )}

              <Link to="/cart" className="relative">
                <FiShoppingCart className="text-2xl text-white cursor-pointer" />
                {context?.cartProductCount > 0 && (
                  <div className="bg-gold text-white text-sm w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                    {context?.cartProductCount}
                  </div>
                )}
              </Link>
            </div>
          </div>
        )}

        {/* Menu utilisateur ou Connexion pour la version mobile */}
        {isMobile && menuDisplay && user?._id && (
          <div className="absolute bg-yellow-50 top-full right-0 p-2 shadow-md rounded-md border border-yellow-300 w-full">
            {user?.role === ROLE.ADMIN && (
              <Link
                to="/admin-panel/all-products"
                className="block px-2 py-1 hover:bg-yellow-200 rounded text-yellow-700 font-semibold"
                onClick={() => setMenuDisplay(false)}
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="mt-2 px-3 py-1 w-full text-center bg-yellow-500 text-white rounded-lg hover:bg-yellow-700"
            >
              Déconnexion
            </button>
          </div>
        )}

        {/* Menu des catégories pour la version mobile */}
        {isMobile && categoryMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white text-black z-50 flex flex-col items-center p-2 space-y-1 border border-gray-700">
            {loading ? (
              <div>Chargement des catégories...</div>
            ) : (
              categoryProduct.map((category, index) => (
                <Link
                  key={index}
                  to={`/product-category?category=${category.category}`}
                  className="w-full text-center py-2 border-b border-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
                  onClick={() => setCategoryMenuOpen(false)} // Fermer le menu après avoir cliqué
                >
                  {capitalizeFirstLetter(category.category)}
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
