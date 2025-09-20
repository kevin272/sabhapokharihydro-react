import { Outlet, useLocation } from "react-router-dom";
import Header1 from "./Header";
import Header from "./Header2";
import Footer from "./Footer";


export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";


  return (
    <>
      {isHome ? <Header1 /> : <Header />}
      <Outlet />
      <Footer />
    </>
  );
}