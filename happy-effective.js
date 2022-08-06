require('dotenv').config()
const fetch = require('node-fetch')
const https = require('https')
const {Client, Intents} = require('discord.js')

const HE_BOT_TOKEN = process.env.HE_BOT_TOKEN

function sendStandupMessage() {
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
      const message = await channel.send(
        `
- What did you do yesterday?
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
