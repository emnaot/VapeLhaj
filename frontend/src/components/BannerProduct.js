import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/img1.jpg';
import image2 from '../assest/banner/img2.gif';
import image3 from '../assest/banner/img3.gif';
import image4 from '../assest/banner/img4.gif';
import image5 from '../assest/banner/img5.gif';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.gif';
import image3Mobile from '../assest/banner/img3_mobile.gif';
import image4Mobile from '../assest/banner/img4_mobile.gif';
import image5Mobile from '../assest/banner/img5_mobile.gif';

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';  // Utilisation de useNavigate pour la redirection

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate();  // Hook pour gérer la redirection

    // Images pour la version desktop
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

    // Images pour la version mobile
    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ];

    // Texte attirant pour chaque image
    const bannerTexts = [
        "Découvrez les dernières tendances Vape",
        "Vapoteurs, obtenez vos puffs aujourd'hui",
        "Explorez notre collection de e-liquides",
        "Le meilleur matériel Vape disponible",
        "Vapez avec style et performance"
    ];

    // Catégories associées à chaque banner
    const bannerCategories = [
        "pod",        // Pour "Découvrez les dernières tendances Vape"
        "puff",        // Pour "Vapoteurs, obtenez vos puffs aujourd'hui"
        "e-liquide",   // Pour "Explorez notre collection de e-liquides"
        "kit-complet",    // Pour "Le meilleur matériel Vape disponible"
        "colis"        // Pour "Vapez avec style et performance"
    ];

    // Fonction pour passer à l'image suivante
    const nextImage = () => {
        if (currentImage < desktopImages.length - 1) {
            setCurrentImage(prev => prev + 1);
        } else {
            setCurrentImage(0); // Retourne à la première image
        }
    };

    // Fonction pour passer à l'image précédente
    const prevImage = () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1);
        } else {
            setCurrentImage(desktopImages.length - 1); // Retourne à la dernière image
        }
    };

    // Change l'image automatiquement toutes les 5 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000);

        return () => clearInterval(interval); // Nettoyage de l'intervalle
    }, [currentImage]);

    // Fonction pour rediriger vers la catégorie correspondant à l'image actuelle
    const handleBuyClick = () => {
        const category = bannerCategories[currentImage];  // Catégorie associée à l'image
        navigate(`/product-category?category=${category}`);  // Redirige vers la page de catégorie
    };

    return (
        <div className='mx-auto px-4 md:px-0 max-w-[1350px] mt-5'>
            <div className='h-72 md:h-[480px] w-full bg-slate-200 relative rounded-2xl'> {/* Hauteur augmentée ici */}

                {/* Boutons de navigation gauche et droite pour desktop */}
                <div className='absolute z-10 h-full w-full md:flex items-center justify-between hidden px-4'>
                    <button onClick={prevImage} className='bg-black bg-opacity-50 p-2 rounded-full'>
                        <FaAngleLeft className='text-white text-3xl'/>
                    </button>
                    <button onClick={nextImage} className='bg-black bg-opacity-50 p-2 rounded-full'>
                        <FaAngleRight className='text-white text-3xl'/>
                    </button>
                </div>

                {/* Overlay avec texte attirant et bouton */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white p-4">
                    <h2 className="text-sm md:text-2xl font-semibold mb-4">
                        {bannerTexts[currentImage]}
                    </h2>
                    <button 
                        onClick={handleBuyClick}  // Redirection lorsque le bouton est cliqué
                        className="text-white px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition-all bg-transparent"
                    >
                        Acheter &nbsp; <span>&#8250;</span>
                    </button>
                </div>

                {/* Version desktop et tablette - Affichage d'une seule image */}
                <div className='hidden md:flex h-full w-full overflow-hidden rounded-2xl'>
                    <img 
                        src={desktopImages[currentImage]} 
                        className='w-full h-full object-cover rounded-2xl transition-all duration-500 z-10' 
                        alt={`Banner ${currentImage}`} 
                    />
                </div>

                {/* Version mobile - Affichage d'une seule image */}
                <div className='flex md:hidden h-full w-full overflow-hidden rounded-2xl'>
                    <img 
                        src={mobileImages[currentImage]} 
                        className='w-full h-full object-cover rounded-2xl transition-all duration-500 z-10' 
                        alt={`Banner mobile ${currentImage}`} 
                    />
                </div>

            </div>
        </div>
    );
};

export default BannerProduct;
