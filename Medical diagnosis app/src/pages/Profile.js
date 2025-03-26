import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    height: '',
    weight: '',
    allergies: '',
    medications: '',
    conditions: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile({
        ...profile,
        [parent]: {
          ...profile[parent],
          [child]: value,
        },
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });

    // Simulate API call
    setTimeout(() => {
      try {
        localStorage.setItem('userProfile', JSON.stringify(profile));
        setIsEditing(false);
        setMessage({
          text: 'Profile saved successfully!',
          type: 'success',
        });
      } catch (error) {
        setMessage({
          text: 'Error saving profile. Please try again.',
          type: 'error',
        });
      } finally {
        setIsSaving(false);
      }
    }, 1000);
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return '';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your personal health information.
        </p>
      </div>

      {message.text && (
        <motion.div
          className={`mb-6 p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message.text}
        </motion.div>
      )}

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Personal Information
          </h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-outline"
            >
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {profile.firstName || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {profile.lastName || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleChange}
                  className="input"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {profile.dateOfBirth
                    ? `${new Date(profile.dateOfBirth).toLocaleDateString()} (${calculateAge(
                        profile.dateOfBirth
                      )} years)`
                    : 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Gender
              </label>
              {isEditing ? (
                <select
                  id="gender"
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white capitalize">
                  {profile.gender || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="height"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Height (cm)
              </label>
              {isEditing ? (
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={profile.height}
                  onChange={handleChange}
                  className="input"
                  min="0"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {profile.height ? `${profile.height} cm` : 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Weight (kg)
              </label>
              {isEditing ? (
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={profile.weight}
                  onChange={handleChange}
                  className="input"
                  min="0"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {profile.weight ? `${profile.weight} kg` : 'Not provided'}
                </p>
              )}
            </div>
          </div>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Medical Information
          </h3>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="allergies"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Allergies
              </label>
              {isEditing ? (
                <textarea
                  id="allergies"
                  name="allergies"
                  value={profile.allergies}
                  onChange={handleChange}
                  className="input"
                  rows="2"
                  placeholder="List any allergies you have"
                ></textarea>
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {profile.allergies || 'None reported'}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="medications"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Current Medications
              </label>
              {isEditing ? (
                <textarea
                  id="medications"
                  name="medications"
                  value={profile.medications}
                  onChange={handleChange}
                  className="input"
                  rows="2"
                  placeholder="List any medications you're currently taking"
                ></textarea>
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {profile.medications || 'None reported'}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="conditions"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Pre-existing Conditions
              </label>
              {isEditing ? (
                <textarea
                  id="conditions"
                  name="conditions"
                  value={profile.conditions}
                  onChange={handleChange}
                  className="input"
                  rows="2"
                  placeholder="List any pre-existing medical conditions"
                ></textarea>
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {profile.conditions || 'None reported'}
                </p>
              )}
            </div>
          </div>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Emergency Contact
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="emergencyContact.name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Contact Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="emergencyContact.name"
                  name="emergencyContact.name"
                  value={profile.emergencyContact.name}
                  onChange={handleChange}
                  className="input"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {profile.emergencyContact.name || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="emergencyContact.relationship"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Relationship
              </label>
              {isEditing ? (
                <input
                  type="text"
                  id="emergencyContact.relationship"
                  name="emergencyContact.relationship"
                  value={profile.emergencyContact.relationship}
                  onChange={handleChange}
                  className="input"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {profile.emergencyContact.relationship || 'Not provided'}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="emergencyContact.phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  id="emergencyContact.phone"
                  name="emergencyContact.phone"
                  value={profile.emergencyContact.phone}
                  onChange={handleChange}
                  className="input"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {profile.emergencyContact.phone || 'Not provided'}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn-outline"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center"
                disabled={isSaving}
              >
                {isSaving ? (
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
                    Saving...
                  </>
                ) : (
                  'Save Profile'
                )}
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>
          Your privacy is important to us. Your information is stored locally on your device and is not shared with any third parties.
        </p>
      </div>
    </div>
  );
};

export default Profile; 