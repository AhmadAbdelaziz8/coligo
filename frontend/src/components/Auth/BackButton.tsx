import React from "react";
import { IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => navigate("/")}
      sx={{
        position: "absolute",
        top: 20,
        left: 20,
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.1)",
        },
      }}
    >
      <ArrowBack />
      <Typography variant="body2" sx={{ ml: 1 }}>
        Back to home
      </Typography>
    </IconButton>
  );
};

export default BackButton;
