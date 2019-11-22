import gql from "graphql-tag";

export const crearTecnico = gql`
  mutation crearTecnico($inputData: TecnicoInput) {
    crearTecnico(inputData: $inputData) {
      id
      cedula
      nombre
      apellido
      emails {
        email
      }
      telefonos {
        telefono
      }
      ciudad
      direccion
      codpostal
      lineas {
        id
      }
      tarifas {
        detalle
        Monto
      }
      skills
      raking
      zonas {
        id
      }
    }
  }
`;
export const suprimirTecnico = gql`  
mutation eliminarTecnico($id: ID!){
eliminarTecnico(id:$id)}
 `;
