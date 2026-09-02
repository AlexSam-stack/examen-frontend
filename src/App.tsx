import { Routes, Route } from "react-router-dom";

import Login from "./ui/pages/Login";

import EnfermedadesPage from "./ui/pages/EnfermedadesPage";


import NoEncontrada from "./ui/pages/NoEncontrada";
import { RutaProtegida } from "./ui/components/RutaProtegida";
import LayoutPrueba from "./ui/layout/LayoutPrueba";
import { HomePage } from "./ui/pages/HomePage";
import { CatalogoCultivosPage } from "./ui/pages/CatalogoCultivosPage";
import { AnalizadorTierraPage } from "./ui/pages/AnalizadorTierraPage";


export default function App() {
    return (
        <Routes>

            {/* PÚBLICO */}
            <Route
                path="/login"
                element={<Login />}
            />

            {/* RUTAS PROTEGIDAS */}
            <Route element={<RutaProtegida />}>

                {/* LAYOUT */}
                <Route element={<LayoutPrueba />}>

                    <Route
                        path="/"
                        element={<HomePage />}
                    />

                    <Route
                        path="/catalogo"
                        element={<CatalogoCultivosPage />}
                    />

                    <Route
                        path="/enfermedades"
                        element={<EnfermedadesPage />}
                    />

                    <Route
                        path="/analizadorTierra"
                        element={<AnalizadorTierraPage />}
                    />

                </Route>

            </Route>

            {/* 404 */}
            <Route
                path="*"
                element={<NoEncontrada />}
            />

        </Routes>
    );
}