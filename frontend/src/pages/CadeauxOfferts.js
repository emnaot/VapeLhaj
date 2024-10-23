import React from "react";

const CadeauxOfferts = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-8" style={{ fontFamily: "Calibri, sans-serif" }}>
      {/* Main Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Les cadeaux offerts</h1>

      {/* Content Section */}
      <div className="text-justify text-base max-w-4xl mx-auto">
        <p className="mb-6">
          Pour remercier nos clients, Vape Lhaj offre des cadeaux à chaque commande éligible. Selon le montant de votre commande, vous pourrez choisir parmi une sélection d'accessoires utiles ou de produits pour enrichir votre expérience de vapotage. 
        </p>

        <p className="mb-6">
          Une fois que vous avez atteint un certain seuil, un cadeau vous sera proposé automatiquement lors de la validation de votre commande. Profitez de ces petits bonus pour rendre vos achats encore plus agréables !
        </p>

        <p className="mb-6">
          Nous mettons régulièrement à jour notre sélection de cadeaux, donc n'hésitez pas à vérifier lors de vos prochains achats.
        </p>
      </div>
    </div>
  );
};

export default CadeauxOfferts;
