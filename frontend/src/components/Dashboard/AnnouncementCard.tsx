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
    <Box
      sx={{
        position: "relative",
        mb: 3,
      }}
    >
      {/* Wavy Orange Border */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
        viewBox="0 0 400 150"
        preserveAspectRatio="none"
      >
        <path
          d="M20,20 Q50,10 80,20 T140,20 Q170,10 200,20 T260,20 Q290,10 320,20 T380,20 L380,130 Q350,140 320,130 T260,130 Q230,140 200,130 T140,130 Q110,140 80,130 T20,130 Z"
          fill="none"
          stroke="#ff9500"
          strokeWidth="2"
          opacity="0.8"
        />
      </svg>

      <Paper
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 1,
          p: 3,
          m: 1,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          border: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 25px rgba(255, 149, 0, 0.15)",
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
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            {announcement.instructor.charAt(0).toUpperCase()}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: "#2d5a87",
                mb: 1,
                fontSize: "16px",
              }}
            >
              {announcement.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#555",
                lineHeight: 1.6,
                fontSize: "14px",
                mb: 2,
              }}
            >
              {announcement.content}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#ff9500",
                  fontWeight: 500,
                  fontSize: "12px",
                }}
              >
                By {announcement.instructor}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "#999",
                  fontSize: "11px",
                }}
              >
                {new Date(announcement.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AnnouncementCard;
