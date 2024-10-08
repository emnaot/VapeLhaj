import React from 'react';

// Composant pour afficher chaque carte avec une image, un titre et un bouton
const CardImage = ({ imageUrl, title, buttonText }) => {
  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg"> {/* Hauteur réduite */}
      {/* Image */}
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" />

      {/* Overlay avec titre et bouton */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
        <h2 className="text-lg md:text-2xl font-semibold mb-4">{title}</h2>
        <button className="bg-white text-black px-4 py-2 rounded-2xl hover:bg-gray-300 transition-all">
          {buttonText} &nbsp; <span>&#8250;</span>
        </button>
      </div>
    </div>
  );
};

// Composant pour afficher la grille de cartes
const ProductGrid = () => {
  return (
    <div className="mx-auto px-4 md:px-0 max-w-[1350px] py-3"> {/* Même structure que le banner pour s'aligner */}
      {/* Grid container pour aligner deux cartes côte à côte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Première carte */}
        <CardImage 
          imageUrl="https://example.com/image1.jpg" 
          title="VAPE MAKER Prodigy" 
          buttonText="ACHETER" 
        />

        {/* Deuxième carte */}
        <CardImage 
          imageUrl="https://example.com/image2.jpg" 
          title="EUMOT RandM Tornado 9000" 
          buttonText="ACHETER" 
        />
      </div>
    </div>
  );
};

export default ProductGrid;
