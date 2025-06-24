import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Landing/Header";
import Hero from "../../components/Landing/Hero";
import Features from "../../components/Landing/Features";
import Stats from "../../components/Landing/Stats";
import Footer from "../../components/Landing/Footer";

const LandingPage: React.FC = () => {
  return (
    <Box>
      <Header />
      {/* Add padding top to account for fixed header */}
      <Box sx={{ pt: { xs: 7, md: 8 } }}>
        <Hero />

        <Box id="features">
          <Features />
        </Box>

        <Stats />

        <Box id="contact">
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
