# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

config :crossroads_content,
  content_server: System.get_env("CRDS_CMS_ENDPOINT"),
  http: HTTPoison


import_config "#{Mix.env}.exs"
