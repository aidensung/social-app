import React from 'react';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import ProfilePresenter from './ProfilePresenter';

const GET_USER = gql`
  query viewUser($username: String!) {
    viewUser(username: $username) {
      id
      avatar
      username
      fullName
      isFollowing
      isMyself
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

const ProfileContainer = ({
  match: {
    params: { username },
  },
}) => {
  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  const [logOut] = useMutation(LOG_OUT);
  return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
};

export default withRouter(ProfileContainer);
