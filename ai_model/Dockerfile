FROM python:3.11

WORKDIR /app

RUN pip install pandas numpy Pillow requests flask flask_cors tensorflow gunicorn

ADD ./model ./model
ADD ./weights ./weights
ADD ./tags ./tags

ADD ./__init__.py ./__init__.py

ADD ./ai_model.py ./ai_model.py

ADD ./app.py ./app.py

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]