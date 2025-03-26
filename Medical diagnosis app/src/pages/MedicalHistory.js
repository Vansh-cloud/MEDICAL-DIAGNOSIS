import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { symptoms, bodyParts } from '../data/medicalData';

const MedicalHistory = () => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to fetch the user's medical history
    // For this demo, we'll retrieve it from localStorage
    try {
      const savedDiagnoses = JSON.parse(localStorage.getItem('diagnoses') || '[]');
      // Sort by date, newest first
      const sortedDiagnoses = savedDiagnoses.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setDiagnoses(sortedDiagnoses);
    } catch (err) {
      console.error('Error retrieving medical history:', err);
      setDiagnoses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getBodyPartName = (id) => {
    const bodyPart = bodyParts.find((bp) => bp.id === id);
    return bodyPart ? bodyPart.name : 'Unknown';
  };

  const getSymptomName = (id) => {
    const symptom = symptoms.find((s) => s.id === id);
    return symptom ? symptom.name : 'Unknown';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your medical history? This action cannot be undone.')) {
      localStorage.removeItem('diagnoses');
      setDiagnoses([]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Medical History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View your past symptom checks and diagnoses.
          </p>
        </div>
        <div className="flex space-x-3">
          <Link to="/symptom-checker" className="btn-primary">
            New Check
          </Link>
          {diagnoses.length > 0 && (
            <button onClick={clearHistory} className="btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
              Clear History
            </button>
          )}
        </div>
      </div>

      {diagnoses.length > 0 ? (
        <div className="space-y-6">
          {diagnoses.map((diagnosis) => (
            <motion.div
              key={diagnosis.id}
              className="card hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {formatDate(diagnosis.date)}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {getBodyPartName(diagnosis.bodyPart)} Symptoms
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {diagnosis.symptoms.slice(0, 3).map((symptom) => (
                      <span
                        key={symptom.id}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200"
                      >
                        {getSymptomName(symptom.id)}
                      </span>
                    ))}
                    {diagnosis.symptoms.length > 3 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        +{diagnosis.symptoms.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  {diagnosis.possibleConditions.length > 0 && (
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Top match:{' '}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {diagnosis.possibleConditions[0].name}
                      </span>
                    </div>
                  )}
                  <Link
                    to={`/diagnosis/${diagnosis.id}`}
                    className="btn-outline text-sm py-1"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
            No Medical History
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            You haven't checked any symptoms yet. Use the symptom checker to get
            started.
          </p>
          <div className="mt-6">
            <Link to="/symptom-checker" className="btn-primary">
              Check Symptoms
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalHistory; 