# Standard
import numpy as np
import pandas as pd
import os
import werkzeug

# Flask utils
from flask import Flask, request, jsonify

# Model
from ai_model import NSFWClassifier

# Initialize the model
nsfw_classifier = NSFWClassifier(model_path = "./model/", tag_path = "./tags/")

# Build the model
nsfw_classifier.construct_nudity_model("./weights/")

# Flask app
app = Flask(__name__)

def get_predictions(image_path):
    nude_value = nsfw_classifier.nude_detection(image_path)
    nsfw_predictions = nsfw_classifier.nsfw_detection(image_path)

    unsafe_score = nude_value[image_path]['unsafe']
    unsafe_score = int(unsafe_score * 100)

    sexy_score = nude_value[image_path]['sexy']
    sexy_score = int(sexy_score * 100)

    predictions ={
        'nude_score': unsafe_score,
        'sexy_score': sexy_score,
        'violence_score': int(nsfw_predictions[0][1] * 100),
        'natural_score': int(nsfw_predictions[0][2] * 100)
    }

    return predictions


@app.route("/", methods=['POST', 'GET'])
def hello():
    return 'Hello World!'


@app.route("/predict", methods=['POST', 'GET'])
def uploaded_images():
    saving_folder = "./"
    img_files_ids = request.files.getlist('images')
    #print(f"Number of images is: {len(img_files_ids)}")
    all_results = []
    for img_file in request.files.getlist('images'):
        img_name = werkzeug.utils.secure_filename(img_file.filename)
        #print(f"Received image: {img_name}")
        img_path = os.path.join(saving_folder, img_name)
        img_file.save(img_path)
        predictions = get_predictions(img_path)
        result = {'img_path': img_path, 'predictions': predictions}
        all_results.append(result)
    bools = nsfw_classifier.nsfw_prediction_check(all_results)
    return jsonify(
        #data = all_results,
        contains_nude = bools['nude'],
        contains_sexy = bools['sexy'],
        contains_violence = bools['violence'],
    )


if __name__ == '__main__':
    app.run(debug=True)