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
        <h1 className="text-3xl font-bold text-center mb-6">Besoin d'Aide ?</h1>
        <p className="text-center text-gray-600 mb-8">
          Vous avez des questions sur notre site ou nos services ? Nous sommes
          là pour vous répondre ! Voici une sélection des questions fréquentes.
        </p>

        {/* White container for all FAQ sections */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          {/* Section Utilisation du site */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold flex items-center mb-4">
              <FaUser className="mr-2" /> UTILISATION DU SITE
            </h2>
            <ul className="mt-4">
              {/* Question: Comment créer un compte client ? */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(0)}
                >
                  <span className="font-semibold">
                    Comment puis-je ouvrir un compte client ?
                  </span>
                  <span>{activeIndex === 0 ? "-" : "+"}</span>
                </div>
                {activeIndex === 0 && (
                  <p className="mt-2 text-gray-600">
                    La création d'un compte est facile. Cliquez sur l'icône
                    profil en haut à droite de la page d’accueil et suivez les
                    étapes. Vous pouvez aussi le faire avant de finaliser votre
                    première commande.
                  </p>
                )}
              </li>

              {/* Question: Que faire en cas de perte de mot de passe ? */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(1)}
                >
                  <span className="font-semibold">
                    J'ai perdu mon mot de passe, comment le réinitialiser ?
                  </span>
                  <span>{activeIndex === 1 ? "-" : "+"}</span>
                </div>
                {activeIndex === 1 && (
                  <p className="mt-2 text-gray-600">
                    Cliquez sur "Mon compte" puis sur "Mot de passe oublié".
                    Suivez les instructions pour recevoir un lien de
                    réinitialisation par email.
                  </p>
                )}
              </li>

              {/* Question: Comment contacter le service client ? */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(2)}
                >
                  <span className="font-semibold">
                    Comment puis-je joindre le service client ?
                  </span>
                  <span>{activeIndex === 2 ? "-" : "+"}</span>
                </div>
                {activeIndex === 2 && (
                  <p className="mt-2 text-gray-600">
                    Notre service client est à votre disposition du lundi au
                    vendredi, de 8h à 17h. Vous pouvez les contacter via notre{" "}
                    <a href="#" className="text-blue-500 underline">
                      formulaire de contact
                    </a>{" "}
                    ou directement via le chat en ligne.
                  </p>
                )}
              </li>

              {/* Question: Où trouver les promotions ? */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(3)}
                >
                  <span className="font-semibold">
                    Où puis-je voir les promotions et nouveautés ?
                  </span>
                  <span>{activeIndex === 3 ? "-" : "+"}</span>
                </div>
                {activeIndex === 3 && (
                  <p className="mt-2 text-gray-600">
                    Consultez la section "Promotions" de notre site pour
                    découvrir les offres actuelles. Vous pouvez également suivre
                    nos réseaux sociaux pour ne rien manquer.
                  </p>
                )}
              </li>

              {/* Ajoutez d'autres questions ici avec leurs réponses */}
            </ul>
          </div>

          {/* Section Commande */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold flex items-center mb-4">
              <FaShoppingCart className="mr-2" /> COMMANDE
            </h2>
            <ul className="mt-4">
              {/* Question: Puis-je modifier ma commande après validation ? */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(7)}
                >
                  <span className="font-semibold">
                    Puis-je modifier ma commande après validation ?
                  </span>
                  <span>{activeIndex === 7 ? "-" : "+"}</span>
                </div>
                {activeIndex === 7 && (
                  <p className="mt-2 text-gray-600">
                    Non, une fois votre commande validée, elle ne peut plus être
                    modifiée. Vous pouvez toutefois l’annuler si elle n’a pas
                    encore été expédiée, puis en passer une nouvelle.
                  </p>
                )}
              </li>

              {/* Question: Comment annuler une commande ? */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(8)}
                >
                  <span className="font-semibold">
                    Comment puis-je annuler ma commande ?
                  </span>
                  <span>{activeIndex === 8 ? "-" : "+"}</span>
                </div>
                {activeIndex === 8 && (
                  <p className="mt-2 text-gray-600">
                    Tant que votre commande n’a pas été expédiée, vous pouvez la
                    faire annuler en contactant notre service client.
                  </p>
                )}
              </li>
            </ul>
          </div>

          {/* Section Livraison */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold flex items-center mb-4">
              <FaTruck className="mr-2" /> LIVRAISON
            </h2>
            <ul className="mt-4">
              {/* Question: Dans quels pays livrez-vous ? */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(14)}
                >
                  <span className="font-semibold">
                    Quels sont les pays où vous livrez ?
                  </span>
                  <span>{activeIndex === 14 ? "-" : "+"}</span>
                </div>
                {activeIndex === 14 && (
                  <p className="mt-2 text-gray-600">
                    Actuellement, nous livrons exclusivement en Tunisie. Si vous
                    avez des questions, contactez notre support pour plus
                    d’informations.
                  </p>
                )}
              </li>

              {/* Question: Délai et jours de livraison */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(15)}
                >
                  <span className="font-semibold">
                    Quels sont les délais et jours de livraison ?
                  </span>
                  <span>{activeIndex === 15 ? "-" : "+"}</span>
                </div>
                {activeIndex === 15 && (
                  <p className="mt-2 text-gray-600">
                    La livraison prend entre 3 et 7 jours ouvrés. Les jours de
                    livraison ne peuvent pas être modifiés après validation de
                    la commande.
                  </p>
                )}
              </li>

              {/* Question: Commande pas encore remise au transporteur */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(16)}
                >
                  <span className="font-semibold">
                    Pourquoi ma commande n'a-t-elle pas encore été remise au
                    transporteur ?
                  </span>
                  <span>{activeIndex === 16 ? "-" : "+"}</span>
                </div>
                {activeIndex === 16 && (
                  <p className="mt-2 text-gray-600">
                    Des retards peuvent survenir en raison de la disponibilité
                    des articles ou d’une forte demande. Soyez assuré que votre
                    commande est en traitement.
                  </p>
                )}
              </li>

              {/* Question: Pourquoi le suivi n'est pas disponible ? */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(17)}
                >
                  <span className="font-semibold">
                    Pourquoi je ne peux pas suivre ma commande ?
                  </span>
                  <span>{activeIndex === 17 ? "-" : "+"}</span>
                </div>
                {activeIndex === 17 && (
                  <p className="mt-2 text-gray-600">
                    Il peut y avoir un délai entre l’expédition et l’activation
                    du suivi. Si le suivi reste indisponible, n’hésitez pas à
                    nous contacter.
                  </p>
                )}
              </li>

              {/* Question: Contact avec le livreur */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(18)}
                >
                  <span className="font-semibold">
                    Le livreur peut-il me contacter avant de venir ?
                  </span>
                  <span>{activeIndex === 18 ? "-" : "+"}</span>
                </div>
                {activeIndex === 18 && (
                  <p className="mt-2 text-gray-600">
                    Le livreur peut essayer de vous joindre avant son passage,
                    mais cela dépend des politiques du transporteur.
                  </p>
                )}
              </li>

              {/* Question: Option de livraison si souvent absent */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(19)}
                >
                  <span className="font-semibold">
                    Puis-je choisir une autre option de livraison si je suis
                    absent ?
                  </span>
                  <span>{activeIndex === 19 ? "-" : "+"}</span>
                </div>
                {activeIndex === 19 && (
                  <p className="mt-2 text-gray-600">
                    Vous pouvez choisir la livraison à une autre adresse ou dans
                    un point relais lors de votre commande si vous pensez ne pas
                    être disponible.
                  </p>
                )}
              </li>

              {/* Question: Que se passe-t-il si je suis absent à la livraison ? */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(20)}
                >
                  <span className="font-semibold">
                    Que se passe-t-il si je suis absent au moment de la
                    livraison ?
                  </span>
                  <span>{activeIndex === 20 ? "-" : "+"}</span>
                </div>
                {activeIndex === 20 && (
                  <p className="mt-2 text-gray-600">
                    Le livreur laissera un avis de passage. Vous pourrez alors
                    reprogrammer la livraison ou récupérer votre colis dans un
                    point relais.
                  </p>
                )}
              </li>
            </ul>
          </div>

          {/* Section Service Après-Vente */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold flex items-center mb-4">
              <FaTools className="mr-2" /> SERVICE APRÈS-VENTE
            </h2>
            <ul className="mt-4">
              {/* Question: Que faire en cas de produit défectueux ? */}
              <li className="border-b py-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleAccordion(21)}
                >
                  <span className="font-semibold">
                    Mon produit est défectueux, que faire ?
                  </span>
                  <span>{activeIndex === 21 ? "-" : "+"}</span>
                </div>
                {activeIndex === 21 && (
                  <p className="mt-2 text-gray-600">
                    Si vous avez reçu un produit endommagé ou défectueux,
                    contactez notre service après-vente pour organiser un
                    remplacement ou un remboursement.
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
