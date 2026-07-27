import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import NavigationBar from "../components/layout/NavigationBar";

function RootLayout() {
  return (
    <>
      <NavigationBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default RootLayout;
