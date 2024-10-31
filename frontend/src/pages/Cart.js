import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
        }
    };

    const handleLoading = async () => {
        await fetchData();
    };

    useEffect(() => {
        setLoading(true);
        handleLoading().finally(() => setLoading(false));
    }, []);

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
        }
    };

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({ _id: id })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * (curr?.productId?.sellingPrice || 0)), 0);

    return (
        <div className='max-w-[1350px] mx-auto px-4 py-6'> {/* Added max-w-[1350px] and centered with mx-auto */}
            <div className='text-center text-2xl font-semibold mb-6 text-gray-800'>
                {data.length === 0 && !loading && <p className='py-5'>Your cart is empty</p>}
            </div>

            <div className='flex flex-col lg:flex-row gap-8 lg:justify-between'>
                <div className='w-full max-w-3xl'>
                    {loading ? (
                        loadingCart.map((el, index) => (
                            <div key={index} className='w-full bg-gray-200 h-32 rounded-lg my-3 animate-pulse'></div>
                        ))
                    ) : (
                        data.map((product, index) => (
                            <div key={index} className='w-full bg-white shadow rounded-lg p-4 flex items-center gap-4 mb-4'>
                                <div className='w-32 h-32 bg-gray-100 rounded-lg overflow-hidden'>
                                    <img src={product?.productId?.productImage[0]} alt={product?.productId?.productName} className='w-full h-full object-contain' />
                                </div>
                                <div className='flex-1'>
                                    <div className='flex justify-between items-start'>
                                        <h2 className='text-xl font-medium text-gray-800'>{product?.productId?.productName}</h2>
                                        <button onClick={() => deleteCartProduct(product?._id)} className='text-gold hover:text-red-700'>
                                            <MdDelete size={24} />
                                        </button>
                                    </div>
                                    <p className='text-gray-500 mt-1'>{product?.productId?.category || 'No Category'}</p>
                                    <div className='flex items-center justify-between mt-4'>
                                        <p className='text-gold font-bold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice || 0)}</p>
                                        <p className='text-gray-700 font-semibold text-lg'>{displayINRCurrency((product?.productId?.sellingPrice || 0) * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-2 mt-3'>
                                        <button className='w-8 h-8 bg-gray-500 text-white rounded hover:bg-gray-400' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                        <span className='text-gray-800'>{product?.quantity}</span>
                                        <button className='w-8 h-8 bg-gray-500 text-white rounded hover:bg-gray-400' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className='w-full max-w-sm bg-white shadow rounded-lg p-6'>
    {loading ? (
        <div className='h-24 bg-gray-200 rounded-lg animate-pulse'></div>
    ) : (
        <>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>Résumé de la commande</h2>
            <div className='flex justify-between text-gray-700 font-medium mb-2'>
                <span>Quantité</span>
                <span>{totalQty}</span>
            </div>
            <div className='flex justify-between text-gray-700 font-medium mb-4'>
                <span>Prix total</span>
                <span>{displayINRCurrency(totalPrice)}</span>
            </div>
            <button className='w-full bg-gray-500 text-white font-medium py-2 rounded hover:bg-gray-400'>Procéder au paiement</button>
        </>
    )}
</div>

            </div>
        </div>
    );
};

export default Cart;
