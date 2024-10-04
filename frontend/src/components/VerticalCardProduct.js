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
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  // Function to handle adding product to the cart
  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  // Function to fetch product data based on category
  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Update mobile state on window resize
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Functions to scroll the product cards
  const scrollRight = () => {
    const scrollAmount = 4 * 275;
    scrollElement.current.scrollLeft += scrollAmount;
  };

  const scrollLeft = () => {
    const scrollAmount = 4 * 275;
    scrollElement.current.scrollLeft -= scrollAmount;
  };

  return (
    <div
      className="container mx-auto px-4 my-6 relative"
      onMouseEnter={() => setHoveredIndex(null)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <h2 className="text-3xl font-extrabold text-black antialiased tracking-tight py-4">
        {heading}
      </h2>

      {/* Buttons to scroll left and right */}
      <div className="absolute left-0 right-0 flex justify-between top-1/2 transform -translate-y-1/2 z-10">
        <button
          onClick={scrollLeft}
          className="p-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-400"
        >
          <FaAngleLeft className="text-xl" />
        </button>

        <button
          onClick={scrollRight}
          className="p-2 bg-gray-300 rounded-full shadow-lg hover:bg-gray-400"
        >
          <FaAngleRight className="text-xl" />
        </button>
      </div>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[240px] md:min-w-[280px] max-w-[240px] md:max-w-[280px] bg-white rounded-lg"
              >
                <div className="bg-gray-100 h-64 p-4 flex justify-center items-center animate-pulse rounded-lg"></div>
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
                className="w-full min-w-[240px] md:min-w-[280px] max-w-[240px] md:max-w-[280px] bg-white rounded-lg"
              >
                <div
                  className="bg-gray-100 h-64 p-4 flex justify-center items-center relative rounded-lg group"
                  onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                  onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                >
                  {product?.sellingPrice < product?.price && (
                    <span className="absolute top-2 left-2 bg-flio text-gray-700 text-sm font-bold px-2 py-1 rounded">
                      Promo
                    </span>
                  )}
                  <img
                    src={product.productImage[0]}
                    className="object-cover h-72 w-72 mx-auto rounded-lg hover:scale-110 transition-all"
                    alt={product.productName}
                  />
                  {(isMobile || hoveredIndex === index) && (
                    <div className="absolute bottom-2 left-2 opacity-100 transition-opacity duration-200">
                      <IoBagAdd
                        className="text-4xl text-gold hover:text-gold-dark transition-colors cursor-pointer"
                        onClick={(e) => handleAddToCart(e, product?._id)}
                      />
                    </div>
                  )}
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-gray-600">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
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
