import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import NavigationBar from "../components/common/NavigationBar";

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
