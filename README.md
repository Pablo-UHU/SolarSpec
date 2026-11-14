# ☀️ SolarSpec — Simulador Técnico de Dimensionamiento Fotovoltaico y BESS (White-Label)

Plataforma web de ingeniería solar y almacenamiento en baterías modulares LFP (**BESS**) adaptada a la operativa comercial de pymes instaladoras de **Ayamonte y la provincia de Huelva (Andalucía)**.

Diseñada con arquitectura **White-Label (Marca Blanca)** sin backend: permite a instaladores configurar identidad corporativa, tarifas y números de WhatsApp Business directamente en la URL codificada en Base64.

---

## 🚀 Características Principales

1. **Pre-cualificación técnica instantánea (<30 s):**
   - Perfil de consumo por tipología de inmueble (Vivienda habitual, Chalet/Adosado, Segunda residencia en costa, Pequeño comercio).
   - Dimensionamiento de potencia pico ($kW_p$) según radiación solar real de Huelva ($HSP \approx 4.6$ kWh/m²/día, $PR \approx 80\%$).

2. **Argumentario visual y financiero para Baterías (BESS):**
   - Comparativa económica entre compensación de excedentes (~0,06 €/kWh) vs. compra en red (~0,17 €/kWh).
   - Cálculo automático de capacidad óptima de batería LFP en función del consumo diario y días de autonomía deseados.
   - Gráficas interactivas de retorno de inversión (Payback) y porcentaje de autoconsumo e independencia energética.

3. **Arquitectura White-Label Zero-Backend:**
   - Panel de personalización en modal: nombre de empresa, color corporativo (Hex), número de WhatsApp y tarifas energéticas.
   - Generación de enlace demo permanente con estado empaquetado en URL (`?empresa=...`).

4. **Captura de Leads y Presupuestos:**
   - Generación de mensaje técnico formateado listo para enviar por **WhatsApp Business**.
   - Plantilla de informe técnico A4 para impresión (`@media print`) conforme a las directrices de seguridad del **REBT**.

---

## 🛠️ Stack Tecnológico

- **Framework:** React 18
- **Lenguaje:** TypeScript 5 (tipado estricto)
- **Bundler:** Vite 5
- **Estilos:** Tailwind CSS 3
- **Iconografía:** Lucide React
- **Visualización de Datos:** Recharts (BarChart & PieChart responsivos)

---

## 📂 Estructura del Proyecto

```text
SolarSpec/
├── public/
├── src/
│   ├── config/
│   │   └── brandConfig.ts        # Configuración por defecto y codificador/decodificador Base64
│   ├── utils/
│   │   ├── solarCalculations.ts  # Motor físico y financiero fotovoltaico/BESS
│   │   └── whatsappFormatter.ts  # Formateo de propuesta técnica para WhatsApp
│   ├── components/
│   │   ├── Header.tsx            # Cabecera dinámica corporativa
│   │   ├── StepConsumption.tsx   # Paso 1: Perfil de inmueble y factura
│   │   ├── StepResults.tsx       # Paso 2: KPIs, comparativa y gráficos interactivos
│   │   ├── StepLeadCapture.tsx   # Paso 3: WhatsApp direct y link marca blanca
│   │   ├── PrintableReport.tsx   # Reporte técnico A4 para imprimir
│   │   └── WhiteLabelModal.tsx   # Panel de configuración de instalador
│   ├── types/
│   │   └── solar.ts              # Modelos de datos TypeScript
│   ├── App.tsx                   # Orquestador del flujo
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Directivas Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 💻 Instalación y Uso Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/SolarSpec.git
cd SolarSpec

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción
npm run build
```

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Consulta `LICENSE` para más detalles.
