// Mock data for the medical diagnosis app

// Body parts
export const bodyParts = [
  { id: 'head', name: 'Head', icon: '🧠' },
  { id: 'chest', name: 'Chest', icon: '💓' },
  { id: 'abdomen', name: 'Abdomen', icon: '🍴胃' },
  { id: 'back', name: 'Back', icon: '🔙' },
  { id: 'arms', name: 'Arms', icon: '💪' },
  { id: 'legs', name: 'Legs', icon: '🦵' },
  { id: 'skin', name: 'Skin', icon: '🧬' },
  { id: 'general', name: 'General', icon: '👤' },
];

// Symptoms
export const symptoms = [
  {
    id: 's1',
    name: 'Headache',
    description: 'Pain in the head or upper neck',
    bodyParts: ['head'],
  },
  {
    id: 's2',
    name: 'Fever',
    description: 'Elevated body temperature above the normal range',
    bodyParts: ['general'],
  },
  {
    id: 's3',
    name: 'Cough',
    description: 'Sudden expulsion of air from the lungs',
    bodyParts: ['chest'],
  },
  {
    id: 's4',
    name: 'Fatigue',
    description: 'Extreme tiredness resulting from mental or physical exertion',
    bodyParts: ['general'],
  },
  {
    id: 's5',
    name: 'Shortness of breath',
    description: 'Difficulty breathing or catching your breath',
    bodyParts: ['chest'],
  },
  {
    id: 's6',
    name: 'Chest pain',
    description: 'Pain or discomfort in the chest area',
    bodyParts: ['chest'],
  },
  {
    id: 's7',
    name: 'Abdominal pain',
    description: 'Pain felt in the abdominal area',
    bodyParts: ['abdomen'],
  },
  {
    id: 's8',
    name: 'Nausea',
    description: 'Feeling of sickness with an inclination to vomit',
    bodyParts: ['abdomen'],
  },
  {
    id: 's9',
    name: 'Dizziness',
    description: 'Feeling faint, woozy, or unsteady',
    bodyParts: ['head'],
  },
  {
    id: 's10',
    name: 'Rash',
    description: 'Area of irritated or swollen skin',
    bodyParts: ['skin'],
  },
  {
    id: 's11',
    name: 'Joint pain',
    description: 'Discomfort, aches, or soreness in joints',
    bodyParts: ['arms', 'legs'],
  },
  {
    id: 's12',
    name: 'Back pain',
    description: 'Pain in the back area',
    bodyParts: ['back'],
  },
  {
    id: 's13',
    name: 'Sore throat',
    description: 'Pain or irritation in the throat',
    bodyParts: ['head'],
  },
  {
    id: 's14',
    name: 'Runny nose',
    description: 'Excess discharge of fluid from the nose',
    bodyParts: ['head'],
  },
  {
    id: 's15',
    name: 'Muscle aches',
    description: 'Pain or soreness in muscles',
    bodyParts: ['arms', 'legs', 'back', 'general'],
  },
];

// Medical conditions
export const conditions = [
  {
    id: 'c1',
    name: 'Common Cold',
    description: 'A viral infectious disease of the upper respiratory tract that primarily affects the nose.',
    symptoms: ['s3', 's4', 's13', 's14'],
    severity: 'mild',
    recommendations: [
      'Rest and stay hydrated',
      'Over-the-counter cold medications may help relieve symptoms',
      'Consult a doctor if symptoms persist for more than a week',
    ],
  },
  {
    id: 'c2',
    name: 'Influenza (Flu)',
    description: 'A contagious respiratory illness caused by influenza viruses.',
    symptoms: ['s2', 's3', 's4', 's5', 's15'],
    severity: 'moderate',
    recommendations: [
      'Rest and stay hydrated',
      'Over-the-counter flu medications may help relieve symptoms',
      'Consult a doctor if symptoms are severe or worsen',
    ],
  },
  {
    id: 'c3',
    name: 'Migraine',
    description: 'A headache of varying intensity, often accompanied by nausea and sensitivity to light and sound.',
    symptoms: ['s1', 's8', 's9'],
    severity: 'moderate',
    recommendations: [
      'Rest in a quiet, dark room',
      'Over-the-counter pain relievers may help',
      'Consult a doctor for recurring migraines',
    ],
  },
  {
    id: 'c4',
    name: 'Gastroenteritis',
    description: 'Inflammation of the stomach and intestines, typically resulting from bacterial toxins or viral infection.',
    symptoms: ['s7', 's8', 's2', 's4'],
    severity: 'moderate',
    recommendations: [
      'Stay hydrated',
      'Eat bland foods',
      'Consult a doctor if symptoms persist for more than a few days',
    ],
  },
  {
    id: 'c5',
    name: 'Tension Headache',
    description: 'A headache caused by muscle contractions in the head and neck regions.',
    symptoms: ['s1', 's4'],
    severity: 'mild',
    recommendations: [
      'Over-the-counter pain relievers may help',
      'Stress management techniques',
      'Consult a doctor if headaches are frequent or severe',
    ],
  },
  {
    id: 'c6',
    name: 'Allergic Reaction',
    description: 'An immune system response to a substance that the body mistakenly believes is harmful.',
    symptoms: ['s10', 's5', 's14'],
    severity: 'varies',
    recommendations: [
      'Avoid known allergens',
      'Over-the-counter antihistamines may help',
      'Seek immediate medical attention for severe reactions',
    ],
  },
  {
    id: 'c7',
    name: 'Bronchitis',
    description: 'Inflammation of the lining of the bronchial tubes, which carry air to and from the lungs.',
    symptoms: ['s3', 's5', 's4', 's2'],
    severity: 'moderate',
    recommendations: [
      'Rest and stay hydrated',
      'Over-the-counter cough medications may help',
      'Consult a doctor if symptoms persist or worsen',
    ],
  },
  {
    id: 'c8',
    name: 'Arthritis',
    description: 'Inflammation of one or more joints, causing pain and stiffness that can worsen with age.',
    symptoms: ['s11', 's15'],
    severity: 'chronic',
    recommendations: [
      'Physical therapy',
      'Pain management medications',
      'Consult a doctor for proper diagnosis and treatment',
    ],
  },
  {
    id: 'c9',
    name: 'Anxiety',
    description: 'A feeling of worry, nervousness, or unease about something with an uncertain outcome.',
    symptoms: ['s9', 's5', 's6', 's4'],
    severity: 'varies',
    recommendations: [
      'Relaxation techniques',
      'Regular exercise',
      'Consult a mental health professional',
    ],
  },
  {
    id: 'c10',
    name: 'COVID-19',
    description: 'A respiratory illness caused by the SARS-CoV-2 virus.',
    symptoms: ['s2', 's3', 's4', 's5', 's13'],
    severity: 'varies',
    recommendations: [
      'Isolate from others',
      'Rest and stay hydrated',
      'Seek medical attention if symptoms are severe',
      'Follow local health guidelines',
    ],
  },
]; 