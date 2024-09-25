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
    phone:"",
    role: "",
    _id: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

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
  }, []);

  // Filtrer les utilisateurs selon le terme de recherche
  const filteredUsers = allUser.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 pb-4">
      <div className="mb-4 flex justify-right">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="w-1/2 max-w-xs p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full userTable bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-800 text-white">
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
                    className="bg-yellow-100 p-2 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white transition duration-300"
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
