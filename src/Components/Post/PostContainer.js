import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../Hooks/useInput';
import PostPresenter from './PostPresenter';

const PostContainer = ({
  id,
  user,
  files,
  location,
  caption,
  isLiked,
  likeCount,
  comments,
  createdAt,
}) => {
  const [isLikedInState, setIsLiked] = useState(isLiked);
  const [likeCountInState, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const comment = useInput('');

  const slide = useCallback(() => {
    const numberOfFiles = files.length;
    if (currentItem === numberOfFiles - 1) {
      setTimeout(() => setCurrentItem(0), 4000);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 4000);
    }
  }, [currentItem, files.length]);

  useEffect(() => {
    slide();
  }, [currentItem, slide]);

  return (
    <PostPresenter
      user={user}
      files={files}
      location={location}
      caption={caption}
      isLiked={isLikedInState}
      likeCount={likeCountInState}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setLikeCount={setLikeCount}
      currentItem={currentItem}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likeCount: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default PostContainer;
