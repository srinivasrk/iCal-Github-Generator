const ical = require('ical-generator');
var app = require('express')();
const moment = require('moment');
const octokit = require('@octokit/rest')() // to query github
const _ = require('underscore')


octokit.authenticate({
  type: 'token',
  token: process.env.GITHUB_ACCESS_TOKEN
})

app.get('/', function(req, res) {
  console.log(new Date() + "accessing /")
  res.status(200).send('nothing to see here')
})

app.get('/:owner/:repo', function (req, res) {
  console.log(req.params.owner)
  let eventsObj = [] // empty array to hold all events
  console.log(new Date() + " accessing /" + req.params.owner + "/" + req.params.repo)
  octokit.issues.getMilestones({
    owner: req.params.owner,
    repo: req.params.repo,
    state: 'open'
  }).then(({data, headers, status}) => {
    _.each(data, (eventObj) => {
      let temp = {}
      temp['summary'] = eventObj.title
      temp['start'] = moment(eventObj.due_on).startOf('day')
      temp['allDay'] = 'true'
      temp['description'] = eventObj.description
      eventsObj = eventsObj.concat(temp)
    })
    console.log(eventsObj);
    const cal = ical({
      name: 'GITHUB: '+ req.params.repo,
      events: eventsObj
    })
    cal.serve(res)
  }).catch((error) => {
    console.log("ERROR : " + error)
  })
})
app.listen(3005, () => console.log('listening on port 3005!'))
