import gql from "graphql-tag";

export const QueryTecnicos = gql`
  
query getTecnicos($buscar: String)

{getTecnicos(buscar:$buscar){
    id
    cedula
    nombre
    apellido    
    emails{email}
    telefonos{telefono}
    ciudad
    direccion
    codpostal
    lineas{id}
    tarifas{detalle Monto}
    skills
    raking
    zonas{id}
}}
`;
