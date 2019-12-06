import gql from "graphql-tag";

export const QueryTecnicos = gql`
  query getTecnicos($buscar: String) {
    getTecnicos(buscar: $buscar) {
      id
      cedula
      movil
      nombre {
        nombre
        apellido1
        apellido2
      }
      email
      telefonos {
        telefono
      }
      zona {
        provincia
        canton
        distrito
      }
      lineas {
        id
      }
      tarifas {
        detalle
        Monto
      }
      skills {
        titulo
        detalle
        fechaInicio
        fechafin
      }
      raking
      zonas {
        provincia
        canton
        horario
      }
    }
  }
`;
