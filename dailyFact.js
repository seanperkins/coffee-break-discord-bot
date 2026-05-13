require('dotenv').config()
const philanthropyFacts = require('./philanthropyFacts')
const pettyFacts = require('./pettyFacts')

const FF_BOT_TOKEN = process.env.FF_BOT_TOKEN

const MONDAY = 1
const THURSDAY = 4

async function postFact() {
  // Paused — remove this return to resume posting.
  return

  // Heroku Scheduler runs this daily; only post on Monday and Thursday.
  // Monday = wholesome rich-people philanthropy, Thursday = petty-rich-person antics.
  const today = new Date()
  const dayOfWeek = today.getUTCDay()

  let list
  if (dayOfWeek === MONDAY) {
    list = philanthropyFacts
  } else if (dayOfWeek === THURSDAY) {
    list = pettyFacts
  } else {
    return
  }

  // Cycle through each list one fact per posting day so every fact
  // appears before any repeats.
  const msPerDay = 1000 * 60 * 60 * 24
  const weekNumber = Math.floor(Date.now() / msPerDay / 7)
  const fact = list[weekNumber % list.length]
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
