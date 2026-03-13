require('dotenv').config()
const facts = require('./clooneyFacts')

const FF_BOT_TOKEN = process.env.FF_BOT_TOKEN

async function postFact() {
  const fact = facts[Math.floor(Math.random() * facts.length)]
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
