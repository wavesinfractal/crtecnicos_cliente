import gql from "graphql-tag";

export const BuscarArticulo = gql`

query obtenerArticulo($id:ID){
getArticulo(inputId: $id){ 
  serie 
  modelo 
  imagenes{imagen} 
  historial 
  proxmantenimiento
}

}
`;

export const BuscarArticulos = gql`
  query obtenerArticulos($limite: Int, $offset: Int, $buscar: ArticuloInput) {
    getArticulos(limite: $limite, offset: $offset, buscar: $buscar) {
      serie
      modelo
      imagenes {
        imagen
      }
      historial
      proxmantenimiento
    }
  }
`;
