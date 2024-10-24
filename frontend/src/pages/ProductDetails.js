import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import CategroyWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Détection mobile

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { fetchUserAddToCart } = useContext(Context);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();
    setData(dataReponse?.data);
    setActiveImage(dataReponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Ajuste l'état mobile selon la taille de l'écran
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [params]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  return (
    <div className={`container mx-auto ${isMobile ? "px-4" : "max-w-[1350px] px-0"} my-8 font-calibri`}>
      <div className={`min-h-[200px] flex ${isMobile ? "flex-col" : "lg:flex-row"} gap-4`}>
        {/* Image du produit */}
        <div className={`${isMobile ? "w-full" : "h-96 flex lg:flex-row-reverse gap-4"}`}>
          <div className="h-[300px] w-full lg:h-96 lg:w-96 bg-slate-200 relative p-2 rounded-2xl">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
              alt={data?.productName}
            />

            {!isMobile && zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150"
                  style={{
                    background: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `,
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Images supplémentaires à gauche pour desktop */}
          {!isMobile && (
            <div className="h-full flex lg:flex-col gap-2 overflow-y-scroll scrollbar-none">
              {loading
                ? productImageListLoading.map((_, index) => (
                    <div key={`loading-${index}`} className="h-20 w-20 bg-slate-200 rounded-2xl animate-pulse" />
                  ))
                : data?.productImage?.map((imgURL, index) => (
                    <div key={index} className="h-20 w-20 bg-slate-200 rounded-2xl p-1">
                      <img
                        src={imgURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                        alt={`Product image ${index}`}
                      />
                    </div>
                  ))}
            </div>
          )}

          {/* Images du produit pour mobile */}
          {isMobile && !loading && (
            <div className="flex gap-2 overflow-x-scroll scrollbar-none w-full mt-4">
              {data?.productImage?.map((imgURL, index) => (
                <div className="h-20 w-20 bg-slate-200 rounded-2xl p-1" key={imgURL}>
                  <img
                    src={imgURL}
                    className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                    onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                    onClick={() => handleMouseEnterProduct(imgURL)}
                    alt={`Product image ${index}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Détails du produit */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8 w-full"></p>

            <div className="text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full"></div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8 bg-slate-200 rounded-2xl animate-pulse w-full"></button>
              <button className="h-6 lg:h-8 bg-slate-200 rounded-2xl animate-pulse w-full"></button>
            </div>

            <div className="w-full">
              <p className="text-slate-600 font-medium my-1 h-6 lg:h-8 bg-slate-200 rounded-2xl animate-pulse w-full"></p>
              <p className="bg-slate-200 rounded-2xl animate-pulse h-10 lg:h-12 w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-gold-white text-white-dark px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-white-dark font-semibold">
              {data?.category}
            </p>

            <div className="text-gold-white flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            <div className="flex items-center gap-2 text-2xl lg:text-2xl font-medium my-1">
              <p className="text-purple">{displayINRCurrency(data.sellingPrice)}</p>
              <p className="text-slate-400 line-through">{displayINRCurrency(data.price)}</p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button
                className="border-2 border-gray-300 rounded-2xl px-3 py-1 min-w-[120px] text-gray-500 font-medium hover:bg-gray-400 hover:text-white"
                onClick={(e) => handleBuyProduct(e, data?._id)}
              >
                Acheter Maintenant
              </button>
              <button
                className="border-2  border-gray-400 rounded-2xl px-3 py-1 min-w-[120px] font-medium text-white bg-gray-400"
                onClick={(e) => handleAddToCart(e, data?._id)}
              >
                Ajouter au Panier
              </button>
            </div>

            <div>
              <p className="text-black font-medium my-1">Description du Produit :</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <CategroyWiseProductDisplay
          category={data?.category}
          heading={"Produits Recommandés"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
