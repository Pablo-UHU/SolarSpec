import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { StepConsumption } from "./components/StepConsumption";
import { StepResults } from "./components/StepResults";
import { StepLeadCapture } from "./components/StepLeadCapture";
import { PrintableReport } from "./components/PrintableReport";
import { WhiteLabelModal } from "./components/WhiteLabelModal";
import { defaultBrandConfig, decodeBrandConfig } from "./config/brandConfig";
import { runSimulation } from "./utils/solarCalculations";
import type { ConsumptionInput, CalculationResult, BrandConfig } from "./types/solar";

export default function App() {
  const [brand, setBrand] = useState<BrandConfig>(defaultBrandConfig);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [includeBattery, setIncludeBattery] = useState(false);
  const [input, setInput] = useState<ConsumptionInput>({
    monthlyConsumption: 300,
    coverageRatio: 0.8,
    includeBattery: false,
    autonomyDays: 2,
    propertyType: "vivienda",
  });
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Load brand config from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("empresa");
    if (encoded) {
      const decoded = decodeBrandConfig(encoded);
      if (decoded) setBrand(decoded);
    }
  }, []);

  const handleCalculate = () => {
    const r = runSimulation(input, brand);
    setResult(r);
    setIncludeBattery(input.includeBattery);
    setStep(2);
  };

  const handleToggleBattery = (v: boolean) => {
    setIncludeBattery(v);
    const newInput = { ...input, includeBattery: v, autonomyDays: v ? (input.autonomyDays || 2) : 0 };
    setResult(runSimulation(newInput, brand));
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      <div className="print:hidden">
        <Header brand={brand} onOpenSettings={() => setShowModal(true)} />
      </div>

      <WhiteLabelModal
        isOpen={showModal}
        config={brand}
        onClose={() => setShowModal(false)}
        onUpdate={setBrand}
      />

      <main className="print:hidden pb-12">
        {step === 1 && (
          <StepConsumption
            data={input}
            onChange={setInput}
            onSubmit={handleCalculate}
            primaryColor={brand.primaryColor}
          />
        )}

        {step === 2 && result && (
          <StepResults
            result={result}
            includeBattery={includeBattery}
            onToggleBattery={handleToggleBattery}
            onContinue={() => setStep(3)}
            onReset={handleReset}
            primaryColor={brand.primaryColor}
          />
        )}

        {step === 3 && result && (
          <StepLeadCapture
            input={input}
            result={result}
            brand={brand}
            includeBattery={includeBattery}
            onReset={handleReset}
            primaryColor={brand.primaryColor}
          />
        )}
      </main>

      {/* Printable report - only visible when printing */}
      {result && (
        <PrintableReport
          input={input}
          result={result}
          brand={brand}
          includeBattery={includeBattery}
        />
      )}
    </div>
  );
}
