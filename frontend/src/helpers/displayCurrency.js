// helpers/displayCurrency.js

const displayTNDCurrency = (num) => {
  const formatter = new Intl.NumberFormat('fr-TN', { // Utilisation de la locale française pour la Tunisie
      style: "currency",
      currency: 'TND',
      minimumFractionDigits: 3 // Utilisez 3 pour les dinars tunisiens
  });

  return formatter.format(num);
}

export default displayTNDCurrency;
