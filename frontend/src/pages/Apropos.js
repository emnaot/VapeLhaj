import React from "react";

const APropos = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-8" style={{ fontFamily: "Calibri, sans-serif" }}>
      {/* Main Title */}
      <h1 className="text-3xl font-bold text-center mb-8">À propos</h1>

      {/* Content Section */}
      <div className="text-justify text-base max-w-4xl mx-auto">
        <p className="mb-6 font-bold">
          Vape Lhaj est le numéro 1 des sites en ligne dédiés aux cigarettes électroniques et aux accessoires de vapotage en Tunisie. Nous vous proposons une large sélection de produits de marques reconnues dans l'industrie de la vape, comme VOOPOO, FRIOBAR, VOZOL, FUEL WOTOFO, et bien d'autres encore.
        </p>

        <p className="mb-6">
        Notre objectif est de vous offrir des produits et services de haute qualité, avec une livraison rapide et un service client irréprochable. Nous offrons des prix compétitifs pour répondre à tous les besoins et budgets des utilisateurs de cigarettes électroniques.
        </p>

        <p className="mb-6">
          Nous nous efforçons de vous proposer des produits et des services de qualité, avec une livraison rapide, gratuite sans minimum d'achat, et un excellent service client. Nous pratiquons des prix compétitifs pour satisfaire tous les besoins et budgets des vapoteurs.
        </p>


        <p className="mb-6">
        En somme, Vape Lhaj est un site de confiance en Tunisie, proposant une large gamme de produits de qualité, des services rapides et efficaces, ainsi que des ressources informatives précieuses pour les passionnés de vape.
        </p>
      </div>
    </div>
  );
};

export default APropos;
