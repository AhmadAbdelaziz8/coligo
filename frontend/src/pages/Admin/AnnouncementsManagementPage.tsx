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
  Container,
  CardActions,
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
      // Refetch announcements to ensure the list is updated
      dispatch(fetchAnnouncements());
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
        dispatch(fetchAnnouncements());
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
    <Container
      maxWidth={false}
      sx={{ py: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1a365d",
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
          }}
        >
          Announcements Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Create and manage announcements for your students.
        </Typography>

        {/* Statistics Cards */}
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Total Announcements"
              value={Array.isArray(announcements) ? announcements.length : 0}
              icon={<AnnouncementIcon />}
              color="#ff9800"
              bgColor="linear-gradient(135deg, #ff9800 0%, #f57c00 100%)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="This Week"
              value={
                Array.isArray(announcements)
                  ? announcements.filter((ann) => {
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return new Date(ann.createdAt) > weekAgo;
                    }).length
                  : 0
              }
              icon={<TodayIcon />}
              color="#4caf50"
              bgColor="linear-gradient(135deg, #4caf50 0%, #45a049 100%)"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <StatCard
              title="Active Instructor"
              value={user?.name || "Admin"}
              icon={<PersonIcon />}
              color="#2196f3"
              bgColor="linear-gradient(135deg, #2196f3 0%, #1976d2 100%)"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Main Content */}
      <Paper
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Toolbar */}
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1a365d",
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            All Announcements (
            {Array.isArray(announcements) ? announcements.length : 0})
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              py: { xs: 1.5, sm: 1 },
            }}
          >
            Create Announcement
          </Button>
        </Box>

        {/* Mobile Card View for xs and sm screens */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {loading ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography>Loading announcements...</Typography>
            </Box>
          ) : !Array.isArray(announcements) || announcements.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary">
                No announcements found. Create your first announcement!
              </Typography>
            </Box>
          ) : (
            <Box sx={{ p: 2 }}>
              {announcements.map((announcement) => (
                <Card
                  key={announcement._id}
                  sx={{ mb: 2, border: "1px solid #e2e8f0" }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 1, fontSize: "1rem" }}
                        >
                          {announcement.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {announcement.content}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Avatar
                            sx={{ width: 24, height: 24, bgcolor: "#ff9800" }}
                          >
                            <PersonIcon sx={{ fontSize: 16 }} />
                          </Avatar>
                          <Typography variant="caption" color="text.secondary">
                            By {announcement.instructor}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            •{" "}
                            {new Date(
                              announcement.createdAt
                            ).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        onClick={(e) => handleMenuClick(e, announcement)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>

        {/* Desktop Table View */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#f8fafc" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                    Announcement
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                    Instructor
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                    Created
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#1a365d",
                      textAlign: "center",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                      <Typography>Loading announcements...</Typography>
                    </TableCell>
                  </TableRow>
                ) : !Array.isArray(announcements) ||
                  announcements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                      <Typography color="text.secondary">
                        No announcements found. Create your first announcement!
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  announcements.map((announcement) => (
                    <TableRow
                      key={announcement._id}
                      sx={{ "&:hover": { backgroundColor: "#f8fafc" } }}
                    >
                      <TableCell sx={{ maxWidth: "400px" }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          {announcement.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {announcement.content}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Avatar
                            sx={{ width: 32, height: 32, bgcolor: "#ff9800" }}
                          >
                            <PersonIcon sx={{ fontSize: 18 }} />
                          </Avatar>
                          <Typography variant="body2">
                            {announcement.instructor}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(
                            announcement.createdAt
                          ).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <IconButton
                          onClick={(e) => handleMenuClick(e, announcement)}
                          size="small"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>

      {/* Floating Action Button for mobile */}
      <Fab
        color="primary"
        aria-label="add announcement"
        onClick={() => handleOpenDialog()}
        sx={{
          position: "fixed",
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          display: { xs: "flex", sm: "none" },
          background: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)",
        }}
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
    </Container>
  );
};

export default AnnouncementsManagementPage;
