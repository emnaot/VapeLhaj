import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <VerticalCardProduct category={"puff"} heading={"Puffs Populaires"} />
      <VerticalCardProduct category={"e-liquide"} heading={"E-Liquides"} />
      <VerticalCardProduct category={"pod"} heading={"Meilleurs Pods"} />

      <VerticalCardProduct category={"kit-complet"} heading={"Kits Complets"} />
      <VerticalCardProduct category={"colis"} heading={"Colis Spéciaux"} />
    </div>
  );
}

export default Home;
