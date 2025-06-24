import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

const Home = () => {
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Bienvenido, {user?.name}</h1>
      <button
        onClick={() => navigate('/start')}
        className="bg-green-600 text-white py-2 px-4 rounded"
      >
        Iniciar inspección
      </button>
    </div>
  );
}

export default Home