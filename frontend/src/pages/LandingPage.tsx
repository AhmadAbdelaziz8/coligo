import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Landing/Header";
import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import Stats from "../components/Landing/Stats";
import Footer from "../components/Landing/Footer";

const LandingPage: React.FC = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ pt: { xs: 7, md: 8 } }}>
        <Hero />
        <Box id="stats">
          <Stats />
        </Box>
        <Box id="features">
          <Features />
        </Box>
        <Box id="contact">
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
