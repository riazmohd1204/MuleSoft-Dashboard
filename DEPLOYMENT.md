# Azure App Service Deployment Guide

## ZIP Deployment Instructions

### Step 1: Create App Service in Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **Create a resource** → **Web App**
3. Configure:
   - **Resource Group**: Create new or select existing
   - **Name**: `mulelens-code-review` (or your preferred name)
   - **Publish**: Code
   - **Runtime stack**: Node 20 LTS
   - **Operating System**: Linux
   - **Region**: East US (or your preferred region)
   - **Pricing Plan**: B1 or higher (recommended: S1 for production)
4. Click **Review + Create**, then **Create**

### Step 2: Prepare the ZIP Package

Run this command from the project root:

```bash
npm install --production
zip -r deploy.zip . -x "*.git*" "node_modules/*" ".env" "logs/*" "*.log" "tests/*"
```

Or use this PowerShell command:
```powershell
Compress-Archive -Path * -DestinationPath deploy.zip -Force -CompressionLevel Optimal
```

### Step 3: Configure App Service Settings

In Azure Portal → Your App Service → Configuration:

**Application Settings** (Add these environment variables):
```
NODE_ENV=production
WEBSITES_PORT=8080
PORT=8080
GITHUB_TOKEN=<your-github-token>
GITHUB_ORG=LS-CO
GITHUB_API_URL=https://api.github.com
MUNIT_COVERAGE_URL=http://dallxmlstp01:8080
MUNIT_COVERAGE_USERNAME=<your-jenkins-username>
MUNIT_COVERAGE_PASSWORD=<your-jenkins-password>
JENKINS_TOP_FOLDER=C4E-Development
JENKINS_LAYERS=Experience,Process,System,Framework,Utilities
JENKINS_JOB_SUFFIX=-rtf-dev
REPO_PREFIX=leviC4E-
ANYPOINT_CLIENT_ID=<your-anypoint-client-id>
ANYPOINT_CLIENT_SECRET=<your-anypoint-client-secret>
ANYPOINT_ORG_ID=<your-anypoint-org-id>
TEAMS_WEBHOOK_URL=<your-teams-webhook>
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Step 4: Deploy ZIP via Azure Portal

**Option A: Via Deployment Center**
1. Go to **Deployment Center**
2. Select **Local Git/Manual Deployment**
3. Use Azure CLI or Kudu to deploy

**Option B: Via Kudu Console**
1. Go to `https://<your-app-name>.scm.azurewebsites.net`
2. Navigate to **Tools** → **Zip Push Deploy**
3. Drag and drop `deploy.zip`

**Option C: Via Azure CLI** (Recommended)
```bash
az login
az webapp deployment source config-zip \
  --resource-group <resource-group-name> \
  --name <app-name> \
  --src deploy.zip
```

### Step 5: Configure Startup Command

In Azure Portal → Configuration → General Settings:
- **Startup Command**: `node src/index.js --server --port $PORT`

### Step 6: Enable WebSocket Support

In Azure Portal → Configuration → General Settings:
- **Web sockets**: ON

### Step 7: Test Deployment

1. Go to `https://<your-app-name>.azurewebsites.net`
2. Check logs in **Log stream** if issues occur

## Troubleshooting

### View Logs
```bash
az webapp log tail --resource-group <rg-name> --name <app-name>
```

### SSH into Container
In Azure Portal → Development Tools → SSH → Go

### Common Issues

1. **Port binding error**: Ensure `PORT` env variable is set to `8080` or use `process.env.PORT` in code
2. **Dependencies missing**: Run `npm install --production` before zipping
3. **WebSocket issues**: Ensure WebSockets are enabled in App Service settings

## Scaling

For production:
- Use **S1** or higher tier for better performance
- Enable **Application Insights** for monitoring
- Set up **Auto-scaling** rules
- Configure **Custom domain** and **SSL**
