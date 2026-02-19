import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Album from "./pages/Album";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todo";
import NotFound from "./components/NotFound";
import { API_URL } from "./api.js";

axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/me`);
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} error={error} />} />
        <Route path="/album" element={<Album />} />
        <Route
          path="/todos"
          element={user ? <Todos /> : <Navigate to="/todos" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
