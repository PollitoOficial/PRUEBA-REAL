import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <section>
        <h1>Contacto</h1>
        <form>
          <input type="text" placeholder="Tu nombre" />
          <input type="email" placeholder="Tu email" />
          <textarea placeholder="Mensaje" />
          <button type="submit">Enviar</button>
        </form>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
