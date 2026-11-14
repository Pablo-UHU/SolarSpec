import React from "react";
import type { BrandConfig } from "../types/solar";
import { Settings } from "lucide-react";

interface Props {
  brand: BrandConfig;
  onOpenSettings: () => void;
}

export const Header: React.FC<Props> = ({ brand, onOpenSettings }) => (
  <header
    className="flex items-center justify-between px-6 py-4 text-white shadow-lg"
    style={{ backgroundColor: brand.primaryColor }}
  >
    <div>
      <h1 className="text-2xl font-bold">{brand.companyName}</h1>
      <p className="text-sm opacity-80">Simulador de Dimensionamiento PV + BESS</p>
    </div>
    <button
      onClick={onOpenSettings}
      className="p-2 rounded-full hover:bg-white/20 transition"
      title="Configurar marca blanca"
    >
      <Settings size={22} />
    </button>
  </header>
);
