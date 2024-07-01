import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/postSlice';
import Loader from '../../components/common/Loader';
import styles from './blog.module.css';
import _ from 'lodash';

const BlogPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.blog);
  const [query, setQuery] = useState('');

  // Debounce function to delay search input
  const debouncedSearch = useCallback(
    _.debounce((query) => {
      dispatch(fetchPosts({ query }));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(query);
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.blogPage}>
      <h1>Blog</h1>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search posts..."
        />
      </div>
      <div className={styles.blogPreview}>
        {posts.map((post) => (
          <div className={styles.blogCard} key={post.id}>
            <img src={post.image} alt={post.title} />
            <div className={styles.blogCardContent}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
