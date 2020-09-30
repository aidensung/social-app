import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius: 1px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 1.5rem 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 2.5rem;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  margin-bottom: 0.625rem;

  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 0.4rem;
      }
    }
    button {
      margin-top: 0.625rem;
    }
  }
`;

export default ({
  action,
  username,
  firstName,
  lastName,
  email,
  secret,
  setAction,
  onSubmit,
}) => (
  <Wrapper>
    <Form>
      {action === 'logIn' && (
        <>
          <Helmet>
            <title>Log In | LikeLikes</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder={'Email'}
              value={email.value}
              onChange={email.onChange}
              type="email"
            />
            <Button text={'Log in'} />
          </form>
        </>
      )}
      {action === 'signUp' && (
        <>
          <Helmet>
            <title>Sign Up | LikeLikes</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder={'First Name'}
              value={firstName.value}
              onChange={firstName.onChange}
            />
            <Input
              placeholder={'Last Name'}
              value={lastName.value}
              onChange={lastName.onChange}
            />
            <Input
              placeholder={'Email'}
              value={email.value}
              onChange={email.onChange}
              type="email"
            />
            <Input
              placeholder={'Username'}
              value={username.value}
              onChange={username.onChange}
            />
            <Button text={'Sign up'} />
          </form>
        </>
      )}
      {action === 'confirm' && (
        <>
          <Helmet>
            <title>Confirm Secret | LikeLikes</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder={'Paste your login secret'}
              value={secret.value}
              onChange={secret.onChange}
              required
            />
            <Button text={'Confirm'} />
          </form>{' '}
        </>
      )}
    </Form>
    {action !== 'confirm' && (
      <StateChanger>
        {action === 'logIn' ? (
          <>
            Don't have an account?{' '}
            <Link onClick={() => setAction('signUp')}>Sign up</Link>
          </>
        ) : (
          <>
            Have an account?{' '}
            <Link onClick={() => setAction('logIn')}>Log in</Link>
          </>
        )}
      </StateChanger>
    )}
  </Wrapper>
);
