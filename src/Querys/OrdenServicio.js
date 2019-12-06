import gql from "graphql-tag";

export const queryOrdenesServicio = gql`
  query getOrdenesServicio($limite: Int, $offset: Int, $buscar: String) {
    getOrdenesServicio(limite: $limite, offset: $offset, buscar: $buscar) {
      id
      orden
      estado
      fechainicio
      cliente
      tecnico
      serie
      falla
      direccion
      reporte
    }
  }
`;
