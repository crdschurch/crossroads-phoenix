use Mix.Config

config :crossroads_content,
  content_server: System.get_env("CRDS_CMS_ENDPOINT"),
  http: CrossroadsContent.FakeHttp
