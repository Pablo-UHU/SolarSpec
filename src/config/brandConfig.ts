import type { BrandConfig } from "../types/solar";

export const defaultBrandConfig: BrandConfig = {
  companyName: "Instalaciones Solar Huelva",
  primaryColor: "#1e3a8a",
  whatsappNumber: "34600111222",
  tariffPerKWh: 0.17,
  feedInTariff: 0.06,
  batteryCostPerKWh: 120,
  pvCostPerKwp: 800,
};

export function encodeBrandConfig(config: BrandConfig): string {
  const json = JSON.stringify(config);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decodeBrandConfig(encoded: string): BrandConfig | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(json) as BrandConfig;
  } catch {
    return null;
  }
}
