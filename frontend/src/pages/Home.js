import React from 'react';
import BannerProduct from '../components/BannerProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <div>
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
