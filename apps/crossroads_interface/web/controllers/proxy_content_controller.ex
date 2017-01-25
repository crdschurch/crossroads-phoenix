defmodule CrossroadsInterface.ProxyContentController do
  use CrossroadsInterface.Web, :controller
  @moduledoc """


  """

  alias CrossroadsInterface.ProxyHelpers
  alias CrossroadsInterface.ProxyHttp

  def handle_content_proxy(%{:request_path => request_path} = conn, params) do
    request_path = ProxyHelpers.strip_proxy_path(request_path)
    ProxyHttp.content_get(request_path, conn.req_headers)
    |> ProxyHelpers.match_response
    |> send_response(conn)
  end

  defp send_response({code, data}, conn) do
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(code, data)
  end

end
