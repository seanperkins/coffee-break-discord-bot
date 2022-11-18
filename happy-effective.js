require('dotenv').config()
const fetch = require('node-fetch')
const https = require('https')
const {Client, Intents} = require('discord.js')

const HE_BOT_TOKEN = process.env.HE_BOT_TOKEN

function sendStandupMessage() {
  const now = new Date()
  const today = now.getDay()
  // Only run on weekdays
  if (today !== 5) {
    return
  }
  const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  })

  // Login to Discord
  bot.login(HE_BOT_TOKEN)

  // Send message to discord
  bot.on('ready', async () => {
    const channel = bot.channels.cache.find(
      (channel) => channel.name === 'daily-standup',
    )
    if (channel) {
      // On Monday, mention last week
      const message = await channel.send(`What was a big win this week?`)
    }
  })
}

sendStandupMessage()

exports.modules = {
  sendStandupMessage,
}
