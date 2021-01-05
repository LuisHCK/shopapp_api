FROM node:14

# Create app directory
RUN mkdir -p /opt/app

WORKDIR /opt/app

# Install app dependencies
COPY package.json /opt/app

RUN yarn install

# Bundle app source
COPY . /opt/app

EXPOSE 8000

CMD [ "yarn", "start" ]
