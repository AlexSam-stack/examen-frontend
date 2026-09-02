import { SeleccionCultivo } from "../components/SeleccionCultivo";

export default function AnalisisFotosLandingPage() {
  return (
    <SeleccionCultivo
      titulo="Diagnóstico por foto"
      subtitulo="Selecciona un cultivo y sube una imagen para analizar su salud."
      rutaDestino="/diagnostico"
      etiquetaAccion="Analizar planta"
      colorActivo="bg-violet-600 text-white"
      colorHover="hover:border-violet-500/50"
    />
  );
}
