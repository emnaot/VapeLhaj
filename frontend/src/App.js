import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingSidebar from './components/FloatingSidebar'; // Import the FloatingSidebar component
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop once here
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import WhyChooseUs from './components/WhyChooseUs';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const location = useLocation(); // Use location hook to get current URL

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include',
    });

    const dataApi = await dataResponse.json();

    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    // Fetch user details and cart count
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <ScrollToTop /> {/* Place ScrollToTop here, globally */}
      <Context.Provider
        value={{
          fetchUserDetails, // user detail fetch
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />

        <Header />

        {/* Render FloatingSidebar on all pages except those under /admin-panel */}
        {location.pathname !== '/admin-panel' && !location.pathname.startsWith('/admin-panel') && (
          <FloatingSidebar />
        )}

        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>

        {location.pathname !== '/admin-panel' && !location.pathname.startsWith('/admin-panel') && (
                  <WhyChooseUs />

        )}
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
