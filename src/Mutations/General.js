import gql from "graphql-tag";

export const MutationLogin = gql`
  mutation login($movil: Int!, $password: String!) {
    login(movil: $movil, password: $password) {
      token
      mensaje
    }
  }
`;
