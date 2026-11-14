import type { ConsumptionInput, CalculationResult, BrandConfig } from "../types/solar";

const HSH = 4.6; // Horas Sol Pico medias anuales en Huelva (kWh/m2/dia)
const PANEL_EFF = 0.20; // Rendimiento medio del sistema (perdidas cableado, inversor, etc.)
const PRODUCTION_FACTOR = HSH * (1 - PANEL_EFF); // ~3.68 kWh/kWp/dia efectivos
const DAYS = 365;

export function runSimulation(
  input: ConsumptionInput,
  brand: BrandConfig
): CalculationResult {
  const annualConsumption = input.monthlyConsumption * 12;
  const dailyConsumption = annualConsumption / DAYS;

  // Potencia PV necesaria para cubrir el % deseado
  const annualProductionPerKwp = PRODUCTION_FACTOR * DAYS;
  const requiredKwp = (annualConsumption * input.coverageRatio) / annualProductionPerKwp;
  const pvKwp = Math.round(requiredKwp * 10) / 10;

  // Produccion anual real con la potencia redondeada
  const annualProduction = pvKwp * annualProductionPerKwp;

  // --- SIN BATERIA ---
  // Autoconsumo directo tipico: 30% de lo producido
  const selfNoBat = Math.min(annualProduction * 0.30, annualConsumption);
  const exportNoBat = annualProduction - selfNoBat;
  const gridNoBat = annualConsumption - selfNoBat;
  const costWithoutPV = annualConsumption * brand.tariffPerKWh;
  const costNoBat = gridNoBat * brand.tariffPerKWh - exportNoBat * brand.feedInTariff;
  const savingsNoBat = costWithoutPV - costNoBat;
  const investNoBat = pvKwp * brand.pvCostPerKwp;
  const paybackNoBat = savingsNoBat > 0 ? investNoBat / savingsNoBat : 99;

  // --- CON BATERIA ---
  // Autoconsumo con bateria: 80% de lo producido
  const batteryKwh = input.includeBattery
    ? Math.round((dailyConsumption * input.autonomyDays) / 0.9 * 2) / 2
    : 0;
  const selfWithBat = Math.min(annualProduction * 0.80, annualConsumption);
  const exportWithBat = annualProduction - selfWithBat;
  const gridWithBat = annualConsumption - selfWithBat;
  const costWithBat = gridWithBat * brand.tariffPerKWh - exportWithBat * brand.feedInTariff;
  const savingsWithBat = costWithoutPV - costWithBat;
  const investWithBat = pvKwp * brand.pvCostPerKwp + batteryKwh * brand.batteryCostPerKWh;
  const paybackWithBat = savingsWithBat > 0 ? investWithBat / savingsWithBat : 99;

  return {
    annualConsumption,
    dailyConsumption,
    pvKwp,
    batteryKwh,
    annualProduction,
    annualSavingsNoBattery: Math.round(savingsNoBat),
    annualSavingsWithBattery: Math.round(savingsWithBat),
    investmentNoBattery: Math.round(investNoBat),
    investmentWithBattery: Math.round(investWithBat),
    paybackNoBattery: Math.round(paybackNoBat * 10) / 10,
    paybackWithBattery: Math.round(paybackWithBat * 10) / 10,
    selfConsumptionNoBattery: Math.round((selfNoBat / annualProduction) * 100),
    selfConsumptionWithBattery: Math.round((selfWithBat / annualProduction) * 100),
  };
}
