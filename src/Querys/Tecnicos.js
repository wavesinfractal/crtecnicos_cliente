import gql from "graphql-tag";

export const QueryTecnicos = gql`  
query getUsuarios(
$limite: Int,
$offset: Int,
$buscar: [DataInput]
)

{getUsuarios(
limite: $limite
offset: $offset
buscar: $buscar){
id
movil
email
nombre  {nombre apellido1 apellido2}   
imagenes{
        tipo
        url
      }
rol
foto
zona {provincia canton distrito}
direccion
empresa
nacimiento
tecnicoid { 
 id      
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

mensaje
}
}
`;
