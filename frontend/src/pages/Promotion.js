import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const Promotion = () => {
  const [data, setData] = useState([]); // State pour les données de produits
  const [loading, setLoading] = useState(false); // State pour l'état de chargement
  const [selectedCategory, setSelectedCategory] = useState(null); // Pour gérer la catégorie sélectionnée
  const navigate = useNavigate();

  // Fonction pour récupérer tous les produits depuis l'API
  const fetchProducts = async (category = null) => {
    setLoading(true); // Démarrer le chargement
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          category: category ? [category] : [], // Filtrer par catégorie si nécessaire
        }),
      });

      const dataResponse = await response.json();
      console.log('Réponse complète de l\'API:', dataResponse); // Vérifier la réponse complète de l'API

      if (response.ok) {
        console.log('Produits récupérés:', dataResponse.data); // Vérifier si des produits sont récupérés

        // Filtrer les produits pour ne conserver que ceux en promotion
        const promoProducts = dataResponse?.data?.filter(product => product.sellingPrice < product.price) || [];
        console.log('Produits en promotion :', promoProducts); // Afficher les produits en promotion
        setData(promoProducts); // Mettre à jour les données
      } else {
        console.error('Erreur de l\'API:', dataResponse.message); // Afficher une erreur si la requête échoue
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error); // Capturer les erreurs
    }
    setLoading(false); // Fin du chargement
  };

  // Appel de la fonction fetchProducts au montage du composant
  useEffect(() => {
    fetchProducts(selectedCategory); // Charger les produits dès que la page s'affiche ou lorsque la catégorie change
  }, [selectedCategory]);

  // Fonction pour trier les produits par prix
  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    if (value === 'asc') {
      setData((prev) => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === 'dsc') {
      setData((prev) => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  // Fonction pour gérer la sélection de la catégorie
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Vue Desktop */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* Filtres (colonne de gauche) */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Sort by
          </h3>
          <form className="text-sm flex flex-col gap-2 py-2">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                onChange={handleOnChangeSortBy}
                value="asc"
              />
              <label>Price - Low to High</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                onChange={handleOnChangeSortBy}
                value="dsc"
              />
              <label>Price - High to Low</label>
            </div>
          </form>

          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Category
          </h3>
          <form className="text-sm flex flex-col gap-2 py-2">
            {productCategory.map((categoryName, index) => (
              <div className="flex items-center gap-3" key={index}>
                <input
                  type="checkbox"
                  name="category"
                  value={categoryName?.value}
                  checked={selectedCategory === categoryName.value}
                  onChange={() => handleCategoryChange(categoryName.value)}
                />
                <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
              </div>
            ))}
          </form>
        </div>

        {/* Produits (colonne de droite) */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">Search Results: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {loading ? (
              <p>Loading...</p>
            ) : data.length !== 0 ? (
              <VerticalCard data={data} />
            ) : (
              <p>No products in promotion.</p>
            )}
          </div>
        </div>
      </div>

      {/* Vue Mobile */}
      <div className="block lg:hidden px-4">
        <div className="bg-white p-2 mb-4">
          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Sort by
          </h3>
          <form className="text-sm flex flex-col gap-2 py-2">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                onChange={handleOnChangeSortBy}
                value="asc"
              />
              <label>Price - Low to High</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="sortBy"
                onChange={handleOnChangeSortBy}
                value="dsc"
              />
              <label>Price - High to Low</label>
            </div>
          </form>

          <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
            Category
          </h3>
          <form className="text-sm flex flex-col gap-2 py-2">
            {productCategory.map((categoryName, index) => (
              <div className="flex items-center gap-3" key={index}>
                <input
                  type="checkbox"
                  name="category"
                  value={categoryName?.value}
                  checked={selectedCategory === categoryName.value}
                  onChange={() => handleCategoryChange(categoryName.value)}
                />
                <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
              </div>
            ))}
          </form>
        </div>

        <div>
          <p className="font-medium text-slate-800 text-lg my-2">Search Results: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)]">
            {loading ? (
              <p>Loading...</p>
            ) : data.length !== 0 ? (
              <VerticalCard data={data} />
            ) : (
              <p>No products in promotion.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
