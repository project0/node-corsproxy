###
# project0-corsproxy https://github.com/project0/node-corsproxy
#
# Run the corsproxy service on port 3000
###

FROM    mhart/alpine-node:latest
MAINTAINER richie@project0.de

WORKDIR /runtime
ADD     package.json    /runtime/package.json
RUN     npm install

ADD     .   /runtime

# The default port of the application
EXPOSE  3000
CMD     node index.js
