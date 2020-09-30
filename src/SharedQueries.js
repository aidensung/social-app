import { gql } from 'apollo-boost';

export const viewMe = gql`
  {
    viewMe {
      username
    }
  }
`;
