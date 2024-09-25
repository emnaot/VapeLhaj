import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-gray-800 bg-opacity-75 top-0 left-0 flex justify-center items-center">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-2xl h-full max-h-[80%] overflow-hidden transition-transform transform hover:scale-105 border border-gold">
        <div className="flex justify-between items-center pb-4">
          <h2 className="font-bold text-2xl text-gray-800">Ajouter le Produit</h2>
          <div
            className="text-2xl hover:text-red-600 cursor-pointer transition duration-300"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-4 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName" className="text-lg font-semibold">
            Nom du Produit :
          </label>
          <input
            type="text"
            id="productName"
            placeholder="Entrez le nom du produit"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-3 bg-gray-200 border border-gray-300 rounded shadow transition duration-300 hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold-dark"
            required
          />

          <label htmlFor="brandName" className="mt-3 text-lg font-semibold">
            Nom de la Marque :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Entrez le nom de la marque"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-3 bg-gray-200 border border-gray-300 rounded shadow transition duration-300 hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold-dark"
            required
          />

          <label htmlFor="category" className="mt-3 text-lg font-semibold">
            Catégorie :
          </label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-3 bg-gray-200 border border-gray-300 rounded shadow transition duration-300 hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold-dark"
          >
            <option value={""}>Sélectionnez une Catégorie</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="productImage" className="mt-3 text-lg font-semibold">
            Image du Produit :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-4 bg-gray-200 border border-gray-300 rounded h-32 w-full flex justify-center items-center cursor-pointer transition duration-300 hover:bg-gray-300">
              <div className="text-gray-600 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl text-gold">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Télécharger l'Image du Produit</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>  
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt={el}
                      width={80}
                      height={80}
                      className="bg-gray-200 border border-gray-300 rounded cursor-pointer shadow transition duration-300 hover:shadow-lg"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />

                    <div
                      className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer transition duration-300"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Veuillez télécharger l'image du produit
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3 text-lg font-semibold">
            Prix :
          </label>
          <input
            type="number"
            id="price"
            placeholder="Entrez le prix"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-3 bg-gray-200 border border-gray-300 rounded shadow transition duration-300 hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold-dark"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3 text-lg font-semibold">
            Prix de Vente :
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Entrez le prix de vente"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-3 bg-gray-200 border border-gray-300 rounded shadow transition duration-300 hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold-dark"
            required
          />

          <label htmlFor="description" className="mt-3 text-lg font-semibold">
            Description :
          </label>
          <textarea
            className="h-28 bg-gray-200 border border-gray-300 resize-none p-3 rounded shadow transition duration-300 hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold-dark"
            placeholder="Entrez la description du produit"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="px-4 py-2 bg-gold text-white mb-4 rounded shadow hover:bg-gold-dark transition-colors duration-200">
            Télécharger le Produit
          </button>
        </form>
      </div>

      {/***affichage de l'image en plein écran */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
