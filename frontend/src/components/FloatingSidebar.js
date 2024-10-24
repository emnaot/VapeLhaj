import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaPinterest } from 'react-icons/fa';

const FloatingSidebar = () => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col items-center space-y-4 p-2 bg-white shadow-lg rounded-full border border-gray-200"
        style={{
          width: '40px', // Reduce the width of the sidebar
          height: '280px', // Increase the height of the sidebar
          paddingTop: '20px',
          paddingBottom: '20px',
        }}>
        
        {/* Facebook Icon */}
        <a
          href="https://www.facebook.com/profile.php?id=61563896497673"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-600"
        >
          <FaFacebookF size={16} />
        </a>

        {/* Instagram Icon */}
        <a
          href="https://www.instagram.com/vape.lhaj/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-600"
        >
          <FaInstagram size={16} />
        </a>

        {/* TikTok Icon */}
        <a
          href="https://tiktok.com/@1ape_lhaj"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-600"
        >
          <FaTiktok size={16} />
        </a>

        {/* YouTube Icon */}
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-600"
        >
          <FaYoutube size={16} />
        </a>

      
{/* Vertical Text - 10% DE RÉDUCTION */}
<div className="mt-4">
  <div
    className="text-center font-semibold text-gray-700 px-4 py-2 bg-gray-200 border border-gray-200 rounded-full"
    style={{ 
      transform: 'rotate(270deg)', 
      whiteSpace: 'nowrap',
      width: '120px', // Adjusted width
      textAlign: 'center',
      fontSize: '10px', // Adjust font size to match the style
      marginTop: '40px', // This will push the element lower from the top
      height: '30px', // You can also control height directly if needed

    }}
  >
    SUIVEZ-NOUS
    </div>
</div>


      </div>
    </div>
  );
};

export default FloatingSidebar;
