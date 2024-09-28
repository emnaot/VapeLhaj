import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import categoryImage from '../assest/banner/categ.gif'; // Importez l'image ici

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(10).fill(null); // Limité à 10 catégories pour le design

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      {/* Conteneur principal avec fond clair et ombre */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {/* Grille responsive avec défilement horizontal sur mobile */}
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 w-24 bg-gray-200 animate-pulse rounded-md shadow-sm flex-shrink-0"
                  key={"categoryLoading" + index}
                >
                  {/* Bloc de chargement stylisé */}
                </div>
              );
            })
          : categoryProduct.slice(0, 10).map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.category}
                  className="cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-md rounded-md flex items-center justify-center border border-gold flex-shrink-0"
                  key={product?.category}
                  style={{
                    backgroundImage: `url(${categoryImage})`, // Utilisez l'importation ici
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '40px', // Hauteur ajustée
                    width: '100%',
                    color: 'black',
                  }}
                >
                  {/* Texte centré avec taille réduite et effet de hover */}
                  <p className="text-center text-xs md:text-base capitalize font-medium hover:text-yellow-500 transition-colors duration-300">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
