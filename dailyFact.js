require('dotenv').config()
const clooneyFacts = require('./clooneyFacts')
const shaqFacts = require('./shaqFacts')

const FF_BOT_TOKEN = process.env.FF_BOT_TOKEN

async function postFact() {
  // Alternate Clooney and Shaq day-by-day, and cycle through each list
  // so every fact appears exactly once before any repeats.
  const msPerDay = 1000 * 60 * 60 * 24
  const dayNumber = Math.floor(Date.now() / msPerDay)
  const useClooney = dayNumber % 2 === 0
  const list = useClooney ? clooneyFacts : shaqFacts
  const fact = list[Math.floor(dayNumber / 2) % list.length]
  const data = JSON.stringify({text: fact})

  await fetch(FF_BOT_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
    body: data,
  })
}

postFact()
