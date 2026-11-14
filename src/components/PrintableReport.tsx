import React from "react";
import type { CalculationResult, ConsumptionInput, BrandConfig } from "../types/solar";

interface Props {
  input: ConsumptionInput;
  result: CalculationResult;
  brand: BrandConfig;
  includeBattery: boolean;
}

export const PrintableReport: React.FC<Props> = ({ input, result, brand, includeBattery }) => {
  const savings = includeBattery ? result.annualSavingsWithBattery : result.annualSavingsNoBattery;
  const invest = includeBattery ? result.investmentWithBattery : result.investmentNoBattery;
  const payback = includeBattery ? result.paybackWithBattery : result.paybackNoBattery;

  return (
    <div className="p-10 bg-white text-black max-w-2xl mx-auto print:block hidden" style={{ fontFamily: "Arial, sans-serif" }}>
      <h1 className="text-2xl font-bold mb-2" style={{ color: brand.primaryColor }}>
        {brand.companyName}
      </h1>
      <h2 className="text-lg font-semibold mb-6">Informe Tecnico de Dimensionamiento PV + BESS</h2>

      <table className="w-full text-sm mb-6 border-collapse">
        <tbody>
          <tr className="border-b"><td className="py-1 font-semibold">Tipo de inmueble</td><td>{input.propertyType}</td></tr>
          <tr className="border-b"><td className="py-1 font-semibold">Consumo mensual</td><td>{input.monthlyConsumption} kWh</td></tr>
          <tr className="border-b"><td className="py-1 font-semibold">Cobertura deseada</td><td>{(input.coverageRatio * 100).toFixed(0)}%</td></tr>
          <tr className="border-b"><td className="py-1 font-semibold">Potencia PV recomendada</td><td>{result.pvKwp} kWp</td></tr>
          {includeBattery && <tr className="border-b"><td className="py-1 font-semibold">Capacidad BESS</td><td>{result.batteryKwh} kWh</td></tr>}
          <tr className="border-b"><td className="py-1 font-semibold">Ahorro anual estimado</td><td>{savings} EUR</td></tr>
          <tr className="border-b"><td className="py-1 font-semibold">Inversion total</td><td>{invest} EUR</td></tr>
          <tr className="border-b"><td className="py-1 font-semibold">Payback estimado</td><td>{payback} anos</td></tr>
        </tbody>
      </table>

      <div className="text-xs text-gray-500 border-t pt-4 space-y-1">
        <p>Conforme a la normativa REBT vigente. Valores orientativos sujetos a visita tecnica.</p>
        <p>Tarifa de red: {brand.tariffPerKWh} EUR/kWh | Compensacion excedentes: {brand.feedInTariff} EUR/kWh</p>
        <p>Contacto: https://wa.me/{brand.whatsappNumber}</p>
      </div>
    </div>
  );
};
