import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
  PieChart, Pie, Cell,
} from "recharts";
import type { CalculationResult } from "../types/solar";
import { TrendingUp, Battery, Zap, DollarSign } from "lucide-react";

interface Props {
  result: CalculationResult;
  includeBattery: boolean;
  onToggleBattery: (v: boolean) => void;
  onContinue: () => void;
  onReset: () => void;
  primaryColor: string;
}

const COLORS = ["#2563eb", "#f59e0b", "#10b981", "#ef4444"];

export const StepResults: React.FC<Props> = ({
  result, includeBattery, onToggleBattery, onContinue, onReset, primaryColor,
}) => {
  const savings = includeBattery ? result.annualSavingsWithBattery : result.annualSavingsNoBattery;
  const invest = includeBattery ? result.investmentWithBattery : result.investmentNoBattery;
  const payback = includeBattery ? result.paybackWithBattery : result.paybackNoBattery;
  const selfPct = includeBattery ? result.selfConsumptionWithBattery : result.selfConsumptionNoBattery;

  const barData = [
    { name: "Sin bateria", ahorro: result.annualSavingsNoBattery, inversion: result.investmentNoBattery },
    { name: "Con bateria", ahorro: result.annualSavingsWithBattery, inversion: result.investmentWithBattery },
  ];

  const pieData = [
    { name: "Autoconsumo", value: selfPct },
    { name: "Red", value: 100 - selfPct },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <TrendingUp size={24} style={{ color: primaryColor }} />
        Paso 2 &mdash; Resultados del dimensionamiento
      </h2>

      {/* Toggle bateria */}
      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
        <label className="flex items-center gap-2 cursor-pointer font-medium">
          <input
            type="checkbox"
            className="w-5 h-5 accent-blue-700"
            checked={includeBattery}
            onChange={(e) => onToggleBattery(e.target.checked)}
          />
          <Battery size={18} /> Incluir bateria (BESS)
        </label>
        {includeBattery && (
          <span className="text-sm text-gray-500">
            Capacidad recomendada: <strong>{result.batteryKwh} kWh</strong>
          </span>
        )}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard icon={<Zap size={20} />} label="Potencia PV" value={result.pvKwp + " kWp"} color={primaryColor} />
        <KpiCard icon={<DollarSign size={20} />} label="Ahorro anual" value={savings + " EUR"} color="#10b981" />
        <KpiCard icon={<TrendingUp size={20} />} label="Payback" value={payback + " anos"} color="#f59e0b" />
        <KpiCard icon={<Battery size={20} />} label="Autoconsumo" value={selfPct + "%"} color="#2563eb" />
      </div>

      {/* Graficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-4 h-72">
          <h3 className="text-sm font-semibold mb-2">Comparativa Sin/Con Bateria</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(v: number) => v.toLocaleString("es-ES") + " EUR"} />
              <Legend />
              <Bar dataKey="ahorro" name="Ahorro anual" fill="#10b981" />
              <Bar dataKey="inversion" name="Inversion" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow p-4 h-72">
          <h3 className="text-sm font-semibold mb-2">Autoconsumo vs Red</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => v + "%"} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-center gap-4 pt-2">
        <button
          onClick={onContinue}
          className="px-8 py-3 text-white font-bold rounded-lg transition hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
        >
          Continuar &rarr; Solicitar visita
        </button>
        <button
          onClick={onReset}
          className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

function KpiCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 text-center">
      <div className="flex justify-center mb-1" style={{ color }}>{icon}</div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}
