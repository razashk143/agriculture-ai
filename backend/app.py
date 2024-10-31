from flask import Flask,request,jsonify
import cv2
import tensorflow as tf
import numpy as np
import pickle
import os
import openai
from flask_cors import CORS,cross_origin
import imghdr
from geopy.geocoders import Nominatim
import requests

app = Flask(__name__)
CORS(app)

# with open('.\\models\\crop.pickle', 'rb') as f:
#     crop_model = pickle.load(f)
# with open('.\\models\\fertilizer.pickle', 'rb') as f:
#     fertilizer_model = pickle.load(f)
# with open('.\\models\\yield.pickle', 'rb') as f:
#     yield_model = pickle.load(f)

# windows
# crop_model = pickle.load(open('.\\models\\crop.pickle', 'rb'))
# fertilizer_model = pickle.load(open('.\\models\\fertilizer.pickle', 'rb'))
# yield_model = pickle.load(open('.\\models\\yield.pickle', 'rb'))

# unix
crop_model = pickle.load(open('./models/crop.pickle', 'rb'))
fertilizer_model = pickle.load(open('./models/fertilizer.pickle', 'rb'))
yield_model = pickle.load(open('./models/yield.pickle', 'rb'))
@app.route("/")
def home():
    # return fetchClimateApi("usa")
    return "Working"
    
@app.route("/recomend-crop",methods=["POST"])
def recomendCrop():
    n = request.form['N']
    p =request.form["P"]
    k =request.form["K"]
    temperature= request.form["temperature"]
    humidity= request.form["humidity"]
    ph= request.form["ph"]
    rainfall=request.form["rainfall"]
    # col=["N","P","'K","temperature","humidity","ph","rainfall"]
    col=[n,p,k,temperature,humidity,ph,rainfall]
    # testvalues=[107,34,32,26.774637,66.413269,6.780064,177.774507]
    # testvalues2=[1,10,43,20.744,82.002744,6.502985,202.935536]
    # testvalues3=[90,42,43,20.879744,82.002744,6.502985,202.935536]
        
    #labels in a list form since index is given in prediction
    crops=['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas',
        'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate',
        'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple',
        'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee']

    #the list that has to be passed in the below function
    def croprecom(list):
        example_measures=np.array([list])
        predict=crop_model.predict(example_measures)
        return predict

    #initializing function
    value=croprecom(col)

    print(f"Your prediction is {crops[value[0]]}")
    print(crops[value[0]])
    return crops[value[0]]
    # data=[n,p,k,temperature,humidity,ph,rainfall]
    # data = np.array([data])
    # return dict(crop_model.predict(data))
    
@app.route("/recomend-fertilizer",methods=["POST"])
def recomendFertilizer():
    n = request.form['N']
    p =request.form["P"]
    k =request.form["K"]
    temperature= request.form["temperature"]
    soil_type= request.form["soil_type"]
    crop_type= request.form["crop_type"]
    humidity= request.form["humidity"]
    moisture= request.form["moisture"]

    #column names for the values to be taken as
    # features=["Temparature", "Humidity", "Moisture", "Soil Type", "Crop Type", "Nitrogen", "Potassium", "Phosphorous"]
    features=[temperature,humidity,moisture,soil_type,crop_type,n,k,p]
    print(features)
    #test value
    test=[36,52,38,0,0,37,0,0]
    # test2=[32,62,34,3,3,22,0,20]

    #fertlizer labels
    fertilizer=['Urea', 'DAP', '14-35-14', '28-28', '17-17-17', '20-20', '10-26-26']


    def fertilizerrecom(list):
        example_measures=np.array([list])
        predict=fertilizer_model.predict(example_measures)
        return predict

    #initializing function
    value=fertilizerrecom(features)

    print(f"Your prediction is {fertilizer[value[0]]}")
    print(fertilizer[value[0]])

    prediction=fertilizer[value[0]]
    
    return prediction

@app.route("/predict-yeild",methods=["POST"])
def predictYield():
    area = request.form['area']
    crop =request.form["item"]
    year =request.form["year"]
    pesticides= request.form["pesticides"]
    temperature= request.form["temperature"]
    rainfall= request.form["rainfall"]

    #feature columns in the dataset
    # feature=["Area","Item","Year","average_rain_fall_mm_per_year"	,"pesticides_tonnes","avg_temp"]
    feature = [area,crop,year,rainfall,pesticides,temperature]
    #test values for the model
    test=[0,1,2023,1485.0,111.00,26.37]


    def yieldrecom(list):
        example_measures=np.array([list])
        predict=yield_model.predict(example_measures)
        return predict[0]

    prediction=yieldrecom(feature)
    print(prediction)
    return str(prediction)
    
@app.route("/detect-disease",methods=["POST"])
def detectDisease():
    img = request.files['image']
    link = "temp."+imghdr.what(img)
    img.save(link)
    # print(img)
    # disease_model = tf.keras.models.load_model("pathology-detector-optim")
    CATEGORIES = ['Blueberry---healthy',
                'Corn (maize)---Cercospora leaf spot Gray leaf spot',
                'Corn (maize)---Northern Leaf Blight',
                'Corn (maize)---healthy',   
                'Grape---Black_rot',
                'Grape---Esca(Black Measles)',
                'Grape---Leaf blight(Isariopsis Leaf Spot)',
                'Grape---healthy',
                'Peach---Bacterial_spot',
                'Pepper bell---Bacterial spot',
                'Pepper bell---healthy',
                'Potato---Early blight',
                'Potato---Late blight',
                'Potato---healthy',
                'Raspberry---healthy',
                'Soybean---healthy',
                'Squash---Powdery mildew']
    def prepare(filepath):
        IMG_SIZE = 150 
        img_array = cv2.imread(filepath, cv2.IMREAD_GRAYSCALE)
        new_array = cv2.resize(img_array, (IMG_SIZE, IMG_SIZE))
        return new_array.reshape(-1, IMG_SIZE, IMG_SIZE, 1)


    model = tf.keras.models.load_model("pathology-detector-optim")

    def pathology(link):
        prediction = model.predict([prepare(link)])
        class_index = np.argmax(prediction)
        return class_index
    # a= "WhatsApp Image 2023-01-28 at 09.28.52.jpg"
    m=pathology(link) 
    print(CATEGORIES[m])
    return CATEGORIES[m]


@app.route("/chat",methods=['POST'])
@cross_origin()
def chat():
    prompt = request.form.get("prompt")
    print(prompt)
    openai.api_key = os.getenv("OPENAI_API_KEY")
    model_engine = "text-davinci-003"
    max_tokens = 1024

    completion = openai.Completion.create(
        engine=model_engine,
        prompt=prompt,
        max_tokens=max_tokens,
        temperature=0.5,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    
    print(completion.choices[0].text)

    return jsonify({'response': completion.choices[0].text})

if __name__ == "__main__":
    app.run(debug=True)
