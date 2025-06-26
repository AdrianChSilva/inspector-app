import { useState } from "react";
import { useIncidenceStore } from "../stores/incidenceStore";
import { useNavigate } from "react-router-dom";
import { getCoordinates } from "../utils/mapUtils";
import SmartSelect from "../components/SmartSelect";
import { categoryOptions, subcategoryOptions } from "../constants/categories";
import { useUIStore } from "../stores/uiStore";

const Inspection = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [notes, setNotes] = useState("");
  const [count, setCount] = useState(0);
  const addIncidence = useIncidenceStore((state) => state.addIncidence);
  const triggerReset = useUIStore((state) => state.triggerReset);

  const cleanState = () => {
    setCategory("");
    setSubcategory("");
    setNotes("");
    setCount(0);
  };

  const handleSubmit = async () => {
    if (!category || !subcategory) return;
    const { latitude, longitude } = await getCoordinates();
    const newIncidence = {
      category,
      subcategory,
      notes,
      count,
      latitude,
      longitude,
      createdAt: new Date().toISOString(),
    };
    addIncidence(newIncidence);
    console.log("Incidencia registrada:", newIncidence);
    cleanState();
    triggerReset();
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Registrar incidencia
        </h1>

        <div className="flex flex-col gap-4">
          <SmartSelect
            label="Categoría"
            options={categoryOptions}
            value={category}
            onChange={(val) => {
              setCategory(val);
              setSubcategory("");
            }}
            placeholder="Selecciona categoría"
          />

          {category && subcategoryOptions[category] && (
            <SmartSelect
              label="Subcategoría"
              options={subcategoryOptions[category]}
              value={subcategory}
              onChange={setSubcategory}
              placeholder="Selecciona subcategoría"
            />
          )}

          <textarea
            className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Añadir notas..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Cantidad:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCount(Math.max(0, count - 1))}
                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="w-6 text-center text-sm">{count}</span>
              <button
                type="button"
                onClick={() => setCount(count + 1)}
                className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 px-4 rounded-md text-sm font-medium"
            >
              Registrar
            </button>
            <button
              onClick={() => navigate("/map")}
              className="text-blue-600 underline text-sm"
            >
              Ver incidencias en el mapa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspection;
