import React from "react";
import BannerProduct from "../components/BannerProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
  return (
    <div>
      <BannerProduct />
      <ProductGrid />

      {/* Puffs Populaires */}
      <VerticalCardProduct
        category={"puff"}
        heading={"Puffs Populaires"}
        description="Découvrez notre sélection de puffs populaires, parfaits pour une expérience de vape intense et agréable."
      />

      {/* E-Liquides */}
      <VerticalCardProduct
        category={"e-liquide"}
        heading={"E-Liquides"}
        description="Explorez notre sélection de nouveaux e-liquides et kits DIY pour personnaliser votre expérience de vape."
      />

      {/* Meilleurs Pods */}
      <VerticalCardProduct
        category={"pod"}
        heading={"Meilleurs Pods"}
        description="Les meilleurs pods du marché, sélectionnés pour vous offrir une performance et un style incomparables."
      />

      {/* Kits Complets */}
      <VerticalCardProduct
        category={"kit-complet"}
        heading={"Kits Complets"}
        description="Nos kits complets incluent tout ce dont vous avez besoin pour débuter dans le monde de la vape."
      />

      {/* Colis Spéciaux */}
      <VerticalCardProduct
        category={"colis"}
        heading={"Colis Spéciaux"}
        description="Profitez de nos colis spéciaux, conçus pour une expérience de vape unique et personnalisée."
      />
    </div>
  );
};

export default Home;
