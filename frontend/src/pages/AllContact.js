// src/pages/AllContact.js
import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import { MdOutlineMessage } from 'react-icons/md'; // Icône pour afficher le message
import Modal from '../components/Modal'; // Composant Modal pour afficher le message complet

const AllContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null); // État pour gérer le message sélectionné
  const [selectedEmail, setSelectedEmail] = useState(''); // Stocke l'email de l'utilisateur pour la réponse

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

  useEffect(() => {
    fetchContacts(); // Récupère les contacts au chargement du composant
  }, []);

  // Fonction pour ouvrir le modal avec le message complet
  const handleOpenMessage = (message, email) => {
    setSelectedMessage(message); // Définit le message sélectionné pour l'affichage
    setSelectedEmail(email); // Définit l'email sélectionné pour répondre
  };

  // Fonction pour fermer le modal
  const handleCloseModal = () => {
    setSelectedMessage(null);
    setSelectedEmail(''); // Réinitialise l'email
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">Aucun message de contact disponible.</p>
      )}

      {/* Affiche le modal avec le message complet et le bouton "Répondre" */}
      {selectedMessage && (
        <Modal onClose={handleCloseModal}>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Message complet</h3>
            <p className="text-gray-800 mb-4">{selectedMessage}</p>
            <div className="text-right">
              <a
                href={`mailto:${selectedEmail}`} // Génère le lien mailto avec l'email
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
