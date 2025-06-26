import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const ApiDocsPage: React.FC = () => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "https://coligo-backend-ff6djrh69-ahmad-abdelazizs-projects.vercel.app";

  return (
    <Container maxWidth={false} sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          API Documentation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Interactive API documentation for the Coligo Learning Management
          System
        </Typography>
      </Box>

      <Paper elevation={1} sx={{ p: 0, overflow: "hidden" }}>
        <SwaggerUI
          url={`${backendUrl}/api-docs/swagger.json`}
          deepLinking={true}
          displayOperationId={false}
          defaultModelsExpandDepth={1}
          defaultModelExpandDepth={1}
          defaultModelRendering="example"
          displayRequestDuration={true}
          docExpansion="list"
          filter={false}
          showExtensions={true}
          showCommonExtensions={true}
          tryItOutEnabled={true}
        />
      </Paper>
    </Container>
  );
};

export default ApiDocsPage;
