import React from "react";

const Livraison = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-8" style={{ fontFamily: "Calibri, sans-serif" }}>
      {/* Main Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Livraison</h1>

      {/* Content Section */}
      <div className="text-justify text-base max-w-4xl mx-auto">
        <p className="mb-6">
          Les livraisons se font exclusivement en Tunisie, couvrant toutes les régions sans exception :
        </p>

        <ul className="list-none mb-6">
          <li><strong>Région 1 :</strong> Tunis, Ariana, Ben Arous, Manouba</li>
          <li><strong>Région 2 :</strong> Sfax, Sousse, Monastir, Mahdia</li>
          <li><strong>Région 3 :</strong> Bizerte, Beja, Jendouba, Le Kef</li>
          <li><strong>Région 4 :</strong> Kairouan, Kasserine, Sidi Bouzid</li>
          <li><strong>Région 5 :</strong> Gabes, Médenine, Tataouine</li>
          <li><strong>Région 6 :</strong> Gafsa, Tozeur, Kebili</li>
        </ul>

        <p className="mb-6">
          Pour la livraison de sa commande, le Client doit choisir une modalité de livraison parmi celles proposées par Vape Lhaj :
        </p>

        <ol className="list-decimal mb-6 mx-auto" style={{ marginLeft: "0", paddingLeft: "1.5rem" }}>
          <li>Livraison à l'adresse de livraison renseignée par le Client lors de sa commande sur le Site.</li>
          <li>Livraison au point relais sélectionné par le Client lors de sa commande sur le Site parmi ceux proposés.</li>
        </ol>

        {/* Subsection: Livraison à l'adresse */}
        <h2 className="text-xl font-bold mb-4">1. Livraison à l'adresse renseignée par le Client</h2>
        <p className="mb-6">
          Si le Client sélectionne cette modalité de livraison, les produits seront livrés à l'adresse précisée lors de sa commande.
        </p>
        <p className="mb-6">
          Vape Lhaj ne saurait être tenu responsable en cas de retard ou de non-livraison dû à une adresse incorrecte. La livraison est réputée effectuée à la remise des produits au transporteur.
        </p>

        {/* Subsection: Livraison en point relais */}
        <h2 className="text-xl font-bold mb-4">2. Livraison en point relais</h2>
        <p className="mb-6">
          Les produits commandés seront livrés au point relais choisi par le Client lors de la commande. Une notification sera envoyée par email.
        </p>

        {/* Delivery Time Section */}
        <h2 className="text-2xl font-bold mb-4">Délais de livraison</h2>
        <p className="mb-6">
          Les délais de livraison varient selon la disponibilité des produits. En général, la livraison prend entre 3 à 7 jours ouvrés.
        </p>
        <p className="mb-6">
          Si un retard est prévu, Vape Lhaj informera le Client par email dans les meilleurs délais. Si la livraison dépasse 30 jours, le Client peut demander l'annulation du contrat.
        </p>

        {/* Reception Section */}
        <h2 className="text-2xl font-bold mb-4">Réception</h2>
        <p className="mb-6">
          Lors de la réception des produits, le Client doit vérifier l'état de l'emballage et des produits. Toute réclamation concernant l'état des produits doit être faite dans un délai de 10 jours après réception.
        </p>
        <p className="mb-6">
          En cas de produit endommagé, le Client doit envoyer une lettre de réserve au transporteur et à Vape Lhaj, accompagnée de photos des dommages constatés.
        </p>
      </div>
    </div>
  );
};

export default Livraison;
