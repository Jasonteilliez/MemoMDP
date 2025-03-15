import { Outlet } from "react-router-dom";
import styles from './Layout.module.scss';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className={`${styles.main}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout;