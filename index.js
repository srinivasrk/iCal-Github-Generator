const ical = require('ical-generator');
var app = require('express')();
const moment = require('moment');
const octokit = require('@octokit/rest')() // to query github
const _ = require('underscore')
let eventsObj = [] // empty array to hold all events

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
  octokit.issues.getMilestones({
    owner: 'Citilogics',
    repo: 'CRAP-EMS',
    state: 'open'
  }).then(({data, headers, status}) => {
    _.each(data, (eventObj) => {
      let temp = {}
      temp['start'] = moment(eventObj.due_on).startOf('day')
      temp['allDay'] = 'true'
      temp['summary'] = data.description
      eventsObj = eventsObj.concat(temp)
    })
    const cal = ical({
      name: 'GITHUB EVENTS',
      events: eventsObj
    })
    cal.serve(res)
  }).catch((error) => {
    console.log("ERROR : " + error)
  })
})
app.listen(3005, () => console.log('listening on port 3005!'))
