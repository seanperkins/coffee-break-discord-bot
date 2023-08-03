require('dotenv').config()
const fetch = require('node-fetch')
const https = require('https')
const Discord = require('discord.js')

const usernameMap = require('./usernameMapping')

const GC_BOT_TOKEN = process.env.GC_BOT_TOKEN
const GC_COFFEE_WEBHOOK_URL = process.env.GC_COFFEE_WEBHOOK_URL
const GC_GAMES_WEBHOOK_URL = process.env.GC_GAMES_WEBHOOK_URL

function glitchClique({botToken, coffeeWebhookUrl, gamesWebhookUrl}) {
  const bot = new Discord.Client({intents: [641]}) // MEMBER_VOICE_STATE number

  // Login to Discord
  bot.login(botToken)

  bot.on('voiceStateUpdate', (oldState, newState) => {
    let newChannelId = newState.channelId
    let oldChannelId = oldState.channelId
    const channel = newState.channel?.name
    const oldChannel = oldState.channel?.name
    const username = newState.member.user.username || 'someone'
    const name = usernameMap[username] || username

    // They have changed channels or from null state
    if (oldChannelId !== newChannelId) {
      if (newChannelId === null) {
        // User leaves all voice channels
        // If old user channel is PewPew or Watercooler, send a message to Slack
        if (oldChannel === 'PewPew') {
          sendSlackMessage(`${name} left PewPew`, gamesWebhookUrl)
        } else if (oldChannel === 'Watercooler') {
          sendSlackMessage(`${name} left Watercooler`, coffeeWebhookUrl)
        }
      } else {
        // User joins a voice channel
        // If old user channel is PewPew or Watercooler, send a message to Slack
        if (oldChannel === 'PewPew') {
          sendSlackMessage(`${name} left PewPew`, gamesWebhookUrl)
        } else if (oldChannel === 'Watercooler') {
          sendSlackMessage(`${name} left Watercooler`, coffeeWebhookUrl)
        }

        // If new user channel is PewPew or Watercooler, send a message to Slack
        if (channel === 'PewPew') {
          sendSlackMessage(`${name} joined PewPew`, gamesWebhookUrl)
        } else if (channel === 'Watercooler') {
          sendSlackMessage(`${name} joined Watercooler`, coffeeWebhookUrl)
        }
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
