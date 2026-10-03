import { useState, type ChangeEvent } from "react";
import "./Admin.css";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Smart Watch Pro",
    category: "Wearables",
    price: 2999,
    stock: 42,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Audio",
    price: 2499,
    stock: 28,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
  },
  {
    id: 3,
    name: "Mechanical RGB Keyboard",
    category: "Accessories",
    price: 3499,
    stock: 17,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
  },
  {
    id: 4,
    name: "Ergonomic Wireless Mouse",
    category: "Accessories",
    price: 1499,
    stock: 55,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
  },
  {
    id: 5,
    name: "Fitness Smart Band",
    category: "Wearables",
    price: 1799,
    stock: 36,
    image:
      "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=800",
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    category: "Audio",
    price: 1999,
    stock: 21,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
  },
  {
    id: 7,
    name: "Gaming Mouse",
    category: "Accessories",
    price: 1899,
    stock: 31,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
  },
  {
    id: 8,
    name: "USB-C Fast Charger",
    category: "Accessories",
    price: 999,
    stock: 74,
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800",
  },
];

function Admin() {
  /* =========================
     LOGIN
  ========================= */

  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  /* =========================
     ADMIN PAGES
  ========================= */

  const [activePage, setActivePage] = useState("Dashboard");

  /* =========================
     PRODUCTS
  ========================= */

  const [products, setProducts] =
    useState<Product[]>(initialProducts);

  /* =========================
     PRODUCT FORM
  ========================= */

  const [showProductForm, setShowProductForm] =
    useState(false);

  const [editingProductId, setEditingProductId] =
    useState<number | null>(null);

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] =
    useState("Wearables");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productImage, setProductImage] = useState("");

  const [productError, setProductError] = useState("");

  /* =========================
     LOGIN
  ========================= */

  if (!adminLoggedIn) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">

          <div className="admin-login-logo">
            <span>INFY</span>SHOP
          </div>

          <p className="admin-login-label">
            ADMIN PANEL
          </p>

          <h1>Welcome Back</h1>

          <p className="admin-login-subtitle">
            Sign in to manage INFYSHOP
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (
                email === "admin@infyshop.com" &&
                password === "admin123"
              ) {
                setLoginError("");
                setAdminLoggedIn(true);
              } else {
                setLoginError(
                  "Invalid admin email or password."
                );
              }
            }}
          >
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            {loginError && (
              <div className="admin-login-error">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="admin-login-btn"
            >
              Admin Login →
            </button>
          </form>

          <button
            className="back-store-btn"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            ← Back to Store
          </button>

        </div>
      </div>
    );
  }

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    setAdminLoggedIn(false);
    setEmail("");
    setPassword("");
    setActivePage("Dashboard");
  };

  /* =========================
     MENU
  ========================= */

  const menuItems = [
    "Dashboard",
    "Products",
    "Orders",
    "Customers",
    "Analytics",
    "Settings",
  ];

  /* =========================
     ADD PRODUCT
  ========================= */

  const openAddProduct = () => {
    setEditingProductId(null);

    setProductName("");
    setProductCategory("Wearables");
    setProductPrice("");
    setProductStock("");
    setProductImage("");
    setProductError("");

    setShowProductForm(true);
  };

  /* =========================
     EDIT PRODUCT
  ========================= */

  const openEditProduct = (product: Product) => {
    setEditingProductId(product.id);

    setProductName(product.name);
    setProductCategory(product.category);
    setProductPrice(String(product.price));
    setProductStock(String(product.stock));
    setProductImage(product.image);
    setProductError("");

    setShowProductForm(true);
  };

  /* =========================
     IMAGE UPLOAD
  ========================= */

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setProductError(
        "Please select a valid image file."
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProductImage(reader.result);
        setProductError("");
      }
    };

    reader.readAsDataURL(file);
  };

  /* =========================
     SAVE PRODUCT
  ========================= */

  const saveProduct = () => {
    if (!productName.trim()) {
      setProductError(
        "Please enter product name."
      );
      return;
    }

    if (!productCategory) {
      setProductError(
        "Please select category."
      );
      return;
    }

    if (
      productPrice === "" ||
      Number(productPrice) <= 0
    ) {
      setProductError(
        "Please enter a valid price."
      );
      return;
    }

    if (
      productStock === "" ||
      Number(productStock) < 0
    ) {
      setProductError(
        "Please enter valid stock."
      );
      return;
    }

    if (!productImage) {
      setProductError(
        "Please upload a product image."
      );
      return;
    }

    const updatedProduct: Product = {
      id:
        editingProductId !== null
          ? editingProductId
          : Date.now(),

      name: productName.trim(),

      category: productCategory,

      price: Number(productPrice),

      stock: Number(productStock),

      image: productImage,
    };

    /* EDIT */
    if (editingProductId !== null) {
      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === editingProductId
            ? updatedProduct
            : product
        )
      );
    }

    /* ADD */
    else {
      setProducts((currentProducts) => [
        ...currentProducts,
        updatedProduct,
      ]);
    }

    setShowProductForm(false);
    setEditingProductId(null);
    setProductError("");
  };

  /* =========================
     DELETE PRODUCT
  ========================= */

  const deleteProduct = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== id
      )
    );
  };

  /* =========================
     DASHBOARD VALUES
  ========================= */

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) =>
      total + product.stock,
    0
  );

  /* =========================
     ADMIN PANEL
  ========================= */

  return (
    <div className="admin-layout">

      {/* =====================
          SIDEBAR
      ===================== */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          <span>INFY</span>SHOP
        </div>

        <p className="admin-label">
          ADMIN PANEL
        </p>

        <nav className="admin-nav">

          {menuItems.map((item) => (
            <button
              key={item}
              className={
                activePage === item
                  ? "admin-nav-item active"
                  : "admin-nav-item"
              }
              onClick={() =>
                setActivePage(item)
              }
            >
              {item}
            </button>
          ))}

        </nav>

        <button
          className="admin-logout"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          ← Back to Store
        </button>

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout Admin
        </button>

      </aside>

      {/* =====================
          MAIN
      ===================== */}

      <main className="admin-main">

        {/* TOPBAR */}

        <header className="admin-topbar">

          <div>
            <p className="admin-small">
              INFYSHOP MANAGEMENT
            </p>

            <h1>{activePage}</h1>
          </div>

          <div className="admin-user">

            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>
                Administrator
              </strong>

              <span>
                Admin Account
              </span>
            </div>

          </div>

        </header>

        {/* CONTENT */}

        <section className="admin-content">

          {/* =====================
              DASHBOARD
          ===================== */}

          {activePage === "Dashboard" && (
            <>
              <div className="admin-welcome">

                <div>
                  <p className="admin-small">
                    OVERVIEW
                  </p>

                  <h2>
                    Welcome to INFYSHOP Admin
                  </h2>

                  <p>
                    Manage your products,
                    orders and customers
                    from here.
                  </p>
                </div>

              </div>

              {/* STATISTICS */}

              <div className="stats-grid">

                <div className="admin-card stat-card">
                  <span>
                    Total Products
                  </span>

                  <strong>
                    {totalProducts}
                  </strong>

                  <small>
                    Products in store
                  </small>
                </div>

                <div className="admin-card stat-card">
                  <span>
                    Total Stock
                  </span>

                  <strong>
                    {totalStock}
                  </strong>

                  <small>
                    Items available
                  </small>
                </div>

                <div className="admin-card stat-card">
                  <span>
                    Customers
                  </span>

                  <strong>
                    86
                  </strong>

                  <small>
                    Registered customers
                  </small>
                </div>

                <div className="admin-card stat-card">
                  <span>
                    Revenue
                  </span>

                  <strong>
                    ₹2,48,500
                  </strong>

                  <small>
                    This month
                  </small>
                </div>

              </div>

              {/* INVENTORY */}

              <div className="dashboard-grid">

                <div className="admin-card">

                  <div className="card-header">

                    <div>
                      <p className="admin-small">
                        INVENTORY
                      </p>

                      <h3>
                        Product Inventory
                      </h3>
                    </div>

                  </div>

                  <div className="admin-table-wrap">

                    <table className="admin-table">

                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Stock</th>
                        </tr>
                      </thead>

                      <tbody>

                        {products.map(
                          (product) => (
                            <tr
                              key={product.id}
                            >

                              <td>
                                {product.name}
                              </td>

                              <td>
                                {product.category}
                              </td>

                              <td>
                                ₹{product.price}
                              </td>

                              <td>

                                <span
                                  className={
                                    product.stock < 20
                                      ? "stock-low"
                                      : "stock-good"
                                  }
                                >
                                  {product.stock}
                                </span>

                              </td>

                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                </div>

                {/* RECENT ORDERS */}

                <div className="admin-card">

                  <p className="admin-small">
                    RECENT ACTIVITY
                  </p>

                  <h3>
                    Recent Orders
                  </h3>

                  <div className="activity-list">

                    <div className="activity-item">
                      <strong>
                        Order #INF1001
                      </strong>

                      <span>
                        ₹4,998
                      </span>
                    </div>

                    <div className="activity-item">
                      <strong>
                        Order #INF1002
                      </strong>

                      <span>
                        ₹2,499
                      </span>
                    </div>

                    <div className="activity-item">
                      <strong>
                        Order #INF1003
                      </strong>

                      <span>
                        ₹3,499
                      </span>
                    </div>

                    <div className="activity-item">
                      <strong>
                        Order #INF1004
                      </strong>

                      <span>
                        ₹1,799
                      </span>
                    </div>

                  </div>

                </div>

              </div>
            </>
          )}

          {/* =====================
              PRODUCTS
          ===================== */}

          {activePage === "Products" && (
            <div>

              <div className="products-page-header">

                <div>
                  <p className="admin-small">
                    CATALOG
                  </p>

                  <h2>
                    Products
                  </h2>

                  <p className="products-page-subtitle">
                    Add, edit, delete and
                    manage your products.
                  </p>
                </div>

                <button
                  className="add-product-btn"
                  onClick={openAddProduct}
                >
                  + Add Product
                </button>

              </div>

              <div className="admin-card">

                <div className="admin-table-wrap">

                  <table className="admin-table product-management-table">

                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>ID</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>

                      {products.map(
                        (product) => (
                          <tr
                            key={product.id}
                          >

                            <td>
                              <img
                                className="admin-product-thumb"
                                src={product.image}
                                alt={product.name}
                              />
                            </td>

                            <td>
                              #{product.id}
                            </td>

                            <td>
                              <strong>
                                {product.name}
                              </strong>
                            </td>

                            <td>
                              {product.category}
                            </td>

                            <td>
                              ₹{product.price}
                            </td>

                            <td>

                              <span
                                className={
                                  product.stock < 20
                                    ? "stock-low"
                                    : "stock-good"
                                }
                              >
                                {product.stock}
                              </span>

                            </td>

                            <td>

                              <div className="product-actions">

                                <button
                                  className="edit-product-btn"
                                  onClick={() =>
                                    openEditProduct(
                                      product
                                    )
                                  }
                                >
                                  ✏️ Edit
                                </button>

                                <button
                                  className="delete-product-btn"
                                  onClick={() =>
                                    deleteProduct(
                                      product.id
                                    )
                                  }
                                >
                                  🗑 Delete
                                </button>

                              </div>

                            </td>

                          </tr>
                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>
          )}

          {/* =====================
              ORDERS
          ===================== */}

          {activePage === "Orders" && (
            <div className="admin-card">

              <p className="admin-small">
                SALES
              </p>

              <h2>Orders</h2>

              <div className="admin-table-wrap">

                <table className="admin-table">

                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <td>#INF1001</td>
                      <td>Customer 1</td>
                      <td>₹4,998</td>
                      <td>Delivered</td>
                    </tr>

                    <tr>
                      <td>#INF1002</td>
                      <td>Customer 2</td>
                      <td>₹2,499</td>
                      <td>Processing</td>
                    </tr>

                    <tr>
                      <td>#INF1003</td>
                      <td>Customer 3</td>
                      <td>₹3,499</td>
                      <td>Shipped</td>
                    </tr>

                  </tbody>

                </table>

              </div>

            </div>
          )}

          {/* =====================
              CUSTOMERS
          ===================== */}

          {activePage === "Customers" && (
            <div className="admin-card">

              <p className="admin-small">
                USERS
              </p>

              <h2>Customers</h2>

              <div className="customer-list">

                <div className="customer-row">
                  <strong>
                    Customer 1
                  </strong>

                  <span>
                    customer1@example.com
                  </span>
                </div>

                <div className="customer-row">
                  <strong>
                    Customer 2
                  </strong>

                  <span>
                    customer2@example.com
                  </span>
                </div>

                <div className="customer-row">
                  <strong>
                    Customer 3
                  </strong>

                  <span>
                    customer3@example.com
                  </span>
                </div>

              </div>

            </div>
          )}

          {/* =====================
              ANALYTICS
          ===================== */}

          {activePage === "Analytics" && (
            <div className="admin-card">

              <p className="admin-small">
                REPORTS
              </p>

              <h2>Analytics</h2>

              <div className="stats-grid">

                <div className="admin-card stat-card">
                  <span>
                    Today's Sales
                  </span>

                  <strong>
                    ₹18,450
                  </strong>
                </div>

                <div className="admin-card stat-card">
                  <span>
                    Weekly Sales
                  </span>

                  <strong>
                    ₹76,200
                  </strong>
                </div>

                <div className="admin-card stat-card">
                  <span>
                    Monthly Sales
                  </span>

                  <strong>
                    ₹2,48,500
                  </strong>
                </div>

              </div>

            </div>
          )}

          {/* =====================
              SETTINGS
          ===================== */}

          {activePage === "Settings" && (
            <div className="admin-card">

              <p className="admin-small">
                SYSTEM
              </p>

              <h2>Settings</h2>

              <div className="settings-list">

                <div>
                  <strong>
                    Store Name
                  </strong>

                  <span>
                    INFYSHOP
                  </span>
                </div>

                <div>
                  <strong>
                    Currency
                  </strong>

                  <span>
                    Indian Rupee (₹)
                  </span>
                </div>

                <div>
                  <strong>
                    Store Status
                  </strong>

                  <span>
                    Active
                  </span>
                </div>

              </div>

            </div>
          )}

        </section>

      </main>

      {/* =========================
          ADD / EDIT PRODUCT MODAL
      ========================= */}

      {showProductForm && (
        <div
          className="product-form-overlay"
          onClick={() =>
            setShowProductForm(false)
          }
        >

          <div
            className="product-form-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="product-form-header">

              <div>

                <p className="admin-small">
                  {editingProductId !== null
                    ? "EDIT PRODUCT"
                    : "NEW PRODUCT"}
                </p>

                <h2>
                  {editingProductId !== null
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

              </div>

              <button
                className="product-form-close"
                onClick={() =>
                  setShowProductForm(false)
                }
              >
                ×
              </button>

            </div>

            {/* IMAGE */}

            <div className="image-upload-section">

              <div className="image-preview">

                {productImage ? (
                  <img
                    src={productImage}
                    alt="Product preview"
                  />
                ) : (
                  <div className="image-placeholder">

                    <span>
                      📷
                    </span>

                    <p>
                      No image selected
                    </p>

                  </div>
                )}

              </div>

              <label className="upload-image-btn">

                📷 Upload Product Image

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />

              </label>

              <p className="image-help">
                JPG, PNG or WEBP
              </p>

            </div>

            {/* FORM */}

            <div className="product-form-grid">

              {/* NAME */}

              <div className="product-form-field full-field">

                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) =>
                    setProductName(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* CATEGORY */}

              <div className="product-form-field">

                <label>
                  Category
                </label>

                <select
                  value={productCategory}
                  onChange={(e) =>
                    setProductCategory(
                      e.target.value
                    )
                  }
                >

                  <option value="Wearables">
                    Wearables
                  </option>

                  <option value="Audio">
                    Audio
                  </option>

                  <option value="Accessories">
                    Accessories
                  </option>

                </select>

              </div>

              {/* PRICE */}

              <div className="product-form-field">

                <label>
                  Price (₹)
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="2999"
                  value={productPrice}
                  onChange={(e) =>
                    setProductPrice(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* STOCK */}

              <div className="product-form-field">

                <label>
                  Stock
                </label>

                <input
                  type="number"
                  min="0"
                  placeholder="50"
                  value={productStock}
                  onChange={(e) =>
                    setProductStock(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* ERROR */}

            {productError && (
              <div className="product-form-error">
                {productError}
              </div>
            )}

            {/* BUTTONS */}

            <div className="product-form-actions">

              <button
                className="cancel-product-btn"
                onClick={() =>
                  setShowProductForm(false)
                }
              >
                Cancel
              </button>

              <button
                className="save-product-btn"
                onClick={saveProduct}
              >
                {editingProductId !== null
                  ? "✓ Update Product"
                  : "+ Add Product"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Admin;