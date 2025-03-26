import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import Diagnosis from './pages/Diagnosis';
import Profile from './pages/Profile';
import MedicalHistory from './pages/MedicalHistory';
import NotFound from './pages/NotFound';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <motion.main 
        className="flex-grow container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/diagnosis/:id" element={<Diagnosis />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/medical-history" element={<MedicalHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  );
}

export default App; 