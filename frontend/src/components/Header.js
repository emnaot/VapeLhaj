import React, { useContext, useState } from "react";
import Logo from "./Logo"; // Assure-toi d'avoir le bon chemin pour le logo
import { GrSearch } from "react-icons/gr";
import { FaShoppingCart, FaBolt } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

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

  return (
<header className="fixed top-0 left-0 right-0 w-full py-1 bg-transparent z-40 flex justify-center mb-6">
  <div className="text-white w-full max-w-[1350px] mx-auto px-8 h-[72px] flex items-center justify-between rounded-xl shadow-md" style={{ backgroundColor: '#111111' }}>
{/* Logo Section */}
        <div className="flex items-center">
          <Link to={"/"}>
            <Logo w={120} h={50} /> {/* Ajuste la taille du logo */}
          </Link>
        </div>

        {/* Liens de navigation */}
        <nav className="hidden lg:flex space-x-8 items-center">
          {/* Bouton Promotion */}
          <button className="flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition">
            <FaBolt className="mr-2" /> Promotion
          </button>

          {/* Autres liens */}
          <Link to="/e-cigarettes" className="hover:underline">E-Cigarettes</Link>
          <Link to="/e-liquide" className="hover:underline">E-Liquide</Link>
          <Link to="/diy" className="hover:underline">DIY</Link>
          <Link to="/experts" className="hover:underline">Experts</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </nav>

        {/* Section icônes */}
        <div className="flex items-center gap-6">
          {/* Icône de recherche */}
          <div className="relative">
            <div className="hidden lg:block">
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-64 pl-4 py-2 rounded-full bg-gray-100 text-black focus:outline-none"
                onChange={handleSearch}
                value={search}
              />
            </div>
            <GrSearch className="text-xl cursor-pointer lg:hidden" />
          </div>

          {/* Icône utilisateur */}
          <div className="relative">
            {user?._id ? (
              <div className="cursor-pointer relative flex justify-center" onClick={() => setMenuDisplay(!menuDisplay)}>
                {user?.profilePic ? (
                  <img src={user?.profilePic} className="w-10 h-10 rounded-full" alt={user?.name} />
                ) : (
                  <FaRegCircleUser className="text-2xl" />
                )}
              </div>
            ) : (
              <Link to="/login" className="px-3 py-1 rounded-full text-white bg-yellow-500 hover:bg-yellow-700">
                Connexion
              </Link>
            )}

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

          {/* Icône panier */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl cursor-pointer" />
            {context?.cartProductCount > 0 && (
              <div className="bg-yellow-500 text-white text-sm w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                {context?.cartProductCount}
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
    
  );
};

export default Header;
