// src/pages/Team.jsx
import React from "react";
import TeamSection from "../components/TEEAMSECTION";
import Breadcrumb from "../components/common/Breadcrumb";

export default function Team() {
  return (
    <>
    <Breadcrumb
            title="Our Team"
            links={[
            { label: "HOME", to: "/" },
            { label: "Our Team", active: true },
            ]}
        />
      {/* Team Members Section */}
      <TeamSection />
    </>
  );
}
