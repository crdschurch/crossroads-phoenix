defmodule CrossroadsInterface.ProxyControllerTest do
  use CrossroadsInterface.ConnCase



  test "POST /proxy/gateway/api/login", %{conn: conn} do
    conn = post conn, "/proxy/gateway/api/login", %{:username => "gooduser", :password => "goodpass"}
    assert html_response(conn, 200)
  end
end
