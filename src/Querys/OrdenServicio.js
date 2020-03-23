import gql from "graphql-tag";

export const queryOrdenesServicio = gql`
query getOrdenesServicio($limite: Int, $offset: Int, $buscar: [DataInput]) {
  getOrdenesServicio(limite: $limite, offset: $offset, buscar: $buscar) {
    id
    orden
    pendiente
    revizado
    estado
    fecha_inicio
     usuario {
      id
    }
    tecnico {
      id      
      movil
      email
      cedula
      nombre {nombre apellido1 apellido2}
      foto  
      mensaje
      status
    }
    articulo {
      id
    }
    falla
    direccion
    telefonos
    boletas
    mensaje
  }
}
`;
