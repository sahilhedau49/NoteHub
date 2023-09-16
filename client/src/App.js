import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { AuthContextProvider } from "./context/auth";
import Login from "./components/Login";
import ProtectedHome from "./components/ProtectedHome";
import ProtectedSignup from "./components/ProtectedSignup";
import PasswordReset from "./components/PasswordReset";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedHome>
                <Home />
              </ProtectedHome>
            }
          />
          <Route
            path="/signup"
            element={
              <ProtectedSignup>
                <Signup />
              </ProtectedSignup>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedSignup>
                <Login />
              </ProtectedSignup>
            }
          />
          <Route path="/passwordreset" element={<PasswordReset />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
