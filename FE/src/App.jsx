import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./components/common/Layout";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import TeamDetails from "./pages/team-details";
import Contact from "./pages/Contact";
import ProjectPage from "./pages/Project";
import BlogDetails from "./pages/blog-details";
import AdminLayout from "./components/Dashboard/AdminLayout";
import AdminDashboard from "./pages/Dashboardpages/AdminDashboard";
import GalleryDashboard from "./pages/Dashboardpages/GalleryDashboard";
import TeamDashboard from "./pages/Dashboardpages/TeamDashboard";
import GalleryForm from "./pages/Dashboardpages/GalleryForm";
import TeamForm from "./pages/Dashboardpages/TeamForm";
import ProjectForm from "./pages/Dashboardpages/ProjectForm";
import ProjectDashboard from "./pages/Dashboardpages/ProjectDashboard";
import ContactDashboard from "./pages/Dashboardpages/ContactDashboard";
import ProjectEdit from "./pages/Dashboardpages/ProjectEdit";
import TeamEdit from "./pages/Dashboardpages/TeamEdit";
import Login from "./pages/Login";

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
        <Route path ="/blog-details" element={<BlogDetails/>} />
        <Route path="/login" element={<Login />} />
        </Route>

        <Route element = {<AdminLayout/>}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/team" element={<TeamDashboard />} />
        <Route path="/admin/team/add" element={<TeamForm />} />
        <Route path="/admin/team/edit/:id" element={<TeamEdit />} />
        <Route path="/admin/gallery" element={<GalleryDashboard />} />
        <Route path="/admin/gallery/add" element={<GalleryForm />} />
        <Route path="/admin/projects" element={<ProjectDashboard />} />
        <Route path="/admin/contact" element={<ContactDashboard/>} />
        <Route path="/admin/projects/add" element={<ProjectForm/>} />
        <Route path="/admin/projects/edit/:id" element={<ProjectEdit/>} />

      </Route>

        <Route
        path="*"
        element={<h2 className="text-center py-5">404 - Page Not Found</h2>}
      />
      </Routes>
    </BrowserRouter>
  );
}
