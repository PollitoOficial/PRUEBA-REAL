import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div>
      <Navbar />
      <header className={styles.hero}>
        <h1>Bienvenidos a INVERMAAS</h1>
        <p>Todo lo que necesitas en un solo lugar</p>
      </header>

      <section className={styles.categories}>
        <h2>Categorías</h2>
        <div className={styles.categoryList}>
          <Link href="/category/ferreteria">
            <a className={styles.category}>Ferretería</a>
          </Link>
          <Link href="/category/alimentos">
            <a className={styles.category}>Alimentos</a>
          </Link>
          <Link href="/category/limpieza">
            <a className={styles.category}>Productos de Limpieza</a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
