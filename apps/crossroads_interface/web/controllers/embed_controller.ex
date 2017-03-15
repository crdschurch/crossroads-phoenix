defmodule CrossroadsInterface.EmbedController do
  use CrossroadsInterface.Web, :controller

  plug CrossroadsInterface.Plug.BaseHref, "/embed"

  plug :put_layout, "no_sidebar.html"

  def index(conn, _params) do

    render conn, "app_root.html", %{ "js_files": [ 
        "/js/embed/polyfills.js",
        "/js/embed/vendor.js",
        "/js/embed/app.js"
      ], "css_files": [
        "/js/legacy/core.css"
      ]
    }
  end
end
