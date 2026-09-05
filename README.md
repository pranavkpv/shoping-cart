# ShoppingCart Application

A responsive e-commerce shopping cart web application built with React 19, TypeScript, Vite, Tailwind CSS, Zustand, TanStack Query, and Zod. Users can browse, search, and filter products from an external API, manage their shopping cart with real-time total and tax calculations, and complete a multi-step checkout flow.

---

## 🚀 Live Demo & Repository

* **Live Application:** [https://your-deployment-url.vercel.app](https://your-deployment-url.vercel.app)
* **GitHub Repository:** [https://github.com/your-username/shopping-cart](https://github.com/your-username/shopping-cart)

---

## 🛠️ Tech Stack & Dependencies

* **Frontend Framework:** React 19 + TypeScript
* **Build Tool:** Vite
* **Package Manager:** pnpm
* **Styling:** Tailwind CSS + Lucide React (Icons) + shadcn/ui components
* **State Management:** Zustand (with `persist` middleware for `localStorage`)
* **Data Fetching & Caching:** TanStack Query (React Query)
* **Schema Validation:** Zod

---

## ✨ Features Completed

### 🛒 Product Browsing & Filtering
* **API Integration:** Fetches real product data from [DummyJSON Products API](https://dummyjson.com/products).
* **Validation:** Validates incoming API responses against a Zod schema before displaying data.
* **Search & Filter:** Search products by title and filter by category and price range using a reusable custom hook.
* **UI Feedback:** Handled loading states, API error messages, and empty filter result states.

### 🛍️ Cart Management & Calculations
* **Global Store:** State managed with Zustand.
* **Item Controls:** Add items, remove items, clear cart, and adjust quantities (enforced minimum of 1 and maximum of 5).
* **Cart Summary Rules:**
  * **Subtotal:** Sum of all item price totals.
  * **Tax:** Fixed 5% tax calculated on the subtotal.
  * **Discount:** Automatic 10% discount applied when subtotal exceeds $100.
  * **Checkout Gate:** Minimum checkout value of $10 required. Checkout button automatically disables with an explanatory message if the subtotal is under $10.
* **Persistence:** Cart state persists across page refreshes using `localStorage`.

### 💳 Multi-step Checkout Flow
1. **Cart Review:** Itemized breakdown and complete pricing details.
2. **Shipping Form:** Built using React state and validated with Zod (full name, email, phone number, street address, city, postal code). Displays real-time error messages under each field.
3. **Payment Summary:** Read-only summary displaying shipping address, item list, tax, discount, and final amount.
4. **Order Completion:** Clicking "Place Order" displays a success screen and clears the cart.

---

## ⚙️ Environment Variables (`.env`)

Environment variables allow you to store configuration settings (like API base URLs) outside your source code. This makes it easy to switch environments (development, staging, production) without altering code.

Create a file named `.env` in the root of your project:

```env
# API Base URL for fetching products
VITE_API_BASE_URL=[https://dummyjson.com](https://dummyjson.com)
