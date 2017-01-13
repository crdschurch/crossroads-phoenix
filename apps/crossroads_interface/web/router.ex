defmodule CrossroadsInterface.Router do
  use CrossroadsInterface.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CrossroadsInterface do
    pipe_through :browser

    get "/home", HomeController, :index


    get "/", LegacyController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", CrossroadsInterface do
  #   pipe_through :api
  # end
end
