// src/pages/AdminPanel.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import img2 from "../assest/banner/categ.gif"; // Import de l'image GIF

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Détection mobile

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  if (isMobile) {
    // Version mobile
    return (
      <div className="min-h-[calc(100vh-200px)] bg-white flex flex-col justify-center items-center font-calibri p-4">
        <aside className="bg-white w-full shadow-xl rounded-xl mb-4">
          <div
            className="h-32 flex justify-center items-center flex-col rounded-t-xl"
            style={{
              backgroundImage: `url(${img2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-5xl cursor-pointer relative flex justify-center">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser className="text-black" />
              )}
            </div>
            <p className="capitalize text-lg font-semibold text-black mt-2">
              {user?.name}
            </p>
            <p className="text-sm text-white">{user?.role}</p>
          </div>
          {/***navigation mobile */} 
          <div className="p-4">
            <nav className="grid gap-4">
            
              <Link
                to={"all-products"}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Tous les produits
              </Link>
              <Link
                to={"all-users"}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Tous les utilisateurs
              </Link>
              <Link
                to={"all-contacts"}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Messages de Contact
              </Link>
            </nav>
          </div>
        </aside>

        <main className="w-full p-4 bg-white shadow-xl rounded-xl">
          <Outlet />
        </main>
      </div>
    );
  }

  // Version desktop reste intacte
  return (
    <div className="min-h-[calc(100vh-200px)] bg-white flex justify-center font-calibri">
      <div className="max-w-[1380px] w-full px-0 md:flex hidden">
        <aside className="bg-white min-h-[calc(100vh-300px)] w-full max-w-60 shadow-xl rounded-xl m-4">
          <div
            className="h-32 flex justify-center items-center flex-col rounded-t-xl"
            style={{
              backgroundImage: `url(${img2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-5xl cursor-pointer relative flex justify-center">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser className="text-black" />
              )}
            </div>
            <p className="capitalize text-lg font-semibold text-black mt-2">
              {user?.name}
            </p>
            <p className="text-sm text-white">{user?.role}</p>
          </div>

          {/***navigation */} 
          <div className="p-6">
            <nav className="grid gap-4">
          
              <Link
                to={"all-products"}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Tous les produits
              </Link>
              <Link
                to={"all-users"}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Tous les utilisateurs
              </Link>
              <Link
                to={"all-contacts"}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Messages de Contact
              </Link>
            </nav>
          </div>
        </aside>

        <main className="w-full min-h-[calc(100vh-300px)] p-6 bg-white shadow-xl rounded-xl m-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
