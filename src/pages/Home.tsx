import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

const Home = () => {
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Bienvenido, {user?.name}
        </h1>
        <button
          onClick={() => navigate('/start')}
          className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white py-2 px-4 rounded-md text-sm font-medium"
        >
          Iniciar inspección
        </button>
      </div>
    </div>
  );
}

export default Home