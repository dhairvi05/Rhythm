import { Routes, Route } from "react-router-dom";
import Homepage from './components/Homepage.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from "./components/Dashboard.jsx";
import PulliKolam from "./components/PulliKolam.jsx";
import SikkuKolam from "./components/SikkuKolam.jsx";
import MargazhiKolam from "./components/MargazhiKolam.jsx";
import RangoliStyle from "./components/RangoliStyle.jsx";
import KambiKolam from "./components/KambiKolam.jsx";
import PadiKolam from "./components/PadiKolam.jsx";
import KolamDesigner from "./components/KolamDesigner.jsx";
import Kolam from "./components/Kolam.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pullikolam" element={<PulliKolam />} />
        <Route path="/sikkukolam" element={<SikkuKolam />} />
        <Route path="/margazhikolam" element={<MargazhiKolam />} />
        <Route path="/rangolistyle" element={<RangoliStyle />} />
        <Route path="/kambikolam" element={<KambiKolam />} />
        <Route path="/padikolam" element={<PadiKolam />} />
        <Route path="/kolamdesigner" element={<KolamDesigner />} />
        <Route path="/kolam" element={<Kolam />} />
      </Routes>
    </>
  );
}

export default App;
