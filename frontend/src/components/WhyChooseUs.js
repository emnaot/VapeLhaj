import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion for hover animation only

const WhyChooseUs = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const features = [
    {
      title: "Prix Incroyables",
      description: "Les meilleurs produits aux meilleurs prix du marché",
      icon: "🛒",
    },
    {
      title: "Service Client 24h/7j",
      description: "Aides & Conseils via chat en ligne ou WhatsApp",
      icon: "💬",
    },
    {
      title: "SAV Efficace",
      description: "Produit défectueux sans retour grâce au SAV efficace et simple",
      icon: "📦",
    },
  ];

  return (
    <div
      className="py-12"
      style={{ fontFamily: "Calibri, sans-serif", backgroundColor: "#111111" }}
    >
      <div className={`container ${isMobile ? "px-4" : "mx-auto px-4"}`}>
        <h2
          className={`text-center ${
            isMobile ? "text-2xl" : "text-3xl"
          } font-bold mb-4 text-white`}
        >
          Ce qui fait de Vape Lhaj votre meilleur choix
        </h2>

        <p
          className={`text-center mb-10 ${
            isMobile ? "text-sm" : "text-base"
          } text-white`}
        >
          "Nous nous engageons à vous offrir une qualité de service irréprochable, car votre satisfaction est notre priorité absolue." - Vape Lhaj
        </p>

        <div
          className={`${
            isMobile
              ? "flex overflow-x-auto gap-4"
              : "grid grid-cols-1 sm:grid-cols-3 gap-6"
          }`}
          style={isMobile ? { whiteSpace: "nowrap" } : {}}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-2xl text-center inline-block ${
                isMobile ? "text-sm min-w-[250px]" : ""
              }`}
              style={{
                backgroundColor: "#252525",
                flexShrink: 0,
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Only hover effect
            >
              <div className={`mb-4 ${isMobile ? "text-3xl" : "text-4xl"}`}>
                {feature.icon}
              </div>
              <h3
                className={`font-bold mb-2 text-white ${
                  isMobile ? "text-lg" : "text-xl"
                }`}
              >
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
