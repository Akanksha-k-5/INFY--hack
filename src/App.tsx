import { useMemo, useState } from "react";
import "./App.css";
import Admin from "./Admin";
import AIChat from "./AIChat";

type Product = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  stock: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  specifications: Record<string, string>;
};

const products: Product[] = [
  {
    id: 1,
    name: "Smart Watch Pro",
    category: "Wearables",
    subcategory: "Smart Watches",
    price: 2999,
    originalPrice: 4999,
    stock: 42,
    rating: 4.5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    description:
      "Advanced smart watch with fitness tracking, notifications, heart-rate monitoring and long battery life.",
    specifications: {
      Display: "1.9 inch AMOLED",
      Battery: "Up to 7 days",
      Connectivity: "Bluetooth 5.3",
      WaterResistance: "IP68",
    },
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Audio",
    subcategory: "Headphones",
    price: 2499,
    originalPrice: 3999,
    stock: 28,
    rating: 4.7,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    description:
      "Comfortable wireless headphones with powerful sound, deep bass and all-day battery life.",
    specifications: {
      Battery: "30 hours",
      Connectivity: "Bluetooth 5.2",
      Driver: "40mm",
      Charging: "USB-C",
    },
  },
  {
    id: 3,
    name: "Mechanical RGB Keyboard",
    category: "Accessories",
    subcategory: "Keyboards",
    price: 3499,
    originalPrice: 4999,
    stock: 17,
    rating: 4.6,
    reviews: 74,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
    description:
      "Mechanical keyboard with RGB lighting, responsive switches and a durable gaming design.",
    specifications: {
      Switches: "Mechanical Blue",
      Lighting: "RGB",
      Connection: "USB-C",
      Layout: "Full Size",
    },
  },
  {
    id: 4,
    name: "Ergonomic Wireless Mouse",
    category: "Accessories",
    subcategory: "Mice",
    price: 1499,
    originalPrice: 2499,
    stock: 55,
    rating: 4.4,
    reviews: 143,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
    description:
      "Ergonomic wireless mouse designed for comfortable long working sessions.",
    specifications: {
      Connection: "2.4GHz Wireless",
      DPI: "1600 DPI",
      Battery: "12 months",
      Buttons: "6",
    },
  },
  {
    id: 5,
    name: "Fitness Smart Band",
    category: "Wearables",
    subcategory: "Fitness Bands",
    price: 1799,
    originalPrice: 2999,
    stock: 36,
    rating: 4.3,
    reviews: 82,
    image:
      "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?auto=format&fit=crop&w=900&q=80",
    description:
      "Lightweight fitness band with activity tracking, sleep monitoring and smart notifications.",
    specifications: {
      Display: "1.47 inch AMOLED",
      Battery: "14 days",
      Sensors: "Heart Rate + SpO2",
      WaterResistance: "5 ATM",
    },
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    category: "Audio",
    subcategory: "Speakers",
    price: 1999,
    originalPrice: 2999,
    stock: 21,
    rating: 4.6,
    reviews: 111,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80",
    description:
      "Portable Bluetooth speaker with rich audio, powerful bass and compact design.",
    specifications: {
      Battery: "12 hours",
      Connectivity: "Bluetooth 5.0",
      Power: "20W",
      WaterResistance: "IPX7",
    },
  },
  {
    id: 7,
    name: "Gaming Mouse",
    category: "Accessories",
    subcategory: "Mice",
    price: 1899,
    originalPrice: 2999,
    stock: 31,
    rating: 4.5,
    reviews: 67,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80",
    description:
      "High precision gaming mouse with adjustable DPI and responsive buttons.",
    specifications: {
      DPI: "12000 DPI",
      Connection: "USB",
      Buttons: "8 Programmable",
      Lighting: "RGB",
    },
  },
  {
    id: 8,
    name: "USB-C Fast Charger",
    category: "Accessories",
    subcategory: "Chargers",
    price: 999,
    originalPrice: 1499,
    stock: 74,
    rating: 4.4,
    reviews: 205,
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
    description:
      "Compact fast charger with USB-C Power Delivery for phones, tablets and other devices.",
    specifications: {
      Power: "33W",
      Port: "USB-C",
      Protection: "Over Voltage",
      Compatibility: "Universal",
    },
  },
];

const categories = [
  { name: "All", icon: "▦" },
  { name: "Wearables", icon: "⌚" },
  { name: "Audio", icon: "🎧" },
  { name: "Accessories", icon: "🖱️" },
];

const subcategories: Record<string, string[]> = {
  Wearables: ["All", "Smart Watches", "Fitness Bands"],
  Audio: ["All", "Headphones", "Speakers"],
  Accessories: ["All", "Keyboards", "Mice", "Chargers"],
};

function App() {
  // =========================================================
  // ADMIN ROUTE
  // =========================================================

  if (window.location.pathname === "/admin") {
    return <Admin />;
  }

  // =========================================================
  // LOGIN STATE
  // =========================================================

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // =========================================================
  // STORE STATE
  // =========================================================

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  const [sortBy, setSortBy] = useState("featured");
  const [priceFilter, setPriceFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  // =========================================================
  // CHECKOUT STATE
  // =========================================================

  const [showCheckout, setShowCheckout] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [selectedBank, setSelectedBank] = useState("SBI");

  const [paymentError, setPaymentError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // =========================================================
  // DELIVERY ADDRESS
  // =========================================================

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    // DEMO USER
    if (
      cleanEmail === "demo@infyshop.com" &&
      password === "123456"
    ) {
      setLoginError("");
      setIsLoggedIn(true);
      return;
    }

    // ADMIN
    if (
      cleanEmail === "admin@infyshop.com" &&
      password === "admin123"
    ) {
      setLoginError("");
      window.location.href = "/admin";
      return;
    }

    setLoginError(
      "Invalid credentials. Use the demo credentials shown below."
    );
  };

  // =========================================================
  // DEMO LOGIN
  // =========================================================

  const handleDemoLogin = () => {
    setEmail("demo@infyshop.com");
    setPassword("123456");
    setLoginError("");
    setIsLoggedIn(true);
  };

  // =========================================================
  // GUEST LOGIN
  // =========================================================

  const handleGuestLogin = () => {
    setLoginError("");
    setIsLoggedIn(true);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setCart([]);
    setWishlist([]);
    setShowCart(false);
    setShowWishlist(false);
  };

  // =========================================================
  // FILTER PRODUCTS
  // =========================================================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.subcategory.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedSubcategory !== "All") {
      result = result.filter(
        (product) => product.subcategory === selectedSubcategory
      );
    }

    if (priceFilter === "under1000") {
      result = result.filter((product) => product.price < 1000);
    }

    if (priceFilter === "1000to2000") {
      result = result.filter(
        (product) => product.price >= 1000 && product.price <= 2000
      );
    }

    if (priceFilter === "2000to3000") {
      result = result.filter(
        (product) => product.price > 2000 && product.price <= 3000
      );
    }

    if (priceFilter === "above3000") {
      result = result.filter((product) => product.price > 3000);
    }

    if (ratingFilter === "4") {
      result = result.filter((product) => product.rating >= 4);
    }

    if (ratingFilter === "4.5") {
      result = result.filter((product) => product.rating >= 4.5);
    }

    if (ratingFilter === "4.7") {
      result = result.filter((product) => product.rating >= 4.7);
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "discount") {
      result.sort((a, b) => {
        const discountA =
          ((a.originalPrice - a.price) / a.originalPrice) * 100;

        const discountB =
          ((b.originalPrice - b.price) / b.originalPrice) * 100;

        return discountB - discountA;
      });
    }

    return result;
  }, [
    search,
    selectedCategory,
    selectedSubcategory,
    sortBy,
    priceFilter,
    ratingFilter,
  ]);

  // =========================================================
  // CART
  // =========================================================

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      if (currentCart.some((item) => item.id === product.id)) {
        return currentCart;
      }

      return [...currentCart, product];
    });

    setShowCart(true);
  };

  const removeFromCart = (id: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // =========================================================
  // WISHLIST
  // =========================================================

  const toggleWishlist = (id: number) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  // =========================================================
  // CART TOTAL
  // =========================================================

  const cartTotal = cart.reduce(
    (total, product) => total + product.price,
    0
  );

  const cartSavings = cart.reduce(
    (total, product) =>
      total + (product.originalPrice - product.price),
    0
  );

  // =========================================================
  // CHECKOUT
  // =========================================================

  const openCheckout = () => {
    setPaymentError("");
    setShowCart(false);
    setShowCheckout(true);
  };

  const validatePayment = () => {
    if (!fullName.trim()) {
      setPaymentError("Please enter your full name.");
      return false;
    }

    if (!phone.trim() || phone.replace(/\D/g, "").length !== 10) {
      setPaymentError("Please enter a valid 10-digit phone number.");
      return false;
    }

    if (!address.trim()) {
      setPaymentError("Please enter your delivery address.");
      return false;
    }

    if (!city.trim()) {
      setPaymentError("Please enter your city.");
      return false;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      setPaymentError("Please enter a valid 6-digit pincode.");
      return false;
    }

    if (paymentMethod === "UPI") {
      if (!upiId.includes("@")) {
        setPaymentError("Please enter a valid UPI ID.");
        return false;
      }
    }

    if (paymentMethod === "Card") {
      const cleanCard = cardNumber.replace(/\s/g, "");

      if (cleanCard.length !== 16) {
        setPaymentError("Card number must contain 16 digits.");
        return false;
      }

      if (expiry.length !== 5) {
        setPaymentError("Enter expiry in MM/YY format.");
        return false;
      }

      if (cvv.length !== 3) {
        setPaymentError("CVV must contain 3 digits.");
        return false;
      }
    }

    if (paymentMethod === "Net Banking" && !selectedBank) {
      setPaymentError("Please select a bank.");
      return false;
    }

    return true;
  };

  const placeOrder = () => {
    setPaymentError("");

    if (!validatePayment()) {
      return;
    }

    setCart([]);
    setShowCheckout(false);
    setOrderPlaced(true);

    setUpiId("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
  };

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedSubcategory("All");
    setPriceFilter("all");
    setRatingFilter("all");
    setSortBy("featured");
  };

  // =========================================================
  // LOGIN PAGE
  // =========================================================

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">
          <div className="login-logo">
            <span>INFY</span>
            <strong>SHOP</strong>
          </div>

          <p className="login-subtitle">
            Smart shopping. Simple experience.
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-field">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {loginError && (
              <div className="login-error">
                {loginError}
              </div>
            )}

            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>

          <button
            type="button"
            className="guest-btn"
            onClick={handleDemoLogin}
          >
            🚀 Login as Demo User
          </button>

          <button
            type="button"
            className="guest-btn"
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </button>

          <a href="/admin" className="admin-link">
            🔐 Open Admin Panel
          </a>

          <div className="demo-credentials">
            <strong>Demo User</strong>

            <span>
              Email: demo@infyshop.com
            </span>

            <span>
              Password: 123456
            </span>

            <hr />

            <strong>Admin Account</strong>

            <span>
              Email: admin@infyshop.com
            </span>

            <span>
              Password: admin123
            </span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // STORE
  // =========================================================

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <span>INFY</span>
          <strong>SHOP</strong>
        </div>

        <div className="search-box">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              className="search-clear"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>

        <div className="nav-actions">
          <button
            className="nav-icon"
            onClick={() => setShowWishlist(true)}
          >
            ♡
            {wishlist.length > 0 && (
              <span className="badge">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            className="nav-icon"
            onClick={() => setShowCart(true)}
          >
            🛒
            {cart.length > 0 && (
              <span className="badge">
                {cart.length}
              </span>
            )}
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">
            WELCOME TO INFYSHOP
          </p>

          <h1>
            Smart Tech.
            <br />
            Smarter Shopping.
          </h1>

          <p>
            Discover quality gadgets and accessories
            at prices you'll love.
          </p>

          <button
            className="hero-btn"
            onClick={() => {
              document
                .getElementById("products")
                ?.scrollIntoView({
                  behavior: "smooth",
                });
            }}
          >
            Shop Now →
          </button>
        </div>

        <div className="hero-decoration">
          <div className="hero-circle">⌚</div>
          <div className="hero-circle small">🎧</div>
          <div className="hero-circle tiny">⌨️</div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPLORE</p>
            <h2>Shop by Category</h2>
          </div>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`category-card ${
                selectedCategory === category.name
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setSelectedCategory(category.name);
                setSelectedSubcategory("All");
              }}
            >
              <span className="category-icon">
                {category.icon}
              </span>

              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* SUBCATEGORIES */}
      {selectedCategory !== "All" && (
        <section className="subcategory-section">
          <div className="subcategory-list">
            {subcategories[selectedCategory]?.map(
              (subcategory) => (
                <button
                  key={subcategory}
                  className={`subcategory-btn ${
                    selectedSubcategory === subcategory
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedSubcategory(subcategory)
                  }
                >
                  {subcategory}
                </button>
              )
            )}
          </div>
        </section>
      )}

      {/* PRODUCTS */}
      <section
        className="section products-section"
        id="products"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">DISCOVER</p>
            <h2>Featured Products</h2>

            <p className="results-count">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="sort-box">
            <label>Sort:</label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">
                Featured
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rating
              </option>

              <option value="discount">
                Biggest Discount
              </option>
            </select>
          </div>
        </div>

        {/* FILTERS */}
        <div className="filters">
          <select
            value={priceFilter}
            onChange={(e) =>
              setPriceFilter(e.target.value)
            }
          >
            <option value="all">All Prices</option>
            <option value="under1000">
              Under ₹1,000
            </option>
            <option value="1000to2000">
              ₹1,000 - ₹2,000
            </option>
            <option value="2000to3000">
              ₹2,000 - ₹3,000
            </option>
            <option value="above3000">
              Above ₹3,000
            </option>
          </select>

          <select
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(e.target.value)
            }
          >
            <option value="all">All Ratings</option>
            <option value="4">4★ & above</option>
            <option value="4.5">
              4.5★ & above
            </option>
            <option value="4.7">
              4.7★ & above
            </option>
          </select>

          <button
            className="clear-filter"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <div>🔎</div>
            <h3>No products found</h3>
            <p>Try changing your filters or search.</p>

            <button
              className="hero-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => {
              const discount = Math.round(
                ((product.originalPrice -
                  product.price) /
                  product.originalPrice) *
                  100
              );

              const isWishlisted =
                wishlist.includes(product.id);

              return (
                <article
                  className="product-card"
                  key={product.id}
                >
                  <div className="product-image-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <span className="discount-tag">
                      {discount}% OFF
                    </span>

                    <button
                      className={`wishlist-btn ${
                        isWishlisted ? "active" : ""
                      }`}
                      onClick={() =>
                        toggleWishlist(product.id)
                      }
                    >
                      {isWishlisted ? "♥" : "♡"}
                    </button>
                  </div>

                  <div className="product-info">
                    <span className="product-category">
                      {product.category}
                    </span>

                    <h3>{product.name}</h3>

                    <div className="rating">
                      ⭐ {product.rating}
                      <span>
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="price-row">
                      <strong>
                        ₹{product.price.toLocaleString()}
                      </strong>

                      <del>
                        ₹
                        {product.originalPrice.toLocaleString()}
                      </del>
                    </div>

                    <p className="stock">
                      {product.stock > 10
                        ? `✓ ${product.stock} in stock`
                        : `Only ${product.stock} left`}
                    </p>

                    <div className="product-buttons">
                      <button
                        className="details-btn"
                        onClick={() =>
                          setSelectedProduct(product)
                        }
                      >
                        Details
                      </button>

                      <button
                        className="add-cart-btn"
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedProduct(null)
          }
        >
          <div
            className="product-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="modal-close"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ×
            </button>

            <div className="details-grid">
              <div className="details-image">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                />
              </div>

              <div className="details-content">
                <span className="product-category">
                  {selectedProduct.category}
                </span>

                <h2>{selectedProduct.name}</h2>

                <div className="rating large">
                  ⭐ {selectedProduct.rating}
                  <span>
                    {selectedProduct.reviews} reviews
                  </span>
                </div>

                <div className="details-price">
                  ₹
                  {selectedProduct.price.toLocaleString()}
                  <del>
                    ₹
                    {selectedProduct.originalPrice.toLocaleString()}
                  </del>
                </div>

                <div className="stock-box">
                  ✓ {selectedProduct.stock} units available
                </div>

                <p className="description">
                  {selectedProduct.description}
                </p>

                <h4>Specifications</h4>

                <div className="specifications">
                  {Object.entries(
                    selectedProduct.specifications
                  ).map(([key, value]) => (
                    <div key={key}>
                      <span>{key}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>

                <button
                  className="place-order-btn"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WISHLIST DRAWER */}
      {showWishlist && (
        <div
          className="drawer-overlay"
          onClick={() => setShowWishlist(false)}
        >
          <aside
            className="drawer"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="drawer-header">
              <h2>Wishlist</h2>

              <button
                className="modal-close"
                onClick={() =>
                  setShowWishlist(false)
                }
              >
                ×
              </button>
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="empty-state">
                <div>♡</div>
                <h3>Your wishlist is empty</h3>
                <p>
                  Add products you want to save.
                </p>
              </div>
            ) : (
              <div className="drawer-products">
                {wishlistProducts.map((product) => (
                  <div
                    className="drawer-product"
                    key={product.id}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <div>
                      <h4>{product.name}</h4>

                      <strong>
                        ₹
                        {product.price.toLocaleString()}
                      </strong>

                      <button
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        Add to Cart
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        toggleWishlist(product.id)
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      )}

      {/* CART DRAWER */}
      {showCart && (
        <div
          className="drawer-overlay"
          onClick={() => setShowCart(false)}
        >
          <aside
            className="drawer"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="drawer-header">
              <h2>Your Cart</h2>

              <button
                className="modal-close"
                onClick={() =>
                  setShowCart(false)
                }
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-state">
                <div>🛒</div>
                <h3>Your cart is empty</h3>
                <p>
                  Add products to start shopping.
                </p>
              </div>
            ) : (
              <>
                <div className="drawer-products">
                  {cart.map((product) => (
                    <div
                      className="drawer-product"
                      key={product.id}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <div>
                        <h4>{product.name}</h4>

                        <strong>
                          ₹
                          {product.price.toLocaleString()}
                        </strong>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() =>
                          removeFromCart(product.id)
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>
                      ₹{cartTotal.toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>You save</span>
                    <strong className="saving">
                      ₹{cartSavings.toLocaleString()}
                    </strong>
                  </div>

                  <div className="cart-total">
                    <span>Total</span>
                    <strong>
                      ₹{cartTotal.toLocaleString()}
                    </strong>
                  </div>

                  <button
                    className="place-order-btn"
                    onClick={openCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* CHECKOUT */}
      {showCheckout && (
        <div className="modal-overlay">
          <div className="checkout-modal">
            <div className="checkout-header">
              <div>
                <p className="eyebrow">
                  CHECKOUT
                </p>

                <h2>Complete Your Order</h2>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setShowCheckout(false)
                }
              >
                ×
              </button>
            </div>

            {/* DELIVERY */}
            <section className="checkout-section">
              <h3 className="checkout-section-title">
                📍 Delivery Address
              </h3>

              <div className="address-form">
                <div className="form-row">
                  <div className="form-field">
                    <label>Full Name</label>

                    <input
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="form-field">
                    <label>Phone</label>

                    <input
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      placeholder="10-digit phone number"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Address</label>

                  <input
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    placeholder="House number, street, area"
                  />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>City</label>

                    <input
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value)
                      }
                      placeholder="City"
                    />
                  </div>

                  <div className="form-field">
                    <label>Pincode</label>

                    <input
                      value={pincode}
                      onChange={(e) =>
                        setPincode(e.target.value)
                      }
                      placeholder="6-digit pincode"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* PAYMENT */}
            <section className="checkout-section">
              <h3 className="checkout-section-title">
                💳 Payment Method
              </h3>

              <div className="payment-methods">
                {[
                  "UPI",
                  "Card",
                  "Net Banking",
                  "COD",
                ].map((method) => (
                  <button
                    key={method}
                    className={`payment-method ${
                      paymentMethod === method
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      setPaymentMethod(method);
                      setPaymentError("");
                    }}
                  >
                    {method === "UPI" && "📱"}
                    {method === "Card" && "💳"}
                    {method === "Net Banking" && "🏦"}
                    {method === "COD" && "💵"}

                    <span>{method}</span>
                  </button>
                ))}
              </div>

              {paymentMethod === "UPI" && (
                <div className="payment-card-form">
                  <label>UPI ID</label>

                  <input
                    className="payment-input"
                    value={upiId}
                    onChange={(e) =>
                      setUpiId(e.target.value)
                    }
                    placeholder="example@upi"
                  />
                </div>
              )}

              {paymentMethod === "Card" && (
                <div className="payment-card-form">
                  <label>Card Number</label>

                  <input
                    className="payment-input"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(e.target.value)
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />

                  <div className="form-row">
                    <div className="form-field">
                      <label>Expiry</label>

                      <input
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(e.target.value)
                        }
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>

                    <div className="form-field">
                      <label>CVV</label>

                      <input
                        value={cvv}
                        onChange={(e) =>
                          setCvv(e.target.value)
                        }
                        placeholder="123"
                        maxLength={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "Net Banking" && (
                <div className="payment-card-form">
                  <label>Select Bank</label>

                  <select
                    className="payment-input"
                    value={selectedBank}
                    onChange={(e) =>
                      setSelectedBank(e.target.value)
                    }
                  >
                    <option value="SBI">SBI</option>
                    <option value="HDFC">HDFC Bank</option>
                    <option value="ICICI">ICICI Bank</option>
                    <option value="Axis">Axis Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === "COD" && (
                <div className="cod-box">
                  💵 Pay when your order is delivered.
                </div>
              )}

              {paymentError && (
                <div className="checkout-error">
                  {paymentError}
                </div>
              )}
            </section>

            {/* SUMMARY */}
            <section className="checkout-summary">
              <div>
                <span>Items</span>
                <strong>{cart.length}</strong>
              </div>

              <div>
                <span>Delivery</span>
                <strong>FREE</strong>
              </div>

              <div className="checkout-total">
                <span>Total</span>
                <strong>
                  ₹{cartTotal.toLocaleString()}
                </strong>
              </div>

              <button
                className="place-order-btn"
                onClick={placeOrder}
              >
                Place Order →
              </button>

              <p className="demo-payment-note">
                🔒 Demo payment only — no real money
                will be charged.
              </p>
            </section>
          </div>
        </div>
      )}

      {/* ORDER SUCCESS */}
      {orderPlaced && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon">
              ✓
            </div>

            <h2>Order Placed Successfully!</h2>

            <p>
              Thank you for shopping with INFYSHOP.
            </p>

            <div className="delivery-confirmation">
              <strong>
                🚚 Estimated Delivery
              </strong>

              <span>
                3 - 5 business days
              </span>
            </div>

            <div className="success-order">
              Order ID: #
              {Math.floor(
                100000 + Math.random() * 900000
              )}
            </div>

            <button
              className="place-order-btn"
              onClick={() => setOrderPlaced(false)}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* AI */}
      <AIChat />

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <span>INFY</span>
          <strong>SHOP</strong>
        </div>

        <p>
          Smart shopping made simple.
        </p>

        <div className="footer-links">
          <span>Products</span>
          <span>About</span>
          <span>Support</span>
          <span>Privacy</span>
        </div>

        <p className="footer-copy">
          © 2026 INFYSHOP. Hackathon Demo.
        </p>
      </footer>
    </div>
  );
}

export default App;