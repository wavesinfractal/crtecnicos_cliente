import gql from "graphql-tag";
export const queryGetUsuarioActual = gql`
  query {
    usuarioActual {
      movil
      email
      cedula
      nombre
      apellido
      foto    
      tiposervicio
      estado
      mensaje
    }
  }
`;
