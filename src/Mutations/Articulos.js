import gql from "graphql-tag";

export const MutNuevoArticulo = gql`
  mutation crearArticulo($inputData: ArticuloInput) {
    crearArticulo(inputData: $inputData) {
      id
      propietario
      serie
      modelo
      descripcion
      imagenes {
        imagen
      }      

    }
  }
`;
