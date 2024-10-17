const Contact = require('../../models/contact');

// Contrôleur pour récupérer tous les messages de contact
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();  // Récupère tous les messages
        res.status(200).json(contacts);        // Retourne les messages dans la réponse
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des messages.' });
    }
};

module.exports = getContacts;
