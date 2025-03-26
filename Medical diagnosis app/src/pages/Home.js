import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    {
      title: 'Symptom Checker',
      description: 'Input your symptoms and get potential diagnoses based on medical data.',
      icon: (
        <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      link: '/symptom-checker',
    },
    {
      title: 'Medical History',
      description: 'Keep track of your medical history, medications, and past diagnoses.',
      icon: (
        <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      ),
      link: '/medical-history',
    },
    {
      title: 'Health Insights',
      description: 'Get personalized health insights and recommendations based on your profile.',
      icon: (
        <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      link: '/profile',
    },
  ];

  const testimonials = [
    {
      quote: "This app helped me understand my symptoms before visiting the doctor. It saved me time and reduced my anxiety.",
      author: "Sarah J.",
      role: "Patient",
    },
    {
      quote: "As a medical student, I find this tool incredibly useful for learning about different conditions and their symptoms.",
      author: "Dr. Michael T.",
      role: "Medical Student",
    },
    {
      quote: "The interface is intuitive and the information is presented in a way that's easy to understand.",
      author: "Robert K.",
      role: "User",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Your Health, <span className="text-cyan-600 dark:text-cyan-400">Your Understanding</span>
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              MediDiagnosis helps you understand your symptoms and potential conditions, empowering you to make informed health decisions.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link to="/symptom-checker" className="btn-primary">
                Check Symptoms
              </Link>
              <Link to="/profile" className="btn-outline">
                Create Profile
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg blur opacity-25"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <img 
                  src="/images/doctor-patient.jpg" 
                  alt="Doctor consulting with patient" 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/600x400?text=Medical+Consultation';
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How MediDiagnosis Helps You</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform provides tools to help you understand your health better and make informed decisions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card hover:shadow-lg"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-100 dark:bg-cyan-900 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
              <Link to={feature.link} className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium inline-flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            MediDiagnosis uses advanced algorithms to analyze your symptoms and provide potential diagnoses.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
          <motion.div 
            className="flex flex-col items-center text-center max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-cyan-100 dark:bg-cyan-900 rounded-full p-4 mb-4">
              <svg className="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">1. Enter Your Symptoms</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Use our intuitive interface to input your symptoms and their severity.
            </p>
          </motion.div>
          <div className="hidden md:block">
            <svg className="w-8 h-8 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </div>
          <motion.div 
            className="flex flex-col items-center text-center max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-cyan-100 dark:bg-cyan-900 rounded-full p-4 mb-4">
              <svg className="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2. Get Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our system analyzes your symptoms against a comprehensive medical database.
            </p>
          </motion.div>
          <div className="hidden md:block">
            <svg className="w-8 h-8 text-gray-300 dark:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </div>
          <motion.div 
            className="flex flex-col items-center text-center max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-cyan-100 dark:bg-cyan-900 rounded-full p-4 mb-4">
              <svg className="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">3. Review Results</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get potential diagnoses and recommendations for next steps in your healthcare journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Users Say</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Hear from people who have used MediDiagnosis to better understand their health.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <svg className="w-8 h-8 text-cyan-500 mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-600 dark:text-gray-400 mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-violet-500 rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-3xl font-bold mb-2">Ready to understand your health better?</h2>
            <p className="text-cyan-100">
              Start using MediDiagnosis today and take control of your health journey.
            </p>
          </div>
          <Link
            to="/symptom-checker"
            className="bg-white text-cyan-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition duration-300 ease-in-out shadow-md"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;