import React from 'react';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications.notifications);

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.map((notification) => (
        <div key={notification.id}>
          <p>{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
