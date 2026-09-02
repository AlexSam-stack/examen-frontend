import { useParams } from "react-router-dom";
import Abonos from "../components/Abonos";

export default function AbonosPage() {
  const { cultivoId } = useParams();

  if (!cultivoId) {
    return <p className="text-slate-400">Cultivo no encontrado</p>;
  }

  return <Abonos cultivoId={Number(cultivoId)} />;
}
