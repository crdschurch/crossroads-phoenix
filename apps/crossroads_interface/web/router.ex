defmodule CrossroadsInterface.Router do
  use CrossroadsInterface.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug CrossroadsInterface.Plug.Meta
    plug CrossroadsInterface.Plug.ContentBlocks
    plug CrossroadsInterface.Plug.PageType
    plug CrossroadsInterface.Plug.Payload
    plug CrossroadsInterface.Plug.BaseHref
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/proxy", CrossroadsInterface do
    pipe_through :api
    forward "/gateway", ProxyGatewayController, :handle_gateway_proxy
    forward "/content", ProxyContentController, :handle_content_proxy
  end

  scope "/", CrossroadsInterface do
    pipe_through :browser

    forward "/angular2", AngularController, :index

    post "/login", AuthenticationController, :login

    get "/", LegacyController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", CrossroadsInterface do
  #   pipe_through :api
  # end
end
