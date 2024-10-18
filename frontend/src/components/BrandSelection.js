import React, { useRef, useState, useEffect } from "react";

const BrandSelection = () => {
  const brands = [
    { name: "aspire", logo: "/path/to/aspire-logo.png" },
    { name: "BIG puff", logo: "/path/to/big-puff-logo.png" },
    { name: "ELFBAR", logo: "/path/to/elfbar-logo.png" },
    { name: "Liquideo", logo: "/path/to/liquideo-logo.png" },
    { name: "TRIBAL force", logo: "/path/to/tribal-force-logo.png" },
    { name: "Eleaf", logo: "/path/to/eleaf-logo.png" },
    { name: "aspire", logo: "/path/to/aspire-logo.png" },
    { name: "BIG puff", logo: "/path/to/big-puff-logo.png" },
    { name: "ELFBAR", logo: "/path/to/elfbar-logo.png" },
    { name: "Liquideo", logo: "/path/to/liquideo-logo.png" },
    { name: "TRIBAL force", logo: "/path/to/tribal-force-logo.png" },
    { name: "Eleaf", logo: "/path/to/eleaf-logo.png" },
  ];

  // Ref to the scrollable container
  const scrollContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detect if mobile

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll handling for mobile using touch (automatic scroll handling in the container)
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += isMobile ? 300 : 1000;
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= isMobile ? 300 : 1000;
    }
  };

  return (
    <div className="bg-white py-8">
      {/* Added max-w-[1350px] and px-8 to align with Header */}
      <div className={`w-full ${isMobile ? "px-4" : "max-w-[1410px] px-8"} mx-auto`}>
        <h2 className="text-center text-2xl font-bold mb-8">
          Nous sélectionnons les meilleures marques d'e-cigarettes pour vous
        </h2>

        {/* Scrollable container with buttons for web, touch scroll for mobile */}
        <div className="relative">
          {/* Scroll Left Button (web only) */}
          {!isMobile && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 transition-opacity duration-900"
              style={{ background: "none", border: "none", fontSize: "16px" }}
            >
              ◀
            </button>
          )}

          {/* Scrollable brand container (touch scroll on mobile) */}
          <div
            className={`flex overflow-x-auto gap-6 ${isMobile ? "px-4" : "px-8"} scrollbar-hide`}
            ref={scrollContainerRef}
          >
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-white shadow-md rounded-lg min-w-[100px] sm:min-w-[150px]"
              >
                <img src={brand.logo} alt={brand.name} className="h-20 sm:h-24" />
              </div>
            ))}
          </div>

          {/* Scroll Right Button (web only) */}
          {!isMobile && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 transition-opacity duration-900"
              style={{ background: "none", border: "none", fontSize: "16px" }}
            >
              ▶
            </button>
          )}
        </div>
      </div>

      {/* Hide scrollbar for web version */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* For WebKit browsers like Chrome and Safari */
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default BrandSelection;
