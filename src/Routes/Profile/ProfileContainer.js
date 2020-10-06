import React from 'react';
import { gql } from 'apollo-boost';
import withRouter from 'react-router-dom/withRouter';
import { useQuery } from '@apollo/client';
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

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    return <ProfilePresenter loading={loading} data={data} />;
  },
);
