import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Loader from '../../Components/Loader';
import Avatar from '../../Components/Avatar';
import BoldText from '../../Components/BoldText';
import FollowButton from '../../Components/FollowButton';
import SquarePost from '../../Components/SquarePost';

const Wrapper = styled.div`
  min-height: 73vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin-left: 1rem;
  }
`;

const Username = styled.span`
  font-size: 1.6rem;
  display: block;
`;

const Counts = styled.ul`
  display: flex;
  margin: 1rem 0px;
`;

const Count = styled.li`
  font-size: 1rem;
  &:not(:last-child) {
    margin-right: 0.6rem;
  }
`;

const FullName = styled(BoldText)`
  font-size: 1rem;
`;

const Bio = styled.p`
  margin: 0.625rem 0;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 18rem);
  grid-template-rows: 18rem;
  grid-gap: 2rem;
  grid-auto-rows: 18rem;
`;

export default ({ loading, data }) => {
  if (loading === true) {
    return (
      <Wrapper style={{ display: 'flex', alignItems: 'center' }}>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.viewUser) {
    const {
      viewUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isMyself,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>
            {fullName} (@{username}) | LikeLikes
          </title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>
              {!isMyself && <FollowButton isFollowing={isFollowing} id={id} />}
            </UsernameRow>
            <Counts>
              <Count>
                <BoldText text={String(postsCount)} />
                {postsCount === 1 || postsCount === 0 ? ' post' : ' posts'}
              </Count>
              <Count>
                <BoldText text={String(followersCount)} />
                {followersCount === 1 || followersCount === 0
                  ? ' follower'
                  : ' followers'}
              </Count>
              <Count>
                <BoldText text={String(followingCount)} /> following
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map((post) => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  }
  return null;
};
