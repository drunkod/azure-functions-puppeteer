FROM leitwolf/azure-functions-puppeteer:latest

ENV AzureWebJobsScriptRoot=/home/site/wwwroot
COPY . /home/site/wwwroot