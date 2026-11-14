import React from "react";
import { formatWhatsAppMessage } from "../utils/whatsappFormatter";
import { encodeBrandConfig } from "../config/brandConfig";
import type { ConsumptionInput, CalculationResult, BrandConfig } from "../types/solar";
import { MessageCircle, Copy, RotateCcw, Link, Printer } from "lucide-react";

interface Props {
  input: ConsumptionInput;
  result: CalculationResult;
  brand: BrandConfig;
  includeBattery: boolean;
  onReset: () => void;
  primaryColor: string;
}

export const StepLeadCapture: React.FC<Props> = ({
  input, result, brand, includeBattery, onReset, primaryColor,
}) => {
  const message = formatWhatsAppMessage(input, result, brand, includeBattery);
  const waLink = "https://wa.me/" + brand.whatsappNumber + "?text=" + encodeURIComponent(message);
  const demoUrl = window.location.origin + window.location.pathname + "?empresa=" + encodeBrandConfig(brand);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      alert("Mensaje copiado al portapapeles");
    } catch { alert("No se pudo copiar"); }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(demoUrl);
      alert("URL de demo copiada al portapapeles");
    } catch { alert("No se pudo copiar"); }
  };

  const handlePrint = () => window.print();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <MessageCircle size={24} style={{ color: primaryColor }} />
        Paso 3 &mdash; Solicitar visita tecnica
      </h2>

      <p className="text-gray-600">
        Envie el siguiente mensaje al instalador por WhatsApp o comparta la URL de demo
        con cualquier empresa instaladora.
      </p>

      <textarea
        readOnly
        className="w-full h-52 p-3 border rounded-lg bg-gray-50 text-sm font-mono"
        value={message}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => window.open(waLink, "_blank")}
          className="flex items-center justify-center gap-2 py-2.5 text-white font-semibold rounded-lg bg-green-600 hover:bg-green-700 transition"
        >
          <MessageCircle size={18} /> WhatsApp
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 py-2.5 font-semibold rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
        >
          <Copy size={18} /> Copiar
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 py-2.5 font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          <Printer size={18} /> Imprimir
        </button>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 py-2.5 font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          <RotateCcw size={18} /> Reiniciar
        </button>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold flex items-center gap-2 mb-2">
          <Link size={18} /> Enlace Marca Blanca (demo)
        </h3>
        <div className="flex gap-2">
          <input
            readOnly
            className="flex-1 border rounded-lg p-2 text-sm bg-gray-50"
            value={demoUrl}
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <button
            onClick={handleCopyUrl}
            className="px-4 py-2 text-white rounded-lg font-semibold transition hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            Copiar URL
          </button>
        </div>
      </div>
    </div>
  );
};
