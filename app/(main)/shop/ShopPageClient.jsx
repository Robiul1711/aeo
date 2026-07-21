"use client";

import React, { useState } from "react";
import MerchandiseSection from "./_components/MerchandiseSection";
import BottomGallery from "./_components/BottomGallery";
import ProductModal from "./_components/ProductModal";
import { productsData } from "@/components/Data/Data";

const ShopPageClient = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleImageClick = (item) => {
    if (!item) return;

    // Direct product object from API (has id, title/name, image)
    if (typeof item === "object" && (item.title || item.name)) {
      setSelectedProduct({
        ...item,
        name: item.name || item.title,
        image: item.image,
        price: item.price || "$150.00",
        description: item.description || "Take a piece of the Pariah experience home with you. Exclusive handcrafted collection item available at our physical location.",
      });
      return;
    }

    // Find the product match based on image reference or image source path
    const product = productsData.find(
      (p) =>
        p.image === item || p.image?.src === item?.src || p.image?.src === item,
    );

    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col">
      {/* Section 1: Merchandise Gallery Canopy (2 Rows, No Modal) */}
      <MerchandiseSection />

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

export default ShopPageClient;
