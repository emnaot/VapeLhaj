import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const urlSearch = new URLSearchParams(location.search);
  const categoryFromUrl = urlSearch.get("category");

  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const fetchData = async (selectedCategories) => {
    setLoading(true);
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        category: selectedCategories,
      }),
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (categoryFromUrl) {
      const initialCategory = categoryFromUrl.split(','); // Gérer plusieurs catégories dans l'URL
      setFilterCategoryList(initialCategory);
      fetchData(initialCategory); // Récupérer les produits pour les catégories initiales
    }
  }, [categoryFromUrl]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    setFilterCategoryList((prev) => {
      if (checked) {
        return [...prev, value]; // Ajouter la catégorie si cochée
      } else {
        return prev.filter((category) => category !== value); // Retirer la catégorie si décochée
      }
    });
  };

  useEffect(() => {
    if (filterCategoryList.length > 0) {
      fetchData(filterCategoryList); // Récupérer les produits pour les catégories sélectionnées
    } else {
      setData([]); // Vider les données si aucune catégorie n'est sélectionnée
    }
  }, [filterCategoryList]);

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
        {/* Filtres (colonne de gauche) */}
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
                    className="text-gold focus:ring-gold-white"
                  />
                  <label htmlFor={categoryName?.value} className="text-gray-600">{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Produits (colonne de droite) */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="font-semibold text-gray-800 text-lg mb-6">Résultats: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-auto max-h-[calc(100vh-120px)] space-y-6">
            {data.length !== 0 && !loading && <VerticalCard data={data} />}
          </div>
        </div>
      </div>

      {/* Vue Mobile - Retourné à l'état initial */}
      <div className="block lg:hidden px-4">
        {/* Filtres au-dessus des produits pour mobile */}
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

        {/* Produits affichés sous les filtres pour mobile */}
        <div>
          <p className="font-medium text-slate-800 text-lg my-2">Résultats: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)]">
            {data.length !== 0 && !loading && <VerticalCard data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
