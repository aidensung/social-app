import React from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import Input from './Input';
import useInput from '../Hooks/useInput';
import { ExploreEmpty, HeartEmpty, HomeEmpty, Logo, User } from './Icons';
import { useQuery } from '@apollo/client';
import { viewMe } from '../SharedQueries';

const HeaderContainer = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }

  .logo {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.blackColor};

    span {
      font-family: 'Courgette', cursive;
      line-height: 1.5rem;
      font-size: 1.7rem;
      margin-left: 0.8rem;
    }
  }
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 0.9rem;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
  &:focus {
    text-align: left;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const Header = ({ history }) => {
  const search = useInput('');
  const { data } = useQuery(viewMe);
  const onSubmitSearch = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
    search.setValue('');
  };
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/" className="logo">
            <Logo />
            <span>LikeLikes</span>
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSubmitSearch}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search"
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/">
            <HomeEmpty />
          </HeaderLink>
          <HeaderLink to="/explore">
            <ExploreEmpty />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          {!data ? (
            <HeaderLink to="/#">
              <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={`/profile/${data.viewMe.username}`}>
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default withRouter(Header);
