# xtab-pro

[![Documentation](https://img.shields.io/badge/docs-live-blue?style=for-the-badge)](https://amva456.github.io/xtab-pro/)
[![Discord.js](https://img.shields.io/badge/discord.js-v14-7289da?style=for-the-badge&logo=discord)](https://discord.js.org)
[![Node.js](https://img.shields.io/badge/node.js-v16.6+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-ISC-green?style=for-the-badge)](LICENSE)

A powerful Discord bot for web development dashboard workflows on ChromeOS. Built with Discord.js v14 and Node.js.

## 📚 Documentation

**[View Full Documentation →](https://amva456.github.io/xtab-pro/)**

The complete documentation site includes:
- Detailed setup instructions
- Bot commands reference
- Hosting deployment guides
- Configuration examples
- Security best practices

## 🚀 Quick Start

### Prerequisites

- Node.js (v16.6.0 or newer recommended)
- npm (usually comes with Node.js)
- A Discord bot token ([Get one here](https://discord.com/developers/applications))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AmVa456/xtab-pro.git
   cd xtab-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your bot token**
   - Open the `bot.js` file
   - Replace `'YOUR_BOT_TOKEN'` with your actual bot token from the Discord Developer Portal
   - **Important:** Never commit your token to version control!

4. **Run the bot**
   ```bash
   node bot.js
   ```

### Testing

Once the bot is running and connected to your server, test it by typing `!ping` in a text channel. The bot should respond with `Pong.`

## 📖 Setup Guide

For detailed setup instructions, including:
- Creating a Discord application
- Getting your bot token
- Setting up permissions
- Inviting the bot to your server
- Hosting options

Please see the **[Complete Bot Setup Guide](BOT_SETUP.md)** or visit our **[documentation site](https://amva456.github.io/xtab-pro/)**.

## 🌐 Hosting Options

Deploy your bot 24/7 with these recommended platforms:
- **[Railway](https://railway.app)** - Free tier with $5 monthly credit
- **[Render](https://render.com)** - Easy deployment with free tier
- **[DigitalOcean](https://www.digitalocean.com)** - VPS starting at $4/month
- **[Heroku](https://www.heroku.com)** - Popular platform (paid tiers)

See the [documentation](https://amva456.github.io/xtab-pro/#hosting) for detailed hosting guides.

## 💬 Commands

- `!ping` - Test bot responsiveness

*More commands coming soon!*

## 🛠️ Tech Stack

- **Discord.js v14** - Discord API wrapper
- **Node.js** - JavaScript runtime

## 🔒 Security

- Never commit your bot token to version control
- Use environment variables for sensitive data
- Add `.env` files to `.gitignore`
- Regenerate tokens if exposed
- Use minimal required permissions

## 📝 License

ISC

## 🤝 Contributing

Issues and pull requests are welcome! Please check the [issues page](https://github.com/AmVa456/xtab-pro/issues) for current tasks.

## 📞 Support

- [Documentation](https://amva456.github.io/xtab-pro/)
- [Setup Guide](BOT_SETUP.md)
- [Report Issues](https://github.com/AmVa456/xtab-pro/issues)

---

**Made with ❤️ for web developers on ChromeOS**
