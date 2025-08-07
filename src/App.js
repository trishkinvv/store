import React, { useState } from 'react';

const App = () => {
  const [currentTab, setCurrentTab] = useState('shop');
  const [cart, setCart] = useState([]);
  const [products] = useState([
    {
      id: 1,
      name: 'T-shirt',
      price: 1299,
      description: 'Хлопковая футболка премиум качества',
      image: 'https://via.placeholder.com/300x400/222222/FFFFFF?text=T-Shirt'
    },
    {
      id: 2,
      name: 'Hoodie',
      price: 3499,
      description: 'Теплый худи из органического хлопка',
      image: 'https://via.placeholder.com/300x400/1A3C34/FFFFFF?text=Hoodie'
    },
    {
      id: 3,
      name: 'Jeans',
      price: 4599,
      description: 'Серые рваные джинсы на низкой посадке',
      image: 'https://via.placeholder.com/300x400/333333/FFFFFF?text=Jeans'
    },
    {
      id: 4,
      name: 'Jacket',
      price: 8999,
      description: 'Черная куртка из натуральной кожи',
      image: 'https://via.placeholder.com/300x400/000000/FFFFFF?text=Jacket'
    }
  ]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const renderTab = () => {
    switch (currentTab) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop products={products} addToCart={addToCart} />;
      case 'cart':
        return <Cart cart={cart} removeFromCart={removeFromCart} total={calculateTotal()} />;
      default:
        return <Shop products={products} addToCart={addToCart} />;
    }
  };

  return (
    <div style={styles.app}>
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} cartCount={cart.length} />
      <main style={styles.main}>
        {renderTab()}
      </main>
      <Footer />
    </div>
  );
};

const Header = ({ currentTab, setCurrentTab, cartCount }) => (
  <header style={styles.header}>
    <div style={styles.logo}>FASHIONSTORE</div>
    <nav>
      <button 
        style={currentTab === 'home' ? styles.activeTab : styles.tab} 
        onClick={() => setCurrentTab('home')}
      >
        Главная
      </button>
      <button 
        style={currentTab === 'shop' ? styles.activeTab : styles.tab} 
        onClick={() => setCurrentTab('shop')}
      >
        Магазин
      </button>
      <button 
        style={currentTab === 'cart' ? styles.activeTab : styles.tab} 
        onClick={() => setCurrentTab('cart')}
      >
        Корзина ({cartCount})
      </button>
    </nav>
  </header>
);

const Home = () => (
  <div style={styles.home}>
    <h1 style={styles.heading}>Добро пожаловать в наш магазин</h1>
    <p style={styles.text}>Лучшая одежда для вашего стиля</p>
    
    <div style={styles.imageGrid}>
      <div style={styles.imageContainer}>
        <img 
          src="/images/zhenshina.jpg" 
          alt="Коллекция одежды" 
          style={styles.homeImage} 
        />
        <div style={styles.imageOverlay}>Новая коллекция</div>
      </div>
      
      <div style={styles.imageContainer}>
        <img 
          src="/images/muzhik.jpg" 
          alt="Специальные предложения" 
          style={styles.homeImage} 
        />
        <div style={styles.imageOverlay}>Рекомендации</div>
      </div>
      
      <div style={styles.imageContainer}>
        <img 
          src="/images/rubashka.jpg" 
          alt="Лучшие бренды" 
          style={styles.homeImage} 
        />
        <div style={styles.imageOverlay}>Эксклюзивные товары</div>
      </div>
    </div>
  </div>
);

const Shop = ({ products, addToCart }) => (
  <div>
    <h2 style={styles.heading}>Каталог товаров</h2>
    <div style={styles.products}>
      {products.map(product => (
        <div key={product.id} style={styles.productCard}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={styles.productImage} 
          />
          <h3 style={styles.productTitle}>{product.name}</h3>
          <p style={styles.productDescription}>{product.description}</p>
          <div style={styles.productFooter}>
            <span style={styles.productPrice}>{product.price} руб.</span>
            <button 
              style={styles.buyButton}
              onClick={() => addToCart(product)}
            >
              В корзину
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Cart = ({ cart, removeFromCart, total }) => (
  <div>
    <h2 style={styles.heading}>Ваша корзина</h2>
    {cart.length === 0 ? (
      <p style={styles.text}>Корзина пуста</p>
    ) : (
      <div>
        <div style={styles.cartItems}>
          {cart.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <img 
                src={item.image} 
                alt={item.name} 
                style={styles.cartImage} 
              />
              <div style={styles.cartInfo}>
                <h3 style={styles.cartTitle}>{item.name}</h3>
                <span style={styles.cartPrice}>{item.price} руб.</span>
              </div>
              <button 
                style={styles.removeButton}
                onClick={() => removeFromCart(item.id)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
        <div style={styles.total}>
          <h3>Итого: {total} руб.</h3>
          <button style={styles.checkoutButton}>Оформить заказ</button>
        </div>
      </div>
    )}
  </div>
);

const Footer = () => (
  <footer style={styles.footer}>
    <p>© 2025 FashionStore. Все права защищены</p>
    <div style={styles.contacts}>
      <span>Телефон: +375 (44) 587-19-89</span>
      <span>Email: trishkin123456789@gmail.com</span>
    </div>
  </footer>
);

// Стили приложения
const styles = {
  app: {
    backgroundColor: '#121212',
    color: '#FFFFFF',
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
  },
  header: {
    backgroundColor: '#1A1A1A',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #2E2E2E',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  tab: {
    backgroundColor: 'transparent',
    color: '#CCCCCC',
    border: 'none',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  activeTab: {
    backgroundColor: '#2E2E2E',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  main: {
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  home: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#E0E0E0',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '350px',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
    }
  },
  homeImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    display: 'block',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
    }
  },
  imageOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(26, 60, 52, 0.85)', // Темно-зеленый с прозрачностью
    color: '#FFFFFF',
    padding: '15px',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  text: {
    fontSize: '18px',
    color: '#B0B0B0',
    marginBottom: '30px',
  },
  imageGrid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '40px',
    flexWrap: 'wrap',
  },
  
  products: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '20px',
  },
  productCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'translateY(-5px)',
    },
  },
  productImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },
  productTitle: {
    padding: '15px 15px 0',
    fontSize: '20px',
    color: '#F5F5F5',
  },
  productDescription: {
    padding: '10px 15px',
    color: '#9E9E9E',
    fontSize: '14px',
  },
  productFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
  },
  productPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  buyButton: {
    backgroundColor: '#2E7D32',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    ':hover': {
      backgroundColor: '#1B5E20',
    },
  },
  cartItems: {
    margin: '20px 0',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
  },
  cartImage: {
    width: '80px',
    height: '100px',
    objectFit: 'cover',
    marginRight: '20px',
    borderRadius: '4px',
  },
  cartInfo: {
    flexGrow: 1,
  },
  cartTitle: {
    margin: '0 0 10px',
    color: '#F5F5F5',
  },
  cartPrice: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#D32F2F',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#B71C1C',
    },
  },
  total: {
    backgroundColor: '#1E1E1E',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '30px',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    ':hover': {
      backgroundColor: '#388E3C',
    },
  },
  footer: {
    backgroundColor: '#1A1A1A',
    padding: '30px',
    textAlign: 'center',
    borderTop: '1px solid #2E2E2E',
    color: '#9E9E9E',
  },
  contacts: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '15px',
    fontSize: '14px',
  },
};

export default App;