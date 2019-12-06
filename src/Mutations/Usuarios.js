import gql from "graphql-tag";

export const mutationNuevoUsuario = gql`
  mutation crearUsuario($inputData: UsuarioInput) {
    crearUsuario(inputData: $inputData) {
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
