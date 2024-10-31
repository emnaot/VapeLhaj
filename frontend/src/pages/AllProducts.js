import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";
import img2 from '../assest/banner/img2.gif'; // Import de l'image GIF

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour stocker la valeur de recherche

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

  // Filtrer les produits en fonction du terme de recherche
  const filteredProducts = allProduct.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white font-calibri">
      <div
        className="py-4 px-6 flex justify-between items-center shadow-md rounded-lg"
        style={{
          backgroundImage: `url(${img2})`, // Utilisation de l'image GIF importée
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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

      {/** Barre de recherche */}
      <div className="py-4 px-6">
        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Mettre à jour le terme de recherche
        />
      </div>

      {/** all product */}
      <div className="flex items-center flex-wrap gap-6 py-6 h-[calc(100vh-220px)] overflow-y-auto bg-white mt-4 p-4 rounded-lg">
        {filteredProducts.map((product, index) => {
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
