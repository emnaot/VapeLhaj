import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import img2 from '../assest/banner/img2.gif'; // Import de l'image GIF

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const dataResponse = await response.json();
      console.log("product data", dataResponse);
      setAllProduct(dataResponse?.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const handleDeleteProduct = (productId) => {
    // Supprime le produit de l'état actuel sans refetcher
    setAllProduct((prevProducts) => prevProducts.filter((product) => product._id !== productId));
  };

  return (
    <div className="bg-white font-calibri">
      <div
        className="py-4 px-6 flex justify-between items-center shadow-md rounded-lg"
        style={{
          backgroundImage: `url(${img2})`, // Utilisation de l'image GIF importée
          backgroundSize: 'cover', // L'image couvrira toute la div
          backgroundPosition: 'center', // Centrer l'image
        }}
      >
        <h2 className="font-bold text-xl text-white">Tous les produits</h2>
        <button
          className="border-2 border-white text-white transition-all py-2 px-4 rounded-full shadow-md"
          onClick={() => setOpenUploadProduct(true)}
        >
          Ajouter un produit
        </button>
      </div>

      {/** all product */}
      <div className="flex items-center flex-wrap gap-6 py-6 h-[calc(100vh-220px)] overflow-y-auto bg-white mt-4 p-4 rounded-lg">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProduct}  // Utilisé pour mettre à jour la liste si nécessaire
              onDelete={handleDeleteProduct} // Fonction de suppression
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
