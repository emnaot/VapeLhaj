import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <div>
      <CategoryList  />
      <BannerProduct/>

      <HorizontalCardProduct category={"e-cigarettes"} heading={"Top's E-Cigarettes"}/>
      <VerticalCardProduct category={"e-liquide"} heading={"E-Liquide"}/>
      <HorizontalCardProduct category={"accessoires"} heading={"Popular's Accessoires"}/>

    
      <VerticalCardProduct category={"diy"} heading={"DIY"}/>
      <VerticalCardProduct category={"kits"} heading={"Kits d'E-Cigarettes"}/>
    </div>
  );
}

export default Home;
