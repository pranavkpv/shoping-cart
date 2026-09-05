# ShoppingCart Application

An interactive, fully responsive e-commerce web application where users can browse products, search and filter items, manage a shopping cart with live calculations, and complete a multi-step checkout flow.

---

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Technologies Used](#-technologies-used)
- [API Used](#-api-used)
- [Features Completed](#-features-completed)
- [Setup Instructions](#-setup-instructions)
- [Commands to Run the Project](#-commands-to-run-the-project)
- [Known Limitations](#-known-limitations)

---

## 🌐 Project Overview
The ShoppingCart Application provides a modern shopping experience built with React 19 and TypeScript. It features client-side product filtering, global cart state management with automatic `localStorage` persistence, runtime Zod validations for both API data and checkout forms, and a structured multi-step checkout pipeline.

---

## 💻 Technologies Used
* **Frontend Framework:** React 19[cite: 1]
* **Language:** TypeScript[cite: 1]
* **Build Tool:** Vite[cite: 1]
* **Package Manager:** pnpm[cite: 1]
* **Styling & UI:** Tailwind CSS[cite: 1], Lucide React (Icons), and shadcn/ui components
* **State Management:** Zustand (with `persist` middleware)[cite: 1]
* **Data Fetching & Caching:** TanStack Query (React Query)[cite: 1]
* **Schema Validation:** Zod[cite: 1]

---

## 🔌 API Used
* **Product API:** [DummyJSON Products API](https://dummyjson.com/products)[cite: 1]
* **Data Fetching:** Managed using `@tanstack/react-query` to handle caching, loading indicators, and error states[cite: 1].
* **API Validation:** All incoming product payloads are validated at runtime using Zod schemas before being rendered in the interface[cite: 1].

---

## ✨ Features Completed

### 1. Product Listing & Catalog
* Responsive grid layout displaying product image, title, category, price, and rating[cite: 1].
* State feedback for API loading, server error handling, and empty catalog scenarios.

### 2. Search & Filtering
* Title-based search input.
* Category and price filtering using custom React hooks (`useProductFilter`).
* One-click "Clear Filters" action.

### 3. Cart Management & Persistence
* Global state managed through Zustand.
* Increment, decrement, and item removal actions.
* Quantity limits: Minimum of 1 and maximum of 5 items per product.
* `localStorage` persistence using Zustand `persist` middleware.

### 4. Cart Calculations & Gatekeeper
* Automatic calculation of subtotal, tax (5%), and discount (10% off when subtotal exceeds $100).
* Minimum checkout threshold of $10. Checkout button is disabled with an explanatory banner if the cart value is under $10.

### 5. Multi-Step Checkout Flow
* **Step 1: Cart Review** – Detailed breakdown of items, quantities, and cost breakdown.
* **Step 2: Shipping Form** – Custom React state form validated with Zod (Full Name, Email, Phone Number, Address, City, Postal Code) with inline validation text.
* **Step 3: Payment Summary** – Read-only overview of shipping address, cart contents, and final total.
* **Completion:** Placing an order redirects to an order success screen and clears the cart state.

---

## 🛠️ Setup Instructions

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [pnpm](https://pnpm.io/) package manager (`npm install -g pnpm`)[cite: 1]

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/shopping-cart.git](https://github.com/your-username/shopping-cart.git)
cd shopping-cart
