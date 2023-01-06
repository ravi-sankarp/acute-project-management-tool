import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Outlet from './userOutlet';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProjectPage from '../pages/ProjectPage';
import Sidebar from '../components/Sidebar';

function UserRoutes() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        backgroundColor: '#dddddd5e',
        minHeight: '100vh',
        overflowX: 'hidden'
      }}
    >
      <Sidebar />
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
      </Routes>
      <Box
        sx={{
          paddingTop: '10vh',
          paddingRight: '1rem',
          flexGrow: 1
        }}
      >
        <Routes>
          <Route
            path="/"
            element={<Outlet />}
          >
            <Route
              path="projects"
              element={<ProjectPage />}
            />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
}

export default UserRoutes;
