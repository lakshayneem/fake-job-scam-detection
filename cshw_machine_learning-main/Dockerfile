FROM python:3.9-slim
WORKDIR /app
COPY . .
RUN pip install --upgrade pip
RUN pip install flask pandas scikit-learn tensorflow
EXPOSE 8000
CMD ["python", "flask_server.py"]
