# Discord Bot Setup Guide

This guide will walk you through setting up and hosting the xtab-pro Discord bot.

## Table of Contents
1. [Creating Your Discord Bot](#creating-your-discord-bot)
2. [Getting Your Bot Token](#getting-your-bot-token)
3. [Configuring Permissions](#configuring-permissions)
4. [Inviting the Bot to Your Server](#inviting-the-bot-to-your-server)
5. [Local Development Setup](#local-development-setup)
6. [Token Security Best Practices](#token-security-best-practices)
7. [Hosting Recommendations](#hosting-recommendations)
8. [Troubleshooting](#troubleshooting)

---

## Creating Your Discord Bot

1. **Navigate to the Discord Developer Portal**
   - Go to https://discord.com/developers/applications
   - Log in with your Discord account

2. **Create a New Application**
   - Click the "New Application" button in the top right
   - Enter a name for your application (e.g., "xtab-pro")
   - Read and accept the Discord Developer Terms of Service
   - Click "Create"

3. **Add a Bot User**
   - In the left sidebar, click on "Bot"
   - Click "Add Bot" and confirm by clicking "Yes, do it!"
   - Your bot is now created!

4. **Customize Your Bot (Optional)**
   - Add a profile picture
   - Set a username
   - Add a description

---

## Getting Your Bot Token

⚠️ **IMPORTANT**: Your bot token is like a password. Keep it secret!

1. In the Bot section of your application, find the "Token" section
2. Click "Reset Token" (or "Copy" if this is your first time)
3. Click "Copy" to copy the token to your clipboard
4. **Save this token securely** - you won't be able to see it again!

### Token Security Checklist
- ✅ Never share your token publicly
- ✅ Never commit your token to version control (GitHub, GitLab, etc.)
- ✅ Use environment variables or config files (added to `.gitignore`)
- ✅ Regenerate your token immediately if it's exposed
- ✅ Use a password manager to store your token securely

---

## Configuring Permissions

### Privileged Gateway Intents

Discord requires you to enable certain intents for your bot to function properly.

1. In the Bot section, scroll down to "Privileged Gateway Intents"
2. Enable the following intents based on your bot's needs:
   - **Message Content Intent**: ✅ Required (for reading message content)
   - **Server Members Intent**: Optional (only if you need member information)
   - **Presence Intent**: Optional (only if you need user presence data)

### Bot Permissions

When generating your invite link, you'll need to select appropriate permissions:

**Minimum Required Permissions:**
- `Send Messages` - To respond to commands
- `Read Messages/View Channels` - To see messages in channels
- `Read Message History` - To process commands properly

**Optional Permissions (if needed later):**
- `Manage Messages` - To delete or pin messages
- `Embed Links` - To send rich embeds
- `Attach Files` - To send files or images
- `Add Reactions` - To add emoji reactions
- `Use External Emojis` - To use custom emojis

---

## Inviting the Bot to Your Server

1. **Navigate to OAuth2 → URL Generator**
   - In the left sidebar, click "OAuth2"
   - Click "URL Generator"

2. **Select Scopes**
   - Check the `bot` scope

3. **Select Bot Permissions**
   - Choose the permissions your bot needs (see above)
   - The minimum permissions calculator will show at the bottom

4. **Generate and Use the URL**
   - Copy the generated URL at the bottom of the page
   - Paste it into your browser
   - Select the server you want to add the bot to
   - Click "Authorize"
   - Complete the CAPTCHA if prompted

---

## Local Development Setup

### Prerequisites
- Node.js v16.6.0 or newer ([Download here](https://nodejs.org/))
- npm (comes with Node.js)
- Git ([Download here](https://git-scm.com/))

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AmVa456/xtab-pro.git
   cd xtab-pro
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Your Bot Token**
   
   **Option A: Direct configuration (for testing only)**
   - Open `bot.js`
   - Replace `'YOUR_BOT_TOKEN'` with your actual token
   
   **Option B: Environment variables (recommended)**
   - Install dotenv: `npm install dotenv`
   - Create a `.env` file in the project root:
     ```
     DISCORD_TOKEN=your_bot_token_here
     ```
   - Add `.env` to your `.gitignore` file
   - Update `bot.js` to use the environment variable:
     ```javascript
     require('dotenv').config();
     client.login(process.env.DISCORD_TOKEN);
     ```

4. **Run the Bot**
   ```bash
   node bot.js
   ```

5. **Test the Bot**
   - Go to your Discord server
   - Type `!ping` in a text channel
   - The bot should respond with `Pong.`

---

## Token Security Best Practices

### Using Environment Variables

Create a `.env` file (never commit this file!):
```env
DISCORD_TOKEN=your_actual_token_here
```

Add to your `.gitignore`:
```gitignore
.env
.env.local
.env.*.local
```

Update your `bot.js`:
```javascript
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.login(process.env.DISCORD_TOKEN);
```

### What to Do If Your Token Is Exposed

1. **Immediately regenerate your token** in the Discord Developer Portal
2. Update your bot configuration with the new token
3. If the token was committed to Git:
   - Remove it from the Git history
   - Consider making the repository private temporarily
4. Monitor your bot's activity for any unauthorized use

---

## Hosting Recommendations

To keep your bot online 24/7, you'll need to host it on a server.

### Option 1: Railway (Recommended for Beginners)

**Pros:**
- Free $5 monthly credit (enough for small bots)
- Automatic deployments from Git
- Easy to set up
- No credit card required initially

**Setup:**
1. Create an account at [railway.app](https://railway.app)
2. Create a new project from GitHub repo
3. Add environment variables in the dashboard
4. Deploy!

**Configuration:**
- Add a `Procfile`:
  ```
  worker: node bot.js
  ```

### Option 2: Render

**Pros:**
- Free tier available
- Automatic deployments
- Easy configuration

**Setup:**
1. Create an account at [render.com](https://render.com)
2. Create a new "Background Worker"
3. Connect your GitHub repository
4. Set environment variables
5. Set start command: `node bot.js`

### Option 3: Heroku

**Note:** Heroku has discontinued free tiers, but is still a solid option for paid hosting.

**Setup:**
1. Install Heroku CLI
2. Create a Heroku app
3. Add a `Procfile`:
   ```
   worker: node bot.js
   ```
4. Deploy using Git or GitHub integration

### Option 4: DigitalOcean / VPS

**Pros:**
- Full control over the server
- Can host multiple bots
- Scalable

**Cons:**
- Requires more technical knowledge
- Costs money (starting at ~$4-6/month)

**Setup:**
1. Create a Droplet (Ubuntu recommended)
2. SSH into your server
3. Install Node.js and npm
4. Clone your repository
5. Install dependencies
6. Use PM2 to keep the bot running:
   ```bash
   npm install -g pm2
   pm2 start bot.js
   pm2 startup
   pm2 save
   ```

### Option 5: Oracle Cloud Free Tier

**Pros:**
- Always free tier (with limitations)
- Generous free resources

**Cons:**
- More complex setup
- Requires credit card for verification

---

## Troubleshooting

### Bot Doesn't Respond to Commands

**Check:**
1. ✅ Bot is online (green status in Discord)
2. ✅ Bot has permission to read and send messages in the channel
3. ✅ Message Content Intent is enabled in the Developer Portal
4. ✅ Bot has proper intents configured in code
5. ✅ Command prefix is correct (`!ping`, not `/ping`)

### Bot Keeps Going Offline

**Solutions:**
- Use a hosting service for 24/7 uptime
- Check your hosting service logs for errors
- Ensure your hosting plan hasn't run out of credits/resources

### "Invalid Token" Error

**Solutions:**
1. Regenerate your token in the Developer Portal
2. Make sure there are no extra spaces in your token
3. Ensure you're using the bot token, not the client secret
4. Check that your `.env` file is being loaded correctly

### Bot Invited But Not Showing Up

**Check:**
1. ✅ Bot is actually running (`Ready!` message in console)
2. ✅ You have permission to add bots to the server
3. ✅ Try re-inviting with the OAuth2 URL

### Permission Errors

**Solutions:**
- Check bot role position (must be higher than roles it needs to moderate)
- Verify channel-specific permissions
- Re-invite the bot with updated permissions

### Rate Limiting Issues

**Best Practices:**
- Don't spam API requests
- Implement cooldowns for commands
- Cache data when possible
- Use Discord.js's built-in rate limit handling

---

## Additional Resources

- [Discord.js Guide](https://discordjs.guide/)
- [Discord.js Documentation](https://discord.js.org/)
- [Discord Developer Documentation](https://discord.com/developers/docs)
- [Discord Developer Community](https://discord.gg/discord-developers)

---

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Search for similar issues in the [GitHub Issues](https://github.com/AmVa456/xtab-pro/issues)
3. Create a new issue with:
   - Description of the problem
   - Steps to reproduce
   - Error messages (remove any tokens/sensitive info!)
   - Your environment (OS, Node.js version, etc.)

---

**Happy Botting! 🤖**
