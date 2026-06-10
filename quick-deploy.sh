#!/bin/bash
# Quick Deploy Script - Use this if App Service already exists
# This only creates the ZIP and deploys it

set -e

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Quick Azure Deployment${NC}"
echo "========================="
echo ""

# Prompt for details
read -p "Resource Group name: " RESOURCE_GROUP
read -p "App Service name: " APP_NAME

echo ""
echo -e "${YELLOW}Creating deployment package...${NC}"

# Clean up
rm -f deploy.zip
rm -rf node_modules

# Install production dependencies
echo "Installing dependencies..."
npm install --production --silent

# Create ZIP
echo "Creating ZIP..."
zip -r deploy.zip . \
    -x "*.git*" \
    -x ".env*" \
    -x "*.log" \
    -x "logs/*" \
    -x "tests/*" \
    -x ".DS_Store" \
    -x "deploy.zip" \
    -q

SIZE=$(du -h deploy.zip | cut -f1)
echo -e "${GREEN}✓ Package created: $SIZE${NC}"

# Set startup command first
echo ""
echo -e "${BLUE}Setting startup command...${NC}"
az webapp config set \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --startup-file "node src/index.js --server --port \$PORT"

# Deploy
echo ""
echo -e "${BLUE}Deploying to Azure...${NC}"
az webapp deployment source config-zip \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --src deploy.zip

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo "Visit: https://${APP_NAME}.azurewebsites.net"
echo ""
echo "Tailing logs (Ctrl+C to exit)..."
sleep 3
az webapp log tail --resource-group "$RESOURCE_GROUP" --name "$APP_NAME"
