import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="bg-white">
      <div className="bg-gray-200 py-4 px-6 flex justify-between items-center shadow-md  rounded-lg">
        
        <h2 className="font-bold text-xl text-gray-700">Tous les produits</h2>
        <button
          className="border-2 border-gold text-gold hover:bg-gold hover:text-white transition-all py-2 px-4 rounded-full shadow-md"
          onClick={() => setOpenUploadProduct(true)}
        >
          Ajouter un produit
        </button>
      </div>

      {/** all product */}
      <div className="flex items-center flex-wrap gap-6 py-6 h-[calc(100vh-220px)] overflow-y-auto bg-white mt-4 p-4 rounded-lg shadow-lg">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProduct}
            />
          );
        })}
      </div>

      {/** upload product component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
