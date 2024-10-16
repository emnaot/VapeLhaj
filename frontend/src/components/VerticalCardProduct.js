import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading, description }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
  }, [category]);

  // Function to break text into a pyramid-like shape
  const createPyramidText = (text) => {
    if (!text) return null; // Check if description is provided

    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    for (let i = 0; i < words.length; i++) {
      currentLine += words[i] + " ";

      // Push the current line when it's long enough
      if (currentLine.length > 30) {
        lines.push(currentLine.trim());
        currentLine = "";
      }
    }

    if (currentLine) {
      lines.push(currentLine.trim());
    }

    return lines.map((line, index) => (
      <p
        key={index}
        style={{
          maxWidth: `${100 - index * 15}%`, // Decrease the width of each line
          margin: "0 auto", // Center each line
          textAlign: "center",
        }}
      >
        {line}
      </p>
    ));
  };

  return (
    <div
      className="container mx-auto px-4 md:px-20 my-6 relative"
      style={{ fontFamily: "inherit" }}
    >
      <h2
        className="text-3xl font-normal text-black antialiased tracking-tight py-3"
        style={{ fontFamily: "Franklin Gothic", textAlign: "center" }}
      >
        {heading}
      </h2>

      {/* Description with pyramid shape */}
      <div className="pyramid-description">
        {createPyramidText(description)}
      </div>

      {/* Button to view more */}
      <div className="text-center mb-6">
        <Link to={`/category/${category}`} className="text-gold font-semibold">
          <span className="text-sm hover:underline">TOUT VOIR</span> &nbsp;
          <span className="text-3xl">&#8250;</span>
        </Link>
      </div>

      {/* Products Section */}
      <div className="flex items-stretch gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-2xl flex flex-col"
              >
                <div className="bg-gray-100 h-80 p-4 flex justify-center items-center animate-pulse rounded-2xl"></div>
                <div className="p-4 grid gap-3 flex-grow">
                  <h2 className="font-medium text-base md:text-lg text-black p-1 py-2 animate-pulse rounded-full bg-gray-200"></h2>
                  <p className="capitalize text-gray-600 p-1 animate-pulse rounded-full bg-gray-200 py-2"></p>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link
                key={index}
                to={"product/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-2xl flex flex-col"
              >
                <div
                  className="bg-gray-100 h-80 p-4 flex justify-center items-center relative rounded-2xl group"
                >
                  <img
                    src={product.productImage[0]}
                    className="object-cover h-80 w-80 mx-auto rounded-2xl"
                    alt={product.productName}
                  />
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
                    {product?.brandName}
                  </p>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
