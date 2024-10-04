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
  const [showButtons, setShowButtons] = useState(false); // État pour contrôler la visibilité des boutons
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
  }, []);

  const scrollRight = () => {
    const scrollAmount = 4 * 275; // Ajustez si nécessaire
    scrollElement.current.scrollLeft += scrollAmount;
  };

  const scrollLeft = () => {
    const scrollAmount = 4 * 275; // Ajustez si nécessaire
    scrollElement.current.scrollLeft -= scrollAmount;
  };

  return (
    <div
      className="container mx-auto px-4 my-6 relative"
      onMouseEnter={() => setShowButtons(true)} // Afficher les boutons au survol
      onMouseLeave={() => setShowButtons(false)} // Cacher les boutons en dehors
    >
      <h2 className="text-3xl font-extrabold text-black antialiased tracking-tight py-4">
        {heading}
      </h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        {showButtons && ( // Affiche les boutons uniquement si showButtons est vrai
          <>
            <button
              className="bg-white rounded-full p-2 absolute left-0 text-lg hidden md:block shadow-md hover:shadow-lg"
              onClick={scrollLeft}
              style={{ zIndex: 10, top: "40%" }} // Positionne le bouton plus haut
            >
              <FaAngleLeft className="text-black text-2xl" />
            </button>
            <button
              className="bg-white rounded-full p-2 absolute right-0 text-lg hidden md:block shadow-md hover:shadow-lg"
              onClick={scrollRight}
              style={{ zIndex: 10, top: "40%" }} // Positionne le bouton plus haut
            >
              <FaAngleRight className="text-black text-2xl" />
            </button>
          </>
        )}

        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg"
              >
                <div className="bg-gray-100 h-64 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse rounded-lg"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-gray-200"></h2>
                  <p className="capitalize text-gray-600 p-1 animate-pulse rounded-full bg-gray-200 py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-gray-600 font-medium p-1 animate-pulse rounded-full bg-gray-200 w-full py-2"></p>
                    <p className="text-gray-500 line-through p-1 animate-pulse rounded-full bg-gray-200 w-full py-2"></p>
                  </div>
                  <button className="text-sm text-white px-3 rounded-full bg-gray-200 py-2 animate-pulse"></button>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                key={index}
                to={"product/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg"
              >
                <div className="bg-gray-100 h-64 p-4 flex justify-center items-center relative rounded-lg group">
                  <img
                    src={product.productImage[0]}
                    className="object-cover h-56 w-56 mx-auto rounded-lg hover:scale-110 transition-all"
                    alt={product.productName}
                  />
                  <div className="absolute bottom-0 left-0 m-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <IoBagAdd
                      className="text-3xl text-gold hover:text-gold-dark transition-colors cursor-pointer"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    />
                  </div>
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-gray-600">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    {/* Affichage des prix selon la condition */}
                    {product?.sellingPrice === product?.price ? (
                      <p className="font-bold text-lg text-purple">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                    ) : (
                      <>
                        <p className="font-bold text-lg text-purple">
                          {displayINRCurrency(product?.sellingPrice)}
                        </p>
                        <p className="text-gray-500 line-through">
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
