import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import Logout from "./component/Logout";
import { useSelector } from "react-redux";

function Dashboard() {
  return <h1 className="text-2xl font-bold text-center mt-10">Welcome to the Dashboard!</h1>;
}


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4 flex gap-4 justify-center">
        <Link to="/" className="hover:underline">Register</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/logout" className="hover:underline">Logout</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Register />} />

        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/logout"
          element={isLoggedIn ? <Logout /> : <Navigate to="/login" />}
        />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
