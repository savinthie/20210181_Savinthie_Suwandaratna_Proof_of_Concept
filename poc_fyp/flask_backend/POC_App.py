from flask import Flask, request, jsonify
from flask_cors import CORS 
import pandas as pd
import pickle as pk
import tensorflow as tf
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
import joblib
import numpy as np

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the US model 
model = tf.keras.models.load_model('./poc_fyp/flask_backend/poc_household_income_sufficiency_model_rnn.h5')

# Load the scalers for input (X) and output (y)
scaler_feature = joblib.load('./poc_fyp/flask_backend/scaler_feature.pkl')
scaler_target = joblib.load('./poc_fyp/flask_backend/scaler_target.pkl')

@app.route('/predict-us', methods=['POST'])
def predict_us():
    try:
        # Get the JSON data from the request
        data = request.json
        print("Received data in backend:", data)

        # Extract and parse the input data from the JSON payload
        total = float(data['total'])
        median_family_income = float(data['median_family_income'])
        num_counties_in_st = int(data['num_counties_in_st'])
        n_children = int(data['n_children'])
        single_parent = int(data['single_parent'])
        n_members = int(data['n_members'])

        print("Parsed input data for the model:", {
            "total": total,
            "median_family_income": median_family_income,
            "num_counties_in_st": num_counties_in_st,
            "n_children": n_children,
            "single_parent": single_parent,
            "n_members": n_members
        })

        # Create input DataFrame for the model
        household_data_input_model = pd.DataFrame([[total, median_family_income, num_counties_in_st, n_children, single_parent, n_members]],
                                        columns=['total', 'median_family_income', 'num_counties_in_st', 'n_children', 'n_parents', 'n_members'])

        # Scale the input data using the pre-loaded scaler
        poc_scaled = scaler_feature.transform(household_data_input_model)

        # Reshape the data to fit the model's expected input shape
        poc_rnn = poc_scaled.reshape((poc_scaled.shape[0], poc_scaled.shape[1], 1))

        # Make predictions using the loaded model
        poc_prediction_scaled = household_rnn_model.predict(poc_rnn)

        # Inverse transform the predictions to get the original values
        poc_household_income_sufficiency_prediction = scaler_target.inverse_transform(poc_prediction_scaled)

        # Calculate total predicted expenses and financial stability
        predicted_expenses = predictions.sum(axis=1)
        predicted_financial_stability = median_family_income / predicted_expenses[0]

        # Prepare the response with predictions mapped to proper keys
        response = {
            'Housing': float(predictions[0, 0]),
            'Food': float(predictions[0, 1]),
            'Transportation': float(predictions[0, 2]),
            'Healthcare': float(predictions[0, 3]),
            'Other Necessities': float(predictions[0, 4]),  # Adjust key name to match frontend
            'Childcare': float(predictions[0, 5]),
            'Taxes': float(predictions[0, 6]),
            'Total Predicted Expenses': float(predicted_expenses[0]),
            'Predicted Financial Stability': float(predicted_financial_stability)
        }

        print("Predictions sent back to frontend:", response)
        return jsonify(response)

    except Exception as e:
        print(f"Error in prediction: {e}")
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)