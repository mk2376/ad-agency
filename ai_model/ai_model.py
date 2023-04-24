# Standard
import numpy as np
import pandas as pd

# Image
from PIL import Image

# Keras, Tensorflow
from tensorflow import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.applications.mobilenet import preprocess_input
from keras.applications.vgg16 import VGG16

class NSFWClassifier():

    def __init__(self, model_path, tag_path):
        self.model = keras.models.load_model(model_path)
        self.base_model = VGG16(weights='imagenet', include_top=False, input_shape=(80, 80, 3))
        self.nudity_model = Sequential()
        self.tags = pd.read_csv(tag_path + "tags.csv")
        self.target_tag = self.tags['class']
        self.target_tag = pd.get_dummies(self.target_tag)


    def construct_nudity_model(self, weight_path):
        self.nudity_model.add(Dense(1024, activation='relu', input_shape=(2048,)))
        self.nudity_model.add(Dropout(0.5))
        self.nudity_model.add(Dense(512, activation='relu'))
        self.nudity_model.add(Dropout(0.5))
        self.nudity_model.add(Dense(256, activation='relu'))
        self.nudity_model.add(Dropout(0.5))
        self.nudity_model.add(Dense(128, activation='relu'))
        self.nudity_model.add(Dropout(0.5))
        # 3 classes - nude, safe and sexy (naming convention followed from dataset)
        self.nudity_model.add(Dense(3, activation='softmax'))

        self.nudity_model.load_weights(weight_path + "weights.hdf5")
        self.nudity_model.compile(loss="categorical_crossentropy", optimizer='Adam', metrics=['accuracy'])


    def prepare_image(self, image_path, dimensions):
        try:
            image: Image = Image.open(image_path).convert('RGB')
            image = image.resize(dimensions)
            arr_image = np.array(image)
            arr_image = np.expand_dims(arr_image, axis=0)
            arr_image_preprocessed = preprocess_input(arr_image)
        except Exception as e:
            print(f"Encountered exception: {e}")
        return arr_image_preprocessed


    def nsfw_detection(self, image_path):
        image = self.prepare_image(image_path, dimensions=(224, 224))
        prediction = self.model.predict(image)
        return prediction


    def nude_detection(self, image_path):
        img = self.prepare_image(image_path, dimensions=(80, 80))
        prediction_image = self.base_model.predict(img)
        prediction_image = prediction_image.reshape(prediction_image.shape[0], 2 * 2 * 512)
        prediction = self.nudity_model.predict(prediction_image)
        classes = np.argmax(prediction, axis=1)
        result = self.target_tag.columns.values[classes][0]
        nudity_score = {}
        nudity_score[image_path] = {
            'unsafe': 100 if result == "nude" else 0,
            'sexy': 100 if result == "sexy" else 0,
            'safe': 100 if result == "safe" else 0
        }
        return nudity_score


    def nsfw_prediction_check(self, prediction):
        check = {
            'nude': False,
            'sexy': False,
            'violence': False,
            'drugs': False
        }
        # Nudity
        if prediction['nude_score'] == 100:
            check['nude'] = True
        # Sexy
        if prediction['sexy_score'] == 100:
            check['sexy'] = True
        # Violence
        if prediction['violence_score'] > 35 and prediction['natural_score'] < 25:
            check['violence'] = True
        if prediction['violence_score'] > 39:
            check['violence'] = True
        # Drugs
        # if prediction['drugs_score'] > 40 and prediction['natural_score'] < 30:
        #     check['drugs'] = True
        # Return
        return check
