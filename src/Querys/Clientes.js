import gql from "graphql-tag";
export const QueryClientes = gql`
  query obtenerClientes($limite:Int, $offset:Int){
      getClientes (limite: $limite offset: $offset ){
      id
      nombre
      apellido
      empresa
    
  }
  totalClientes
  }
`;

export const QueryConsultarCliente = gql`
  query consultarCliente($id: ID) {
    getCliente(inputId: $id) {
      id
      nombre
      apellido
      edad
      empresa
      emails {
        email
      }
      tipo
    }
  }
`;
