defmodule CrossroadsInterface.ErrorView do
  use CrossroadsInterface.Web, :view
  alias CrossroadsContent.Pages

  def render("404.html", assigns) do
    conn = assigns[:conn]
    params = conn.query_string
    headers = conn.req_headers
    payload = case Pages.get_page(conn.request_path <> "/", false) do
      {:ok, 200, body} -> Enum.at(body["pages"], 0)["content"]
      {_, _, body} -> "<h2> #{body} </h2>"
    end
    render("content_page.html", %{payload: payload})
  end

  def render("500.html", _assigns) do
    render("server_error.html", %{})
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render "500.html", assigns
  end
end
