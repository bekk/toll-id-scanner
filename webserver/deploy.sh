#!/bin/bash

# Function to deploy backend
deploy_backend() {
  echo "Deploying backend..."
  docker build -t gcr.io/toll-id-scanner/backend ./backend
  gcloud builds submit --tag gcr.io/toll-id-scanner/backend ./backend
  gcloud run deploy backend --image gcr.io/toll-id-scanner/backend --platform managed
}

# Function to deploy frontend
deploy_frontend() {
  echo "Deploying frontend..."
  docker build -t gcr.io/toll-id-scanner/frontend ./frontend
  gcloud builds submit --tag gcr.io/toll-id-scanner/frontend ./frontend
  gcloud run deploy frontend --image gcr.io/toll-id-scanner/frontend --platform managed --set-env-vars BACKEND_URL=https://backend-dw3l6asybq-ew.a.run.app
}

# Main script logic
if [ "$1" == "backend" ]; then
  deploy_backend
elif [ "$1" == "frontend" ]; then
  deploy_frontend
elif [ "$1" == "all" ]; then
  deploy_backend
  deploy_frontend
else
  echo "Usage: ./deploy.sh [backend|frontend|all]"
fi
