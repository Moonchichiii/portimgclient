import React from 'react';
import {  useSelector } from 'react-redux';


const Dashboard = () => {

  const { user } = useSelector((state) => state.auth);



  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.username}!</p>
      
    </div>
  );
};

export default Dashboard;