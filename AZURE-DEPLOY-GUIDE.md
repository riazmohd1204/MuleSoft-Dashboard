# 🚀 Quick Azure Deployment Steps

## 1️⃣ Create the ZIP Package

Run this command in your project directory:
```bash
./create-deploy-package.sh
```

This will create `deploy.zip` (ready to upload!)

---

## 2️⃣ Create App Service in Azure Portal

1. Go to **portal.azure.com**
2. **Create a resource** → Search "Web App" → **Create**
3. Fill in:
   - **Resource Group**: Create new (e.g., `rg-mulelens`)
   - **Name**: `mulelens-code-review` (must be globally unique)
   - **Publish**: **Code**  
   - **Runtime stack**: **Node 20 LTS**
   - **Operating System**: **Linux**
   - **Region**: Choose closest to you
   - **Pricing**: **Basic B1** minimum (S1 recommended for production)
4. Click **Review + Create** → **Create**
5. Wait ~2 minutes for deployment to complete

---

## 3️⃣ Upload the ZIP File

### Option A: Via Kudu (Easiest)
1. Go to: `https://YOUR-APP-NAME.scm.azurewebsites.net`
2. Click **Tools** → **Zip Push Deploy**
3. **Drag and drop** `deploy.zip`
4. Wait for deployment (you'll see progress)

### Option B: Via Azure CLI
```bash
az webapp deployment source config-zip \
  --resource-group rg-mulelens \
  --name YOUR-APP-NAME \
  --src deploy.zip
```

---

## 4️⃣ Configure Environment Variables

In Azure Portal → Your App Service → **Configuration** → **Application settings**:

Click **+ New application setting** and add each .env properties


Click **Save** at the top!

---

## 5️⃣ Enable WebSockets

Still in **Configuration** → **General settings** tab:
- **Web sockets**: Turn **ON**
- Click **Save**

---

## 6️⃣ Set Startup Command

In **Configuration** → **General settings**:
- **Startup Command**: `node src/index.js --server --port $PORT`
- Click **Save**

---

## 7️⃣ Test Your App

1. Go to **Overview** → Click the **URL** (e.g., https://mulelens-code-review.azurewebsites.net)
2. You should see your MuleLens chatbot interface!

---

## 🔍 Troubleshooting

### View Logs
Azure Portal → Your App Service → **Log stream**

### If app doesn't start:
1. Check **Diagnose and solve problems**
2. Look at **Application Logs** in Log stream
3. Verify all environment variables are set correctly
4. Ensure PORT is set to 8080

### Restart the App
Overview → Click **Restart**

---

## 📊 Optional: Enable Application Insights

1. Go to your App Service → **Application Insights**  
2. Click **Turn on Application Insights**
3. Create new or select existing
4. This gives you performance monitoring, error tracking, and usage analytics

---

## 🎉 That's it! Your app is deployed!

**Your app URL**: `https://YOUR-APP-NAME.azurewebsites.net`
**Kudu console**: `https://YOUR-APP-NAME.scm.azurewebsites.net`
