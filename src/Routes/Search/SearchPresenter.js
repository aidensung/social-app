import React from 'react';
import styled from 'styled-components';
import BoldText from '../../Components/BoldText';
import Loader from '../../Components/Loader';
import SquarePost from '../../Components/SquarePost';
import UserCard from '../../Components/UserCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 70vh;
`;

const Section = styled.div`
  margin-bottom: 3.125rem;
  display: grid;
  grid-gap: 1.6rem;
  grid-template-columns: repeat(4, 10rem);
  grid-template-rows: 10rem;
  grid-auto-rows: 10rem;
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 12.5rem);
  grid-template-rows: 12.5rem;
  grid-auto-rows: 12.5rem;
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  const avatarDefault =
    'https://cdns.iconmonstr.com/wp-content/assets/preview/2019/240/iconmonstr-cat-4.png';
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <BoldText text={'Search for something! 😜'} />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <BoldText text="No users found" />
          ) : (
            data.searchUser.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar || avatarDefault}
                isMyself={user.isMyself}
              />
            ))
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <BoldText text="No posts found" />
          ) : (
            data.searchPost.map((post) => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};

export default SearchPresenter;
