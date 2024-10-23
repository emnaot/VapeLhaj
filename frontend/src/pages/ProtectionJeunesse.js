import React from "react";

const ProtectionJeunesse = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-8" style={{ fontFamily: "Calibri, sans-serif" }}>
      {/* Main Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Protection de la jeunesse</h1>

      {/* Content Section */}
      <div className="text-justify text-base max-w-4xl mx-auto">
        <p className="mb-6">
          Les produits proposés sur ce site de cigarettes électroniques sont strictement réservés aux personnes âgées de 18 ans et plus.
        </p>

        {/* Vérification de l'âge */}
        <h2 className="text-xl font-bold mb-4">Vérification de l'âge</h2>
        <p className="mb-6">
          En Tunisie, il est obligatoire de vérifier l'âge des utilisateurs. Nous avons mis en place un système simple de contrôle à l'entrée du site et avant la validation de toute commande. Une pièce d'identité peut être demandée pour confirmer votre âge.
        </p>

      

        {/* Santé et sécurité */}
        <h2 className="text-xl font-bold mb-4">Santé et sécurité</h2>
        <p className="mb-6">
          Nos produits contiennent du propylène glycol (PG), de la glycérine végétale (VG), de la nicotine et des arômes. Ces substances sont conformes aux réglementations en vigueur. Nous n'ajoutons aucun ingrédient nocif comme le diacétyle.
        </p>

        {/* Avertissements */}
        <h2 className="text-xl font-bold mb-4">Avertissements</h2>
        <ul className="list-disc mb-6 pl-8">
          <li>La nicotine peut provoquer une dépendance et est dangereuse pour la santé.</li>
          <li>Les e-liquides contiennent du propylène glycol ou de la glycérine végétale avec des arômes. Si vous êtes allergique, ne les utilisez pas.</li>
          <li>Les produits doivent être tenus hors de portée des enfants et des animaux.</li>
          <li>
            Les femmes enceintes, les personnes atteintes de maladies cardiaques ou pulmonaires ne doivent pas utiliser ces produits. En cas de contact avec la peau, rincez immédiatement à l'eau.
          </li>
          <li>L'utilisation de ces produits est à vos risques et périls.</li>
          <li>En cas de malaise ou de doute, consultez un médecin ou un pharmacien sans délai.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProtectionJeunesse;
