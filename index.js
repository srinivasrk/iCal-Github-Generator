const ical = require('ical-generator');
var express = require('express');
var app = express()
const cal = ical({domain: 'github.com', name: 'GITHUB EVENT'});
const moment = require('moment');
const octokit = require('@octokit/rest')() // to query github

const event = cal.createEvent({});

octokit.authenticate({
  type: 'token',
  token: process.env.GITHUB_ACCESS_TOKEN
})

app.get('/', function(req, res) {
  console.log(new Date() + "accessing /")
  res.status(200).send('nothing to see here')
})

app.get('/CitiLogics/CRAP-EMS', function (req, res) {
  console.log(new Date() + " accessing /Citilogics/CRAP-EMS")
  octokit.issues.getMilestone({
    owner: 'Citilogics',
    repo: 'CRAP-EMS',
    number: 1
  }).then(({data, headers, status}) => {
    event.summary(data.description)
    event.allDay('true')
    event.start(moment(data.due_on).startOf('day'))
    event.end(moment(data.due_on).add(1, 'days').startOf('day'))
    cal.serve(res)
  }).catch((error) => {
    console.log("ERROR : " + error)
  })

})

app.listen(3005, () => console.log('listening on port 3005!'))
