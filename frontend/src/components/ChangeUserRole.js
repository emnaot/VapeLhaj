import React, { useState } from 'react';
import ROLE from '../common/role';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
        console.log(e.target.value);
    };

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        });

        const responseData = await fetchResponse.json();

        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            callFunc();
        }

        console.log("rôle mis à jour", responseData);
    };

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full z-50 bg-gray-900 bg-opacity-70 transition duration-300 ease-in-out'>
            <div className='bg-white rounded-lg shadow-xl transform transition-all scale-95 hover:scale-100 p-8 w-full max-w-md duration-300'>
                
                <button className='absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition duration-150' onClick={onClose}>
                    <IoMdClose size={28} />
                </button>

                <h1 className='text-2xl font-bold text-gray-800 text-center mb-6'>Changer le rôle de l'utilisateur</h1>

                <p className='text-gray-600'>Nom : <span className='font-semibold'>{name}</span></p>
                <p className='text-gray-600'>Email : <span className='font-semibold'>{email}</span></p>

                <div className='flex items-center justify-between my-6'>
                    <label className='text-gray-800 font-medium'>Rôle :</label>
                    <select className='border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition duration-200' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => (
                                <option value={el} key={el} className='bg-gray-100 text-gray-700'>{el}</option>
                            ))
                        }
                    </select>
                </div>

                <button className='w-full py-3 rounded-lg bg-gold text-white font-semibold hover:bg-yellow-500 transition duration-200' onClick={updateUserRole}>
                    Changer le rôle
                </button>
            </div>
        </div>
    );
}

export default ChangeUserRole;
