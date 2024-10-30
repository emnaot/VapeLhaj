// src/pages/AllContact.js
import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import { MdOutlineMessage, MdDelete } from 'react-icons/md';  // Icônes pour afficher le message et la suppression
import Modal from '../components/Modal';  // Composant Modal pour afficher le message complet

const AllContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);  // Gère le message sélectionné
  const [selectedEmail, setSelectedEmail] = useState('');  // Stocke l'email de l'utilisateur

  const fetchContacts = async () => {
    try {
      const response = await fetch(SummaryApi.allContacts.url, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setContacts(data);
      } else {
        throw new Error('Erreur lors de la récupération des contacts');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer un contact
  const handleDeleteContact = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      try {
        const response = await fetch(SummaryApi.deleteContact.url(id), {
          method: 'DELETE',
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setContacts(contacts.filter(contact => contact._id !== id));  // Supprime le contact de l'état local
          alert(data.message);
        } else {
          alert('Erreur lors de la suppression du message');
        }
      } catch (error) {
        alert('Erreur lors de la suppression du message');
      }
    }
  };

  useEffect(() => {
    fetchContacts();  // Récupère les contacts lors du chargement du composant
  }, []);

  // Fonction pour afficher le message complet
  const handleOpenMessage = (message, email) => {
    setSelectedMessage(message);
    setSelectedEmail(email);
  };

  // Fermer le modal de message
  const handleCloseModal = () => {
    setSelectedMessage(null);
    setSelectedEmail('');
  };

  if (loading) {
    return <p className="text-center mt-6">Chargement des messages...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-6">{error}</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mt-4">
      <h2 className="font-bold text-2xl text-gray-700 mb-6">Messages de Contact</h2>
      {contacts.length > 0 ? (
        <table className="w-full bg-white shadow-md rounded-lg table-auto border-collapse">
          <thead>
            <tr className="bg-[#111111] text-white border border-gray-200">
              <th className="p-3 text-left border border-gray-300">N°</th>
              <th className="p-3 text-left border border-gray-300">Nom</th>
              <th className="p-3 text-left border border-gray-300">Email</th>
              <th className="p-3 text-left border border-gray-300">Message</th>
              <th className="p-3 text-left border border-gray-300">Date</th>
              <th className="p-3 text-left border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact._id} className="hover:bg-gray-50 border-t border-gray-200">
                <td className="p-3 text-sm border border-gray-300">{index + 1}</td>
                <td className="p-3 text-sm border border-gray-300">{contact.name}</td>
                <td className="p-3 text-sm border border-gray-300">{contact.email}</td>
                <td className="p-3 text-sm border border-gray-300">
                  <div className="flex items-center space-x-2">
                    <span className="truncate max-w-xs">{contact.message.slice(0, 50)}...</span>
                    <button
                      onClick={() => handleOpenMessage(contact.message, contact.email)}
                      className="text-gold hover:text-gold-dark"
                    >
                      <MdOutlineMessage size={20} />
                    </button>
                  </div>
                </td>
                <td className="p-3 text-sm border border-gray-300">{moment(contact.createdAt).format('LL')}</td>
                <td className="p-3 text-sm border border-gray-300">
                  <button
                    onClick={() => handleDeleteContact(contact._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">Aucun message de contact disponible.</p>
      )}

      {/* Modal pour afficher le message complet */}
      {selectedMessage && (
        <Modal onClose={handleCloseModal}>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Message complet</h3>
            <p className="text-gray-800 mb-4">{selectedMessage}</p>
            <div className="text-right">
              <a
                href={`mailto:${selectedEmail}`}  // Lien pour répondre par email
                className="bg-gold text-white py-2 px-3 rounded-sm hover:bg-gold-dark transition-colors"
              >
                Répondre
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AllContact;
