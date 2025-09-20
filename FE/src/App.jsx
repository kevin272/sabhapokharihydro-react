import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./components/common/Layout";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import TeamDetails from "./pages/team-details";
import Contact from "./pages/Contact";
import ProjectPage from "./pages/Project";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team-details" element={<TeamDetails />} />
        <Route path ="/contact" element={<Contact/>} />
        <Route path ="/project-details" element={<ProjectPage/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
