#!/bin/bash

# Deployment script for Biprayan Portfolio
echo "Building portfolio for deployment..."

# Install dependencies
npm install

# Build the project
npm run build

# Copy additional files if needed
echo "Build complete! Ready for deployment."

# Instructions for manual deployment
echo "To deploy:"
echo "1. Upload the 'public' folder to your hosting service"
echo "2. Configure your server to serve index.html for all routes"
echo "3. Ensure the assets folder is accessible"
