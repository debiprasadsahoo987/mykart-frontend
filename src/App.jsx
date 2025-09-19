import Products from "./components/products/Products";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/shared/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import { Toaster } from "react-hot-toast";
import Cart from "./components/cart/Cart";
import LogIn from "./components/auth/LogIn";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/auth/Register";
import { useSelector } from "react-redux";
import Checkout from "./components/checkout/Checkout";
import PaymentConfirmation from "./components/checkout/PaymentConfirmation";

function useAuth() {
  const user =
    useSelector((s) => s.auth?.user) ||
    JSON.parse(localStorage.getItem("auth"));
  return Boolean(user);
}

function PrivateOutlet() {
  const authed = useAuth();
  const location = useLocation();
  return authed ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

function PublicOutlet() {
  const authed = useAuth();
  return authed ? <Navigate to="/" replace /> : <Outlet />;
}

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          {/* Public-only group (login/register). If already authed, redirect to "/" */}
          <Route element={<PublicOutlet />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected group example */}
          <Route element={<PrivateOutlet />}>
            {/* Example protected route. Replace or add more as needed. */}
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirm" element={<PaymentConfirmation />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <Toaster position="top-center"></Toaster>
    </React.Fragment>
  );
}

export default App;
