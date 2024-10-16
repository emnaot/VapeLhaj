import React, { useContext } from 'react';
import scrollTop from '../helpers/scrollTop';
import displayINRCurrency from '../helpers/displayCurrency';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import { IoBagAdd } from "react-icons/io5"; // Ajout de l'icône

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
      {loading
        ? loadingList.map((_, index) => (
            <div
              key={index}
              className="w-full min-w-[260px] md:min-w-[280px] max-w-[260px] md:max-w-[280px] bg-white rounded-2xl flex flex-col"
            >
              <div className="bg-gray-100 h-64 p-4 flex justify-center items-center animate-pulse rounded-2xl"></div>
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
              to={`/product/${product?._id}`}
              className="w-full min-w-[260px] md:min-w-[280px] max-w-[260px] md:max-w-[280px] bg-white rounded-2xl flex flex-col"
              onClick={scrollTop}
            >
              <div
                className="bg-gray-100 h-64 p-4 flex justify-center items-center relative rounded-2xl group"
              >
                {product?.sellingPrice < product?.price && (
                  <span className="absolute top-2 left-2 bg-flio font-semibold text-gray-700 text-sm px-2 py-1 rounded">
                    Promo
                  </span>
                )}
                <img
                  src={product?.productImage[0]}
                  className={`object-cover h-64 w-64 mx-auto rounded-2xl transition-transform duration-300 ease-in-out group-hover:scale-110`}
                  alt={product?.productName}
                />
                <div className="absolute bottom-2 left-2 opacity-100 transition-opacity duration-200">
                  <IoBagAdd
                    className="text-5xl text-gold hover:text-gold-dark transition-colors cursor-pointer"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  />
                </div>
              </div>
              <div className="p-0 grid gap-0 flex-grow">
                <h2
                  className="font-bold text-base md:text-xm text-black text-center min-h-[50px] flex items-center justify-center"
                  style={{ fontFamily: "Calibri" }}
                >
                  {product?.productName}
                </h2>
                <p
                  className="capitalize text-gray-600 text-center mb-1"
                  style={{ fontFamily: "Calibri" }}
                >
                  {product?.category}
                </p>
                <div className="flex justify-center items-center my-1">
                  {[...Array(5)].map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className="text-red-500 text-xl"
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-gray-600 ml-2">
                    {product?.ratings || 0} évaluations
                  </span>
                </div>
                <div className="flex gap-3 justify-center items-end">
                  {product?.sellingPrice === product?.price ? (
                    <p className="font-bold text-lg text-black text-center">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <p className="font-bold text-lg text-purple ml-[-9px]">
                          {displayINRCurrency(product?.sellingPrice)}
                        </p>
                        <p className="text-gray-500 line-through text-center mx-2">
                          {displayINRCurrency(product?.price)}
                        </p>
                        <p className="text-sm bg-flio text-black px-2 py-1 rounded-full ml-1">
                          {Math.round(
                            ((product?.price - product?.sellingPrice) / product?.price) * 100
                          )}
                          %
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default VerticalCard;
