const ical = require('ical-generator');
var express = require('express');
var app = express()
const cal = ical({domain: 'github.com', name: 'my first iCal'});
const moment = require('moment');
const octokit = require('@octokit/rest')() // to query github

cal.createEvent({
    start: moment(),
    end: moment().add(1, 'hour'),
    summary: 'Example Event',
    description: 'It works ;)',
    location: 'my room'
});

octokit.authenticate({
  type: 'token',
  token: process.env.GITHUB_ACCESS_TOKEN
})

octokit.issues.getMilestone({
  owner: 'Citilogics',
  repo: 'datalyzer',
  number: 1
}).then(({data, headers, status}) => {
  console.log(data)
}).catch((error) => {
  console.log("ERROR : " + error)
})

app.get('/datalyzer', function (req, res) {
  cal.serve(res)
})

app.listen(3005, () => console.log('Example app listening on port 3005!'))
