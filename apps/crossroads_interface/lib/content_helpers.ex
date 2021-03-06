defmodule ContentHelpers do

  alias CrossroadsContent.Pages

  @spec content_blocks :: [map]
  def content_blocks do
    case Pages.get_content_blocks do
      {:ok, 200, body} -> Map.get(body, "contentBlocks", [])
      {_, _, _} -> []
    end
  end

  @spec determine_page_type(String.t) :: String.t
  def determine_page_type(page_type) do
    new_type = Macro.underscore(page_type) <> ".html"
    # why does noSidebar return Page as it's type?
    case new_type do
      "page.html" -> "no_sidebar.html"
      _ -> new_type
    end
  end

end
