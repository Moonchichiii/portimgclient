import React from 'react';
import { useSelector } from 'react-redux';

const Followers = () => {
  const profiles = useSelector((state) => state.profiles.profiles);
  const { user } = useSelector((state) => state.auth);

  const profile = profiles.find((profile) => profile.user === user.id);

  return (
    <div>
      <h3>Followers</h3>
      {profile && (
        <ul>
          {profile.followers.map((follower) => (
            <li key={follower.id}>{follower.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Followers;
