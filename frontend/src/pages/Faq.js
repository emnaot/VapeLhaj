import React, { useState } from "react";
import { FaUser, FaShoppingCart, FaTruck, FaTools } from "react-icons/fa"; // Icons for each category

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div
        className="w-full max-w-4xl mx-auto px-4 py-8"
        style={{ fontFamily: "Calibri, sans-serif" }}
      >
        {/* Title and introductory paragraph */}
        <h1 className="text-3xl font-bold text-center mb-6">
        Besoin d'Aide ?
        </h1>
        <p className="text-center text-gray-600 mb-8">
          L'équipe VAPEVO est prête à éclaircir toutes vos énigmes sur la
          navigation et l'utilisation de notre site. Prenez votre loupe
          virtuelle et partons à la chasse aux réponses !
        </p>

        {/* White container for all FAQ sections */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          {/* Section Utilisation du site */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold flex items-center mb-4">
              <FaUser className="mr-2" /> UTILISATION DU SITE
            </h2>
            <ul className="mt-4">
              {[
                "Comment créer un compte client ?",
                "Comment faire si j'ai perdu mon mot de passe ?",
                "Comment puis-je contacter le service client ?",
                "Comment changer de langue ?",
                "Où puis-je trouver des informations sur les promotions et les nouveautés ?",
                "Avez-vous un programme de fidélité ?",
                "Comment supprimer mon compte ?",
              ].map((question, index) => (
                <li key={index} className="border-b py-4">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="font-semibold">{question}</span>
                    <span>{activeIndex === index ? "-" : "+"}</span>
                  </div>
                  {activeIndex === index && (
                    <p className="mt-2 text-gray-600">
                      Réponse à la question : Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit.
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Section Commande */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold flex items-center mb-4">
              <FaShoppingCart className="mr-2" /> COMMANDE
            </h2>
            <ul className="mt-4">
              {[
                "Offrez-vous des réductions pour les nouveaux clients ?",
                "Offrez-vous des remises pour les commandes en gros ?",
                "Comment fonctionnent les prix dégressifs ?",
                "Puis-je modifier ma commande une fois qu'elle a été passée ?",
                "Est-il possible d'annuler ma commande ?",
                "Ma commande est remboursée. Dans combien de temps vais-je recevoir l'argent ?",
              ].map((question, index) => (
                <li key={index} className="border-b py-4">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleAccordion(index + 7)}
                  >
                    <span className="font-semibold">{question}</span>
                    <span>{activeIndex === index + 7 ? "-" : "+"}</span>
                  </div>
                  {activeIndex === index + 7 && (
                    <p className="mt-2 text-gray-600">
                      Réponse à la question : Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit.
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Section Livraison */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold flex items-center mb-4">
              <FaTruck className="mr-2" /> LIVRAISON
            </h2>
            <ul className="mt-4">
              {[
                "Dans quels pays livrez-vous ?",
                "Quels sont les délais et les jours de livraison habituels ?",
                "À partir de quel montant d'achat puis-je profiter de la livraison gratuite ?",
                "Ma commande n'est pas encore remise au transporteur. Pourquoi ?",
                "Pourquoi le suivi de ma commande n'est pas toujours disponible ?",
                "Contacter le transporteur GLS",
              ].map((question, index) => (
                <li key={index} className="border-b py-4">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleAccordion(index + 14)}
                  >
                    <span className="font-semibold">{question}</span>
                    <span>{activeIndex === index + 14 ? "-" : "+"}</span>
                  </div>
                  {activeIndex === index + 14 && (
                    <p className="mt-2 text-gray-600">
                      Réponse à la question : Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit.
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Section Service Après-Vente */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold flex items-center mb-4">
              <FaTools className="mr-2" /> SERVICE APRÈS-VENTE
            </h2>
            <ul className="mt-4">
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(21)}
                >
                  <span className="font-semibold">
                    Mon produit est défectueux/ne fonctionne pas correctement.
                    Quelles démarches pour retourner le produit ?
                  </span>
                  <span>{activeIndex === 21 ? "-" : "+"}</span>
                </div>
                {activeIndex === 21 && (
                  <p className="mt-2 text-gray-600">
                    Réponse à la question : Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit.
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
