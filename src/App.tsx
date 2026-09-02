import { Routes, Route } from "react-router-dom";

import Login from "./ui/pages/Login";
import RegistroPage from "./ui/pages/RegistroPage";
import EnfermedadesPage from "./ui/pages/EnfermedadesPage";
import NoEncontrada from "./ui/pages/NoEncontrada";
import { RutaProtegida } from "./ui/components/RutaProtegida";
import LayoutPrueba from "./ui/layout/LayoutPrueba";
import { HomePage } from "./ui/pages/HomePage";

import { AnalizadorTierraPage } from "./ui/pages/AnalizadorTierraPage";
import DashboardPage from "./ui/pages/DashboardPage";
import CultivosPage from "./ui/pages/CultivosPage";
import RiegoLandingPage from "./ui/pages/RiegoLandingPage";
import RiegosPage from "./ui/pages/RiegosPage";
import FavoritosPage from "./ui/pages/FavoritosPage";
import AbonosLandingPage from "./ui/pages/AbonosLandingPage";
import AbonosPage from "./ui/pages/AbonosPage";
import AnalisisFotosLandingPage from "./ui/pages/AnalisisFotosLandingPage";
import AnalisisFotosPage from "./ui/pages/AnalisisFotosPage";

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<RegistroPage />} />

            <Route element={<RutaProtegida />}>
                <Route element={<LayoutPrueba />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/cultivos" element={<CultivosPage />} />
                    <Route path="/terrenos/:terrenoId/cultivos" element={<CultivosPage />} />
                    <Route path="/enfermedades" element={<EnfermedadesPage />} />
                    <Route path="/favoritos" element={<FavoritosPage />} />
                    <Route path="/riego" element={<RiegoLandingPage />} />
                    <Route path="/riego/:cultivoId" element={<RiegosPage />} />
                    <Route path="/abonos" element={<AbonosLandingPage />} />
                    <Route path="/abonos/:cultivoId" element={<AbonosPage />} />
                    <Route path="/diagnostico" element={<AnalisisFotosLandingPage />} />
                    <Route path="/diagnostico/:cultivoId" element={<AnalisisFotosPage />} />
                    <Route path="/analizadorTierra" element={<AnalizadorTierraPage />} />
                </Route>
            </Route>

            <Route path="*" element={<NoEncontrada />} />
        </Routes>
    );
}
