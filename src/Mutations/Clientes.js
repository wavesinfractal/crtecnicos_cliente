import gql from "graphql-tag";

export const MutationCrearCliente = gql`
  mutation crearCliente($input: ClienteInput) {
    crearCliente(inputData: $input) {
      nombre
      apellido
      empresa
      edad
    }
  }
`;

export const MutationActualizarCliente = gql`
  mutation actualizarClient($input: ClienteInput) {
    actualizarCliente(inputData: $input) {
      id
      nombre
    }
  }
`;
export const MutationEliminarCliente = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`;
