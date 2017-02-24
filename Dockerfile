# Elixir 1.3.2.: https://hub.docker.com/_/elixir/
FROM elixir:1.3.2

ENV DEBIAN_FRONTEND=noninteractive

RUN mix local.hex --force

# Install rebar
RUN mix local.rebar --force

# Install the Phoenix framework itself
RUN mix archive.install --force https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez

RUN git clone https://github.com/crdschurch/crossroads-phoenix.git

# Install NodeJS 6.x and the NPM
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y -q nodejs

# RUN npm -v
# RUN node -v

WORKDIR /crossroads-phoenix/apps/crossroads_interface

RUN mix deps.get
RUN echo "{\"allow_root\": true }" > .bowerrc

RUN npm install -g bower
RUN npm install
