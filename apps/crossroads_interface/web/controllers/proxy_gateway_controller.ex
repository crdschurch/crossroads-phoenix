defmodule CrossroadsInterface.ProxyGatewayController do
  use CrossroadsInterface.Web, :controller
  @moduledoc """
  Pass traffic from the frontend to the correct gateway endpoint.
  """
  require IEx

  alias CrossroadsInterface.ProxyHelpers
  alias CrossroadsInterface.ProxyHttp

  def handle_gateway_proxy(%{:method => "GET", :request_path => request_path} = conn, params) do
    request_path = ProxyHelpers.strip_proxy_path(request_path)
    request_params = ProxyHelpers.build_param_string(params)
    ProxyHttp.gateway_get(request_path <> request_params, conn.req_headers)
    |> ProxyHelpers.match_response
    |> send_response(conn)
  end

  def handle_gateway_proxy(%{:method => "POST", :request_path => request_path} = conn, params) do
    request_path = ProxyHelpers.strip_proxy_path(request_path)
    ProxyHttp.gateway_post(request_path, params, conn.req_headers)
    |> ProxyHelpers.match_response
    |> send_response(conn)
  end

  def handle_gateway_proxy(%{:method => "PUT", :request_path => request_path} = conn, params) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, "")
  end

  defp send_response({code, data}, conn) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(code, data)
  end

end
