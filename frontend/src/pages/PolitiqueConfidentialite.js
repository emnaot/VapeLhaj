import React from "react";

const PolitiqueConfidentialite = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-8" style={{ fontFamily: "Calibri, sans-serif" }}>
      {/* Main Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Politique de Confidentialité</h1>

      {/* Content Section */}
      <div className="text-justify text-base max-w-4xl mx-auto">
        <p className="mb-6">
          Vape Lhaj s'engage à protéger les données personnelles des utilisateurs dans le cadre de ses activités, conformément à la loi tunisienne n° 2004-63 du 27 juillet 2004, relative à la protection des données personnelles.
        </p>

        <p className="mb-6">
          Cette politique de confidentialité a pour objectif d'informer nos clients sur les modalités de collecte, de traitement et de protection des données à caractère personnel conformément à la réglementation applicable en Tunisie.
        </p>

        {/* Article 1 */}
        <h2 className="text-xl font-bold mb-4">Article 1 - Responsable du traitement des données</h2>
        <p className="mb-6">
          Les données personnelles fournies par les utilisateurs sont traitées par <strong>Vape Lhaj</strong>, situé à Tunis, Tunisie. Vous pouvez nous contacter à l'adresse suivante : <strong>contact@vapelhaj.com</strong>.
        </p>

        {/* Article 2 */}
        <h2 className="text-xl font-bold mb-4">Article 2 - Destinataires des données</h2>
        <p className="mb-6">
          Dans le cadre de la gestion des commandes et des services associés, vos données personnelles peuvent être transmises à des tiers tels que des services de livraison, des institutions financières et des conseillers légaux en Tunisie, pour des raisons légales ou contractuelles.
        </p>

        {/* Article 3 */}
        <h2 className="text-xl font-bold mb-4">Article 3 - Finalité du traitement</h2>
        <p className="mb-6">
          Les données sont traitées dans le cadre de la gestion des relations commerciales, du traitement des commandes, du service après-vente, et de la promotion commerciale. Cela inclut la communication avec le client, l'envoi de newsletters et d'informations sur les offres spéciales.
        </p>

        {/* Article 4 */}
        <h2 className="text-xl font-bold mb-4">Article 4 - Obligations légales</h2>
        <p className="mb-6">
          Vape Lhaj respecte les obligations légales liées au traitement des données personnelles conformément aux lois tunisiennes. Les données peuvent être conservées pour répondre à des obligations légales, comme les obligations comptables, ou pour des besoins commerciaux légitimes, tels que la prévention de la fraude.
        </p>

        {/* Article 5 */}
        <h2 className="text-xl font-bold mb-4">Article 5 - Sécurité des données</h2>
        <p className="mb-6">
          Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour assurer la sécurité de vos données personnelles, notamment en protégeant ces dernières contre la perte, l'accès non autorisé ou encore l'altération. Nous utilisons des systèmes de chiffrement pour garantir la confidentialité des informations.
        </p>

        {/* Article 6 */}
        <h2 className="text-xl font-bold mb-4">Article 6 - Conservation des données</h2>
        <p className="mb-6">
          Les données personnelles sont conservées uniquement le temps nécessaire aux finalités pour lesquelles elles ont été collectées, conformément à la réglementation en vigueur en Tunisie. Sur demande, les données peuvent être supprimées, sauf obligation légale contraire.
        </p>

        {/* Article 7 */}
        <h2 className="text-xl font-bold mb-4">Article 7 - Droits des utilisateurs</h2>
        <p className="mb-6">
          Conformément à la loi tunisienne sur la protection des données personnelles, vous avez le droit d'accéder, de rectifier ou de supprimer vos données personnelles. Vous pouvez également vous opposer à leur traitement ou demander leur portabilité. Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : <strong>
          vapelhaj@gmail.com</strong>.
        </p>

        {/* Article 8 */}
        <h2 className="text-xl font-bold mb-4">Article 8 - Révocation du consentement</h2>
        <p className="mb-6">
          Vous pouvez révoquer votre consentement au traitement de vos données à tout moment, sans que cela n'affecte la légalité des traitements effectués avant cette révocation. Toute modification de cette politique de confidentialité sera notifiée sur notre site.
        </p>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;
