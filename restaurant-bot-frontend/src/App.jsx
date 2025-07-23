import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import PrivateRoute from "./utils/PrivateRoute";

// Pages
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Discover from "./pages/Discover";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import Orders from "./pages/Orders";
import Recommendations from "./pages/Recommendations";
import AuthPage from "./pages/Auth";

// Context
import { CartProvider } from "./context/CartContext";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans">
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex flex-1">
            <Sidebar isOpen={isSidebarOpen} />
            <main className="flex-1 bg-gray-50 pt-16 overflow-y-auto ">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/auth"
                  element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />}
                />

                {/* Protected Routes */}
                <Route path="/menu" element={<Menu />} />
                <Route
                  path="/orders"
                  element={
                    <PrivateRoute>
                      <Orders />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reserve"
                  element={
                    <PrivateRoute>
                      <Reservations />
                    </PrivateRoute>
                  }
                />
                <Route path="/discover" element={<Discover />} />
                <Route path="/recommend" element={<Recommendations />} />
              </Routes>
              <Footer />
            </main>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </Router>
    </CartProvider>
  );
};

export default App;
