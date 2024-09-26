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

      <VerticalCardProduct category={"puff"} heading={"Top's Puffs"} />
      <VerticalCardProduct category={"e-liquide"} heading={"E-Liquides"} />
      <VerticalCardProduct category={"pod"} heading={"Popular's Pods"} />

      <VerticalCardProduct category={"kit-complet"} heading={"Kits Complets"} />
      <VerticalCardProduct category={"colis"} heading={"Colis Spéciaux"} />
    </div>
  );
}

export default Home;
