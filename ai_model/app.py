# Standard
import requests

# Flask utils
from flask import Flask, request, Response, json
from flask_cors import CORS

# Model
from ai_model import NSFWClassifier

# Initialize the model
nsfw_classifier = NSFWClassifier(model_path = "./model/", tag_path = "./tags/")

# Build the model
nsfw_classifier.construct_nudity_model("./weights/")

# Flask app
app = Flask(__name__)
CORS(app)

def get_predictions(image_path):
    nude_value = nsfw_classifier.nude_detection(image_path)
    nsfw_predictions = nsfw_classifier.nsfw_detection(image_path)

    unsafe_score = nude_value[image_path]['unsafe']
    unsafe_score = int(unsafe_score)

    sexy_score = nude_value[image_path]['sexy']
    sexy_score = int(sexy_score)

    predictions ={
        'nude_score': unsafe_score,
        'sexy_score': sexy_score,
        #'drugs_score': int(nsfw_predictions[0][0] * 100),
        'violence_score': int(nsfw_predictions[0][1] * 100),
        'natural_score': int(nsfw_predictions[0][2] * 100)
    }

    return predictions


@app.route("/predict", methods=['POST'])
def uploaded_images():
    json_body = request.get_json()
    if 'image_url' not in json_body:
        return Response(
            response = json.dumps({"status": "USER_ERROR", "description": "Missing 'image_url' in body.", "prediction": {}}),
            status = 400,
            mimetype = "application/json",
            headers = {"Content-Type": "application/json"}
        )
    image_response = requests.get(json_body['image_url'], stream = True, timeout = 60)
    # Failed to fetch the image
    if not image_response.ok:
        return Response(
            response = json.dumps({"status": "SERVER_ERROR", "description": "Failed to fetch the image.", "prediction": {}}),
            status = 500,
            mimetype = "application/json",
            headers = {"Content-Type": "application/json"}
        )
    try:
        with open("temp_image.jpg", "wb") as temp_image_file:
            temp_image_file.write(image_response.content)
    except IOError:
        return Response(
            response = json.dumps({"status": "SERVER_ERROR", "description": "Failed to save the image.", "prediction": {}}),
            status = 500,
            mimetype = "application/json",
            headers = {"Content-Type": "application/json"}
        )
    predictions = get_predictions("temp_image.jpg")
    result = nsfw_classifier.nsfw_prediction_check(predictions)
    return Response(
        # response = json.dumps({"status": "OK", "description": "Prediction successful.", "prediction": {"contains_nude": result['nude'], "contains_sexy": result['sexy'], "contains_violence": result['violence'], "contains_drugs": result['drugs']}}),
        response = json.dumps({"status": "OK", "description": "Prediction successful.", "prediction": {"contains_nude": result['nude'], "contains_sexy": result['sexy'], "contains_violence": result['violence']}}),
        status = 200,
        mimetype = "application/json",
        headers = {"Content-Type": "application/json"}
    )


if __name__ == '__main__':
    app.run(debug=True)