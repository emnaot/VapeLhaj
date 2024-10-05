import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoBagAdd } from "react-icons/io5";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollRight = () => {
    const scrollAmount = 4 * 275;
    scrollElement.current.scrollLeft += scrollAmount;
  };

  const scrollLeft = () => {
    const scrollAmount = 4 * 275;
    scrollElement.current.scrollLeft -= scrollAmount;
  };

  // Fonction pour générer un nombre d'évaluations fixe
  const fixedRatingCount = 25; // Nombre d'évaluations fixe

  // Fonction pour obtenir la couleur des étoiles en fonction du nombre d'évaluations
  const getStarColor = (index) => {
    if (fixedRatingCount >= 40) return "text-yellow-500"; // Jaune pour 40+ évaluations
    if (fixedRatingCount >= 20) return "text-orange-500"; // Orange pour 20-39 évaluations
    return "text-red-500"; // Rouge pour moins de 20 évaluations
  };

  return (
    <div
      className="container mx-auto px-4 my-6 relative"
      onMouseEnter={() => setShowScrollButtons(true)}
      onMouseLeave={() => setShowScrollButtons(false)}
      style={{ fontFamily: "inherit" }} // Garder la police par défaut pour le conteneur
    >
      <h2
        className="text-4xl font-extrabold text-black antialiased tracking-tight py-9"
        style={{ fontFamily: "Consolas", textAlign: "center" }} // Application des styles demandés
      >
        {heading}
      </h2>

      {showScrollButtons && (
        <div className="absolute left-0 right-0 flex justify-between top-[45%] transform -translate-y-1/2 z-10">
          <button
            onClick={scrollLeft}
            className="w-14 h-14 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 flex items-center justify-center"
          >
            <FaAngleLeft className="text-3xl" />
          </button>

          <button
            onClick={scrollRight}
            className="w-14 h-14 p-2 bg-white rounded-full shadow-lg hover:bg-gray-200 flex items-center justify-center"
          >
            <FaAngleRight className="text-3xl" />
          </button>
        </div>
      )}

      <div
        className="flex items-stretch gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[260px] md:min-w-[300px] max-w-[260px] md:max-w-[300px] bg-white rounded-lg flex flex-col"
              >
                <div className="bg-gray-100 h-80 p-4 flex justify-center items-center animate-pulse rounded-lg"></div>
                <div className="p-4 grid gap-3 flex-grow">
                  <h2 className="font-medium text-base md:text-lg text-black p-1 py-2 animate-pulse rounded-full bg-gray-200"></h2>
                  <p className="capitalize text-gray-600 p-1 animate-pulse rounded-full bg-gray-200 py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-gray-600 font-medium p-1 animate-pulse rounded-full bg-gray-200 w-full py-2"></p>
                    <p className="text-gray-500 line-through p-1 animate-pulse rounded-full bg-gray-200 w-full py-2"></p>
                  </div>
                  <button className="text-sm text-white px-4 rounded-full bg-gray-200 py-2 animate-pulse"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                key={index}
                to={"product/" + product?._id}
                className="w-full min-w-[260px] md:min-w-[300px] max-w-[260px] md:max-w-[300px] bg-white rounded-lg flex flex-col"
              >
                <div
                  className="bg-gray-100 h-80 p-4 flex justify-center items-center relative rounded-lg group"
                  onMouseEnter={() => {
                    !isMobile && setHoveredIndex(index);
                  }}
                  onMouseLeave={() => {
                    !isMobile && setHoveredIndex(null);
                  }}
                >
                  {product?.sellingPrice < product?.price && (
                    <span className="absolute top-2 left-2 bg-flio text-gray-700 text-sm font-bold px-2 py-1 rounded">
                      Promo
                    </span>
                  )}
                  <img
                    src={product.productImage[0]}
                    className={`object-cover h-80 w-80 mx-auto rounded-lg transition-transform duration-300 ease-in-out ${
                      hoveredIndex === index ? "scale-110" : ""
                    }`}
                    alt={product.productName}
                  />
                  {(isMobile || hoveredIndex === index) && (
                    <div className="absolute bottom-2 left-2 opacity-100 transition-opacity duration-200">
                      <IoBagAdd
                        className="text-5xl text-gold hover:text-gold-dark transition-colors cursor-pointer"
                        onClick={(e) => handleAddToCart(e, product?._id)}
                      />
                    </div>
                  )}
                </div>
                <div className="p-4 grid gap-3 flex-grow">
                  <h2
                    className="font-medium text-base md:text-lg text-gray-600 text-center min-h-[50px] flex items-center justify-center"
                    style={{ fontFamily: "Calibri" }}
                  >
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-gray-600 text-center">
                    {product?.brandName}
                  </p>
                  {/* Ajout des étoiles d'évaluation et du nombre d'évaluations */}
                  <div className="flex justify-center items-center my-1">
                    {[...Array(5)].map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className={`${getStarColor(starIndex)} text-xl`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-gray-600 ml-2">
                      {fixedRatingCount} évaluations
                    </span>
                  </div>
                  <div className="flex gap-3 justify-center items-end">
                    {product?.sellingPrice === product?.price ? (
                      <p className="font-bold text-lg text-black text-center">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                    ) : (
                      <>
                        <p className="font-bold text-lg text-purple ml-[-9px]">
                          {displayINRCurrency(product?.sellingPrice)}
                        </p>
                        <p className="text-gray-500 line-through text-center">
                          {displayINRCurrency(product?.price)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
