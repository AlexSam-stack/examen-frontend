import { useParams } from "react-router-dom";
import AnalisisFotos from "../components/AnalisisFotos";

export default function AnalisisFotosPage() {
  const { cultivoId } = useParams();

  if (!cultivoId) {
    return <p className="text-slate-400">Cultivo no encontrado</p>;
  }

  return <AnalisisFotos cultivoId={Number(cultivoId)} />;
}
