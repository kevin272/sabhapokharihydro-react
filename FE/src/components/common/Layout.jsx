import { Outlet, useLocation } from "react-router-dom";
import Header1 from "./Header";
import Header from "./Header2";
import Footer from "./Footer";
import RouteEffects from "../../utils/RouteChangeHandler";

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      {isHome ? <Header1 /> : <Header />}

      {/* Re-init vendor animations/plugins on every nav */}
      <RouteEffects />

      {/* Force child pages to unmount/mount on each route */}
      <main key={pathname}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
