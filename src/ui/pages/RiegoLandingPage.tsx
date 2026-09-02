import { SeleccionCultivo } from "../components/SeleccionCultivo";

export default function RiegoLandingPage() {
  return (
    <SeleccionCultivo
      titulo="Registro de riegos"
      subtitulo="Selecciona un terreno y luego el cultivo para registrar o consultar riegos."
      rutaDestino="/riego"
      etiquetaAccion="Registrar riego"
      colorActivo="bg-cyan-600 text-white"
      colorHover="hover:border-cyan-500/50"
    />
  );
}
