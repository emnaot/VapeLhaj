import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-120px)] bg-white flex justify-center">
      <div className="max-w-[1380px] w-full px-0 md:flex hidden">
        <aside className="bg-white min-h-full w-full max-w-60 shadow-xl rounded-xl m-4">
          <div className="h-32 flex justify-center items-center flex-col bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 rounded-t-xl">
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
            <p className="text-sm text-gray-300">{user?.role}</p>
          </div>

          {/***navigation */}
          <div className="p-6">
            <nav className="grid gap-4">
              <Link
                to={"all-users"}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Tous les utilisateurs
              </Link>
              <Link
                to={"all-products"}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-md"
              >
                Tous les produits
              </Link>
            </nav>
          </div>
        </aside>

        <main className="w-full h-full p-6 bg-white shadow-xl rounded-xl m-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
