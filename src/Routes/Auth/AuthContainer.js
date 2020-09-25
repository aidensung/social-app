import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT, LOG_IN } from './AuthQueries';
import { toast } from 'react-toastify';

export default () => {
  const [action, setAction] = useState('logIn');
  const username = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const secret = useInput('');

  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value },
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === 'logIn') {
      if (email.value !== '') {
        try {
          const {
            data: { requestSecret },
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.info('You have no account yet, create one😉');
            setTimeout(() => setAction('signUp'), 3000);
          } else {
            toast.success('Check your email for login secret😆');
            setAction('confirm');
          }
        } catch {
          toast.error("Can't request secret😴 Try again");
        }
      } else {
        toast.error('Email is required😐');
      }
    } else if (action === 'signUp') {
      if (
        username.value !== '' &&
        email.value !== '' &&
        firstName.value !== '' &&
        lastName.value !== ''
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("Can't create account😴");
          } else {
            toast.success('Account created! Log in now😎');
            setTimeout(() => setAction('logIn'), 3000);
          }
        } catch (e) {
          toast.error(e.message.slice(15));
        }
      } else {
        toast.error('All fields are required😐');
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
