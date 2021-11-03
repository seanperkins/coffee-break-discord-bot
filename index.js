require('dotenv').config()
const fetch = require('node-fetch')
const https = require('https')
const Discord = require('discord.js')
const bot = new Discord.Client({intents: [641]}) // MEMBER_VOICE_STATE number

const BOT_TOKEN = process.env.BOT_TOKEN
const COFFEE_WEBHOOK_URL = process.env.COFFEE_WEBHOOK_URL
const GAMES_WEBHOOK_URL = process.env.GAMES_WEBHOOK_URL

// Login to Discord
bot.login(BOT_TOKEN)

bot.on('voiceStateUpdate', (oldState, newState) => {
  let newUserChannel = newState.channelId
  let oldUserChannel = oldState.channelId
  if (oldUserChannel === null && newUserChannel !== null) {
    const state = newState
    // User Joins a voice channel
    const name = state.member.user.username || 'Someone'
    let message = `${name} has joined `
    if (name === 'ohashi') {
      message = 'A wild troll appears in '
    }
    const channel = state.channel.name
    if (channel === 'PewPew') {
      sendSlackMessage(message + channel, GAMES_WEBHOOK_URL)
    } else if (channel === 'Watercooler') {
      sendSlackMessage(message + channel, COFFEE_WEBHOOK_URL)
    }
  } else if (newUserChannel === null) {
    // User leaves a voice channel
    const state = oldState
    // User Joins a voice channel
    const name = state.member.user.username || 'Someone'
    const channel = state.channel.name
    if (channel === 'PewPew') {
      sendSlackMessage(`${name} left PewPew`, GAMES_WEBHOOK_URL)
    } else if (channel === 'Watercooler') {
      sendSlackMessage(`${name} left Watercooler`, COFFEE_WEBHOOK_URL)
    }
  }
})

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
