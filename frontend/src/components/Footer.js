import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPinterest,
  FaTiktok,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png"; // Import du logo en tant qu'image

const Footer = () => {
  return (
    <footer
      className="bg-white py-8"
      style={{ fontFamily: "Calibri, sans-serif" }}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-[1350px]">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Section */}
          <div>
            {/* Logo image with margin adjustment */}
            <img
              src={logo}
              alt="Vape Lhaj"
              className="mb-0 w-[100px]"
              style={{ marginTop: "-20px" }} // Moves the logo upwards
            />
            <h2 className="font-bold text-lg mb-2">La vape à son meilleur</h2>
            <p className="text-gray-600">
              Vape Lhaj est votre destination idéale pour découvrir les
              meilleures cigarettes électroniques et e-liquides. Profitez d'un
              large choix de produits de qualité à des prix exceptionnels.
            </p>
          </div>

          {/* Follow Us Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">Nous suivre</h2>
            <p className="text-gray-600 mb-4">
              Suivez-nous sur nos réseaux sociaux et soyez les premiers informés
              de nos offres exclusives !
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61563896497673"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-xl text-black hover:text-gray-600 cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com/vape.lhaj/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-xl text-black hover:text-gray-600 cursor-pointer" />
              </a>
              <a
                href="https://www.tiktok.com/@1ape_lhaj?fbclid=IwY2xjawGGEz5leHRuA2FlbQIxMAABHcHYv3m2D_EQoG3OLdhY1dSNgoM32ctGGmgRGDXNh9v9ToLJFYCazHd5aA_aem_HRqfWjgdZ8WDp063Tkk7TA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="text-xl text-black hover:text-gray-600 cursor-pointer" />
              </a>
              <FaYoutube className="text-xl text-black hover:text-gray-600 cursor-pointer" />
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">Support</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-black">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-black">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/livraison"
                  className="text-gray-600 hover:text-black"
                >
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/retours" className="text-gray-600 hover:text-black">
                  Retours
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">Nos services</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/cadeaux-offerts"
                  className="text-gray-600 hover:text-black"
                >
                  Cadeaux Offerts
                </Link>
              </li>
              <li>
                <Link
                  to="/protection-jeunesse"
                  className="text-gray-600 hover:text-black"
                >
                  Protection de la jeunesse
                </Link>
              </li>
        
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Legal Links */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Link
                to="/mentions-legales"
                className="text-gray-600 hover:text-black"
              >
                Mentions légales
              </Link>
              <Link to="/a-propos" className="text-gray-600 hover:text-black">
                À propos
              </Link>
              <a href="#" className="text-gray-600 hover:text-black">
                CGV
              </a>
              <Link
                to="/politique-confidentialite"
                className="text-gray-600 hover:text-black"
              >
                Politique de confidentialité
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-gray-600 text-sm">
              © 2024 Vape Lhaj. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
