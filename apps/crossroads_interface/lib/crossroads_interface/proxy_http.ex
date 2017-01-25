defmodule CrossroadsInterface.ProxyHttp do

  @api_url Application.get_env(:crossroads_interface, :api_url)

  @doc """
  Make a post request to the api server
  """
  def gateway_post(path, params, headers) do
    HTTPoison.post("#{@api_url}#{path}",Poison.encode!(params), headers, [recv_timeout: :infinity])
  end

  @doc """
  Make a get request to the api server.
  """
  def gateway_get(path, headers) do
    HTTPoison.get("#{@api_url}#{path}", headers, [recv_timeout: :infinity])
  end
end
