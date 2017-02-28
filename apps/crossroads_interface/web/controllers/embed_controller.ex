defmodule CrossroadsInterface.EmbedController do
  use CrossroadsInterface.Web, :controller

  plug CrossroadsInterface.Plug.BaseHref, "/embed"

  def index(conn, _params) do

    render conn, "index.html", %{ "js_files": [ 
        "/js/embed/polyfills.js",
        "/js/embed/vendor.js",
        "/js/embed/app.js"
      ], "css_files": [
        "/js/legacy/core.css"
      ], "page_type": "no_sidebar"}
  end
end
