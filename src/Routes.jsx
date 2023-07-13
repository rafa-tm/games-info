import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Authentication from "./pages/Authentication";

export default function Rotas() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
