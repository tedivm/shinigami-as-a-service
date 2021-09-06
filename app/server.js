const fs = require("fs")
const filters = require("./filters.js")
const express = require('express')
var md = require('markdown-it')();

const app = express()
const port = process.env.PORT || 3000


// Create the "homepage" using the repository readme file
const INDEX = md.render(fs.readFileSync("README.md", "utf8"))
const INDEX_HTML = `
<html>
  <head>
    <title>Shinigami As A Service</title>
  </head>
  <body>
    ${INDEX}
  </body>
</html>`


// Service names to identity templates
const SERVICE_MAP = {
  "buymeacoffee": "buymeacoffee.com/<user>",
  "cash": "cash.app/<user>",
  "cash.me": "cash.me/<user>",
  "deviantart": 'deviantart.com/<user>',
  "discord": 'discord.gg/<user>',
  "facebook": "facebook.com/<user>",
  "gofundme.com": "gofundme.com/<user>",
  "imdb": "imdb.com/<user>",
  "indiegogo": "indiegogo.com/<user>",
  "instagram": "instagram.com/<user>",
  "ko-fi": "ko-fi.com/<user>",
  "last.fm": "last.fm/<user>",
  "linkedin": "linkedin.com/<user>",
  "onlyfans": "onlyfans.com/<user>",
  "patreon": "patreon.com/<user>",
  "paypal": "paypal.com/<user>",
  "pinterest": "pinterest.com/<user>",
  "reddit": "reddit.com/user/<user>",
  "snapchat": "snapchat.com/<user>",
  "soundcloud": "soundcloud.com/<user>",
  "spotify": "spotify.com/<user>",
  "steamcommunity": "steamcommunity.com/<user>",
  "tiktok": "tiktok.com/<user>",
  "twitter": "twitter.com/<user>",
}

function getIdentifier(service, name) {
  return SERVICE_MAP[service].replace("<user>", name)
}

// Just documentation for the root page
app.get('/', (req, res) => {
  res.send(INDEX_HTML)
})

// Primary service route
app.get('/user/:service/:user', function(req, res, next){
  const service = req.params.service
  const user = req.params.user
  res.send({
    "transphobic": filters.transphobic.test(getIdentifier(service, user)),
    "transfriendly": filters.transfriendly.test(getIdentifier(service, user))
  })
})

app.listen(port, () => {
  console.log(`ShinigamiAAS listening on ${port}`)
})
