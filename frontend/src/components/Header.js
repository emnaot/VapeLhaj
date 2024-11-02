import React, { useContext, useState, useEffect, useRef } from "react";
import logo from "../assest/logo.png"; // Import du logo en tant qu'image
import { GrSearch } from "react-icons/gr";
import { FaBolt, FaBars } from "react-icons/fa"; // Ajout de FaBars pour le menu mobile
import { LuUser2 } from "react-icons/lu"; // Nouvelle icône utilisateur
import { FiShoppingCart } from "react-icons/fi"; // Nouvelle icône panier
import { IoClose } from "react-icons/io5"; // Icône pour le bouton "X" de fermeture
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
  const menuRef = useRef(null); // Référence pour le menu utilisateur
  const searchRef = useRef(null); // Référence pour la barre de recherche

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

  // Fermer le menu utilisateur lorsque l'utilisateur clique en dehors (fonctionne pour le mobile et le web)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDisplay(false); // Fermer le menu si clic en dehors
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false); // Fermer la barre de recherche si clic en dehors
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, searchRef]);

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

  const handleCloseMenu = () => {
    setCategoryMenuOpen(false); // Fermer le menu quand on clique sur le bouton "X"
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full py-0 bg-white z-40 flex justify-center">
      <div
        className={`text-white w-full ${
          isMobile
            ? "px-4 h-[70px] rounded-none"
            : "max-w-[1350px] px-8 h-[72px] rounded-2xl"
        } mx-auto flex items-center justify-between shadow-md`}
        style={{
          backgroundColor: "#111111",
          fontFamily: "Calibri, sans-serif",
        }}
      >
        {/* Version Web */}
        {!isMobile && (
          <>
            {/* Logo Section */}
            <div className="flex items-center py-4">
              {" "}
              {/* Ajout de py-4 pour un espace vertical égal en haut et en bas */}
              <Link to={"/"}>
                <img src={logo} alt="Logo" width={80} height={40} />{" "}
                {/* Taille ajustée */}
              </Link>
            </div>

            {/* Liens de navigation dynamiques pour version web */}
            <nav className="hidden lg:flex space-x-8 items-center">
              {/* Bouton Promotion */}
              <button
                onClick={() => navigate("/promotion")} // Ajout de la redirection vers la page Promotion
                className="flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition"
              >
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
            <div className="flex items-center justify-center gap-6">
              {/* Icône de recherche */}
              <div className="relative" ref={searchRef}>
                <GrSearch
                  className="text-xl cursor-pointer"
                  onClick={() => setSearchVisible(!searchVisible)}
                />

                {searchVisible && (
                  <input
                    type="text"
                    placeholder="Rechercher produits..."
                    className="absolute left-1/2 transform -translate-x-1/2 pl-4 py-2 rounded-2xl bg-white border border-gray-300 shadow-lg text-black focus:outline-none transition-transform"
                    onChange={handleSearch}
                    value={search}
                    style={{ marginTop: "25px", width: "275px" }} // Largeur personnalisée en pixels
                  />
                )}
              </div>

              {/* Icône utilisateur (modifiée avec LuUser2) */}
              <div className="relative" ref={menuRef}>
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
                  <div className="absolute bg-white top-12 left-1/2 transform -translate-x-1/2  p-2 shadow-md rounded-md border ">
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-products"
                        className="block px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-black font-semibold"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="mt-2 px-3 py-1 w-full text-center bg-gray-200 text-black rounded-lg hover:bg-gray-300 font-semibold"
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
              <img src={logo} alt="Logo" width={80} height={40} />{" "}
              {/* Taille ajustée */}
            </Link>

            {/* Icônes recherche et panier à droite */}
            <div className="flex items-center gap-4">
              <GrSearch
                className="text-2xl cursor-pointer text-white"
                onClick={() => setSearchVisible(!searchVisible)}
              />

              {searchVisible && (
                <div className="absolute top-14 left-0 right-0 px-4 py-4 bg-white shadow-lg rounded-lg">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Rechercher produits"
                      className="w-full pl-10 py-2 rounded-full bg-gray-100 text-black focus:outline-none"
                      onChange={handleSearch}
                    />
                    {/* Icône de fermeture pour la barre de recherche */}
                    <IoClose
                      className="absolute right-4 text-2xl cursor-pointer text-black"
                      onClick={() => setSearchVisible(false)}
                    />
                  </div>

                  {/* Suggestions en dessous de la barre de recherche */}
                  <div className="mt-2 bg-white rounded-lg shadow-md">
                    <p className="px-4 py-2 font-semibold text-black">
                      Suggestions
                    </p>
                    <ul>
                      <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black">
                        Wotofo nexBar
                      </li>
                      <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black">
                        Friobar
                      </li>
                      <li className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black">
                        Shigeri Fighter
                      </li>
                    </ul>
                  </div>
                </div>
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

        {/* Menu utilisateur pour la version mobile */}
        {isMobile && menuDisplay && user?._id && (
          <div className="absolute bg-white top-full right-0 p-4 shadow-md rounded-md border border-white w-full flex flex-col items-center justify-center">
            {/* Bouton X pour fermer le menu */}
            <button
              className="absolute top-2 right-4 text-lg cursor-pointer text-black"
              onClick={() => setMenuDisplay(false)} // Fermer le menu au clic
            >
              <IoClose /> {/* Icône X */}
            </button>

            {user?.role === ROLE.ADMIN && (
              <Link
                to="/admin-panel/all-products"
                className="block w-full mt-4 text-center px-4 py-1 rounded-lg text-black font-semibold bg-gray-200"
                onClick={() => setMenuDisplay(false)}
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="mt-4 w-full text-center px-4 py-1 font-semibold bg-gray-200 text-black rounded-lg"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>

      {/* Menu des catégories pour la version mobile en plein écran */}
      {isMobile && categoryMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-white z-50 flex flex-col p-4 overflow-auto">
          {/* Bouton X pour fermer */}
          <button
            className="absolute top-4 right-4 text-3xl cursor-pointer"
            onClick={handleCloseMenu}
          >
            <IoClose />
          </button>

          {/* Lien Promotion */}
          <Link
            to="/promotion"
            className="block w-full mt-12 mb-8 text-center px-4 py-2 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-black transition-colors"
            onClick={handleCloseMenu}
          >
            <FaBolt className="mr-2 inline" /> Promotion
          </Link>

          {loading ? (
            <div>Chargement des catégories...</div>
          ) : (
            categoryProduct.map((category, index) => (
              <Link
                key={index}
                to={`/product-category?category=${category.category}`}
                className="block w-full mb-8 text-center px-4 py-2 rounded-lg text-black font-semibold bg-gray-200 hover:bg-gray-300 transition-colors"
                onClick={handleCloseMenu} // Fermer le menu après avoir cliqué
              >
                {capitalizeFirstLetter(category.category)}
              </Link>
            ))
          )}
          {/* Lien Contact */}
          <Link
            to="/contact"
            className="block w-full mb-8 text-center px-4 py-2 rounded-lg bg-gray-200 font-semibold hover:bg-gray-300 text-black transition-colors"
            onClick={handleCloseMenu}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
