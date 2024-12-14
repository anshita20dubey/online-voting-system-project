import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Results from "./components/Results";
import Voting from "./components/Voting";
import Home from "./components/Home";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/results" element={<Results />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<AdminLogin/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
