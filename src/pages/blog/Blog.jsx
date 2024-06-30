import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/blogSlice';
import Loader from '../../components/common/Loader';
import styles from './blog.module.css';

const BlogPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.blogPage}>
      <h1>Blog</h1>
      <div className={styles.blogPreview}>
        {posts.map((post) => (
          <div className={styles.blogCard} key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
