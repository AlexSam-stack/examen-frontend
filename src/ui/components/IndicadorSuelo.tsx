type IndicadorSueloProps = {
  etiqueta: string;
  valor: number | null;
  unidad: string;
  rangoOptimo: string;
};

export function IndicadorSuelo({
  etiqueta,
  valor,
  unidad,
  rangoOptimo,
}: IndicadorSueloProps) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
      <p className="text-xs text-slate-500 uppercase tracking-wide">{etiqueta}</p>
      <p className="text-slate-100 font-semibold text-lg mt-1">
        {valor != null ? `${valor} ${unidad}` : "—"}
      </p>
      <p className="text-xs text-slate-500 mt-1">Óptimo: {rangoOptimo}</p>
    </div>
  );
}
