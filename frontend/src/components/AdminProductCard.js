import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false);

    return (
        <div className='bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out'>
            <div className='w-40 mx-auto'>
                <div className='w-32 h-32 flex justify-center items-center mb-4'>
                    <img
                        src={data?.productImage[0]}
                        alt={data.productName}
                        className='mx-auto object-cover h-full w-full rounded-lg shadow-md transition-transform hover:scale-105 duration-300'
                    />
                </div>
                <h1 className='text-lg font-semibold text-gray-800 text-center line-clamp-2 mb-2'>
                    {data.productName}
                </h1>

                <div className='text-center'>
                    <p className='font-semibold text-gold text-lg mb-2'>
                        {displayINRCurrency(data.sellingPrice)}
                    </p>

                    <div
                        className='w-fit mx-auto p-2 bg-gold hover:bg-gold-dark rounded-full hover:text-white cursor-pointer transition-colors duration-300'
                        onClick={() => setEditProduct(true)}
                    >
                        <MdModeEditOutline size={20} />
                    </div>
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct
                    productData={data}
                    onClose={() => setEditProduct(false)}
                    fetchdata={fetchdata}
                />
            )}
        </div>
    );
};

export default AdminProductCard;
