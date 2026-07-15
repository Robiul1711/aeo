"use client";

import React, { useState } from "react";
import MerchandiseSection from "./_components/MerchandiseSection";
import BottomGallery from "./_components/BottomGallery";
import ProductModal from "./_components/ProductModal";
import { productsData } from "@/components/Data/Data";

const ShopPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleImageClick = (img) => {
    if (!img) return;
    
    // Find the product match based on image reference or image source path
    const product = productsData.find(
      (p) => p.image === img || p.image?.src === img?.src || p.image?.src === img
    );
    
    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      {/* Section 1: Merchandise Gallery */}
      <MerchandiseSection onImageClick={handleImageClick} />

      {/* Section 2: Bottom Gallery Showcase */}
      <BottomGallery onImageClick={handleImageClick} />

      {/* Product Details Modal overlay */}
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default ShopPage;
