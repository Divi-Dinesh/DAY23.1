import React, { useState } from 'react';



const ProductList = ({ products, addToCart, removeFromCart }) => {
  return (
    <div>
      <h2>Available Products</h2>
      <ul>
        {products.map((product) => (
          <>
          <img src="https://www.skechers.in/on/demandware.static/-/Sites-skechers_india/default/dw17940ed5/images/large/195969748763-1.jpg" />


          <li key={product.id}>
            <span>{product.name} - {product.description}</span>
            {product.inCart ? (
              <button onClick={() => removeFromCart(product)}>Remove from Cart</button>
            ) : (
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            )}
          </li>
          </>
        ))}
      </ul>
    </div>
  );
};

const ShoppingCart = ({ cart, removeFromCart }) => {
  const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
  
  return (
    <div>
      <h2>Shopping Cart</h2>
      <p>Total Items: {totalItems}</p>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            <span>{product.name} - Quantity: {product.quantity}</span>
            <button onClick={() => removeFromCart(product)}>Remove from Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', description: 'Description 1', price: 10, inCart: false, quantity: 0 },
    { id: 2, name: 'Product 2', description: 'Description 2', price: 15, inCart: false, quantity: 0 },
    // Add more products here
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const updatedProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, inCart: true, quantity: p.quantity + 1 };
      }
      return p;
    });

    setProducts(updatedProducts);

    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };

  const removeFromCart = (product) => {
    const updatedProducts = products.map((p) => {
      if (p.id === product.id) {
        return { ...p, inCart: false, quantity: 0 };
      }
      return p;
    });

    setProducts(updatedProducts);

    const updatedCart = cart.filter((p) => p.id !== product.id);
    setCart(updatedCart);
  };

  return (
    <div>
      <ProductList products={products} addToCart={addToCart} removeFromCart={removeFromCart} />
      <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
      
    </div>
  );
};


export default App;
