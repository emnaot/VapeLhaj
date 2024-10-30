// controllers/contact/deleteContact.js
const Contact = require('../../models/contact');

// Contrôleur pour supprimer un message de contact
const deleteContact = async (req, res) => {
  const { id } = req.params;  // Récupère l'ID du contact à supprimer depuis l'URL
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);  // Supprime le contact par ID
    if (!deletedContact) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }
    res.status(200).json({ message: 'Message supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du message', error });
  }
};

module.exports = deleteContact;
