#!/bin/bash
# Startup script for Azure App Service
echo "Starting MuleSoft Code Review Chatbot..."
node src/index.js --server --port $PORT
