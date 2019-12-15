import gql from "graphql-tag";

export const mutationNuevoUsuario = gql`
mutation crearUsuario($inputData: UsuarioInput) {
  crearUsuario(inputData: $inputData) {
id
movil
email
nombre  {nombre apellido1 apellido2}  
rol
foto
tecnicos
articulos
zona {provincia canton distrito}
direccion
empresa
nacimiento
tiposervicio
estado
mensaje
}
  }
`;

export const mutationEditarUsuario = gql`
  mutation actualizarUsuario($inputData: UsuarioInput) {
    actualizarUsuario(inputData: $inputData) {
      id
      movil
      email      
      cedula
      nombre
      apellido      
      direccion   
      nacimiento      
      mensaje
    }
  }
`;
