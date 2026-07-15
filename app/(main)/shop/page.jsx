import React from "react";
import MerchandiseSection from "./_components/MerchandiseSection";
import BottomGallery from "./_components/BottomGallery";

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      {/* Section 1: Merchandise Gallery */}
      <MerchandiseSection />

      {/* Section 2: Bottom Gallery Showcase */}
      <BottomGallery />
    </div>
  );
};

export default ShopPage;
