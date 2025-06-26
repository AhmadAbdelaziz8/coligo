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
  Card,
  CardContent,
  Fab,
  Menu,
  MenuItem,
  Alert,
  Snackbar,
  Avatar,
  useTheme,
  useMediaQuery,
  Container,
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
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Operation failed!";
      setSnackbar({
        open: true,
        message: message,
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
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : "Delete failed!";
        setSnackbar({
          open: true,
          message: message,
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
    setSnackbar({ ...snackbar, open: false });
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const announcementsArray: Announcement[] = Array.isArray(announcements)
    ? announcements
    : [];

  const stats = [
    {
      title: "Total Announcements",
      value: announcementsArray.length,
      icon: <AnnouncementIcon sx={{ fontSize: "inherit" }} />,
      color: "#1976d2",
      bgColor: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
    },
    {
      title: "This Month",
      value: announcementsArray.filter(
        (a) => new Date(a.createdAt).getMonth() === new Date().getMonth()
      ).length,
      icon: <TodayIcon sx={{ fontSize: "inherit" }} />,
      color: "#388e3c",
      bgColor: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
    },
    {
      title: "By You",
      value: announcementsArray.filter((a) => a.instructor === user?.name)
        .length,
      icon: <PersonIcon sx={{ fontSize: "inherit" }} />,
      color: "#f57c00",
      bgColor: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
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
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          mb: 4,
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "primary.main",
              fontSize: { xs: "1.8rem", sm: "2.2rem" },
            }}
          >
            Announcements
          </Typography>
          <Typography color="text.secondary">
            Create, manage, and share announcements.
          </Typography>
        </Box>
        {!isMobile && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            New Announcement
          </Button>
        )}
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 2, md: 3 },
          mb: 4,
        }}
      >
        {stats.map((stat) => (
          <StatCard {...stat} key={stat.title} />
        ))}
      </Box>

      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
        }}
      >
        {isMobile ? (
          <Box>
            {announcementsArray.map((announcement) => (
              <Card key={announcement._id} sx={{ mb: 2, borderRadius: "12px" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={announcement.instructorAvatar || undefined}
                        sx={{
                          width: 40,
                          height: 40,
                          mr: 2,
                          bgcolor: "#2196f3",
                        }}
                      >
                        {announcement.instructor
                          ? announcement.instructor.charAt(0)
                          : "A"}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          {announcement.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(
                            announcement.createdAt
                          ).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={(e) => handleMenuClick(e, announcement)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      minHeight: 60,
                    }}
                  >
                    {announcement.content}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Instructor</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {announcementsArray.map((announcement) => (
                  <TableRow key={announcement._id}>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {announcement.title}
                    </TableCell>
                    <TableCell>{announcement.instructor}</TableCell>
                    <TableCell>
                      {new Date(announcement.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleOpenDialog(announcement)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(announcement)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      {isMobile && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={() => handleOpenDialog()}
        >
          <AddIcon />
        </Fab>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            if (selectedAnnouncement) {
              handleOpenDialog(selectedAnnouncement);
            }
            handleMenuClose();
          }}
        >
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedAnnouncement) {
              handleDelete(selectedAnnouncement);
            }
          }}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingAnnouncement ? "Edit Announcement" : "Create Announcement"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => handleFormChange("title", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Content"
              fullWidth
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => handleFormChange("content", e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box display="flex" gap={2}>
              <TextField
                label="Instructor"
                fullWidth
                value={formData.instructor}
                onChange={(e) => handleFormChange("instructor", e.target.value)}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Avatar URL"
                fullWidth
                value={formData.instructorAvatar}
                onChange={(e) =>
                  handleFormChange("instructorAvatar", e.target.value)
                }
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: "0 24px 16px" }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingAnnouncement ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
