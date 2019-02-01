## Description

Login to a microsoft account and do some bing searches daily


## Requirement

CasperJS

[http://casperjs.org/]


## Install

`npm install`

## Update email and password in config file: config.dev.json

## Run

`casperjs index.js`

For multiple account, create more config files based on config.dev.json, then run:

`casperjs index.js new_config_file`


## Log 

`tail myCasper.log -F`


## Log in web

`forever start log.js`

`http://localhost:3000`


Make it auto start when reboot (optional)

`crontab -e`

Add

`@reboot forever start /PATH/log.js`


## Daily Cron Job

Update PATH in script/dailyscript.sh

`crontab -e`

Add

`0 6 * * * /PATH/script/dailyscript.sh`


## License

MIT
