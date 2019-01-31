# This Dockerfile works only on x86_64 machines

From ubuntu:16.04
RUN apt-get update
RUN apt-get install -y git nodejs npm wget
RUN apt-get install -y libfontconfig1 libfreetype6 #libssl provides libcrypto
RUN mkdir -p /code \
    cd /code
RUN git clone -b develop https://github.com/stanfish/casper-bing.git /code/casper-bing

RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm install -g phantomjs
RUN npm install -g casperjs

WORKDIR /code/casper-bing
