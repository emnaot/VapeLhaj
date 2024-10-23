import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory'; 
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const Promotion = () => {
  const [data, setData] = useState([]); // État pour les données des produits
  const [loading, setLoading] = useState(false); // État de chargement
  const [filterCategoryList, setFilterCategoryList] = useState(
    productCategory.map((category) => category.value) // Initialiser avec toutes les catégories sélectionnées
  );
  const navigate = useNavigate();

  // Fonction pour récupérer les produits en promotion depuis l'API
  const fetchProducts = async (selectedCategories = []) => {
    setLoading(true); // Démarrer le chargement
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategories.length > 0 ? selectedCategories : [], // Filtrer par catégorie si sélectionnée
        }),
      });

      const dataResponse = await response.json();
      
      if (response.ok) {
        // Filtrer les produits pour ne conserver que ceux en promotion
        const promoProducts = dataResponse?.data?.filter(product => product.sellingPrice < product.price) || [];
        setData(promoProducts); // Mettre à jour les données avec les produits en promotion
      } else {
        console.error('Erreur API:', dataResponse.message); // Gérer les erreurs de l'API
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error); // Gérer les erreurs
    }
    setLoading(false); // Fin du chargement
  };

  // Récupérer tous les produits en promotion au montage du composant avec toutes les catégories cochées
  useEffect(() => {
    fetchProducts(filterCategoryList); // Charger tous les produits en promotion pour toutes les catégories lors du premier affichage
  }, []);

  // Gérer la sélection des catégories
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    setFilterCategoryList((prev) => {
      if (checked) {
        return [...prev, value]; // Ajouter la catégorie sélectionnée
      } else {
        return prev.filter((category) => category !== value); // Retirer la catégorie non sélectionnée
      }
    });
  };

  // Récupérer les données à chaque changement de filterCategoryList
  useEffect(() => {
    fetchProducts(filterCategoryList); // Récupérer les produits en fonction des catégories sélectionnées
  }, [filterCategoryList]);

  // Gérer le tri des produits par prix
  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    if (value === 'asc') {
      setData((prev) => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === 'dsc') {
      setData((prev) => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white min-h-screen" style={{ fontFamily: 'Calibri, sans-serif', maxWidth: '1428px', paddingLeft: '40px', paddingRight: '40px' }}>
      {/* Vue Desktop */}
      <div className="hidden lg:grid grid-cols-[250px,1fr] gap-12">
        {/* Filtres (Colonne de gauche) */}
        <div className="bg-white p-6 rounded-xl shadow-lg min-h-[calc(100vh-120px)] overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-4 mb-6 border-gray-300">
            Filtrer les produits
          </h3>

          <div className="mb-8">
            <h4 className="text-base font-bold text-gray-600 mb-3">Trier par prix</h4>
            <form className="text-sm space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="sortBy"
                  onChange={handleOnChangeSortBy}
                  value="asc"
                  className="text-gold focus:ring-gold-dark"
                />
                <label className="text-gray-600">Prix - Croissant</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="sortBy"
                  onChange={handleOnChangeSortBy}
                  value="dsc"
                  className="text-gold focus:ring-gold-dark"
                />
                <label className="text-gray-600">Prix - Décroissant</label>
              </div>
            </form>
          </div>

          <div>
            <h4 className="text-base font-bold text-gray-600 mb-3">Catégories</h4>
            <form className="text-sm space-y-3">
              {productCategory.map((categoryName, index) => (
                <div className="flex items-center space-x-3" key={index}>
                  <input
                    type="checkbox"
                    name="category"
                    value={categoryName?.value}
                    checked={filterCategoryList.includes(categoryName?.value)}
                    onChange={handleCategoryChange}
                    className="text-blue-500 focus:ring-blue-400"
                  />
                  <label htmlFor={categoryName?.value} className="text-gray-600">{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Produits (Colonne de droite) */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="font-semibold text-gray-800 text-lg mb-6">Résultats de recherche : {data.length}</p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-auto max-h-[calc(100vh-120px)] space-y-6">
            {loading ? (
              <p>Chargement...</p>
            ) : data.length !== 0 ? (
              <VerticalCard data={data} />
            ) : (
              <p>Aucun produit en promotion.</p>
            )}
          </div>
        </div>
      </div>

      {/* Vue Mobile */}
      <div className="block lg:hidden px-4">
        <div className="bg-white p-2 mb-4">
          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Trier par
          </h3>
          <form className="text-sm flex flex-col gap-2 py-2">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                onChange={handleOnChangeSortBy}
                value="asc"
              />
              <label>Prix - Croissant</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                onChange={handleOnChangeSortBy}
                value="dsc"
              />
              <label>Prix - Décroissant</label>
            </div>
          </form>

          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Catégories
          </h3>
          <form className="text-sm flex flex-col gap-2 py-2">
            {productCategory.map((categoryName, index) => (
              <div className="flex items-center gap-3" key={index}>
                <input
                  type="checkbox"
                  name="category"
                  value={categoryName?.value}
                  checked={filterCategoryList.includes(categoryName?.value)}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
              </div>
            ))}
          </form>
        </div>

        <div>
          <p className="font-medium text-slate-800 text-lg my-2">Résultats de recherche : {data.length}</p>
          <div className="min-h-[calc(100vh-120px)]">
            {loading ? (
              <p>Chargement...</p>
            ) : data.length !== 0 ? (
              <VerticalCard data={data} />
            ) : (
              <p>Aucun produit en promotion.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
