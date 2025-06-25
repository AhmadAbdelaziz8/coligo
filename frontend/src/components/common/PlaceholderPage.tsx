import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Chip,
} from "@mui/material";
import {
  Construction as ConstructionIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  features?: string[];
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description,
  icon = <ConstructionIcon />,
  features = [],
}) => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            p: 4,
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            borderRadius: 3,
            border: "1px solid #e2e8f0",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              borderRadius: "50%",
              bgcolor: "#667eea",
              color: "white",
              fontSize: 40,
              mb: 2,
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#1a365d", mb: 2 }}
          >
            {title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Chip
            icon={<ScheduleIcon />}
            label="Coming Soon"
            color="primary"
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />
        </Box>

        {/* Features Preview */}
        {features.length > 0 && (
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#1a365d",
                mb: 3,
                textAlign: "center",
              }}
            >
              Planned Features
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, 1fr)",
                },
                gap: 3,
              }}
            >
              {features.map((feature, index) => (
                <Card
                  key={index}
                  sx={{
                    borderRadius: 2,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: "#4a5568" }}
                    >
                      • {feature}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* Call to Action */}
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
            p: 3,
            borderRadius: 2,
            bgcolor: "#f7fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            This feature is currently under development. Check back soon for
            updates!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default PlaceholderPage;
