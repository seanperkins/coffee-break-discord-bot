require('dotenv').config()
const fetch = require('node-fetch')
const https = require('https')
const Discord = require('discord.js')

const GC_BOT_TOKEN = process.env.GC_BOT_TOKEN
const GC_COFFEE_WEBHOOK_URL = process.env.GC_COFFEE_WEBHOOK_URL
const GC_GAMES_WEBHOOK_URL = process.env.GC_GAMES_WEBHOOK_URL

function glitchClique({botToken, coffeeWebhookUrl, gamesWebhookUrl}) {
  const bot = new Discord.Client({intents: [641]}) // MEMBER_VOICE_STATE number

  // Login to Discord
  bot.login(botToken)

  bot.on('voiceStateUpdate', (oldState, newState) => {
    let newUserChannel = newState.channelId
    let oldUserChannel = oldState.channelId
    if (oldUserChannel === null && newUserChannel !== null) {
      const state = newState
      // User Joins a voice channel
      const name = state.member.user.username || 'Someone'
      let message = `${name} has joined `
      if (name === 'ohashi') {
        message = 'A dirty troll appears in '
      }
      const channel = state.channel.name
      if (channel === 'PewPew') {
        sendSlackMessage(message + channel, gamesWebhookUrl)
      } else if (channel === 'Watercooler') {
        sendSlackMessage(message + channel, coffeeWebhookUrl)
      }
    } else if (newUserChannel === null) {
      // User leaves a voice channel
      const state = oldState
      // User Joins a voice channel
      const name = state.member.user.username || 'Someone'
      const channel = state.channel.name
      if (channel === 'PewPew') {
        sendSlackMessage(`${name} left PewPew`, gamesWebhookUrl)
      } else if (channel === 'Watercooler') {
        sendSlackMessage(`${name} left Watercooler`, coffeeWebhookUrl)
      }
    }
  })
}

async function sendSlackMessage(message, url) {
  const data = JSON.stringify({
    text: message,
  })

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
    body: data,
  })
}

glitchClique({
  botToken: GC_BOT_TOKEN,
  coffeeWebhookUrl: GC_COFFEE_WEBHOOK_URL,
  gamesWebhookUrl: GC_GAMES_WEBHOOK_URL,
})
