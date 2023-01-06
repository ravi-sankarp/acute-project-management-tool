import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip
} from '@mui/material';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import apiSlice from '../redux/features/api/apiSlice';
import { deleteToken } from '../redux/features/reducers/authSlice';
import { AppBar } from './Styled/AppBar';
import { DrawerHeader } from './Styled/DrawerHeader';
import { Drawer } from './Styled/Drawer';

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);

  const { pathname } = useLocation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (pathname.includes('login') || pathname.includes('register')) {
    return null;
  }
  // for sidebar
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // for alert window
  const handleAlertShow = () => {
    setOpenAlert((current) => !current);
  };

  const handleLogout = async () => {
    await dispatch(deleteToken());
    await dispatch(apiSlice.util.resetApiState());
    setOpenAlert(false);
    navigate('/login');
  };
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <AppBar
          position="fixed"
          open={open}
        >
          <Toolbar sx={{ backgroundColor: '#1976d2' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' })
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
            >
              Acute
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{ backgroundColor: '#000000 !important' }}
        >
          <DrawerHeader>
            <Typography
              variant="h6"
              sx={{ margin: 'auto' }}
              noWrap
              component="div"
            >
              Acute Projects
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              {
                name: 'Dashboard',
                icon: (
                  <Tooltip
                    title="Dashboard"
                    placement="right-end"
                  >
                    <DashboardOutlinedIcon />
                  </Tooltip>
                )
              },
              {
                name: 'Activity',
                icon: (
                  <Tooltip
                    title="Activity"
                    placement="right-end"
                  >
                    <FeedOutlinedIcon />
                  </Tooltip>
                )
              },
              {
                name: 'Projects',
                icon: (
                  <Tooltip
                    title="Projects"
                    placement="right-end"
                  >
                    <AccountTreeOutlinedIcon />
                  </Tooltip>
                )
              },
              {
                name: 'Tasks',
                icon: (
                  <Tooltip
                    title="Tasks"
                    placement="right-end"
                  >
                    <AssignmentOutlinedIcon />
                  </Tooltip>
                )
              },
              {
                name: 'Issues',
                icon: (
                  <Tooltip
                    title="Issues"
                    placement="right-end"
                  >
                    <BugReportOutlinedIcon />
                  </Tooltip>
                )
              },
              {
                name: 'Discuss',
                icon: (
                  <Tooltip
                    title="Discuss"
                    placement="right-end"
                  >
                    <ChatOutlinedIcon />
                  </Tooltip>
                )
              }
            ].map((item) => (
              <ListItem
                component={Link}
                to={`/${item.name.toLowerCase()}`}
                key={item.name}
                disablePadding
                className="text-link"
                sx={{
                  ...(pathname.includes(item.name.toLowerCase()) ? { backgroundColor: '#e8f1fb' } : {})
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      mt: 1,
                      justifyContent: 'center',
                      color: '#000000',
                      my: 'auto'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0, color: 'black' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <ListItem
              onClick={handleAlertShow}
              disablePadding
              sx={{ mt: '2rem' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5
                }}
              >
                <Tooltip title="Logout">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      mt: 1,
                      justifyContent: 'center',
                      color: '#000000'
                    }}
                  >
                    <LogoutOutlinedIcon />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="Logout"
                  sx={{
                    opacity: open ? 1 : 0,
                    mt: 1.2,
                    color: 'black'
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <Dialog
        open={openAlert}
        onClose={handleAlertShow}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Logout </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#339af0', '&:hover': { backgroundColor: '#1c7ed6' } }}
            onClick={handleAlertShow}
          >
            No
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#fa5252',
              '&:hover': { backgroundColor: '#e03131' }
            }}
            onClick={handleLogout}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default Sidebar;
