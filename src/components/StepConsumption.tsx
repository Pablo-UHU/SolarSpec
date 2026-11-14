import React from "react";
import type { ConsumptionInput } from "../types/solar";
import { Home, Zap, Battery, Sun } from "lucide-react";

interface Props {
  data: ConsumptionInput;
  onChange: (d: ConsumptionInput) => void;
  onSubmit: () => void;
  primaryColor: string;
}

const PROPERTY_TYPES = [
  { value: "vivienda", label: "Vivienda habitual" },
  { value: "chalet", label: "Chalet / Adosado" },
  { value: "segunda_residencia", label: "Segunda residencia" },
  { value: "local_comercial", label: "Local comercial" },
];

export const StepConsumption: React.FC<Props> = ({ data, onChange, onSubmit, primaryColor }) => {
  const set = (patch: Partial<ConsumptionInput>) => onChange({ ...data, ...patch });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Sun size={24} style={{ color: primaryColor }} />
        Paso 1 &mdash; Perfil de consumo
      </h2>

      <div className="space-y-5">
        {/* Tipo de inmueble */}
        <div>
          <label className="flex items-center gap-2 font-medium mb-1">
            <Home size={18} /> Tipo de inmueble
          </label>
          <select
            className="w-full border rounded-lg p-2.5 bg-white"
            value={data.propertyType}
            onChange={(e) => set({ propertyType: e.target.value })}
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Consumo mensual */}
        <div>
          <label className="flex items-center gap-2 font-medium mb-1">
            <Zap size={18} /> Consumo mensual (kWh)
          </label>
          <input
            type="number"
            min={50}
            max={5000}
            className="w-full border rounded-lg p-2.5"
            value={data.monthlyConsumption}
            onChange={(e) => set({ monthlyConsumption: Math.max(0, Number(e.target.value)) })}
          />
          <p className="text-xs text-gray-500 mt-1">
            Consulta tu factura de la luz. Un hogar medio en Huelva consume 250-350 kWh/mes.
          </p>
        </div>

        {/* Cobertura */}
        <div>
          <label className="flex items-center gap-2 font-medium mb-1">
            <Sun size={18} /> Cobertura deseada: {Math.round(data.coverageRatio * 100)}%
          </label>
          <input
            type="range"
            min={20}
            max={100}
            step={5}
            className="w-full accent-blue-700"
            value={data.coverageRatio * 100}
            onChange={(e) => set({ coverageRatio: Number(e.target.value) / 100 })}
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>20%</span><span>60%</span><span>100%</span>
          </div>
        </div>

        {/* Bateria */}
        <div className="bg-gray-50 rounded-lg p-4">
          <label className="flex items-center gap-2 font-medium cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-700"
              checked={data.includeBattery}
              onChange={(e) => set({ includeBattery: e.target.checked, autonomyDays: e.target.checked ? 2 : 0 })}
            />
            <Battery size={18} /> Incluir bateria (BESS)
          </label>
          {data.includeBattery && (
            <div className="mt-3">
              <label className="text-sm font-medium">Dias de autonomia</label>
              <input
                type="number"
                min={1}
                max={5}
                className="w-full border rounded-lg p-2 mt-1"
                value={data.autonomyDays}
                onChange={(e) => set({ autonomyDays: Math.max(1, Math.min(5, Number(e.target.value))) })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Recomendado: 1-2 dias para uso habitual.
              </p>
            </div>
          )}
        </div>

        {/* Boton */}
        <button
          onClick={onSubmit}
          className="w-full py-3 text-white font-bold rounded-lg text-lg transition hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
        >
          Calcular dimensionamiento
        </button>
      </div>
    </div>
  );
};
