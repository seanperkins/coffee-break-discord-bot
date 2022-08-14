require('dotenv').config()
const fetch = require('node-fetch')
const https = require('https')
const {Client, Intents} = require('discord.js')

const HE_BOT_TOKEN = process.env.HE_BOT_TOKEN

function sendStandupMessage() {
  const now = new Date()
  const today = now.getDay()
  // Only run on weekdays
  if (today === 0 || today === 6) {
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
      const yesterdayWord = today === 1 ? 'last week' : 'yesterday'
      const message = await channel.send(
        `
- What did you do ${yesterdayWord}?
- What are you going to today?
- Is there anything blocking you?

Reply in this thread with your answers.
        `,
      )
      const date = new Date()
      const dateString = `${
        date.getMonth() + 1
      }-${date.getDate()}-${date.getFullYear()}`
      await message.startThread({
        name: `${dateString} Standup`,
        autoArchiveDuration: 1440, // 24 hours
      })
    }
  })
}

sendStandupMessage()

exports.modules = {
  sendStandupMessage,
}
