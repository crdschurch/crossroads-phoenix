defmodule CrossroadsInterface.HomeController do
  use CrossroadsInterface.Web, :controller

  def index(conn, _params) do
    case CrossroadsContent.Pages.get_page("/", false) do
      {:ok, 200, %{ "pages" => [first | rest]}} ->
        payload = Map.get(first, "content")
        page_type = Map.get(first, "pageType", "CenteredContentPage")
        page_type_name = ContentHelpers.determine_page_type(page_type)
        render(conn, "index.html", %{page_type: page_type_name, payload: payload, content_blocks: ContentHelpers.content_blocks(), conn: conn})
      {_, _, body} -> render(conn, CrossroadsInterface.ErrorView, "server_error.html")
    end
  end
end
