import { useEffect, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "NovaBook Pro 16",
    category: "Laptops",
    price: 64999,
    rating: 4.8,
    icon: "💻",
    description: "Powerful laptop for students, creators and professionals.",
  },
  {
    id: 2,
    name: "SonicPods X",
    category: "Audio",
    price: 4999,
    rating: 4.7,
    icon: "🎧",
    description: "Wireless headphones with immersive sound and long battery life.",
  },
  {
    id: 3,
    name: "PixelMax 5G",
    category: "Mobiles",
    price: 24999,
    rating: 4.6,
    icon: "📱",
    description: "Fast 5G smartphone with a stunning display.",
  },
  {
    id: 4,
    name: "PowerHub Ultra",
    category: "Accessories",
    price: 2999,
    rating: 4.5,
    icon: "🔋",
    description: "Compact fast-charging power hub for all your devices.",
  },
];

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("infyshop-cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem("infyshop-cart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // WISHLIST
  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          INFY<span>SHOP</span>
        </div>

        <div className="searchBox">
          <input
            type="text"
            placeholder="Search products, brands or categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>Search</button>
        </div>

        <nav>
          <button>🏠 Home</button>

          <button>
            ♡ Wishlist ({wishlist.length})
          </button>

          <button
            className="cartButton"
            onClick={() => setShowCart(true)}
          >
            🛒 Cart ({cartCount})
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <p>✦ SMART E-COMMERCE • INFY AI</p>

        <h1>
          Shopping that
          <br />
          <span>thinks with you.</span>
        </h1>

        <p className="heroText">
          Discover products, compare choices and find what fits
          your needs with an intelligent shopping experience.
        </p>

        <button
          className="heroButton"
          onClick={() =>
            document
              .getElementById("products")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore Products →
        </button>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <h2>Explore</h2>

        <div className="categoryGrid">
          {[
            ["💻", "Laptops", "Power & productivity"],
            ["📱", "Mobiles", "Stay connected"],
            ["🎧", "Audio", "Sound your way"],
            ["🔌", "Accessories", "Upgrade your setup"],
          ].map(([icon, name, subtitle]) => (
            <button
              key={name}
              onClick={() => setCategory(name)}
            >
              <strong>
                {icon} {name}
              </strong>
              <span>{subtitle}</span>
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="productsSection">
        <div className="sectionTitle">
          <div>
            <p>CURATED FOR YOU</p>
            <h2>Featured Products</h2>
          </div>

          <button onClick={() => setCategory("All")}>
            View All
          </button>
        </div>

        <div className="productGrid">
          {filteredProducts.map((product) => (
            <div className="productCard" key={product.id}>

              <div className="productImage">
                <span>{product.icon}</span>

                <button
                  className="wishlist"
                  onClick={() => toggleWishlist(product.id)}
                >
                  {wishlist.includes(product.id) ? "♥" : "♡"}
                </button>
              </div>

              <div className="productInfo">
                <small>{product.category}</small>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <div className="rating">
                  ⭐ {product.rating}
                </div>

                <div className="productBottom">
                  <strong>
                    ₹{product.price.toLocaleString("en-IN")}
                  </strong>

                  <button
                    onClick={() => addToCart(product)}
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CART OVERLAY */}
      {showCart && (
        <div
          className="cartOverlay"
          onClick={() => setShowCart(false)}
        >
          <div
            className="cartPanel"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cartHeader">
              <div>
                <p>YOUR SHOPPING BAG</p>
                <h2>Cart ({cartCount})</h2>
              </div>

              <button
                className="closeCart"
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="emptyCart">
                <div>🛒</div>
                <h3>Your cart is empty</h3>
                <p>
                  Add something you love and it will appear here.
                </p>

                <button
                  onClick={() => {
                    setShowCart(false);
                    document
                      .getElementById("products")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cartItems">
                  {cart.map((item) => (
                    <div className="cartItem" key={item.id}>

                      <div className="cartIcon">
                        {item.icon}
                      </div>

                      <div className="cartDetails">
                        <h3>{item.name}</h3>

                        <p>
                          ₹{item.price.toLocaleString("en-IN")}
                        </p>

                        <div className="quantity">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="itemRight">
                        <strong>
                          ₹
                          {(
                            item.price * item.quantity
                          ).toLocaleString("en-IN")}
                        </strong>

                        <button
                          className="remove"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          Remove
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                <div className="cartFooter">

                  <div className="totalRow">
                    <span>Subtotal</span>
                    <strong>
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <p className="delivery">
                    🚚 Free delivery on this order
                  </p>

                  <button className="checkout">
                    Proceed to Checkout →
                  </button>

                  <button
                    className="clearCart"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>

                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;