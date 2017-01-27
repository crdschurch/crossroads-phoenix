defmodule CrossroadsInterface.ProxyContentController do
  use CrossroadsInterface.Web, :controller
  @moduledoc """


  """

  require IEx

  alias CrossroadsInterface.ProxyHelpers
  alias CrossroadsInterface.ProxyHttp

  def handle_content_proxy(%{:request_path => request_path} = conn, %{"link" => page} = params) do
    #case CrossroadsContent.Pages.get_page(page, false) do
      #{:ok, code, body} -> 
        #conn
          #|> put_resp_content_type("application/json")
          #|> send_resp(code, body)
      #{:error, _, body} -> 
        #conn
          #|> put_resp_content_type("application/json")
          #|> send_resp(500, body)
    #end
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, %{})

  end

  def handle_content_proxy(%{:request_path => "/proxy/content//api/ContentBlock"} = conn, params) do
    #case CrossroadsContent.Pages.get_content_blocks() do
      #{:ok, code, body} -> send_response({code, body}, conn)
      #{:error, _, body} -> send_response({500, body}, conn)
    #end
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, %{})
  end

  def handle_content_proxy(%{:request_path => request_path} = conn, params) do
  conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, %{})
  end

  def send_response({code, data}, conn) do
  conn
    |> put_resp_content_type("application/json")
    |> send_resp(code, data)
  end

end
