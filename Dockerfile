# Elixir 1.4.2.: https://hub.docker.com/_/elixir/
FROM elixir:1.4.2

ENV DEBIAN_FRONTEND=noninteractive

RUN mix local.hex --force

# Install rebar
RUN mix local.rebar --force

# Install the Phoenix framework itself
RUN mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez

VOLUME /crossroads-phoenix

# Install NodeJS 6.x and the NPM
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y -q nodejs

RUN echo "{\"allow_root\": true }" > .bowerrc

RUN npm install -g bower

# Install dos2unix
RUN apt-get install -y -q dos2unix

# Copy phoenix and micro clients
COPY . /crossroads-phoenix
COPY ./local /microclients
COPY /crossroads-phoenix/docker-entrypoint.sh /usr/local/bin

RUN dos2unix /usr/local/bin/docker-entrypoint.sh

CMD sh -c "MIX_ENV=dev mix phoenix.server"
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
    