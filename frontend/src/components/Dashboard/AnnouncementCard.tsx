import React from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";

interface Announcement {
  _id: string;
  title: string;
  content: string;
  instructor: string;
  createdAt: string;
}

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        border: "1px solid #e0e0e0",
        height: "100%",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
          borderColor: "transparent",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "#2d5a87",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          {announcement.instructor.charAt(0).toUpperCase()}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#2d5a87",
              mb: 1,
              fontSize: { xs: "1rem", sm: "1.1rem" },
            }}
          >
            {announcement.title}
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: "#555",
          lineHeight: 1.6,
          fontSize: { xs: "0.85rem", sm: "0.875rem" },
          mb: 2,
          flexGrow: 1,
        }}
      >
        {announcement.content}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "auto",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#64748b",
            fontWeight: 500,
            fontSize: { xs: "0.75rem", sm: "0.8rem" },
          }}
        >
          By {announcement.instructor}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            color: "#94a3b8",
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
          }}
        >
          {new Date(announcement.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AnnouncementCard;
