import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaPinterest, FaTiktok, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto px-4 md:px-8 max-w-[1350px]">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Section */}
          <div>
            <img src="/logo.png" alt="Vape Lhaj" className="mb-4" />
            <h2 className="font-bold text-lg mb-2">La vape à son meilleur</h2>
            <p className="text-gray-600">
              Vape Lhaj est votre destination idéale pour découvrir les meilleures cigarettes électroniques et e-liquides. Profitez d'un large choix de produits de qualité à des prix exceptionnels.
            </p>
          </div>

          {/* Follow Us Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">Nous suivre</h2>
            <p className="text-gray-600 mb-4">Suivez-nous sur nos réseaux sociaux et soyez les premiers informés de nos offres exclusives !</p>
            <div className="flex space-x-4">
              <FaInstagram className="text-xl text-black hover:text-gray-600 cursor-pointer" />
              <FaFacebookF className="text-xl text-black hover:text-gray-600 cursor-pointer" />
              <FaTwitter className="text-xl text-black hover:text-gray-600 cursor-pointer" />
              <FaYoutube className="text-xl text-black hover:text-gray-600 cursor-pointer" />
              <FaPinterest className="text-xl text-black hover:text-gray-600 cursor-pointer" />
              <FaTiktok className="text-xl text-black hover:text-gray-600 cursor-pointer" />
              <FaLinkedin className="text-xl text-black hover:text-gray-600 cursor-pointer" />
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">Support</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Livraison</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Retours</a></li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">Nos services</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">Programme de Fidélité</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Cadeaux Offerts</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Tarifs Réduits</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Offres d'emploi</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Engagement écologique</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Protection de la jeunesse</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Language & Legal Links */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="text-gray-600">
                <span className="mr-2">Français</span>
                <select className="bg-transparent border-none focus:ring-0 focus:border-none">
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </div>
              <a href="#" className="text-gray-600 hover:text-black">Mentions légales</a>
              <a href="#" className="text-gray-600 hover:text-black">À propos</a>
              <a href="#" className="text-gray-600 hover:text-black">CGV</a>
              <a href="#" className="text-gray-600 hover:text-black">Politique de confidentialité</a>
            </div>

            {/* Copyright */}
            <div className="text-gray-600 text-sm">
              © 2023 Vape Lhaj. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
