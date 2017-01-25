# Crossroads Microclient Implementation in Elixir/Phoenix

## Environment Setup

### Install the latest stable version of elixir
Follow the guide located on the [elixir site](http://elixir-lang.org/install.html).

### Install the Phoenix Mix archive
There is a great [guide on the phoenix site](http://www.phoenixframework.org/docs/installation), but essentially you will just run:
`$ mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez` to install the mix archive.

### Install node.js >= 5.0.0
This is environment specific, please visit [https://nodejs.org/en/](https://nodejs.org/en/) for instructions on installing on your operating system. 

## Up and running
1. Clone the project to your local machine: `git clone https://github.com/crdschurch/crossroads-phoenix.git --recursive` (The recursive is important!!!!) OR `cd crossroads-phoenix && git submodule init && git submodule update` 
2. Check out the master branch in the submodule directory: `cd apps/crossroads_interface/web/static/js/angular2-webpack-phoenix/ && git checkout master`
3. Install Phoenix dependencies by running the following command in the crossroads_interface/ directory: `mix deps.get`
4. Install Angular dependencies by running the following command in the crossroads_interface/ directory: `npm install`
5. Kick of the build and the server: `MIX_ENV=dev mix phoenix.server`

## Things still left TODO
- [ ] Pull in all tests from the crds-angular repo
- [ ] Find a way to run all tests and submodule tests from the root of the crossroads-interface with NPM and webpack(?)
- [ ] Handle authentication more globally. Maybe the Phoneix server handles it and uses Session storage? Maybe we just create a framework and add it to the example JS repo.
- [x] Setup the Phoenix app to proxy requests the .NET server.
- [ ] Setup the Phoenix app to proxy CMS request to the CMS Server.
