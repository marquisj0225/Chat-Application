import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import MainLayout from './layouts/main';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/Page404';
import ChannelView from './pages/ChannelView';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/channels',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/channels/view" replace /> },
        { path: 'view/:id', element: <ChannelView /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/channels" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
