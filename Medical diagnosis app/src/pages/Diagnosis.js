import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { symptoms, bodyParts, conditions } from '../data/medicalData';

const Diagnosis = () => {
  const { id } = useParams();
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call to fetch the diagnosis
    // For this demo, we'll retrieve it from localStorage
    try {
      const savedDiagnoses = JSON.parse(localStorage.getItem('diagnoses') || '[]');
      const foundDiagnosis = savedDiagnoses.find(
        (d) => d.id.toString() === id.toString()
      );

      if (foundDiagnosis) {
        setDiagnosis(foundDiagnosis);
      } else {
        setError('Diagnosis not found');
      }
    } catch (err) {
      setError('Error retrieving diagnosis data');
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error || !diagnosis) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4">
            Error
          </h2>
          <p className="text-red-600 dark:text-red-400 mb-6">
            {error || 'Diagnosis not found'}
          </p>
          <Link to="/symptom-checker" className="btn-primary">
            Return to Symptom Checker
          </Link>
        </div>
      </div>
    );
  }

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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Diagnosis Results
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Based on the symptoms you provided, here are potential conditions that may match your symptoms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 md:col-span-2">
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Possible Conditions
            </h2>

            {diagnosis.possibleConditions.length > 0 ? (
              <div className="space-y-6">
                {diagnosis.possibleConditions.map((condition) => (
                  <div
                    key={condition.id}
                    className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {condition.name}
                      </h3>
                      <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm font-medium px-3 py-1 rounded-full">
                        {condition.matchScore}% match
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {condition.description}
                    </p>
                    
                    {/* Get the full condition data to show recommendations */}
                    {(() => {
                      const fullCondition = conditions.find(c => c.id === condition.id);
                      return fullCondition && fullCondition.recommendations ? (
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            Recommendations:
                          </h4>
                          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                            {fullCondition.recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null;
                    })()}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No conditions match your symptoms. Please consult with a healthcare professional.
              </p>
            )}

            <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-md">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                <strong>Important:</strong> This is not a medical diagnosis. The information provided is for educational purposes only and should not replace professional medical advice.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="col-span-1">
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Symptom Summary
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatDate(diagnosis.date)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Affected Area
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {getBodyPartName(diagnosis.bodyPart)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Reported Symptoms
                </p>
                <ul className="mt-2 space-y-2">
                  {diagnosis.symptoms.map((symptom) => (
                    <li
                      key={symptom.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        {getSymptomName(symptom.id)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          symptom.severity >= 7
                            ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                            : symptom.severity >= 4
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                            : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        }`}
                      >
                        {symptom.severity}/10
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {diagnosis.additionalInfo && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Additional Information
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {diagnosis.additionalInfo}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="mt-6 space-y-3">
            <Link
              to="/symptom-checker"
              className="btn-outline w-full justify-center inline-flex"
            >
              Check More Symptoms
            </Link>
            <Link
              to="/medical-history"
              className="btn-secondary w-full justify-center inline-flex"
            >
              View Medical History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis; 