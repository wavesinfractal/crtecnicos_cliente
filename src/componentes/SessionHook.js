import { useQuery } from "@apollo/react-hooks";
import { queryGetUsuarioActual } from "../Querys/Usuarios";

const SessionHook = () => {
  const { loading, error, data, refetch } = useQuery(queryGetUsuarioActual);
  if (loading) return null;
  if (error) return error;
  
  return {session: data.usuarioActual, refetch: refetch};
};
export default SessionHook;
