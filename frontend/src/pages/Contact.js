import React, { useState } from "react";
import SummaryApi from "../common";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-bold mb-2">Les questions les plus fréquentes</h3>
          <p className="text-gray-600 mb-4">Rechercher les réponses à vos questions fréquemment posées.</p>
          <a href="/faq" className="text-blue-600 font-semibold">VOIR LE FAQ</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-bold mb-2">Envoyez-nous un message</h3>
          <p className="text-gray-600 mb-4">Notre formulaire de contact est un moyen rapide et facile de nous contacter. Envoyez-nous vos questions et nous vous répondrons dès que possible.</p>
          <a href="/contact" className="text-blue-600 font-semibold">CONTACT</a>
        </div>
      </div>

      {/* Formulaire de contact */}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-semibold mb-2">Nom *</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre nom"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-semibold mb-2">Email *</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Votre email"
              required
            />
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="message" className="text-gray-700 font-semibold mb-2">Pouvez-vous préciser votre demande ? *</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Expliquez votre demande ici..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Envoyer ma demande
        </button>
      </form>
    </div>
  );
};

export default Contact;
