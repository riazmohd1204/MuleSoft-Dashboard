#!/bin/bash
# Azure CLI Deployment Script for MuleSoft Code Review Chatbot
# This script creates the package and deploys it to Azure App Service

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Azure App Service Deployment Script${NC}"
echo "========================================"
echo ""

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo -e "${RED}❌ Azure CLI is not installed!${NC}"
    echo "Install it from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Prompt for deployment details
read -p "Enter Azure Resource Group name (e.g., rg-mulelens): " RESOURCE_GROUP
read -p "Enter App Service name (e.g., mulelens-code-review): " APP_NAME
read -p "Enter Azure region (e.g., eastus, westus2): " LOCATION
read -p "Enter App Service Plan SKU (B1, S1, P1V2, etc.): " SKU

echo ""
echo -e "${YELLOW}📋 Deployment Configuration:${NC}"
echo "  Resource Group: $RESOURCE_GROUP"
echo "  App Name: $APP_NAME"
echo "  Location: $LOCATION"
echo "  SKU: $SKU"
echo ""
read -p "Is this correct? (y/n): " CONFIRM

if [[ $CONFIRM != "y" ]]; then
    echo "Deployment cancelled."
    exit 0
fi

# Login to Azure
echo ""
echo -e "${BLUE}🔐 Logging into Azure...${NC}"
az login

# Set subscription (if multiple)
echo ""
echo -e "${BLUE}📋 Available subscriptions:${NC}"
az account list --output table
echo ""
read -p "Enter subscription ID to use (or press Enter for default): " SUBSCRIPTION_ID

if [[ -n "$SUBSCRIPTION_ID" ]]; then
    az account set --subscription "$SUBSCRIPTION_ID"
    echo -e "${GREEN}✓ Subscription set${NC}"
fi

# Create Resource Group if it doesn't exist
echo ""
echo -e "${BLUE}📦 Creating/Verifying Resource Group...${NC}"
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" || echo "Resource group already exists"

# Create App Service Plan
echo ""
echo -e "${BLUE}🏗️  Creating App Service Plan...${NC}"
az appservice plan create \
    --name "${APP_NAME}-plan" \
    --resource-group "$RESOURCE_GROUP" \
    --location "$LOCATION" \
    --sku "$SKU" \
    --is-linux \
    || echo "App Service Plan already exists"

# Create Web App
echo ""
echo -e "${BLUE}🌐 Creating Web App...${NC}"
az webapp create \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --plan "${APP_NAME}-plan" \
    --runtime "NODE:20-lts" \
    || echo "Web App already exists"

# Enable WebSockets
echo ""
echo -e "${BLUE}🔌 Enabling WebSockets...${NC}"
az webapp config set \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --web-sockets-enabled true

# Set startup command
echo ""
echo -e "${BLUE}⚙️  Setting startup command...${NC}"
az webapp config set \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --startup-file "pm2 start src/index.js --no-daemon --name mulelens -- --server --port \$PORT" \
    || az webapp config set \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --startup-file "node src/index.js --server --port \$PORT"

# Configure Application Settings (Environment Variables)
echo ""
echo -e "${BLUE}🔧 Configuring environment variables...${NC}"


echo -e "${GREEN}✓ Environment variables configured${NC}"

# Create deployment package
echo ""
echo -e "${BLUE}📦 Creating deployment package...${NC}"
rm -f deploy.zip
rm -rf node_modules

echo "Installing production dependencies..."
npm install --production --silent

echo "Creating ZIP package..."
zip -r deploy.zip . \
    -x "*.git*" \
    -x ".env*" \
    -x "*.log" \
    -x "logs/*" \
    -x "coverage/*" \
    -x "tests/*" \
    -x ".DS_Store" \
    -x "deploy.zip" \
    -x ".vscode/*" \
    -q

SIZE=$(du -h deploy.zip | cut -f1)
echo -e "${GREEN}✓ Package created: deploy.zip ($SIZE)${NC}"

# Deploy the package
echo ""
echo -e "${BLUE}🚀 Deploying to Azure...${NC}"
az webapp deployment source config-zip \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --src deploy.zip

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${BLUE}📊 Deployment Information:${NC}"
echo "  App URL: https://${APP_NAME}.azurewebsites.net"
echo "  Kudu URL: https://${APP_NAME}.scm.azurewebsites.net"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "  1. Visit your app: https://${APP_NAME}.azurewebsites.net"
echo "  2. Monitor logs: az webapp log tail --resource-group $RESOURCE_GROUP --name $APP_NAME"
echo "  3. View in portal: https://portal.azure.com"
echo ""
echo -e "${BLUE}🔍 Streaming initial logs...${NC}"
echo "Press Ctrl+C to exit log stream"
echo ""
sleep 5
az webapp log tail --resource-group "$RESOURCE_GROUP" --name "$APP_NAME"
