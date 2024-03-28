const fs = require('fs')

const nunjucks = require('nunjucks')
const { GithubUser } = require('./src/github')
const themes = require("./src/theme")

nunjucks.configure({ autoescape: true })

let templateString = fs.readFileSync("terminal-stats/template.svg", 'utf-8')

let username = process.argv[2]
let req_theme = process.argv[3] || "random"

let user = new GithubUser(username);
user.fetchContent()
    .then(() => {
        let outString = nunjucks.renderString(templateString, {
            data: user,
            theme: themes.getTheme(req_theme)
        })

        fs.writeFileSync("./github-terminal-stats.svg", outString)
    })
