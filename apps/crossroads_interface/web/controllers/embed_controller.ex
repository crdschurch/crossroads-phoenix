defmodule CrossroadsInterface.EmbedController do
  use CrossroadsInterface.Web, :controller

  plug CrossroadsInterface.Plug.BaseHref, "/embed"

  plug :put_layout, "embed.html"

  def index(conn, _params) do

    render conn, "index.html", %{ "js_files": [ 
        "/js/embed/polyfills.js",
        "/js/embed/vendor.js",
        "/js/embed/app.js"
      ], "page_type": "no_sidebar"}
  end
end