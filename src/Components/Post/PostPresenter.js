import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import BoldText from '../BoldText';
import Avatar from '../Avatar';
import { HeartFull, HeartEmpty, Comment as CommentIcon } from '../Icons';

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 37.5rem;
  margin-bottom: 1.6rem;
  user-select: none;
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

const Files = styled.div`
  position: relative;
  padding-bottom: 32rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
`;

const File = styled.img`
  height: 32rem;
  position: absolute;
  top: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
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

const Caption = styled.div`
  margin-top: 0.625rem;
  span {
    margin-right: 0.3125rem;
  }
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

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 0.875rem;

  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 0.625rem;
`;

const Comment = styled.li`
  margin-bottom: 0.45rem;
  span {
    margin-right: 0.3125rem;
  }
`;

export default ({
  user: { username, avatar },
  location,
  caption,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  comments,
  commentsInState,
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
      {files &&
        files.map((file, index) => (
          <File
            key={file.id}
            id={file.id}
            src={file.url}
            showing={index === currentItem}
          />
        ))}
    </Files>
    <Meta>
      <Buttons>
        <Button onClick={toggleLike}>
          {isLiked ? <HeartFull /> : <HeartEmpty />}
        </Button>
        <Button>
          <CommentIcon />
        </Button>
      </Buttons>
      <BoldText text={likeCount === 1 ? '1 like' : `${likeCount} likes`} />
      <Caption>
        <BoldText text={username} />
        {caption}
      </Caption>
      {comments && (
        <Comments>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <BoldText text={comment.user.username} />
              {comment.text}
            </Comment>
          ))}

          {commentsInState.map((comment) => (
            <Comment key={comment.id}>
              <BoldText text={comment.user.username} />
              {comment.text}
            </Comment>
          ))}
        </Comments>
      )}
      <Timestamp>{createdAt}</Timestamp>
      <Textarea
        placeholder={'Add a comment...'}
        value={newComment.value}
        onChange={newComment.onChange}
        onKeyPress={onKeyPress}
      />
    </Meta>
  </Post>
);
