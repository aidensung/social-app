import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import Loader from '../Components/Loader';
import SquarePost from '../Components/SquarePost';
import { Helmet } from 'react-helmet';

const Wrapper = styled.div`
  min-height: 73vh;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 13rem);
  grid-template-rows: 13rem;
  grid-gap: 2rem;
  grid-auto-rows: 13rem;
`;

const VIEW_POSTS = gql`
  {
    viewPosts {
      id
      files {
        url
      }
      likeCount
      commentCount
    }
  }
`;

const Explore = () => {
  const { data, loading } = useQuery(VIEW_POSTS);
  if (loading) {
    return (
      <Wrapper style={{ display: 'flex', alignItems: 'center' }}>
        <Helmet>
          <title>Explore | LikeLikes</title>
        </Helmet>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.viewPosts) {
    const { viewPosts: posts } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>Explore | LikeLikes</title>
        </Helmet>
        <Posts>
          {posts &&
            posts.map((post) => (
              <Link key={post.id} to={`/post/${post.id}`}>
                <SquarePost
                  key={post.id}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  file={post.files[0]}
                />
              </Link>
            ))}
        </Posts>
      </Wrapper>
    );
  }
};

export default withRouter(Explore);
