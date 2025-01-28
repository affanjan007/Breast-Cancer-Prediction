import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Activity, ChevronRight, HeartPulse, Microscope, Stethoscope, Skull, RotateCcw, Users, Book, XCircle, Dna, AlertCircle, ChevronDown
} from 'lucide-react';
import { FORM_FIELDS } from '../App';

type FormData = {
  [key: string]: string;
};

function HomePage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({});
  const [previousFormData, setPreviousFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  // Refs for sections
  const overviewRef = useRef<HTMLDivElement>(null);
  const symptomsRef = useRef<HTMLDivElement>(null);
  const treatmentRef = useRef<HTMLDivElement>(null);
  const preventionRef = useRef<HTMLDivElement>(null);

  // Function to handle smooth scrolling
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>, section: string) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(section);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      if (overviewRef.current && scrollPosition >= overviewRef.current.offsetTop) {
        setActiveSection('understanding');
      }
      if (symptomsRef.current && scrollPosition >= symptomsRef.current.offsetTop) {
        setActiveSection('breast-cancer-information');
      }
      if (treatmentRef.current && scrollPosition >= treatmentRef.current.offsetTop) {
        setActiveSection('features-of-prediction-model-section');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleClearForm = () => {
    setPreviousFormData(formData);
    setFormData({});
    setPrediction(null);
    setError(null);
  };

  const handleRestorePrevious = () => {
    setFormData(previousFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setPrediction(null);

    try {
      const processedData: { [key: string]: number } = {};
      Object.entries(formData).forEach(([key, value]) => {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          throw new Error(`${key.replace(/_/g, ' ')} must be a valid number`);
        }
        processedData[key] = numValue;
      });

      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const result = await response.json();
      if (result.success) {
        setPrediction(result.prediction);
      } else {
        throw new Error(result.error || 'Failed to get prediction');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] to-[#f1f4ff]">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-[#2d3748] sm:text-5xl md:text-6xl">
                    <span className="block">Advanced Breast Cancer</span>
                    <span className="block text-[#5a67d8]">Detection System</span>
                  </h1>
                  <p className="mt-3 text-base text-[#4a5568] sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Using machine learning to assist in early detection and diagnosis of breast cancer through tumor analysis.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow-lg">
                      <button
                        onClick={() => setShowForm(true)}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#5a67d8] hover:bg-[#4c51bf] transform hover:scale-105 transition-all duration-200 ease-in-out"
                      >
                        Start Prediction
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full shadow-2xl"
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="Medical Research"
            />
          </div>
        </div>

        {/* Information Section */}
        <div id="understanding" className="py-12 bg-white shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-[#5a67d8] font-semibold tracking-wide uppercase">Understanding</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#2d3748] sm:text-4xl">
                Breast Cancer Detection
              </p>
              <p className="mt-4 max-w-2xl text-xl text-[#4a5568] lg:mx-auto">
                Early detection significantly increases the chances of successful treatment.
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Early Detection</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    Regular screening and early detection are crucial for successful treatment outcomes.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <Microscope className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Advanced Analysis</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    Our system uses advanced machine learning to analyze tumor characteristics.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Professional Support</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    Always consult healthcare professionals for proper diagnosis and treatment.
                  </p>
                </div>
          
                <div className="relative group">
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                      <Dna className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Genetic Insights</p>
                    <p className="mt-2 ml-16 text-base text-[#4a5568]">
                      Genetic testing can help identify individuals at higher risk for breast cancer.
                   </p>
                 </div>

                 <div className="relative group">
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                      <Book className="h-6 w-6" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Patient Education</p>
                    <p className="mt-2 ml-16 text-base text-[#4a5568]">
                      Educating patients about the importance of early detection and treatment options.
                    </p>
                 </div>

                 <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <Users className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Support Networks</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    Connecting patients with support groups and resources to guide them through their journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Expandable Cards Section with Sticky Navigation */}
        <div className="py-12 bg-white shadow-inner relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-12">
              <h2 className="text-base text-[#5a67d8] font-semibold tracking-wide uppercase">
                Breast Cancer Information
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#2d3748] sm:text-4xl">
                Understanding Breast Cancer
              </p>
            </div>

            <div className="flex gap-8">
              {/* Sticky Navigation */}
              <div className="hidden lg:block w-64 sticky top-4 h-fit">
                <nav className="bg-white rounded-lg shadow-lg p-4">
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => scrollToSection(overviewRef, 'understanding')}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                          activeSection === 'understanding'
                            ? 'bg-[#5a67d8] text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        Understanding
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection(symptomsRef, 'breast-cancer-information')}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                          activeSection === 'breast-cancer-information'
                            ? 'bg-[#5a67d8] text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        Breast Cancer Information
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection(treatmentRef, 'features-of-prediction-model-section')}
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                          activeSection === 'features-of-prediction-model'
                            ? 'bg-[#5a67d8] text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        Features of Prediction Model
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Expandable Cards */}
              <div id="breast-cancer-information" className="flex-1 space-y-6">
                {/* Overview Card */}
                <div ref={overviewRef} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedCard(expandedCard === 'overview' ? null : 'overview')}
                    className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-[#5a67d8] to-[#4c51bf] text-white"
                  >
                    <h3 className="text-xl font-semibold">Overview</h3>
                    <ChevronDown
                      className={`h-6 w-6 transform transition-transform ${
                        expandedCard === 'overview' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      expandedCard === 'overview' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="p-6 flex gap-6">
                      <div className="flex-1">
                        <p className="text-[#4a5568] leading-relaxed">
                        Breast cancer is one of the most common cancers affecting women worldwide, though it can also occur in men. It develops when cells in the breast tissue grow and divide uncontrollably, forming a tumor that can be benign (non-cancerous) or malignant (cancerous). If left untreated, malignant tumors can invade surrounding tissues and spread (metastasize) to other parts of the body, such as the lymph nodes, lungs, liver, or bones. Several factors contribute to breast cancer risk, including genetics, hormonal influences, lifestyle choices, and environmental factors. Early detection through regular screenings, such as mammograms and self-examinations, significantly improves treatment outcomes and survival rates.
                        </p>
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#5a67d8] rounded-full"></div>
                            <span>Affects both women and men</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#5a67d8] rounded-full"></div>
                            <span>Early detection is crucial</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#5a67d8] rounded-full"></div>
                            <span>Regular screening recommended</span>
                          </li>
                        </ul>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&auto=format&fit=crop&q=60"
                        alt="Medical Research"
                        className="w-80 h-48 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Signs & Symptoms Card */}
                <div ref={symptomsRef} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedCard(expandedCard === 'symptoms' ? null : 'symptoms')}
                    className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-[#5a67d8] to-[#4c51bf] text-white"
                  >
                    <h3 className="text-xl font-semibold">Signs & Symptoms</h3>
                    <ChevronDown
                      className={`h-6 w-6 transform transition-transform ${
                        expandedCard === 'symptoms' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      expandedCard === 'symptoms' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="p-6 flex gap-6">
                      <div className="flex-1">
                        <p className="text-[#4a5568] leading-relaxed">
                        Being aware of breast cancer symptoms is crucial for early detection and timely treatment. Recognizing the warning signs can help individuals seek medical attention before the disease progresses. Common signs include:
                        </p>
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#5a67d8] rounded-full"></div>
                            <span>Lumps or thickening in breast tissue</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#5a67d8] rounded-full"></div>
                            <span>Changes in breast size or shape</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#5a67d8] rounded-full"></div>
                            <span>Skin changes or dimpling</span>
                          </li>
                        </ul>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=60"
                        alt="Medical Examination"
                        className="w-80 h-48 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Treatment Options Card */}
                <div ref={treatmentRef} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedCard(expandedCard === 'treatment' ? null : 'treatment')}
                    className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-[#5a67d8] to-[#4c51bf] text-white"
                  >
                    <h3 className="text-xl font-semibold">Treatment Options</h3>
                    <ChevronDown
                      className={`h-6 w-6 transform transition-transform ${
                        expandedCard === 'treatment' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      expandedCard === 'treatment' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="p-6 flex gap-6">
                      <div className="flex-1">
                        <p className="text-[#4a5568] leading-relaxed">
                        Treatment options for breast cancer depend on various factors, including the type, stage, and individual health condition. Advances in medical science have led to multiple effective treatment approaches, often used in combination to achieve the best possible outcomes. Common treatments include:
                        </p>
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#5a67d8] rounded-full"></div>
                            <span>Surgery (lumpectomy or mastectomy)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#5a67d8] rounded-full"></div>
                            <span>Radiation therapy</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#5a67d8] rounded-full"></div>
                            <span>Chemotherapy</span>
                          </li>
                        </ul>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1551601651-05a4836d25c2?w=800&auto=format&fit=crop&q=60"
                        alt="Medical Treatment"
                        className="w-80 h-48 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Prevention Card */}
                <div ref={preventionRef} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedCard(expandedCard === 'prevention' ? null : 'prevention')}
                    className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-[#5a67d8] to-[#4c51bf] text-white"
                  >
                    <h3 className="text-xl font-semibold">Prevention</h3>
                    <ChevronDown
                      className={`h-6 w-6 transform transition-transform ${
                        expandedCard === 'prevention' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      expandedCard === 'prevention' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="p-6 flex gap-6">
                      <div className="flex-1">
                        <p className="text-[#4a5568] leading-relaxed">
                        While certain risk factors, such as genetics and family history, cannot be altered, adopting a healthy lifestyle and making informed choices can help lower the likelihood of developing breast cancer. Proactive measures and regular screenings play a crucial role in early detection and prevention. Steps you can take to reduce your risk include:
                        </p>
                        <ul className="mt-4 space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#5a67d8] rounded-full"></div>
                            <span>Maintain a healthy lifestyle</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#5a67d8] rounded-full"></div>
                            <span>Regular exercise</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#5a67d8] rounded-full"></div>
                            <span>Limit alcohol consumption</span>
                          </li>
                        </ul>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=60"
                        alt="Healthy Lifestyle"
                        className="w-80 h-48 object-cover rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

                      

        {/* Features Explanation Section */}
        <div id="features-of-prediction-model-section" className="py-12 bg-white shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-[#5a67d8] font-semibold tracking-wide uppercase">Features of Prediction Model</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-[#2d3748] sm:text-4xl">
                Key Features of Our Breast Cancer Prediction System
              </p>
              <p className="mt-4 max-w-2xl text-xl text-[#4a5568] lg:mx-auto">
                Explore the crucial features of our cancer prediction model that contribute to early and accurate detection.
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                
                {/* Feature Names with Explanations */}
                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Radius</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    Measures the distance from the center to the outermost point of the tumor, providing a size indicator.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <Microscope className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Texture</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    Indicates the surface texture of the tumor, helping to assess its smoothness or roughness.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Perimeter</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    The total length of the tumor's boundary, offering a shape descriptor.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <Dna className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Area</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    Refers to the total area of the tumor, indicating its overall size.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <Book className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Smoothness</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    Measures the smoothness of the tumor's surface, highlighting the level of irregularity.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <Users className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Compactness</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    Describes how tightly packed the cells are within the tumor, providing insight into its density.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <Activity className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Concavity</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    Measures the tumor's indentation or inward curvatures, giving shape details.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <Send className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Concave Points</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    Indicates the number of concave points on the tumor, showing its sharp indentations.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <XCircle className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Symmetry</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    Measures the balance or symmetry of the tumor's shape, indicating its uniformity.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#5a67d8] text-white transform group-hover:scale-110 transition-transform duration-200">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-[#2d3748]">Fractal Dimension</p>
                  <p className="mt-2 ml-16 text-base text-[#4a5568]">
                    A measure of the tumor's complexity, representing its roughness or intricate pattern.
                  </p>
                </div>

              </div>

              {/* Explanation of Mean, SE, and Worst */}
              <div className="mt-10 space-y-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4">Mean</h4>
                  <p className="text-[#4a5568]">
                    The "Mean" value represents the average measurement for a particular feature, offering a general representation of the tumor's characteristics.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-4">SE (Standard Error)</h4>
                  <p className="text-[#4a5568]">
                    SE (Standard Error) measures the variability or precision of the mean value. A lower SE indicates more reliable data.
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold mb-4">Worst</h4>
                  <p className="text-[#4a5568]">
                    "Worst" values indicate the maximum measurement observed for a specific feature, highlighting the most extreme or abnormal case.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] to-[#f1f4ff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setShowForm(false)}
          className="mb-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#5a67d8] bg-white hover:bg-[#edf2ff] transform hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a67d8]"
        >
          ← Back to Information
        </button>

        <div className="text-center mb-8">
          <Activity className="mx-auto h-12 w-12 text-[#5a67d8]" />
          <h1 className="mt-3 text-3xl font-extrabold text-[#2d3748]">
            Tumor Prediction Model
          </h1>
          <p className="mt-2 text-lg text-[#4a5568]">
            Enter the tumor measurements below to get a prediction
          </p>

          {/* Malignant and Benign Representation */}
          <div className="flex justify-center gap-8 mt-8">
            {/* Malignant Card */}
            <div className="flex flex-col items-center bg-[#f77171] p-3 rounded-lg shadow-lg w-44 transform transition-all duration-200 hover:scale-105">
              <div className="text-red-600 text-1xl mb-1">
                <Skull />
              </div>
              <h3 className="text-xl font-semibold text-[#e53e3e]">Malignant</h3>
              <p className="mt-2 text-md text-[#4a5568]">Cancerous, can spread to other areas.</p>
            </div>

            {/* Benign Card */}
            <div className="flex flex-col items-center bg-[#c6f6d5] p-3 rounded-lg shadow-lg w-44 transform transition-all duration-200 hover:scale-105">
              <div className="text-green-600 text-1xl mb-1">
                <HeartPulse />
              </div>
              <h3 className="text-xl font-semibold text-[#38a169]">Benign</h3>
              <p className="mt-2 text-md text-[#4a5568]">Non-cancerous, does not spread.</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700 shadow-sm">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {prediction && (
          <div className="mb-4 p-4 bg-green-50 rounded-lg text-green-700 text-center font-semibold shadow-sm">
            Prediction: {prediction}
          </div>
        )}

        {/* Prediction Outcome with Advice */}
        {prediction && (
          <div className="mt-8">
            {prediction === 'Malignant' ? (
              <div className="bg-red-100 p-6 rounded-lg shadow-lg text-center">
                <div className="text-red-600 text-3xl mb-4">
                  <Skull />
                </div>
                <h3 className="text-2xl font-bold text-red-600">Important: Malignant Detected</h3>
                <p className="mt-2 text-lg text-red-600">
                  It seems the tumor is malignant, which is cancerous and can spread to other areas.
                  <br />
                  Please consult with a medical professional immediately for further tests and treatment.
                </p>
                <div className="mt-4 text-lg text-gray-700">
                  <p>We strongly recommend you:</p>
                  <ul className="list-inside list-disc text-left mt-2">
                    <li>Schedule a follow-up appointment with your doctor.</li>
                    <li>Consider additional tests, such as biopsies and imaging.</li>
                    <li>Discuss treatment options such as surgery, chemotherapy, or radiation therapy.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
                <div className="text-green-600 text-3xl mb-4">
                  <HeartPulse />
                </div>
                <h3 className="text-2xl font-bold text-green-600">Good News: Benign Tumor</h3>
                <p className="mt-2 text-lg text-green-600">
                  The tumor is benign, meaning it is non-cancerous and will not spread to other areas.
                  <br />
                  While benign tumors are usually not dangerous, we still recommend regular monitoring.
                </p>
                <div className="mt-4 text-lg text-gray-700">
                  <p>What you can do next:</p>
                  <ul className="list-inside list-disc text-left mt-2">
                    <li>Keep regular check-ups with your healthcare provider.</li>
                    <li>Monitor the tumor for any changes in size or symptoms.</li>
                    <li>Maintain a healthy lifestyle with a balanced diet and exercise.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg overflow-hidden">
          {FORM_FIELDS.map((group, groupIndex) => (
            <div key={group.title} className={`p-6 ${groupIndex !== 0 ? 'border-t border-[#e2e8f0]' : ''}`}>
              <h2 className="text-xl font-semibold text-[#2d3748] mb-4">{group.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.fields.map(field => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-[#4a5568]">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      step="any"
                      name={field.id}
                      id={field.id}
                      required
                      value={formData[field.id] || ''}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-[#e2e8f0] shadow-sm focus:border-[#5a67d8] focus:ring focus:ring-[#5a67d8] focus:ring-opacity-50 transition-colors duration-200"
                      placeholder="Enter value"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="px-6 py-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex justify-between items-center">
            <div className="space-x-4">
              <button
                type="button"
                onClick={handleClearForm}
                className="inline-flex items-center px-4 py-2 border border-[#e2e8f0] rounded-md shadow-sm text-sm font-medium text-[#4a5568] bg-white hover:bg-[#f8fafc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a67d8] transform hover:scale-105 transition-all duration-200 ease-in-out"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Clear Form
              </button>
              <button
                type="button"
                onClick={handleRestorePrevious}
                disabled={Object.keys(previousFormData).length === 0}
                className={`inline-flex items-center px-4 py-2 border border-[#e2e8f0] rounded-md shadow-sm text-sm font-medium ${
                  Object.keys(previousFormData).length === 0
                    ? 'text-[#a0aec0] bg-[#f8fafc] cursor-not-allowed'
                    : 'text-[#4a5568] bg-white hover:bg-[#f8fafc] transform hover:scale-105'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a67d8] transition-all duration-200 ease-in-out`}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restore Previous
              </button>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5a67d8] hover:bg-[#4c51bf] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5a67d8] transform hover:scale-105 transition-all duration-200 ease-in-out ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Processing...' : 'Get Prediction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomePage;