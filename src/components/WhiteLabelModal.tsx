import React, { useState } from "react";
import { encodeBrandConfig } from "../config/brandConfig";
import type { BrandConfig } from "../types/solar";
import { X, Copy } from "lucide-react";

interface Props {
  isOpen: boolean;
  config: BrandConfig;
  onClose: () => void;
  onUpdate: (c: BrandConfig) => void;
}

export const WhiteLabelModal: React.FC<Props> = ({ isOpen, config, onClose, onUpdate }) => {
  const [local, setLocal] = useState<BrandConfig>({ ...config });

  if (!isOpen) return null;

  const set = (patch: Partial<BrandConfig>) => setLocal({ ...local, ...patch });

  const copyUrl = async () => {
    const url = window.location.origin + window.location.pathname + "?empresa=" + encodeBrandConfig(local);
    try {
      await navigator.clipboard.writeText(url);
      alert("URL copiada: " + url);
    } catch { alert("No se pudo copiar"); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold mb-4">Configuracion Marca Blanca</h2>

        <div className="space-y-3 text-sm">
          <Field label="Nombre empresa" value={local.companyName} onChange={(v) => set({ companyName: v })} />
          <Field label="Color primario (hex)" value={local.primaryColor} onChange={(v) => set({ primaryColor: v })} />
          <Field label="WhatsApp (sin +)" value={local.whatsappNumber} onChange={(v) => set({ whatsappNumber: v.replace(/\D/g, "") })} />
          <Field label="Tarifa red (EUR/kWh)" value={String(local.tariffPerKWh)} onChange={(v) => set({ tariffPerKWh: Number(v) || 0 })} type="number" />
          <Field label="Compensacion (EUR/kWh)" value={String(local.feedInTariff)} onChange={(v) => set({ feedInTariff: Number(v) || 0 })} type="number" />
          <Field label="Coste bateria (EUR/kWh)" value={String(local.batteryCostPerKWh)} onChange={(v) => set({ batteryCostPerKWh: Number(v) || 0 })} type="number" />
          <Field label="Coste PV (EUR/kWp)" value={String(local.pvCostPerKwp)} onChange={(v) => set({ pvCostPerKwp: Number(v) || 0 })} type="number" />
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg bg-gray-100 font-semibold hover:bg-gray-200">Cancelar</button>
          <button onClick={() => { onUpdate(local); onClose(); }} className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700">Aplicar</button>
          <button onClick={copyUrl} className="flex items-center justify-center gap-1 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700">
            <Copy size={16} /> URL
          </button>
        </div>
      </div>
    </div>
  );
};

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="font-medium text-gray-600">{label}</span>
      <input
        type={type}
        step={type === "number" ? "0.01" : undefined}
        className="w-full border rounded-lg p-2 mt-0.5"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
