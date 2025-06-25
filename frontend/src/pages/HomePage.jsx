import React from "react";
import Header from "../components/Header";
import Features from "../components/Features";
import ContactForm from "../components/ContactForm";
import ContentSelector from "../components/ContentSelector";
import HeroSection from "../components/HeroSection";
import FAQ from "../components/FAQ";
import LiveStats from "../components/LiveStats";
import TechStack from "../components/TechStack";

const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <LiveStats />
      <Features />
      <TechStack />
      <div id="content-selector">
        <ContentSelector />
      </div>
      <ContactForm />
      <FAQ />
    </>
  );
};

export default HomePage;
