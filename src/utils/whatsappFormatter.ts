import type { ConsumptionInput, CalculationResult, BrandConfig } from "../types/solar";

function fmt(n: number): string {
  return n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatWhatsAppMessage(
  input: ConsumptionInput,
  result: CalculationResult,
  brand: BrandConfig,
  withBattery: boolean
): string {
  const lines: string[] = [];
  lines.push("*" + brand.companyName + "*");
  lines.push("*Simulacion PV + BESS*\n");
  lines.push("Tipo de inmueble: " + input.propertyType);
  lines.push("Consumo mensual: " + fmt(input.monthlyConsumption) + " kWh");
  lines.push("Cobertura PV deseada: " + fmt(input.coverageRatio * 100) + " %");
  lines.push("\n*Resultados*\n");
  lines.push("Potencia PV recomendada: " + fmt(result.pvKwp) + " kWp");

  if (withBattery) {
    lines.push("Capacidad BESS: " + fmt(result.batteryKwh) + " kWh");
    lines.push("Ahorro anual: " + fmt(result.annualSavingsWithBattery) + " EUR");
    lines.push("Inversion total: " + fmt(result.investmentWithBattery) + " EUR");
    lines.push("Payback estimado: " + fmt(result.paybackWithBattery) + " anos");
    lines.push("Autoconsumo: " + result.selfConsumptionWithBattery + " %");
  } else {
    lines.push("Ahorro anual: " + fmt(result.annualSavingsNoBattery) + " EUR");
    lines.push("Inversion total: " + fmt(result.investmentNoBattery) + " EUR");
    lines.push("Payback estimado: " + fmt(result.paybackNoBattery) + " anos");
    lines.push("Autoconsumo: " + result.selfConsumptionNoBattery + " %");
  }

  lines.push("\nPara mas info o visita tecnica gratuita, responde a este mensaje.");
  lines.push("WhatsApp: https://wa.me/" + brand.whatsappNumber);
  return lines.join("\n");
}
