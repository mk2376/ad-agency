# Content Moderation: NSWF Classifier with Convolutional Neural Networks

## Table of Contents
- [How it works](#how-it-works)
    - [Nudity & sexiness detection](#nudity--sexiness-detection)
    - [Violence & drugs detection](#violence--drugs-detection)
    - [REST API](#rest-api)
- [Local environment](#local-environment)
- [Docker](#docker)

## How it works

### Nudity & sexiness detection
**Nudity** and **sexiness** are detected with a **convolutional neural network**. The model was trained using the NudeNetDataset with the help of Keras (Tensorflow). The model has been trained on a section of the dataset on local machines for the ease of deployment, which is also the reason for sometimes making the wrong decision.

### Violence & drugs detection
A similar approach has been taken for **violence** detection. The model was trained using a handcrafted data set. The convolutional neural network ranks the image in three categories: **violence**, **drugs** and **natural**. Simple logic is implemented to classify the image if it contains violence, however drug detection support has not been added as the model is simply not good enough (many false positives). Violence also occassinaly gets classified incorrectly, but that can be attributed to the relatively small handcrafted data set.

### REST API
After the app is up and running the application listens for **POST** requests on path **/predict**. The request should contain the following JSON:

```
{
    "image_url": <image_url>
}
```

The application will then attempt to download the image located at **<image_url>** and save it temporarily in order to make the predictions.

After both of the CNNs make the predictions the following JSON is returned:

```
{
    "description": "Prediction successful." | "Missing 'image_url' in body." | "Failed to fetch the image." | "Failed to save the image.",
    "prediction": {
        "contains_drugs": false | true,
        "contains_nude": false | true,
        "contains_sexy": false | true,
        "contains_violence": false | true
    },
    "status": "OK" | "USER_ERROR" | "SERVER_ERROR"
}
```

## Local environment

Make sure the following modules are installed (if not use **pip install <module_name>** to install them):
- pandas
- numpy
- Pillow
- requests
- flask
- tensorflow

Run the following command:

```
python app.py
```

and the application should start in debugger mode at **http://127.0.0.1:5000/localhost**.

## Docker

1. Build the Docker image

```
docker build -t nsfw-classifier .
```

2. Run the Docker image

```
docker run -d -p 5050:5000 nsfw-classifier
```

3. The application is running at **http://127.0.0.1:5050/localhost**