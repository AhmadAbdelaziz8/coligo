import React from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";

interface Announcement {
  _id: string;
  title: string;
  content: string;
  course: string;
  priority: string;
  isActive: boolean;
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
        p: 3,
        borderRadius: 3,
        border: "1px solid #f0f0f0",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <Avatar
          sx={{
            width: 45,
            height: 45,
            backgroundColor: "#2d5a87",
            color: "#fff",
          }}
        >
          {announcement.title.charAt(0)}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: "#2d5a87",
              mb: 1,
            }}
          >
            {announcement.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#666",
              lineHeight: 1.6,
              fontSize: "14px",
            }}
          >
            {announcement.content}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "#999",
              mt: 1,
              display: "block",
            }}
          >
            {new Date(announcement.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default AnnouncementCard;
