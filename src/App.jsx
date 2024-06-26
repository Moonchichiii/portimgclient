import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { fetchCsrfToken, fetchCurrentUser, refreshToken } from './store/authSlice';
import Loader from './components/common/Loader';
import Layout from './components/layout/Layout';

// Lazy load components
const HomePage = React.lazy(() => import('./pages/home/Home'));
const AboutPage = React.lazy(() => import('./pages/about/About'));
const BlogPage = React.lazy(() => import('./pages/blog/Blog'));
const PortfolioPage = React.lazy(() => import('./pages/portfolio/Portfolio'));
const Register = React.lazy(() => import('./auth/Register'));
const Login = React.lazy(() => import('./auth/Login'));
const Dashboard = React.lazy(() => import('./pages/dashboard/Dashboard'));
const NotFound = React.lazy(() => import('./pages/notfound/NotFound'));

const App = () => {
  const dispatch = useDispatch();
  const { user, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCsrfToken());
    dispatch(fetchCurrentUser());

    const interval = setInterval(() => {
      dispatch(refreshToken());
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (!initialized) {
    return <Loader />;
  }

  return (
    <Router>
      <React.Suspense fallback={<Loader />}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </React.Suspense>
    </Router>
  );
};

export default App;
