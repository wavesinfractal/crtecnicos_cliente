import gql from "graphql-tag";

export const MutationNuevaOrden = gql`
  mutation crearOrdenServicio($inputData: OrdenServicioInput) {
    crearOrdenServicio(inputData: $inputData) {
      id
      pendiente
      revizado
      orden
      estado
      fecha_inicio
      fecha_programacion
      usuario {
        email
      }
      tecnico {      
      nombre{nombre}
      }
      articulo {
        serie
      }
      falla
      direccion
      telefonos
      boletas
      mensaje
    }
  }
`;

export const MutationCancelarOrden = gql`
  mutation cancelarOrdenServicio($id: ID!) {
    cancelarOrdenServicio(id: $id)
  }
`;
