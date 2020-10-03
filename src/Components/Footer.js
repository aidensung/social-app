import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  margin: 3rem 0;
`;

const List = styled.ul`
  display: flex;

  span {
    margin-left: 0.5rem;
  }
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">home</Link>
      </ListItem>
      <ListItem>
        <Link href="https://aidensung.github.io/portfolio/" target="_blank">
          portfolio
        </Link>
      </ListItem>
      <ListItem>
        <Link href="https://github.com/aidensung" target="_blank">
          github
        </Link>
      </ListItem>
      <ListItem>
        <Link href="https://www.linkedin.com/in/aidensung/" target="_blank">
          linkedin
        </Link>
      </ListItem>
      <Copyright>&copy; {new Date().getFullYear()} LIKE LIKES</Copyright>
      <span>By Aiden</span>
    </List>
  </Footer>
);
