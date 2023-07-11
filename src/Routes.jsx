import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Auth from "./pages/Auth";
import { DataProvider } from "./context/DataContext";

export default function Rotas() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/auth/">
              <Route index element={<Auth />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
