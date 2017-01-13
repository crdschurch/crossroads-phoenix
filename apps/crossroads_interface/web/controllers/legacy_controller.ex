defmodule CrossroadsInterface.LegacyController do
  use CrossroadsInterface.Web, :controller

  plug :put_layout, "legacy.html"

  def index(conn, _params) do
    render conn, "index.html"
  end
end
