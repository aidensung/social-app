import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import Loader from '../Components/Loader';
import Post from './Post';

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
  min-height: 65vh;
`;

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  if (data) {
    console.log(data.viewFeed);
  }
  return (
    <Wrapper>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.viewFeed &&
        data.viewFeed.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            files={post.files}
            location={post.location}
            caption={post.caption}
            isLiked={post.isLiked}
            likeCount={post.likeCount}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        ))}
    </Wrapper>
  );
};
