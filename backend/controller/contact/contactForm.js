const Contact = require('../../models/contact');

// Contrôleur pour gérer la soumission du formulaire de contact
const contactFormController = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Créer un nouveau message de contact
        const newContact = new Contact({
            name,
            email,
            message
        });

        // Sauvegarde dans la base de données
        await newContact.save();

        // Répondre avec succès
        res.status(201).json({ message: 'Message envoyé avec succès !' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'envoi du message.', error });
    }
};

module.exports = contactFormController;
