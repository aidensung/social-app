import React from 'react';
import styled from 'styled-components';
import BoldText from '../BoldText';
import Avatar from '../Avatar';
import { HeartFull, HeartEmpty, Comment } from '../Icons';

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 37.5rem;
  margin-bottom: 1.6rem;
`;

const Header = styled.header`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 0.625rem;
`;

const Location = styled.span`
  display: block;
  margin-top: 0.3125rem;
  font-size: 0.75rem;
`;

const Files = styled.div``;

const File = styled.img`
  max-width: 100%;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 1rem;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 0.625rem;
    }
  }
  margin-bottom: 0.625rem;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 0.75rem;
  margin: 0.625rem 0px;
  padding-bottom: 0.625rem;
  border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
`;

export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
}) => (
  <Post>
    <Header>
      <Avatar size="sm" url={avatar} />
      <UserColumn>
        <BoldText text={username} />
        <Location>{location}</Location>
      </UserColumn>
    </Header>
    <Files>
      {files && files.map((file) => <File id={file.id} src={file.url} />)}
    </Files>
    <Meta>
      <Buttons>
        <Button>{isLiked ? <HeartFull /> : <HeartEmpty />}</Button>
        <Button>
          <Comment />
        </Button>
      </Buttons>
      <FatText text={likeCount === 1 ? '1 like' : `${likeCount} likes`} />
      <Timestamp>{createdAt}</Timestamp>
    </Meta>
  </Post>
);
