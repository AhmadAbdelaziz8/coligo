import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import type { SvgIconProps } from "@mui/material/SvgIcon";

interface EmptyStateProps {
  icon: React.ComponentType<SvgIconProps>;
  title: string;
  subtitle: string;
  variant?: "paper" | "centered";
  iconSize?: number;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  subtitle,
  variant = "paper",
  iconSize = 64,
}) => {
  if (variant === "centered") {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 6, md: 8 },
          px: 2,
        }}
      >
        <Icon
          sx={{
            fontSize: iconSize,
            color: "text.secondary",
            mb: 2,
          }}
        />
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        p: 4,
        textAlign: "center",
        borderRadius: 3,
        bgcolor: "#f8fafc",
        border: "1px solid #e2e8f0",
      }}
    >
      <Icon sx={{ fontSize: iconSize, color: "#cbd5e1", mb: 2 }} />
      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </Paper>
  );
};

export default EmptyState;
