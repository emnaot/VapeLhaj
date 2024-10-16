import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

import image1 from "../assest/banner/Vozol.webp";
import image2 from "../assest/banner/drag.jpg";

const CardImage = ({ imageUrl, title, buttonText, category }) => {
  return (
    <div className="relative w-full h-[250px] md:h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer group">
      {/* Ajout d'une animation hover sur l'image */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-10 flex flex-col justify-center items-center text-center text-white p-4">
        <h2 className="text-lg md:text-2xl font-semibold mb-4">{title}</h2>
        <Link
          to={`/product-category?category=${category}`}
          className="px-4 py-2 rounded-2xl transition-all text-white"
        >
          <span className="hover:underline font-bold">{buttonText}</span>
          &nbsp;
          <span className="text-2xl font-bold">&#8250;</span> {/* Flèche plus grande et en gras */}
        </Link>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const fetchCategoryProduct = async () => {
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mx-auto px-4 md:px-0 max-w-[1350px] py-3">
      {isMobile ? (
        <div className="flex overflow-x-scroll no-scrollbar space-x-4">
          {categoryProduct.length > 0 ? (
            <>
              <div className="min-w-[100%]">
                <CardImage
                  imageUrl={image1}
                  title="Vozol Vista 16000"
                  buttonText="ACHETER"
                  category="puff"
                />
              </div>
              <div className="min-w-[100%]">
                <CardImage
                  imageUrl={image2}
                  title="Pod mod - Drag X"
                  buttonText="ACHETER"
                  category="pod"
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
              <div className="w-full h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryProduct.length > 0 ? (
            <>
              <CardImage
                imageUrl={image1}
                title="Vozol Vista 16000"
                buttonText="ACHETER"
                category="puff"
              />
              <CardImage
                imageUrl={image2}
                title="Pod mod - Drag X"
                buttonText="ACHETER"
                category="pod"
              />
            </>
          ) : (
            <>
              <div className="w-full h-64 md:h-80 bg-gray-200 animate-pulse rounded-2xl"></div>
              <div className="w-full h-64 md:h-80 bg-gray-200 animate-pulse rounded-2xl"></div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
