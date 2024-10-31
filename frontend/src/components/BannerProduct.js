import React, { useEffect, useState } from "react";
import image1 from "../assest/banner/img1.jpg";
import image2 from "../assest/banner/img2.gif";
import image3 from "../assest/banner/img3.gif";
import image4 from "../assest/banner/img4.gif";
import image5 from "../assest/banner/img5.gif";

import image1Mobile from "../assest/banner/img1_mobile.jpg";
import image2Mobile from "../assest/banner/img2_mobile.gif";
import image3Mobile from "../assest/banner/img3_mobile.gif";
import image4Mobile from "../assest/banner/img4_mobile.gif";
import image5Mobile from "../assest/banner/img5_mobile.gif";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { CiPause1 } from "react-icons/ci"; // Import de l'icône pause
import { CiPlay1 } from "react-icons/ci"; // Import de l'icône play
import { useNavigate } from "react-router-dom";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();

  const desktopImages = [image1, image2, image3, image4, image5];
  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const bannerTexts = [
    "Découvrez les dernières tendances Vape",
    "Vapoteurs, obtenez vos puffs aujourd'hui",
    "Explorez notre collection de e-liquides",
    "Le meilleur matériel Vape disponible",
    "Vapez avec style et performance",
  ];

  const bannerCategories = ["pod", "puff", "e-liquide", "kit-complet", "colis"];

  const nextImage = () => {
    setCurrentImage((prev) => (prev < desktopImages.length - 1 ? prev + 1 : 0));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev > 0 ? prev - 1 : desktopImages.length - 1));
  };

  useEffect(() => {
    if (!paused) {
      const interval = setInterval(nextImage, 5000);
      return () => clearInterval(interval);
    }
  }, [currentImage, paused]);

  const handleBuyClick = () => {
    navigate(`/product-category?category=${bannerCategories[currentImage]}`);
  };

  const togglePause = () => {
    setPaused(!paused);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mx-auto px-4 md:px-0 max-w-[1350px] mt-5">
      <div
        className={`w-full relative rounded-2xl group ${
          isMobile ? "h-[400px]" : "h-[550px]" // Increase height only for desktop
        }`}
      >
        {!isMobile && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-5 shadow-lg hover:bg-gray-200 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "#ffffff80" }}
            >
              <FaAngleLeft className="text-black text-base" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-5 shadow-lg hover:bg-gray-200 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "#ffffff80" }}
            >
              <FaAngleRight className="text-black text-base" />
            </button>
            <button
              onClick={togglePause}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-200 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ backgroundColor: "#ffffff80" }}
            >
              {paused ? (
                <CiPlay1 className="text-black text-base" /> // Utilisation de l'icône play
              ) : (
                <CiPause1 className="text-black text-base" /> // Utilisation de l'icône pause
              )}
            </button>
          </>
        )}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white p-4">
          <h2 className="text-sm md:text-2xl font-semibold mb-4">
            {bannerTexts[currentImage]}
          </h2>
          <button
            onClick={handleBuyClick}
            className="text-white px-4 py-2 border border-white rounded-lg hover:bg-white/50 hover:text-gray-700 "
          >
            <span className="font-semibold">Acheter</span> &nbsp;{" "}
            <span className="font-semibold ">&#8250;</span>
          </button>
        </div>
        <div
          className={`flex ${
            isMobile ? "h-[400px]" : "hidden md:flex h-full"
          } w-full overflow-hidden rounded-2xl`}
        >
          <img
            src={
              isMobile
                ? mobileImages[currentImage]
                : desktopImages[currentImage]
            }
            className="w-full h-full object-cover rounded-2xl transition-all duration-500 z-10"
            alt={`Banner ${currentImage}`}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
