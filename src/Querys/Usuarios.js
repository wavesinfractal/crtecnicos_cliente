import gql from "graphql-tag";
export const queryGetUsuarioActual = gql`
  query {
    usuarioActual {
      movil
      email
      cedula
      nombre {nombre apellido1 apellido2}
      foto          
      estado
      mensaje
    }
  }
`;
