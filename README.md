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
1. Clone the project to your local machine: `git clone https://github.com/crdschurch/crossroads-phoenix.git`
  
2. Check out the development branch: `cd crossroads-phoenix && git checkout development`

3. Install Phoenix dependencies by running the following command: `mix deps.get && cd apps/crossroads_interface && mix deps.get`

  >This project is an [umbrella project](http://elixir-lang.org/getting-started/mix-otp/dependencies-and-umbrella-apps.html#umbrella-projects)
  >which lets us break it into smaller pieces. 
  >The phoenix portion is in the `apps/crossroads_interface` directory and probably where you will be working most of the time. 

4. Install javascript dependencies by running the following command in the crossroads_interface/ directory: `npm install`
5. Kick of the build and the server: `MIX_ENV=dev mix phoenix.server`

  >Windows users will need to run `set MIX_ENV=dev` and then run `mix phoenix.server`
  >`MIX_ENV=dev` is necessary because we need some way to tell the Microclients that we are running in the context of our phoenix application. This way webpack will put our build files in the correct assets folder for phoenix to serve. 

## Things still left TODO
- [ ] Handle authentication more globally. Maybe the Phoneix server handles it and uses Session storage? Maybe we just create a framework and add it to the example JS repo.
- [x] Setup the Phoenix app to proxy requests the .NET server.
- [x] Setup the Phoenix app to proxy CMS request to the CMS Server.
- [ ] Determine how to reliably route between MicroClients
- [ ] Create a future proof, framework agnostic, shareable header and footer
- [ ] Write a guide for adding/editing a microclient 
- [ ] Deployment
