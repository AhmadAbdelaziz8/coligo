import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  Fab,
  Menu,
  MenuItem,
  Alert,
  Snackbar,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  MoreVert as MoreVertIcon,
  Announcement as AnnouncementIcon,
  Person as PersonIcon,
  Today as TodayIcon,
} from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  fetchAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  clearError,
} from "../../store/slices/announcementSlice";

// Define Announcement interface locally to avoid import issues
interface Announcement {
  _id: string;
  title: string;
  content: string;
  instructor: string;
  instructorAvatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface AnnouncementFormData {
  title: string;
  content: string;
  instructor: string;
  instructorAvatar: string;
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error";
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  bgColor,
}) => (
  <Card sx={{ background: bgColor }}>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Box sx={{ color, fontSize: 40 }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

const AnnouncementsManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { announcements, loading, error } = useAppSelector(
    (state) => state.announcement
  );
  const { user } = useAppSelector((state) => state.auth);

  // State
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: "",
    content: "",
    instructor: user?.name || "",
    instructorAvatar: "",
  });

  // Effects
  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Handlers
  const handleOpenDialog = (announcement?: Announcement) => {
    if (announcement) {
      setEditingAnnouncement(announcement);
      setFormData({
        title: announcement.title,
        content: announcement.content,
        instructor: announcement.instructor,
        instructorAvatar: announcement.instructorAvatar || "",
      });
    } else {
      setEditingAnnouncement(null);
      setFormData({
        title: "",
        content: "",
        instructor: user?.name || "",
        instructorAvatar: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAnnouncement(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingAnnouncement) {
        await dispatch(
          updateAnnouncement({
            id: editingAnnouncement._id,
            data: formData,
          })
        ).unwrap();
        setSnackbar({
          open: true,
          message: "Announcement updated successfully!",
          severity: "success",
        });
      } else {
        await dispatch(createAnnouncement(formData)).unwrap();
        setSnackbar({
          open: true,
          message: "Announcement created successfully!",
          severity: "success",
        });
      }
      handleCloseDialog();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || "Operation failed!",
        severity: "error",
      });
    }
  };

  const handleDelete = async (announcement: Announcement) => {
    if (
      window.confirm(`Are you sure you want to delete "${announcement.title}"?`)
    ) {
      try {
        await dispatch(deleteAnnouncement(announcement._id)).unwrap();
        setSnackbar({
          open: true,
          message: "Announcement deleted successfully!",
          severity: "success",
        });
      } catch (error: any) {
        setSnackbar({
          open: true,
          message: error.message || "Delete failed!",
          severity: "error",
        });
      }
    }
    handleMenuClose();
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    announcement: Announcement
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedAnnouncement(announcement);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAnnouncement(null);
  };

  const handleFormChange = (
    field: keyof AnnouncementFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Stats calculation
  const stats = [
    {
      title: "Total Announcements",
      value: announcements.length,
      icon: <AnnouncementIcon />,
      color: "#2196f3",
      bgColor: "linear-gradient(135deg, #2196f320 0%, #2196f330 100%)",
    },
    {
      title: "This Month",
      value: announcements.filter(
        (a) => new Date(a.createdAt).getMonth() === new Date().getMonth()
      ).length,
      icon: <TodayIcon />,
      color: "#ff9800",
      bgColor: "linear-gradient(135deg, #ff980020 0%, #ff980030 100%)",
    },
    {
      title: "Active Instructors",
      value: new Set(announcements.map((a) => a.instructor)).size,
      icon: <PersonIcon />,
      color: "#4caf50",
      bgColor: "linear-gradient(135deg, #4caf5020 0%, #4caf5030 100%)",
    },
  ];

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading announcements...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#1a365d", mb: 1 }}
          >
            Announcements Management 📢
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage announcements for your students
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            px: 3,
          }}
        >
          Create Announcement
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Announcements Table */}
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ p: 3, borderBottom: "1px solid #e2e8f0" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a365d" }}>
            All Announcements ({announcements.length})
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fafc" }}>
                <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                  Title
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                  Content Preview
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                  Instructor
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                  Created
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {announcements.map((announcement) => (
                <TableRow
                  key={announcement._id}
                  sx={{ "&:hover": { bgcolor: "#f7fafc" } }}
                >
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {announcement.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        maxWidth: 300,
                      }}
                    >
                      {announcement.content}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        src={announcement.instructorAvatar}
                        sx={{ width: 32, height: 32, bgcolor: "#2196f3" }}
                      >
                        {announcement.instructor.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">
                        {announcement.instructor}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(announcement.createdAt).toLocaleTimeString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handleMenuClick(e, announcement)}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {announcements.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center", py: 4 }}>
                    <Typography color="text.secondary">
                      No announcements found. Create your first announcement!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        }}
        onClick={() => handleOpenDialog()}
      >
        <AddIcon />
      </Fab>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <ViewIcon sx={{ mr: 1, fontSize: 20 }} />
          View Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedAnnouncement) handleOpenDialog(selectedAnnouncement);
            handleMenuClose();
          }}
        >
          <EditIcon sx={{ mr: 1, fontSize: 20 }} />
          Edit Announcement
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedAnnouncement) handleDelete(selectedAnnouncement);
          }}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
          Delete Announcement
        </MenuItem>
      </Menu>

      {/* Create/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editingAnnouncement
              ? "Edit Announcement"
              : "Create New Announcement"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                value={formData.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                variant="outlined"
                placeholder="Enter announcement title..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Instructor Name"
                value={formData.instructor}
                onChange={(e) => handleFormChange("instructor", e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Instructor Avatar URL (Optional)"
                value={formData.instructorAvatar}
                onChange={(e) =>
                  handleFormChange("instructorAvatar", e.target.value)
                }
                variant="outlined"
                placeholder="https://example.com/avatar.jpg"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Content"
                multiline
                rows={6}
                value={formData.content}
                onChange={(e) => handleFormChange("content", e.target.value)}
                variant="outlined"
                placeholder="Write your announcement content here..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {editingAnnouncement
              ? "Update Announcement"
              : "Create Announcement"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AnnouncementsManagementPage;
