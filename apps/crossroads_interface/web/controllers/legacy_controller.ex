defmodule CrossroadsInterface.LegacyController do
  use CrossroadsInterface.Web, :controller
  @moduledoc"""
  This controller is called from the fall through route in the router. 
  The purpose is to handle serving up the 'legacy' angular application using 
  the legacy template
  """

  plug :put_layout, "legacy.html"

  def index(conn, _params) do
    render conn, "index.html", %{ "js_files": [
        "/js/ang.js",
        "/js/core.js",
        "/js/common.js",
        "/js/profile.js",
        "/js/trips.js",
        "/js/camps.js",
        "/js/media.js",
        "/js/search.js",
        "/js/govolunteer.js",
        "/js/formbuilder.js",
        "/js/childcare.js",
        "/js/formlybuilder.js",
        "/js/main.js"
      ], "css_files": [
       "/css/main.css"
      ], "base_href": "/"}
  end
end
