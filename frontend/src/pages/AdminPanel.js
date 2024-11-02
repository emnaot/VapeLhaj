import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import img2 from "../assest/banner/categ.gif";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
    return (
      <div className="min-h-[calc(100vh-200px)] bg-white flex flex-col items-center font-calibri p-4">
        <aside className="bg-white w-full shadow-xl rounded-xl mb-4">
          <div
            className="h-40 flex flex-col items-center justify-center rounded-t-xl"
            style={{
              backgroundImage: `url(${img2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-full h-full object-cover"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser className="text-6xl text-gray-300" />
              )}
            </div>
            <p className="capitalize text-xl font-bold text-black mt-3">
              {user?.name}
            </p>
            <p className="text-sm text-white mt-1 p-0">
              {user?.role}
            </p>
          </div>

          <div className="p-4">
            <nav className="grid gap-4">
              <Link
                to={"all-products"}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 shadow-sm"
              >
                Tous les produits
              </Link>
              <Link
                to={"all-users"}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 shadow-sm"
              >
                Tous les utilisateurs
              </Link>
              <Link
                to={"all-contacts"}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 shadow-sm"
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

  return (
    <div className="min-h-[calc(100vh-200px)] bg-white flex justify-center font-calibri">
      <div className="max-w-[1380px] w-full px-0 md:flex hidden">
      <aside className="bg-white min-h-[calc(100vh-300px)] w-full max-w-[295px] shadow-xl rounded-xl m-4">
      <div
            className="h-40 flex flex-col items-center justify-center rounded-t-xl"
            style={{
              backgroundImage: `url(${img2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-full h-full object-cover"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser className="text-6xl text-gray-300" />
              )}
            </div>
            <p className="capitalize text-xl font-bold text-black mt-3">
              {user?.name}
            </p>
            <p className="text-sm text-white mt-1 p-0">
              {user?.role}
            </p>
          </div>

          <div className="p-6">
            <nav className="grid gap-6">
              <Link
                to={"all-products"}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 shadow-sm"
              >
                Tous les produits
              </Link>
              <Link
                to={"all-users"}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 shadow-sm"
              >
                Tous les utilisateurs
              </Link>
              <Link
                to={"all-contacts"}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 shadow-sm"
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
