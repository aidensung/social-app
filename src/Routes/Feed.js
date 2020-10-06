import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import Loader from '../Components/Loader';
import Post from '../Components/Post';

const FEED_QUERY = gql`
  {
    viewFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 73vh;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | LikeLikes</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.viewFeed &&
        data.viewFeed.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            location={post.location}
            caption={post.caption}
            user={post.user}
            files={post.files}
            isLiked={post.isLiked}
            likeCount={post.likeCount}
            comments={post.comments}
            createdAt={new Date(post.createdAt).toLocaleString()}
          />
        ))}
    </Wrapper>
  );
};
