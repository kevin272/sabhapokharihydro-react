import React from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import AboutSection from "../components/AboutSection";
import TeamSection from "../components/TeamSection";
import Footer from "../components/common/Footer";

export default function About() {
  return (
    <>
        <Breadcrumb
        title="About Us"
        links={[
          { label: "HOME", to: "/" },
          { label: "About Us", active: true },
        ]}
      />
      <AboutSection />
      <TeamSection />
    </>
  );
}