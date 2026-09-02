import { SeleccionCultivo } from "../components/SeleccionCultivo";

export default function AbonosLandingPage() {
  return (
    <SeleccionCultivo
      titulo="Registro de abonos"
      subtitulo="Selecciona un terreno y cultivo para registrar fertilizantes."
      rutaDestino="/abonos"
      etiquetaAccion="Gestionar abonos"
      colorActivo="bg-amber-600 text-white"
      colorHover="hover:border-amber-500/50"
    />
  );
}
