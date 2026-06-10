#!/bin/bash
# Azure ZIP Deployment Package Creator
# Run this script to create a deployment-ready ZIP file

echo "🚀 Creating Azure deployment package..."

# Clean up previous builds
echo "📦 Cleaning up..."
rm -f deploy.zip
rm -rf node_modules

# Install production dependencies
echo "📥 Installing production dependencies..."
npm install --production

# Create ZIP excluding unnecessary files
echo "🗜️  Creating ZIP file..."
zip -r deploy.zip . \
  -x "*.git*" \
  -x ".env" \
  -x ".env.local" \
  -x "*.log" \
  -x "logs/*" \
  -x "coverage/*" \
  -x "tests/*" \
  -x ".DS_Store" \
  -x "deploy.zip" \
  -x ".vscode/*"

# Get file size
SIZE=$(du -h deploy.zip | cut -f1)

echo ""
echo "✅ Deployment package created successfully!"
echo "📦 File: deploy.zip"
echo "📏 Size: $SIZE"
echo ""
echo "Next steps:"
echo "1. Create your App Service in Azure Portal (Node 20 LTS, Linux)"
echo "2. Upload deploy.zip via Deployment Center or Kudu"
echo "3. Add environment variables in Configuration > Application settings"
echo "4. Set startup command: node src/index.js --server --port \$PORT"
echo "5. Enable Web sockets in Configuration > General settings"
echo ""
echo "See DEPLOYMENT.md for detailed instructions."
