import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export const FORM_FIELDS = [
  {
    title: "Mean Values",
    fields: [
      { id: "radius_mean", label: "Radius Mean" },
      { id: "texture_mean", label: "Texture Mean" },
      { id: "perimeter_mean", label: "Perimeter Mean" },
      { id: "area_mean", label: "Area Mean" },
      { id: "smoothness_mean", label: "Smoothness Mean" },
      { id: "compactness_mean", label: "Compactness Mean" },
      { id: "concavity_mean", label: "Concavity Mean" },
      { id: "concave_points_mean", label: "Concave Points Mean" },
      { id: "symmetry_mean", label: "Symmetry Mean" },
      { id: "fractal_dimension_mean", label: "Fractal Dimension Mean" },
    ],
  },
  {
    title: "Standard Error Values",
    fields: [
      { id: "radius_se", label: "Radius SE" },
      { id: "texture_se", label: "Texture SE" },
      { id: "perimeter_se", label: "Perimeter SE" },
      { id: "area_se", label: "Area SE" },
      { id: "smoothness_se", label: "Smoothness SE" },
      { id: "compactness_se", label: "Compactness SE" },
      { id: "concavity_se", label: "Concavity SE" },
      { id: "concave_points_se", label: "Concave Points SE" },
      { id: "symmetry_se", label: "Symmetry SE" },
      { id: "fractal_dimension_se", label: "Fractal Dimension SE" },
    ],
  },
  {
    title: "Worst Values",
    fields: [
      { id: "radius_worst", label: "Radius Worst" },
      { id: "texture_worst", label: "Texture Worst" },
      { id: "perimeter_worst", label: "Perimeter Worst" },
      { id: "area_worst", label: "Area Worst" },
      { id: "smoothness_worst", label: "Smoothness Worst" },
      { id: "compactness_worst", label: "Compactness Worst" },
      { id: "concavity_worst", label: "Concavity Worst" },
      { id: "concave_points_worst", label: "Concave Points Worst" },
      { id: "symmetry_worst", label: "Symmetry Worst" },
      { id: "fractal_dimension_worst", label: "Fractal Dimension Worst" },
    ],
  },
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] to-[#f1f4ff] relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer /> {/* Include Footer here */}
        <Chatbot /> {/* Chatbot included */}
      </div>
    </Router>
  );
}

export default App;
