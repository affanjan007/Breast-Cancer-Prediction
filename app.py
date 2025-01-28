from flask import Flask, request, jsonify
import numpy as np
import pickle
import pandas as pd
from flask_cors import CORS

# Load the trained RandomForest model
model_path = 'AI_Model.pkl'
try:
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")

# List of features, excluding the "diagnosis" column
expected_features = [
    "radius_mean", "texture_mean", "perimeter_mean", "area_mean", "smoothness_mean", "compactness_mean", 
    "concavity_mean", "concave points_mean", "symmetry_mean", "fractal_dimension_mean", "radius_se", 
    "texture_se", "perimeter_se", "area_se", "smoothness_se", "compactness_se", "concavity_se", 
    "concave points_se", "symmetry_se", "fractal_dimension_se", "radius_worst", "texture_worst", 
    "perimeter_worst", "area_worst", "smoothness_worst", "compactness_worst", "concavity_worst", 
    "concave points_worst", "symmetry_worst", "fractal_dimension_worst"
]

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Keep original feature names
        final_features = pd.DataFrame([data])

        # Add missing features and set them to 0
        for col in expected_features:
            if col not in final_features.columns:
                final_features[col] = 0  # Default to 0 if the feature is missing

        final_features = final_features[expected_features]

        # Get the prediction probabilities
        prediction_proba = model.predict_proba(final_features)

        # Lower the threshold for malignancy
        malignancy_probability = prediction_proba[0][1]

        # Adjust threshold to be more sensitive
        if malignancy_probability > 0.3:  # Lowered from 0.5
            output = 'Malignant'
        else:
            output = 'Benign'

        return jsonify({
            'success': True, 
            'prediction': output,
            'malignancy_probability': float(malignancy_probability)
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)