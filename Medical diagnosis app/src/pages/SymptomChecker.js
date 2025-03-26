import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for symptoms and conditions
import { symptoms, bodyParts, conditions } from '../data/medicalData';

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomSeverity, setSymptomSeverity] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Filter symptoms based on selected body part
  useEffect(() => {
    if (selectedBodyPart) {
      const filtered = symptoms.filter(
        (symptom) => symptom.bodyParts.includes(selectedBodyPart)
      );
      setFilteredSymptoms(filtered);
    } else {
      setFilteredSymptoms(symptoms);
    }
  }, [selectedBodyPart]);

  // Filter symptoms based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = symptoms.filter((symptom) =>
        symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSymptoms(filtered);
    } else if (selectedBodyPart) {
      const filtered = symptoms.filter(
        (symptom) => symptom.bodyParts.includes(selectedBodyPart)
      );
      setFilteredSymptoms(filtered);
    } else {
      setFilteredSymptoms(symptoms);
    }
  }, [searchTerm, selectedBodyPart]);

  const handleBodyPartSelect = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    setStep(2);
  };

  const handleSymptomToggle = (symptomId) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter((id) => id !== symptomId));
      const { [symptomId]: _, ...rest } = symptomSeverity;
      setSymptomSeverity(rest);
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
      setSymptomSeverity({ ...symptomSeverity, [symptomId]: 5 });
    }
  };

  const handleSeverityChange = (symptomId, value) => {
    setSymptomSeverity({ ...symptomSeverity, [symptomId]: parseInt(value, 10) });
  };

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // In a real app, this would be an API call to a backend service
      // For this demo, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate a unique diagnosis ID
      const diagnosisId = Math.floor(Math.random() * 1000000);

      // Save diagnosis data to localStorage (in a real app, this would go to a database)
      const diagnosisData = {
        id: diagnosisId,
        date: new Date().toISOString(),
        bodyPart: selectedBodyPart,
        symptoms: selectedSymptoms.map((id) => {
          const symptom = symptoms.find((s) => s.id === id);
          return {
            id,
            name: symptom.name,
            severity: symptomSeverity[id],
          };
        }),
        additionalInfo,
        // In a real app, this would be calculated by a medical algorithm
        // Here we're just randomly selecting 1-3 conditions that match the symptoms
        possibleConditions: getPossibleConditions(selectedSymptoms),
      };

      // Save to localStorage
      const savedDiagnoses = JSON.parse(localStorage.getItem('diagnoses') || '[]');
      localStorage.setItem('diagnoses', JSON.stringify([...savedDiagnoses, diagnosisData]));

      // Navigate to the diagnosis result page
      navigate(`/diagnosis/${diagnosisId}`);
    } catch (err) {
      setError('An error occurred while processing your symptoms. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get possible conditions based on symptoms
  const getPossibleConditions = (symptomIds) => {
    // Filter conditions that match at least one of the selected symptoms
    const matchingConditions = conditions.filter((condition) =>
      condition.symptoms.some((symptomId) => symptomIds.includes(symptomId))
    );

    // Calculate a match score for each condition based on how many symptoms match
    const scoredConditions = matchingConditions.map((condition) => {
      const matchingSymptomCount = condition.symptoms.filter((symptomId) =>
        symptomIds.includes(symptomId)
      ).length;
      const matchScore = matchingSymptomCount / symptomIds.length;
      return { ...condition, matchScore };
    });

    // Sort by match score and take top 3
    return scoredConditions
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3)
      .map((condition) => ({
        id: condition.id,
        name: condition.name,
        description: condition.description,
        matchScore: Math.round(condition.matchScore * 100),
      }));
  };

  const renderBodyPartSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Select a Body Part
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Choose the area of your body where you're experiencing symptoms.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bodyParts.map((bodyPart) => (
          <motion.button
            key={bodyPart.id}
            className={`card hover:shadow-lg flex flex-col items-center justify-center p-4 transition-all ${
              selectedBodyPart === bodyPart.id
                ? 'ring-2 ring-cyan-500 bg-cyan-50 dark:bg-cyan-900'
                : ''
            }`}
            onClick={() => handleBodyPartSelect(bodyPart.id)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-2">{bodyPart.icon}</div>
            <span className="font-medium text-gray-900 dark:text-white">
              {bodyPart.name}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const renderSymptomSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Select Your Symptoms
        </h2>
        <button
          onClick={() => setStep(1)}
          className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="symptom-search" className="sr-only">
          Search symptoms
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="symptom-search"
            className="input pl-10"
            placeholder="Search for symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredSymptoms.length > 0 ? (
        <div className="space-y-4">
          {filteredSymptoms.map((symptom) => (
            <div
              key={symptom.id}
              className={`card hover:shadow-md transition-all ${
                selectedSymptoms.includes(symptom.id)
                  ? 'ring-2 ring-cyan-500 bg-cyan-50 dark:bg-cyan-900'
                  : ''
              }`}
            >
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={`symptom-${symptom.id}`}
                    type="checkbox"
                    className="h-4 w-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                    checked={selectedSymptoms.includes(symptom.id)}
                    onChange={() => handleSymptomToggle(symptom.id)}
                  />
                </div>
                <div className="ml-3 text-sm flex-grow">
                  <label
                    htmlFor={`symptom-${symptom.id}`}
                    className="font-medium text-gray-900 dark:text-white cursor-pointer"
                  >
                    {symptom.name}
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    {symptom.description}
                  </p>
                </div>
              </div>

              {selectedSymptoms.includes(symptom.id) && (
                <div className="mt-4">
                  <label
                    htmlFor={`severity-${symptom.id}`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Severity: {symptomSeverity[symptom.id]}/10
                  </label>
                  <input
                    id={`severity-${symptom.id}`}
                    type="range"
                    min="1"
                    max="10"
                    value={symptomSeverity[symptom.id] || 5}
                    onChange={(e) =>
                      handleSeverityChange(symptom.id, e.target.value)
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Severe</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            No symptoms found. Try a different search term or body part.
          </p>
        </div>
      )}

      <div className="mt-8">
        <label
          htmlFor="additional-info"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Additional Information (optional)
        </label>
        <textarea
          id="additional-info"
          rows="4"
          className="input"
          placeholder="Provide any additional details about your symptoms, when they started, etc."
          value={additionalInfo}
          onChange={handleAdditionalInfoChange}
        ></textarea>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="btn-primary flex items-center"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Get Diagnosis
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Symptom Checker
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Identify potential conditions based on your symptoms. This tool is for informational purposes only and does not provide medical advice.
        </p>
      </div>

      <div className="card">
        <div className="mb-8">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                step >= 1
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              1
            </div>
            <div
              className={`h-1 w-16 mx-2 ${
                step >= 2
                  ? 'bg-cyan-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            ></div>
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full ${
                step >= 2
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              2
            </div>
          </div>
          <div className="flex mt-2">
            <div className="w-8 text-xs text-center text-gray-600 dark:text-gray-400">
              Body Part
            </div>
            <div className="w-20"></div>
            <div className="w-8 text-xs text-center text-gray-600 dark:text-gray-400">
              Symptoms
            </div>
          </div>
        </div>

        {step === 1 && renderBodyPartSelection()}
        {step === 2 && renderSymptomSelection()}
      </div>

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>
          Disclaimer: This symptom checker is for informational purposes only and is not a qualified medical opinion.
        </p>
        <p>
          Always consult with a healthcare professional for medical advice, diagnosis, or treatment.
        </p>
      </div>
    </div>
  );
};

export default SymptomChecker; 