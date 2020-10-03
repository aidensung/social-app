import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const getSize = (size) => {
  let number;
  if (size === 'sm') {
    number = 2;
  } else if (size === 'md') {
    number = 3;
  } else if (size === 'lg') {
    number = 9.5;
  }
  return `
    width:${number}rem;
    height:${number}rem;
  `;
};

const Container = styled.div`
  ${(props) => getSize(props.size)}
  background-image: url(${(props) => props.url});
  background-size: cover;
  border-radius: 50%;
`;

const Avatar = ({ size = 'sm', url, className }) => {
  return <Container className={className} size={size} url={url} />;
};

Avatar.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  url: PropTypes.string.isRequired,
};

export default Avatar;
