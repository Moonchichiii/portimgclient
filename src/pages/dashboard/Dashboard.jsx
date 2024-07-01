import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles } from '../store/profileSlice';
import { fetchPosts } from '../store/postSlice';
import { fetchNotifications } from '../store/notificationSlice';
import Profile from '../components/profile/Profile';
import Posts from '../components/posts/Posts';
import Followers from '../components/followers/Followers';
import Notifications from '../components/notifications/Notifications';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const profilesStatus = useSelector((state) => state.profiles.status);
  const postsStatus = useSelector((state) => state.posts.status);
  const notificationsStatus = useSelector((state) => state.notifications.status);

  useEffect(() => {
    if (profilesStatus === 'idle') {
      dispatch(fetchProfiles());
    }
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
    if (notificationsStatus === 'idle') {
      dispatch(fetchNotifications());
    }
  }, [profilesStatus, postsStatus, notificationsStatus, dispatch]);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.username}!</p>
      <Profile />
      <Posts />
      <Followers />
      <Notifications />
    </div>
  );
};

export default Dashboard;
