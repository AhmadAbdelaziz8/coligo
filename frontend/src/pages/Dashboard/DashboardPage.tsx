import React from "react";
import { Typography, Box, Paper, Grid } from "@mui/material";
import { useAppSelector } from "../../hooks/redux";

const DashboardPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box>
      <Typography variant="h4" className="mb-6">
        Welcome, {user?.name}!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6">Recent Quizzes</Typography>
            <Typography variant="body2" color="text.secondary">
              No recent quizzes
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6">Announcements</Typography>
            <Typography variant="body2" color="text.secondary">
              No new announcements
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="p-4">
            <Typography variant="h6">Your Progress</Typography>
            <Typography variant="body2" color="text.secondary">
              No progress data
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
