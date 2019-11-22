import gql from "graphql-tag";

export const mutationNuevoUsuario = gql`
mutation crearUsuario($inputData: UsuarioInput)
  {crearUsuario(inputData: $inputData){  
        id
        movil
        email
        password
        cedula
        nombre
        apellido
        foto
        zona
        direccion
        empresa
        email
        nacimiento
        tiposervicio
        mensaje

 }
}
`;
