const cron = require('node-cron')
const facts = require('./clooneyFacts')

function startDailyFact({webhookUrl, sendMessage}) {
  // 1pm ET = 17:00 UTC (EST) or 18:00 UTC (EDT)
  // Using America/New_York timezone to handle DST automatically
  cron.schedule('0 13 * * *', () => {
    const fact = facts[Math.floor(Math.random() * facts.length)]
    sendMessage(fact, webhookUrl)
  }, {
    timezone: 'America/New_York',
  })
}

module.exports = {startDailyFact}
