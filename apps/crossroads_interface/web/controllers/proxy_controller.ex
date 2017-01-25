defmodule CrossroadsInterface.ProxyController do
  use CrossroadsInterface.Web, :controller
  alias CrossroadsInterface.ProxyHelpers
  alias CrossroadsInterface.ProxyHttp

  def handle_gateway_proxy(%{:method => "GET", :request_path => request_path} = conn, _params) do
    request_path = strip_proxy_path(request_path)
    ProxyHttp.gateway_get(request_path, conn.req_headers)
    |> match_response
    |> send_response(conn)
  end

  def handle_gateway_proxy(%{:method => "POST", :request_path => request_path} = conn, params) do
    request_path = ProxyHelpers.strip_proxy_path(request_path)
    ProxyHttp.gateway_post(request_path, params, conn.req_headers)
    |> match_response
    |> send_response(conn)
  end

  def handle_gateway_proxy(%{:method => "PUT", :request_path => request_path} = conn, params) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, "")
  end

  defp match_response(resp) do
    case resp do
      {:ok, %HTTPoison.Response{status_code: status_code, body: body}} -> 
        {status_code, body}
      {:error, %HTTPoison.Error{reason: reason}} ->
        {500, reason}
    end
  end

  defp send_response({code, data}, conn) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(code, data)
  end

  defp strip_proxy_path(path) do
    path
    |> String.split("/")
    |> Enum.filter(&(&1 != ""))
    |> Enum.drop(2)
    |> Enum.join("/")
  end


end
