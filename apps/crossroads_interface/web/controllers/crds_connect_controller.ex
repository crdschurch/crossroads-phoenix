defmodule CrossroadsInterface.CrdsConnectController do
  use CrossroadsInterface.Web, :controller
  require Logger
  require File

  @moduledoc"""
  This controller handles "/connect" (Finder) requests
  """

  plug :put_layout, "crds_connect.html"

  def index(conn, _params) do
    render conn, "index.html", %{"base_href": "connect", "js_files": [
        "/js/crds_connect/polyfills.js",
        "/js/crds_connect/vendor.js",
        "/js/crds_connect/app.js"
      ]}
  end

end
