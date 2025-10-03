# 🛒 E-Commerce API Endpoints

This document describes all REST API endpoints required for a full eCommerce application.

---

## 🔐 Authentication & Users
| Method | Endpoint              | Description |
|--------|----------------------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user & return token |
| GET    | `/api/auth/me`       | Get current user profile |
| PUT    | `/api/users/:id`     | Update user info |
| DELETE | `/api/users/:id`     | Delete user |
| GET    | `/api/users` (Admin) | List all users |

---

## 🛍️ Products
| Method | Endpoint               | Description |
|--------|------------------------|-------------|
| GET    | `/api/products`        | Get all products (filter, search, paginate) |
| GET    | `/api/products/:id`    | Get single product details |
| POST   | `/api/products`        | Create new product (Admin) |
| PUT    | `/api/products/:id`    | Update product |
| DELETE | `/api/products/:id`    | Delete product |

---

## 📂 Categories
| Method | Endpoint                 | Description |
|--------|--------------------------|-------------|
| GET    | `/api/categories`        | Get all categories |
| POST   | `/api/categories`        | Create category |
| PUT    | `/api/categories/:id`    | Update category |
| DELETE | `/api/categories/:id`    | Delete category |

---

## 🛒 Cart
| Method | Endpoint                   | Description |
|--------|----------------------------|-------------|
| GET    | `/api/cart`                | Get current user’s cart |
| POST   | `/api/cart`                | Add item to cart |
| PUT    | `/api/cart/:itemId`        | Update item quantity |
| DELETE | `/api/cart/:itemId`        | Remove item from cart |
| DELETE | `/api/cart`                | Clear cart |

---

## 📦 Orders
| Method | Endpoint                   | Description |
|--------|----------------------------|-------------|
| POST   | `/api/orders`              | Create new order |
| GET    | `/api/orders`              | Get user’s orders |
| GET    | `/api/orders/:id`          | Get single order |
| GET    | `/api/admin/orders` (Admin)| Get all orders |
| PUT    | `/api/orders/:id/status` (Admin)| Update order status |

---

## ❤️ Wishlist (Optional)
| Method | Endpoint                   | Description |
|--------|----------------------------|-------------|
| GET    | `/api/wishlist`            | Get wishlist items |
| POST   | `/api/wishlist`            | Add item to wishlist |
| DELETE | `/api/wishlist/:id`        | Remove item from wishlist |

---

## ⭐ Reviews
| Method | Endpoint                           | Description |
|--------|------------------------------------|-------------|
| GET    | `/api/products/:id/reviews`        | Get product reviews |
| POST   | `/api/products/:id/reviews`        | Add new review |
| PUT    | `/api/reviews/:id`                 | Update review |
| DELETE | `/api/reviews/:id`                 | Delete review |

---

## 📊 Admin Dashboard (Optional)
| Method | Endpoint                   | Description |
|--------|----------------------------|-------------|
| GET    | `/api/admin/stats`         | Get sales/users/orders stats |
| GET    | `/api/admin/products`      | Manage products with stock info |
| PUT    | `/api/admin/products/:id/stock` | Update stock |

---

✅ With these endpoints you have **full CRUD coverage** for users, products, categories, cart, orders, wishlist, and reviews.

---

Do you want me to also create a **diagram (visual flow)** of these endpoints (like ERD or REST map) so you can see relationships between them?
