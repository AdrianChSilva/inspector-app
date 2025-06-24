import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartInspection = () => {
  const navigate = useNavigate();
  const [district, setDistrict] = useState("");
  const [plan, setPlan] = useState("");

  const handleStart = () => {
    console.log("Iniciando con:", { district, plan });
    navigate("/inspection");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Configuración de Inspección
        </h1>

        <div className="flex flex-col gap-4">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-4 rounded-md text-sm font-medium"
            >
              Iniciar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartInspection;
