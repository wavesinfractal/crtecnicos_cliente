import { Query } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { queryGetUsuarioActual } from "../Querys/Usuarios";
import React from "react";

const SessionHook = () => {
  const { loading, error, data, refetch } = useQuery(queryGetUsuarioActual);
  if (loading) return null;
  // console.log("refetching")
  return {session: data.usuarioActual, refetch: refetch};
};
export default SessionHook;
