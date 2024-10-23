import React from "react";

const MentionsLegales = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-8" style={{ fontFamily: "Calibri, sans-serif" }}>
      {/* Main Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Mentions légales</h1>

      {/* Content Section */}
      <div className="text-justify text-base max-w-4xl mx-auto">
        <p className="mb-6">
          Conformément à la loi n°2004-575 du 21 juin 2004 de la LCEN (Loi pour la Confiance dans l’Économie Numérique).
        </p>

        {/* Legal Information */}
        <h2 className="text-xl font-bold mb-4">Informations légales</h2>
        <p className="mb-6">
          <strong>Site internet :</strong> www.vapelhaj.com <br />
          <strong>Développeur :</strong> Emna Othmen <br />
          <strong>Email :</strong> emna.othmen@gmail.com <br />
  
          <strong>Hébergement / Réalisation :</strong> Emna Othmen
        </p>

        {/* Responsabilité */}
        <h2 className="text-xl font-bold mb-4">Responsabilité</h2>
        <p className="mb-6">
        Le propriétaire du site web assure la responsabilité des informations fournies et assure au mieux la mise à jour et l'exactitude de celles-ci. Il se réserve le droit de modifier le contenu à tout moment et sans préavis.

Toutes les marques citées dans ce site (y compris les fabricants des produits vendus sur le site) appartiennent à leurs firmes respectives. Tous les produits, logos et images cités dans ce site appartiennent à leur marque respective.        </p>

        {/* Données personnelles */}
        <h2 className="text-xl font-bold mb-4">Traitement des données personnelles</h2>
        <p className="mb-6">
          Les données collectées sur le site lors d'une commande ou d'un enregistrement sont strictement confidentielles et ne seront jamais partagées avec des tiers.
        </p>

        {/* Liens Hypertexte */}
        <h2 className="text-xl font-bold mb-4">Liens Hypertexte</h2>
        <p className="mb-6">
          Les liens vers des sites extérieurs n'engagent pas ma responsabilité quant au contenu de ces derniers. L'insertion d'un lien vers www.vapelhaj.com est libre et ne nécessite pas d'autorisation préalable.
        </p>

        {/* Important Information */}
        <h2 className="text-xl font-bold mb-4">Informations importantes</h2>
        <h3 className="font-bold mb-2">
          La vente de cigarette électronique et de e-liquide est interdite aux mineurs.
        </h3>
        <p className="mb-6">
          Vapoter n'est pas sans danger pour la santé. Les produits de vape sont déconseillés aux femmes enceintes, aux personnes atteintes de maladies cardiovasculaires ou épileptiques, et à toute personne sensible à la nicotine. Ils ne sont pas un moyen de sevrage tabagique.
        </p>

        <p className="mb-6">
          Les composants de cigarette électronique, tels que les coils, fils résistifs, atomiseurs, mods, et e-cigarettes nécessitant une manipulation technique, sont destinés à des utilisateurs avertis et doivent être utilisés avec une bonne connaissance des montages et des résistances.
        </p>

        <p className="mb-6">
          Je décline toute responsabilité en cas de dommages matériels ou accidents dus à une mauvaise utilisation de ces produits. Une manipulation incorrecte peut entraîner des risques graves.
        </p>
      </div>
    </div>
  );
};

export default MentionsLegales;
