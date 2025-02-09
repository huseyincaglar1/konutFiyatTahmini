from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# Modeli yükleyelim
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

# Eğitimde kullandığımız sütunlar
used_columns = ['LotFrontage', 'LotArea', 'OverallQual', 'OverallCond', 'YearBuilt', 'YearRemodAdd',
                'MSZoning', 'Street', 'LotShape', 'LandContour', 'Utilities', 'LotConfig', 'LandSlope',
                'Neighborhood', 'Condition1', 'Condition2', 'BldgType', 'HouseStyle']

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        
        data = request.get_json()

        
        new_data_df = pd.DataFrame(data, index=[0])  # DataFrame'e dönüştürme

        # Kullanılmayan sütunları çıkarıyoruz
        new_data_df = new_data_df[used_columns]

        # Veriyi modelin kabul ettiği şekilde işliyoruz
        predictions = model.predict(new_data_df)

        
        
        print(f"Tahmin: {predictions.tolist()}") 


       
        return jsonify(predictions.tolist())

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
