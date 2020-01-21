import { Query } from "react-apollo";
import { queryGetUsuarioActual } from "../Querys/Usuarios";
import React from "react";

const Session = Component => props => (
  <Query 
  query={queryGetUsuarioActual}
 
  >
 {({ loading, error, data, refetch }) => {
        if(loading) return null
        console.log(data)
        return( <Component {...props} refetch={refetch} session={data.usuarioActual} />);
    }}
  </Query>
);



export default  Session