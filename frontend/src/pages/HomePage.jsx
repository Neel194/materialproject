import React from "react";
import Header from "../components/Header";
import Features from "../components/Features";
import ContactForm from "../components/ContactForm";
import ContentSelector from "../components/ContentSelector";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <Features />
      <div id="content-selector">
        <ContentSelector />
      </div>
      <ContactForm />
    </>
  );
};

export default HomePage;
