## Description

Login to a microsoft account and do some bing search daily


## Requirement

CasperJS

[http://casperjs.org/]


## Install

`npm install`


## Run

`casperjs index.js`


## Log 

`tail myCasper.log -F`


## Daily Cron Job

`crontab -e`

Add

`0 6 * * * /PATH/dailyscript.sh`


## License

MIT
