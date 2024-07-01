import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const profiles = useSelector((state) => state.profiles.profiles);
  const { user } = useSelector((state) => state.auth);

  const profile = profiles.find((profile) => profile.user === user.id);

  return (
    <div>
      <h3>Profile</h3>
      {profile && (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Bio: {profile.bio}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
