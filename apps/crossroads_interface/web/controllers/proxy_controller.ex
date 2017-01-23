defmodule CrossroadsInterface.ProxyController do
  use CrossroadsInterface.Web, :controller
  alias ProxyHelpers

  @api_url Application.get_env(:crossroads_interface, :api_url)
  @gateway_http Application.get_env(:crossroads_interface, :gateway_http)


  def handle_gateway_proxy(%{:method => "GET", :request_path => request_path} = conn, _params) do
    request_path = ProxyHelpers.strip_proxy_path(request_path)
    HTTPoison.get("#{@api_url}#{request_path}", conn.req_headers, [recv_timeout: :infinity])
    |> match_response
    |> send_response(conn)
  end

  def handle_gateway_proxy(%{:method => "POST", :request_path => request_path} = conn, params) do
    request_path = ProxyHelpers.strip_proxy_path(request_path)
    @gateway_http.post("#{@api_url}#{request_path}", Poison.encode!(params), conn.req_headers, [recv_timeout: :infinity])
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

end
