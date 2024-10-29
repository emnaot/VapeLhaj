import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata
}) => {
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    });
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file);

        setData((prev) => ({
            ...prev,
            productImage: [...prev.productImage, uploadImageCloudinary.url]
        }));
    };

    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);

        setData((prev) => ({
            ...prev,
            productImage: [...newProductImage]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.success) {
            toast.success(responseData?.message);
            onClose();
            fetchdata();
        }

        if (responseData.error) {
            toast.error(responseData?.message);
        }
    };

    return (
        <div className='fixed w-full h-full bg-gray-900 bg-opacity-75 top-0 left-0 right-0 bottom-0 flex justify-center items-center font-calibri'>
            <div className='bg-white p-6 rounded-lg w-full max-w-2xl h-full max-h-[80%] overflow-hidden shadow-lg transition-transform transform hover:scale-105'>
                <div className='flex justify-between items-center pb-3 border-b border-gold-dark'>
                    <h2 className='font-bold text-2xl text-black'>Modifier le produit</h2>
                    <div className='w-fit ml-auto text-3xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-4 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor='productName' className='text-gray-700 font-semibold mb-2'>Nom du produit :</label>
                    <input 
                        type='text' 
                        id='productName' 
                        placeholder='Entrez le nom du produit' 
                        name='productName'
                        value={data.productName} 
                        onChange={handleOnChange}
                        className='p-3 bg-gray-100 border border-gold rounded-md focus:ring-2 focus:ring-gold-dark mb-4'
                        required
                    />

                    <label htmlFor='brandName' className='text-gray-700 font-semibold mb-2'>Nom de la marque :</label>
                    <input 
                        type='text' 
                        id='brandName' 
                        placeholder='Entrez le nom de la marque' 
                        value={data.brandName} 
                        name='brandName'
                        onChange={handleOnChange}
                        className='p-3 bg-gray-100 border border-gold rounded-md focus:ring-2 focus:ring-gold-dark mb-4'
                        required
                    />

                    <label htmlFor='category' className='text-gray-700 font-semibold mb-2'>Catégorie :</label>
                    <select required value={data.category} name='category' onChange={handleOnChange} className='p-3 bg-gray-100 border border-gold rounded-md focus:ring-2 focus:ring-gold-dark mb-4'>
                        <option value={""}>Sélectionner une catégorie</option>
                        {
                            productCategory.map((el, index) => (
                                <option value={el.value} key={el.value + index}>{el.label}</option>
                            ))
                        }
                    </select>

                    <label htmlFor='productImage' className='text-gray-700 font-semibold mb-2'>Image du produit :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-4 bg-gray-100 border border-gold rounded-md h-32 w-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition-colors mb-4'>
                            <div className='text-gray-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-5xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm font-medium'>Télécharger l'image du produit</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div className='mb-4'>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2 flex-wrap'>
                                    {
                                        data.productImage.map((el, index) => (
                                            <div className='relative group' key={index}>
                                                <img
                                                    src={el}
                                                    alt={el}
                                                    width={80}
                                                    height={80}
                                                    className='bg-gray-100 border border-gold rounded-md cursor-pointer hover:scale-105 transition-transform' 
                                                    onClick={() => {
                                                        setOpenFullScreenImage(true);
                                                        setFullScreenImage(el);
                                                    }} />

                                                <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                                    <MdDelete />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Veuillez télécharger l'image du produit</p>
                            )
                        }
                    </div>

                    <label htmlFor='price' className='text-gray-700 font-semibold mb-2'>Prix :</label>
                    <input 
                        type='number' 
                        id='price' 
                        placeholder='Entrez le prix' 
                        value={data.price} 
                        name='price'
                        onChange={handleOnChange}
                        className='p-3 bg-gray-100 border border-gold rounded-md focus:ring-2 focus:ring-gold-dark mb-4'
                        required
                    />

                    <label htmlFor='sellingPrice' className='text-gray-700 font-semibold mb-2'>Prix de vente :</label>
                    <input 
                        type='number' 
                        id='sellingPrice' 
                        placeholder='Entrez le prix de vente' 
                        value={data.sellingPrice} 
                        name='sellingPrice'
                        onChange={handleOnChange}
                        className='p-3 bg-gray-100 border border-gold rounded-md focus:ring-2 focus:ring-gold-dark mb-4'
                        required
                    />

                    <label htmlFor='description' className='text-gray-700 font-semibold mb-2'>Description :</label>
                    <textarea 
                        className='h-28 bg-gray-100 border border-gold resize-none p-3 focus:ring-2 focus:ring-gold-dark mb-4' 
                        placeholder='Entrez la description du produit' 
                        rows={3} 
                        onChange={handleOnChange} 
                        name='description'
                        value={data.description}
                    >
                    </textarea>

                    <button className='px-5 py-2 bg-gold-dark text-white transition-colors border border-gold-dark rounded-md shadow-md mb-10'>Mettre à jour le produit</button>
                </form>
            </div>

            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }
        </div>
    );
}

export default AdminEditProduct;
