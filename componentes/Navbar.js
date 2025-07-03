import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="INVERMAAS" />
      </div>
      <ul>
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/about">Sobre Nosotros</Link></li>
        <li><Link href="/contact">Contacto</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
