import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Brain, Database, BarChart as ChartBar } from 'lucide-react';

const AboutPage = () => {
  const accuracyData = [
    { name: 'Training Accuracy', value: 97.8 },
    { name: 'Validation Accuracy', value: 96.5 },
    { name: 'Test Accuracy', value: 95.9 },
  ];

  const dataDistribution = [
    { name: 'Benign Cases', value: 357 },
    { name: 'Malignant Cases', value: 212 },
  ];

  const COLORS = ['#5a67d8', '#fc8181'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] to-[#f1f4ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2d3748] mb-4">About Our Model</h1>
          <p className="text-[#4a5568] text-lg max-w-3xl mx-auto">
            Our breast cancer detection system uses advanced machine learning techniques to analyze tumor characteristics
            and provide accurate predictions.
          </p>
        </div>

        {/* Model Information Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Brain className="h-8 w-8 text-[#5a67d8]" />
              <h2 className="text-xl font-semibold ml-2">Algorithm</h2>
            </div>
            <p className="text-[#4a5568]">
              Random Forest Classifier with optimized hyperparameters for high accuracy and reduced overfitting.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Database className="h-8 w-8 text-[#5a67d8]" />
              <h2 className="text-xl font-semibold ml-2">Dataset</h2>
            </div>
            <p className="text-[#4a5568]">
              Wisconsin Breast Cancer Dataset with 569 samples and 30 features derived from digitized images.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <ChartBar className="h-8 w-8 text-[#5a67d8]" />
              <h2 className="text-xl font-semibold ml-2">Performance</h2>
            </div>
            <p className="text-[#4a5568]">
              95.9% accuracy on test data with high sensitivity and specificity for reliable predictions.
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-center">Model Accuracy Metrics</h3>
            <div className="flex justify-center">
              <BarChart width={400} height={300} data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[90, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#5a67d8" name="Accuracy %" />
              </BarChart>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-center">Dataset Distribution</h3>
            <div className="flex justify-center">
              <PieChart width={400} height={300}>
                <Pie
                  data={dataDistribution}
                  cx={200}
                  cy={150}
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {dataDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Model Details</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-[#2d3748]">Feature Engineering</h4>
              <p className="text-[#4a5568]">
                The model analyzes 30 features including radius, texture, perimeter, area, smoothness, 
                compactness, concavity, concave points, symmetry, and fractal dimension.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-[#2d3748]">Training Process</h4>
              <p className="text-[#4a5568]">
                The model was trained using 5-fold cross-validation to ensure robustness and generalization.
                Hyperparameters were optimized using grid search with cross-validation.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-medium text-[#2d3748]">Validation Strategy</h4>
              <p className="text-[#4a5568]">
                The dataset was split into 70% training, 15% validation, and 15% test sets to ensure 
                unbiased evaluation of model performance.
              </p>
            </div>
          </div>
        </div>

        {/* Unsplash HD Images Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="https://plus.unsplash.com/premium_photo-1664475477169-46b784084d4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D" alt="Image 1" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="https://media.istockphoto.com/id/2165718111/photo/woman-holding-pink-awareness-ribbon.webp?a=1&b=1&s=612x612&w=0&k=20&c=3UjqXW-vrcymVN4j7Tt1_vgGH_yPXWw9h9hEiK4dh_I=" alt="Image 2" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1551601651-05a4836d25c2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyZWF0bWVudCUyMGNhbmNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="Image 3" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;