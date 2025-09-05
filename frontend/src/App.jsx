import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState(localStorage.getItem("token") ? "dashboard" : "login");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

  return (
    <div className="min-h-screen">
      {page === "login" && (
        <Login 
          onSwitch={() => setPage("register")} 
          onLogin={() => setPage("dashboard")} 
        />
      )}
      {page === "register" && (
        <Register 
          onSwitch={() => setPage("login")} 
          onRegister={() => setPage("dashboard")}
        />
      )}
      {page === "dashboard" && <Dashboard onLogout={handleLogout} />}
    </div>
  );
}

export default App;
