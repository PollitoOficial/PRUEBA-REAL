import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategorySidebar from '../components/CategorySidebar';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  // Aquí podrías obtener los productos desde una API o base de datos
  const products = [
    { id: 1, name: 'Producto 1', price: '$10', imageUrl: '/images/product1.jpg' },
    { id: 2, name: 'Producto 2', price: '$20', imageUrl: '/images/product2.jpg' },
  ];

  return (
    <div>
      <Navbar />
      <div className="container">
        <CategorySidebar />
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
