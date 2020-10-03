import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { FOLLOW, UNFOLLOW } from './FollowButtonQueries';
import FollowButtonPresenter from './FollowButtonPresenter';

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingInState, setIsFollowingInState] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW, { variables: { id } });
  const [unfollowMutation] = useMutation(UNFOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingInState === true) {
      setIsFollowingInState(false);
      unfollowMutation();
    } else {
      setIsFollowingInState(true);
      followMutation();
    }
  };

  return (
    <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingInState} />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButtonContainer;
