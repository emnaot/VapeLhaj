import React from "react";

const MentionsLegales = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-8" style={{ fontFamily: "Calibri, sans-serif" }}>
      {/* Main Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Mentions légales</h1>

      {/* Content Section */}
      <div className="text-justify text-base max-w-4xl mx-auto">
      

        {/* Company Info */}
        <h2 className="text-xl font-bold mb-4">Informations légales</h2>
        <p className="mb-6">
          <strong>Site internet :</strong> www.vapelhaj.com <br />
          <strong>Propriétaire :</strong> Vape Lhaj <br />
          <strong>Directeur de la publication :</strong> Vape Lhaj <br />
          <strong>Email :</strong> vapelhaj@gmail.com <br />
          <strong>Téléphone :</strong> 40 700 976 <br />
          <strong>Hébergement / Réalisation :</strong> Vape Lhaj <br />
          <strong>Email de développeur :</strong> youssef.chebil@gmail.com <br />
        </p>

        {/* Responsabilité */}
        <h2 className="text-xl font-bold mb-4">Responsabilité</h2>
        <p className="mb-6">
          Le propriétaire du site web assure la responsabilité des informations fournies et veille à la mise à jour et à l'exactitude de celles-ci. Il se réserve le droit de modifier le contenu à tout moment sans préavis. Toutes les marques citées dans ce site appartiennent à leurs propriétaires respectifs.
        </p>

        {/* Données personnelles */}
        <h2 className="text-xl font-bold mb-4">Traitement des données personnelles</h2>
        <p className="mb-6">
          Les informations provenant de l'enregistrement de l'utilisateur sur le site lors d'une commande seront gardées confidentiellement et ne seront en aucun cas divulguées à un tiers.
        </p>

        {/* Liens Hypertexte */}
        <h2 className="text-xl font-bold mb-4">Liens Hypertexte</h2>
        <p className="mb-6">
          Les liens hypertextes sur ce site vers d'autres sites extérieurs n'engagent pas la responsabilité de la société Vape Lhaj quant au contenu de ces sites. L'établissement d'un lien hypertexte vers notre site est libre et ne demande pas d'autorisation préalable.
        </p>

        {/* Important Information */}
        <h2 className="text-xl font-bold mb-4">Informations importantes</h2>
        <h3 className="font-bold mb-2">
          La vente de cigarette électronique et de e-liquide est interdite aux mineurs.
        </h3>
        <p className="mb-6">
          Vapoter n'est pas sans danger pour la santé. La vente de e-cigarettes et des produits dérivés est interdite aux mineurs. La cigarette électronique est déconseillée aux femmes enceintes ou allaitantes, ainsi qu'aux personnes atteintes de maladies cardiovasculaires, épileptiques, ou sensibles à la nicotine ou aux composants des e-liquides. La e-cigarette n'est pas un médicament ni une méthode de sevrage tabagique.
        </p>

        <p className="mb-6">
          Les coils, fils résistifs, atomiseurs, reconstructibles, clearomiseurs, box, mods et e-cigarettes avec contrôle des ohms sont des produits réservés à un public averti ayant une connaissance approfondie de la loi d'Ohm, des montages de résistances et de l'utilisation des accus.
        </p>

        <p className="mb-6">
          Vape Lhaj décline toute responsabilité en cas de dommages matériels ou accidents dus à une utilisation non conforme de ces produits. Une mauvaise manipulation, un mauvais réglage, ou un mauvais montage peuvent provoquer des accidents graves.
        </p>
      </div>
    </div>
  );
};

export default MentionsLegales;
