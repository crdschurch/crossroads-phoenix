defmodule CrossroadsInterface.GatewayProxyMock do

  @api_url Application.get_env(:crossroads_interface, :api_url)

  def post(url, params, headers, options) do
    IO.inspect "asdfasdfasdfasdfasdf"
    {:ok, %HTTPoison.Response{
      body: "{}",
      headers: headers,
      status_code: 200
    }}
  end
end
