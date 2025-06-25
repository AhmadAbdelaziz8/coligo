import React from "react";
import { Box } from "@mui/material";
import Header from "../components/Landing/Header";
import Hero from "../components/Landing/Hero";
import Features from "../components/Landing/Features";
import Stats from "../components/Landing/Stats";
import Footer from "../components/Landing/Footer";

const LandingPage: React.FC = () => {
  return (
    // headder
    <Box>
      <Header />
      {/* body */}
      <Box sx={{ pt: { xs: 7, md: 8 } }}>
        <Hero />
        {/* features */}
        <Box id="features">
          <Features />
        </Box>
        {/* stats */}
        <Stats />
        {/* footer */}
        <Box id="contact">
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
