export interface ConsumptionInput {
  monthlyConsumption: number;
  coverageRatio: number;
  includeBattery: boolean;
  autonomyDays: number;
  propertyType: string;
}

export interface CalculationResult {
  annualConsumption: number;
  dailyConsumption: number;
  pvKwp: number;
  batteryKwh: number;
  annualSavingsNoBattery: number;
  annualSavingsWithBattery: number;
  investmentNoBattery: number;
  investmentWithBattery: number;
  paybackNoBattery: number;
  paybackWithBattery: number;
  selfConsumptionNoBattery: number;
  selfConsumptionWithBattery: number;
  annualProduction: number;
}

export interface BrandConfig {
  companyName: string;
  primaryColor: string;
  whatsappNumber: string;
  tariffPerKWh: number;
  feedInTariff: number;
  batteryCostPerKWh: number;
  pvCostPerKwp: number;
}
