import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

import { FaAngleRight } from 'react-icons/fa6';
import { FaAngleLeft } from 'react-icons/fa6';

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5,
    ];

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile,
    ];

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage((prev) => prev + 1);
        }
    };

    const preveImage = () => {
        if (currentImage !== 0) {
            setCurrentImage((prev) => prev - 1);
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
        <div className='container mx-auto px-4 py-4 rounded'>
            <div className='h-56 md:h-72 w-full bg-gray-100 relative rounded-lg shadow-lg overflow-hidden'>
                <div className='absolute z-10 h-full w-full md:flex items-center justify-between hidden'>
                    <button 
                        onClick={preveImage} 
                        className='bg-gold-dark text-white hover:bg-gold shadow-md rounded-full p-2 transition-all ease-in-out'>
                        <FaAngleLeft />
                    </button>
                    <button 
                        onClick={nextImage} 
                        className='bg-gold-dark text-white hover:bg-gold shadow-md rounded-full p-2 transition-all ease-in-out'>
                        <FaAngleRight />
                    </button>
                </div>

                {/* Desktop and tablet version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {desktopImages.map((imageURL, index) => (
                        <div 
                            className='w-full h-full min-w-full transition-transform duration-700 ease-in-out'
                            key={index} 
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                            <img src={imageURL} alt={`slide-${index}`} className='w-full h-full object-cover rounded-lg'/>
                        </div>
                    ))}
                </div>

                {/* Mobile version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {mobileImages.map((imageURL, index) => (
                        <div 
                            className='w-full h-full min-w-full transition-transform duration-700 ease-in-out'
                            key={index} 
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                            <img src={imageURL} alt={`slide-${index}`} className='w-full h-full object-cover rounded-lg'/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
