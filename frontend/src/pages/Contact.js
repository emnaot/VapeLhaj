import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Icône de loupe
import { FiMail } from "react-icons/fi"; // Icône d'enveloppe pour le contact
import SummaryApi from "../common";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Variable pour détecter la version mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Référence au champ de message
  const messageFieldRef = useRef(null);

  // Fonction pour faire défiler jusqu'au champ de message
  const scrollToMessageField = () => {
    if (messageFieldRef.current) {
      messageFieldRef.current.scrollIntoView({ behavior: "smooth" });
      messageFieldRef.current.focus(); // Met le focus sur le champ
    }
  };

  // Gérer les changements de taille d'écran pour détecter la version mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.contactForm.url, {
        method: SummaryApi.contactForm.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMessage("Erreur lors de l'envoi du message.");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de l'envoi du message.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      {/* Section des informations */}
      <div
        className={`w-full max-w-[1415px] px-8 mb-8 ${
          isMobile ? "flex overflow-x-auto space-x-6" : "grid grid-cols-1 md:grid-cols-2 gap-6"
        }`}
        style={{ scrollSnapType: isMobile ? "x mandatory" : "none" }}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between"
          style={{ minWidth: isMobile ? "300px" : "auto", scrollSnapAlign: isMobile ? "start" : "none" }}
        >
          {/* Ajout de l'icône de loupe */}
          <FaSearch className="text-4xl mx-auto mb-4 text-gray-700" />
          <h3 className="text-lg font-bold mb-2">Les questions les plus fréquentes</h3>
          <p className="text-gray-600 mb-4">Rechercher les réponses à vos questions fréquemment posées.</p>
          <a href="/faq" className="text-gold font-bold self-center">
            VOIR LE FAQ >
          </a>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between"
          style={{ minWidth: isMobile ? "300px" : "auto", scrollSnapAlign: isMobile ? "start" : "none" }}
        >
          {/* Ajout de l'icône d'enveloppe */}
          <FiMail className="text-4xl mx-auto mb-4 text-gray-700" />
          <h3 className="text-lg font-bold mb-2">Envoyez-nous un message</h3>
          <p className="text-gray-600 mb-4">
            Notre formulaire de contact est un moyen rapide et facile de nous contacter. Envoyez-nous vos questions et nous vous répondrons dès que possible.
          </p>
          <button
            onClick={scrollToMessageField}
            className="text-gold font-bold self-center"
          >
            CONTACT >
          </button>
        </div>
      </div>

      {/* Formulaire de contact */}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form
        className="w-full max-w-[1350px] px-8 bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-semibold mb-2">
              Nom *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-white"
              placeholder="Votre nom"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-semibold mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-white"
              placeholder="Votre email"
              required
            />
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="message" className="text-gray-700 font-semibold mb-2">
            Pouvez-vous préciser votre demande ? *
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            ref={messageFieldRef} // Référence au champ de message
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold-white h-32"
            placeholder="Expliquez votre demande ici..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-gold text-white py-2 px-6 rounded-md hover:bg-gold-dark transition duration-300 mx-auto block"
        >
          Envoyer ma demande
        </button>
      </form>
    </div>
  );
};

export default Contact;
