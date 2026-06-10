# Teams Notification Setup Guide

## Enable Popup Notifications for Mule Connectors Channel

To receive popup notifications when connector reports are posted to the **Mule Connectors** channel, follow these steps:

### Step 1: Configure Channel Notifications

1. **Open Microsoft Teams**
2. Navigate to **Mule Platform** team → **Mule Connectors** channel
3. Click the **three dots (⋯)** next to the channel name
4. Select **Channel notifications**

### Step 2: Set Notification Preferences

Configure the following settings:

#### Option A: All New Posts (Recommended)
- Select **All new posts**
- This will give you a popup notification for every message posted in the channel

#### Option B: Custom Notifications
If you want to be selective:
- Select **Custom**
- Under "When someone posts a message", choose **Banner and feed**
- Enable "Show banner" for immediate popup notifications

### Step 3: Verify Webhook Configuration

Ensure your webhook is properly named:

1. In the **Mule Connectors** channel, click **⋯ (More options)**
2. Select **Connectors** or **Workflows**
3. Find your webhook (should be named something like "Mule Connector Updates")
4. Verify the webhook URL matches the one in `config/default.json`

Current webhook URL (last part):
```
V2fEWlCcg0UFLOl3HnKoNSvf1wkd3Q1zCvlM9O4HEcB-A1
```

### Step 4: Test Notification Settings

After configuring the settings:

1. Run the connector report script:
   ```powershell
   node send-connector-list-to-teams.js
   ```

2. You should see:
   - ✅ A popup notification in the bottom-right corner of Teams
   - 📬 The notification should say: "New post in Mule Connectors"
   - 🔔 An unread badge on the channel

### Step 5: Adjust Desktop Notifications (if needed)

If you're still not getting popups:

1. Click your **profile picture** in Teams (top right)
2. Select **Settings** → **Notifications**
3. Under "Appearance and sound":
   - ✅ Enable **Show message preview**
   - ✅ Enable **Play sound**
   - ✅ Ensure **Banner** is selected (not just Feed)

### Step 6: Windows Notification Settings

Verify Windows notifications are enabled:

1. Press **Windows + I** to open Settings
2. Go to **System** → **Notifications**
3. Ensure **Microsoft Teams** is in the list and notifications are **ON**
4. Click **Microsoft Teams** and enable:
   - ✅ Notification banners
   - ✅ Play a sound

## Comparison: Mule Platform vs Mule Connectors

| Feature | Mule Platform (Certificate Alerts) | Mule Connectors |
|---------|-----------------------------------|-----------------|
| Webhook Name | Mule Certificate Alerts | Mule Connector Updates |
| Channel | Mule Platform | Mule Connectors |
| Notification Type | Banner + Feed | Banner + Feed (after setup) |
| Message Format | MessageCard with correlationId | MessageCard with correlationId |

## Troubleshooting

### Not receiving popup notifications?

**Check 1: Channel Notification Settings**
- Open channel → Three dots → Channel notifications
- Must be set to "All new posts" or "Custom (Banner + Feed)"

**Check 2: Teams Desktop App**
- Desktop app shows better notifications than web browser
- Update to latest Teams version

**Check 3: Do Not Disturb**
- Check if Teams status is set to "Do Not Disturb"
- Change to "Available" temporarily to test

**Check 4: Focus Assist (Windows)**
- Press **Windows + I** → **System** → **Focus Assist**
- Set to "Off" or "Priority only" (and add Teams to priority list)

**Check 5: Test with Manual Post**
- Post a test message manually in the Mule Connectors channel
- If you don't get a popup for that either, it's a channel setting issue

### Still Not Working?

The notification behavior might be different if:
1. You're the one posting the message (Teams doesn't always notify you of your own posts)
2. The channel is muted
3. You have custom notification rules that override channel settings

## Best Practices

✅ **DO:**
- Set "All new posts" for important channels like Mule Connectors
- Keep Teams desktop app updated
- Test notifications after any configuration changes

❌ **DON'T:**
- Mute important channels
- Keep Teams in "Do Not Disturb" mode during work hours
- Disable banner notifications globally

## Support

If you continue to have issues:
- Email: devteamml@levi.com
- Subject: "Teams Notification Setup - Mule Connectors Channel"
