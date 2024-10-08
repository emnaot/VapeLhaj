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

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ];

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1);
        }
    };

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage]);

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

                {/* Version desktop et tablette */}
                <div className='hidden md:flex h-full w-full overflow-hidden rounded-2xl'>
                    {desktopImages.map((imageURL, index) => (
                        <div 
                            className='w-full h-full transition-all duration-500' 
                            key={index} 
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} className='w-full h-full object-cover rounded-2xl' alt={`Banner ${index}`} />
                        </div>
                    ))}
                </div>

                {/* Version mobile */}
                <div className='flex md:hidden h-full w-full overflow-hidden rounded-2xl'>
                    {mobileImages.map((imageURL, index) => (
                        <div 
                            className='w-full h-full transition-all duration-500' 
                            key={index} 
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} className='w-full h-full object-cover rounded-2xl' alt={`Banner mobile ${index}`} />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default BannerProduct;
