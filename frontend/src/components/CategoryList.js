import React, { useEffect, useState, useCallback } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// Utilisation de React.memo pour éviter les rendus inutiles
const CategoryItem = React.memo(({ product }) => {
  return (
    <Link
      to={`/product-category?category=${product?.category}`}
      className="cursor-pointer flex flex-col items-center"
      key={product?.category}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-gray-200 flex items-center justify-center border-2 border-gold-dark shadow-lg transition-transform transform hover:scale-105">
        <LazyLoadImage
          src={product?.productImage[0]}
          alt={product?.category}
          className="h-full object-cover mix-blend-multiply transition-transform duration-300 hover:scale-110"
          effect="blur" // Utilisation du lazy loading avec effet de flou
        />
      </div>
      <p className="text-center text-sm md:text-base capitalize text-gold-dark mt-2 font-bold hover:text-gold transition duration-300 shadow-md p-1 rounded-md">
        {product?.category}
      </p>
    </Link>
  );
});

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Pour gérer les erreurs

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url, { signal });
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse.data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("Une erreur s'est produite lors du chargement des catégories.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchCategoryProduct(controller.signal);

    return () => controller.abort(); // Nettoyage pour annuler les requêtes en cours
  }, [fetchCategoryProduct]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => (
              <div
                className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-300 animate-pulse border-2 border-gold-dark shadow-md"
                key={"categoryLoading" + index}
              ></div>
            ))
          : categoryProduct.map((product) => (
              <CategoryItem key={product.category} product={product} />
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
