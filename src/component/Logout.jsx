import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    alert("Logged out successfully!");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      Logout
    </button>
  );
}

export default Logout;
