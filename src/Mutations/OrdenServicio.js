import gql from "graphql-tag";



export const MutationNuevaOrden = gql`
  mutation crearOrdenServicio($input: OrdenServicioInput) {
    crearOrdenServicio(inputData: $input) {
      id
      orden
      fechainicio
      cliente
      tecnico
      serie
      falla
    }
  }
`;
