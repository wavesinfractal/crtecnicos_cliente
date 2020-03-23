import gql from "graphql-tag";

export const BuscarArticulo = gql`
  query obtenerArticulo($id: ID) {
    getArticulo(inputId: $id) {
      id
      serie
      modelo
      descripcion
      imagenes {
        thumb
      }
    }
  }
`;

export const BuscarArticulos = gql`
  query obtenerArticulos($limite: Int, $offset: Int, $buscar: ArticuloInput) {
    getArticulos(limite: $limite, offset: $offset, buscar: $buscar) {
      id
      serie
      modelo
      descripcion
      imagenes {
        thumb
      }
    }
  }
`;
