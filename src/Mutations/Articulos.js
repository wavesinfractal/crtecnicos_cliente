import gql from "graphql-tag";

export const NuevoArticulo = gql`
  mutation crearArticulo($input: ArticuloInput) {
    crearArticulo(inputData: $input) {
      id
      serie
      modelo
      historial
      imagenes {
        imagen
      }
      proxmantenimiento
    }
  }
`;
