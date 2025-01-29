Breast Cancer Tumor Detection Using AI
📌 Project Overview
This project leverages Artificial Intelligence (AI) and Machine Learning (ML) to detect breast cancer tumors from medical imaging and patient data.
The model is trained to differentiate between benign and malignant tumors, assisting doctors in early diagnosis and improving patient outcomes.

🚀 Features
✅ AI-powered tumor detection from images and patient data
✅ Automated diagnosis with high accuracy
✅ User-friendly web interface for predictions
✅ Visualization of results and model confidence

🔬 Technologies Used
Python (NumPy, Pandas, Matplotlib)
Random Forest Classifier with optimized hyperparameters for high accuracy and reduced overfitting
Flask / FastAPI (Backend API)
React.js (Frontend for user interaction)

🛠 Installation & Setup
1️⃣ Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/breast-cancer-ai.git
cd breast-cancer-ai
pip install -r requirements.txt (in seperate terminal)
npm run dev (in seperate terminal)

To use the system: 1) Click the 'Start Prediction' button on the homepage, 
2) Enter the tumor measurements provided by your healthcare provider, 
3) Submit the form to receive a prediction. The system analyzes 30 different features including radius, texture, 
perimeter, area, smoothness, compactness, concavity, symmetry, and fractal dimension to make its prediction.
