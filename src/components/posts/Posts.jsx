import React from 'react';
import { useSelector } from 'react-redux';

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const { user } = useSelector((state) => state.auth);

  const userPosts = posts.filter((post) => post.author === user.id);

  return (
    <div>
      <h3>Your Posts</h3>
      {userPosts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
