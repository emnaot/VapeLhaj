import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart();
        }

        if (dataApi.error) {
            toast.error(dataApi.message);
        }
    };

    return (
        <section id='login'>
            <div className='mx-auto container p-4 flex justify-center items-center min-h-screen' style={{ marginTop: '-50px' }}>
                <div className='bg-white p-8 w-full max-w-md shadow-md rounded-lg'>
                    <h1 className='text-5xl font-bold text-center mb-20'>Connexion</h1>

                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <input
                            type='email'
                            placeholder='Courriel'
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
                            className='bg-gray-100 p-4 rounded-lg outline-none'
                        />
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder='Mot de passe'
                                name='password'
                                value={data.password}
                                onChange={handleOnChange}
                                className='bg-gray-100 p-4 rounded-lg outline-none w-full'
                            />
                            <div
                                className='absolute right-4 top-4 cursor-pointer text-xl'
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                        <Link
                            to='/forgot-password'
                            className='text-sm text-black hover:underline self-end'
                        >
                            Mot de passe oublié?
                        </Link>

                        <div className='flex gap-4 mt-6'>
                            <button className='bg-black text-white py-3 rounded-full font-semibold flex-1'>
                                Se connecter
                            </button>
                            <Link
                                to='/sign-up'
                                className='text-center text-black border border-black py-3 rounded-full font-semibold flex-1'
                            >
                                Créer un compte
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
