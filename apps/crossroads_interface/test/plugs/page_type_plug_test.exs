defmodule CrossroadsInterface.Plug.PageTypeTest do
  use CrossroadsInterface.ConnCase

  test "Sets page type when PageType.call() is called", %{conn: conn} do
    conn = conn() |> CrossroadsInterface.Plug.PageType.call("no_sidebar.html")
    assert conn.assigns.page_type == "no_sidebar.html"
  end
end

