// src/pages/AllUsers.js
import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    phone: "",
    role: "",
    _id: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Détection mobile

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();

    // Listener pour ajuster l'état mobile en fonction du redimensionnement de la fenêtre
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Si l'écran est plus petit que 768px, on est en version mobile
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filtrer les utilisateurs selon le terme de recherche
  const filteredUsers = allUser.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`bg-gray-100 pb-4 font-calibri ${isMobile ? 'px-2' : 'px-0'}`}>
      <div className={`mb-4 ${isMobile ? 'w-full' : 'w-1/2 max-w-xs'} flex justify-right`}>
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/*** Table Desktop avec défilement ***/}
      {!isMobile ? (
        <div className="overflow-y-auto max-h-96"> {/* Conteneur avec défilement vertical */}
          <table className="w-full userTable bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-[#111111] text-white">
                <th className="p-3">N°</th>
                <th className="p-3">Nom</th>
                <th className="p-3">Email</th>
                <th className="p-3">Numéro de téléphone</th>
                <th className="p-3">Rôle</th>
                <th className="p-3">Date de création</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((el, index) => {
                return (
                  <tr key={el._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{el?.name}</td>
                    <td className="p-3">{el?.email}</td>
                    <td className="p-3">{el?.phone}</td>
                    <td className="p-3">{el?.role}</td>
                    <td className="p-3">{moment(el?.createdAt).format("LL")}</td>
                    <td className="p-3">
                      <button
                        className="bg-gold-white p-2 rounded-full cursor-pointer hover:bg-gold hover:text-white transition duration-300"
                        onClick={() => {
                          setUpdateUserDetails(el);
                          setOpenUpdateRole(true);
                        }}
                      >
                        <MdModeEdit />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /*** Version mobile ***/
        <div className="grid gap-4">
          {filteredUsers.map((el, index) => (
            <div key={el._id} className="bg-white shadow-md rounded-lg p-4">
              <p className="font-semibold text-lg">Utilisateur {index + 1}</p>
              <p className="text-gray-700">
                <span className="font-semibold">Nom :</span> {el?.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email :</span> {el?.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Téléphone :</span> {el?.phone}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Rôle :</span> {el?.role}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Créé le :</span>{" "}
                {moment(el?.createdAt).format("LL")}
              </p>
              <button
                className="bg-gold-dark mt-2 p-2 rounded-full text-white cursor-pointer hover:bg-gold transition-colors duration-300"
                onClick={() => {
                  setUpdateUserDetails(el);
                  setOpenUpdateRole(true);
                }}
              >
                Modifier le rôle
              </button>
            </div>
          ))}
        </div>
      )}

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          phone={updateUserDetails.phone}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
