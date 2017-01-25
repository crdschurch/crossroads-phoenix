defmodule CrossroadsInterface.ProxyControllerTest do
  use CrossroadsInterface.ConnCase
  alias CrossroadsInterface.ProxyHttp
  import Mock

  test "POST /proxy/gateway/api/login", %{conn: conn} do
    with_mock ProxyHttp, [gateway_post: fn(path, params, headers) -> CrossroadsInterface.GatewayProxyMock.gateway_post(path, params, headers) end] do
      conn = post conn, "/proxy/gateway/api/login", %{:username => "gooduser", :password => "goodpass"}
      assert json_response(conn, 200) == %{"abcdefg" => 1}
      assert called ProxyHttp.gateway_post("api/login", %{"username" => "gooduser", "password" => "goodpass"},conn.req_headers) 
    end
  end

  #test "GET /proxy/gateway/api/authenticated", %{conn: conn} do
    #with_mock ProxyHttp, [gateway_get: fn(path, headers) -> CrossroadsInterface.GatewayProxyMock.gateway_post(path, headers) end] do
      #conn = get conn, "/proxy/gateway/api/authenticated"
      #assert json_response(conn, 200) == %{"abcdefg" => 1}
    #end
  #end
end
