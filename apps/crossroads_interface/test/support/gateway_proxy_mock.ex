defmodule CrossroadsInterface.GatewayProxyMock do

  @api_url Application.get_env(:crossroads_interface, :api_url)

  def gateway_post(path, params, headers) do
    {:ok, %HTTPoison.Response{
      body: "{\"abcdefg\": 1}",
      headers: headers,
      status_code: 200
    }}
  end

  def gateway_get(path, headers) do
    IO.inspect "gateway get"
    {:ok, %HTTPoison.Response{
      body: "{\"abcdefg\": 1}",
      headers: headers,
      status_code: 200
    }}
  end
end
