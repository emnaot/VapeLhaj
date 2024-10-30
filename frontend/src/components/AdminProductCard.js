import React, { useState } from 'react';
import { MdModeEditOutline, MdDelete } from "react-icons/md"; // Import delete icon
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common'; // Import the API config

const AdminProductCard = ({
    data,
    fetchdata,
    onDelete // Fonction de suppression à passer depuis le parent
}) => {
    const [editProduct, setEditProduct] = useState(false);

    // Delete product function
    const handleDeleteProduct = async () => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(SummaryApi.deleteProduct.url(data._id), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    alert('Product deleted successfully');
                    onDelete(data._id); // Supprime le produit de la liste localement
                } else {
                    const errorResponse = await response.json();
                    alert('Failed to delete product: ' + errorResponse.message);
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                alert('Failed to delete product');
            }
        }
    };

    return (
        <div className='bg-gray-100 p-6 rounded-2xl hover:shadow-xl transition-shadow duration-300 ease-in-out mx-auto'>
            <div className='w-40 mx-auto'>
                <div className='w-32 h-32 flex justify-center items-center mb-4'>
                    <img
                        src={data?.productImage[0]}
                        alt={data.productName}
                        className='mx-auto object-cover h-full w-full rounded-lg shadow-md transition-transform hover:scale-105 duration-300'
                    />
                </div>
                <h1 className='text-lg font-semibold text-black text-center line-clamp-2 mb-2'>
                    {data.productName}
                </h1>

                <div className='text-center'>
                    <p className='font-semibold text-gold-dark text-lg mb-2'>
                        {displayINRCurrency(data.sellingPrice)}
                    </p>

                    <div className='flex justify-center gap-4'>
                        {/* Edit button */}
                        <div
                            className='w-fit p-2 bg-gray-500 hover:bg-gray-400 rounded-full text-gray-100 hover:text-white cursor-pointer transition-colors duration-300'
                            onClick={() => setEditProduct(true)}
                        >
                            <MdModeEditOutline size={20} />
                        </div>

                        {/* Delete button */}
                        <div
                            className='w-fit p-2 bg-red-500 hover:bg-red-400 rounded-full text-white cursor-pointer transition-colors duration-300'
                            onClick={handleDeleteProduct}
                        >
                            <MdDelete size={20} />
                        </div>
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
