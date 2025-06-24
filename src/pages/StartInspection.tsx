import { useState } from "react";

const StartInspection = () => {
  const [district, setDistrict] = useState("");
  const [plan, setPlan] = useState("");

  const handleStart = () => {
    console.log("Iniciando con:", { district, plan });
    // navegación futura o lógica de inspección
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Configuración de Inspección</h1>
      <select
        className="border p-2 rounded"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      >
        <option value="">Selecciona distrito</option>
        <option value="Centro">Centro</option>
        <option value="Este">Este</option>
        <option value="Oeste">Oeste</option>
      </select>

      {district && (
        <select
          className="border p-2 rounded"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <option value="">Selecciona plano</option>
          <option value="Plano 1">Plano 1</option>
          <option value="Plano 2">Plano 2</option>
        </select>
      )}

      {district && plan && (
        <button
          onClick={handleStart}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Iniciar
        </button>
      )}
    </div>
  );
};

export default StartInspection;
