import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import BoldText from './BoldText';
import FollowButton from './FollowButton';
import { Link } from 'react-router-dom';

const Card = styled.div`
  ${(props) => props.theme.whiteBox}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem;
`;

const ExtendedAvatar = styled(Avatar)`
  margin-bottom: 1rem;
`;

const ExtendedLink = styled(Link)`
  color: inherit;
  margin-bottom: 0.625rem;
`;

const UserCard = ({ id, username, isFollowing, url, isMyself }) => (
  <Card>
    <ExtendedAvatar url={url} size={'md'} />
    <ExtendedLink to={`/${username}`}>
      <BoldText text={username} />
    </ExtendedLink>
    {!isMyself && <FollowButton id={id} isFollowing={isFollowing} />}
  </Card>
);

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isMyself: PropTypes.bool.isRequired,
};

export default UserCard;
