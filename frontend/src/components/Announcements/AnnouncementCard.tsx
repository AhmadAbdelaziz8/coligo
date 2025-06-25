import React from "react";
import { Box, Typography, Paper, Avatar, Chip, Divider } from "@mui/material";
import {
  Campaign as CampaignIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";

interface AnnouncementCardProps {
  announcement: {
    _id: string;
    title: string;
    content: string;
    instructor: string;
    instructorAvatar?: string;
    createdAt: string;
  };
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
}) => (
  <Paper
    sx={{
      p: 3,
      borderRadius: 3,
      borderLeft: "4px solid #667eea",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        transform: "translateY(-2px)",
      },
    }}
  >
    {/* Header */}
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar
        sx={{ bgcolor: "#667eea", width: 32, height: 32, mr: 2 }}
        {...(announcement.instructorAvatar && {
          src: announcement.instructorAvatar,
        })}
      >
        <CampaignIcon />
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#1a365d", mb: 0.5 }}
        >
          {announcement.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label={announcement.instructor}
            size="small"
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", color: "#64748b" }}>
            <TimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="caption">
              {new Date(announcement.createdAt).toLocaleDateString()} •{" "}
              {new Date(announcement.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>

    <Divider sx={{ mb: 2 }} />

    {/* Content */}
    <Typography
      variant="body1"
      sx={{
        color: "#4a5568",
        lineHeight: 1.6,
        "& p": { mb: 1 },
      }}
    >
      {announcement.content}
    </Typography>
  </Paper>
);

export default AnnouncementCard;
