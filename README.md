# ADD GITHUB MILESTONE EVENTS TO YOUR CALENDAR #

## ENVIRONMENT VARIABLES ##
GITHUB_ACCESS_TOKEN = < your access token >

## RUNNING THE NODE APP ##
```
npm install
node index.js
```

## How do I use it? ##
when the node server is running it accepts end points in the following format

### <serverip>/<owner_name>/<repo_name> ###

Which gives you a iCal milestone events for that repo. Make sure to have access token in env variables of the node server if you are accessing a private repo.
