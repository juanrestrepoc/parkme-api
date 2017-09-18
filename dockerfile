FROM node:boron
MAINTAINER Juan Restrepo <juanrestrepo16@gmail.com>

RUN git clone https://github.com/juanrestrepoc/parkme-api
    

EXPOSE 1337

CMD ["cd parkme-api", "npm install", "npm install -g sails","sails lift"]

