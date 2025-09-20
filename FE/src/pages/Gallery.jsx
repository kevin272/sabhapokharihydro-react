import React from "react";
import GallerySection from "../components/GallerySection";
import Breadcrumb from "../components/common/Breadcrumb";

export default function Gallery() {
  return (
    <>
    <Breadcrumb
    title="Gallery"
    links={[
        { label: "HOME", to: "/" },
        { label: "Gallery", active: true },
    ]}
    />
    <GallerySection />
    </>
  );
}
