import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import PlaceholderPage from "./pages/PlaceholderPage";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="/dashboard"  element={<PlaceholderPage />} />
          <Route path="/products"   element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/categories" element={<PlaceholderPage />} />
          <Route path="/analytics"  element={<PlaceholderPage />} />
          <Route path="/orders"     element={<PlaceholderPage />} />
          <Route path="/settings"   element={<PlaceholderPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
