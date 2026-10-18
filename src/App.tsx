import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Portfolio from "./components/Portfolio";
import PointerEffects from "./components/PointerEffects";
import "./App.css";
import "./responsive.css";
const Play = lazy(() => import("./pages/Play"));
export default function App() {
  return <BrowserRouter><PointerEffects /><Routes>
    <Route path="/" element={<Portfolio />} />
    <Route path="/myworks" element={<Portfolio projectsOnly />} />
    <Route path="/play" element={<Suspense fallback={<div className="route-loading" role="status">Loading the chess room…</div>}><Play /></Suspense>} />
    <Route path="*" element={<Portfolio />} />
  </Routes><Analytics /><SpeedInsights /></BrowserRouter>;
}
