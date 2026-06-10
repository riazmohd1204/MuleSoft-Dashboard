# Fix: Mule Connectors Channel Not Showing Popup Notifications

## Problem
- ✅ Mule Platform channel shows popup notifications for certificate reports
- ❌ Mule Connectors channel does NOT show popup notifications for connector reports

## Root Cause
**Different channel notification settings between the two channels.**

## Solution: Configure Mule Connectors Channel Notifications

### Step-by-Step Fix (5 minutes)

#### 1. Open Microsoft Teams Desktop App
**Important:** Use the desktop app, not the web browser. The desktop app has better notification support.

#### 2. Navigate to Mule Connectors Channel
1. Go to **"Mule Platform"** team (left sidebar)
2. Find and click **"Mule Connectors"** channel

#### 3. Configure Channel Notifications
1. Click the **three dots (⋯)** next to "Mule Connectors" channel name
2. Select **"Channel notifications"** from the dropdown
3. You'll see notification settings

#### 4. Change Settings to Match Mule Platform
Set to one of these options:

**Option A: All New Posts (Recommended)**
- ✅ Select **"All new posts"**
- This gives popup for EVERY message (including webhook posts)

**Option B: Custom (More Control)**
- ✅ Select **"Custom"**
- Under "Channel mentions": Choose your preference
- Under **"All new posts"**: Set to **"Banner and feed"**
- ✅ Make sure **"Banner"** is checked (this triggers the popup!)

#### 5. Click "Save"

#### 6. Verify Teams Notification Settings
1. Click your **profile picture** (top right)
2. Go to **Settings** → **Notifications**
3. Under "Appearance and sound":
   - ✅ **Banner** should be selected
   - ✅ **Show message preview** should be ON
   - ✅ **Play sound** should be ON

#### 7. Test the Setup
Run this command:
```powershell
cd "c:\Users\pill66\OneDrive - Levi Strauss & Co\Documents\Github\Copilot Workspace\mule-code-review-chatbot"
node send-connector-list-to-teams.js
```

**Expected Result:**
- 🔔 Popup notification in bottom-right corner
- 📬 Message: "New post in Mule Connectors"
- 🔴 Red badge appears on channel

---

## Comparison: Why Mule Platform Works but Mule Connectors Doesn't

| Setting | Mule Platform (Certificate) | Mule Connectors (Before Fix) |
|---------|---------------------------|------------------------------|
| Channel Notifications | ✅ "All new posts" or "Banner and feed" | ❌ Probably "Off" or "Feed only" |
| Notification Type | ✅ Banner (popup) | ❌ Feed only (no popup) |
| Badge Counter | ✅ Shows unread count | ❓ May not show |

---

## Additional Checks if Still Not Working

### Check 1: Is the Channel Muted?
1. Right-click on **"Mule Connectors"** channel
2. Look for **"Unmute"** option
3. If you see "Unmute", click it to unmute the channel

### Check 2: Windows Focus Assist
Focus Assist can block notifications:
1. Press **Windows + A** to open Action Center
2. Click **Focus assist**
3. Select **"Off"** or **"Priority only"**

### Check 3: Do Not Disturb Mode
1. Check your Teams status (top right)
2. If it's **"Do Not Disturb"**, change to **"Available"**

### Check 4: Test with Manual Message
1. Post a test message manually in Mule Connectors: "Testing notifications"
2. If you DON'T get a popup for your own manual message, the channel settings are definitely the issue
3. **Note:** Teams may not notify you of your own posts - ask a colleague to post a test message

### Check 5: Compare with Mule Platform Settings
1. Open **Mule Platform** channel settings
2. Click **⋯** → **"Channel notifications"**
3. Note what setting is selected (probably "All new posts")
4. Apply the EXACT SAME setting to **Mule Connectors** channel

---

## Quick Diagnostic Checklist

Run through this checklist:

- [ ] Using Teams **Desktop App** (not web browser)
- [ ] Mule Connectors channel notification set to **"All new posts"** or **"Custom > Banner and feed"**
- [ ] Teams Settings → Notifications → **"Banner"** is selected
- [ ] Teams Settings → Notifications → **"Show message preview"** is ON
- [ ] Channel is **not muted**
- [ ] Teams status is **not "Do Not Disturb"**
- [ ] Windows Focus Assist is **"Off"** or allows Teams notifications
- [ ] Tested with both webhook posts AND manual messages

---

## Still Not Working? Advanced Troubleshooting

### Option 1: Reset Channel Notifications
1. Mute the Mule Connectors channel
2. Wait 10 seconds
3. Unmute the channel
4. Set notifications to "All new posts"
5. Test again

### Option 2: Leave and Rejoin Channel
1. Right-click **"Mule Connectors"** → **"Leave channel"**
2. Go back to Mule Platform team → Click **"See all channels"**
3. Find **"Mule Connectors"** → Click **"Join"**
4. Set notifications to "All new posts"

### Option 3: Compare Webhook Names
The webhook name might matter. Check:
1. In Mule Platform → **⋯** → **"Connectors"** or **"Workflows"**
2. Note the webhook name (should be "Mule Certificate Alerts")
3. In Mule Connectors → **⋯** → **"Connectors"** or **"Workflows"**
4. Webhook name should be something like "Mule Connector Updates"
5. Try renaming to match exactly

---

## Contact Support

If notifications still don't work after all these steps:
- **Email:** devteamml@levi.com
- **Subject:** "Teams Notification Issue - Mule Connectors Channel"
- **Include:** Screenshots of your channel notification settings

---

## Expected Behavior After Fix

When connector report is posted:
1. 🔔 **Popup appears** in bottom-right corner of screen
2. 📬 **Message:** "New post in Mule Connectors"
3. 🎵 **Sound plays** (if enabled)
4. 🔴 **Red badge** appears on channel with unread count
5. ⏰ **Popup stays** for 5-10 seconds, then disappears

This should match exactly what happens when certificate reports are posted to Mule Platform! ✅
