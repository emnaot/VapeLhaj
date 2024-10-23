import React from "react";

const Retours = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-8" style={{ fontFamily: "Calibri, sans-serif" }}>
      {/* Main Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Retours</h1>

      {/* Content Section */}
      <div className="text-justify text-base max-w-4xl mx-auto">
        <p className="mb-6">
          Chez Vape Lhaj, la satisfaction de nos clients est notre priorité. Si vous n'êtes pas satisfait de votre commande, nous acceptons les retours sous certaines conditions. Veuillez lire attentivement notre politique de retours ci-dessous.
        </p>

        {/* Conditions de retours */}
        <h2 className="text-xl font-bold mb-4">Conditions de retour</h2>
        <ul className="list-disc mb-6 pl-8">
          <li>Le retour doit être effectué dans un délai de 14 jours à compter de la date de réception de la commande.</li>
          <li>Les produits doivent être retournés dans leur état d'origine, non utilisés, et dans leur emballage d'origine.</li>
          <li>Les frais de retour sont à la charge du client, sauf en cas de produit défectueux ou erreur de notre part.</li>
        </ul>

        {/* Procédure de retour */}
        <h2 className="text-xl font-bold mb-4">Procédure de retour</h2>
        <p className="mb-6">
          Pour initier un retour, veuillez suivre les étapes suivantes :
        </p>
        <ol className="list-decimal mb-6 mx-auto" style={{ maxWidth: "600px", textAlign: "justify" , marginLeft: "0", paddingLeft: "2rem" }}>
          <li>Remplissez le formulaire de retour sur notre <strong><a href="/contact" className="text-gold underline">page de contact</a></strong>.</li>
          <li>Vous pouvez également nous contacter par téléphone au <strong>40 700 976</strong> ou par email à <strong>vapelhaj@gmail.com</strong>.</li>
          <li>Envoyez les produits à l'adresse suivante : <strong>Bembla En-Nour, Tunisia</strong>.</li>
        </ol>

        {/* Remboursement */}
        <h2 className="text-xl font-bold mb-4">Remboursements</h2>
        <p className="mb-6">
          Une fois que nous avons reçu et inspecté les articles retournés, nous procéderons au remboursement selon le mode de paiement initial. Le remboursement sera effectué sous 7 à 10 jours ouvrés après réception des articles.
        </p>

        {/* Échanges */}
        <h2 className="text-xl font-bold mb-4">Échanges</h2>
        <p className="mb-6">
          Si vous souhaitez échanger un produit, veuillez suivre la même procédure que pour un retour, et indiquer dans le formulaire de retour que vous souhaitez procéder à un échange. Les frais d'envoi du nouvel article sont à la charge du client, sauf en cas d'erreur de notre part.
        </p>

        {/* Exceptions */}
        <h2 className="text-xl font-bold mb-4">Exceptions</h2>
        <p className="mb-6">
          Certains articles ne peuvent pas être retournés ou échangés, notamment :
        </p>
        <ul className="list-disc mb-6 pl-8">
          <li>Les produits personnalisés ou sur-mesure</li>
          <li>Les articles en promotion</li>
          <li>Les produits d'hygiène ouverts (e-liquides, pods, etc.)</li>
        </ul>

        {/* Conclusion */}
        <p className="mb-6">
          Pour toute question concernant notre politique de retours, n'hésitez pas à nous contacter via notre <strong><a href="/contact" className="text-gold underline">page de contact</a></strong>, par téléphone au <strong>40 700 976</strong> ou par email à <strong>vapelhaj@gmail.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default Retours;
