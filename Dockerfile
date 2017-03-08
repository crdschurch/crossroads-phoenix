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
COPY . /crossroads-phoenix

# Should this be copy or symbolic links?
COPY ./local /microclients
