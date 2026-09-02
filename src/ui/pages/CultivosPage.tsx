import { useParams } from "react-router-dom";
import { CultivosPorTerreno } from "../components/CultivosPorTerreno";
import { SelectorTerreno } from "../components/SelectorTerreno";

export default function CultivosPage() {
  const { terrenoId } = useParams();

  if (terrenoId) {
    return <CultivosPorTerreno terrenoId={Number(terrenoId)} />;
  }

  return <SelectorTerreno />;
}
