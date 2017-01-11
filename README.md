# Crossroads Microclient Implementation in Elixir/Phoenix

## Environment Setup

### Install the latest stable version of elixir
Follow the guide located on the [elixir site](http://elixir-lang.org/install.html).

### Install the Phoenix Mix archive
There is a great [guide on the phoenix site](http://www.phoenixframework.org/docs/installation), but essentially you will just run:
`$ mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez` to install the mix archive.

### Install node.js >= 5.0.0
This is environment specific, please visit [https://nodejs.org/en/](https://nodejs.org/en/) for instructions on installing on your operating system. 

## Install elixir dependencies
Once your environment is setup, you can run `mix deps.get` from the root of the project to retrieve all the project dependenices. This is an [umbrella application](http://elixir-lang.org/getting-started/mix-otp/dependencies-and-umbrella-apps.html#umbrella-projects) so running `mix deps.get` in the root of the project will fetch dependencies for all of the apps in the [apps directory](./apps). Each application has it's own [mix file](http://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html) that describes it's own dependencies and running `mix deps.get` from the root of that app will only fetch the dependencies for that app. 

## Install nodejs dependencies
The only application that needs npm dependencies is the phoenix app located in [apps/crossroads-interface]('apps/crossroads_interface'). So you will run `npm i` while inside that directory. 

> We hope to implement an umbrella application experiance with webpack as well, where each individual JS app (Angular, React, etc) is self contained with it's own package.json and webpack.config files. Stay tuned for more.

## Start the webserver!
Still inside the [apps/crossroads-interface]('./apps/crossroads_interface') folder, run `mix phoenix.server` and point your web browser to [http://localhost:4000](http://localhost:4000). Or if you prefer to be in an [IEx Shell](http://elixir-lang.org/docs/stable/iex/IEx.html) run `iex -S mix phoenix.server`.


