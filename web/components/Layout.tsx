
import styles from '../styles/Layout.module.css';

import Navigiation from "./Navigiation";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children} : LayoutProps) => {
  return (
    <>
      <Navigiation/>
      <div className={styles.container}>
        <main className={`${styles.main} lg:max-w-4xl max-w-full`}>
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}


export default Layout;
