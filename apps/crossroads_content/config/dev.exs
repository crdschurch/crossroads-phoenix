use Mix.Config

config :crossroads_content,
  content_server: System.get_env("CMS_ENDPOINT"),
  http: HTTPoison
