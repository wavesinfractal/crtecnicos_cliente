import gql from "graphql-tag";

export const MutCrearCodigo = gql`
  mutation CrearCodigo($inputData: InputCodConf) {
    CodConfirmacion(inputData: $inputData)
  }
`;


export const MutEnviarCodigo = gql`
mutation EnviarCodigo($inputData: InputCodConf){
  SendConfirmacion(inputData: $inputData)
}
`;