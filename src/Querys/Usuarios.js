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
      zona
      direccion
      empresa
      nacimiento
      tiposervicio
      mensaje
    }
  }
`;
