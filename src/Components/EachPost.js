import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import Post from './Post';
import Loader from './Loader';

const Wrapper = styled.div`
  min-height: 73vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VIEW_FULL_POST = gql`
  query viewFullPost($id: String!) {
    viewFullPost(id: $id) {
      id
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      location
      caption
      isLiked
      likeCount
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

const EachPost = ({
  match: {
    params: { postId },
  },
}) => {
  const { data, loading } = useQuery(VIEW_FULL_POST, {
    variables: { id: postId },
  });
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  if (!loading && data && data.viewFullPost) {
    const {
      viewFullPost: {
        id,
        location,
        caption,
        user,
        files,
        isLiked,
        likeCount,
        comments,
        createdAt,
      },
    } = data;
    return (
      <Wrapper>
        <Post
          key={id}
          id={id}
          location={location}
          caption={caption}
          user={user}
          files={files}
          isLiked={isLiked}
          likeCount={likeCount}
          comments={comments}
          createdAt={new Date(createdAt).toLocaleString()}
        />
      </Wrapper>
    );
  }
  return null;
};

export default EachPost;
