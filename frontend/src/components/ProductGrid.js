import React, { useEffect, useState } from "react";
import SummaryApi from "../common"; // Pour charger les catégories
import { Link } from "react-router-dom"; // Pour la redirection

// Composant pour afficher chaque carte avec une image, un titre et un bouton
const CardImage = ({ imageUrl, title, buttonText, category }) => {
  return (
    <div 
      className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      {/* Image */}
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />

      {/* Overlay avec titre et bouton */}
      <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col justify-center items-center text-center text-white p-4">
        <h2 className="text-lg md:text-2xl font-semibold mb-4">{title}</h2>
        <Link 
          to={`/product-category?category=${category}`} // Redirection dynamique vers la catégorie
          className="px-4 py-2 rounded-2xl transition-all text-white border border-white hover:text-gray-300"
        >
          {buttonText} &nbsp; <span>&#8250;</span>
        </Link>
      </div>
    </div>
  );
};

// Composant pour afficher la grille de cartes
const ProductGrid = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fonction pour récupérer les catégories à partir de l'API
  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct(); // Charger les catégories lors du montage du composant
  }, []);

  return (
    <div className="mx-auto px-4 md:px-0 max-w-[1350px] py-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Première carte - Dirige vers la catégorie "puff" */}
        {categoryProduct.length > 0 ? (
          <CardImage 
            imageUrl="https://www.onlinevapeshop.us/cdn/shop/collections/Vozol-Vista-16000.jpg?v=1714852015&width=1500" 
            title="Vozol Vista 16000" 
            buttonText="ACHETER" 
            category="puff" // Redirection vers "puff"
          />
        ) : (
          <div className="w-full h-64 md:h-80 bg-gray-200 animate-pulse rounded-2xl"></div> // Placeholder de chargement
        )}

        {/* Deuxième carte - Dirige vers la catégorie "pods" */}
        {categoryProduct.length > 0 ? (
          <CardImage 
            imageUrl="https://img.over-blog-kiwi.com/0/91/03/66/20200621/ob_062aca_drag-x-de-chez-voopoo.jpg" 
            title="Pod mod - Drag X" 
            buttonText="ACHETER" 
            category="pod" // Redirection vers "pods"
          />
        ) : (
          <div className="w-full h-64 md:h-80 bg-gray-200 animate-pulse rounded-2xl"></div> // Placeholder de chargement
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
